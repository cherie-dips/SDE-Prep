# LearnCpp Book Builder

Builds a single-file offline book from the [learncpp.com](https://www.learncpp.com/)
tutorial series. By default it covers **Chapter 14 ("Introduction to Classes") through
Appendix C** — the OOP material and everything after it.

Inspired by [martijnvanattekum/learncpp_makebook](https://github.com/martijnvanattekum/learncpp_makebook).

## Install

```bash
pip install requests beautifulsoup4 lxml
brew install pandoc          # optional, only for --format epub3/pdf/docx
```

## Run

```bash
python3 learncpp_makebook.py                       # single-file HTML book
python3 learncpp_makebook.py --format html,epub3   # also build an EPUB
```

Takes roughly 5–10 minutes on a first run (one request per second, plus images).
Downloads are cached in `html_raw/`, so re-runs are near-instant unless you pass `--force`.

## The four steps

| Step | What it does | Output |
|------|--------------|--------|
| **1** | Crawls the index page, parses every `.lessontable` chapter block, and builds the index table of lessons to include | `index.csv`, `html_raw/0000---index.html` |
| **2** | Downloads the raw HTML for each lesson (polite 1s delay, retries on 429/5xx, resumes from cache) | `html_raw/NNNN---<num>---<slug>.html` |
| **3** | Keeps only `h1.entry-title` + `.entry-content`, strips ads, prev/next nav, comments and scripts, unhides quiz solutions, promotes styled `<p>` headings to real headings, downloads images locally, rewrites cross-lesson links to in-book anchors | `html_edit/*.html`, `html_edit/images/` |
| **4** | Merges everything into one book with a title page, nested table of contents and chapter dividers; optionally hands off to pandoc | `learncpp_book.html`, `images/`, `learncpp_book.epub` |

Each step can be run on its own, e.g. `--steps 3,4` to re-clean and rebuild without
re-downloading anything.

## Reading the book

Open `learncpp_book.html` in any browser. The contents pane stays pinned to the left of the
text, so you can jump between lessons without scrolling back to the top:

- **The ☰ button** in the top-left opens and closes the index at any window size. On a wide
  screen the index starts open and the text re-centres when you hide it; on a narrow one it
  starts closed and slides over the text, closing again once you pick a lesson.
- **Chapter names are links** — clicking one jumps to that chapter and leaves it expanded.
  The caret beside it is the open/close control, so you can browse a chapter's lessons
  without navigating away.
- **Chapters collapse and expand** — 33 rows instead of a 332-item wall, each on one line.
- **The current lesson brightens** as you scroll, and its chapter opens automatically.

Navigation is progressive enhancement — with JavaScript disabled every contents link still
works and chapters still expand (native `<details>`); only the highlighting is lost.
The EPUB is built from a sidebar-free copy, since e-readers supply their own navigation.

## Options

| Flag | Default | Meaning |
|------|---------|---------|
| `--start-chapter` | `14` | First chapter to include. Accepts `14`, `Chapter14`, `A` |
| `--end-chapter` | *(end of index)* | Last chapter to include |
| `--exclude-chapters` | `D` | Chapters to skip — `D` is "Deprecated Articles" |
| `--steps` | `1,2,3,4` | Which steps to run |
| `--format` | `html` | Comma-separated: `html`, `epub3`, `pdf`, `docx` (non-HTML needs pandoc) |
| `--output` | `learncpp_book.html` | Output filename |
| `--delay` | `1.0` | Seconds between downloads |
| `--limit` | `0` | Only process the first N lessons (for testing) |
| `--force` | off | Re-download files already in `html_raw/` |
| `--no-images` | off | Skip image downloading |

Examples:

```bash
python3 learncpp_makebook.py --start-chapter 0                 # the entire site
python3 learncpp_makebook.py --start-chapter 16 --end-chapter 28
python3 learncpp_makebook.py --steps 3,4 --format epub3        # rebuild from cache
python3 learncpp_makebook.py --limit 5 --delay 0.5             # quick smoke test
```

## Implementation notes

- **The `lxml` parser is required, not optional.** learncpp emits unclosed
  `<p class="cpp-section">` heading tags. Python's stdlib `html.parser` nests the entire
  section *inside* the heading element, which collapses whole sections into one giant
  heading. `lxml` applies the HTML5 auto-close rule and parses it correctly.
- Section headings on the site are styled `<p>` elements, not `<h*>` tags. Step 3 promotes
  `p.cpp-section` → `h2`, `p.cpp-quiz-question` → `h3`, `p.cpp-note-title` → `h4` so the
  table of contents and EPUB navigation work.
- Quiz solutions ship as `<div class="wpsolution" style="display:none">` revealed by a JS
  click handler. A book has no JS, so step 3 drops the inline `display:none`, removes the
  "Show Solution" link and inserts a `Solution` label.
- Ads are `.code-block` (Ad Inserter) and `.cf_monitor` (Ezoic) wrappers inside the article
  body — they are inside `.entry-content`, so they need explicit removal.
- Step 4 demotes each lesson's headings by one level so chapter dividers can own `<h1>`.
- learncpp sits behind Cloudflare, which sporadically returns **520** on a healthy page. Those
  statuses are retried, and step 2 collects failures for a second pass rather than aborting a
  run of several hundred good downloads.
- A cached page smaller than 2 KB is treated as missing and re-fetched — an aborted run can
  leave a 0-byte file behind, and silently trusting it drops a lesson from the book.
- Steps 3 and 4 fail loudly if any indexed lesson does not make it in. A short book must never
  pass as a complete one.

## Note on usage

learncpp.com's content is free to read but not to redistribute. Keep the generated book
for personal offline use.
