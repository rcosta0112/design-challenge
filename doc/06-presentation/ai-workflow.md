# AI Workflow

**Status:** Draft for review (2026-10-16). Source for the captions on the Figma `Archive · directions explored` page, the Read me's "AI tools" section and the AI slide. Readers: the reviewers. The brief asks for four things: which tools, what they generated, what was changed, and how quality was judged. Every claim here traces to an entry in `ai-log.md`.

## Tools

| Tool | Used for |
|---|---|
| **Claude Code** (Opus 5.5), in VS Code | Research and synthesis, the visual and colour audits (scripts), docs (principles, journey, script, specs), the SvelteKit prototype, tests, diagnosis of bugs |
| **Figma MCP** (driven by Claude Code) | Reading and writing the Figma file through the Plugin API: Reference boards, wireframes, variables, components, hi-fi screens, audits, this file's tidy-up |
| Headless Blender + ffmpeg (scripted by Claude Code) | Turning the user's own rendered sky sequence (EXR frames, AgX High Contrast) into the still backgrounds and the looping sky video |

Not used: image generation for UI, AI-written UI layouts at runtime. The concept itself keeps AI to composing from designed components (decision-log "Controlled generative UI").

## How a step ran

1. **The user sets the goal and the constraint** (for example "dark direction over my sky images", "no shadows, borders only if needed").
2. **Claude generates** into the right place: a doc in `doc/`, boards in Figma through the MCP, or code in `code/`.
3. **Claude checks its own output first**: a screenshot after every Figma composition, measured contrast instead of eyeballing, the plan maths re-checked, Playwright and axe on the prototype.
4. **The user reviews and decides**: picks between options, cuts scope, corrects mistakes.
5. **Everything is logged**: `ai-log.md` (generated → changed → judged), `decision-log.md` for calls, and rejected directions stay on the Archive page.

## Examples: generated → changed → judged

### 1. Visual direction: three palettes, one kept

- **Generated:** a 17-app visual audit with scripted screenshots and palettes, three direction options, then Light/butter and Mint (Wise-like) palettes as Figma variable modes, and two dark variations over the sky.
- **Changed:** the user moved the direction to dark over their own sky renders; Light/butter and Mint were dropped and kept as snapshots on Archive; the token set was later rebuilt on shadcn's CSS-variable contract with one `Dark` mode.
- **Judged:** WCAG contrast measured by script for every text/surface pair; the user's rule (no shadows, contrast through greys, not borders) applied to every component.

### 2. A wrong render, rejected

- **Generated:** the sky sequence converted to a looping video by ffmpeg.
- **Changed:** the first test came out washed-out grey next to the reference still. Rejected. The user said the frames were graded with AgX High Contrast; the conversion was redone with that view transform.
- **Judged:** side-by-side against `0011.webp`.

### 3. Contrast over a moving background

- **Generated:** a diagnosis of the video: per-second brightness, contrast for each text measured over 6 pinned video times.
- **Changed:** the bright sunrise failed contrast under white text. Of the options (scrim, dimming, cutting the loop), the user picked the cut; Claude chose the 24 s cut point from the measurements.
- **Judged:** all text passes at every measured frame; result logged in the decision log ("Sky video cut to its dark stretch").

### 4. A bug the screenshot didn't show

- **Generated:** the Review plan button, built with shadcn-svelte.
- **Changed:** its label measured 1.20:1 (white on mint): tailwind-merge was silently dropping the colour class next to a custom type class. Fixed by registering the type styles with tailwind-merge; now 14.08:1.
- **Judged:** computed styles and a contrast measurement, not a visual check.

### 5. The AI's own call, reversed

- **Generated:** the screen specs disabled "Review plan" while the plan is tight.
- **Changed:** reversed in the same pass: it contradicts principle 4, "the user steers". The button stays enabled and the review repeats the warning.
- **Judged:** against the principles, which name what each one rules out.

### 6. A false finding, caught by the user

- **Generated:** a deliverables review that said three Figma pages were missing.
- **Changed:** the user said they weren't. The MCP's page listing only returned loaded pages; re-checked with the Plugin API, all pages were there, and the review was corrected.
- **Judged:** after this, every claim about the file is checked with a Plugin API read before it's reported.

### 7. Quality checks the AI ran on itself

Figma reference images re-fetched at 600 px after noticing 222 px thumbnails would blur; variant sets that clipped at a fixed width set to hug; a binding audit that found every component and screen layer bound to a variable or style, apart from two documented exceptions.

## Numbers (from `ai-log.md`, 2026-10-16)

- ~38 logged AI uses over two days.
- Rejected or reversed outputs called out above: the Light/butter and Mint directions, the washed-out render, the disabled-button call, the false page finding.
- Most 2026-10-15 entries still say "pending" in the verdict column: they were reviewed in the flow of work but not marked. **To do before the slide:** mark them.

## What AI didn't decide

The direction, the story numbers (€375 recommended, €430 approved), the scope cuts, the sky renders, and every pick between options were the user's. The AI's recommendations that weren't taken (direction A in the visual audit, suggestion chips on Home) are logged as such.
