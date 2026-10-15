# Tokens

**Status:** Aligned with shadcn (2026-10-15): one collection `shadcn`, one mode `Dark` (the former `Mint Dark`; `Light` and `Mint` were removed, and snapshots are on the Figma page `Archive`). Review and reasoning are in `token-review.md`. **Phase:** 4.

Figma variables are the source of truth. This doc mirrors them; if they disagree, Figma wins and this doc gets fixed. Code mirror: `code/src/routes/layout.css`.

## Structure

- **The contract is shadcn's CSS variables.** Each Figma colour variable `color/x` is the CSS variable `--x`, and its Dev Mode code syntax says so (`var(--x)`). Project extensions follow shadcn's pattern: a `name` + `name-foreground` pair in kebab-case, declared in `:root` and mapped in `@theme inline`. Component groups are allowed, as with shadcn's `sidebar-*` (here `composer-*`).
- **One collection, one tier.** No primitives: shadcn has none, and with a single mode nothing repeats per mode. A repeated value is an alias inside the collection (marked ⇢ below), mirrored in CSS as `var(--…)`.
- **Scopes:** surfaces `FRAME_FILL, SHAPE_FILL`; `*-foreground` `TEXT_FILL, SHAPE_FILL, STROKE_COLOR` (Lucide icons are strokes); `border`, `input`, `ring` `STROKE_COLOR`; charts add `STROKE_COLOR`; `destructive` gets all four.
- Every variable has a Dev Mode description.

## Colour

**shadcn's set**

| Token | Role | Dark |
|---|---|---|
| `color/background` | Canvas | `#0E1512` |
| `color/foreground` | Ink: text, icons | `#F2F5F3` |
| `color/card` / `card-foreground` | Smoked-glass card (+ `blur/xl`) / text | `#0A100E` 62% / ⇢ `foreground` |
| `color/popover` / `popover-foreground` | Raised opaque surface: sheets, Face ID prompt / text (was `color/sheet`) | `#17201D` / ⇢ `foreground` |
| `color/primary` / `primary-foreground` | Primary button / its text | `#0FFFB3` / `#0E1512` |
| `color/secondary` / `secondary-foreground` | shadcn secondary button | ⇢ `muted` / ⇢ `foreground` |
| `color/muted` / `muted-foreground` | Quiet fills (chips, fact pill, user bubble) / secondary text | `#FFFFFF` 12% / `#A7B4AE` |
| `color/accent` / `accent-foreground` | shadcn hover/active tint | ⇢ `muted` / ⇢ `foreground` |
| `color/destructive` | Errors, over-budget fit state; tint with opacity for fills | `#FF6B6B` |
| `color/border` / `input` | Strokes, only where fill can't separate | `#FFFFFF` 16% / ⇢ `border` |
| `color/ring` | Focus outline (WCAG 2.4.7) | ⇢ `primary` |
| `color/chart-1` / `chart-2` | Cash-flow fixed / spending; projection line | `#E3E9E6` / `#7C8883` |

**Project extensions**

| Token | Role | Dark |
|---|---|---|
| `color/success` / `-foreground` | Comfortable fit state: fill / text, icon, amount | `#0FFFB3` 16% / ⇢ `primary` (proposed, not yet used or measured) |
| `color/warning` / `-foreground` | Tight fit state: banner fill / text, icon, amount | `#FFB547` 16% / `#FFC56B` |
| `color/brand` / `brand-foreground` | Brand accent, fill only (Badge) | ⇢ `primary` / ⇢ `primary-foreground` |
| `color/ai-from` → `ai-to` | AI gradient (AiOrb) | ⇢ `primary` → `#7DD3FC` |
| `color/composer` / `-foreground` / `-muted` / `-muted-foreground` | Composer: the one bright surface on dark | `#F2F5F3` / `#0E1512` / `#DDE4E0` / `#525E59` |
| `color/bar` | TabBar (+ `blur/xl`) | `#0E1512` 72% |
| `color/overlay` | Scrim behind sheets | `#000000` 55% |

Special roles still to define:

- **AI vs fact:** how the AI's voice and estimates look, compared with bank facts (principle 3).
- **Fit status:** comfortable / tight / over budget now have tokens (`success`, `warning`, `destructive`). Not colour alone; each also has an icon or label.

## Typography

Text styles, sorted within each folder. CSS utilities are `text-{group}-{size}` (for example `text-display-md`) and include size, line height, tracking and weight.

| Style | Font / size / line height / tracking | Used for |
|---|---|---|
| `display/md` | Geist SemiBold 36/40, −3% | Balance, plan amount (was `display/amount`) |
| `heading/xl` | Geist Medium 28/34, −2% | Greeting, cash-flow income |
| `heading/sm` | Geist SemiBold 18/24, −1% | TopBar and sheet titles |
| `body/lg` | Geist Regular 20/28, −1% | Review summary sentence |
| `body/md` | Geist Regular 16/24 | Composer, AI text |
| `body/sm` | Geist Regular 14/20 | Supporting text (= Tailwind `text-sm`) |
| `label/md` | Geist Medium 16/24 | Buttons, toggle label, Done |
| `label/sm` | Geist Medium 14/20 | Card labels, fact pill |
| `label/xs` | Geist Medium 11/14, +1% | Tab labels |

## Spacing, radius and blur

| Token | Value | Code | Used for |
|---|---|---|---|
| `space/0-5`, `1`, `1-5`, `2`, `2-5`, `3`, `4`, `5`, `6`, `8`, `10` | 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40 | Tailwind step N (`p-1.5`, `gap-6`), `calc(var(--spacing) * N)` | Gaps and padding; screen margin = `space/6`; board padding `space/10` |
| `radius/sm` | 8 | `--radius` − 4, `rounded-sm` | Chat bubble tail (was 6 px) |
| `radius/lg` | 12 | `--radius` (shadcn base), `rounded-lg` | Banners, option cards |
| `radius/xl` | 16 | `--radius` + 4, `rounded-xl` | Small cards |
| `radius/2xl` | 20 | `--radius` + 8, `rounded-2xl` | Chat bubble |
| `radius/3xl` | 24 | `--radius` + 12, `rounded-3xl` | Cards, sheets, filled composer |
| `radius/full` | 999 | `rounded-full` | Pills, composer, icon buttons |
| `blur/xl` | 24 | `--blur-xl`; use `backdrop-blur-[calc(var(--blur-xl)/2)]` | Background blur on card and bar over the sky (not a shadow). Figma's background-blur value is twice the CSS blur radius, so the CSS blur is 12 px; Figma's own code output halves it the same way. Not `backdrop-blur-xl` (that is 24 px, twice as soft as the design). |

Every radius is derived from the one `--radius` base, so changing it rescales them all. shadcn's `md` (10) exists in CSS for its own components only. Device insets stay unbound on purpose: 34 (home indicator, TabBar) and 42 (sheet footer).

## Tailwind setup

`layout.css` locks Tailwind to these tokens:
- `@theme inline` resets Tailwind's default palette and radii (`--color-*: initial`, `--radius-*: initial`), so only our tokens generate colour and radius classes. `white`/`black` are re-added for the page backdrop and shadcn's slider thumb.
- **Shadows are an exception, not a token.** The system has no shadow tokens, and screens don't use them by default. Tailwind's own `shadow-*`, `drop-shadow-*` and `inset-shadow-*` scales stay available in code for a case that genuinely needs one. Log each use in `decision-log.md`.
- Each `text-*` utility carries its Figma weight, so `text-label-sm` alone equals the `label/sm` style. Use `text-label-*` for medium text rather than `text-body-*` plus `font-medium`.
- Opacity modifiers on translucent tokens compound: `bg-muted/60` is about 7% white, not 60%.
- Dev Mode shows `var(--x)`, not a class; add the `bg-`/`text-`/`border-` prefix by context.

## Motion (code only)

Figma variables can't hold easing or duration, so these live in `layout.css` and `code/src/lib/motion.svelte.ts`.

| Token | Value | Used for |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Everything that enters; route transitions |
| `--ease-in` | `cubic-bezier(0.64, 0, 0.78, 0)` | Exits |
| Route transition | 360 ms | `/` ⇄ `/plan` |
| `DURATION.fade` / `stream` / `sheet` / `statusStep` / `countUp` | 200 / 240 / 300 / 300 / 600 ms | Fades, thread stream-in, sheets, status steps, amount count-ups |

All motion respects `prefers-reduced-motion`.

## Accessibility rules

- Text contrast WCAG 2.2 AA (4.5:1 for body, 3:1 for large text and UI).
- Tap targets 44 × 44 pt minimum.
- Status is never shown by colour alone.
- Visible focus: `ring` on every focusable control.
- No shadows by default; an exception may use Tailwind's built-in shadows in code (see Tailwind setup). No borders unless strictly necessary; surfaces separate by fill. Fix contrast by adjusting colours (add greys), not by adding strokes.
