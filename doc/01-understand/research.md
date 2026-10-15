# Research

**Status:** First pass done (2026-10-15). Needs a human review: check the sources and mark what's verified. **Budget:** 0.5 h.

A quick scan, not a study. It looks at how banks, and products outside banking, turn intent into an action, and at what makes people trust money advice from an AI. The visual side is in [`visual-audit.md`](visual-audit.md).

**Source quality:** most sources are press releases, trade press and practitioner blogs. Figures marked *company-reported* or *secondary* haven't been checked against the original.

## 1. Questions

1. How do banking apps and assistants handle "help me get to X" today?
2. How do products outside banking turn a conversation into something you can act on?
3. What makes people trust, or distrust, money advice from an AI?
4. What has to be shown before an AI-proposed action runs?

## 2. Banking: where the assistants are today

| Product | What it does | Entry point | Note for us |
|---|---|---|---|
| **Revolut AIR** (UK Apr 2026, then EU) | Spending insights, investment tracking, subscriptions, card freeze, trip budgets, eSIM purchase | Swipe down from the middle of home; or Profile → Chats | Mostly Q&A plus small actions. Says it only sees what the customer can already see, and keeps no data. |
| **bunq Finn** | Support, cards, payments, savings, insights; reads receipts to pre-fill payments; real-time voice translation in 38 languages | Chat; home shows "How can I help you?" | Strong at service, little on planning. 47 s resolution and 90% satisfaction are *company-reported*. |
| **Cleo** (US/UK) | Chat-first budgeting with personality ("roast/hype" mode); "Autopilot" moves money **with user approval**; Plan screen with a "left to spend" gauge | Chat is the app | The closest to an intent-first money app. Reviewers find the tone too casual for some. Chat and the visual tools live on separate screens. |
| **ING NL, "Zoeken met AI"** | Type a question in the app's search bar and get an AI answer card **with a direct action button** ("Apple Pay activeren") and a source note | The existing search field | A traditional bank making search the intent box. Answer plus action in one card is very close to what we want. |
| **Caixadirecta (PT)** | "Assistente AI" tab in the bottom bar | Tab bar | Assistant bolted on as a destination, not as the way in. |
| **Bank of America Erica, Capital One Eno** | Balance, bills, lookups, goal-based savings nudges | In-app chat | The mature first generation: reactive Q&A and nudges. |
| **Visa AI Financial Assistant** (Jul 2026; US pilot Aug 2026) | A white-label assistant banks embed: plain-language money questions, small actions (lock card, alerts), savings recommendations | Inside each bank's app | This will make basic chat Q&A a commodity, so the difference has to come from the experience around it. |

**What we take from this:** bank assistants today **answer questions and run small one-step actions**. None of them, as far as we found, turns an open goal into a **plan you can see, adjust and approve**. That's the gap this design fills.

## 3. Outside banking: conversation that ends in something you act on

| Area | Example | Pattern | Use for us |
|---|---|---|---|
| Travel | **Expedia** in-app planner | Hotels discussed in chat are **saved automatically to a "trip" object**, which then takes dates, flights and activities | A persistent object grows out of the conversation. This is our plan card. |
| Travel | **Booking.com** AI Trip Planner | You can **move back and forth between chat and the normal app UI**; results are visual cards with prices and deep links | Chat ↔ UI with context kept |
| AI assistants | **ChatGPT, Gemini** generative UI | Answers include **interactive components** (sliders, maps, quizzes, forms) drawn from the app's own design system | The AI composes UI, not only text |
| AI assistants | **Claude Artifacts, ChatGPT Canvas** *(from prior knowledge, not this search)* | A **persistent object next to the chat**; edited by prompt **or** directly; the chat keeps the history | The closest model for "the conversation is the history, the card is the state" |
| AI assistants | **Perplexity** | **Sources shown** with every answer; **clarifying chips** before a deep search ("What are your main interests?" Beaches / Temples / … with Skip / Continue) | Show your working; confirm assumptions with chips, not questions in prose |
| AI assistants | **Claude** mobile, "Review, approve, ship" | Agent tasks appear as **approval cards**: what it wants to change, then Approve | An approval card bound to one specific action |
| Fitness | **WHOOP coach**; adaptive coaches built on Strava, WHOOP and Oura | The plan **rewrites itself when life gets in the way, and says why**; suggested follow-up questions | Adjust the plan and explain it; suggested prompts deepen the conversation |
| Dev tools | Cursor / Copilot inline diffs *(prior knowledge)* | AI proposes a change as a diff; **accept / reject** per change | Show before → after when the plan changes |
| Payments | **Stripe agent spend requests** | The agent gets the payment credential only after a person approves a request that shows the **item, reason and amount** | The money step is the gate |

### Generative UI: how much should the AI design on its own?

The CopilotKit framework describes three levels:

1. **Controlled:** developers build the components, and the agent picks which to show and with what data.
2. **Declarative:** the agent emits a structured schema (cards, lists, forms).
3. **Open:** arbitrary HTML.

**For a bank, controlled is the right level.** Every surface the AI can produce is a designed, tested component from our system. That also matches the brief's requirement that screens be built from the system.

## 4. The user's own precedent: the Dione 2025 site assistant

The Dione website (Creative Director, 2025; [Behance](https://www.behance.net/gallery/240507153/Dione-2025)) is "centered around this little chatbot". Read from the source code at `C:\Users\31658\Work\Dione\Dione.solutions Update\src`:

- **Route first, generate second.** The system prompt's first rule: if a page exists for the question, return `{"action": {"href": …}}` and navigate there; **never generate content that duplicates an existing page.** Only when there's no page does it compose an answer.
- **Generated answers come from a fixed set of components.** Answers are JSON "cells" (`content` up to 640 characters, or `image` chosen from a tagged asset library), laid out by the site's own grid component. This is controlled generative UI.
- **Short answers float over the current page** (a card at the chat's position, closable), so the user keeps their place.
- **The composer is always there.** When the chat card scrolls out of view, the input docks to the bottom of the screen.
- **The UI is locked while it thinks** (`inert` on body while pending); temperature 0.2; JSON schema output; answers in the user's language.
- **Visual:** dark surface, large "How may I help you?_" with a blinking cursor, **keyword highlights in an accent colour** inside suggested prompts ("Who is **Dione**?", "I need a **quote** for a project"). Reference image: `visual-audit/references/dione-2025-chatbot.jpg`.

### From the case-study deck

[Figma Slides, "Case Study: Dione 2025"](https://www.figma.com/deck/9bWcPFrLxcKxiMCkvRBsec/Case-Study--Dione-2025?node-id=1-583), 14 slides, read through the Figma MCP. Contact sheet of six slides: `visual-audit/references/dione-2025-deck-sheet.jpg`.

- **Brief:** leadership wanted the site **built around Dione's AI agent**. Earlier prototypes had used the agent to show company information and to navigate and search, so the agent became the product showcase. They wanted something that "makes people stop and have a second look".
- **Role:** Design Lead, covering creative direction, planning, and hands-on work from concept to front-end and copy.
- **Process under constraints:** research cut to interviews, a competitor audit and a large unrestricted moodboard, which then "informed our AI tools". Minimal and iterative: build the fewest elements needed, then iterate. Content arrived late, so the **bento grid** was chosen because it can absorb changes. Production ran in parallel. Testing was in-house moderated sessions plus a QA team.
- **"AI as a Tool, not a Crutch"** slide: tools listed by phase. Midjourney for concept images and animation (ideation), Figma Make for quick interaction prototypes, AI-generated assets edited and retouched by hand (production), Copilot for development, and "a significant part of the assistant code is prompt-based". Also ChatGPT and Adobe's AI tools.
- **Visual system:** dark graphite, primary pink with neutrals and a set of cool teals; Montserrat Medium with very few weights; a bento grid with **asymmetric corner radii** as the signature shape; people (confident, inquisitive) plus hardware-like devices standing for software and interfaces.

**For this challenge:**
- **The story moves forward.** Dione: an AI agent as the navigation and showcase of a company site. Here: an AI agent that **proposes a money action the user approves**. Same instinct, higher stakes, so more attention to trust and control.
- **The "AI as a Tool, not a Crutch" slide format** (tools by phase) is a good model for our AI slide. The brief adds two columns it doesn't have: **what we changed** and **how we judged it**. Our `ai-log.md` covers both.
- **The deck's structure** (Overview → Problem → Research → Analysis → Ideation → Brand → Process → AI → Testing → Outcomes) is a proven running order for the 45-min talk. See `06-presentation/outline.md`.
- **Don't reuse the Dione look.** Pink, teal and the asymmetric bento radii belong to Dione. Direction A shares the dark, calm, AI-first character, so the new work has to find its own signature.

**What transfers to the bank:**

| Dione | Bank prototype |
|---|---|
| A page exists → navigate | A banking feature exists (savings pot, standing order) → **the AI sets that feature up**; it doesn't invent a new one |
| No page → compose from cells | No single feature fits → **compose a plan from DS components** (plan card, cash-flow bar, fit meter) |
| Short answer floats over the page | Adjustments update the card in place; the chat logs the change |
| Composer docks to the bottom | The composer is always reachable on every screen of the journey |
| Keyword highlights in prompts | Suggestion chips highlight the intent word ("**Save** for a trip") |

**What's new compared to Dione:** Dione only **informs and navigates**. The bank has to **act with money**, which adds editable assumptions and an explicit approval step. That difference is a good story for the presentation: from an AI that points the way to an AI that proposes an action, with the user approving it.

## 5. Trust: what people say

- **Situational trust.** TD Bank 2025 (2,500 US adults): about half trust AI for reliable information; 70% are comfortable with AI for fraud detection. Trust is higher for background tasks than for advice.
- **Few want AI to decide alone.** Salesforce (fieldwork late 2024, 9,500 customers, 22 countries): 49% at least somewhat trust AI agents in financial services, **8% fully**. The top trust-builders are **transparency about its use, validation of outputs and explainability.**
- **They want explanations.** Aveni/YouGov 2025 (UK): 42% are worried about advice from AI alone; **72% want clearer explanations** of products and risks.
- **AI recommends, a human decides.** 2026, *secondary source*: 62% trust AI for honest information, but **18% are comfortable letting it make important financial decisions on its own.** Most prefer AI to contribute to recommendations while people stay responsible for the decision.
- **The main barriers** (Royal London): 35% prefer human advice, 33% unsure how reliable AI is, 30% privacy and security.

## 6. Approval and control: current practice

- **Show what is actually being approved:** recipient, amount, timing. An approval screen that hides it gives false control.
- **Match the gate to the risk.** Don't confirm every step; **approval fatigue** makes people click through. Confirm only the consequential step.
- **Bind the approval to the exact action** (the "Loopjacking" paper, 2026): what was approved is what runs.
- **The leading agent platforms have converged** on pause → present structured information → resume only on an explicit, recorded decision, with **approve / edit / reject** as the choices.

## 7. Implications for the design

These feed [`../02-define/principles.md`](../02-define/principles.md) and the journey.

1. **Gap to own:** from a goal to a plan you can adjust and approve. Bank assistants today stop at answers and one-step actions.
2. **The intent box is the search box.** Like ING and Dione, the familiar input on home is where intent goes. No separate "AI tab".
3. **Route to real features first** (Dione rule). The AI sets up a real savings pot and standing order, named once it's useful ("This creates a Holiday pot").
4. **Controlled generative UI:** the AI only shows designed components. That keeps visuals consistent, makes the system central, and makes trust easier.
5. **One persistent plan object** (Expedia trip, Artifacts/Canvas): chat and controls edit the same card; the chat keeps the history of changes.
6. **Assumptions as chips** (Perplexity): income, spending window, start date, target date, each tappable to change.
7. **Show your working:** "Based on Jul–Sep spending", plus a link to what it looked at. This is the top trust-builder in the survey data.
8. **Explain changes, before → after** (fitness coaches, diffs): "Skipping December → €430/month, ends on time".
9. **One approval, the money step only.** Show what, how much, from where, when, how to stop; bind it to that exact plan. No confirmations for adjusting or exploring.
10. **Tone:** warm and plain, not Cleo's roast mode. A money decision needs a calm voice.

## 8. Not covered (left out for time)

- Strava Athlete Intelligence, Oura Advisor, Airbnb and Expedia Romie: the searches found nothing first-hand.
- Regulation detail (PSD2/PSD3 consent wording, the EU AI Act's transparency duty for chatbots). Worth one line on the slides, not a study.
- No user interviews. The persona is an assumption, and the slides say so.

## Sources

- Revolut, [AIR launch](https://www.revolut.com/news/revolut_enters_new_era_of_money_intelligence_with_launch_of_ai_assistant/) · [The Paypers, AIR in Europe](https://thepaypers.com/fintech/news/revolut-launches-ai-assistant-air-in-ireland-and-europe) · [Sifted](https://sifted.eu/articles/revolut-ai-assistant)
- bunq: [CX Today, how Finn evolved](https://www.cxtoday.com/?p=991822) · [FStech](https://fstech.co.uk/fst/bunq_upgrade_genai_assistant_to_boost_user_experience.php) · [Financial IT, speech translation](https://financialit.net/news/it-innovations/bunq-becomes-first-bank-world-launch-real-time-speech-speech-ai-translation)
- Visa, [AI Financial Assistant](https://investor.visa.com/news/news-details/2026/Visa-Introduces-AI-Financial-Assistant-Helping-Banks-Guide-Customers-from-Insight-to-Action/default.aspx) · [Neontri, banking chatbots 2026](https://neontri.com/blog/best-banking-chatbots/)
- Cleo: [Money Crashers review](https://www.moneycrashers.com/cleo-review/) · [Money to the Masses review](https://moneytothemasses.com/banking/cleo-review-the-ai-chatbot-that-manages-your-money-for-you)
- Travel: [The Decoder, Booking.com planner](https://the-decoder.com/booking-com-launches-chatgpt-powered-ai-travel-planner/) · [Business Traveller](https://www.businesstraveller.com/news/bookingcom-launches-chatgpt-trip-planner/) · [Cut the SaaS, AI trip planners](https://www.cut-the-saas.com/ai/can-you-use-an-ai-trip-planner-for-your-next-vacation)
- Generative UI: [CopilotKit](https://www.copilotkit.ai/generative-ui) · [DEV, landscape 2026](https://dev.to/blove/the-landscape-of-generative-ui-in-2026-ad6) · [OpenUI, ChatGPT intelligent UI](https://www.openui.com/blog/how-chatgpt-intelligent-ui-works) *(single source)*
- Approval: [Courier, HITL for payment agents](https://www.courier.com/blog/human-in-the-loop-ai-agent-notifications) · [AI UX Playground, HITL guide](https://aiuxplayground.com/guides/how-to-design-human-in-the-loop/) · [Agentic Patterns, approval framework](https://www.agentic-patterns.com/patterns/human-in-loop-approval-framework/) · [Singapore Consensus 2026](https://arxiv.org/pdf/2608.14611) · [Loopjacking](https://arxiv.org/pdf/2609.21081) · [When should users check?](https://arxiv.org/pdf/2510.05307)
- Trust: [TD Bank survey](https://stories.td.com/us/en/article/td-bank-survey-finds-americans-are-ready-to-embrace-ai-but-have-yet-to-unlock-its-full-potential) · [Royal London, Meaning of Value](https://adviser.royallondon.com/globalassets/docs/adviser/misc/pdf4pd0073-meaningful-value-in-an-artificial-world.pdf) · [FinTech Scotland, consumer expectations](https://fintechscotland.com/?p=7655) · [Attest, AI in financial services](https://www.askattest.com/blog/research/ai-in-financial-services-consumer-attitudes.md)
- Fitness coaching: [Datadog, WHOOP AI coach](https://dash.datadoghq.com/sessions/how-whoop-evaluates-iterates-production-grade-ai-to-coach-world-class-athletes) · [UX Collective, WHOOP](https://uxdesign.cc/whoop-or-how-to-gamify-training-3-6-billion-product-playbook-2a1380971b88) · [athletedata.health](https://athletedata.health/) *(vendor)*
- Dione: source code at `C:\Users\31658\Work\Dione\Dione.solutions Update\src` (`lib/services/rag.ts`, `lib/services/prompts/`, `routes/question/`, `routes/ChatFormCard.svelte`) · [portfolio](https://cataplasma.net/) · [Behance](https://www.behance.net/gallery/240507153/Dione-2025) (returned 403 to the fetch; not read)
- App Store listings: see [`visual-audit.md`](visual-audit.md)
