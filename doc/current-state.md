# Current State

**Last updated:** 2026-10-15

Where the project stands now. Overwrite this file at the end of each work block, keep it under about 30 lines, and use pointers instead of explanations.

## Done

- **Phase 1:** research, visual audit (17 apps), colour audit, assistant flows (`01-understand/`). Look: Klarna + Wise.
- **Wireframes** in Figma (page `12:2`): one board per screen on the utility template (`ab-wireframes-00.overview`, `-01…08` holding `ab-00.start`…`ab-06.done` + `ab-04.adjust--tight` with their annotations, `-09.wf-kit`).
- **Phase 2, Define:** `02-define/`: problem, 5 principles, journey, before → after.
- **Design docs:** `03-design/`: conversation script, screen specs, prototype spec.
- **Direction picked: `Mint Dark`** (dark over the user's sky images; decision-log 2026-10-15). No-shadow/no-border rule now applies at component level.
- **Tokens aligned with shadcn** (`04-system/token-review.md`, `tokens.md`; decision-log "Tokens follow shadcn's CSS-variable contract"): one mode `Dark`; shadcn's full colour set plus `success`; aliases; radius `lg`/`xl`/`3xl` on `--radius` 12; half-step spacing; `blur/xl`; code syntax and descriptions. Mirrored in `code/src/routes/layout.css`. Old modes and y=0 frames are snapshots on the Figma page `Archive`.
- **Kit:** page `Components`: 14 icons, Composer, BalanceCard, TabBar, AiOrb + TopBar, ChatBubble, StatusStep, Chip, Banner, Button, SummaryRow, SheetHeader, EstimateTag, CashflowBar, Slider, ToggleRow, ProjectionChart, OptionCard, PlanCard, ProgressBar, Badge, AmountDisplay, `Background` (14 skies). Page laid out on the utility template: 15 boards; Dev Mode descriptions on every component (`04-system/components.md`).
- **Hi-fi screens** (page `Screens`):
  - Row y=1100: `ab-00.start--dark-{0031,0001,0011,0041,0141}` (Home options).
  - Row y=2200: `ab-01.intent` → `ab-06.done`, including `ab-04.adjust--tight`, all on `sky=0011`.

## Next

- **User pick:** the `ab-00` sky (a dark one to match: `0011` or `0001`).
- **User review:** all hi-fi screens. Note that `ab-04.adjust` dropped the "Target date" row to fit.
- **Prototype:** all screens built in `code/` (`ab-00` → `ab-06`, full journey clickable, transitions, reduced motion; `code/README.md`). Next: user review in the browser (`npm run dev` in `code/`, port 5180), Vercel setup (user), test on a real phone, tick the checks in `prototype-spec.md`.
- **Sky video:** load jump fixed (matching poster, fade-in); loop cut to its dark stretch (`nishita-sky-dark.mp4`, 48 s, 2.5 MB; all text passes contrast across it); greeting typewriter added. Review plan button contrast fixed (tailwind-merge bug; 14.08:1). Sheets `ab-04`, `ab-05` not re-audited for contrast.
- **Figma ↔ prototype reconciled** (decision-log "Figma ↔ prototype reconciliation"). **User decision:** Composer mic/send icon stroke (2 px vs scaled elsewhere).
- **Tokens, left over:** `success` values are proposed and unmeasured. Check in the browser: the shadcn-svelte button/slider/switch (`rounded-lg` is now 12 px) and the Tailwind lock-down (default palette and radii removed; shadows still available as exceptions; `tokens.md` › Tailwind setup).
- **Figma backlog (proposed 2026-10-15, waiting on the user to prioritise):**
  1. Missing journey states: `ab-03.plan--updated` (thread after "Done": log line + PlanCard €430, the evidence for "preserving context"); `ab-04.adjust--opening` (€375, toggle off); `ab-02` thinking state (StatusStep pending/done).
  2. Minimal Figma prototype as a fallback (decision-log risk: the brief names a *Figma* prototype).
  3. File structure: Cover, Read me, an AI exploration page (archive the y=0 rows and the sky variations as before/after evidence), a Handoff page (PlanCard anatomy and props), and an annotated journey board on Screens (requirement and principle callouts that feed slide 1).
  4. ~~Token review~~ Done (see above). Light mode was dropped, so the live-iteration demo needs another idea.
  5. Missing states for handoff and the live iteration: Chip selected, Button pressed, Composer focus (needs `ring`), an "over budget" fit state (needs `destructive`).
  6. Contrast check over `sky=0011`, annotated on the Colour board.
  7. Summary slides in Figma Slides (open question 5).
- Measure contrast of the `Dark` values (estimated so far) and record it in `color-audit.md`.
- Log hours in `time-log.md`; fill in "Verdict" on pending `ai-log.md` entries.

## Open questions (waiting on the user)

0. **Story:** recommend €375, approve €430 after adjusting. Confirm.
1. **Brand:** fictional bank name? Placeholder **[Bank]**. Persona **Alex Brooke**.
2. ~~Prototype hosting~~ **Decided:** Vercel (static build from `code/`); the user sets it up later.
3. **Figma plan:** Code Connect needs Organization/Enterprise; otherwise a spec plus a small component in `code/`.
4. **Hours:** count only hands-on time, AI-agent time separately? (Proposed.)
5. **Slides:** Figma Slides, or another format?

## Links

- Figma file: [Design Challenge](https://www.figma.com/design/VM1bse2WYuRKqF8Umvq02C/Design-Challenge). Reference `4:2`; Wireframes `12:2`; Components `21:372`; Screens `21:555`; Archive `48:1090`.
- Prototype: —
- Slides: —
