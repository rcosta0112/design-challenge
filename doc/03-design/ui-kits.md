# UI Kit Shortlist

**Status:** shadcn picked (2026-10-15), rebuilt locally with shadcn's structure because the Obra file can't be linked from here; see `decision-log.md`. **Phase:** 1 → 4.

Figma component libraries that get close to the chosen Klarna + Wise look with little customisation. AI use is logged in `ai-log.md` ("Component library scan"). Once a kit is picked, record the choice in `decision-log.md` and set up the variables in `04-system/tokens.md`.

## Recommended

- **Obra shadcn/ui (Figma Community):** the main component library. It's neutral and built on variables, so it restyles easily to our palette (`01-understand/color-audit.md`).
- **Apple iOS UI kit:** system chrome only (status bar, home indicator, sheets, keyboard). The frames are iPhone 16 Pro.

## Alternatives

- **Material 3 Design Kit + Theme Builder:** generates a themed palette from one colour, but looks like Android out of the box and needs more work to reach the look.
- **Paid fintech kits (Finzo, FINA):** a fallback with banking components ready-made (balance cards, transaction rows). They cost money and come with their own visual style to remove.

## Notes

- Neither Klarna nor Wise publishes a Figma kit (Wise's design system is closed), so only unofficial token recreations exist.
- This list comes from web search only. None of the files were opened in Figma, and kit contents (variables, component counts) are what the vendors claim. Check them before committing to one.

## Still open

- The brand accent: butter, aqua or periwinkle (butter is wired as `color/brand` for now).
- Whether to link the real Obra file later and swap components.
