# Design Principles

**Status:** Done for phase 2 (2026-10-15). Research implications (`01-understand/research.md` §7, `assistant-flows.md`) folded in.

Five principles for an AI that handles money. Each one names the screen element that carries it out, so the principles stay checkable, and the thing it rules out.

| # | Principle | What it means | Where it shows | Rules out |
|---|---|---|---|---|
| 1 | **Intent first, products later** | The user says what they want in the Ask box on Home; the app works out which feature it is. The AI sets up **real** features (a savings pot, a monthly transfer) and names them once, when it's useful. | Ask box on Home (`ab-00`, `ab-01`); "Creates: Savings pot + monthly transfer" on the plan card (`ab-03`) | A separate "AI tab"; invented products; product names before the user needs them |
| 2 | **Show your working** | The AI says what data it looked at and how it got the number, briefly. | "Looked at…" steps and the cash-flow visual (`ab-02`); "Based on Jul–Sep" on review (`ab-05`) | A bare number; a long explanation before the answer |
| 3 | **Facts and estimates look different** | Bank facts (balance, income, dates) and AI estimates (spare money, projections) are visually distinct. The AI's voice is plain text; anything you act on is a card. | "Estimate" label on the plan card; estimate styling on the cash-flow and projection visuals; AI text without a bubble | Projections styled like balances |
| 4 | **The user steers** | Every assumption is visible and editable, by tapping or by typing. Both edit the same plan card, and each change is shown before → after. The recommendation is a starting point. Exploring never needs a confirmation. | Assumption chips (`ab-02`); option cards (`ab-03`); slider, toggle, change banner, fix chips (`ab-04`) | A blocking quiz; a separate planner screen that loses the chat; "Are you sure?" on adjustments |
| 5 | **Nothing moves without a clear yes** | One approval, for the money step only. It says what, how much, from where, to where, when and how to stop, and it's bound to that exact version of the plan. Undo stays available afterwards. | Review sheet with one-sentence summary and Face ID (`ab-05`); Undo / Change plan (`ab-06`) | "I've set it up" before approval; several confirmations for one plan |

## Supporting rules

- **Controlled generative UI.** The AI only shows designed components from the system (plan card, cash-flow bar, fit meter, chips). It never lays out its own UI. See `decision-log.md`.
- **One thread, three surfaces.** Every screen is the thread (voice and history), an inline card (results) or a sheet (editing, approving). See `journey.md`.
- **Calm voice.** Plain and warm, not chatty, no enthusiasm about money. See `03-design/conversation-script.md`.
