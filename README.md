# ak-mailing-blocks

> Ready-to-paste HTML building blocks for ActionKit email campaigns. Drop them into any mailing — no developer needed.

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Platform: ActionKit](https://img.shields.io/badge/platform-ActionKit-orange.svg)](https://actionkit.com)

## What this is

ActionKit's Compose screen lets you paste raw HTML into your mailing body. This repo is a library of tested HTML blocks that do things the default editor doesn't — a proper donation button array, a bulletproof CTA button that renders in Outlook, and a complete dark-mode-safe email wrapper.

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
| [`blocks/donation-array`](blocks/donation-array/README.md) | Three-button donation ask with amounts that can adapt to each recipient's giving history. | 1, 2, 3 |
| [`blocks/email-wrapper`](blocks/email-wrapper/README.md) | Dark-mode-safe HTML email wrapper, installed via AK's Email Wrappers admin. Includes built-in preview text support. | 1, 2 |

## Tested on

Results are documented in each block's README after QA. Testing uses headless Chrome, Apple Mail on macOS, and iOS Mail. Known gap: Outlook for Windows is not tested in v1 — each block uses Outlook-safe table patterns, but pixel verification against Outlook desktop is not yet in the test suite.

## Related repos

- [ak-redirect-snippets](https://github.com/CampaignHelp/ak-redirect-snippets) — Django template snippets for ActionKit after-action redirect URLs.

## Contributing

New blocks welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). Use these blocks in any instance, commercial or nonprofit. Attribution appreciated but not required.

---

Maintained by [CampaignHelp](https://campaign.help).
