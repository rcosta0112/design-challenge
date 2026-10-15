# code/ — clickable prototype

The SvelteKit prototype for the journey `ab-00.start` → `ab-06.done`. What it must do is specified in `doc/03-design/prototype-spec.md`. The PlanCard handoff component (`doc/05-handoff/plan-card.md`) will live here too, so the mapping points at real code.

## Run

```sh
npm install
npm run dev      # http://localhost:5180 (also on the LAN, for testing on a phone)
npm run check    # types
npm run lint     # prettier + eslint
npm run build    # static site in build/
```

Needs Node 22.13+. SvelteKit is pinned to 2.x because 3.x needs Node 22.17.

## Stack

SvelteKit 2 + Svelte 5 (runes), Tailwind 4, shadcn-svelte (Button, Slider, Switch so far; add more with `npx shadcn-svelte@latest add <name>`), `adapter-static` (every route prerendered, no server, hosts anywhere).

## Where things are

| Path | What |
|---|---|
| `src/routes/layout.css` | Tokens: Figma `Mint Dark` mode as CSS variables and Tailwind theme, type styles, route-transition CSS. Figma wins if they disagree. |
| `src/routes/+layout.svelte` | Phone frame and direction-aware route transitions (View Transitions API) |
| `src/routes/+page.svelte` | `/`: `ab-00.start`, `ab-01.intent` |
| `src/routes/plan/+page.svelte` | `/plan`: the thread (`ab-02`, `ab-03`, `ab-06`) with sheets `ab-04`, `ab-05` |
| `src/lib/plan.svelte.ts` | The one plan object and its maths (must match `journey.md` › Maths check) |
| `src/lib/motion.svelte.ts` | Durations, easing, `prefers-reduced-motion` |
| `src/lib/components/` | Project components (`Screen`, `Sky`, `Sheet`, `AnimatedNumber`, `PhoneFrame`) |
| `src/lib/components/ui/` | shadcn-svelte components as generated; restyled only through tokens |

## Conventions

- Every screen is a `<Screen tag="ab-0x.name">`; the tag lands in `data-screen` and matches the Figma frame and `screens.md`.
- Sheets open with shallow routing (`pushState`), so the browser's Back closes them. Swapping sheet content uses `replaceState`.
- Motion: route push/pop via View Transitions, sheets via `svelte/transition`, numbers via `AnimatedNumber`. Every duration goes through `ms()` so reduced motion makes it instant.
- Colours only through tokens (`bg-card`, `text-warning-foreground`, …); no hex values in components.
