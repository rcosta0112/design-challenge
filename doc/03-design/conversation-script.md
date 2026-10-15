# Conversation Script

**Status:** Done for phase 2 (2026-10-15), matched to the wireframes. **Phase:** 2.

Every message the user and the AI exchange in the prototype, in order, by screen tag. The screens use this text exactly. The numbers come from the story data in `01-understand/persona.md` and the maths check in `02-define/journey.md`.

## Voice

- Plain, short and warm, but not chatty. No exclamation-mark enthusiasm about money.
- Says what it did, and what it's unsure about.
- Never says "I've done X" before the user approves.
- Calls numbers it worked out "estimates", and says what they're based on.
- Explains a change as before → after.
- Text explains; the card carries the numbers. Text after a card doesn't repeat it.

## Script

### `ab-00.start`

**Greeting:** Hi, Alex. What can I help you with today?
**Ask box placeholder:** Ask or search…
**Balance card:** Current account ••42 · €2,184.50 · Payday in 10 days · 25 Oct

### `ab-01.intent`

**User:** I want to save €3,000 for a holiday next summer, but I don't know how much I can afford to save every month.

### `ab-02.understand`

Thread title: **Holiday plan**. The user's message is repeated as a bubble at the top.

**Status steps** (appear one by one, then stay as a record):
- Looked at income · Jul–Sep
- Looked at regular bills
- Looked at 3 months of spending

**AI:** Goal: €3,000 by 1 June 2027. That's 8 paydays.
After bills and everyday spending, you usually have about €440 left each month.

**Cash-flow visual** (estimate): Cash flow, Jul–Sep · income €2,850 · fixed €1,520 · spending €890 · spare ~€440

**Chip label:** Based on · tap to correct
**Assumption chips:** Income €2,850 · Spending Jul–Sep · Target 1 Jun 2027 · First transfer 25 Oct

### `ab-03.plan`

**AI:** I'd put away €375 on each payday. You'd reach €3,000 by June and keep about €65 a month spare.

**Options:**
| Option | Line 2 | Amount |
|---|---|---|
| Steady · recommended | Done by June · ~€65 spare | €375/mo |
| Relaxed | €3,000 by end of July | €300/mo |
| Fast | Done by April · nothing spare | €440/mo |

**Plan card:** Holiday 2027 · Estimate · €375 / month · Reaches €3,000 — 1 Jun 2027 · Creates — Savings pot + monthly transfer · [Adjust] [Review plan]

### `ab-04.adjust` (sheet opens)

**Sheet title:** Holiday 2027 · Done
**Composer placeholder:** Ask to change something…
Opens on the €375 plan: "8 transfers · reaches €3,000 by 1 Jun 2027", Skip December off, no banner.

### `ab-04.adjust--tight`

**User:** What if I start in December?

**Plan:** €500 / month · 6 transfers · Dec–May · First transfer 25 Dec 2026 · Target date 1 Jun 2027

**AI (warning banner):** Tight: €500 is more than the ~€440 you usually have spare. Want to move the date or lower the target?

**Fix chips:**
- Start in Oct, skip Dec · €430/mo *(proposed addition)*
- Move to 1 Jul · €430/mo
- Lower to €2,500 · €417/mo

### `ab-04.adjust` (after the fix)

User taps **Start in Oct, skip Dec · €430/mo**.

**Plan:** €430 / month · 7 transfers · reaches €3,010 by 1 Jun 2027 · Skip December on · Target €3,000 · Target date 1 Jun 2027 · From Current account ••42

**AI (info banner):** €500 → €430/month: starting in October, skipping December. Still on time for June.
*(The wireframe says "Skipping December → €430/month (was €375)", which is right if the user only flips the toggle from the €375 plan. Use whichever matches the previous state.)*

**Projection visual** (estimate): €0 → €3,010 by 1 Jun · December skipped

### `ab-05.review`

**Title:** Review and approve

**Summary:** Move €430 from your current account to a new Holiday 2027 pot on the 25th of each month, October to May, skipping December.

| Row | Value |
|---|---|
| What | New pot + monthly transfer |
| Amount | €430 a month |
| Transfers | 7 · €3,010 in total |
| From | Current account ••42 |
| To | Holiday 2027 · easy access |
| First transfer | 25 Oct 2026 |
| Stop or change | Anytime, from the pot |

**Info banner:** Nothing moves until you approve. Amounts are estimates based on Jul–Sep.
**Buttons:** Approve with Face ID · Back to plan

### `ab-06.done`

**AI:** Done. Your Holiday 2027 pot is set up. The first €430 moves on 25 Oct, right after payday.

**Goal card:** Holiday 2027 · Active · €0 of €3,000 · Next transfer €430 · 25 Oct · Last transfer 25 May 2027 · [Undo] [Change plan]

**AI:** Want a nudge if a month looks tight before payday?
**Chips:** Yes, nudge me · Not now

**If "Yes, nudge me":** **AI:** OK. I'll message you a few days before payday if your spending is running high. You can turn this off in the pot.
