# Criteria Map

Each brief requirement and scoring criterion, and where the evidence for it lives. Use it as the checklist before submitting, and as a guide to what the reviewers will look for. Fill in the **Evidence** column as the work lands.

Status: ☐ not started · ◐ in progress · ☑ done

## Experience requirements

| Requirement | Planned answer | Evidence | Status |
|---|---|---|---|
| Express intent naturally, without knowing which feature to open | Home opens on the assistant composer (`ab-00.start`, `ab-01.intent`); suggestion chips dropped to keep Home calm | Figma `33:359`, `38:781`; prototype `/` | ☑ |
| Understand financial information through simple visuals | Cash-flow bar ("~€X free each month") and a projection line (`ab-02.understand`, `ab-04.adjust`) | CashflowBar `33:54`, ProjectionChart `33:111`; Figma `35:519`, `35:686` | ☑ |
| Explore an AI recommendation; adjust assumptions or preferences | Plan card with 3 options, editable assumption chips, slider and toggles (`ab-03.plan`, `ab-04.adjust`) | Figma `38:823`, `35:686`, `35:788`; prototype `/plan` + Adjust sheet | ☑ |
| Review and explicitly approve, with clarity about what will happen | Review screen listing what, when, from where, and how to undo; confirm with biometrics (`ab-05.review`) | Figma `38:924`; prototype Review sheet + Face ID | ☑ |
| Move between conversation and graphical controls, preserving context | One shared plan card that both chat and controls edit (`ab-04.adjust`) | Figma `35:788` (typed question → tight state); the thread update after Done is shown in the prototype only (`plan.svelte.ts` change line) | ◐ |

## Figma, prototype, AI and handoff requirements

| Requirement | Planned answer | Evidence | Status |
|---|---|---|---|
| Small, organised design system | Components page (15 boards, foundations + components); see `04-system/` | Figma `21:372` | ◐ |
| Auto Layout, components/variants, styles or variables | Every component uses Auto Layout; tokens are variables | `shadcn` collection (52 variables, mode `Dark`); text styles; 11 component sets; binding audit `04-system/binding-audit.md` | ◐ |
| Screens built from the system | No detached instances on the Screens page | Plugin API audit 2026-10-16: no unbound fills/strokes outside instances; loose text styled | ☑ |
| Clickable prototype of one complete core journey | SvelteKit app, `ab-00` → `ab-06`; a basic Figma prototype (Flow 1) covers the happy path | https://design-challenge-ten.vercel.app/ | ☑ |
| Includes the AI interaction, a meaningful decision and a confirmation | Chat → choose and adjust the plan → approve → done | Prototype `/` → `/plan` | ☑ |
| Key transitions and at least one state change | Plan card draft → adjusting → approved; fit meter changes colour with the slider | Prototype: route view transitions, sheets, count-ups, €375 → €500 tight → €430 | ☑ |
| Show the AI tools used, what they generated, what was changed and how it was judged | `ai-log.md` → AI slide | `ai-log.md`; `06-presentation/ai-workflow.md` (in progress) | ◐ |
| One component mapped to production | PlanCard; `05-handoff/` | `05-handoff/plan-card.md` → `code/src/lib/components/PlanCard.svelte` | ◐ |
| 4–6 polished screens | 6 planned | 8 frames (6 screens + `ab-01` and `--tight` states), Figma `21:555` | ☑ |
| 1–2 summary slides with journey, rationale, AI tools and accessible links | `06-presentation/` | Summary on the Figma Read me page (in progress); slides not started | ◐ |
| Hours used, stated on submission | `time-log.md` | ~5 h 55 m on 2026-10-15 (estimate) + 2026-10-16 | ◐ |

## Scoring criteria

| Criterion | Weight | What shows it |
|---|---|---|
| UX & product thinking | 25% | Principles, journey, the trust decisions, decision-log entries on trade-offs |
| Visual design quality | 20% | The 6 screens, data visuals, consistency |
| AI-assisted design & critical judgement | 25% | `ai-log.md`: rejected and edited output, before/after images |
| Figma & design system quality | 15% | Variables, variants, Auto Layout, page structure, naming |
| Prototype & implementation handoff | 15% | SvelteKit prototype: transitions, state change; PlanCard in code |

The reviewers also say they'll prioritise **clear thinking, elegant interaction design, consistency, user control and iterating effectively with AI.**
