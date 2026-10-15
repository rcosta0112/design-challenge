# Tokens

**Status:** First pass in Figma (2026-10-15), one collection `shadcn`, mode `Light`. **Phase:** 4.

Figma variables are the source of truth. This doc mirrors them; if they disagree, Figma wins and this doc gets fixed.

## Structure

Two tiers, so the theme can change without touching components:

- **Primitives** (collection `Primitives`): raw values, for example `blue/600`, `space/4`. Not used directly by components.
- **Semantic** (collection `Semantic`, modes `Light` and later `Dark`): role names that point to primitives, for example `bg/surface`, `text/primary`, `ai/accent`, `status/tight`. Components use only these.

## Colour

Currently one flat collection, `shadcn`, with shadcn's role names (decision-log, 2026-10-15). The primitives/semantic split above is still the target.

| Token | Role | Light | Dark |
|---|---|---|---|
| `color/background` | Canvas | `#F7F6F2` | — |
| `color/foreground` | Ink: text, icons | `#14141A` | — |
| `color/card` / `card-foreground` | Card surface / text | `#FFFFFF` / `#14141A` | — |
| `color/primary` / `primary-foreground` | Primary button / its text | `#14141A` / `#F7F6F2` | — |
| `color/muted` | Quiet fills (fact pill, disabled send) | `#EFEDE7` | — |
| `color/muted-foreground` | Secondary text, inactive tabs | `#6B645B` | — |
| `color/border` / `input` | Card and input strokes | `#E6E3DC` | — |
| `color/brand` / `brand-foreground` | Brand accent, fill only / ink on it | `#FFE066` (butter, not final) / `#14141A` | — |
| `color/ai-from` → `ai-to` | AI signal gradient (AiOrb, later estimates) | `#B9C2FF` → `#8EE3D3` | — |

Special roles to define:

- **AI vs fact:** how the AI's voice and estimates look, compared with bank facts (principle 3).
- **Fit status:** comfortable / tight / over budget, for the fit meter. Not colour alone; each also has an icon or label.

## Typography

| Style | Font / size / line height / weight | Used for |
|---|---|---|
| `heading/xl` | Geist Medium 28/34, −2% | Greeting |
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
| | | |

## Accessibility rules

- Text contrast WCAG 2.2 AA (4.5:1 for body, 3:1 for large text and UI).
- Tap targets 44 × 44 pt minimum.
- Status is never shown by colour alone.
