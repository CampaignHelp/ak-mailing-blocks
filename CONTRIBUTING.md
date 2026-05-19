# Contributing

New blocks welcome. Here's how to submit one.

## Where to start

- **Have a block idea?** Open a [new block proposal issue](https://github.com/CampaignHelp/ak-mailing-blocks/issues/new/choose) — uses a short template. For open-ended brainstorming, start a thread in [Discussions](https://github.com/CampaignHelp/ak-mailing-blocks/discussions) instead.
- **Spotted a rendering bug?** File a [bug report](https://github.com/CampaignHelp/ak-mailing-blocks/issues/new/choose).
- **Confirmed a block works (or breaks) in a specific email client?** File a [compatibility report](https://github.com/CampaignHelp/ak-mailing-blocks/issues/new/choose) — both green and red results help.
- **Want to submit a block PR?** Keep reading.

By participating you're agreeing to the [community guidelines](./CODE_OF_CONDUCT.md).

## What makes a good block proposal

A good block is:

- **Reusable across orgs.** It solves a problem any ActionKit user might have, not a one-off workaround for a specific campaign or instance.
- **Self-contained.** It works on a vanilla AK instance with no developer changes. Tier 2 may require creating Custom Mailing Fields (documented step-by-step); that's the ceiling for setup complexity.
- **Non-technical-friendly.** Tier 1 should be copy-paste with only a few obvious things to change (a URL, an amount, a color hex code).

## Expected tiers

Every block must include a Tier 1. Tiers 2 and 3 are optional but encouraged when they meaningfully reduce the editing burden on non-technical staff.

| Tier | Requirement |
|---|---|
| Tier 1 | Plain HTML, no AK template tags. User edits variables directly in the code. |
| Tier 2 | Same block, variable parts pulled from ActionKit Custom Mailing Fields. CMF names and setup steps must be documented in the block's README. |
| Tier 3 | Uses AK's built-in donor/user data (e.g. `donations.highest_previous_all`). Must use AK-native snippets only — no org-specific custom user fields. |

## Folder layout

Copy `blocks/_TEMPLATE/` to `blocks/your-block-name/` (use `kebab-case`) and fill in the files:

- `README.md` — explanation, tier-by-tier instructions, CMF setup walkthrough (for Tier 2), known compatibility issues, tested-on section
- `1-basic.html` — Tier 1 HTML
- `2-with-cmfs.html` — Tier 2 HTML (if applicable)
- `3-personalized.html` — Tier 3 HTML (if applicable)

## Testing obligations

Before submitting, your block must pass:

- **Tier 1:** Chrome render — open the HTML file in a browser and confirm layout is correct. No broken columns, no missing styles.
- **Tier 2/3:** Playwright render on Robotic Dogs — verify CMF substitution and personalization render correctly against a real AK test instance. The `tests/` folder shows the pattern.
- **QA on Robotic Dogs:** Create a draft mailing containing your block, send a proof to yourself, and confirm it renders as expected in at least one real mail client.

Document your test results in the block's README under "Tested on."

## README style

- Lead with one sentence explaining what the block does.
- Use `yourorg.actionkit.com` as the generic subdomain placeholder.
- Assume the reader knows AK's Compose screen but is not comfortable with HTML.
- Keep the tone warm and practical.
- Include a "Known compatibility" section that honestly describes untested clients.

## PR process

1. Fork the repo.
2. Add your block folder.
3. Open a PR with a short description of the problem it solves.
4. Expect review for correctness, documentation quality, and AK compatibility.

## Community guidelines

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Short version: be kind, focus on the code, assume good intent.
