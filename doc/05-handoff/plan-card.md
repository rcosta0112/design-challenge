# Handoff: PlanCard

**Status:** Done (2026-10-16). Readers: a front-end engineer picking up the component.

How the Figma `PlanCard` maps to production code. PlanCard is the centre of the concept: it shows the one plan object that both chat and controls edit (decision-log "Concept direction: the conversation is the history, a live plan card is the state"). Code Connect needs an Organization plan, so this is a written spec that points at a component already built and running.

- **Figma:** Components page, board `ab-components-10.cards`, component set `PlanCard` (`37:212`).
- **Code:** [`code/src/lib/components/PlanCard.svelte`](../../code/src/lib/components/PlanCard.svelte), data from [`code/src/lib/plan.svelte.ts`](../../code/src/lib/plan.svelte.ts).
- **Live:** https://design-challenge-ten.vercel.app/ (send the message on Home; the card appears in the thread, then again after approval).

## Anatomy

| Part | `state=draft` (`ab-03.plan`) | `state=approved` (`ab-06.done`) |
|---|---|---|
| Header | Title "Holiday 2027" + `EstimateTag` | Title + `Badge` "Active" |
| Value | Amount (`text-display-md`, counts up on change) + "/ month" | `ProgressBar` (€0 of €3,000, 0%) |
| Rows | `SummaryRow` "Reaches €3,000 · 1 Jun 2027", `SummaryRow` "Creates · Savings pot + monthly transfer" | `SummaryRow` "Next transfer · €430 · 25 Oct", `SummaryRow` "Last transfer · 25 May 2027" |
| Actions | `Button` secondary "Adjust", `Button` primary "Review plan" | `Button` secondary "Undo", `Button` secondary "Change plan" |

The **adjusting** state is not a card variant: Adjust opens the plan in the `ab-04` sheet, and the card in the thread updates when the sheet closes.

## Figma props → code props

| Figma property | Values | Code prop | Type | Notes |
|---|---|---|---|---|
| `state` | `draft` / `approved` | `state` | `'draft' \| 'approved'` | Same names, same values |
| — | — | `compact` | `boolean`, default `false` | Code only: the approved card on Home, without rows or actions. Add to Figma if Home's goal card is drawn |
| — | — | `actions` | `boolean`, default `true` | Code only: `false` keeps an older card in the thread as a record once the plan has moved on |
| (Button instances) | — | `onadjust`, `onreview` | `() => void` | Events for the draft actions. Undo / Change plan show a "Not in this prototype" toast |

Text (title, amount, rows) is **not** a Figma text property: it comes from the plan object, not from the caller.

## Data contract

The card reads the shared `plan` store (`plan.svelte.ts`, class `Plan`) instead of taking values as props, so chat, the Adjust sheet and the card always agree.

| Field | Type | Example | Used for |
|---|---|---|---|
| `target` | number (€) | 3000 | "Reaches €3,000", progress target |
| `amount` | number (€/month) | 375 → 430 | Value; next transfer |
| `startMonth` | month | Oct 2026 | Months list |
| `skipDecember` | boolean | true | Months list |
| `deadline` | month | Jun 2027 | Reached-by check |
| `status` | `'draft' \| …` | `draft` | Which card the thread shows |
| `transfers` (derived) | number | `ceil(target / amount)` | Sub-line in the sheet |
| `months`, `lastMonth`, `reachedOn` (derived) | month(s) | 25 Oct … 25 May | Next / last transfer, "Reaches" |

In production these come from the plan service, and the AI only proposes changes to the same object (principle 5: nothing moves until approval).

## Tokens used

| Property | Figma variable | Code |
|---|---|---|
| Surface | `color/card` + `blur/xl` | `bg-card`, `backdrop-blur-[calc(var(--blur-xl)/2)]` (Figma blur = 2 × CSS radius) |
| Radius | `radius/3xl` | `rounded-3xl` |
| Padding | `space/5` | `p-5` |
| Gap | `space/3` | `gap-3` (card and action row) |
| Title | text style `heading/sm` | `text-heading-sm` |
| Amount | text style `display/md` | `text-display-md` |
| "/ month" | `body/md`, `color/muted-foreground` | `text-body-md text-muted-foreground` |

No shadow and no border (visual rule). Child components bring their own tokens.

## Behaviour and states

- **Amount changes** (option card picked, sheet closed with a new amount) count up from the old value (`AnimatedNumber`); instant under `prefers-reduced-motion`.
- **draft → approved** after Face ID on the review sheet: the thread adds a receipt and a new approved card; the old draft stays with `actions={false}`.
- **Estimate vs fact:** the draft carries `EstimateTag` (the amount is an AI estimate); the approved card shows a `Badge` (it's now a fact).

## Accessibility

- **Role and label:** a `<section>` with an `<h3>` title; add `aria-labelledby` to the heading in production.
- **Live updates:** an amount changed through chat should be announced: wrap the value in `aria-live="polite"` (not yet in the prototype).
- **Focus order:** title → rows → Adjust → Review plan. Buttons are 52 px high (touch target ≥ 44).
- **Contrast:** checked over the sky (`decision-log.md`, "Sky video cut to its dark stretch").

## Not in scope

Editing inside the card (that's the sheet), several plans at once, error states (for example a failed plan service), the Home `compact` card in Figma.
