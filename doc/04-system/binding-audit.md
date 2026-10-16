# Binding Audit (2026-10-16)

A Plugin API read of the Figma file: is every value that has a token bound to a variable or style? Run again after big changes; the scripts are in `ai-log.md` (2026-10-16, binding audit).

**Variables:** one collection, `shadcn`, mode `Dark`: 52 variables (colours, `radius/*`, `space/*`, `blur/xl`). Text through text styles.

## What was checked

- **Components page:** all 39 components (sets and their variants, standalone components). Solid fills and strokes bound to a colour variable; visible effects bound or styled; text with a text style; corner radius, auto-layout gap and padding bound to a variable. Nested instances are checked in their own component, not again in the parent.
- **Screens page:** the same checks on every layer outside an instance (92 instances; the rest are layout frames and 4 text layers).

## Result

| Where | Unbound | Verdict |
|---|---|---|
| Components: 37 of 39 | none | ✅ |
| `AiOrb` (and `ChatBubble`, which nests its orb layer): the glow effect on `orb` | 1 effect | Deliberate exception: the orb's glow is the AI's mark and has no token. Leave it; documented here and in the component description. |
| Screens: all fills, strokes, radii, gaps, text | none | ✅ |
| Screens: `footer` in `ab-04.adjust`, `ab-04.adjust--tight`, `ab-05.review`: `paddingBottom = 42` | 3 | Deliberate exception: clearance for the home indicator (34) plus 8, a device safe area rather than a spacing token. In code it's `--safe-bottom`. Leave it. |
| Screens: detached instances | none | ✅ |

**Fix list:** nothing to fix. Two deliberate exceptions, both explained above.
