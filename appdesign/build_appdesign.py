#!/usr/bin/env python3
"""Builds the App Architecture & Data Modeling prep page.

Content lives in SECTIONS as (id, nav title, html body). The script emits a single
self-contained page with the same sticky index used by the C++ book, so the
navigation and the content can never drift apart.

    python3 build_appdesign.py   ->  appdesign_prep.html
"""

import html
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT = os.path.join(BASE_DIR, "appdesign_prep.html")

PAGE_TITLE = "App Architecture & Data Modeling"

CSS = """
:root { --fg:#e6e6e6; --bg:#161819; --muted:#9aa0a6; --rule:#3a3d40; --code-bg:#1e2224;
        --note-bg:#22262a; --side-bg:#161819; --warn:#d6a860; --good:#7fb069; }
* { box-sizing:border-box; }
html { -webkit-text-size-adjust:100%; scroll-behavior:smooth; }
body { background:var(--bg); color:var(--fg); margin:0; line-height:1.65;
       font-family:Georgia,"Iowan Old Style","Times New Roman",serif; }
a { color:inherit; text-decoration:underline; text-decoration-thickness:1px;
    text-underline-offset:2px; text-decoration-color:var(--muted); }
a:hover { text-decoration-color:var(--fg); }
.layout { display:flex; align-items:flex-start; }

.sidebar { position:sticky; top:0; flex:0 0 27rem; width:27rem; height:100vh;
   overflow-y:auto; overscroll-behavior:contain; background:var(--side-bg);
   padding:3.5rem 0 3rem; scrollbar-width:none;
   font-family:system-ui,-apple-system,"Segoe UI",sans-serif; font-size:.84rem; }
.sidebar::-webkit-scrollbar { width:0; height:0; }
.toc a { display:block; padding:.32rem 1rem; color:var(--muted); text-decoration:none;
   white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.toc a:hover { color:var(--fg); }
.toc a.active { color:var(--fg); }
.toc .num { color:var(--muted); margin-right:.4em; font-variant-numeric:tabular-nums; }

.nav-toggle { display:none; }
.nav-toggle-btn { display:flex; position:fixed; z-index:20; top:.7rem; left:.7rem;
   width:2.4rem; height:2.4rem; border:none; background:var(--bg); color:var(--muted);
   align-items:center; justify-content:center; cursor:pointer; font-size:1.3rem;
   -webkit-user-select:none; user-select:none; }
.nav-toggle-btn:hover { color:var(--fg); }
.nav-toggle:checked ~ .layout .sidebar { display:none; }

.content { flex:1 1 auto; min-width:0; max-width:56rem; margin:0 auto;
   padding:3.6rem 1.5rem 8rem; overflow-wrap:break-word; }
h1.page-title { font-size:2.3rem; line-height:1.2; margin:1rem 0 .5rem; }
.page-sub { color:var(--muted); font-size:1.02rem; margin:0 0 .35rem; }
h2.sec { font-size:1.75rem; margin:4rem 0 1.2rem; scroll-margin-top:1rem; }
h3 { font-size:1.2rem; margin:2.2rem 0 .6rem; }
h4 { font-size:1.02rem; margin:1.6rem 0 .5rem; color:var(--fg); }
p { margin:0 0 1rem; }
ul, ol { margin:0 0 1rem; padding-left:1.3rem; }
li { margin:.35rem 0; }
pre { background:var(--code-bg); border:1px solid var(--rule); border-radius:6px;
      padding:.85rem 1rem; overflow-x:auto; font-size:.84rem; line-height:1.5;
      overflow-wrap:normal; }
pre, code { font-family:"SF Mono",Menlo,Consolas,"Liberation Mono",monospace; }
code { background:var(--code-bg); border-radius:3px; padding:.1em .3em; font-size:.87em; }
pre code { background:none; padding:0; }
table { border-collapse:collapse; width:100%; display:block; overflow-x:auto;
        font-size:.92rem; margin:0 0 1.2rem; }
td, th { border:1px solid var(--rule); padding:.45rem .65rem; text-align:left;
         vertical-align:top; }
th { background:var(--note-bg); }
.box { background:var(--note-bg); border-radius:5px; padding:.9rem 1.1rem; margin:1.2rem 0; }
.box > :last-child { margin-bottom:0; }
.box h4 { margin-top:0; }

/* A defined term: the word, a plain-English meaning, then why it matters. */
.term { border-left:3px solid var(--rule); padding:.15rem 0 .15rem 1.1rem; margin:1.6rem 0; }
.term .word { display:block; font-weight:700; font-size:1.06rem; margin-bottom:.35rem; }
.term > :last-child { margin-bottom:0; }
/* Non-breaking space, because a trailing space in `content` gets collapsed away. */
.term .plain::before { content:"In plain English \\2014\\00a0"; color:var(--muted);
   font-style:italic; }

/* Labelled callouts. The label is generated so it can never be forgotten. */
.analogy, .use, .say { background:var(--note-bg); border-radius:5px; padding:.8rem 1.05rem;
   margin:1.1rem 0; }
.analogy > :last-child, .use > :last-child, .say > :last-child { margin-bottom:0; }
.analogy::before, .use::before, .say::before { display:block;
   font-family:system-ui,-apple-system,sans-serif; font-size:.68rem; letter-spacing:.09em;
   text-transform:uppercase; color:var(--muted); margin-bottom:.45rem; }
.analogy::before { content:"Think of it like this"; }
.use::before { content:"Where this shows up at Pre6"; }
.say::before { content:"Saying it in the interview"; }

dl.gloss { margin:0; }
dl.gloss dt { font-weight:700; margin:1rem 0 .2rem; }
dl.gloss dd { margin:0 0 .2rem; color:var(--fg); }
.tag { display:inline-block; font-family:system-ui,sans-serif; font-size:.7rem;
   letter-spacing:.06em; text-transform:uppercase; padding:.15em .5em; border-radius:3px;
   background:var(--rule); color:var(--fg); vertical-align:middle; margin-right:.5em; }
.tag.fact { background:#2f4536; color:#cfe7d4; }
.tag.infer { background:#4a4023; color:#f0dcb0; }
.you { border-left:3px solid var(--rule); padding-left:1rem; margin:1.2rem 0; }
.q { font-weight:700; margin:1.4rem 0 .3rem; }
@media (max-width:66rem) {
  .sidebar { position:fixed; z-index:15; left:0; top:0; max-width:88vw;
     transform:translateX(-100%); transition:transform .2s ease;
     box-shadow:0 0 24px rgba(0,0,0,.3); }
  .nav-toggle:checked ~ .layout .sidebar { display:block; transform:none; }
}
"""

JS = """
(function () {
  var toc = document.querySelector('.toc');
  var sidebar = document.querySelector('.sidebar');
  var links = {}, heads = [].slice.call(document.querySelectorAll('h2.sec'));
  [].forEach.call(toc.querySelectorAll('a'), function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  // While a click-driven jump is in flight the observer must not touch the
  // highlight: the page sweeps past every heading in between, and reacting to
  // those would scroll the sidebar and cancel the jump partway down.
  var locked = false, unlockTimer = null;

  // Scroll ONLY the sidebar. element.scrollIntoView() also scrolls every
  // scrollable ancestor including the document, which is what was interrupting
  // the jump and leaving you one section short of the one you clicked.
  function revealInSidebar(a) {
    var link = a.getBoundingClientRect(), box = sidebar.getBoundingClientRect();
    if (link.top < box.top) sidebar.scrollTop += link.top - box.top - 8;
    else if (link.bottom > box.bottom) sidebar.scrollTop += link.bottom - box.bottom + 8;
  }

  var active = null;
  function setActive(id, reveal) {
    var a = links[id];
    if (!a) return;
    if (a !== active) {
      if (active) active.classList.remove('active');
      a.classList.add('active');
      active = a;
    }
    if (reveal) revealInSidebar(a);
  }

  // Scroll spy. Measuring positions directly beats an IntersectionObserver here:
  // the observer only reports *changes*, so a fast scroll or a jump could leave
  // the highlight several sections behind whatever is actually on screen.
  function currentId() {
    var line = 120, cur = heads[0];
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].getBoundingClientRect().top <= line) cur = heads[i];
      else break;
    }
    // The final section may be too short to ever reach the line.
    var doc = document.documentElement;
    if (window.innerHeight + window.pageYOffset >= doc.scrollHeight - 2) cur = heads[heads.length - 1];
    return cur.id;
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      if (!locked) setActive(currentId(), true);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  var toggle = document.getElementById('nav-toggle');
  var narrow = window.matchMedia('(max-width: 66rem)');

  toc.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    if (toggle && narrow.matches) toggle.checked = false;

    locked = true;
    clearTimeout(unlockTimer);
    setActive(id, false);

    // Drive the scroll ourselves so one click always lands on the section
    // clicked, however far away it is.
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Throws on file:// in some browsers; the scroll matters, the URL does not.
    try { history.replaceState(null, '', '#' + id); } catch (err) {}

    var release = function () { locked = false; };
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', release, { once: true });
      unlockTimer = setTimeout(release, 1600);   // fallback if scrollend never fires
    } else {
      unlockTimer = setTimeout(release, 900);
    }
  });

  // Deep link on load, and keep the highlight in step with back/forward.
  function syncFromHash() {
    var id = location.hash.slice(1);
    if (id && links[id]) setActive(id, true);
  }
  window.addEventListener('hashchange', syncFromHash);
  if (location.hash.slice(1)) syncFromHash(); else onScroll();
})();
"""

import sections_round
import sections_api
import sections_cpp
import sections_patterns
import sections_data
import sections_problems
import sections_close

# Order here is the order in the page and in the index; the numbering is derived from
# it, so cross-references in the prose ("see section 10") follow this list.
SECTIONS = (
    sections_round.SECTIONS
    + sections_api.SECTIONS
    + sections_cpp.SECTIONS
    + sections_patterns.SECTIONS
    + sections_data.SECTIONS
    + sections_problems.SECTIONS
    + sections_close.SECTIONS
)


def build() -> None:
    toc, body = [], []
    for number, (sid, title, content) in enumerate(SECTIONS, start=1):
        toc.append(
            f"<a href='#{sid}' title='{html.escape(title, quote=True)}'>"
            f"<span class='num'>{number}</span>{html.escape(title)}</a>"
        )
        body.append(f"<h2 class='sec' id='{sid}'>{number}. {html.escape(title)}</h2>\n{content}")

    page = (
        "<!DOCTYPE html>\n<html lang='en'><head><meta charset='utf-8'/>"
        "<meta name='viewport' content='width=device-width, initial-scale=1'/>"
        f"<title>{html.escape(PAGE_TITLE)}</title><style>{CSS}</style></head>\n<body>\n"
        "<input type='checkbox' id='nav-toggle' class='nav-toggle'/>"
        "<label for='nav-toggle' class='nav-toggle-btn' title='Show or hide contents'>&#9776;</label>"
        "<div class='layout'><aside class='sidebar'><nav class='toc'>"
        + "".join(toc) +
        "</nav></aside><main class='content'>"
        f"<h1 class='page-title' id='top'>{html.escape(PAGE_TITLE)}</h1>"
        "<p class='page-sub'>The 45-minute round: API design, class design, data schema. "
        "45 minutes is the common length for this round wherever it is run.</p>"
        "<div class='box'><h4>The book this guide is built on</h4>"
        "<p><i>Head First Design Patterns</i> (Freeman &amp; Robson, O'Reilly) is the reference "
        "used throughout. It is an excellent book for the design-patterns and system-design side "
        "of interviews &mdash; it teaches the principles behind the patterns rather than just "
        "cataloguing them. <b>It is written entirely in Java</b>, so every pattern here is "
        "re-expressed in modern C++, and section 5 sets out the Java-to-C++ OOP differences you "
        "need before reading the patterns: interfaces vs pure virtual base classes, garbage "
        "collection vs RAII and smart pointers, virtual destructors, value vs reference "
        "semantics, and <code>override</code>/<code>final</code>.</p></div>\n"
        + "\n".join(body) +
        f"</main></div>\n<script>{JS}</script>\n</body></html>\n"
    )
    with open(OUTPUT, "w", encoding="utf-8") as handle:
        handle.write(page)
    print(f"wrote {OUTPUT} ({len(SECTIONS)} sections, {len(page)//1024} KB)")


if __name__ == "__main__":
    build()
