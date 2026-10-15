# Problem and How Might We

**Status:** Done for phase 2 (2026-10-15). Based on `brief.md`, `01-understand/research.md` and the wireframes (Figma section `17:462`).

## Problem statement

People know what they want to achieve with their money ("a holiday next summer"), but banking apps make them translate that into products ("savings pot", "standing order") and work out the numbers themselves. That gap means they put it off, or save an amount they can't keep up.

**In a standard app this goal takes ~18 steps, 3–4 app areas and 2–3 separate confirmations** (the baseline flow in `ai-log.md`): find spending insights, add up bills by hand, do the maths outside the app, compare savings products, open a pot, set up a standing order, confirm each one, then check progress by hand.

## Who

Alex Brooke, 31, an English teacher at a secondary school. Salaried, paid on the 25th, and can only travel in the school summer break, so the June date is fixed. Uses the app several times a week but has never opened the savings section. Curious about AI, but doesn't want an app moving money without asking. Full proto-persona and story numbers: `01-understand/persona.md`. It's an assumption, not research.

## What gets in the way

| Barrier | Evidence | Where we answer it |
|---|---|---|
| Doesn't know which feature to open | Brief; persona has never opened savings | `ab-01.intent` |
| Doesn't know what's affordable | Brief's example request; "whatever's left" failed | `ab-02.understand` |
| Doesn't trust an AI number without the reasoning | Trust surveys, research §5–7 | `ab-02` "Looked at", `ab-03` "Estimate" label |
| A fixed plan breaks on real life (December) | Persona note: December spending is higher | `ab-04.adjust` |
| Fear of the app moving money on its own | Persona; approval research §6 | `ab-05.review` |

## How might we

- HMW let people start from the goal, in their own words, instead of from a product menu?
- HMW show "what can I afford" in a way that's understood at a glance?
- HMW make an AI recommendation feel like a starting point the user owns, not a verdict?
- HMW let people adjust a plan by talking or by touching, without losing their place?
- HMW make approving a money action feel clear and safe, not scary?

## What success looks like

For the prototype (what a reviewer should see):

- One sentence typed on Home turns into an approved, scheduled plan in **6 screens, 1 thread and 1 approval**.
- The user can say where every number came from (income, bills, 3 months of spending).
- The user changes the plan at least once, by touch and by typing, and the plan card always shows the current version.
- Before approving, the user can say what will move, how much, from where, when, and how to stop it.

For a real product (talk points, not measured): goal set up without leaving the thread; plans still running after 3 months; few "undo" taps in the first week.

## Scope

**In:** one journey, from saying the goal to an approved, scheduled savings plan.

**Out:** onboarding, authentication, account setup, other intents (no suggestion chips on Home; see `journey.md`), error and edge cases beyond the one "tight" state, voice input (shown as a mic affordance only), dark mode (stretch goal).
