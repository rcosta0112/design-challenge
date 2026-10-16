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

### [2026-10-16] Claude Code (Figma MCP) — Pass plan from the review

- **Generated:** A 7-step plan with review checkpoints (`06-presentation/pass-plan-2026-10-16.md`), after Plugin API reads of the Screens and Components pages (frame names, prototype links, Background usage, component sets and variants).
- **Changed:** Scope cut by the user: Reference page, screen order, the tap-to-correct beat, desktop hint and slides left out; the AI workflow goes to a doc before Figma. Several review findings were already fixed (frame name, a basic Figma prototype, the stray frame).
- **Judged:** Every claim about the file checked with a read first; the deletions that could break instances (Archive skies) were raised as a decision instead of planned blind.
- **Verdict:** pending

### [2026-10-16] Claude Code (Figma MCP) — Deliverables review

- **Generated:** A review of the Figma file (Screens and Components screenshots, page structure), the prototype and the docs against the brief and scoring. Gaps ranked by score impact, with a suggested order: `06-presentation/deliverables-review.md`.
- **Changed:** The user caught a wrong finding: the first pass said three pages were missing because the MCP page listing (`get_metadata` without a node) only returned loaded pages. Re-checked with the Plugin API (`figma.root.children`): all six pages exist. Review corrected; added a binding audit of the Screens page (no unbound colours, all loose text styled).
- **Judged:** Each finding checked against the brief's wording and the actual file (metadata, screenshots, Plugin API reads); maths on the screens re-checked by hand. Lesson: verify page lists with the Plugin API, not the MCP listing.
- **Verdict:** ✏️

### [2026-10-15] Claude Code — Review plan button contrast
- **Task:** The user asked to check the Review plan button's contrast.
- **Generated:** Diagnosis from computed styles: 1.20:1, white label on mint, because tailwind-merge dropped the colour class next to the custom `text-body-md`. Fix: type styles registered with tailwind-merge (`cn()` and Button's `tv()`); pill buttons on `text-label-md`.
- **Changed:** —
- **Judged by:** Computed styles before/after on Home and `/plan` (only the two pill buttons changed, now matching Figma `label/md` 16/24); contrast audit of every text on a solid background (none below 4.5:1); Review plan 14.08:1. `check`, `lint`, `build` pass.
- **Verdict:** pending
- **Assets:** —

### [2026-10-15] Claude Code — Sky video: load jump, contrast check, greeting typewriter
- **Task:** The user saw a jump on load and weak contrast in places over the new sky video; then asked for a typewriter effect on the Home greeting with line breaks that don't move.
- **Generated:** A diagnosis (throttled-load screenshot series, per-frame scene scores, loop-seam check, per-text contrast measured over 6 pinned video times); a new poster (`nishita-sky-poster.webp`, the video's first frame as Edge renders it); `Sky` now preloads that poster as an `<img>` under the video and fades the video in on `playing`; a `Typewriter` component.
- **Changed:** Contrast fix was left to the user, who picked cutting the loop to its dark stretch over a scrim or dimming. Claude chose the 24 s cut point from per-second brightness, measured contrast and frames, and built the 48 s loop from the source's mirrored halves (decision-log "Sky video cut to its dark stretch").
- **Judged by:** Re-ran the throttled load: no visible change until playback, then a mean colour difference of 1–3 /765 (invisible). Typewriter: line tops and heading height identical at every step from 0 to 40 characters; reduced motion shows the text at once. `check`, `lint` pass.
- **Verdict:** pending
- **Assets:** —

### [2026-10-15] Claude Code (Figma MCP) — Wireframe page tidy-up

- **Task:** Put each wireframe on its own board, like the other utility pages.
- **Generated:** 10 boards on the Wireframes page in the Reference-page template (`ab-wireframes-00.overview`, `-01…08` with screen + annotation, `-09.wf-kit`); the old section and loose title/label texts removed. Screen frame names (tags) unchanged.
- **Changed:** —, *waiting for the user's review*.
- **Judged by:** Board padding, fill, radius and header type copied from `ab-reference-01`; screenshot of one board checked.
- **Verdict:** pending
- **Assets:** —

### [2026-10-15] Claude Code (Figma MCP) — Figma ↔ prototype reconciliation

- **Task:** Check the shadcn-aligned Figma file against the prototype and fix inconsistencies; Figma is the source of truth, flag where that breaks.
- **Generated:** A comparison of the variables used on all 8 screens, per-component token bindings and icon strokes against `layout.css` and the Svelte components; code fixes (sheet radius, glass blur, tab icon colour, check stroke, label styles); Figma fixes (Pay icon strokes, 3 stale descriptions).
- **Changed:** Nothing rejected. Two candidates were not changed: the composer icon stroke (flagged to the user instead of copying a likely Figma mistake), and the font weight difference (computed weight is correct; rendering only).
- **Judged by:** Variable values equal to the CSS values; screenshot walk of the full journey compared with Figma frames; Figma TabBar screenshot after the fix.
- **Verdict:** pending

### [2026-10-15] Claude Code — Sky render to a ping-pong mp4

- **Task:** Encode the 196-frame Nishita sky EXR render (`resources/render/`) as a ping-pong loop at 1 source frame per second that doesn't look choppy.
- **Generated:** Four options (crossfade blend, motion interpolation, AI interpolation, re-rendering more frames); the user picked crossfade. Output: `resources/nishita-sky-pingpong.mp4` (390 s, 30 fps, H.264, 24 MB), forward then reverse with no repeated end frames, so it loops cleanly.
- **Changed:** The first test converted the linear EXRs to sRGB in ffmpeg and came out washed-out grey next to `code/static/sky/0011.webp`. Rejected. The user said the frames were graded with AgX High Contrast, so the agent applied that view transform through headless Blender 5.2 (16-bit PNGs) before blending.
- **Judged by:** Compared frame 11 with the existing webp, both side by side and by mean RGB at three heights (within 2–6/255). Checked still frames from the final video for ghosting and banding. Motion smoothness is still for the user to judge in playback.
- **Verdict:** ✏️
- **Assets:** —

### [2026-10-15] Claude Code (Figma MCP) — Prototype screens `ab-00` → `ab-06` in SvelteKit

- **Task:** Build the prototype's screens from the hi-fi Figma frames, with animated transitions.
- **Generated:** ~25 Svelte components named after the Figma library (Composer, ChatBubble, PlanCard, AmountSlider, ProjectionChart, …), the scripted thread (`thread.svelte.ts`), the plan model with fix chips and change notes, the Face ID prompt, the Home → thread morph. Assets from Figma: sky `0011` (WebP), AI orb, status-bar glyphs; icons from Lucide (same set as Figma).
- **Changed:** Fixed in the loop after screenshot checks: the Slider and Switch didn't render (shadcn-svelte styles expect `data-checked`/`data-horizontal`, bits-ui sets `data-state`/`data-orientation`; mapped in CSS); the "What if…" bubble pushed the chart under the footer after a fix (now cleared); reduced motion had also removed the pacing (now only movement). Calls beyond the spec: decision-log 2026-10-15 "Prototype: calls made beyond the screen specs". User review: *pending*.
- **Judged by:** A scripted Playwright walk through the whole journey (13 screenshots, desktop frame and 390 px phone with reduced motion), compared side by side with the Figma frames; zero console errors; `check`, `lint`, `build` pass.
- **Verdict:** pending

### [2026-10-15] Claude Code — Tailwind fit check and lock-down

- **Task:** Assess how well the tokens work with Tailwind 4, then fix the gaps.
- **Generated:** A 5-point assessment (`04-system/token-review.md` › Fit with Tailwind 4). Fixes:
  - Weights built into the `text-*` utilities; 30 class strings rewritten by a script.
  - Default palette and radii reset in `@theme inline` (shadows were reset too, then restored: the user wants them available as exceptions).
  - `space/10`, `radius/sm` and `radius/2xl` added and bound in Figma; the chat bubble moved off hard-coded corners.
- **Changed:** Kept gap 5 (Dev Mode shows `var()`, not classes) as designed. Left device insets (34, 42) unbound. Accepted the one visual change: the bubble tail goes from 6 to 8 px.
- **Judged by:** `svelte-check` (0 errors) and the build. The compiled CSS was checked for removed palette and shadow variables, a working focus ring and `border-transparent`, and weight in `text-label-sm`. A Figma screenshot of the bubble was checked too.
- **Verdict:** ✏️ Edited.
- **Assets:** `04-system/tokens.md` › Tailwind setup

### [2026-10-15] Claude Code — Token system review against industry practice

- **Task:** Check the token system's naming and organisation against industry standards.
- **Generated:** An audit of the Figma variables (read through the Plugin API), the text styles, component bindings and `layout.css`. It lists 17 findings, ranked: one flat multi-purpose collection, no primitive tier, modes that mix brand with colour scheme, Figma/code drift, component-named tokens, radius names that collide with Tailwind, and more. See `04-system/token-review.md`.
- **Changed:** The user dropped the Light/Mint modes (only Mint Dark). Taking shadcn into account revised four findings: kept `composer-*` instead of `inverse-*`, replaced the Tailwind-scale radius rename with shadcn's `--radius` base, and dropped the primitives tier and the collection split. Applied in Figma and code on the user's "do it".
- **Judged by:** Before/after screenshots of `ab-03.plan` and `ab-04.adjust--tight` plus the colour and spacing boards; `svelte-check` (0 errors) and the production build; the compiled CSS checked for radius values (`rounded-3xl` = 24, `rounded-xl` = 16).
- **Verdict:** ✏️ Edited, then applied.
- **Assets:** `04-system/token-review.md`; Figma page `Archive` (`48:1090`)

### [2026-10-15] Claude Code — Prototype scaffold (SvelteKit + shadcn-svelte)

- **Task:** Scaffold the prototype in SvelteKit + shadcn with animated transitions, using Eigodojo as a reference without copying it wholesale.
- **Generated:** `code/` app: Mint Dark tokens as CSS variables, phone frame, direction-aware route transitions, `Sheet` with shallow routing, `AnimatedNumber`, reduced-motion helper, the `plan` object with the journey maths, stub routes `/` and `/plan`.
- **Changed:** Pinned SvelteKit 2 (the CLI's default 3.x needs a newer Node); wrote `components.json` by hand (the shadcn-svelte init needs an interactive preset); fixed a regex mangled by a shell heredoc. User review: *pending*.
- **Judged by:** `npm run check`, `lint` and `build` pass; both routes render; plan maths checked against `journey.md` (€375 × 8, €430 × 7 skip Dec, €500 × 6 start Dec = tight).
- **Verdict:** pending

### [2026-10-15] Claude Code (Figma MCP) — Dark theme for the library scaffolding

- **Task:** Make the Components page dark to match the app, without touching the components.
- **Generated:** A colour swap on the scaffolding only (page background, boards, labels, foundation specimens): 229 fills changed; nodes inside components and instances were skipped.
- **Changed:** —
- **Judged by:** Screenshots of the cards, spacing and backgrounds boards.
- **Verdict:** pending
- **Assets:** Figma page Components `21:372`

### [2026-10-15] Claude Code (Figma MCP) — Component library on the utility template

- **Task:** Reorganise the Components page to the user's template, add missing components, and make it ready for handoff.
- **Generated:**
  - 15 boards (`ab-components-01.colour` … `15.backgrounds`) with Foundations boards: a colour table across 3 modes, type specimens, spacing and radius.
  - Button disabled variants, ToggleRow off, AmountDisplay, and descriptions on 39 components.
  - The amount text on the `ab-04` screens is replaced with AmountDisplay instances.
- **Changed:** Agent self-correction: variant sets were clipped at a fixed width; they now hug.
- **Judged by:** Screenshots of the boards and `ab-04`, and an audit for loose text on screens.
- **Verdict:** pending
- **Assets:** Figma page Components `21:372`

### [2026-10-15] Claude Code (Figma MCP) — Remaining hi-fi screens `ab-01`, `ab-03`, `ab-05`, `ab-06`

- **Task:** Build the rest of the screens with the background images (the user prefers the darker ones).
- **Generated:** Components OptionCard, PlanCard (draft/approved), ProgressBar, Badge and icon/scan-face; a Button Icon boolean; a SheetHeader "Show action" boolean; a multi-line Composer `filled`; text style `body/lg`. Frames `ab-01.intent`, `ab-03.plan`, `ab-05.review` and `ab-06.done`. The Screens row at y=2200 is now ordered `ab-01` → `ab-06` and every frame uses `sky=0011`.
- **Changed:** User review: *pending*.
- **Judged by:** One screenshot per screen (no overflow, no clipping, script copy matches `conversation-script.md`).
- **Verdict:** pending
- **Assets:** Figma page Screens `21:555`

### [2026-10-15] Claude Code (Figma MCP) — Mint Dark mode, thread components, hi-fi `ab-02` and `ab-04`

- **Task:** Use the user's sky images for more `ab-00` variations, adjust the palette to fix the review issues, and build hi-fi `ab-02` and `ab-04`.
- **Generated:**
  - Variable mode `Mint Dark` and 11 new colour variables; text styles `heading/sm` and `label/md`.
  - 7 Lucide icons and 12 components: TopBar, ChatBubble, StatusStep, Chip, Banner, Button, SummaryRow, SheetHeader, EstimateTag, CashflowBar, Slider, ToggleRow, ProjectionChart, plus the Background set.
  - Frames `ab-00.start--dark-{0031,0001,0011,0041,0141}`, `ab-02.understand`, `ab-04.adjust` and `ab-04.adjust--tight` on page Screens (y = 1100 and 2200).
- **Changed:** Agent self-corrections:
  - Components were stuck at a fixed height because `resize()` resets sizing; switched to hug.
  - The user bubble didn't wrap; now uses `maxWidth`.
  - The agent deleted the TopBar by mistake and restored it.
  - `ab-04` overflowed; removed the Target date row (repeated in the sub-line and chart) and tightened the spacing.
  - Changed the toggle hint and made the step checks grey (one-accent rule).
  - User review: *pending*.
- **Judged by:** Screenshot of each screen; every node is an instance or a frame with bound variables. Copy is from `conversation-script.md`. Contrast is not yet measured.
- **Verdict:** pending
- **Assets:** Figma page Screens `21:555`; Components `21:372`

### [2026-10-15] Claude Code (Figma MCP) — Review of two dark-background variations

- **Task:** Review the user's two Figma variations of `ab-00.start--mint` (sky photo `23:748`, slate gradient `23:820`) and suggest improvements.
- **Generated:** Critique and 7 recommendations, saved to `01-understand/color-audit.md` ("Review: two dark-background variations"). Recommends B, rebuilt as a `Mint Dark` variable mode with an AI-gradient glow.
- **Changed:** —
- **Judged by:** Screenshots and variable bindings read via the Figma MCP. Checked against the one-accent rule, the components-only rule and the visual-direction decision. Dark-mode hex values are proposed; contrast is not yet verified.
- **Verdict:** pending
- **Assets:** —

### [2026-10-15] Claude Code — "Mint" palette variation (Wise-like)

- **Task:** Build a second colour direction closer to Wise from the user's accent `#0FFFB3` and a reference screenshot.
- **Generated:** A grey ramp tinted toward the mint, contrast checks (script, WCAG 2.x), the Figma mode `Mint` and the frame `ab-00.start--mint`.
- **Changed:** Following the user's notes during the work: the Composer drop shadow and the TabBar stroke were removed, and contrast was handled with greys instead of strokes.
- **Judged by:** Every text pair is 5.2:1 or higher; mint is never used as text (1.3:1 on white). Screenshot checked against the reference.
- **Verdict:** pending
- **Assets:** Figma `24:141`

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

### [2026-10-15] Claude Code — iOS Safari black strip under the address bar
- **Task:** Fix the black strip behind Safari's address bar on iPhone.
- **Generated:** Diagnosis (`h-dvh` + `bg-black` + no `viewport-fit=cover`) and the fix: a fixed `100lvh` sky on phones, plus a body colour matched to the sky.
- **Changed:** —
- **Judged by:** Pending a retest on the user's iPhone. There is no automated cross-browser testing; Playwright WebKit does not simulate iOS toolbars.
- **Verdict:** ✏️ Pending device check
- **Assets:** `code/src/app.html`, `code/src/lib/components/Sky.svelte`, `code/src/routes/layout.css`

### [2026-10-15] Claude Code — Cross-browser tests from Eigodojo
- **Task:** Copy Eigodojo's Playwright setup and run it on the prototype.
- **Generated:** `playwright.config.ts`, `tests/a11y.spec.ts`, `tests/visual.spec.ts`, `tests/layout.spec.ts`, npm scripts and 10 screenshot baselines.
- **Changed:** Adapted, not copied: different routes and port, reduced motion, an iPhone 15 Pro Max project and a sky layout check.
- **Judged by:** Two runs, 22/22 passing; spot-checked the iPhone SE and iPhone 14 baselines by eye.
- **Verdict:** ✅ Accepted. `/plan` coverage stops at ab-02.
- **Assets:** `code/playwright.config.ts`, `code/tests/`

<!-- Template
### [date] Tool — Short title
- **Task:**
- **Generated:**
- **Changed:**
- **Judged by:**
- **Verdict:** ✅ / ✏️ / ❌
- **Assets:**
-->
