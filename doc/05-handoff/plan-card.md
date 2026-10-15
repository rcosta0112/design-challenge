# Handoff: PlanCard

**Status:** Not started. **Phase:** 7. **Budget:** 0.5 h.

How the PlanCard component maps to a production implementation. PlanCard was chosen because it's the centre of the concept: it holds the plan state that both chat and controls edit, and it has real states and variants. See `decision-log.md`.

The route depends on the Figma plan (open question in `current-state.md`):
- **Code Connect available:** map the Figma component to `code/PlanCard.tsx` and show the snippet in Dev Mode.
- **Otherwise:** this spec, plus the component in `code/` if time allows.

## Anatomy

-

## Figma props → code props

| Figma property | Values | Code prop | Type |
|---|---|---|---|
| state | draft / adjusting / approved | `state` | `'draft' \| 'adjusting' \| 'approved'` |
| size | compact / expanded | `size` | `'compact' \| 'expanded'` |
| | | | |

## Data contract

What the card needs from the plan model (goal, target date, monthly amount, start date, source account, fit status, and so on).

## Tokens used

## Behaviour and states

## Accessibility

- Role and label:
- Live region for value changes made through chat:
- Focus order:

## Not in scope
