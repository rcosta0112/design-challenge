# Components

**Status:** Not started. **Phase:** 4.

The component inventory for the Figma library. Every component uses Auto Layout and semantic variables only. Build only what the screens need.

## Figma file pages

File: [Design Challenge](https://www.figma.com/design/VM1bse2WYuRKqF8Umvq02C/Design-Challenge) (`VM1bse2WYuRKqF8Umvq02C`).

1. Cover
2. Read me (how the file is organised, how to use the components)
3. **Reference**: built 2026-10-15 (page `4:2`). 19 boards in 5 rows, grouped by source: own precedent (Dione), traditional banks, neobank mainstream, outliers, AI assistants. Images come from `01-understand/visual-audit/`.
4. Foundations (variables, text styles, effects; with visual specimens)
5. Components
6. Screens (`ab-01` … `ab-06`)
7. Prototype
8. AI exploration (before/after, rejected directions)
9. Handoff (PlanCard spec)

The empty default "Page 1" is still there; rename or remove it when the Cover page is made.

## Utility board template

Every utility page (Reference, Foundations, Components, Handoff) uses the same board layout as the user's Eigodojo component library (`vYxN400FtsLyLYiRTzvlCg`, page `268:546`) and Studio Cataplasma portfolio file (`tgoAVl6bJn6iilh2K0V1xH`). These values were measured from the Eigodojo file.

| Part | Spec |
|---|---|
| Page background | `#1E1E1E` |
| Board | Frame, vertical Auto Layout, padding 40, gap 20–32, fill `#EAEAE5`, radius 4, hugs its content |
| Board name | `ab-<page>-NN.slug`, e.g. `ab-reference-11.bunq`, `ab-components-03.plan-card` |
| Header | Vertical Auto Layout, gap 4, fills the width: category Inter Regular 12 `#8A8A85` → title Inter Bold 26 `#1B1B1B` → description Inter Regular 12 `#6B6B66` |
| Sub-group label | Inter Regular 11 `#8A8A85`, above each group inside a board |
| Note / source line | Inter Regular 11 `#8A8A85` at the bottom of the board (warnings in red) |
| Layout | Boards in rows by theme; about 96 px between boards and 120 px between rows |

The template's colours are hard-coded on purpose: these pages are scaffolding, not product UI. **Product components and screens use only the project's own variables.**

## Inventory

| Component | Variants / properties | Used on | Status |
|---|---|---|---|
| Button | type: primary / secondary / ghost · state: default / pressed / disabled · icon: on / off | all | ☐ |
| Chip | type: suggestion / assumption (editable) · state: default / selected | `ab-01`, `ab-02`, `ab-03` | ☐ |
| ChatBubble | sender: user / ai · content: text / text + attachment | `ab-01`–`ab-04` | ☐ |
| Composer | state: empty / typing · voice: on / off | `ab-01`–`ab-04` | ☐ |
| **PlanCard** | state: draft / adjusting / approved · size: compact / expanded | `ab-03`–`ab-06` | ☐ |
| Slider | state: default / dragging · value label | `ab-04` | ☐ |
| ToggleRow | on / off | `ab-04` | ☐ |
| FitMeter | status: comfortable / tight / over | `ab-03`, `ab-04` | ☐ |
| CashflowBar | — (values as text properties) | `ab-02` | ☐ |
| ProjectionChart | — | `ab-03`, `ab-06` | ☐ |
| SummaryRow | with / without icon | `ab-05` | ☐ |
| Sheet | — (handle + slot) | `ab-04`, `ab-05` | ☐ |
| TopBar | title / back | all | ☐ |
| TabBar | active tab | `ab-01`, `ab-06` | ☐ |

## Naming

- Components: PascalCase (`PlanCard`). Variant properties: lowercase (`state=draft`).
- Layers inside components: purposeful names, no "Frame 123".
