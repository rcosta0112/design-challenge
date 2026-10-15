# Current State

**Last updated:** 2026-10-15

Where the project stands now. Overwrite this file at the end of each work block, keep it under about 30 lines, and use pointers instead of explanations.

## Done

- **Phase 1:** research, visual audit (17 apps), colour audit, assistant flows (`01-understand/`). Look: Klarna + Wise.
- **Wireframes** in Figma (section `17:462`): `ab-00.start`…`ab-06.done` + `ab-04.adjust--tight`, from a local `wf-kit`.
- **Phase 2, Define:** `02-define/`: problem, 5 principles, journey, before → after.
- **Design docs:** `03-design/`: conversation script, screen specs, prototype spec.
- **Direction picked: `Mint Dark`** (dark over the user's sky images; decision-log 2026-10-15). Variable mode + 11 new vars (`04-system/tokens.md`). No-shadow/no-border rule now applies at component level.
- **Kit:** page `Components`: 14 icons, Composer, BalanceCard, TabBar, AiOrb + TopBar, ChatBubble, StatusStep, Chip, Banner, Button, SummaryRow, SheetHeader, EstimateTag, CashflowBar, Slider, ToggleRow, ProjectionChart, `Background` (14 skies). Inventory in `04-system/components.md`.
- **Hi-fi screens** (page `Screens`):
  - Row y=1100: `ab-00.start--dark-{0031,0001,0011,0041,0141}`.
  - Row y=2200: `ab-02.understand`, `ab-04.adjust`, `ab-04.adjust--tight` (all on `sky=0031`).
  - Older light/mint `ab-00` frames are still in row y=0.

## Next

- **User pick:** which sky for `ab-00` (and whether thread screens use the same one or a calmer, darker one such as `0001`).
- **User review:** hi-fi `ab-02` and `ab-04`. Note that `ab-04.adjust` dropped the "Target date" row to fit; the sub-line and chart still show 1 Jun 2027.
- Measure contrast of the `Mint Dark` values (estimated so far) and record it in `color-audit.md`.
- Phase 3: hi-fi `ab-01`, `ab-03` (needs OptionCard, PlanCard), `ab-05`, `ab-06` (ProgressBar).
- Clean up row y=0 (old `Light`/`Mint` frames) once the direction is final.
- Log hours in `time-log.md`; fill in "Verdict" on pending `ai-log.md` entries.

## Open questions (waiting on the user)

0. **Story:** recommend €375, approve €430 after adjusting. Confirm.
1. **Brand:** fictional bank name? Placeholder **[Bank]**. Persona **Alex Brooke**.
2. **Prototype:** where does the app live (`code/`?) and where is it hosted?
3. **Figma plan:** Code Connect needs Organization/Enterprise; otherwise a spec plus a small component in `code/`.
4. **Hours:** count only hands-on time, AI-agent time separately? (Proposed.)
5. **Slides:** Figma Slides, or another format?

## Links

- Figma file: [Design Challenge](https://www.figma.com/design/VM1bse2WYuRKqF8Umvq02C/Design-Challenge). Reference `4:2`; Wireframes `12:2`; Components `21:372`; Screens `21:555`.
- Prototype: —
- Slides: —
