# Prototype Spec

**Status:** Not started. **Phase:** 6. **Budget:** 0.5 h.

Every interaction in the Figma prototype. The brief requires one complete core journey, the AI interaction, a meaningful decision, a confirmation, key transitions and at least one state change.

## Flow

Starting point: `ab-01.intent`.

| From | Trigger | To | Transition | Notes |
|---|---|---|---|---|
| `ab-01.intent` | Tap the suggestion / send | `ab-02.understand` | | |
| `ab-02.understand` | | `ab-03.plan` | | |
| `ab-03.plan` | Tap "Adjust" | `ab-04.adjust` | | |
| `ab-04.adjust` | Drag the slider | `ab-04.adjust--tight` | Smart animate | **State change** |
| `ab-04.adjust` | Tap "Review" | `ab-05.review` | | |
| `ab-05.review` | Confirm | `ab-06.done` | | |

## State changes

| Component | From → To | Trigger |
|---|---|---|
| PlanCard | draft → adjusting → approved | Adjust / approve |
| FitMeter | comfortable → tight | Slider above ~€440 |

## Checks before submitting

- [ ] Starts from `ab-01` with no dead ends
- [ ] Back works on every screen
- [ ] Shared link opens at the right starting point and device frame
- [ ] Tested on a phone (Figma mobile app)
