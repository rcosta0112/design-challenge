# Colour Palette Audit

**Status:** First pass done (2026-10-15). The accent choice is open; see the end of this doc.

**The question:** the user picked Klarna and Wise as the closest look. How do their palettes work, which colours are already taken by other apps, and what would a palette of our own look like?

## Method and limits

- **Source:** the same App Store screenshots as `visual-audit.md` (17 apps, `visual-audit/app-store/`).
- **How:** `visual-audit/palette.py` counts only **flat fills** (pixels with a low local gradient), so photos and textures mostly drop out. It clusters them into up to 8 colours per app and gives each one's share of the flat area. Output: `visual-audit/palettes.json` and the swatch sheet `visual-audit/palettes.png`.
- **Small accents get lost in the clusters** (Klarna's pink is under 1% of its flat area), so the Klarna and Wise accents were pulled in a second pass from saturated pixels only.
- **Limit:** marketing screenshots, JPEG-compressed. The hex values are within a few units of the real ones. Klarna's and Wise's extracted values match their published or recreated values (Klarna pink ≈ `#FFA8CD`, Wise `#9FE870` / `#163300`).
- **Contrast:** WCAG 2.x ratios. 4.5:1 for body text, 3:1 for large text and UI shapes.

## Klarna and Wise: how the palettes work

| | **Klarna** | **Wise** |
|---|---|---|
| Canvas | Warm off-white `#F9F8F4` (69% of flat area) | Near-white `#FDFCFC` (34%) |
| Ink | Deep aubergine-black `#1A1229` (25%), used for text *and* as a dark surface | Near-black `#080C05` for text; **forest green** `#163300` as the dark surface (23%) |
| Accent | Pastel pink `#FFA8CD`, **under 1%**: logo pill, one button per screen | Lime `#9FE870` (14%): primary buttons, big panels, charts |
| Secondary text | Warm grey `#7B6E63` | Warm olive-grey `#857D69` |
| Mood | Calm, editorial; the colour is a signature, not a fill | Loud; two greens carry the whole brand |

**What they share, and what's worth copying:**

1. **A pale accent with dark text on it.** Both accents are light (pink, lime). Text on them is the ink colour, never white. Ink on pink is 10.1:1; forest on lime is 9.5:1.
2. **The accent never works as text on the light canvas.** Pink on cream is 1.7:1; lime on white is 1.5:1. Both brands only use it as a fill. Our tokens need to make that rule explicit.
3. **Warm neutrals, not cool greys.** Both off-whites and both secondary greys lean warm (yellow-brown). Nothing here is the blue-grey of a typical bank or SaaS app.
4. **Few colours.** Klarna is in effect three: cream, ink, pink. Wise is four: white, ink, forest, lime. There's no rainbow of semantic colours in the marketing UI.
5. **A tinted ink.** Klarna's black leans purple and Wise's dark surface is green. The darkest colour carries the brand too.
6. **Secondary grey is borderline.** Wise's `#857D69` on white is 4.0:1, below 4.5:1 for body text. Ours should be a step darker.

## Which hues are taken

From the swatch sheet, by the main brand hue:

| Hue | Taken by |
|---|---|
| Blue | Caixadirecta, Copilot, (bunq) — and most traditional banks |
| Magenta, raspberry | Millennium bcp, ING |
| Purple, lilac | Nubank, (Klarna's ink), (Revolut's lavender) |
| Green, lime, teal | Wise, Chime, N26 |
| Red, coral | Monzo |
| Pink | Klarna |
| Terracotta, peach | Claude, Perplexity, Cleo |
| Black only | Revolut, Gemini, Perplexity |
| **Yellow, butter** | **No one in the set** |
| **Aqua (pastel)** | No one; N26's teal is the nearest, but dark |
| Periwinkle (pastel) | Only as a minor tone (Revolut, ChatGPT's gradient) |

## Candidate accents

All tested against a warm off-white canvas `#F7F6F2` and a near-black ink `#14141A`, following the Klarna/Wise pattern (pale accent, ink text on top).

| Accent | Hex | Ink on accent | Accent on canvas | Notes |
|---|---|---|---|---|
| **Butter** | `#FFE066` | 14.1:1 | 1.2:1 | Unclaimed in the set. Warm, optimistic, close to the saving-and-goals mood. Risk: yellow reads as "warning" in data. |
| **Aqua** | `#8EE3D3` | 12.3:1 | 1.4:1 | Fresh, calm. Risk: near N26's teal family. |
| **Periwinkle** | `#B9C2FF` | 10.7:1 | 1.6:1 | Soft, techy; sits well next to an AI gradient. Risk: drifts toward Revolut and Nubank. |
| Apricot | `#FFC29A` | 11.7:1 | 1.5:1 | Warm. Too close to Cleo and Claude. |

Saturated mid-tones (electric blue `#3D5AFE`, violet `#7B61FF`) fail with ink text (3.6:1 and 4.4:1) and need white text, which breaks the pale-accent pattern. Not recommended.

## Proposed starting palette

To confirm, then set up as Figma variables (`04-system/tokens.md` mirrors them):

- **Canvas** `#F7F6F2` (warm off-white), **surface** `#FFFFFF`, **ink** `#14141A`, **secondary text**: a warm grey at 4.5:1 or more on the canvas (to pick in Figma).
- **Brand accent:** one pale colour from the table above, **fill only**, always with ink text.
- **AI signal:** kept separate from the brand accent. A gradient or glow used only for the AI's voice and its estimates (carried over from direction A in `visual-audit.md`). It should be built from hues next to the accent so it doesn't fight it.
- **Semantic colours** (positive, warning, negative) used only in data and status, never as brand.
- **Dark mode:** ink becomes the canvas; the pale accent keeps working (ink-on-accent stays above 10:1).

**Recommendation:** **butter** as the brand accent, because it's the only hue nobody in the set owns, with a **periwinkle-to-aqua gradient** as the AI signal. If butter clashes with warning states in the data, aqua is the fallback.

## Variation B: "Mint", closer to Wise (2026-10-15)

The user asked for a second direction closer to Wise: brand accent **`#0FFFB3`** (mint), high-contrast text on white, light/medium grey cards, the grey balanced by the accent. **No drop shadows; no borders unless strictly necessary; contrast is fixed by adjusting colours (more greys if needed), not by adding strokes.**

Built as the Figma variable mode `Mint` (collection `shadcn`) and the frame `ab-00.start--mint`.

| Role | Hex | Contrast |
|---|---|---|
| Canvas | `#FFFFFF` | — |
| Ink | `#0E1512` (green-tinted near-black) | 18.5:1 on white, 16.4:1 on card |
| Card (grey 100) | `#EEF2F0`, cool grey leaning toward the mint | separates from white by fill, no stroke |
| Muted (grey 200) | `#DDE4E0`: disabled send, fills on cards | ink 14.3:1 |
| Secondary text (grey 600) | `#525E59` | 6.8:1 white, 6.0:1 card, 5.2:1 grey 200 |
| Brand accent | `#0FFFB3`, **fill only**, ink on it | ink on mint 14.1:1; mint on white 1.3:1 (never text) |
| AI gradient | `#0FFFB3` → `#7DD3FC` | ink on sky 11.1:1 |

- **Balance:** grey carries the surfaces; mint marks the one key fact or action per screen (on `ab-00`: the payday pill).
- **Primary button** = mint with ink text, like Wise's lime.
- **Risk:** mint sits in the green family Wise, Chime and N26 own. It reads as "close to Wise" by design; the tinted ink and cool greys keep it from being a copy.
- If a stroke is ever truly needed (input focus), use a grey that reaches 3:1, e.g. grey 500 `#7C8883` (3.7:1 white, 3.3:1 card).

## Review: two dark-background variations of Mint (2026-10-15)

The user made two versions of `ab-00.start--mint` with a dark background, keeping the Mint components unchanged on top. **A** `23:748` uses a blue starry-sky photo. **B** `23:820` uses a dark slate gradient with a warm glow in the bottom-left corner.

**What works:** the greeting reads better on dark. `Hi, Alex.` in mint on dark (about 12:1 on B) gives mint a text role it can't have on white (1.3:1). The dark base also matches the "dark-first, AI-native" direction (Visual direction, option A).

**Issues in both:**
- **Two modes on one screen.** The light TabBar, Composer and BalanceCard sit on a dark backdrop. The white TabBar cuts the image off like a slab, and the screen reads as a light app pasted onto a wallpaper.
- **The Composer and BalanceCard share one fill** (`#EEF2F0`), so the main action (ask) doesn't stand out from the information (balance).
- **The top half is empty.** The greeting floats in about 470px of background.
- **Two mint accents** (greeting and payday pill). This breaks the "one mint per screen" rule in Variation B.

**A, the sky photo:** reads as space/sci-fi or crypto rather than a bank, and saturated blue fights the mint. Stars and clouds change the contrast behind the text. It's also a raster asset, not a token, so it's harder to theme and build.
**B, the slate gradient:** more restrained and bank-like, and it can be made from tokens. The warm glow sits only behind the cards, so it looks accidental, and amber is a third hue alongside mint and slate.

**Recommendations:**
1. **Pick B.** Rebuild it as a variable mode `Mint Dark` rather than a background layer. Canvas `#0E1512` (the Mint ink), card `#1A2420`, muted `#26332E`, text `#F2F5F3`, secondary `#9AA8A2`. These values are proposed and need a contrast check.
2. **Give the glow a job.** Use the AI gradient (mint → sky) behind the greeting and Composer, so it marks where the AI lives. Later it can be the AiOrb's thinking state. Drop the amber.
3. **Hierarchy by fill:** a light Composer (the one bright surface, the action) over a dark BalanceCard (information). Or keep both dark and use mint on the send button.
4. **TabBar on the dark canvas,** with no stroke, separated by fill only, or transparent over the gradient.
5. **Keep one accent:** mint for the greeting name or the payday pill, not both. On dark, the greeting is the better use.
6. **Fill the empty space with 2–3 suggestion chips** above the Composer (e.g. "Can I afford…", "Save for…"). These are standard for AI assistants (`assistant-flows.md`) and hint at the story.
7. **Housekeeping:** `23:748` is a flattened image (no layers), which breaks the "components only" rule. Three frames share the tag `ab-00.start--mint`. Rename them, e.g. `--mint-sky` and `--mint-dark`.
