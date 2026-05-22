# ak-mailing-blocks

> Ready-to-paste HTML building blocks for ActionKit email campaigns. Drop them into any mailing — no developer needed.

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Platform: ActionKit](https://img.shields.io/badge/platform-ActionKit-orange.svg)](https://actionkit.com)

## What this is

ActionKit's Compose screen lets you paste raw HTML into your mailing body. This repo is a library of tested HTML blocks that do things the default editor doesn't — a proper donation button array, a bulletproof CTA button that renders in Outlook, and a complete dark-mode-safe email wrapper.

## Try it

The fastest way to use these blocks: open the **[interactive playground](https://campaignhelp.github.io/ak-mailing-blocks/playground/)**, tweak the colors and copy in your AK subdomain, then click "Copy HTML" and paste straight into your mailing. No git clone, no edit-point hunting in HTML comments.

Covers all five shipped blocks: CTA button, CTA line, callout box, donation array, and email wrapper. Each tab has live controls for content, brand color, layout, and (where it makes sense) shape — width, height, corner radius, alignment, etc.

Each block ships in tiers so your whole team can use it. The simplest tier is plain HTML — paste it in and change the text. More advanced tiers wire the block to ActionKit's Custom Mailing Fields so a less-technical teammate can update amounts, colors, and labels from the AK admin without ever touching HTML.

## The tier model

| Tier | Name | Who does the editing |
|---|---|---|
| Tier 1 | Paste and go | You edit the HTML directly. No setup required. Works on every AK instance. |
| Tier 2 | Let your team edit it from the AK admin | Variable parts (amounts, colors, URLs) come from ActionKit Custom Mailing Fields. Anyone with AK admin access can update them from the Compose screen. One-time setup: someone creates the named fields. |
| Tier 3 | Personalize to each recipient | Amounts or text are calculated from each recipient's donation history using AK's built-in donor data. No custom fields required. Works on any AK instance with donation history. |

Not every block has all three tiers. Tier 1 always exists. Tiers 2 and 3 are offered where they add real value.

## Blocks

| Block | What it does | Tiers |
|---|---|---|
| [`blocks/cta-button`](blocks/cta-button/README.md) | Outlook-safe HTML call-to-action button with customizable label, URL, and color. | 1, 2 |
| [`blocks/cta-line`](blocks/cta-line/README.md) | Horizontal headline + button strip. Lighter visual weight than a full hero CTA, good for mid-body asks. Stacks on mobile. | 1, 2 |
| [`blocks/callout-box`](blocks/callout-box/README.md) | Right-aligned card with image, title, body, and button. Body copy wraps around it on desktop, stacks on mobile. | 1, 2 |
| [`blocks/donation-array`](blocks/donation-array/README.md) | Three-button donation ask with amounts that can adapt to each recipient's giving history. | 1, 2, 3 |
| [`blocks/email-wrapper`](blocks/email-wrapper/README.md) | Dark-mode-safe HTML email wrapper, installed via AK's Email Wrappers admin. Includes built-in preview text support. | 1, 2 |

## Email client support

Every block is built against Outlook-safe HTML patterns (table layouts, VML buttons, inline styles) and verified visually in headless Chromium. **Real email client coverage is documented in [`tests/qa-results.md`](tests/qa-results.md)** — that file is the single source of truth.

| Block | Standing known limitations |
|---|---|
| `cta-button` | Aggressive dark-mode inversion in some Outlook iOS / Samsung Mail builds may flip colors. |
| `cta-line` | Gmail Web on phone strips the `<style>` block, so the headline and button stay side-by-side on mobile Gmail Web. Yahoo Mail historically strips `background-color` on `<table>` so the strip background may not render. |
| `callout-box` | Outlook Windows desktop doesn't support CSS float — the card sits top-right of the parent cell instead of body copy wrapping around it. Gmail Web on phone strips the media query, so the card stays right-aligned at 220px on narrow viewports. |
| `donation-array` | 4-button layout with the optional "Other" button is tight at 600px — 5 × 120px buttons leave little gutter. Stick to 3 or 4 buttons. |
| `email-wrapper` | Aggressive dark-mode inversion in some Outlook iOS / Samsung Mail builds may shift the accent bar and footer background. |

All blocks have a "Known compatibility" section in their own README with the specifics, and a pointer to the latest QA run.

Want to help QA? See [`tests/QA-PROCEDURE.md`](tests/QA-PROCEDURE.md). About 90 minutes for a full sweep across free-tier clients. Compatibility reports are welcome via [issues](https://github.com/CampaignHelp/ak-mailing-blocks/issues/new/choose) — both pass and fail results help.

## Related repos

- [ak-redirect-blocks](https://github.com/CampaignHelp/ak-redirect-blocks) — Django template snippets for ActionKit after-action redirect URLs.

## Contributing

New blocks welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). Use these blocks in any instance, commercial or nonprofit. Attribution appreciated but not required.

---

Maintained by [CampaignHelp](https://campaign.help).
