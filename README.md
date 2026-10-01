# SDE-Prep

**Live: https://cherie-dips.github.io/SDE-Prep/**

Complete SDE roadmap with a schedule you can pace yourself — pick 1, 2, 4 or 6 months
and the calendar fills in from your start date.

- **Roadmap** — 265 topics across C++, DSA, System Design, OS, CN, DBMS, MERN + DevOps,
  GenAI and Aptitude, each with notes, MCQs and practice problems. System Design includes
  an **App Design** tab covering the app architecture & data modeling round.
- **Calendar** — choose a plan length and date range; the full curriculum is re-paced
  across it. Longer plans add review days. Ticking a topic syncs both ways with the roadmap.
- **Notes** — subject PDFs (Plaksha CSAI, Software Development), served live
  from Supabase.

> **Note:** the **Roadmap** content — explanations, MCQs and practice sets — is
> AI-generated, so verify anything you rely on. The **Notes** PDFs are real course
> material and are not AI-generated.

## Tech stack

The whole site is plain HTML, CSS and JavaScript. Nothing needs to be installed —
the browser opens the files as they are.

| Tool | What it does here |
|---|---|
| HTML, CSS, JavaScript | The website itself |
| Browser storage | Saves your ticked topics and calendar plan on your own device. No login needed. |
| Supabase | Online storage that holds the Notes PDFs |
| PDF.js | Shows the PDFs inside the page |
| GitHub Pages | Hosts the live site |
| Google Analytics | Counts site visits |

## Project structure

```
SDE-Prep/
├── index.html                The site's only page. Loads all the CSS and JS files below.
│
├── css/
│   ├── style.css             Look of the whole site
│   └── notes.css             Look of the Notes tab
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
│   └── notes.js              Runs the Notes tab and the PDF viewer
│
└── assets/notes/             Cover images for the Notes categories
```

## Run it locally

From the project folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.
