# Preheader text

## What it is

Preview text is the short line of copy that appears below the subject line in inbox listings — it's what email clients like Gmail and Apple Mail pull in to give recipients a second reason to open. "Preheader" is just the industry name for it: a hidden span at the top of your email body that controls what that preview shows. Because it's the first thing many recipients read after the subject, getting it right has a direct effect on open rates.

---

## Tier 1: Paste and go

Copy the HTML below, paste it into the very top of your ActionKit mailing body (before any visible content), and replace the placeholder text.

### The HTML

```html
<!--
  Preheader Text — Tier 1: Paste and go
  One thing you edit:
    Replace the placeholder text between the span tags with your preview text.
    Aim for 60-90 characters.
-->
<span style="display:none;font-size:0px;color:#fff;line-height:0px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">Your one-line summary appears here.</span>
```

Copy-paste source: [`1-basic.html`](./1-basic.html)

### What to edit

Replace the placeholder text between the span tags with your preview text — aim for 60-90 characters.

---

## Tier 2: Let your team edit it from the AK Compose screen

### Why you'd want this

With Tier 1, anyone who wants to update the preview text has to open the HTML and find the right spot. That's a small ask for a developer, but a barrier for organizers or comms staff who shouldn't need to touch code. Tier 2 wires the preview text to an ActionKit Custom Mailing Field (CMF). Once the field is set up, your team sees a plain text box on the Compose screen and can change the preview text per-mailing without ever opening the HTML.

### One-time setup: create this Custom Mailing Field

Your AK admin creates this once in **Mailings tab → Custom Mailing Fields → Add custom mailing field**. After that, any mailing using this block will show this field on the Compose screen.

| Field name | Type | Suggested default |
|---|---|---|
| `preheader_text` | Text | *(leave blank)* |

**Field name tip:** AK field names are case-sensitive and must match exactly what's in the HTML. Use the name above as-is.

### The HTML

```html
<!--
  Preheader Text — Tier 2: Wired to Custom Mailing Fields
  Your team edits this field from the AK Compose screen:
    preheader_text — the preview text shown in inbox listings
  See README.md for one-time admin setup instructions.
-->
<span style="display:none;font-size:0px;color:#fff;line-height:0px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">{{ custom_fields.preheader_text }}</span>
```

Copy-paste source: [`2-with-cmfs.html`](./2-with-cmfs.html)

---

## Alternative: AK's built-in preview_text variable

ActionKit has a native `{{ preview_text }}` variable that pulls directly from the **Subject** screen of your mailing — no CMF setup required. If your email wrapper already includes a preheader slot that supports this variable, you may not need this block at all.

The tradeoff:

- **Our CMF approach** (`{{ custom_fields.preheader_text }}`) works in any wrapper, including custom wrappers that don't have a built-in preheader slot. One CMF field in the Compose screen, one span in the HTML — nothing else required.
- **AK's native `{{ preview_text }}`** is simpler when your wrapper already supports it, because you get the preview text field for free without adding a CMF. But it only works if your wrapper template includes the necessary preheader span — many default wrappers do not.

If you're setting up an email wrapper from scratch and want to add native `{{ preview_text }}` support, see the email-wrapper block's README for how to add that slot to a wrapper template.

---

## Known compatibility

The style properties on the span (`display:none`, `max-height:0px`, `overflow:hidden`, etc.) work together to suppress the span from rendering visibly in all major clients. Removing or consolidating any of them can cause the text to appear in the body of the email in some clients — use the full property set as written.

Some clients, notably Outlook on Windows, may not display preview text reliably regardless of how the preheader is written. iOS Mail, Gmail, and Apple Mail on Mac reliably show it.

---

## Tested on

Pending QA — will be filled in after testing.
