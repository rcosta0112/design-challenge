# Components

**Status:** First components built on page `Components` (`21:372`), 2026-10-15; thread components for `ab-02`/`ab-04` added the same day (x ≈ 3200). No shadows or strokes on any product component; cards on images use a 24 px background blur. **Phase:** 4.

The component inventory for the Figma library. Every component uses Auto Layout and semantic variables only. Build only what the screens need.

## Figma file pages

File: [Design Challenge](https://www.figma.com/design/VM1bse2WYuRKqF8Umvq02C/Design-Challenge) (`VM1bse2WYuRKqF8Umvq02C`).

1. Cover
2. Read me (how the file is organised, how to use the components)
3. **Reference**: built 2026-10-15 (page `4:2`). 19 boards in 5 rows, grouped by source: own precedent (Dione), traditional banks, neobank mainstream, outliers, AI assistants. Images come from `01-understand/visual-audit/`. Each app board has a flat-fill palette strip, and a sixth row holds `ab-reference-20.colour-audit` (board `10:2`).
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

## Components page organisation (2026-10-15)

The `Components` page (`21:372`) follows the utility board template above. **Dark variant for this project** (2026-10-15, to match the app theme): page `#0B0E0D`, boards `#161B19`, category/sub-labels `#7D8782`, titles `#F2F5F3`, descriptions and hex labels `#A7B4AE`, radius specimens `#2A3430`. Same structure as the template; only the scaffolding colours differ. Product components sit inside each board on a dark **specimen** panel: an Auto Layout frame in explicit `Dark` mode (formerly `Mint Dark`), filled `color/background`, so they show in the picked theme. Main components were moved, not changed; instances stay linked.

| Row | Boards |
|---|---|
| Foundations | `01.colour` (every colour variable × 3 modes, with hex) · `02.typography` (8 styles) · `03.spacing` (spacing, radius, effects) |
| Actions & inputs | `04.icons` · `05.buttons` · `06.chips` (Chip, Badge, EstimateTag) · `07.composer` · `08.controls` (Slider, ToggleRow) |
| Conversation & content | `09.conversation` (ChatBubble, StatusStep, AiOrb, Banner) · `10.cards` (BalanceCard, OptionCard, PlanCard) · `11.values` (AmountDisplay, SummaryRow, ProgressBar) · `12.data-viz` (CashflowBar, ProjectionChart) |
| Navigation & surfaces | `13.navigation` (TopBar, TabBar, TabItem, iOS status bar and home indicator from the library) · `14.sheet` (SheetHeader + sheet pattern) · `15.background` (BackgroundVideo + Background fallback; the other skies and the source images are on Archive) |

**Handoff readiness:** every component and set has a Dev Mode description (purpose, props, tokens, behaviour), all text is exposed as properties, colours are bound to variables, spacing and radius to variables where a token exists, and there are no detached instances. Loose text left on screens is typography only: the greeting, the "Based on" label and the review summary sentence.

## Inventory

| Component | Variants / properties | Used on | Status |
|---|---|---|---|
| Button | variant: primary / secondary · state: default / disabled · Label · Icon (boolean, scan-face) | `ab-03`–`ab-06` | ✅ |
| Chip | type: assumption (trailing pencil) / suggestion (leading sparkles) · Label | `ab-02`, `ab-04` | ✅ v1 |
| ChatBubble | sender: user (bubble, max width 280) / ai ("Assistant" label + AiOrb, no bubble) · Message | `ab-02`, `ab-04` | ✅ v1 |
| Composer | state: empty / filled (grows to several lines, controls bottom-aligned) · Placeholder, Message text properties | `ab-00`–`ab-04`, `ab-06` | ✅ v1 (no voice toggle yet) |
| **PlanCard** | state: draft (EstimateTag, amount, 2 rows, Adjust + Review plan) / approved (Badge, ProgressBar, 2 rows, Undo + Change plan) | `ab-03`, `ab-06` | ✅ v1 (adjusting = the `ab-04` sheet) |
| Slider | status: ok / tight · €300–€500, marker at ~€440 spare | `ab-04` | ✅ v1 |
| ToggleRow | state: on / off · Label | `ab-04` | ✅ |
| ~~FitMeter~~ | Merged: tight status = Banner `kind=warning` + AmountDisplay `status=tight` + Slider `status=tight` (as the screen spec allowed) | `ab-04` | — |
| AmountDisplay | status: default / tight · Amount · Unit · Detail | `ab-04` | ✅ |
| CashflowBar | — (stacked bar: fixed `chart-1`, spending `chart-2`, spare = AI gradient; EstimateTag) | `ab-02` | ✅ v1 |
| ProjectionChart | — (Oct→Jun, December plateau, goal line, EstimateTag) | `ab-04` | ✅ v1 |
| SummaryRow | Label · Value | `ab-04` | ✅ v1 |
| SheetHeader | Title · Show action (boolean, "Done"); the sheet itself is a layout pattern, not a component (overlay → frame `color/popover` at y=62, top radius `radius/3xl` → SheetHeader → body → pinned footer; board `14.sheet`) | `ab-04`, `ab-05` | ✅ |
| OptionCard | selected: true / false · Title · Detail · Amount | `ab-03` | ✅ |
| ProgressBar | Value | inside PlanCard approved | ✅ |
| Badge | Label (mint fill, ink text) | inside PlanCard approved | ✅ |
| TopBar | Title (back + title + more) | `ab-02`, `ab-04` | ✅ v1 |
| TabBar | 4 TabItem instances (Home active) | `ab-00`, `ab-01`, `ab-06` | ✅ v1 |
| TabItem | state: active / inactive · Label · Icon (instance swap) | inside TabBar | ✅ |
| BalanceCard | Account · Amount · Fact (text properties) | `ab-00`, `ab-01` | ✅ |
| AiOrb | — (gradient bound to `color/ai-from` / `ai-to`) | `ab-00`, AI turns | ✅ |
| icon/* | Lucide: house, arrow-left-right, credit-card, user, mic, arrow-up, calendar, chevron-left, ellipsis, check, triangle-alert, info, pencil, sparkles, scan-face | all | ✅ |
| StatusStep | Step | `ab-02` | ✅ |
| Banner | kind: info / warning · Text | `ab-04` | ✅ v1 |
| EstimateTag | — (sparkles + "Estimate") | inside CashflowBar, ProjectionChart | ✅ |
| Background | One component, sky `0011`: the static fallback for the video (reduced motion, autoplay refused) and the still on every Figma screen | Mint Dark screens | ✅ |
| BackgroundVideo | Poster (a Background instance); the description points to `Sky.svelte` and `nishita-sky-dark.mp4` in the prototype | Prototype only | ✅ |
| StatusBar, HomeIndicator | From the iOS 18 kit (iOS 26 refused import) | all | ✅ library |

## Naming

- Components: PascalCase (`PlanCard`). Variant properties: lowercase (`state=draft`).
- Layers inside components: purposeful names, no "Frame 123".
