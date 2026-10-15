# Tokens

**Status:** Not started. **Phase:** 4.

Figma variables are the source of truth. This doc mirrors them; if they disagree, Figma wins and this doc gets fixed.

## Structure

Two tiers, so the theme can change without touching components:

- **Primitives** (collection `Primitives`): raw values, for example `blue/600`, `space/4`. Not used directly by components.
- **Semantic** (collection `Semantic`, modes `Light` and later `Dark`): role names that point to primitives, for example `bg/surface`, `text/primary`, `ai/accent`, `status/tight`. Components use only these.

## Colour

| Semantic token | Role | Light | Dark |
|---|---|---|---|
| | | | |

Special roles to define:

- **AI vs fact:** how the AI's voice and estimates look, compared with bank facts (principle 3).
- **Fit status:** comfortable / tight / over budget, for the fit meter. Not colour alone; each also has an icon or label.

## Typography

| Style | Font / size / line height / weight | Used for |
|---|---|---|
| | | |

## Spacing and radius

| Token | Value | Used for |
|---|---|---|
| | | |

## Effects

| Token | Value | Used for |
|---|---|---|
| | | |

## Accessibility rules

- Text contrast WCAG 2.2 AA (4.5:1 for body, 3:1 for large text and UI).
- Tap targets 44 × 44 pt minimum.
- Status is never shown by colour alone.
