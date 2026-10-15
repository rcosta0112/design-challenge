# Journey and Screen List

**Status:** Draft. Confirm in phase 2.

## Screen tags

Format: `ab-NN.name`. `ab` is the project prefix and stays fixed until a bank name is chosen; `NN` is the step. The tag is the Figma frame name, the heading in `03-design/screens.md` and the reference used on the slides. A state of a screen adds a suffix: `ab-04.adjust--tight`.

## Journey

| Step | Tag | Screen | User does | AI does | Requirement covered |
|---|---|---|---|---|---|
| 1 | `ab-01.intent` | Home | Types or says the goal, or taps a suggestion | — | Express intent naturally |
| 2 | `ab-02.understand` | Understanding | Reads the summary; can correct an assumption | Repeats the goal back; shows what it looked at and a cash-flow visual | Simple visuals |
| 3 | `ab-03.plan` | Recommendation | Compares 3 options; picks one | Recommends €375/month on payday into a new "Holiday" pot; shows a projection | Explore the recommendation |
| 4 | `ab-04.adjust` | Adjust | Moves the slider, toggles "skip December", or types "what if I start in December?" | Updates the same plan card; logs the change in chat; flags when it gets tight | Adjust; move between chat and controls (**state change**) |
| 5 | `ab-05.review` | Review and approve | Reads what will happen; confirms with biometrics | Lists what, when, from where and how to undo | Explicit approval |
| 6 | `ab-06.done` | Done | Sees the goal tracker; may accept a next step | Confirms; suggests a next step | Confirmation / next step |

## Decision point

The **meaningful user decision** the prototype must show: choosing and adjusting the plan (steps 3–4), then approving it (step 5).

## Open

- Is step 2 its own screen, or the first part of a chat thread that continues into step 3? Decide in phase 3 (lo-fi).
- Voice input: shown as an affordance only, not prototyped?
