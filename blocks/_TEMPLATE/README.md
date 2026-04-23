# [Block name]

<!-- "What it is" — one sentence explaining what this block does and when you'd reach for it. -->

---

## Tier 1: Paste and go

<!-- Explain what the user needs to change after pasting. Keep it to three or four specific things: "Change the URL on line 4, the button label on line 5, and the hex color on line 6." Don't explain HTML — point to the exact things to edit. -->

```html
<!-- Paste your Tier 1 HTML here, or reference 1-basic.html -->
```

---

## Tier 2: Let your team edit it from the AK admin

<!-- Delete this section if Tier 2 is not applicable. -->

<!-- One paragraph explaining the benefit: what a non-technical teammate can do after the one-time setup. -->

### One-time setup: create the Custom Mailing Fields

<!-- Step-by-step instructions for creating the CMFs in AK admin. Use plain language — assume the reader knows the AK admin but not HTML. -->

1. Go to ...
2. ...

### Custom Mailing Field reference

| Field name | Type | Purpose | Default (if any) |
|---|---|---|---|
| `example_field_name` | Text | ... | — |

### The HTML

```html
<!-- Paste your Tier 2 HTML here, or reference 2-with-cmfs.html -->
```

---

## Tier 3: Personalize to each recipient

<!-- Delete this section if Tier 3 is not applicable. -->

<!-- Explain what the block does for different recipient states: donors with history, donors without, non-donors. Include what happens if the personalization condition is not met. -->

```html
<!-- Paste your Tier 3 HTML here, or reference 3-personalized.html -->
```

---

## Known compatibility

<!-- List clients known to work, known to have issues, or not yet tested. Be honest. Example: -->
<!-- - Outlook for Windows: uses Outlook-safe table markup but not pixel-verified -->
<!-- - Gmail web: Chrome render is a reasonable proxy; CSS stripping may cause edge cases -->

## Tested on

<!-- Fill in after QA. Example: -->
<!-- | Client | Date | Result | Notes | -->
<!-- |---|---|---|---| -->
<!-- | Chrome (headless) | 2026-04-23 | Pass | | -->
<!-- | Apple Mail macOS | 2026-04-23 | Pass | | -->
<!-- | iOS Mail | 2026-04-23 | Pass | Eyeball check | -->
