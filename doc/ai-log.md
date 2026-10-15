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

### [2026-10-15] Claude Code (Figma MCP) — shadcn kit and hi-fi `ab-00.start`

- **Task:** The user picked shadcn. Create a new page and make a high-fidelity version of the first wireframe (`ab-00.start`).
- **Generated:** Obra shadcn/ui isn't linked to the file and can't be added through the API, so the agent built a local kit with shadcn's structure on a new **Components** page: a `shadcn` variable collection (14 colour roles named as in shadcn, plus radius and space), 6 Geist text styles, 7 Lucide icons, and the components Composer (Empty/Filled), BalanceCard, TabItem, TabBar and AiOrb. On a new **Screens** page it built `ab-00.start` from these instances, with the status bar and home indicator from the iOS 18 kit (the iOS 26 kit refused the import: "Not permitted to upsert from library").
- **Changed:** —, *waiting for the user's review*.
- **Judged by:** Screenshot check (no clipped text or overlaps, Geist throughout). All colours on the screen are bound to variables; the AI orb's gradient stops are bound to `color/ai-from` and `color/ai-to`. Contrast of `muted-foreground` #6B645B on the canvas is about 5.4:1 (estimated, not yet measured in Figma).
- **Verdict:** pending
- **Assets:** Figma pages `Components` (`21:372`) and `Screens` (`21:555`), frame `ab-00.start` (`21:556`).

### [2026-10-15] Claude Code (Figma MCP) — Persona name

- **Task:** Name the persona Alex Brooke (the user's call; the assistant calls them Alex) in the docs and wireframes. Follow-up: Alex is an English teacher (user's call), added to `persona.md` and `problem.md` with the school-holiday consequence for the target date.
- **Generated:** `[Name]` replaced in `persona.md` and `02-define/problem.md`; open question closed in `current-state.md`. The wireframe screens already greeted "Alex", so the only Figma change is the section subtitle (`15:326`), which now names the persona.
- **Changed:** —
- **Judged by:** Searched every doc and every text node on the Wireframes page for the old placeholder.
- **Verdict:** ✅
- **Assets:** Figma text `15:326`

### [2026-10-15] Claude Code — Define and design docs from the wireframes

- **Task:** Fill in `02-define/` (problem, principles, journey) and `03-design/` (conversation script, screen specs, prototype spec) from the brief and the wireframes.
- **Generated:** All six docs. Copy taken from the wireframe frames as built; a maths table for every plan variant; a fixed order for step 4 (type "start in December" → tight → fix chip → €430); routes, a single `plan` store and transitions for the SvelteKit prototype; a list of components the wireframes use that the inventory lacks.
- **Changed:** The agent caught its own call to disable "Review plan" while the plan is tight and reversed it (it contradicts principle 4, "the user steers"). Two wireframe changes are proposed, not made: a third fix chip in `--tight` and the `ab-04` banner wording. *Waiting for the user's review.*
- **Judged by:** Every number checked against `persona.md` (8 × 375, 7 × 430, 6 × 500, 7 × 440, 10 × 300, 6 × 417); every screen's copy read off a screenshot of Figma section `17:462`; each screen traced to a brief requirement.
- **Verdict:** pending
- **Assets:** —

### [2026-10-15] Claude Code — AI assistant flows research

- **Task:** Research the most common AI assistant app flows, with Claude on mobile as the main reference, since much of the bank's functionality will follow them.
- **Generated:** `01-understand/assistant-flows.md`: an anatomy of Claude on mobile, ten common flows (start → come back) compared across Claude, ChatGPT, Gemini and Perplexity, a mapping onto the six journey steps, 8 implications and a list of new components.
- **Changed:** —, *waiting for the user's review*.
- **Judged by:** Claude features are dated from the official release notes; ChatGPT from its own UI guidelines; Gemini from its help page. Checkout details are from launch-era press. Some Claude UI details come from model knowledge and are marked *(PK)*; not tested on a phone.
- **Verdict:** pending
- **Assets:** —

### [2026-10-15] Claude Code + Figma MCP — Palettes on the Reference boards

- **Task:** Add the colour audit to the Figma Reference page.
- **Generated:** A flat-fill palette strip on each of the 17 app boards (Klarna and Wise also get their accent chip); a new summary board `ab-reference-20.colour-audit` (Klarna vs Wise, taken hues, candidate accents with a button sample and contrast, proposed palette). Rows re-stacked to keep 120 px gaps.
- **Changed:** —
- **Judged by:** Screenshots of the summary board and the Wise board checked for clipping and legibility. Values come from `visual-audit/palettes.json`.
- **Verdict:** pending
- **Assets:** Figma page `4:2`, board `10:2`

### [2026-10-15] Claude Code — Colour palette audit

- **Task:** Audit the palettes of Klarna and Wise (the user's chosen look) against the other 15 apps, and propose a starting palette.
- **Generated:** `01-understand/color-audit.md`; the script `visual-audit/palette.py` (flat-fill colour clustering) and its outputs `visual-audit/palettes.json` and `palettes.png`; WCAG contrast checks; a proposed palette (warm off-white, near-black ink, butter accent, periwinkle-to-aqua AI gradient).
- **Changed:** —, *waiting for the user's review*.
- **Judged by:** Extracted Klarna and Wise values match their published or recreated values (pink ≈ #FFA8CD, lime #9FE870, forest #163300). The contrast ratios are computed, not estimated. JPEG and marketing screenshots: hex values are approximate. The "unclaimed hue" claim covers only these 17 apps.
- **Verdict:** pending
- **Assets:** `01-understand/visual-audit/palettes.png`

### [2026-10-15] Claude Code — Component library scan (Klarna / Wise look)

- **Task:** The user picked Klarna and Wise as the closest look. Find Figma component libraries that get close to that look with little customisation.
- **Generated:** A shortlist, first in chat, later saved to `03-design/ui-kits.md`: Obra shadcn/ui (Community), Material 3 Design Kit with Theme Builder, Apple iOS UI kit for system chrome, and paid fintech kits (Finzo, FINA) as a fallback. Finding: neither Klarna nor Wise publishes a Figma kit (Wise's system is closed), so only unofficial token recreations exist.
- **Changed:** —, *waiting for the user's pick*.
- **Judged by:** Web search only; the files weren't opened in Figma. Kit contents (variables, component counts) are vendor-reported. Check before committing.
- **Verdict:** pending
- **Assets:** `03-design/ui-kits.md`

### [2026-10-15] Claude Code + Figma MCP — Reference page

- **Task:** Build a Reference page in the main Figma file with every reference image, grouped by source, following the user's utility-board template (Eigodojo, Studio Cataplasma).
- **Generated:** It measured the template from the Eigodojo file through the Plugin API (fills, padding, type sizes). It built 19 boards in 5 rows and uploaded 158 images into placeholders.
- **Changed:** The agent caught its own quality problem: the App Store API returns 222 px thumbnails, which would look blurry in Figma. It fetched everything again at 600 px before uploading.
- **Judged by:** A structural check (every placeholder has an image fill; no boards overlap) and one full-page screenshot.
- **Verdict:** pending the user's review
- **Assets:** Figma page `4:2`

### [2026-10-15] Claude Code (Figma MCP) — Wireframe review and icons

- **Task:** Check the wireframes after the user's edits (new start screen, decluttered `ab-01`) and add the missing icons.
- **Generated:** 8 icon components (`wf/icon/*`: mic, send, chevron-left, more, home, pay, card, profile), placed in Composer, Header and TabBar, plus status-bar indicators. Fixes: the start frame was a second `ab-01.intent` and is now `ab-00.start` (added to journey, screens and prototype docs); the tight-state chip said "Move to 1 Jul · €375/mo", which doesn't add up (7 × €375 = €2,625), now €430; the second chip now shows €417/mo; the `ab-01` note no longer mentions suggestions; the wrapper frame became a Section so prototype links work.
- **Changed:** The user removed the suggestion chips and the activity list from Home and added the start screen; the agent flagged the chips' removal as a trade-off but didn't reverse it.
- **Judged by:** Full-section screenshot; the maths checked against `persona.md`.
- **Verdict:** pending
- **Assets:** Figma section `17:462`

### [2026-10-15] Claude Code (Figma MCP) — Wireframes of the AI-assisted flow

- **Task:** Wireframe the 6-step AI-assisted flow on a new Figma page.
- **Generated:** Page **Wireframes** (`12:2`): 7 greyscale frames (`ab-01.intent` … `ab-06.done`, plus `ab-04.adjust--tight` for the state change), a yellow note under each (user / AI / standard steps replaced / brief item), and a local `wf-kit` of 18 components (6 with variants) that every screen is built from.
- **Changed:** The agent fixed two of its own defects after a screenshot check: the placeholder label didn't wrap, and the slider variant property was named "Value" like its text property (renamed "Position"). Otherwise —, *waiting for the user's review*.
- **Judged by:** Full-page screenshot: no clipped text, no overflow, all text set through component properties. Numbers checked against `persona.md`.
- **Verdict:** pending. Open point: the story approves the skip-December plan (€430), but `persona.md` recommends €375.
- **Assets:** Figma page `12:2`

### [2026-10-15] Claude Code — AI-assisted flow for the holiday-savings task

- **Task:** Turn the 18-step standard flow into the AI-assisted flow the brief asks for.
- **Generated:** A 6-step flow on the existing `ab-01`…`ab-06` tags: what the user does, what the AI says and shows, and the components used. Options and adjust maths come from the persona story data (€375 / €430 skip-Dec / €500 start-Dec is tight). Includes a before/after table mapping the 18 steps onto the 6. Given in chat only.
- **Changed:** —, *waiting for the user's review*.
- **Judged by:** Checked against `journey.md`, research implications 1–10, `assistant-flows.md` and the persona numbers (8 × €375 = €3,000; 7 × €430 = €3,010; 6 × €500 = €3,000 > €440 spare).
- **Verdict:** pending
- **Assets:** —

### [2026-10-15] Claude Code — Traditional flow for the holiday-savings task

- **Task:** List every step a user takes in a standard (menu-driven) banking app to save €3,000 for a holiday and work out the monthly amount.
- **Generated:** A 4-phase, ~18-step baseline flow (work out affordability → open savings → set standing order → keep it on track) with pain points mapped to the brief's five "demonstrate" items. Given in chat only.
- **Changed:** —, *waiting for the user's review*.
- **Judged by:** Built from model knowledge of typical EU bank and neobank apps, not from observed flows; steps vary by bank. Usable as a "before" baseline once the user has checked it against one real app.
- **Verdict:** pending
- **Assets:** —

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
