# Criteria Map

Each brief requirement and scoring criterion, and where the evidence for it lives. Use it as the checklist before submitting, and as a guide to what the reviewers will look for. Fill in the **Evidence** column as the work lands.

Status: ☐ not started · ◐ in progress · ☑ done

## Experience requirements

| Requirement | Planned answer | Evidence | Status |
|---|---|---|---|
| Express intent naturally, without knowing which feature to open | Home opens on the assistant composer with suggestion chips (`ab-01.intent`) | | ☐ |
| Understand financial information through simple visuals | Cash-flow bar ("~€X free each month") and a projection line (`ab-02.understand`, `ab-03.plan`) | | ☐ |
| Explore an AI recommendation; adjust assumptions or preferences | Plan card with 3 options, editable assumption chips, slider and toggles (`ab-03.plan`, `ab-04.adjust`) | | ☐ |
| Review and explicitly approve, with clarity about what will happen | Review screen listing what, when, from where, and how to undo; confirm with biometrics (`ab-05.review`) | | ☐ |
| Move between conversation and graphical controls, preserving context | One shared plan card that both chat and controls edit (`ab-04.adjust`) | | ☐ |

## Figma, prototype, AI and handoff requirements

| Requirement | Planned answer | Evidence | Status |
|---|---|---|---|
| Small, organised design system | Pages: Foundations, Components; see `04-system/` | | ☐ |
| Auto Layout, components/variants, styles or variables | Every component uses Auto Layout; tokens are variables | | ☐ |
| Screens built from the system | No detached instances on the Screens page | | ☐ |
| Clickable prototype of one complete core journey | `ab-01` → `ab-06`; see `03-design/prototype-spec.md` | | ☐ |
| Includes the AI interaction, a meaningful decision and a confirmation | Chat → choose and adjust the plan → approve → done | | ☐ |
| Key transitions and at least one state change | Plan card draft → adjusting → approved; fit meter changes colour with the slider | | ☐ |
| Show the AI tools used, what they generated, what was changed and how it was judged | `ai-log.md` → AI slide | | ☐ |
| One component mapped to production | PlanCard; `05-handoff/` | | ☐ |
| 4–6 polished screens | 6 planned | | ☐ |
| 1–2 summary slides with journey, rationale, AI tools and accessible links | `06-presentation/` | | ☐ |
| Hours used, stated on submission | `time-log.md` | | ☐ |

## Scoring criteria

| Criterion | Weight | What shows it |
|---|---|---|
| UX & product thinking | 25% | Principles, journey, the trust decisions, decision-log entries on trade-offs |
| Visual design quality | 20% | The 6 screens, data visuals, consistency |
| AI-assisted design & critical judgement | 25% | `ai-log.md`: rejected and edited output, before/after images |
| Figma & design system quality | 15% | Variables, variants, Auto Layout, page structure, naming |
| Prototype & implementation handoff | 15% | Transitions, state change, PlanCard handoff |

The reviewers also say they'll prioritise **clear thinking, elegant interaction design, consistency, user control and iterating effectively with AI.**
