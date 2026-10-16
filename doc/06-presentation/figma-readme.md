# Figma Cover and Read me (text)

The text for the Figma `Cover` and `Read me` pages, written here first so it can be edited before it goes into the file. Readers: the reviewers, opening the Figma link cold. Keep it short; the file and the prototype carry the detail.

Hours: shown as the 2026-10-15 estimate until the final figure is confirmed (`time-log.md`).

---

## Cover

**[Bank] · AI-native banking**

Say what you want. Get a plan you can adjust. Approve it once.

A savings goal from intent to approval: "I want to save €3,000 for a holiday next summer, but I don't know how much I can afford to save every month."

- Prototype: https://design-challenge-ten.vercel.app/
- Hero: `ab-03.plan`

Design challenge · October 2026 · ~6 h

---

## Read me

### The idea

Traditional banking apps make you find the right product before you can act. Here the bank's home is an Ask box. The assistant reads your cash flow, proposes a plan, lets you shape it by typing or by touch, and moves money only after one clear approval.

**The conversation is the history; one live plan card is the state.** Chat and controls (slider, toggle, chips) edit the same card, so nothing is lost when you switch between them.

### The journey

| Screen | What happens | Brief requirement |
|---|---|---|
| `ab-00.start` | Home is an Ask box, balance below | Express intent naturally |
| `ab-01.intent` | The user types the goal in their own words | Express intent naturally |
| `ab-02.understand` | The AI shows what it looked at and a cash-flow bar; assumptions are chips you can correct | Understand information through simple visuals |
| `ab-03.plan` | Three options and a plan card: €375/month, recommended | Explore a recommendation |
| `ab-04.adjust` / `--tight` | A sheet where typing and touch edit the same plan. "What if I start in December?" → €500, tight → fix chip → €430 | Adjust; move between conversation and controls |
| `ab-05.review` | One sentence says exactly what will happen; approve with Face ID | Review and explicitly approve |
| `ab-06.done` | Receipt in the thread, goal tracker, Undo | Confirmation and next step |

### Why it looks and works this way

1. **Intent first, products later.** The AI sets up real features (a savings pot and a monthly transfer) and names them once.
2. **Show your working; facts and estimates look different.** "Looked at…" steps, the cash-flow bar and "Estimate" tags keep AI numbers apart from bank facts.
3. **The user steers; nothing moves without a clear yes.** Every assumption is editable, exploring needs no confirmation, and there is exactly one approval, bound to that version of the plan.

The AI composes only from components in this system; it never lays out its own UI.

### AI tools

Claude Code (Opus 5.5) with the Figma MCP for research synthesis, the visual audit, docs, building components and screens in Figma, and the SvelteKit prototype. Every output was reviewed; the rejected directions are on the Archive page, and the log records what was generated, changed and why. Details: the AI workflow summary (link when ready).

### Pages

| Page | What's on it |
|---|---|
| Cover | This file at a glance |
| Read me | You are here |
| Screens | 8 hi-fi frames (6 screens + 2 states), grouped by screen. Story order and transitions are in the prototype |
| Components | Foundations (colour, type, spacing) and 24 components plus 15 icons; each set shows its variants labelled |
| Wireframes | The greyscale flow with an annotation per screen, built from a local `wf-kit` |
| Archive | Directions explored and not taken: Light/butter and Mint palettes, sky options, source images |
| Reference | 17 apps audited for the visual direction, plus palettes |

### How the system is built

- **Variables:** one collection, `shadcn` (mode `Dark`), 52 variables following shadcn's CSS-variable contract, so the same names exist in code (`code/src/routes/layout.css`). Colours, radius, spacing and blur.
- **Text styles** for all type; **Auto Layout** throughout; component **descriptions** in Dev Mode.
- **Audit (2026-10-16):** every component and screen layer is bound to a variable or style, with two documented exceptions (the AI orb glow and the home-indicator clearance).
- **Screens** are built only from instances; no detached layers.

### The prototype

The clickable journey is built in SvelteKit from the same components and tokens, at https://design-challenge-ten.vercel.app/. It goes further than a Figma prototype allows: real typing and sending, a working slider, the plan maths, live state changes (€375 → €500 tight → €430), sheets that keep the thread underneath, view transitions and reduced motion. A basic Figma prototype (Flow 1 on Screens) covers the happy path.

### Handoff

PlanCard → `code/src/lib/components/PlanCard.svelte`: Figma properties, data contract, tokens and states in the handoff spec.
