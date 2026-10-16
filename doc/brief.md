# Brief

The brief as received (2026-10-15), followed by our reading of it and the assumptions we're working under. If the interpretation changes, update it here and log the change in `decision-log.md`.

## 1. Brief (verbatim)

> Your design portfolio is very important for our assessment. Nevertheless, we want to conduct a fairer evaluation of candidates through a practical challenge that will be the same for all candidates. In this challenge you will have the opportunity to show your best skills as a digital designer by creating the UI/UX of a simple project. This project is only used for evaluation purposes.
>
> **Context**
>
> Design an AI-native mobile banking experience that turns a user's intent into a clear, trustworthy and actionable journey.
>
> Traditional banking apps require users to navigate menus and understand products before taking action. Imagine a mobile experience where a customer can simply describe what they want to achieve and an AI assistant helps them get there.
>
> Example user request: "*I want to save €3,000 for a holiday next summer, but I don't know how much I can afford to save every month*"
>
> Design the experience you consider most appropriate. Decide how conversational AI, visual interfaces and familiar app interactions work together. Create only the screens necessary to communicate the experience.
>
> **What the experience should demonstrate:**
> - Express intent naturally, without requiring the user to know which banking feature to open.
> - Understand relevant financial information through simple, meaningful visuals.
> - Explore an AI-generated recommendation and adjust assumptions or preferences.
> - Review and explicitly approve an action, with clarity about what will happen.
> - Move smoothly between conversation and graphical controls while preserving context.
>
> **Design system & Figma**
>
> Build a small, organised Figma design system containing the foundations and reusable components needed for your solution. Use Auto Layout, components/variants and appropriate styles or variables. Screens should be built from this system, not as isolated mockups.
>
> **Interactive prototype**
>
> Create a clickable prototype showing one complete core journey, including the AI interaction, a meaningful user decision and a confirmation or next step. Demonstrate key transitions and at least one state change.
>
> **AI-assisted workflow**
>
> Use AI tools to accelerate research, ideation, visual exploration, component creation or prototyping. Briefly show which tools you used, what they generated, what you changed and how you judged the quality of the results. We value thoughtful use of AI, not unedited output.
>
> **Design-to-code readiness (plus)**
>
> Choose one reusable UI component and explain how it would map to a production implementation. If you have access to a suitable code repository and Figma Code Connect setup, demonstrate the mapping; otherwise provide a concise handoff specification.
>
> **Deliverables:**
> - Figma file with approximately 4–6 polished mobile screens and the supporting design system.
> - Interactive Figma prototype covering the primary journey.
> - One or two summary slides with the user journey, design rationale, AI tools used and accessible links.
> - Optional: component-to-code mapping or Code Connect example.
>
> **Timebox & presentation**
>
> Recommended effort: 4–6 hours. Keep the solution focused and polished rather than maximising screen count. Shortlisted candidates will present their work in a 45-minute discussion, including a walkthrough of the Figma structure, AI workflow, trade-offs and a small live iteration.
>
> **Evaluation criteria**
>
> UX & product thinking: 25% · Visual design quality: 20% · AI-assisted design & critical judgement: 25% · Figma & design system quality: 15% · Prototype & implementation handoff: 15%
>
> We will prioritise clear thinking, elegant interaction design, consistency, user control and the ability to iterate effectively with AI.
>
> **Submission:** submit the result in the field provided, and indicate the number of hours used in the description field.

## 2. Interpretation

- **One journey, done well.** The example request (holiday savings goal) is the primary journey. We don't design a whole banking app; only the screens needed to tell this story.
- **"AI-native" means intent first, not a chatbot bolted on.** The assistant is the entry point. Familiar UI (cards, sliders, summaries) appears when it's clearer than text.
- **Trust is the hard part.** Showing the data the AI used, labelling estimates, keeping the user in control and asking for explicit approval matter more than clever conversation.
- **The design system is assessed on its own (15%)**, and screens must visibly come from it.
- **AI workflow is a quarter of the score.** The evidence is the judgement: what was rejected, what was changed and why. Logged in `ai-log.md` from the start.
- **The live iteration** in the presentation tests whether the file is built to change. See `06-presentation/live-iteration-prep.md`.

## 3. Assumptions

| Assumption | Why | Revisit if |
|---|---|---|
| Fictional bank, placeholder **[Bank]** | Avoid imitating a real brand | The user picks a name |
| Euro, English UI | The brief's example uses € and is in English | — |
| iOS-style frame, 402 × 874 (iPhone 16 Pro) | Common current size; same reference width as past work | — |
| The user already banks with [Bank]: salary arrives there, 3+ months of history | Needed for the AI to read cash flow | — |
| Today in the story is mid-October 2026; "next summer" means June 2027 | Gives 8 monthly transfers | — |
| Approval is the only step that moves money; the AI proposes and never acts on its own | Trust and regulation | — |
| Dark only (`Dark` mode, over a sky background); no light mode | Picked in visual exploration; one mode keeps the timebox (decision-log "Dark direction picked", "Keep only the `Mint Dark` variable mode") | A reviewer asks for light mode in the live iteration |
