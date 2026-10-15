# AI Assistant Flows

**Status:** First pass done (2026-10-15).

**The question:** a lot of the bank's functionality will work the way AI assistants work, with Claude on mobile as the main reference. What are the most common flows in these apps, how does each one look on a phone, and which ones does our journey need?

## Method and limits

- **Sources:** Claude's official release notes; ChatGPT's Apps SDK UI guidelines; Google's Gemini Agent help page; press coverage of ChatGPT Instant Checkout and of Claude's inline visuals; the App Store screenshots already in `visual-audit/sheets/` (Claude, ChatGPT, Gemini, Perplexity).
- **Prior knowledge:** some details of the Claude mobile UI (the composer's + menu, retry and copy under a reply, the chat drawer) come from model knowledge of the app, not from this search. They're marked *(PK)*. Check them on a phone before they reach a slide.
- **Not tested hands-on.** No screen recordings were made. Store screenshots are marketing compositions, as noted in `visual-audit.md`.
- Builds on `research.md` sections 3 and 6 (artifacts, approval practice) without repeating them.

## Anatomy of Claude on mobile

From the store screenshots (`sheets/claude.jpg`) plus *(PK)*:

| Part | What it is |
|---|---|
| **Top bar** | Menu (opens the drawer of chats, projects and tasks), a new-chat button, and an overflow menu. Almost no other chrome. |
| **Empty state** | One serif greeting ("What are you thinking?"), with suggestions or recent items only once you start typing *(PK)*. |
| **Composer** | Pinned to the bottom: **+** (camera, photos, files, connectors and modes *(PK)*), the model chip ("Opus"), a mic, and a round send button in the accent colour. Attachments sit as chips above the text. |
| **Message stream** | Your message as a soft bubble on the right; Claude's reply as **plain text without a bubble**, full width, with components inline (a map, place cards, a file card). |
| **Inline components** | Results as UI: a map with places, horizontal cards, a file card ("All About Minnie · Presentation · PPTX"), choices between drafts ("A · Warm and gracious / B · Confident and concise"), and live charts (on mobile since 2026-03-25). |
| **Full-screen sheet** | Opening an artifact covers the chat with a sheet (close × and overflow menu). The chat stays underneath. |
| **Task list** | Background tasks with filter tabs (All · Blocked · In progress · Done), status per task, and an **approval card** inline: "I found 3 components using the hard-coded 8px value. Change them?" → **Approve**. |
| **Voice mode** | Full screen, a waveform orb, talk instead of type. |

## The ten common flows

Ordered as a conversation happens. "Others" covers ChatGPT, Gemini and Perplexity.

| # | Flow | Claude on mobile | Others | Take for the bank |
|---|---|---|---|---|
| 1 | **Start** | A greeting and an empty composer; suggestions are sparse *(PK)* | ChatGPT and Gemini show mode chips; guides warn that a blank input causes drop-off | Greeting + **2–3 suggestion chips from the user's real situation** ("Payday is in 4 days") |
| 2 | **Ask** | Type, dictate, or switch to voice mode; attach a photo or file | Gemini: a **mode chip in the composer** ("Images ×"); camera as input | Type or tap a chip; the mic is shown as an option (journey open question). No mode switching. |
| 3 | **Clarify** | Asks back in text, or offers **choices as tappable options** (A/B drafts, multiple choice in Claude's agent tools) | Perplexity: **clarifying chips with Skip / Continue** | **Assumption chips** the user can tap to correct, with a skip: never a blocking quiz |
| 4 | **Work** | Thinking and tool steps shown as short status lines ("Searched the web"), collapsible; a stop button *(PK)* | Guides: show a step indicator for multi-tool work, a clear end of stream | **"What I looked at"** as visible steps (income, bills, last 6 months), fast, collapsible: this is step 2, Understanding |
| 5 | **Answer** | Plain text **plus a component inline** (map, chart, file card), then a short follow-up | ChatGPT guidelines: the card comes first, the text after must not repeat it | Short text + **one inline plan card**; text explains, the card carries the numbers |
| 6 | **Open and refine** | Tap the inline card to open it **full screen**; change it by prompt, or **highlight the part to change** (2026-06-12) | ChatGPT: inline → fullscreen → picture-in-picture | The **plan card opens as a sheet**; change by slider **or** by typing; both edit the same card (journey step 4) |
| 7 | **Act / approve** | **Approval card bound to one action** ("Change them?" → Approve); connector prompts offer **Deny / Allow once / Always allow** | ChatGPT checkout: confirm **merchant, product, amount, payment method**; Gemini: **Confirm / Decline** each task, **Take control** for payment details | One **review sheet** for the money step only: what, how much, from where, when, how to stop → biometric confirm |
| 8 | **Done / receipt** | Task moves to Done; a notification when a background task finishes ("Keep tasks running while you're away") | ChatGPT: confirmation **in the chat** plus an email receipt | Confirmation **in the thread** + the pot on Home; one next step |
| 9 | **Recover** | Edit your message, retry the reply, stop mid-stream *(PK)* | Gemini: Stop, Take control; guides: editing forks the thread | "Undo" and "Change plan" stay available after approval; typed corrections at any step |
| 10 | **Come back** | Drawer with chats, projects and tasks; **memory** carries context across chats (categorised, editable, sensitive topics excluded by default, 2026-08-25) | ChatGPT: memory, chat search | The thread **is** the history of the plan; the bank remembers the goal, the user can see and edit what it remembers |

## What Claude's approach adds

- **Text without a bubble, components inline.** The AI's voice is plain text on the canvas, and anything you act on is a card. This fits our split: **facts and estimates in cards, AI voice as text** (and the AI signal colour, see `color-audit.md`).
- **Small, temporary visuals inline; persistent things as artifacts.** Claude's inline charts are "temporary aids to understanding"; artifacts are lasting objects you open and keep. For us: the cash-flow visual in step 2 is temporary; the **plan card is the artifact**.
- **Approval is a card in the flow, not a modal surprise.** The "Change them? → Approve" pattern names the exact change. Our review sheet should read the same way: one sentence of what happens, then the details.
- **Scoped consent.** Allow once / Always allow maps to a later bank feature ("let the assistant move up to €50 between my pots without asking"). Out of scope for the prototype, but a good slide point.
- **Background tasks with a status.** A recurring transfer is a background task too. The Done screen can borrow the task-status language (Active · Next run 25 Oct).

## Mapping onto our journey

| Step | Tag | Flows used |
|---|---|---|
| 1 | `ab-01.intent` | 1 Start, 2 Ask |
| 2 | `ab-02.understand` | 3 Clarify, 4 Work |
| 3 | `ab-03.plan` | 5 Answer (inline plan card) |
| 4 | `ab-04.adjust` | 6 Open and refine |
| 5 | `ab-05.review` | 7 Act / approve |
| 6 | `ab-06.done` | 8 Done, 10 Come back |
| (all) | — | 9 Recover |

This supports the journey's open question: **steps 1–3 are one chat thread**, step 4 is the plan card opened as a sheet over it, and step 5 is a separate review sheet.

## Implications

1. **One thread, three surfaces:** the chat (voice and history), inline cards (results), full-screen sheets (editing and approving). Every screen is one of these.
2. **The composer is always there**, except on the review sheet, where the only actions are confirm or go back.
3. **Clarifying is optional and tappable.** Assumption chips with a skip; never a form.
4. **Show the work briefly.** Two or three "looked at" steps make the recommendation feel earned; collapse them after.
5. **The plan card is an artifact.** Inline in the chat, opens as a sheet, edited by controls or by prompt; both stay in sync.
6. **Approval names the exact action**, like Claude's approval cards and ChatGPT's checkout: amount, from, to, when, how to stop.
7. **Receipts live in the thread** and on Home; the thread is the audit trail.
8. **Components needed** (adds to `04-system/components.md`): SuggestionChip, StatusStep ("Looked at…"), InlineCard (plan card compact), Sheet with close and overflow menu, ApprovalSummary, TaskStatus.

## Sources

- Claude: [release notes](https://support.claude.com/en/articles/12138966-release-notes) · [inline visuals announcement](https://claude.com/resources/articles/claude-builds-visuals) · [The Register on inline charts](https://www.theregister.com/2026/03/13/claude_charts_a_new_course/) · [Claude with iOS apps](https://support.claude.com/en/articles/11869619-use-claude-with-ios-apps) · [Cowork on mobile (MacRumors)](https://www.macrumors.com/2026/07/07/claude-cowork-mobile-web/) · [connector permission prompt (Quicklizard guide)](https://help.quicklizard.com/mcp/user-installation.html) · [AskUserQuestion (claudelog)](https://claudelog.com/faqs/what-is-ask-user-question-tool-in-claude-code/)
- ChatGPT: [Apps SDK UI guidelines](https://developers.openai.com/apps-sdk/concepts/ui-guidelines) · [display modes (sunpeak)](https://sunpeak.ai/blogs/chatgpt-app-display-mode-reference) · [Instant Checkout (CX Network)](https://www.cxnetwork.com/artificial-intelligence/news/chatgpts-instant-checkout-lets-shoppers-buy-inside-chat) · [Instant Checkout (Search Engine Land)](https://searchengineland.com/instant-checkout-chatgpt-agentic-commerce-463222)
- Gemini: [Gemini Agent help](https://support.google.com/gemini/answer/16596215)
- Patterns: [setproduct, AI chat anatomy](https://www.setproduct.com/blog/ai-chat-interface-ui-design) · [metacto, production chat UX](https://www.metacto.com/blogs/ai-chat-ux-patterns-production) · [UXMagic, chat patterns](https://uxmagic.ai/blog/ai-chat-interface-design-patterns) · [Hatchworks, agent UX](https://hatchworks.com/blog/ai-agents/agent-ux-patterns/)
- Store screenshots: `visual-audit/sheets/claude.jpg`, `gemini.jpg`, `chatgpt.jpg`, `perplexity.jpg`
