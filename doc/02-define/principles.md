# Design Principles

**Status:** Draft. Confirm after research.

Five principles for an AI that handles money. Each one names the screen element that carries it out, so the principles stay checkable.

| # | Principle | What it means | Where it shows |
|---|---|---|---|
| 1 | **Intent first, products later** | The user says what they want; the app works out which feature it is. Product names appear only once they're useful. | Composer on home (`ab-01`) |
| 2 | **Show your working** | The AI says what data it looked at and how it got the number. | "Based on your last 3 months" and the cash-flow visual (`ab-02`) |
| 3 | **Facts and estimates look different** | Bank facts (balance, income) and AI estimates (projections, "you can afford") are visually distinct. | Estimate styling on numbers and charts |
| 4 | **The user steers** | Every assumption is visible and editable, by talking or by touching. The recommendation is a starting point. | Assumption chips, slider, toggles (`ab-03`, `ab-04`) |
| 5 | **Nothing moves without a clear yes** | Money actions need explicit approval, with what / when / from where / how to undo. | Review and confirm (`ab-05`) |
