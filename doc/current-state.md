# Current State

**Last updated:** 2026-10-15

Where the project stands now. Overwrite this file at the end of each work block, keep it under about 30 lines, and use pointers instead of explanations.

## Done

- **Phase 1:** research, visual audit (17 apps), colour audit, assistant flows (`01-understand/`). Look: Klarna + Wise.
- **Wireframes** in Figma (section `17:462`): `ab-00.start`…`ab-06.done` + `ab-04.adjust--tight`, from a local `wf-kit`.
- **Phase 2, Define:** `02-define/` filled in: problem (barriers, success), 5 principles with "rules out", journey (three surfaces, fixed step-4 path, maths check, before → after).
- **Kit + first hi-fi screen:** shadcn picked, rebuilt locally (Figma page `Components`: variables, Geist styles, Lucide icons, Composer, BalanceCard, TabBar, AiOrb). `ab-00.start` in hi-fi on page `Screens`. Tokens mirrored in `04-system/tokens.md`.
- **Design docs:** `03-design/` filled in: full conversation script, screen specs per tag, prototype spec (routes, one `plan` store, transitions).

## Next

- **User review:** the step-4 path and €375 → €430 decision (`decision-log.md`, proposed); if OK, add the third fix chip to `ab-04.adjust--tight` and update the `ab-04` banner wording in Figma.
- **User review:** hi-fi `ab-00.start`. **User pick:** brand accent (butter / aqua / periwinkle); butter is wired but not used on `ab-00`.
- **Phase 4:** add OptionCard, StatusStep, Banner, ProgressBar, BalanceCard, StatusBar to `04-system/components.md` (listed at the end of `03-design/screens.md`).
- **Phase 3:** next hi-fi screen (`ab-01.intent`, uses Composer `State=Filled`).
- Fill in "Changed" and "Verdict" on the pending `ai-log.md` entries; log hours in `time-log.md`.

## Open questions (waiting on the user)

0. **Story:** proposed answer: recommend €375, approve €430 after adjusting. Confirm.
1. **Brand:** a fictional, neutral bank name? Placeholder: **[Bank]**. Persona: **Alex Brooke** (decided; the assistant says "Alex").
2. **Prototype:** fallback minimal Figma prototype? Where does the app live (`code/`?) and where is it hosted?
3. **Figma plan:** Code Connect needs Organization/Enterprise; otherwise a spec plus a small component in `code/`.
4. **Hours:** count only hands-on time, AI-agent time separately? (Proposed.)
5. **Slides:** Figma Slides, or another format?

## Links

- Figma file: [Design Challenge](https://www.figma.com/design/VM1bse2WYuRKqF8Umvq02C/Design-Challenge). Reference `4:2`; Wireframes `12:2`; Components `21:372`; Screens `21:555`.
- Prototype: —
- Slides: —
