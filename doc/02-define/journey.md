# Journey and Screen List

**Status:** Done for phase 2 (2026-10-15), matched to the wireframes (Figma page Wireframes `12:2`, boards `ab-wireframes-01…08`). Two proposed wireframe changes are marked **(proposed)**.

## Screen tags

Format: `ab-NN.name`. `ab` is the project prefix and stays fixed until a bank name is chosen; `NN` is the step. The tag is the Figma frame name, the heading in `03-design/screens.md` and the reference used on the slides. A state of a screen adds a suffix: `ab-04.adjust--tight`.

## Three surfaces

Every screen is one of three surfaces (from `01-understand/assistant-flows.md`):

| Surface | Screens | What lives there |
|---|---|---|
| **Home** | `ab-00`, `ab-01` | Greeting, Ask box, balance, tab bar |
| **Thread** "Holiday plan" | `ab-02`, `ab-03`, `ab-06` | The AI's voice and the history; inline cards. One continuous thread, scrolled. |
| **Sheet** over the thread | `ab-04`, `ab-04--tight`, `ab-05` | Editing the plan card; approving it. The thread stays underneath, dimmed. |

The composer is on every screen except `ab-05`, where the only actions are approve or go back.

## Journey

| Step | Tag | Surface | User does | AI does | Requirement covered |
|---|---|---|---|---|---|
| 0 | `ab-00.start` | Home | Opens the app: greeting, Ask box, balance, "Payday in 10 days" | — | Express intent naturally |
| 1 | `ab-01.intent` | Home | Types the goal in the Ask box and sends | — | Express intent naturally |
| 2 | `ab-02.understand` | Thread | Reads; taps an assumption chip to correct it, or carries on | Shows what it looked at (3 steps), repeats the goal ("8 paydays"), says ~€440 is usually spare, shows a cash-flow visual and 4 assumption chips | Simple, meaningful visuals |
| 3 | `ab-03.plan` | Thread | Compares 3 options (Steady / Relaxed / Fast); taps Adjust or Review plan | Recommends **€375/month on payday** (Steady), names the real product once ("Savings pot + monthly transfer"), labels it an estimate | Explore the recommendation |
| 4 | `ab-04.adjust` | Sheet | Types "What if I start in December?"; sees it's tight; picks a fix; or drags the slider / toggles Skip December | Updates the same plan card; shows each change before → after; flags when it's tight and offers fixes as chips | Adjust; move between chat and controls (**state change**) |
| 5 | `ab-05.review` | Sheet | Reads one sentence and 7 detail rows; approves with Face ID or goes back | Lists what, amount, transfers, from, to, first transfer, how to stop; says nothing moves until approval | Explicit approval |
| 6 | `ab-06.done` | Thread | Sees the goal tracker; can Undo or Change plan; answers a next-step offer | Confirms in the thread; offers a nudge before tight months | Confirmation / next step |

## The path through step 4

The prototype tells one story, so step 4 has a fixed order:

1. Tap **Adjust** on the plan card → the sheet opens on the recommended plan: **€375**, Skip December off.
2. Type **"What if I start in December?"** → **€500/month**, 6 transfers Dec–May → `ab-04.adjust--tight`. €500 is above the ~€440 usually spare, so the plan turns Tight and offers fixes as chips.
3. Tap **"Start in Oct, skip Dec · €430/mo"** → `ab-04.adjust`: €430/month, 7 transfers, €3,010 by 1 June, Skip December on. Comfortable again. **(proposed: a third fix chip; the wireframe shows two)**
4. Tap **Review plan** → `ab-05.review` with the €430 plan.

Why this order: the user's real worry is December (persona: December spending is higher). Asking about it by typing, hitting the tight state, and landing on "skip December" by touch shows typing and controls editing the same card, the state change, and the AI helping rather than just obeying. It also settles the €375 vs €430 question: **the AI recommends €375; the user adjusts to €430 and approves that.** See `decision-log.md`.

Second route to the tight state: dragging the slider above €440.

## Maths check

| Plan | Transfers | Total | Fits ~€440 spare? |
|---|---|---|---|
| Steady (recommended): €375, Oct–May | 8 | €3,000 | Yes, ~€65 left |
| Relaxed: €300, Oct–Jul | 10 | €3,000 (end of July) | Yes |
| Fast: €440, Oct–Apr | 7 | €3,080 (April) | Nothing spare |
| Skip December: €430, Oct–May minus Dec | 7 | €3,010 | Yes, ~€10 left |
| Start December: €500, Dec–May | 6 | €3,000 | **No → Tight** |
| Fix: start Dec, move to 1 Jul: €430, Dec–Jun | 7 | €3,010 | Yes |
| Fix: start Dec, lower to €2,500: €417, Dec–May | 6 | €2,502 | Yes |

## Before → after

Standard app: ~18 steps, 3–4 app areas, 2–3 confirmations (baseline in `ai-log.md`). Here: one thread, one plan, one approval.

| Steps in a standard app | Replaced by |
|---|---|
| 1–3, 8: log in, find Insights, know the product name | `ab-01` Ask box |
| 4–7: scroll transactions, find fixed costs, do the maths outside the app | `ab-02` |
| 8–11: find and compare savings products | `ab-03` |
| 18 and the back-and-forth of step 7 | `ab-04` |
| 10, 12, 13–16: 2–3 separate confirmations | `ab-05` |
| 17: checking progress by hand | `ab-06` |

## Decision point

The **meaningful user decision** the prototype must show: choosing and adjusting the plan (steps 3–4), then approving it (step 5).

## Decided (was open)

- **Step 2 is the start of the thread**, not its own screen. `ab-02` and `ab-03` are the same thread, scrolled; they're two frames so each can be discussed on its own.
- **Voice input** is shown as a mic in the composer only. Not prototyped.
- **No suggestion chips on Home.** The user removed them to keep Home calm; trade-off: a blank Ask box can cause drop-off (`assistant-flows.md`, flow 1). The "Payday in 10 days" line is the only nudge. A candidate for the live iteration.
