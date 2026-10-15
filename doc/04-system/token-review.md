# Token review

**Date:** 2026-10-15. **Scope:** Figma collection `shadcn` (read through the Plugin API), the text styles, `code/src/routes/layout.css` and `tokens.md`. **Status:** Applied 2026-10-15, as revised in "Aligning with shadcn" (decision-log, "Tokens follow shadcn's CSS-variable contract"). Open: 61 paddings of 40 and 34 px with no token, and contrast (17).

## What's already good

- Components are fully bound. Across 65 components: 147/147 solid fills, 47/49 radii and 91/91 text layers use a variable or style. No hard-coded colours.
- The colour names follow shadcn's (`background`, `card`, `muted-foreground`…), so Figma and CSS map one to one.
- The spacing scale is Tailwind's (`space/1` = 4 px).
- Variable scopes are set rather than left at `ALL_SCOPES`.

## Findings, by priority

### P1: structure

1. **One flat collection for everything.** `shadcn` holds colour, radius and space, so radius and space store the same value three times (once per mode). The standard setup (Figma's own guidance, Material 3, Tailwind) uses separate collections:
   - `Primitives`: raw palette, no modes, hidden from publishing.
   - `Color`: semantic roles with `Light`/`Dark` modes, aliasing the primitives.
   - `Dimension` (or `Size`): space and radius, no modes.
   The collection name `shadcn` also names a vendor, not a purpose.
2. **No primitive tier.** Raw hex values sit directly in semantic tokens and repeat: `#0FFFB3` appears in `primary`, `brand`, `ai-from` and in code's `ring`; `#0E1512` appears in 5 places in Mint Dark. `tokens.md` › Structure describes a two-tier system that doesn't exist. Fix: add a palette with names like `mint/400`, `green-grey/950` and `amber/300`, and alias the semantic tokens to it.
3. **Modes mix brand with colour scheme.** `Light` (butter), `Mint` and `Mint Dark` are three themes on one axis. Standard practice is a mode per colour scheme (`Light`/`Dark`), with a brand change made at the primitive or alias level. Mint Dark is picked, so retire butter `Light`, rename `Mint` → `Light` and `Mint Dark` → `Dark`. That also leaves a clean light/dark switch for the live-iteration demo.
4. **Figma and code have drifted.** Code defines `popover`, `secondary`, `accent`, `destructive` and `ring`, none of which exist in Figma, and Figma is meant to be the source of truth. `ring` (the focus outline) matters most, because WCAG 2.4.7 needs a visible focus state.

### P2: naming

5. **Component tokens sit in the semantic layer.** `composer-*`, `bar` and `sheet` name components, not roles. Options:
   - `sheet` → shadcn's `popover`. Code already gives `popover` the same `#17201D`.
   - `composer` / `composer-foreground` / `composer-muted` / `composer-muted-foreground` → `inverse`, `inverse-foreground`, `inverse-muted`, `inverse-muted-foreground` (Material's "inverse surface": a light surface on a dark theme). The Composer then uses them, and so can any future light-on-dark element.
   - `bar` → `nav` (or keep it as a component token in a third tier, `tab-bar/background`).
6. **The fit status set is incomplete.** Only `warning` (tight) exists. The fit meter needs comfortable / tight / over, so add `success` + `success-foreground`, and `destructive` + `destructive-foreground` (shadcn's name; code already has `#FF6B6B`).
7. **`ai-from` / `ai-to`.** Readable, but the AI role has no text or ink token. Consider `ai`, `ai-foreground` and `ai-gradient-from` / `-to` if principle 3 (AI vs fact) gets its own visual treatment.
8. **`display/amount` breaks the type pattern.** Every other style is `role/size`. Rename it to `display/md`, or `display/lg` if a bigger amount is planned. The text styles are also listed out of order in Figma (`heading/xl` first, `body/lg` last); sort them display → heading → body → label, large → small.
9. **Radius names collide with Tailwind.** Our `md`/`lg`/`xl` = 12/16/24, while Tailwind v4's defaults are 6/8/12. `layout.css` overrides them, so every shadcn-svelte component that uses `rounded-md` (buttons, inputs) gets 12 px instead of 6 px. Either rename to Tailwind's scale (12 = `xl`, 16 = `2xl`, 24 = `3xl`, keep `full`) so a name means the same thing everywhere, or accept the rounder look on purpose and log the decision.

### P3: hygiene and gaps

10. **Off-scale spacing.** 23 auto-layout gaps and 15 paddings aren't bound to a variable: gaps 2 (×11), 4 (×3), 6 (×6), 8 (×3); paddings 6, 8, 10, 20 and 32. 4, 8 and 20 already exist as tokens, so bind them. Snap 2, 6 and 10 to the scale where it looks right, or add half steps (Figma doesn't allow `.` in names, so `space/0-5`, `space/1-5`, `space/2-5`). Add `space/8` (32). Two radii (999 and 399.6) are unbound; bind them to `radius/full`.
11. **No `codeSyntax`.** Every variable shows its Figma name in Dev Mode. Set the WEB syntax to `var(--background)` and so on. It costs a few minutes and directly supports the handoff deliverable.
12. **No variable descriptions.** The role column in `tokens.md` should also live on the variables, where it shows in Dev Mode.
13. **Inconsistent scopes.** `composer-foreground` and `warning-foreground` can be frame fills while the other foregrounds can't, and `composer`, `bar`, `sheet` and `chart-*` allow strokes while `background` and `card` don't. Proposed rule: surfaces get `FRAME_FILL, SHAPE_FILL`; `*-foreground` gets `TEXT_FILL, SHAPE_FILL` (icons); `border`/`input`/`ring` get `STROKE_COLOR`.
14. **Blur isn't a token.** 8 layers each carry a hard-coded background blur of 24. Add a FLOAT variable `blur/surface` and bind the effect radius to it, or create an effect style.
15. **Motion lives only in code.** `layout.css` has `ease-out`, `ease-in` and a 360 ms route duration that aren't in `tokens.md`. Document them as `motion/ease-out`, `motion/ease-in` and `motion/duration-md` (they can't be Figma variables, but they belong in the token doc).
16. **Code is missing text utilities** for `body/lg`, `label/md` and `label/sm`.
17. **Translucent surfaces can't be contrast-checked as-is.** `card` is at 62% over sky photos. Contrast has to be measured on the darkest and lightest sky actually used (already a "Next" item in `current-state.md`).

## Aligning with shadcn (2026-10-15)

The prototype uses shadcn-svelte (Tailwind 4.3), so shadcn's CSS variables are the contract between Figma and code. Rule: **the Figma colour variables are shadcn's variable names, one to one, plus extensions written in shadcn's own style.** This updates several findings above:

- **Complete the contract in Figma (raises finding 4 to top priority).** The installed components (`button`, `slider`, `switch`) use `destructive` (16 classes), `ring` (6), `secondary` (4) and `input`. Figma lacks `secondary`, `accent`, `popover`, `destructive` and `ring`, plus their foregrounds. Add them, aliasing where the value repeats (`ring` → `primary`).
- **Extensions follow shadcn's pattern:** kebab-case `name` + `name-foreground` pairs, declared in `:root` and mapped in `@theme inline`. shadcn itself ships component-group tokens (`sidebar-*`), so **keep `composer-*` (this withdraws the `inverse-*` rename in finding 5).** Still fold `sheet` into `popover`, shadcn's raised-surface token; both are already `#17201D`. Add `success` next to `warning` and the existing `destructive` for the fit statuses.
- **Radius uses shadcn's single base (replaces finding 9).** shadcn derives `sm`/`md`/`lg`/`xl` from `--radius` (−4, −2, 0, +4 px). With `--radius: 12px`, our values land on `lg` 12 and `xl` 16, and 24 is Tailwind's built-in `3xl`. So rename Figma `radius/md`→`lg`, `lg`→`xl`, `xl`→`3xl`, and in `layout.css` restore shadcn's derivation instead of hard-coding three values. Today the installed components' `rounded-lg` comes out as 16 px.
- **Spacing:** shadcn has no spacing tokens; Tailwind's `--spacing` is 4 px, so `space/N` = Tailwind step N. Write half steps as `space/1-5` ↔ `1.5`.
- **Type:** shadcn has no type tokens; its components use Tailwind's `text-sm` (14/20, same as our `body/sm`) and `text-xs` (12/16, not our `label/xs` 11/14). Keep our role names, which don't collide with Tailwind's size names.
- **Primitives and collection split (downgrades findings 1–2).** shadcn's CSS has no primitive tier, and with one mode, nothing is stored three times any more. Skip the primitives and the split; alias the duplicates within the collection instead (`brand`, `ring`, `ai-from` → `primary`). Renaming the collection from `shadcn` is optional.
- **Code syntax:** WEB = `var(--primary)` and so on, matching `layout.css`.
- **Dark only** is already wired: `<html class="dark">` plus `@custom-variant dark`, so the components' `dark:` styles always apply. The single Figma mode corresponds to that `:root` set.

## Fit with Tailwind 4 (checked 2026-10-15, after applying)

**Gaps 1–4 fixed on 2026-10-15** (details in `tokens.md` › Tailwind setup):
1. Weights are now part of the `text-*` utilities, and 30 class strings were moved to the matching style (`text-body-sm font-medium` → `text-label-sm`).
2. Tailwind's default palette and radii are reset in `@theme inline`. Shadows were reset too, then restored at the user's request: they are an exception outside the system, so Tailwind's defaults stay usable.
3. Added `space/10`, bound to 60 board paddings. The chat bubble is now `radius/2xl` (20) with a `radius/sm` tail, which changes the tail from 6 to 8 px. All radii now derive from `--radius`, which also removes the duplicate `2xl`. 34 and 42 px stay unbound as device insets.
4. Compounding opacity is documented.

Gap 5 stays as designed.

**Works:**
- Colours become utilities through `@theme inline` (`bg-muted`, `text-muted-foreground`), and opacity modifiers work.
- `space/N` = Tailwind step N with no config (`space/1-5` = `gap-1.5`).
- Radius follows shadcn's `--radius` derivation plus Tailwind's `3xl` and `full`; `blur/xl` = `backdrop-blur-xl`.
- Text styles are `text-{group}-{size}` utilities, with no clash with `text-sm`.
- `--ease-out`/`--ease-in` replace Tailwind's curves.
- Prettier's Tailwind plugin reads `layout.css`.
- About 25 arbitrary values in code, nearly all phone-frame geometry; one default-palette class (`bg-white`, shadcn switch).

**Gaps:**
1. Text utilities don't carry weight; add `--text-*--font-weight` so each utility equals its Figma style.
2. Nothing blocks shadows or the default palette; add `--shadow-*: initial` (also `inset-shadow`, `drop-shadow`) to enforce the no-shadow rule. The palette can be removed too, but `white`/`black` would need adding back.
3. Untokenised values: 40 px padding (Tailwind `p-10`; add `space/10`), 34 px, and the chat bubble's `rounded-[20px]`. Tailwind's `rounded-2xl` (16) duplicates our `xl`.
4. Opacity modifiers compound on translucent tokens (`bg-muted/60` ≈ 7% white).
5. Dev Mode shows `var(--x)`, not a class: one code string per variable can't cover `bg-`/`text-`/`border-`, so this is deliberate.

## Impact of dropping `Light` and `Mint` (checked 2026-10-15)

The user decided to keep only `Mint Dark`. I checked every page for layers that resolve to `Light` or `Mint`, whether the mode is set on the layer or inherited from the default (`Light`):

- **Screens:** 4 frames, all in the old row y=0: two `ab-00.start` frames (inherit `Light`/butter), plus `ab-00.start--mint` and `ab-00.start--mint-slate` (set to `Mint`). All 12 frames in rows y=1100 and y=2200 are set to `Mint Dark` and are unaffected.
- **Components:** only the colour board, `ab-components-01.colour`, which has 25 swatches set to `Light` and 25 set to `Mint` (the two comparison columns). Every component master is under a `Mint Dark` ancestor. `Background` inherits the default but binds no colour variables. No other layer resolves to the default mode.
- **Reference, Wireframes:** don't use the collection.
- **Code:** already `Mint Dark` only.

Before deleting the modes: export the 4 y=0 frames as before/after evidence (AI exploration page), delete the `Light`/`Mint` columns on the colour board, and make `Mint Dark` the default mode. Then rename it `Dark` (finding 3).

## Suggested order if we apply this

Cheap, high-value, no visual change: 11, 12, 13, 10 (binding the values that already exist), 4 (`ring`, `destructive`), 16.
Then the restructure, done in one sitting because it touches every binding: 1–3, then the renames 5, 8, 9.
Afterwards: update `tokens.md` (its Structure section is currently wrong) and `layout.css`, and log the decision.
