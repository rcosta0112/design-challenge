# Deliverables Review (2026-10-16)

A review of the deliverables against the brief, written from the reviewer's side. Reviewers receive two links, the Figma file and the prototype, and probably nothing else. Anything that isn't reachable from those two links (the repo, `doc/`) doesn't count unless the slides or the file point to it.

Checked: the Figma file (pages in order: `Screens` `21:555`, `Components` `21:372`, `Wireframes` `12:2`, a divider, `Archive` `48:1090`, `Reference` `4:2`; one variable collection, `shadcn`, 52 variables, mode `Dark`), the `code/` prototype, `README.md`, `brief.md`, `criteria-map.md` and the logs.

*Correction:* a first pass said Reference, Wireframes and Archive were missing. That was wrong: the MCP's page listing (`get_metadata` without a node) only returned the two loaded pages. A Plugin API read (`figma.root.children`) lists all six.

## What's strong

- The 8 hi-fi screens are polished, consistent and built from instances. Audited with the Plugin API: no solid fill or stroke outside an instance is unbound from a variable, and the 4 loose text layers all use text styles.
- The process is in the file: annotated wireframes on their own boards with a `wf-kit`, the 17-app Reference audit with palettes, and the Archive with the earlier light/Mint variations and the sky options.
- The story holds together: the maths across `ab-02` → `ab-06` checks out (€375 × 8, €430 × 7 = €3,010, €500 × 6, €417 × 6).
- The trust moves are visible on the screens: "Estimate" tags, "Based on · tap to correct", the explicit review sentence, "Nothing moves until you approve", Undo.
- The prototype goes beyond what the brief asks: real transitions, reduced motion, shallow-routed sheets, Playwright a11y and visual tests.

## Gaps, by impact on the score

### 1. The Figma file doesn't explain itself (affects every criterion)

Someone opening the link cold lands on Screens: 8 unlabelled frames, no title, no journey order. The context exists further down (Wireframes has per-screen annotations; Reference and Archive hold the research and the rejected directions), but nothing points to it.

- **Add a `Cover`** as the first page and file thumbnail (concept line, hero screen, links to the prototype and slides, hours) **and a `Read me`** (page index with one line per page, how the system is organised, the screen tags, "the prototype is coded, here's why").
- **Annotate the Screens page** the way Wireframes already is: a header board per row, journey order, arrows, and 1–2 callouts per screen mapped to the brief's five requirements ("Express intent naturally" → `ab-00/01`, and so on). Reusing the `wf/Annotation` pattern (or a hi-fi version of it) keeps it consistent. This is also slide 1's raw material.
- **Page order and names:** consider `Cover · Read me · Screens · Components · ── · Process` with Wireframes, Reference and Archive grouped under the divider, and rename `Archive` to something a reviewer reads as intent ("AI exploration" or "Directions explored").
- **Reference page** is the only light page in a dark file, and each board shows screenshots and palettes but no takeaway. A one-line "what we took from it" per board (or one summary board) turns it from a mood dump into evidence of judgement.

### 2. Brief says "interactive *Figma* prototype" (risk on Prototype 15%)

The decision log records the user's call: SvelteKit only. Keeping that, the cheapest hedge is ~15 min of Figma prototype wiring across the 8 frames (tap → next frame, Smart Animate on `ab-04` → `--tight`), with the coded link as "the real one" on the Cover. It also covers a reviewer who only opens Figma. If not, the Cover and the Read me must say clearly why the prototype is coded and link to it.

### 3. Screens: order, naming and missing states (UX 25%, Visual 20%)

- **Order on the canvas is out of story order.** Row 2 shows `ab-04.adjust` (€430, "€500 → €430") before `ab-04.adjust--tight` (€500). The story goes €375 → tight €500 → fixed €430. Put `--tight` first, or add `ab-04.adjust--opening` (€375, toggle off) so the row reads opening → tight → fixed.
- **Frame name `ab-00.start--dark-0031`** breaks the tag rule. The other sky options are now in Archive, so `0031` looks like the pick: rename to `ab-00.start`. Note that `0031` has the orange glow while every other screen uses `0011`; fine if intentional (Home is warmer), otherwise match.
- **Missing evidence for "preserving context":** `ab-03.plan--updated` (thread after "Done": change log line + PlanCard at €430). Already backlog item 1.
- **Composer placeholder in the thread** is "Ask or search…", same as Home. In context it should be about the plan ("Ask about this plan…"), as the sheet does ("Ask to change something…").
- **A user-control beat is invisible:** "tap to correct" chips aren't wired anywhere. Either wire one in the prototype (tap "Income €2,850" → composer pre-fills) or show its edit state in Figma.

### 4. Components page reads as a store-room, not a system (Figma & DS 15%)

- **Backgrounds board takes half the page**, with what looks like the 14 skies twice. Move the sky set to its own page or collapse it to a component set plus one preview row.
- **Stray frame** bottom-left (a phone thumbnail, possibly a cover draft). Move it or delete it.
- **Boards are not on a grid** (staggered heights, large gaps). Align to columns: Foundations (Colour, Type, Spacing, Icons), then components in journey order.
- **Variants aren't visible.** The Buttons board shows four buttons all labelled "Button". Show the variant matrix with labels (`variant × state`), and add the missing states already in backlog item 5 (Chip selected, Button pressed/disabled, Composer focus, PlanCard `draft/adjusting/approved` side by side). Reviewers judge "components/variants" by what they can see.
- **Variables:** the screens pass the binding audit (see above). Say so on the Read me; reviewers can't see it otherwise.

### 5. AI workflow is a quarter of the score and has no shareable form yet (AI 25%)

`ai-log.md` has ~30 entries but lives in the repo, and the summary block is empty. Reviewers won't see it unless it's surfaced.

- The raw material is already in Archive (Light/butter, Mint, Mint-slate snapshots, the three-mode colour board, four sky options). It just has no captions. Add a header and a one-line "generated → changed → why" under each, plus 1–2 code-side pairs (the Review plan contrast bug and fix; the sky video contrast check). That turns Archive into the AI process page.
- Fill in the **AI log summary** (counts by verdict, best 3 examples) and the pending verdicts.

### 6. Deliverables that don't exist yet

| Item | State | Needed for the submission |
|---|---|---|
| Hosted prototype link | Not deployed | **Blocker.** Vercel from `code/` (static build ready). Test on a real phone. |
| 1–2 summary slides | Outline skeleton | Journey strip, 3 rationale points, AI tools (generated → changed → judged), links, hours |
| Handoff (PlanCard) | `plan-card.md` is a template | The component exists in `code/src/lib/components/PlanCard.svelte`, so a filled-in spec (props table, tokens, states, a11y) is ~30 min and earns the "plus" |
| Hours in the submission | `time-log.md` empty | Required by the brief |

### 7. Housekeeping before sharing

- **Prototype on desktop:** add a one-line hint outside the phone frame ("Tap the Ask box to start · ⋯ restarts"), and a link back to the Figma file. Reviewers will open it on a laptop.
- **Figma share settings:** "Anyone with the link can view", and set the Cover as the file thumbnail.
- **Stale docs:** `README.md` still says prototype "Not started"; `criteria-map.md` evidence column is empty; `brief.md` assumptions say "Light mode is required" (dark only was decided). Fix if the repo is shared; otherwise low priority.

## Suggested order (about 3–4 h)

1. Deploy the prototype; add the desktop hint.
2. Screens page: rename `ab-00`, reorder row 2, add `--opening` and `ab-03.plan--updated`, annotate.
3. Cover + Read me pages; page order and names.
4. Components page tidy and variant matrices.
5. Caption Archive as the AI process page; takeaways on Reference; AI log summary.
7. PlanCard handoff spec.
8. Slides, hours, submission text.
9. Optional: minimal Figma prototype wiring.
