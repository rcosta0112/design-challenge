# AI Log

Every use of an AI tool, logged when it happens. This is the evidence for the "AI-assisted design & critical judgement" criterion (25%) and the source for the AI slide. The brief asks for four things, so every entry answers them: **which tool, what it generated, what was changed, how the quality was judged.**

Rejected output counts as much as accepted output; it's where the judgement shows. Save before/after images in `doc/ai-log-assets/` (or a Figma "AI exploration" frame) and link them.

**Verdict:** ✅ used as is · ✏️ edited · ❌ rejected

## Tools used

Fill this in as tools are added.

| Tool | Used for |
|---|---|
| Claude Code (Opus 5.5) | Planning, doc structure, research synthesis, building in Figma through the Figma MCP |

## Summary for the slide

Fill this in at the end: counts by verdict, the 2–3 best examples, and one sentence on how quality was judged.

---

## Entries

Newest first.

### [2026-10-15] Claude Code + Figma MCP — Reference page

- **Task:** Build a Reference page in the main Figma file with every reference image, grouped by source, following the user's utility-board template (Eigodojo, Studio Cataplasma).
- **Generated:** It measured the template from the Eigodojo file through the Plugin API (fills, padding, type sizes). It built 19 boards in 5 rows and uploaded 158 images into placeholders.
- **Changed:** The agent caught its own quality problem: the App Store API returns 222 px thumbnails, which would look blurry in Figma. It fetched everything again at 600 px before uploading.
- **Judged by:** A structural check (every placeholder has an image fill; no boards overlap) and one full-page screenshot.
- **Verdict:** pending the user's review
- **Assets:** Figma page `4:2`

### [2026-10-15] Claude Code — Visual audit of 17 apps

- **Task:** Collect current App Store screenshots of traditional banks, neobanks, outliers and AI assistant apps, then audit the visual styles.
- **Generated:** A script that pulls screenshots from Apple's public lookup API (149 images, 17 apps), one contact sheet per app, the written audit and three direction options (`01-understand/visual-audit.md`).
- **Changed:** —, *waiting for the user's review*. The direction is left open on purpose; the AI's recommendation (A) is not a decision.
- **Judged by:** The agent noted the limit itself: store frames are marketing compositions, not real flows. Two apps returned nothing (Lunar, Trade Republic). The user to check: are the observations right, and is the right set of outliers there?
- **Verdict:** pending
- **Assets:** `01-understand/visual-audit/sheets/`

### [2026-10-15] Claude Code — Research first pass

- **Task:** Find similar implementations in banking and outside it; read the Dione site assistant's code as a precedent; gather trust and approval research.
- **Generated:** `01-understand/research.md`: bank assistant scan (7 products), non-bank patterns (9), a Dione code read-through, trust survey data, approval practice, 10 implications.
- **Changed:** The user pointed to the Dione site and its case-study deck as a precedent; the agent read the code and the Figma Slides deck (via the Figma MCP) and added both to section 4. Otherwise —, *waiting for the user's review*.
- **Judged by:** Source quality is flagged inline (company-reported, secondary, single source, prior knowledge). Two patterns (Artifacts/Canvas, inline diffs) come from model knowledge, not this search, and are marked. Gaps are listed. The user to check the key figures before they reach a slide.
- **Verdict:** pending
- **Assets:** —

### [2026-10-15] Claude Code — Plan and doc structure

- **Task:** Read the brief and the eigodojo reference project, then propose a plan and a doc structure.
- **Generated:** A broad plan (phases, hour budget, 6-screen journey, Figma page structure, handoff component choice) and this folder structure.
- **Changed:** —
- **Judged by:** Checked against each brief requirement in `criteria-map.md`.
- **Verdict:** ✏️ Accepted as a starting point; open questions are listed in `current-state.md`.
- **Assets:** —

<!-- Template
### [date] Tool — Short title
- **Task:**
- **Generated:**
- **Changed:**
- **Judged by:**
- **Verdict:** ✅ / ✏️ / ❌
- **Assets:**
-->
