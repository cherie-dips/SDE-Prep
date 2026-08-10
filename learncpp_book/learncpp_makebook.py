#!/usr/bin/env python3
"""learncpp.com book creator.

Builds an offline book from the LearnCpp tutorial series in 4 steps:

  STEP1: crawl all links to content from the index page and create an index table
  STEP2: download all html files from these links
  STEP3: remove all html frames that do not go into the book (side panes, comments,
         ads, prev/next navigation)
  STEP4: combine all edited html files to one book

By default the book starts at Chapter 14 ("Introduction to Classes") -- i.e. the
OOP material and everything after it -- and ends with Appendix C. Appendix D
("Deprecated Articles") is skipped.

Inspired by https://github.com/martijnvanattekum/learncpp_makebook

Usage:
    python3 learncpp_makebook.py                       # full run, single-file HTML book
    python3 learncpp_makebook.py --format html,epub3   # also build an EPUB (needs pandoc)
    python3 learncpp_makebook.py --steps 3,4           # re-run cleaning + combining only
    python3 learncpp_makebook.py --start-chapter 16 --end-chapter 28

Dependencies:  pip install requests beautifulsoup4 lxml
Optional:      pandoc (for epub3/pdf/docx output)
"""

from __future__ import annotations

import argparse
import csv
import html
import os
import re
import shutil
import subprocess
import sys
import time
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# PARAMETERS ---------------------------------------------------------------
HOMEPAGE = "https://www.learncpp.com/"
REQUEST_TIMEOUT = 60
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DIR = os.path.join(BASE_DIR, "html_raw")
EDIT_DIR = os.path.join(BASE_DIR, "html_edit")
IMAGES_DIR = os.path.join(EDIT_DIR, "images")
INDEX_CSV = os.path.join(BASE_DIR, "index.csv")
INDEX_HTML = os.path.join(RAW_DIR, "0000---index.html")

# A cached page below this size is empty or truncated (e.g. an aborted earlier run),
# so it is re-downloaded rather than trusted. Real lessons are 100 KB+.
MIN_CACHED_BYTES = 2048

BOOK_TITLE = "Learn C++ - Classes, Templates and Beyond"
BOOK_AUTHORS = ["Alex", "nascardriver", "Cosmin Ilie"]

# Elements that never make it into the book. Everything outside `.entry-content`
# (site header, sidebar, footer, comment thread) is dropped implicitly because we
# only keep the article body; these selectors clean up what is left *inside* it.
STRIP_SELECTORS = [
    ".code-block",           # Ad Inserter wrappers
    ".cf_monitor",           # Ezoic ad placeholders
    "ins.adsbygoogle",
    ".prevnext",             # previous/next lesson navigation
    ".prevnext-inline",
    ".nav-button",
    "a.nav-link",
    "#comments",
    "#respond",
    ".comment-respond",
    ".entry-meta",
    "script",
    "style",
    "noscript",
    "iframe",
]

# PARSER NOTE --------------------------------------------------------------
# learncpp emits unclosed <p class="cpp-section"> heading tags. Python's stdlib
# html.parser nests the rest of the section *inside* the heading; lxml applies
# the HTML5 auto-close rule and gets it right. Do not swap this parser out.
PARSER = "lxml"


# HTTP ---------------------------------------------------------------------
def make_session() -> requests.Session:
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})
    # learncpp sits behind Cloudflare, which sporadically returns 52x on an otherwise
    # healthy page, so those are retried alongside the usual rate-limit/5xx statuses.
    retry = Retry(
        total=5,
        backoff_factor=2,
        status_forcelist=[429, 500, 502, 503, 504, 520, 521, 522, 523, 524, 525, 526, 527],
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    return session


SESSION = make_session()


def fetch(url: str) -> bytes:
    response = SESSION.get(url, timeout=REQUEST_TIMEOUT)
    response.raise_for_status()
    return response.content


# HELPERS ------------------------------------------------------------------
def slugify(text: str) -> str:
    text = text.lower().replace("&", " and ")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:80]


def normalize_chapter(value: str) -> str:
    """Accept '14', 'Chapter14', 'chapter 14', 'A' -> 'Chapter14' / 'ChapterA'."""
    key = re.sub(r"(?i)^chapter\s*", "", value.strip())
    return "Chapter" + key.upper()


def lesson_slug(url: str) -> str:
    return urlparse(url).path.rstrip("/").rsplit("/", 1)[-1]


# STEP 1 -------------------------------------------------------------------
def step1_build_index(args) -> list[dict]:
    """Crawl the index page and build the table of lessons that go into the book."""
    print("** STEP1: creating index table")
    os.makedirs(RAW_DIR, exist_ok=True)

    soup = BeautifulSoup(fetch(HOMEPAGE), PARSER)
    tables = soup.select(".lessontable")
    if not tables:
        sys.exit("No .lessontable blocks found on the index page - the site layout changed.")

    start = normalize_chapter(args.start_chapter)
    end = normalize_chapter(args.end_chapter) if args.end_chapter else None
    excluded = {normalize_chapter(c) for c in args.exclude_chapters.split(",") if c.strip()}

    anchors = []
    for table in tables:
        anchor_tag = table.select_one(".lessontable-header a[name]")
        anchors.append(anchor_tag.get("name") if anchor_tag else "")
    if start not in anchors:
        sys.exit(f"Start chapter {start!r} not found. Available: {', '.join(a for a in anchors if a)}")

    start_at = anchors.index(start)
    stop_at = anchors.index(end) + 1 if end and end in anchors else len(tables)

    records: list[dict] = []
    for table, anchor in list(zip(tables, anchors))[start_at:stop_at]:
        if anchor in excluded:
            print(f"   skipping {anchor} (excluded)")
            continue

        header = table.select_one(".lessontable-header")
        label_tag = header.select_one(".lessontable-header-chapter")
        title_tag = header.select_one(".lessontable-header-title")
        chapter_label = label_tag.get_text(strip=True) if label_tag else anchor
        chapter_title = title_tag.get_text(strip=True) if title_tag else ""

        for row in table.select(".lessontable-row"):
            number_tag = row.select_one(".lessontable-row-number")
            link_tag = row.select_one(".lessontable-row-title a")
            if not number_tag or not link_tag:
                continue

            url = link_tag.get("href", "").strip()
            number = number_tag.get_text(strip=True)
            title = link_tag.get_text(strip=True).replace("/", "-")
            if not url or not number or not title:
                continue

            records.append({
                "index": "",  # filled in below
                "chapter_anchor": anchor,
                "chapter_label": chapter_label,
                "chapter_title": chapter_title,
                "number": number,
                "title": title,
                "url": url,
                "slug": lesson_slug(url),
                "filename": "",
            })

    if args.limit:
        records = records[: args.limit]

    for position, record in enumerate(records, start=1):
        record["index"] = f"{position:04d}"
        record["filename"] = f"{record['index']}---{record['number']}---{slugify(record['title'])}.html"

    with open(INDEX_CSV, "w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(records[0].keys()))
        writer.writeheader()
        writer.writerows(records)

    write_index_html(records)

    chapters = len({r["chapter_anchor"] for r in records})
    print(f"   {len(records)} lessons across {chapters} chapters -> {INDEX_CSV}")
    return records


def write_index_html(records: list[dict]) -> None:
    """Render the index table as a browsable HTML page."""
    parts = ["<!DOCTYPE html><html><head><meta charset='utf-8'/>",
             f"<title>{html.escape(BOOK_TITLE)} - Index</title></head><body>",
             f"<h1>{html.escape(BOOK_TITLE)}</h1>"]
    current = None
    for record in records:
        if record["chapter_anchor"] != current:
            current = record["chapter_anchor"]
            parts.append("</ul>" if current else "")
            parts.append(
                f"<h2>{html.escape(record['chapter_label'])} - "
                f"{html.escape(record['chapter_title'])}</h2><ul>"
            )
        parts.append(
            f"<li>{html.escape(record['number'])} "
            f"<a href='{html.escape(record['url'])}'>{html.escape(record['title'])}</a></li>"
        )
    parts.append("</ul></body></html>")
    with open(INDEX_HTML, "w", encoding="utf-8") as handle:
        handle.write("\n".join(p for p in parts if p))


def load_index() -> list[dict]:
    if not os.path.exists(INDEX_CSV):
        sys.exit(f"{INDEX_CSV} not found - run step 1 first.")
    with open(INDEX_CSV, encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


# STEP 2 -------------------------------------------------------------------
def download_lesson(record: dict, delay: float) -> bool:
    """Fetch one lesson to html_raw. Returns False instead of raising, so that a
    single flaky page cannot throw away a run of several hundred good downloads."""
    try:
        content = fetch(record["url"])
    except Exception as error:  # noqa: BLE001
        print(f"   [warn] {record['url']}: {error}")
        return False

    with open(os.path.join(RAW_DIR, record["filename"]), "wb") as handle:
        handle.write(content)
    time.sleep(delay)
    return True


def step2_download(records: list[dict], args) -> None:
    """Download the raw HTML of every lesson in the index table."""
    print(f"** STEP2: downloading {len(records)} lessons")
    os.makedirs(RAW_DIR, exist_ok=True)

    def is_cached(record: dict) -> bool:
        path = os.path.join(RAW_DIR, record["filename"])
        return os.path.exists(path) and os.path.getsize(path) >= MIN_CACHED_BYTES

    pending = [r for r in records if args.force or not is_cached(r)]
    skipped = len(records) - len(pending)
    downloaded = 0
    failed: list[dict] = []

    for position, record in enumerate(pending, start=1):
        print(f"   [{position}/{len(pending)}] {record['number']} {record['title']}")
        if download_lesson(record, args.delay):
            downloaded += 1
        else:
            failed.append(record)

    if failed:
        print(f"   retrying {len(failed)} failed download(s) after a pause")
        time.sleep(15)
        retried, failed = failed, []
        for record in retried:
            if download_lesson(record, args.delay):
                downloaded += 1
            else:
                failed.append(record)

    print(f"   downloaded {downloaded}, reused {skipped} cached file(s)")
    if failed:
        sys.exit(
            f"Failed to download {len(failed)} lesson(s) after a retry pass: "
            + ", ".join(r["url"] for r in failed[:5])
        )


# STEP 3 -------------------------------------------------------------------
def download_image(url: str, cache: dict[str, str]) -> str | None:
    """Fetch an image into html_edit/images and return its book-relative path."""
    if url in cache:
        return cache[url]

    name = os.path.basename(urlparse(url).path) or "image"
    name = re.sub(r"[^A-Za-z0-9._-]", "_", name)
    local_name = f"{len(cache):03d}_{name}"
    local_path = os.path.join(IMAGES_DIR, local_name)

    try:
        if not os.path.exists(local_path):
            with open(local_path, "wb") as handle:
                handle.write(fetch(url))
    except Exception as error:  # noqa: BLE001 - a missing image must not abort the build
        print(f"   [warn] image {url}: {error}")
        return None

    cache[url] = f"images/{local_name}"
    return cache[url]


def step3_clean(records: list[dict], args) -> None:
    """Strip everything that is not book content and localise images/links."""
    print(f"** STEP3: cleaning {len(records)} files")
    os.makedirs(EDIT_DIR, exist_ok=True)
    os.makedirs(IMAGES_DIR, exist_ok=True)

    # slug -> anchor id, so cross-references between lessons stay clickable offline
    link_map = {r["slug"]: f"lesson-{r['index']}" for r in records}
    image_cache: dict[str, str] = {}

    cleaned = 0
    for record in records:
        source = os.path.join(RAW_DIR, record["filename"])
        target = os.path.join(EDIT_DIR, record["filename"])
        soup = BeautifulSoup(open(source, "rb").read(), PARSER)

        title_tag = soup.select_one("h1.entry-title")
        content_tag = soup.select_one(".entry-content")
        if content_tag is None:
            print(f"   [warn] no .entry-content in {record['filename']} - skipped")
            continue

        for selector in STRIP_SELECTORS:
            for node in content_tag.select(selector):
                node.decompose()

        promote_headings(content_tag)
        reveal_solutions(content_tag)
        rewrite_links(content_tag, link_map)
        if not args.no_images:
            localise_images(content_tag, record["url"], image_cache)

        heading = title_tag.get_text(" ", strip=True) if title_tag else f"{record['number']} - {record['title']}"
        body = (
            f"<h1 class='entry-title' id='lesson-{record['index']}'>{html.escape(heading)}</h1>\n"
            + content_tag.decode_contents()
        )
        with open(target, "w", encoding="utf-8") as handle:
            handle.write(
                "<!DOCTYPE html>\n<html><head><meta charset='utf-8'/>"
                f"<title>{html.escape(heading)}</title></head>\n<body>\n{body}\n</body></html>\n"
            )
        cleaned += 1

    print(f"   wrote {cleaned}/{len(records)} cleaned files to {EDIT_DIR}")
    if cleaned != len(records):
        sys.exit(f"{len(records) - cleaned} lesson(s) could not be cleaned - see warnings above.")


def promote_headings(content_tag) -> None:
    """learncpp marks section headings as styled <p>; make them real headings."""
    for node in content_tag.select("p.cpp-section"):
        node.name = "h2"
        node["class"] = ["cpp-section"]
    for node in content_tag.select("p.cpp-quiz-question"):
        node.name = "h3"
        node["class"] = ["cpp-quiz-question"]
    for node in content_tag.select("p.cpp-note-title"):
        node.name = "h4"
        node["class"] = ["cpp-note-title"]


def reveal_solutions(content_tag) -> None:
    """Quiz answers are JS-toggled and hidden; a book has no JS, so unhide them."""
    for link in content_tag.select("a.solution_link_show, a.solution_link_hide"):
        link.decompose()
    for solution in content_tag.select(".wpsolution"):
        del solution["style"]
        label = BeautifulSoup("<p class='solution-label'>Solution</p>", PARSER).p
        solution.insert(0, label)


def rewrite_links(content_tag, link_map: dict[str, str]) -> None:
    """Point links at lessons inside the book to their in-book anchor."""
    for link in content_tag.select("a[href]"):
        href = link["href"]
        if "learncpp.com/cpp-tutorial/" not in href:
            continue
        anchor = link_map.get(lesson_slug(href))
        if anchor:
            link["href"] = f"#{anchor}"


def localise_images(content_tag, page_url: str, cache: dict[str, str]) -> None:
    for image in content_tag.select("img"):
        source = image.get("src") or image.get("data-src") or ""
        if not source:
            continue
        local = download_image(urljoin(page_url, source), cache)
        if local:
            image["src"] = local
        for attribute in ("srcset", "data-src", "data-srcset", "loading", "sizes"):
            image.attrs.pop(attribute, None)


# STEP 4 -------------------------------------------------------------------
BOOK_CSS = """
/* Dark grey throughout, on purpose: a single palette with no light variant, so the
   book looks the same whatever the reader's system theme is set to. The index shares
   the page background exactly, so the two panes read as one surface.
   Every tone here is neutral grey - no colour accent anywhere. */
:root { --fg:#e6e6e6; --bg:#161819; --muted:#9aa0a6; --rule:#3a3d40; --code-bg:#1e2224;
        --note-bg:#22262a; --side-bg:#161819; }
* { box-sizing:border-box; }
html { -webkit-text-size-adjust:100%; scroll-behavior:smooth; }
body { background:var(--bg); color:var(--fg); margin:0; line-height:1.65;
       font-family:Georgia,"Iowan Old Style","Times New Roman",serif; }
/* Links take the body colour rather than a blue; the underline is what marks them. */
a { color:inherit; text-decoration:underline; text-decoration-thickness:1px;
    text-underline-offset:2px; text-decoration-color:var(--muted); }
a:hover { text-decoration-color:var(--fg); }
.layout { display:flex; align-items:flex-start; }

/* --- sticky contents sidebar --- */
/* Wide enough that the longest chapter name fits on its row without being clipped. */
.sidebar { position:sticky; top:0; flex:0 0 28rem; width:28rem; height:100vh;
   overflow-y:auto; overscroll-behavior:contain; background:var(--side-bg);
   padding:3.5rem 0 3rem; scrollbar-width:none;
   font-family:system-ui,-apple-system,"Segoe UI",sans-serif; font-size:.86rem; }
/* The index still scrolls; it just does not draw a scrollbar down its edge. */
.sidebar::-webkit-scrollbar { width:0; height:0; }
/* Every chapter stays on a single row: nowrap plus an ellipsis for the few titles
   that are still too long, with the full text on the element's tooltip. */
.toc summary { cursor:pointer; padding:.4rem 1rem; color:var(--fg); list-style:none;
   font-size:.82rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.toc summary::-webkit-details-marker { display:none; }
.toc summary::before { content:"\\25b8"; display:inline-block; width:1em; color:var(--muted);
   transition:transform .15s ease; }
.toc details[open] > summary::before { transform:rotate(90deg); }
/* No hover band and no marker rule anywhere in the index - position and state are
   shown by text brightness alone. */
.toc summary a { color:inherit; text-decoration:none; }
.toc ol { list-style:none; margin:0; padding:0 0 .35rem; }
.toc li a { display:block; padding:.25rem 1rem .25rem 2.1rem; color:var(--muted);
   text-decoration:none; }
.toc li a:hover { color:var(--fg); }
.toc li a.active { color:var(--fg); }
.toc .num { color:var(--muted); margin-right:.35em; font-variant-numeric:tabular-nums; }

/* --- contents toggle, available at every width --- */
.nav-toggle { display:none; }
.nav-toggle-btn { display:flex; position:fixed; z-index:20; top:.7rem; left:.7rem;
   width:2.4rem; height:2.4rem; border:none; box-shadow:none; color:var(--muted);
   align-items:center; justify-content:center; cursor:pointer; font-size:1.3rem;
   -webkit-user-select:none; user-select:none; }
.nav-toggle-btn:hover { color:var(--fg); }
/* No outline, so the button is painted in the page colour to stop the list or the
   text showing through the glyph as it scrolls past underneath. */
.nav-toggle-btn { background:var(--bg); }
/* On wide screens the index is open by default and ticking the box hides it. */
.nav-toggle:checked ~ .layout .sidebar { display:none; }

/* Long bare URLs in the prose are unbreakable and would widen the whole page on
   narrow screens; wrap them instead. Inherited, but inert inside <pre>, which does
   not wrap at all and scrolls horizontally on its own. */
.content { flex:1 1 auto; min-width:0; max-width:46rem; margin:0 auto;
   padding:3.6rem 1.5rem 6rem; overflow-wrap:break-word; }
h1.book-title { font-size:2.4rem; line-height:1.2; margin:1rem 0 .5rem; }
.book-sub { color:var(--muted); font-size:1.05rem; margin:0 0 .35rem; }
h1.chapter-heading { font-size:1.9rem; margin:4.5rem 0 1.5rem; padding-top:1.5rem;
                     border-top:3px solid var(--rule); scroll-margin-top:1rem; }
h2.entry-title { font-size:1.45rem; margin:3rem 0 1rem; scroll-margin-top:1rem; }
h3.cpp-section { font-size:1.15rem; margin:2rem 0 .6rem; color:var(--fg); }
h4.cpp-quiz-question { font-size:1.05rem; margin:1.6rem 0 .5rem; }
p { margin:0 0 1rem; }
pre { background:var(--code-bg); border:1px solid var(--rule); border-radius:6px;
      padding:.85rem 1rem; overflow-x:auto; font-size:.87rem; line-height:1.5;
      overflow-wrap:normal; word-break:normal; }
pre, code, kbd { font-family:"SF Mono",Menlo,Consolas,"Liberation Mono",monospace; }
code { background:var(--code-bg); border-radius:3px; padding:.1em .3em; font-size:.88em; }
pre code { background:none; padding:0; font-size:inherit; }
.cpp-note, .cpp-table, blockquote { background:var(--note-bg); border-left:4px solid var(--rule);
      border-radius:4px; padding:.85rem 1rem; margin:1.2rem 0; }
.cpp-note > :last-child, blockquote > :last-child { margin-bottom:0; }
.cpp-note-title { font-weight:700; margin:0 0 .5rem; font-size:1rem; }
.solution-label { font-weight:700; color:var(--muted); text-transform:uppercase;
      letter-spacing:.06em; font-size:.75rem; margin:0 0 .4rem; }
.wpsolution { border-left:4px solid var(--rule); padding-left:1rem; margin:1rem 0; }
img { max-width:100%; height:auto; }
table { border-collapse:collapse; width:100%; display:block; overflow-x:auto; }
td, th { border:1px solid var(--rule); padding:.4rem .6rem; }
.lesson { margin-bottom:2.5rem; }
hr.lesson-sep { border:0; border-top:1px solid var(--rule); margin:2.5rem 0; }

@media (max-width:60rem) {
  /* Too narrow for two columns, so the index becomes a drawer that starts closed
     and the same box opens it. The drawer is away by default, so the button sits on
     the page background until it is pulled out. */
  .sidebar { position:fixed; z-index:15; left:0; top:0; max-width:85vw;
     transform:translateX(-100%); transition:transform .2s ease;
     box-shadow:0 0 24px rgba(0,0,0,.28); }
  .nav-toggle:checked ~ .layout .sidebar { display:block; transform:none; }
}
@media print {
  .sidebar, .nav-toggle-btn { display:none !important; }
  .content { max-width:none; padding:0; }
}
"""

# Progressive enhancement only: the book is fully usable with JS disabled.
BOOK_JS = """
(function () {
  var links = {}, heads = [].slice.call(document.querySelectorAll('h2.entry-title'));
  [].forEach.call(document.querySelectorAll('.toc a[href^="#lesson-"]'), function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  var active = null;
  function setActive(id) {
    var a = links[id];
    if (!a || a === active) return;
    if (active) active.classList.remove('active');
    a.classList.add('active');
    active = a;
    var chapter = a.closest('details');
    if (chapter && !chapter.open) chapter.open = true;
    a.scrollIntoView({ block: 'nearest' });
  }

  // Highlight whichever lesson is currently at the top of the viewport.
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.dataset.visible = e.isIntersecting ? '1' : ''; });
      var visible = heads.filter(function (h) { return h.dataset.visible; });
      if (visible.length) setActive(visible[0].id);
    }, { rootMargin: '0px 0px -80% 0px' });
    heads.forEach(function (h) { observer.observe(h); });
  }

  // On narrow screens the drawer covers the text, so close it after a jump. On wide
  // screens `checked` means "hidden", so leave it alone -- otherwise picking a lesson
  // would reopen an index the reader had deliberately closed.
  var toggle = document.getElementById('nav-toggle');
  var narrow = window.matchMedia('(max-width: 60rem)');
  document.querySelector('.toc').addEventListener('click', function (e) {
    if (e.target.closest('a') && toggle && narrow.matches) toggle.checked = false;
  });

  // A chapter name jumps to that chapter. Clicking inside a <summary> would normally
  // toggle it shut, so cancel that and drive the jump by hand, leaving the chapter
  // expanded; the caret beside it is still the open/close control.
  [].forEach.call(document.querySelectorAll('.toc summary'), function (summary) {
    summary.addEventListener('click', function (e) {
      var link = e.target.closest('a.chap-link');
      if (!link) return;
      e.preventDefault();
      summary.parentNode.open = true;
      location.hash = link.getAttribute('href');
    });
  });

})();
"""


def demote_headings(fragment: BeautifulSoup) -> None:
    """h1..h5 -> h2..h6 so chapter dividers can own <h1> in the combined book."""
    for level in range(5, 0, -1):
        for node in fragment.select(f"h{level}"):
            node.name = f"h{level + 1}"


def step4_combine(records: list[dict], args) -> None:
    """Merge the cleaned lessons into a single book, then optionally run pandoc."""
    print("** STEP4: combining into the book")
    formats = [f.strip().lower() for f in args.format.split(",") if f.strip()]

    chapters: list[dict] = []
    for record in records:
        if not chapters or chapters[-1]["anchor"] != record["chapter_anchor"]:
            chapters.append({
                "anchor": record["chapter_anchor"],
                "label": record["chapter_label"],
                "title": record["chapter_title"],
                "lessons": [],
            })
        chapters[-1]["lessons"].append(record)

    book_path = os.path.join(BASE_DIR, args.output)
    document, missing = build_document(chapters, sidebar=True)
    with open(book_path, "w", encoding="utf-8") as handle:
        handle.write(document)
    print(f"   wrote {book_path}")
    if missing:
        # A short book must never pass as a complete one.
        print(f"   [ERROR] {len(missing)} lesson(s) are absent from the book: {', '.join(missing)}")

    book_images = os.path.join(BASE_DIR, "images")
    if os.path.isdir(IMAGES_DIR) and os.listdir(IMAGES_DIR):
        shutil.copytree(IMAGES_DIR, book_images, dirs_exist_ok=True)
        print(f"   copied {len(os.listdir(book_images))} images to {book_images}")

    pandoc_formats = [f for f in formats if f not in ("html", "html5")]
    if pandoc_formats:
        source_path = os.path.join(BASE_DIR, "_pandoc_source.html")
        plain, _ = build_document(chapters, sidebar=False)
        with open(source_path, "w", encoding="utf-8") as handle:
            handle.write(plain)
        for output_format in pandoc_formats:
            run_pandoc(source_path, output_format, book_path)
        os.remove(source_path)


def build_document(chapters: list[dict], sidebar: bool) -> tuple[str, list[str]]:
    """Assemble the whole book as one HTML string.

    With `sidebar` the contents pane is rendered alongside the text so lessons can
    be reached from anywhere; the plain variant feeds pandoc, which builds its own
    navigation and would otherwise duplicate the list.
    """
    missing: list[str] = []
    body: list[str] = []
    toc: list[str] = []
    included = 0

    for chapter in chapters:
        chapter_id = f"chapter-{chapter['anchor']}"
        # "&" keeps chapter names short enough to sit on one line in the index.
        chapter_heading = f"{chapter['label']} - {chapter['title']}".strip(" -")
        chapter_heading = re.sub(r"\band\b", "&", chapter_heading)
        entries: list[str] = []

        body.append(
            f"<h1 class='chapter-heading' id='{chapter_id}'>{html.escape(chapter_heading)}</h1>"
        )

        for lesson in chapter["lessons"]:
            path = os.path.join(EDIT_DIR, lesson["filename"])
            if not os.path.exists(path):
                print(f"   [warn] missing cleaned file {lesson['filename']} - skipped")
                missing.append(f"{lesson['number']} {lesson['title']}")
                continue

            fragment = BeautifulSoup(open(path, encoding="utf-8").read(), PARSER)
            content = fragment.body or fragment
            demote_headings(content)
            entries.append(
                f"<li><a href='#lesson-{lesson['index']}'>"
                f"<span class='num'>{html.escape(lesson['number'])}</span>"
                f"{html.escape(lesson['title'])}</a></li>"
            )
            body.append(f"<section class='lesson'>{content.decode_contents()}</section>")
            body.append("<hr class='lesson-sep'/>")
            included += 1

        toc.append(
            f"<details><summary title='{html.escape(chapter_heading, quote=True)}'>"
            f"<a class='chap-link' href='#{chapter_id}'>{html.escape(chapter_heading)}</a>"
            f"</summary><ol>{''.join(entries)}</ol></details>"
        )

    title_page = (
        f"<h1 class='book-title' id='top'>{html.escape(BOOK_TITLE)}</h1>"
        f"<p class='book-sub'>{html.escape(' - '.join(BOOK_AUTHORS))}</p>"
        f"<p class='book-sub'>{included} lessons in {len(chapters)} chapters, "
        f"compiled from learncpp.com</p>"
    )
    head = (
        "<!DOCTYPE html>\n<html lang='en'><head><meta charset='utf-8'/>"
        "<meta name='viewport' content='width=device-width, initial-scale=1'/>"
        f"<title>{html.escape(BOOK_TITLE)}</title><style>{BOOK_CSS}</style></head>\n<body>\n"
    )

    if not sidebar:
        return head + title_page + "\n" + "\n".join(body) + "\n</body></html>\n", missing

    pane = (
        "<input type='checkbox' id='nav-toggle' class='nav-toggle'/>"
        "<label for='nav-toggle' class='nav-toggle-btn' title='Show or hide the contents' "
        "aria-label='Show or hide the contents'>&#9776;</label>"
        "<div class='layout'><aside class='sidebar'>"
        f"<nav class='toc'>{''.join(toc)}</nav></aside><main class='content'>"
    )
    return (
        head + pane + title_page + "\n" + "\n".join(body)
        + f"</main></div>\n<script>{BOOK_JS}</script>\n</body></html>\n",
        missing,
    )


def run_pandoc(source_path: str, output_format: str, book_path: str) -> None:
    if shutil.which("pandoc") is None:
        print(f"   [warn] pandoc not installed - skipping {output_format} output")
        return

    extension = {"epub3": "epub", "latex": "tex"}.get(output_format, output_format)
    output_path = os.path.splitext(book_path)[0] + f".{extension}"
    command = [
        "pandoc", source_path,
        "-f", "html",
        "-t", output_format,
        "--standalone",
        "--toc", "--toc-depth", "2",
        "--resource-path", BASE_DIR,
        "--metadata", f"title={BOOK_TITLE}",
        *[arg for author in BOOK_AUTHORS for arg in ("--metadata", f"author={author}")],
        "-o", output_path,
    ]
    if output_format.startswith("epub"):
        command += ["--epub-chapter-level", "2"]

    print(f"   running pandoc -> {output_path}")
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"   [warn] pandoc failed for {output_format}:\n{result.stderr.strip()[:800]}")
    else:
        print(f"   wrote {output_path}")


# MAIN ---------------------------------------------------------------------
def parse_args():
    parser = argparse.ArgumentParser(
        description="Build an offline book from learncpp.com.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument("--start-chapter", default="14",
                        help="First chapter to include ('14', 'Chapter14', 'A')")
    parser.add_argument("--end-chapter", default=None,
                        help="Last chapter to include (default: to the end of the index)")
    parser.add_argument("--exclude-chapters", default="D",
                        help="Comma-separated chapters to skip (D = deprecated articles)")
    parser.add_argument("--steps", default="1,2,3,4",
                        help="Comma-separated steps to run")
    parser.add_argument("--format", default="html",
                        help="Comma-separated outputs: html, epub3, pdf, docx (non-html needs pandoc)")
    parser.add_argument("--output", default="learncpp_book.html", help="Output book filename")
    parser.add_argument("--delay", type=float, default=1.0,
                        help="Seconds to wait between downloads")
    parser.add_argument("--limit", type=int, default=0,
                        help="Only process the first N lessons (for testing)")
    parser.add_argument("--force", action="store_true",
                        help="Re-download files that are already cached")
    parser.add_argument("--no-images", action="store_true",
                        help="Skip downloading images")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    steps = {int(s) for s in args.steps.split(",") if s.strip()}

    records = step1_build_index(args) if 1 in steps else load_index()
    if 2 in steps:
        step2_download(records, args)
    if 3 in steps:
        step3_clean(records, args)
    if 4 in steps:
        step4_combine(records, args)

    print("** done")


if __name__ == "__main__":
    main()
