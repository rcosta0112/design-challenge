# Tokens

**Status:** First pass in Figma (2026-10-15), one collection `shadcn`, modes `Light` (butter), `Mint` (Wise-like) and `Mint Dark` (picked direction: dark over sky images, `color-audit.md`). **Phase:** 4.

Figma variables are the source of truth. This doc mirrors them; if they disagree, Figma wins and this doc gets fixed.

## Structure

Two tiers, so the theme can change without touching components:

- **Primitives** (collection `Primitives`): raw values, for example `blue/600`, `space/4`. Not used directly by components.
- **Semantic** (collection `Semantic`, modes `Light` and later `Dark`): role names that point to primitives, for example `bg/surface`, `text/primary`, `ai/accent`, `status/tight`. Components use only these.

## Colour

Currently one flat collection, `shadcn`, with shadcn's role names (decision-log, 2026-10-15). The primitives/semantic split above is still the target.

| Token | Role | Light | Mint | Mint Dark |
|---|---|---|---|---|
| `color/background` | Canvas | `#F7F6F2` | `#FFFFFF` | `#0E1512` |
| `color/foreground` | Ink: text, icons | `#14141A` | `#0E1512` | `#F2F5F3` |
| `color/card` / `card-foreground` | Card surface / text | `#FFFFFF` / `#14141A` | `#EEF2F0` / `#0E1512` | `#0A100E` 62% (+ blur) / `#F2F5F3` |
| `color/primary` / `primary-foreground` | Primary button / its text | `#14141A` / `#F7F6F2` | `#0FFFB3` / `#0E1512` | `#0FFFB3` / `#0E1512` |
| `color/muted` | Quiet fills (fact pill, disabled send) | `#EFEDE7` | `#DDE4E0` | `#FFFFFF` 12% |
| `color/muted-foreground` | Secondary text, inactive tabs | `#6B645B` | `#525E59` | `#A7B4AE` |
| `color/border` / `input` | Card and input strokes | `#E6E3DC` | `#DDE4E0` | `#FFFFFF` 16% |
| `color/brand` / `brand-foreground` | Brand accent, fill only / ink on it | `#FFE066` (butter, not final) / `#14141A` | `#0FFFB3` / `#0E1512` | `#0FFFB3` / `#0E1512` |
| `color/ai-from` → `ai-to` | AI signal gradient (AiOrb, later estimates) | `#B9C2FF` → `#8EE3D3` | `#0FFFB3` → `#7DD3FC` | `#0FFFB3` → `#7DD3FC` |
| `color/composer` / `-foreground` / `-muted` / `-muted-foreground` | Composer: the one bright surface on dark | `#FFFFFF` / `#14141A` / `#EFEDE7` / `#6B645B` | `#EEF2F0` / `#0E1512` / `#DDE4E0` / `#525E59` | `#F2F5F3` / `#0E1512` / `#DDE4E0` / `#525E59` |
| `color/bar` | TabBar | `#F7F6F2` | `#FFFFFF` | `#0E1512` 72% (+ blur) |
| `color/sheet` | Sheet surface | `#FFFFFF` | `#FFFFFF` | `#17201D` |
| `color/overlay` | Dim behind sheets | `#14141A` 40% | `#0E1512` 40% | `#000000` 55% |
| `color/warning` / `-foreground` | Tight status: banner fill / text, icon, amount | `#FFF1D6` / `#8A5300` | `#FFF1D6` / `#8A5300` | `#FFB547` 16% / `#FFC56B` |
| `color/chart-1` / `chart-2` | Cash-flow segments: fixed / spending | `#14141A` / `#A39C92` | `#0E1512` / `#7C8883` | `#E3E9E6` / `#7C8883` |

Special roles to define:

- **AI vs fact:** how the AI's voice and estimates look, compared with bank facts (principle 3).
- **Fit status:** comfortable / tight / over budget, for the fit meter. Not colour alone; each also has an icon or label.

## Typography

| Style | Font / size / line height / weight | Used for |
|---|---|---|
| `heading/xl` | Geist Medium 28/34, −2% | Greeting, cash-flow income |
| `heading/sm` | Geist SemiBold 18/24, −1% | TopBar and sheet titles |
| `label/md` | Geist Medium 16/24 | Buttons, toggle label, Done |
| `display/amount` | Geist SemiBold 36/40, −3% | Balance |
| `body/md` | Geist Regular 16/24 | Composer, AI text |
| `body/sm` | Geist Regular 14/20 | Supporting text |
| `label/sm` | Geist Medium 14/20 | Card labels, fact pill |
| `label/xs` | Geist Medium 11/14, +1% | Tab labels |

## Spacing and radius

| Token | Value | Used for |
|---|---|---|
| `space/1`…`space/6` | 4, 8, 12, 16, 20, 24 | Gaps and padding (screen margin = `space/6`) |
| `radius/md`, `lg`, `xl`, `full` | 12, 16, 24, 999 | Cards `xl`; composer, pills and icon buttons `full` |

## Effects

| Token | Value | Used for |
|---|---|---|
| Background blur | 24 | Cards and TabBar over the sky images (not a shadow) |

## Accessibility rules

- Text contrast WCAG 2.2 AA (4.5:1 for body, 3:1 for large text and UI).
- Tap targets 44 × 44 pt minimum.
- Status is never shown by colour alone.
- No drop shadows. No borders unless strictly necessary; surfaces separate by fill. Fix contrast by adjusting colours (add greys), not by adding strokes.
