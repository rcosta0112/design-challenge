# Prototype Spec

**Status:** Specced from the wireframes (2026-10-15); build in phase 6. **Phase:** 6. **Budget:** 0.5 h.

Every interaction in the clickable prototype, built in **SvelteKit** (not a Figma prototype; see `decision-log.md`). Each screen tag maps to a route or view state. The brief requires one complete core journey, the AI interaction, a meaningful decision, a confirmation, key transitions and at least one state change.

## Routes and state

| Route | Screens | Notes |
|---|---|---|
| `/` | `ab-00`, `ab-01` | Home; composer state in the component |
| `/plan` | `ab-02`, `ab-03`, `ab-06` | The thread; messages appended from a script |
| `/plan` + sheet | `ab-04`, `ab-04--tight`, `ab-05` | Sheets are overlays on `/plan`, not routes, so the thread stays underneath. Back closes the sheet. |

One `plan` store holds the current plan (`amount`, `startMonth`, `skipDecember`, `target`, `targetDate`, `status`). The thread's plan card, the sheet and the review all read it, which is the "one plan object" in code. Transfers, end date and fit are derived from it with the maths in `02-define/journey.md`.

## Flow

Starting point: `ab-00.start`. Typed text and AI replies come from `conversation-script.md`; no real AI.

| From | Trigger | To | Transition | Notes |
|---|---|---|---|---|
| `ab-00.start` | Tap the Ask box | `ab-01.intent` | Composer grows; text types in (~1.5 s) | Keyboard not shown |
| `ab-01.intent` | Tap send | `ab-02.understand` | Push to `/plan`; the message moves from the composer to the top as a bubble | |
| `ab-02.understand` | Automatic | — | Status steps tick one by one (~300 ms each), then AI text, then the visual fades up, then chips | The "work" moment |
| `ab-02.understand` | Automatic after ~1 s, or scroll | `ab-03.plan` | AI text and option cards stream in below; thread scrolls | Same route |
| `ab-03.plan` | Tap an option card | `ab-03.plan` | Plan card numbers count to the new value | Optional choice |
| `ab-03.plan` | Tap "Adjust" | `ab-04.adjust` (opening, €375) | Sheet slides up (300 ms, ease-out); thread dims | |
| `ab-04.adjust` | Type "What if I start in December?" + send | `ab-04.adjust--tight` | Amount counts €375 → €500; warning banner and chips slide in | **State change** |
| `ab-04.adjust` | Drag the slider above €440 | `ab-04.adjust--tight` | Same, live while dragging | Second route to the state change |
| `ab-04.adjust--tight` | Tap "Start in Oct, skip Dec · €430/mo" | `ab-04.adjust` (€430) | Amount counts €500 → €430; banner turns info; toggle flips on | |
| `ab-04.adjust` | Tap "Done" | `ab-03.plan` | Sheet slides down; plan card in the thread shows the new plan; one change line added to the thread | Context kept |
| `ab-03.plan` / `ab-04.adjust` | Tap "Review plan" | `ab-05.review` | Sheet slides up (or content swaps if a sheet is already open) | Stays enabled while tight: the user decides; the review repeats the warning |
| `ab-05.review` | Tap "Back to plan" | `ab-04.adjust` | Content swaps back | |
| `ab-05.review` | Tap "Approve with Face ID" | `ab-06.done` | Face ID overlay (~1 s, ✓) → sheet slides down → receipt message + goal card appear in the thread | |
| `ab-06.done` | Tap "Yes, nudge me" / "Not now" | `ab-06.done` | Chips go; one AI line appears | Next step |
| `ab-06.done` | Tap back | `ab-00.start` | Pop to Home; goal card shown under the balance | |

## State changes

| Component | From → To | Trigger |
|---|---|---|
| Composer | empty → typing | Tap the Ask box |
| PlanCard | draft → adjusting → approved | Adjust / approve |
| FitMeter (banner + amount colour) | comfortable → tight → comfortable | Monthly amount above ~€440 / a fix chip |
| ToggleRow | off → on | Fix chip, or a tap |

## Not prototyped

Voice input (mic is decoration), editing assumption chips in `ab-02`, Undo and Change plan in `ab-06` (show a toast "Not in this prototype"), the Pay / Cards / Profile tabs.

## Checks before submitting

- [ ] Starts from `ab-00` with no dead ends
- [ ] Back works on every screen
- [ ] The numbers on every screen match `journey.md`'s maths check
- [ ] Respects `prefers-reduced-motion` (no count-ups or slides; instant swaps)
- [ ] Hosted link opens at `ab-00`; on desktop, shown in a phone-sized frame
- [ ] Tested on a real phone (hosted link)
