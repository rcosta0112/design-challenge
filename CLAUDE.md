# AI-native Banking — Design Challenge

A candidate design challenge: an AI-native mobile banking journey (intent → understanding → recommendation → adjust → approve → done). The deliverables are a Figma design system, 4–6 screens, a clickable prototype, 1–2 summary slides and an optional component-to-code handoff. Brief, deliverables and links are in `README.md`.

Read `doc/current-state.md` before anything else.

## Which doc to open

Open the one doc the task needs. Don't read `doc/` broadly.

| Task | Open |
|---|---|
| What the brief asks, our interpretation, assumptions | `doc/brief.md` |
| Is every requirement and criterion covered? | `doc/criteria-map.md` |
| Why something is the way it is | `doc/decision-log.md` (search the `## [date]` headings) |
| Log an AI tool use | `doc/ai-log.md` |
| Log hours | `doc/time-log.md` |
| Research, similar products, trust data, Dione precedent | `doc/01-understand/research.md` |
| Visual audit and direction options | `doc/01-understand/visual-audit.md` (images in `visual-audit/sheets/`) |
| Proto-persona and story numbers | `doc/01-understand/persona.md` |
| Problem, design principles, journey and screen tags | `doc/02-define/` |
| Conversation script, screen specs, prototype interactions | `doc/03-design/` |
| Tokens and components (Figma library) | `doc/04-system/` |
| Component-to-code handoff | `doc/05-handoff/` |
| Slides, talk outline, live-iteration prep | `doc/06-presentation/` |

## Working rules

- **Log as you go, not afterwards.** Every AI use gets an `ai-log.md` entry, including rejected output. Every work session gets a `time-log.md` row. Every non-obvious call gets a `decision-log.md` entry.
- **Screen tags are shared.** A screen's tag (for example `ab-03.plan`) is its Figma frame name, its heading in `03-design/screens.md` and its reference on the slides. Never rename one in only one place.
- **Figma variables are the source of truth for tokens.** `04-system/tokens.md` mirrors them; if they disagree, Figma wins and the doc gets fixed.
- **Screens are built from components only.** No detached instances and no hard-coded colours on the Screens page.
- **Update `doc/current-state.md` at the end of each work block.** Overwrite it; don't append.
- **Every claim on a slide traces to a log entry or a doc** (see `06-presentation/outline.md`).
- Keep the docs short. This is a 4–6 hour challenge, not a product.
