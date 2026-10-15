# AI-native Banking — Design Challenge

Design an AI-native mobile banking experience that turns a user's intent into a clear, trustworthy and actionable journey. The example request: *"I want to save €3,000 for a holiday next summer, but I don't know how much I can afford to save every month."*

Full brief and our interpretation: [`doc/brief.md`](doc/brief.md).

## Deliverables

| Deliverable | Status | Link |
|---|---|---|
| Figma file: 4–6 polished mobile screens + design system | Reference page done | [Design Challenge](https://www.figma.com/design/VM1bse2WYuRKqF8Umvq02C/Design-Challenge) |
| Interactive prototype of the primary journey (SvelteKit, not Figma; see decision log) | Not started | — |
| 1–2 summary slides (journey, rationale, AI tools, links) | Not started | — |
| Optional: component-to-code mapping / Code Connect | Not started | — |
| Submission text including hours used | Not started | see `doc/time-log.md` |

## Timeline

- Received: 2026-10-15
- Reply expected: within 5 days (by ~2026-10-20)
- Recommended effort: 4–6 hours
- After shortlisting: 45-min presentation, including a Figma walkthrough, AI workflow, trade-offs and a small live iteration

## Repo layout

```
CLAUDE.md                orientation for AI sessions
README.md                this file
doc/
  current-state.md       where things stand now (overwritten)
  brief.md               brief verbatim + interpretation + assumptions
  criteria-map.md        requirement / criterion → evidence
  decision-log.md        one log, tagged [UX] [Visual] [System] [AI] [Process]
  ai-log.md              every AI use: generated → changed → judged
  time-log.md            hours per session
  01-understand/         research, competitor scan, proto-persona
  02-define/             problem + HMW, design principles, journey + screen list
  03-design/             conversation script, screen specs, prototype spec
  04-system/             tokens, component inventory
  05-handoff/            component-to-code spec
  06-presentation/       slide outline, live-iteration prep
code/                    optional: one component for the handoff
```
