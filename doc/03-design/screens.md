# Screen Specs

**Status:** Specced from the wireframes (2026-10-15). Visual design in phase 3–5. **Phase:** 3–5.

One section per screen, headed by its tag. Frame: 402 × 874 (iPhone 16 Pro). Copy for every screen is in `conversation-script.md`; this file says what each screen is for, what it's built from and which states it has. Wireframes: Figma section `17:462`, built from the local `wf-kit`.

Component names are the library names from `04-system/components.md`; the wireframe name follows in brackets where it differs.

## Layout rules (all screens)

- Side margins 24, content width 354.
- Status bar on top; composer pinned to the bottom (except `ab-05`); tab bar on Home only.
- Thread screens: TopBar with back, title "Holiday plan" and overflow menu.
- Sheets: open over the dimmed thread, 12 px of thread visible at the top, handle + title row + content + pinned footer.
- AI text has no bubble; it starts with a small "Assistant" label. User text is a bubble on the right.

## `ab-00.start` — Home, empty

- **Purpose:** The bank's home is an Ask box. The user can say what they want without knowing which feature it is.
- **Components:** StatusBar · greeting (text style, centred) · Composer (`state=empty`) · BalanceCard · TabBar (`active=home`)
- **States:** Only this one.
- **Notes:** No suggestion chips (removed by the user to keep Home calm). "Payday in 10 days · 25 Oct" is the only nudge, and it's a bank fact, so fact styling. The send button is disabled while the box is empty.

## `ab-01.intent` — Home, typed

- **Purpose:** The user writes the goal in their own words. Covers "express intent naturally".
- **Components:** As `ab-00`, with Composer `state=typing` (grows to 4 lines; send button enabled).
- **States:** Only this one.
- **Notes:** The composer grows upward and pushes the greeting up; the balance card and tab bar stay put. In the prototype the text types itself in when the box is tapped.

## `ab-02.understand` — Understanding

- **Purpose:** Show that the AI understood the goal and what it based its numbers on, before it recommends anything. Covers "simple, meaningful visuals" and principle 2.
- **Components:** StatusBar · TopBar (back, "Holiday plan", more) · ChatBubble (`sender=user`) · StatusStep ×3 · ChatBubble (`sender=ai`) · CashflowBar (estimate styling) · section label · Chip (`type=assumption`) ×4 · Composer (`state=empty`)
- **States:** Status steps appear one by one (~300 ms apart), then the AI text and the visual. A tapped chip opens a small edit (in the prototype: not wired; tapping it puts focus in the composer with "Change income to…").
- **Notes:** The cash-flow visual is a single stacked bar: fixed €1,520 · spending €890 · spare ~€440 out of €2,850 income, with the spare part in estimate styling. Wireframe shows a placeholder; design it in phase 5. "First transfer 25 Oct" is a chip because it's an assumption the AI made.

## `ab-03.plan` — Recommendation

- **Purpose:** One recommended plan the user can compare and act on. Covers "explore the recommendation" and principle 1 (names the real product once).
- **Components:** TopBar · ChatBubble (`sender=ai`) · OptionCard ×3 (`selected=true/false`) · PlanCard (`state=draft`, `size=compact`) with SummaryRow ×2 and Button ×2 (`secondary` Adjust, `primary` Review plan) · Composer
- **States:** Selecting another option updates the plan card (Relaxed → €300, Fast → €440, and the "Reaches" row). Steady is selected on arrival.
- **Notes:** This is the thread from `ab-02`, scrolled. The plan card carries the "Estimate" label. If space is short in the visual design, the three options can become a segmented control inside the plan card; decide in phase 5.

## `ab-04.adjust` — Adjust

- **Purpose:** The plan card opened as a sheet, where touch and typing edit the same plan. Covers "adjust assumptions" and "move between conversation and controls while preserving context".
- **Components:** StatusBar · Sheet (handle, title "Holiday 2027", "Done") · amount + sub-line (text styles) · Banner (`kind=info`, the before → after line) · Slider (€300–€500) · ToggleRow ("Skip December") · SummaryRow ×3 (Target, Target date, From) · ProjectionChart (estimate) · Button (`primary`, Review plan) · Composer (placeholder "Ask to change something…")
- **States:**
  - **opening:** €375, 8 transfers, Skip December off, no banner.
  - **default (as wireframed):** €430, 7 transfers, Skip December on, info banner. Reached from `--tight` via the fix chip, or by flipping the toggle.
  - **`--tight`:** see below.
- **Notes:** "Done" closes the sheet back to the thread and keeps the changes; the plan card in the thread shows the new numbers and the thread logs one line ("Changed to €430/month, skipping December"). The slider snaps to €5 steps. Moving the slider changes the amount; the sub-line works out transfers and end date.

## `ab-04.adjust--tight` — Adjust, tight

- **Purpose:** The required state change: the plan stops fitting, and the AI says so and offers fixes instead of refusing.
- **Components:** As `ab-04`, plus ChatBubble (`sender=user`, the typed question), Banner (`kind=warning`), Chip (`type=suggestion`) ×3, SummaryRow (First transfer, Target date). The toggle and projection are hidden.
- **States:** Entered by typing "What if I start in December?" or by dragging the slider above €440. Left by tapping a fix chip or moving the slider back down.
- **Notes:** PlanCard `state=adjusting`, FitMeter `status=tight` (the wireframe uses a warning Banner for this; the FitMeter becomes that banner's status colour plus the amount colour). **Proposed:** add a third chip, "Start in Oct, skip Dec · €430/mo", which leads to the default state; see `02-define/journey.md`.

## `ab-05.review` — Review and approve

- **Purpose:** The one approval. The user can say exactly what will happen before money moves. Covers "review and explicitly approve" and principle 5.
- **Components:** StatusBar · Sheet (handle, title "Review and approve", no Done) · summary sentence (text style, large) · SummaryRow ×7 · Banner (`kind=info`) · Button (`primary`, Approve with Face ID, with icon) · Button (`secondary`, Back to plan)
- **States:** default · approving (Face ID prompt over the sheet, ~1 s in the prototype) → `ab-06`.
- **Notes:** No composer: the only actions are approve or go back. The summary sentence comes first; the rows are the details. The approval is bound to this version of the plan: if the user goes back and changes anything, they return to a fresh review.

## `ab-06.done` — Done

- **Purpose:** Confirm what happened, show the goal from now on, and keep the user in control. Covers "confirmation / next step".
- **Components:** TopBar · ChatBubble (`sender=ai`) ×2 · PlanCard (`state=approved`, shown as a goal tracker) with Chip "Active", ProgressBar, SummaryRow ×2, Button ×2 (`secondary` Undo, `secondary` Change plan) · Chip (`type=suggestion`) ×2 · Composer
- **States:** default · after "Yes, nudge me" (one more AI line, chips gone).
- **Notes:** The receipt lives in the thread; the same goal card also appears on Home under the balance (not drawn). Undo cancels the pot and the transfer before 25 Oct; after that it becomes "Stop transfers".

## Components the wireframes need that aren't in the inventory yet

Add to `04-system/components.md` in phase 4: **OptionCard** (`selected`), **StatusStep**, **Banner** (`kind=info/warning`), **ProgressBar**, **BalanceCard**, **StatusBar**. The wireframe **Row** maps to SummaryRow and **Header** to TopBar.
