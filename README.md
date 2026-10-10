# Interview.ai

**Live: https://cherie-dips.github.io/SDE-Prep/**

Complete SDE roadmap with a schedule you can pace yourself — pick 1, 2, 4 or 6 months
and the calendar fills in from your start date.

- **Roadmap** — 265 topics across C++, DSA, System Design, OS, CN, DBMS, MERN + DevOps,
  GenAI and Aptitude, each with notes, MCQs and practice problems. System Design includes
  an **App Design** tab covering the app architecture & data modeling round.
- **Calendar** — choose a plan length and date range; the full curriculum is re-paced
  across it. Longer plans add review days. Ticking a topic syncs both ways with the roadmap.
- **Notes** — subject PDFs from Plaksha CSAI courses, served live from Supabase. Every PDF has
  **Ask AI**: ask questions about it and get answers that point to the exact spot in the PDF (click a
  source and the PDF scrolls there), or turn it into flashcards, a quiz or a summary.
- **Study AI** — your own study space: upload your class notes, handouts or photos of handwritten
  pages, ask questions about them, and review flashcards on a schedule. Decks saved from Ask AI show up
  here. One free account works for both Study AI and Ask AI.

> **Note:** the **Roadmap** content — explanations, MCQs and practice sets — is
> AI-generated, so verify anything you rely on. The **Notes** PDFs are real course
> material and are not AI-generated. **Ask AI** answers are written by AI from those PDFs
> and list their sources, so check the spot they cite.

## How Study AI and Ask AI work

Both come from [NoteScanner](https://github.com/cherie-dips/NoteScanner):

- The **Study AI** tab shows the NoteScanner app inside this site, in this site's colours.
- **Ask AI** talks to NoteScanner's server. The server reads each course PDF from the Notes bucket
  **once** (handwriting too) into a shared course library, so students don't upload anything. Answers
  come from the open PDF first, then the rest of that course.
- Both sites live on `cherie-dips.github.io`, so signing in once (in either) signs you in to both.

## Tech stack

The whole site is plain HTML, CSS and JavaScript. Nothing needs to be installed —
the browser opens the files as they are.

| Tool | What it does here |
|---|---|
| HTML, CSS, JavaScript | The website itself |
| Browser storage | Saves your ticked topics and calendar plan on your own device. No login needed (Study AI and Ask AI need a free account). |
| Supabase | Online storage that holds the Notes PDFs |
| PDF.js | Shows the PDFs inside the page |
| NoteScanner | Study AI tab, and the server behind Ask AI (FastAPI on Hugging Face) |
| marked, DOMPurify, KaTeX | Show Ask AI answers: formatting, safely cleaned, with maths. Loaded the first time Ask AI is used |
| GitHub Pages | Hosts the live site |
| Google Analytics | Counts site visits |

## Project structure

```
SDE-Prep/
├── index.html                The site's only page. Loads all the CSS and JS files below.
│
├── css/
│   ├── style.css             Look of the whole site
│   ├── notes.css             Look of the Notes tab
│   └── study-ai.css          Look of the Study AI tab and the Ask AI panel
│
├── js/
│   ├── app.js                Runs the Calendar and Roadmap, holds the study schedule, saves progress
│   ├── content-cpp-dsa.js    C++ topics (also the old DSA list, now hidden)
│   ├── content-dsa.js        DSA Patterns: 94 patterns, each with practice problems
│   ├── content-sysdes.js     System Design topics
│   ├── content-appdesign.js  App Design tab (shown inside System Design)
│   ├── content-cs.js         Operating Systems, Computer Networks, DBMS
│   ├── content-dev.js        MERN + DevOps, GenAI / ML / DL, Aptitude
│   ├── notes-data.js         List of Notes subjects, and the Supabase address
│   ├── notes.js              Runs the Notes tab and the PDF viewer
│   └── study-ai.js           Study AI tab, Ask AI panel, and the shared sign-in
│
└── assets/notes/             Cover image for the Notes category
```

## Run it locally

From the project folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000

Ask AI talks to the live NoteScanner server, which only accepts requests from the published site.
To try it locally, run [NoteScanner's server](https://github.com/cherie-dips/NoteScanner#running-it-on-your-computer)
with `CORS_ORIGINS=http://localhost:8001`, serve this site on port 8001
(`python3 -m http.server 8001`), and run in the browser console:

```
localStorage.setItem('studyai_api', 'http://localhost:8000')   // then reload
```

The Study AI tab shows the live NoteScanner site. The shared sign-in only works when both sites are on
one address with GitHub Pages' layout (`/SDE-Prep/` and `/NoteScanner/`).
