# Decision Log

One log for every decision: UX, visual, design system, AI use and process. Each entry is tagged so the slides can pull them by theme.

**Tags:** `[UX]` `[Visual]` `[System]` `[AI]` `[Process]`

Newest first. To add an entry, insert it above the first one. Each entry: Context → Decision → Alternatives considered → Rationale → Status. Keep entries short; declined and open options are worth logging too.

---

## [2026-10-15] [System] — Figma ↔ prototype reconciliation after the shadcn token alignment

**Context:** After the token alignment, the user asked to check Figma against the prototype, with Figma as the only source of truth where possible.

**Decision:**
- **Matched already:** every colour, type style, spacing and radius value used on the 8 screens equals `layout.css`.
- **Fixed in code:** sheet top radius 16 → 24 (`radius-3xl`, as Figma); glass blur now `backdrop-blur-[calc(var(--blur-xl)/2)]` (12 px CSS) on BalanceCard, CashflowBar, OptionCard, PlanCard, ProjectionChart and TabBar; inactive tab icons `muted-foreground` (were forced to `foreground`); OptionCard check uses Lucide's default stroke (was 3); SummaryRow and CashflowBar values use `text-label-sm`.
- **Fixed in Figma:** two paths of the Pay tab icon were bound to `foreground` in the TabBar main component (now `muted-foreground`, like Cards and Profile); stale descriptions on SheetHeader (`color/sheet`, `radius/xl`), Background and BalanceCard ("Mint Dark").

**Where Figma can't be the only source (flagged):**
1. **Blur:** Figma's background-blur value is twice the CSS blur radius. Figma `blur/xl` = 24 means `blur(12px)` in CSS, so code halves the token, as Figma's own code output does. `backdrop-blur-xl` would be twice as soft.
2. **Composer icons:** mic and send keep a 2 px stroke at 20 px, while every other icon scales its stroke (1.67 px at 20). Looks accidental in Figma; code keeps Lucide's scaled default. User to decide.
3. **Flattened parts:** Slider, Switch and the ProjectionChart line are vector images in Figma, not tokenised components. Code uses shadcn's Slider/Switch and draws the chart from the plan, so their inner sizes (6 px track, 28 px thumb, 27 px switch thumb) were measured, not read from tokens.
4. **Code-only:** motion, safe areas and the interactive states (focus ring, pressed, disabled) have no Figma counterpart yet (backlog item 5).
5. **Text rendering:** Geist Medium looks a little heavier in Chromium on Windows than in Figma; the computed weight is 500, so nothing to change.

**Rationale:** Values come from Figma; where Figma's number doesn't mean the same thing in CSS (blur) or isn't a token (flattened vectors), code follows what Figma *renders* and says so here.

**Status:** Done. `check`, `lint` and a full journey walk pass, with zero console errors. Flag 2 waits on the user.

## [2026-10-15] [System] — Tokens follow shadcn's CSS-variable contract

**Context:** The token review (`04-system/token-review.md`) measured our tokens against industry practice. The prototype is shadcn-svelte, so shadcn's CSS variables are what code consumes.

**Decision:** Figma colour variables are shadcn's names one to one, plus extensions in shadcn's `name` / `name-foreground` pattern. Applied:
- Added shadcn's missing roles (`secondary`, `accent`, `popover-foreground`, `destructive`, `ring`) and `success` for the fit meter. Renamed `sheet` → `popover`.
- Repeated values became aliases (`ring`, `brand`, `ai-from` ⇢ `primary`, and so on).
- Radius on shadcn's `--radius` base of 12: `md`/`lg`/`xl` → `lg`/`xl`/`3xl`.
- Added half-step spacing (`space/0-5`, `1-5`, `2-5`) and `space/8`, plus `blur/xl`.
- Set Dev Mode code syntax, descriptions and consistent scopes on every variable.
- Renamed the text style `display/amount` → `display/md`.
- In Figma, bound 335 hand-typed gaps, paddings, radii and blurs to their now-matching tokens (Components and Screens).
- In code, `layout.css` and our components were renamed to the same tokens, keeping the same pixel values.

**Alternatives considered:** A primitives collection plus a separate size collection (rejected: shadcn has no primitive tier, one mode removes the duplication, and Figma can't move variables between collections without re-linking every layer). Renaming `composer-*` to `inverse-*` (rejected: shadcn's own `sidebar-*` makes component groups idiomatic). Snapping 2/6/10 px spacing to the scale (rejected: it would move layouts).

**Rationale:** One name per token from Figma to Dev Mode to CSS makes the handoff readable and stops drift. The installed shadcn components get the roles and radii they expect.

**Status:** Done. Hi-fi screens and the prototype look unchanged; `svelte-check` and the build pass. One intended visual change: the shadcn-svelte components' `rounded-lg` is now 12 px instead of 16.

---

## [2026-10-15] [UX] — Prototype: calls made beyond the screen specs

**Context:** Building all screens in `code/` from the hi-fi frames. A few behaviours weren't fully specced.

**Decision:**
- **One plan model drives every number.** Transfers = ⌈target ÷ amount⌉ from the start month (skipping December if on); the toggle keeps the date and re-works the amount; fix chips are fixed patches from the script (€430, €430, €417). All rows in `journey.md` › Maths check come out as specced.
- **Intent morph:** the typed text on Home morphs into the thread's first bubble (View Transitions), on top of the screen push.
- **Nudge chips** answer as a user bubble, then the AI line. "Not now" gets a line not in the script: "OK. You can turn nudges on later, from the pot."
- **Slider label** "~€440 spare" sits under its marker (at 70%), not centred as in the Figma frame.
- **Review repeats the warning** when the plan is tight (prototype-spec says it should; no frame shows it).
- **Done / Back / overlay** all close the sheet the same way; any change adds one line to the thread ("Changed to €430/month, skipping December"). A fix chip clears the "What if…" bubble, matching the default `ab-04` frame.
- **Home after approval** shows the PlanCard `approved` in a compact form under the balance (spec: "not drawn").
- **"⋯" menu → Restart prototype**, for demos and the live iteration.
- **Reduced motion** removes movement (slides, count-ups, morphs) but keeps the pacing of the scripted turns and Face ID.

**Alternatives considered:** Slider-driven end date with a fixed amount for the toggle too (rejected: the toggle should answer "can I keep June?"). Centring the slider label as in Figma (rejected: it points at the wrong value).

**Rationale:** Each choice keeps the numbers traceable to `journey.md`, keeps the user's context in the thread, and makes the demo repeatable.

**Status:** Built. The Figma frames are unchanged; the slider label position could be updated there.

## [2026-10-15] [System] — Keep only the `Mint Dark` variable mode

**Context:** The token review (`04-system/token-review.md`) found that the modes `Light` (butter), `Mint` and `Mint Dark` mix brand with colour scheme.

**Decision:** Keep only `Mint Dark`; discard `Light` and `Mint`. The affected layers are 4 old `ab-00` frames in Screens row y=0 and the two comparison columns on the colour board. No current screen or component is affected.

**Alternatives considered:** Keep butter as an archived mode (rejected by the user). Rename `Mint` to `Light` for a light/dark live demo (dropped with it).

**Rationale:** The direction is final. One mode removes dead values and makes the brand/scheme mix-up moot.

**Status:** Applied 2026-10-15. The y=0 frames and the three-mode colour board are saved as PNG snapshots on the Figma page `Archive` (`48:1090`); the mode is renamed `Dark`.

---

## [2026-10-15] [System] — Prototype scaffold: SvelteKit 2 + shadcn-svelte in `code/`

**Context:** Start the prototype. The user asked for SvelteKit + shadcn with animated transitions, taking from Eigodojo only what fits this scope.

**Decision:** One SvelteKit app at `code/` (answers open question 2, the location part); `adapter-static`; Mint Dark tokens as shadcn CSS variables in `layout.css`. Transitions: View Transitions API for `/` ⇄ `/plan` (push/pop by route depth), `svelte/transition` for sheets and stream-in, `Tween` for count-ups. Sheets use shallow routing so Back closes them. A custom `Sheet`, not shadcn's, because shadcn's portals to `<body>` and would escape the desktop phone frame.

**Taken from Eigodojo:** the reduced-motion signal and `ms()` duration helper, runes mode, a fixed dev port, the `data-screen` tag convention. **Not taken:** the monorepo/workspaces, the shared UI package, daisyUI, sound, splash, PWA, Vitest/Playwright: too much for one 6-screen prototype.

**Alternatives considered:** SvelteKit 3 (needs Node 22.17; this machine has 22.13, so pinned 2.x rather than change the system Node). shadcn's Drawer/Sheet (rejected for the reason above). A store per screen (rejected: the spec asks for one plan object).

**Rationale:** Smallest setup that covers the spec's routes, state changes and transitions; static output hosts anywhere for free.

**Status:** Scaffold built, check/lint/build pass. Hosting: Vercel (user sets it up; adapter-static works there as is).

## [2026-10-15] [System] — Components page on the utility template; FitMeter merged, Sheet as a pattern

**Context:** The user asked for the component library to follow their utility template (Eigodojo `268:546`), without changing component design, and for it to be ready for development handoff.

**Decision:**
- 15 boards in 4 rows (Foundations, Actions & inputs, Conversation & content, Navigation & surfaces). Components show on dark specimen panels in `Mint Dark`.
- Added what handoff was missing: Button `state=disabled`, ToggleRow `state=off`, AmountDisplay, and Dev Mode descriptions on all components.
- FitMeter is not built; tight status = warning Banner + AmountDisplay `tight` + Slider `tight`.
- Sheet stays a documented layout pattern rather than a component.

**Alternatives considered:** Showing components straight on the light board (rejected: Mint Dark text would vanish). A Sheet component with a content slot (rejected for now: the content varies, and slots would add complexity for little gain at this scope).

**Rationale:** Developers get one page showing tokens, every variant and the intended theme, with the behaviour in each description.

**Status:** Done.

## [2026-10-15] [Visual] — All screens on a dark sky (`sky=0011`)

**Context:** While building the remaining screens, the user said the darker background images work better.

**Decision:** `ab-01` to `ab-06` use `sky=0011`, the near-black sky with a faint warm floor; this includes the already-built `ab-02` and `ab-04`. The Home variations (`ab-00.start--dark-*`) stay as options.

**Alternatives considered:** `sky=0001`, which is equally dark with a cooler teal floor; it's a one-click swap on the `Background` instance. Keeping `0031` on the thread screens was rejected because its warm patch sits behind the cards.

**Rationale:** Thread screens carry the most text and numbers, so a calm, dark backdrop keeps the attention on the content and the contrast steady.

**Status:** Built. The user can still swap to `0001`.

## [2026-10-15] [Visual] — Dark direction picked: "Mint Dark" over sky images

**Context:** The user reviewed two dark-background versions of `ab-00` and picked the slate one. They added 14 sky images to the library and asked for more variations, a palette that fixes the review's issues (`color-audit.md`, "Review: two dark-background variations"), and hi-fi `ab-02` and `ab-04`.

**Decision:** Add a third variable mode, `Mint Dark`, plus 11 semantic variables. Main changes:
- Cards are smoked glass (ink at 62% with a 24 px background blur).
- The Composer is the one bright surface (`color/composer*`).
- The TabBar sits on the dark canvas (`color/bar`), and sheets have their own surface (`color/sheet`).
- Tight status gets amber (`color/warning*`).
- Mint is used for the greeting name, primary controls and estimates; the payday pill is neutral.
- The images became a `Background` component set (`sky=…`).
- The no-shadow/no-border rule now applies at component level: Composer shadow and stroke, BalanceCard stroke and TabBar stroke are removed.

**Alternatives considered:** Hard-code the images and colours per frame (rejected: it breaks the components-only rule). Light glass cards (rejected: on the warm parts of `sky0031`, white text drops to about 3.5:1). Set the Composer to explicit `Mint` mode inside dark screens (rejected: hard to hand off to code).

**Rationale:** One mode switch themes every component. Contrast doesn't depend on which part of the image a card sits on. The bright Composer makes "ask" the primary action.

**Status:** Built. `ab-00` variations on 5 skies, plus `ab-02.understand`, `ab-04.adjust` and `ab-04.adjust--tight` on `sky=0031`. The user picks the sky. Contrast of the new values is estimated, not measured.

## [2026-10-15] [Visual] — Second palette direction "Mint", closer to Wise; no shadows, minimal borders

**Context:** The user asked for a variation closer to Wise, with brand accent `#0FFFB3`, high-contrast text on white and grey card backgrounds balanced by the accent. They also set three rules: no drop shadows, no borders unless strictly necessary, and contrast is fixed by adjusting colours (adding greys), not by adding strokes.

**Decision:** Add the variable mode `Mint` to the `shadcn` collection (white canvas, ink `#0E1512`, card grey `#EEF2F0`, muted grey `#DDE4E0`, secondary `#525E59`, mint as fill only) and the frame `ab-00.start--mint`. Surfaces separate by fill. The TabBar's top stroke is removed in this variation, and the payday pill uses mint as the one accent on the screen. Values and contrast are in `color-audit.md`, Variation B.

**Alternatives considered:** Retinting the butter direction (the user wanted a distinct option); a lime-and-forest copy of Wise (too close, and the accent was already given).

**Rationale:** As a mode, it's the same components and the same bindings. The choice between butter and mint is one switch, and either can carry through to the prototype tokens.

**Status:** Proposed. The user picks between `Light` (butter) and `Mint`. The no-shadow/no-border rules apply to both.

---

## [2026-10-15] [System] — shadcn as the kit, rebuilt locally with shadcn's structure

**Context:** The user picked shadcn from the shortlist (`03-design/ui-kits.md`). The Obra shadcn/ui Community file isn't linked to our Figma file, and the MCP can't add Community libraries.

**Decision:** Build a local kit that follows shadcn's structure: shadcn's semantic token names (`background`, `foreground`, `card`, `primary`, `muted`, `muted-foreground`, `border`, `input`), Geist (shadcn's default font), Lucide icons, and the Card and Input patterns. Our palette fills the values. Two additions: `brand` (butter) and `ai-from`/`ai-to` (the AI gradient). shadcn's own `accent` is a hover tint, so the brand colour got a separate name. System chrome comes from the iOS 18 kit; the iOS 26 kit wouldn't import into this file.

**Alternatives considered:** Duplicate the Obra file and link it (manual, and publishing a library may need a paid plan); use the Simple Design System or Material 3 kits that are already linked (they look further from Klarna/Wise).

**Rationale:** Same names as shadcn's CSS variables, so the SvelteKit prototype (shadcn-svelte) can take the tokens one-to-one. If the Obra file is linked later, the components can be swapped without renaming anything.

**Status:** Done for `ab-00.start`. Brand accent still open; butter is wired as `color/brand` but not used on this screen.

---

## [2026-10-15] [UX] — The AI recommends €375; the user adjusts to €430 and approves that

**Context:** Open question 0: the wireframes approve the skip-December plan (€430), while `persona.md` recommends €375. The wireframes also show two adjust states (skip December; start in December) with no order between them.

**Decision (proposed):** Both numbers stand. The AI recommends €375 (`ab-03`). In the sheet, the user types "What if I start in December?" → €500, tight (`ab-04--tight`) → taps a new fix chip "Start in Oct, skip Dec · €430/mo" → €430 (`ab-04`) → approves €430 (`ab-05`, `ab-06`). Review stays enabled even while tight; the user decides.

**Alternatives considered:** Approve €375 (the adjust step becomes decoration: the user changes nothing); approve €500 (the story ends on a plan the AI flagged as unaffordable); drop the tight state (loses the required state change).

**Rationale:** The adjust step must change the outcome, or the "user steers" principle isn't shown. December is the persona's real worry, so typing about it, hitting the limit and landing on "skip December" by touch shows chat and controls editing the same card, the state change and the AI helping rather than just obeying, in one path.

**Status:** Proposed. Needs the user's OK and one wireframe change (the third chip). Details: `02-define/journey.md`.

---

## [2026-10-15] [Process] — Prototype in SvelteKit, not Figma

**Context:** The brief asks for an "interactive Figma prototype" of the core journey, with key transitions and at least one state change.

**Decision:** The user's call: no Figma prototype. The clickable journey is built in SvelteKit, from the same screens and components. Figma stays the source of truth for the design system and the screens.

**Alternatives considered:** A Figma prototype only (as planned); both, with a minimal Figma prototype as a fallback.

**Rationale:** Real interaction (a live slider, typed chat, the plan updating as you go) shows the AI moments and state changes better than linked frames. It also turns the handoff (15%) into working code rather than a spec.

**Risk:** The deliverables list names a *Figma* prototype. Reviewers may expect a Figma link. Mitigation: say so on the slides and in the submission text, give a hosted link that works on a phone, and keep frame names = route/component names so the Figma-to-code mapping is visible.

**Status:** Decided (user). Fallback still open.

---

## [2026-10-15] [Visual] — Palette: Klarna/Wise pattern, our own accent

**Context:** The user picked Klarna and Wise as the closest look (supersedes the A/B/C choice below, except where noted). Colour audit: `01-understand/color-audit.md`.

**Decision (proposed):** Copy the *pattern*, not the colours: a warm off-white canvas, a near-black ink, and one pale accent used only as a fill with ink text on it. Accent: **butter `#FFE066`**, the only hue no app in the set owns (fallback: aqua). The AI signal from direction A stays: a periwinkle-to-aqua gradient reserved for the AI's voice and estimates.

**Alternatives considered:** Klarna pink or Wise lime (their brands); saturated mid-tones like electric blue or violet (fail with ink text, need white text); apricot (too close to Cleo and Claude).

**Rationale:** The pale-accent pattern gives over 10:1 contrast for text on the accent and works in light and dark mode. An unowned hue avoids reading as a copy, and keeping the AI gradient separate keeps the "AI-native" signal the visual audit called for.

**Status:** Open. The user picks the accent.

---

## [2026-10-15] [Visual] — Visual direction: three options; A recommended

**Context:** The user wants to avoid the traditional banking style; the feature should signal youth and a future-facing product. Visual audit of 17 apps in `01-understand/visual-audit.md`.

**Decision (proposed):** Explore three directions in phase 3: **A. Quiet canvas, luminous AI**; B. Editorial warmth; C. Bold neo. The recommendation is A, with B's warm copy and one serif for hero numbers. The AI glow is used only for the AI's voice and estimates, which carries principle 3.

**Alternatives considered:** the neobank mainstream (brand-colour flood plus white cards). Rejected because by 2026 it's the default look, not a future-facing one.

**Rationale:** The future-facing signal comes from AI assistant apps rather than banks. A dark-first base gives the AI accent a job and suits data-first screens. It also matches the user's Dione precedent, and light/dark variable modes give a ready live-iteration demo.

**Status:** Open. The user decides after the phase 3 explorations.

---

## [2026-10-15] [UX] — Controlled generative UI: the AI routes to real features and composes only from DS components

**Context:** Research (`01-understand/research.md`, sections 3–4). The user's Dione site assistant routes to an existing page first and only composes an answer, from a fixed set of cell types, when no page fits.

**Decision (proposed):** The assistant sets up **real banking features** (a savings pot, a recurring transfer) rather than inventing new ones. Everything it shows is a **designed component from the system** (plan card, cash-flow bar, fit meter, chips). It never produces free-form UI.

**Alternatives considered:** declarative or open generative UI, where the AI lays out its own cards or HTML. Too risky for money: inconsistent, hard to test, hard to trust.

**Rationale:** Consistency, trust, and it makes the design system central, which the brief scores. It also gives a clear story: Dione points the way, the bank proposes an action and the user approves it.

**Status:** Proposed; confirm in phase 2.

---

## [2026-10-15] [UX] — Concept direction: the conversation is the history, a live plan card is the state

**Context:** The brief asks for smooth movement between conversation and graphical controls without losing context.

**Decision:** The AI writes into one shared object, the **plan card**. Chat messages and graphical controls (slider, toggles, assumption chips) both edit that same card. The chat keeps a record of what changed ("Moved start to December, so €430/month"), and the card always shows the current plan.

**Alternatives considered:**
- Chat only, with every adjustment made by typing. Slow and imprecise for numbers.
- A separate "planner" screen opened from chat. Context breaks at the handover.
- Form-first with an AI helper on the side. Not intent-first.

**Rationale:** One source of truth means nothing is lost when switching modes. It's also easy to understand ("this card is your plan") and maps neatly to a component with states.

**Status:** Proposed. Confirm in phase 2 (`02-define/journey.md`).

---

## [2026-10-15] [Process] — Doc structure: lean version of the eigodojo setup

**Context:** The user pointed to the eigodojo project as a reference for structure and documentation, but asked not to copy it 1:1.

**Decision:**
- **Kept:** `CLAUDE.md` with a doc table; an overwritten `current-state.md`; the Context → Decision → Alternatives → Rationale → Status format; screen tags shared by Figma and docs; Figma variables as the source of truth.
- **Changed:** one tagged decision log instead of two; 6 short phase folders instead of 10 phases.
- **Added:** `ai-log.md` (25% of the score is AI judgement, so it's captured as we go), `time-log.md` (hours are part of the submission), `criteria-map.md` (requirement → evidence), and a presentation outline and live-iteration prep from day 1.
- **Dropped:** history files and an archive folder.

**Alternatives considered:** copying eigodojo's structure as is (too heavy for 4–6 h); no structure, docs written at the end (loses the AI evidence and the trade-off reasoning the presentation needs).

**Rationale:** The presentation is built from these docs, so each piece of the brief needs a home from the start.

**Status:** Done; folders and skeletons created.
