# Visual Audit

**Status:** First pass done (2026-10-15). The direction choice is open; see the end of this doc.

**The question:** what does a modern, future-facing money app look like in 2026, and how do we avoid the traditional banking look? The brief signals youth and an AI-native product.

## Method and limits

- **Source:** the current App Store screenshots of 13 money apps and 4 AI assistant apps, pulled through Apple's public lookup API on 2026-10-15. Raw images are in `visual-audit/app-store/<app>/`; one contact sheet per app is in `visual-audit/sheets/`.
- **Limit:** store screenshots are **marketing compositions**, with headlines, photos and device mock-ups. They show the brand's visual ambition and some real UI, but not real app flows. Good enough for a style audit, not for interaction detail.
- **Use:** internal research and the talk only. They're third-party copyrighted images, so they don't go into the public deliverables except as small attributed references.
- Lunar and Trade Republic returned no screenshots.

## The set

| Group | Apps |
|---|---|
| Traditional banks (the style to avoid) | Caixadirecta (PT), Millennium bcp (PT), ING (NL) |
| The neobank mainstream | N26, Chime, Nubank, Monzo, Klarna |
| Neobank and fintech outliers | **bunq**, **Revolut**, **Cleo**, **Copilot**, **Wise** |
| AI-native assistants (the frontier) | ChatGPT, Gemini, Perplexity, Claude |
| Own precedent | Dione 2025 site assistant (`references/dione-2025-chatbot.jpg`) |

## Observations

### Traditional banking: what to avoid

- **Caixadirecta:** one corporate blue, isometric tilted phones, stock lifestyle photos, generic iOS lists. The new design's selling point is "clearer navigation", which is still a menu-first app. The AI is a tab.
- **Millennium bcp:** one magenta flood, highlighter-style label boxes, a product catalogue (Cartões, Crédito, Investir…) as the main message.
- **ING:** brand orange and purple with lion and blob shapes; dense lists, a lot of product overview. **But** its "Zoeken met AI" screen is the most interesting AI pattern in the whole set (answer card plus action button). A traditional look can still carry a modern interaction.
- **The common traits:** product catalogue first; one corporate colour poured over everything; small type; dense lists; stock photography; trust shown through badges and padlocks.

### The neobank mainstream: no longer distinctive

- **N26, Chime, Nubank, Monzo:** one saturated brand colour as the background (teal, green, purple, coral) with **white rounded cards** floating on it, the physical card as the hero, friendly grotesk type, plenty of white space.
- In 2016 this was the youthful style; **in 2026 it's the default.** Copying it would read as "another neobank", not "AI-native".
- Klarna's soft pink, off-white and black is calmer and more editorial than the rest, but still card and shopping first.

### The outliers: where the energy is

| App | What stands out | What to take | What to leave |
|---|---|---|---|
| **bunq** | Rainbow light leaks and saturated photography; **dark frosted-glass cards** over images; a large, light balance figure; the AI shown as a chat ("How can I help you?") over a photo | Light as a signal of intelligence; layered glass surfaces; a confident dark mode | Visual noise; the rainbow belongs to bunq |
| **Revolut** | **Pure black**, monochrome; photos *inside* the balance card; very large numbers; a short row of 4 round actions; chat-style money transfers | Restraint, hierarchy through scale, big numbers; the data is the hero | Cold for a goal you care about; Revolut is very recognisable |
| **Cleo** | **Warm gradient** (black → deep red, peach, cream); **big bold editorial headlines**; huge numbers ("May 2028", "753.72"); a gauge for "left to spend"; "Cleo talks back"; quiz chips | Warmth; the **date or amount as the headline**; a gauge for fit; personality in the copy | The roast tone and gamification; the cash-advance aesthetic |
| **Copilot** | **Dark navy with luminous, neon-ish data** (green bars, ring charts, coloured category dots); dense but tidy dashboards | Data you can read at a glance; data that glows on dark | Too dense for a first-time conversational flow |
| **Wise** | **Lime + forest green**, very heavy condensed uppercase headlines, big amount inputs | Boldness; amount fields as the hero | Loud; marketing-led; Wise's own colours |

### AI-native assistants: the new visual language

- **ChatGPT:** pastel **aurora gradient** around white UI; the composer always at the bottom; a voice "orb". Almost no chrome.
- **Gemini:** black UI with a **blue gradient glow** showing AI presence; **rich inline components** (maps, quiz cards with right/wrong states, image grids); the "Ask Gemini" pill composer.
- **Perplexity:** charcoal with **serif italic display type**, teal accent; sources as small favicon stacks; **clarifying chips with Skip / Continue**; a "Pro Search, 3 steps" progress line.
- **Claude:** **warm cream and terracotta, serif headlines**, editorial photography; agent approval cards ("Approve"); file and artifact cards in the chat.
- **Common ground:** a **calm neutral canvas** (white, black or cream), **one luminous AI signal** (gradient, glow or orb), a **composer you can always reach**, **serif or editorial type** spreading as a sign of thoughtfulness, and **components inside the conversation** instead of chat bubbles alone.
- **Dione (own precedent):** dark graphite surface, a large thin grotesk "How may I help you?_" with a blinking cursor, a **coral accent on keywords**, and the input as a large, central element. It's already in this language. The case-study deck (`references/dione-2025-deck-sheet.jpg`) adds the full system: pink plus cool teals on graphite, Montserrat, a bento grid with asymmetric corner radii, and people with hardware-like devices. **That signature belongs to Dione, so we don't reuse it.**

## Conclusions

1. **The traditional banking look is easy to avoid; the real risk is the 2016 neobank look** (brand-colour flood plus white cards). That's what most "modern" banks still look like.
2. **The future-facing signal comes from the AI apps, not the banks:** a calm neutral canvas, luminous accents kept for the AI, editorial type, components inside the conversation.
3. **The outliers combine both:** a confident dark mode (bunq, Revolut, Copilot), warmth (Cleo), and big numbers used as headlines (Revolut, Cleo, Wise).
4. **Using light or a gradient only for the AI is functional, not decoration.** It can carry principle 3, that facts and estimates look different: bank facts stay solid and neutral, AI estimates and AI voice get the glow.

## Direction options for phase 3

To explore as quick AI-assisted moodboards or one key screen each, then pick one. Logged as *Proposed* in `decision-log.md`.

| | **A. Quiet canvas, luminous AI** *(recommended)* | **B. Editorial warmth** | **C. Bold neo** |
|---|---|---|---|
| Feel | Calm, precise, future | Human, considered, warm | Loud, youthful, confident |
| Base | Near-black graphite (dark first) or soft off-white | Warm cream / deep cocoa | One saturated colour + black |
| AI signal | A single gradient or glow, used **only** for the AI's voice, estimates and the composer | A terracotta or amber accent, serif quotes | Highlighter blocks |
| Type | Clean grotesk; very large, light numbers | Serif display + grotesk UI | Heavy condensed caps |
| Data viz | Luminous lines and bars on dark (Copilot) | Soft-filled shapes | Chunky blocks |
| References | Revolut, bunq, Gemini, Dione | Cleo, Claude, Perplexity | Wise, Monzo |
| Risk | Can feel cold | Can feel like a lifestyle app, not a bank | Closest to the neobank mainstream; hard to look trustworthy |

**Recommendation:** **A, borrowing B's warmth in the copy and one serif for the hero numbers.** A dark-first base lets the AI glow do its job (marking estimates and the AI's voice), puts the data first, fits the Dione precedent, and gives a free light/dark live-iteration story through variable modes. Decide in phase 3.
