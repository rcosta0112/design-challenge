# Decision Log

One log for every decision: UX, visual, design system, AI use and process. Each entry is tagged so the slides can pull them by theme.

**Tags:** `[UX]` `[Visual]` `[System]` `[AI]` `[Process]`

Newest first. To add an entry, insert it above the first one. Each entry: Context → Decision → Alternatives considered → Rationale → Status. Keep entries short; declined and open options are worth logging too.

---

## [2026-10-15] [Visual] — Visual direction: three options; A recommended

**Context:** The user wants to avoid the traditional banking style; the feature should signal youth and a future-facing product. Visual audit of 17 apps in `01-understand/visual-audit.md`.

**Decision (proposed):** Explore three directions in phase 3: **A. Quiet canvas, luminous AI**; B. Editorial warmth; C. Bold neo. The recommendation is A, with B's warm copy and one serif for hero numbers. The AI glow is used only for the AI's voice and estimates, which carries principle 3.

**Alternatives considered:** the neobank mainstream (brand-colour flood plus white cards). Rejected because by 2026 it's the default look, not a future-facing one.

**Rationale:** The future-facing signal comes from AI assistant apps rather than banks. A dark-first base gives the AI accent a job and suits data-first screens. It also matches the user's Dione precedent, and light/dark variable modes give a ready live-iteration demo.

**Status:** Open. The user decides after the phase 3 explorations.

---

## [2026-10-15] [UX] — Controlled generative UI: the AI routes to real features and composes only from DS components

**Context:** Research (`01-understand/research.md`, sections 3–4). The user's Dione site assistant routes to an existing page first and only composes an answer, from a fixed set of cell types, when no page fits.

**Decision (proposed):** The assistant sets up **real banking features** (a savings pot, a recurring transfer) rather than inventing new ones. Everything it shows is a **designed component from the system** (plan card, cash-flow bar, fit meter, chips). It never produces free-form UI.

**Alternatives considered:** declarative or open generative UI, where the AI lays out its own cards or HTML. Too risky for money: inconsistent, hard to test, hard to trust.

**Rationale:** Consistency, trust, and it makes the design system central, which the brief scores. It also gives a clear story: Dione points the way, the bank proposes an action and the user approves it.

**Status:** Proposed; confirm in phase 2.

---

## [2026-10-15] [UX] — Concept direction: the conversation is the history, a live plan card is the state

**Context:** The brief asks for smooth movement between conversation and graphical controls without losing context.

**Decision:** The AI writes into one shared object, the **plan card**. Chat messages and graphical controls (slider, toggles, assumption chips) both edit that same card. The chat keeps a record of what changed ("Moved start to December, so €430/month"), and the card always shows the current plan.

**Alternatives considered:**
- Chat only, with every adjustment made by typing. Slow and imprecise for numbers.
- A separate "planner" screen opened from chat. Context breaks at the handover.
- Form-first with an AI helper on the side. Not intent-first.

**Rationale:** One source of truth means nothing is lost when switching modes. It's also easy to understand ("this card is your plan") and maps neatly to a component with states.

**Status:** Proposed. Confirm in phase 2 (`02-define/journey.md`).

---

## [2026-10-15] [Process] — Doc structure: lean version of the eigodojo setup

**Context:** The user pointed to the eigodojo project as a reference for structure and documentation, but asked not to copy it 1:1.

**Decision:**
- **Kept:** `CLAUDE.md` with a doc table; an overwritten `current-state.md`; the Context → Decision → Alternatives → Rationale → Status format; screen tags shared by Figma and docs; Figma variables as the source of truth.
- **Changed:** one tagged decision log instead of two; 6 short phase folders instead of 10 phases.
- **Added:** `ai-log.md` (25% of the score is AI judgement, so it's captured as we go), `time-log.md` (hours are part of the submission), `criteria-map.md` (requirement → evidence), and a presentation outline and live-iteration prep from day 1.
- **Dropped:** history files and an archive folder.

**Alternatives considered:** copying eigodojo's structure as is (too heavy for 4–6 h); no structure, docs written at the end (loses the AI evidence and the trade-off reasoning the presentation needs).

**Rationale:** The presentation is built from these docs, so each piece of the brief needs a home from the start.

**Status:** Done; folders and skeletons created.
