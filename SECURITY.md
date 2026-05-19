# Security

## Reporting

If you find a flaw in any block's HTML, the playground, or the build tooling that could put recipients or senders at risk, please report it privately.

**Preferred:** open a [private security advisory](https://github.com/CampaignHelp/ak-mailing-blocks/security/advisories/new). This is the fastest path and keeps the report off the public issue tracker until it's resolved.

**Alternative:** email the contact listed on [campaign.help](https://campaign.help) with the subject `[ak-mailing-blocks security]`.

Please do not open a public GitHub issue for anything that looks exploitable.

## What's in scope

- HTML in `blocks/*` that could expose recipients (e.g., injected scripts that survive AK's sanitizer in some path).
- The playground at `playground/index.html` — XSS via copy-pasted input that escapes into the rendered preview.
- The screenshot pipeline (`tests/screenshots.js`) — code that runs against an attacker-controlled HTML file.

## What's out of scope

- ActionKit itself — that's a separate product. Report AK issues to your ActionKit account team.
- Brand-color or label choices that look like phishing on purpose (a user choosing to mimic another brand is a user decision, not a vulnerability in the templates).
- Bugs that only affect a single email client and don't have a security impact — file those as a [compatibility report](https://github.com/CampaignHelp/ak-mailing-blocks/issues/new/choose) instead.

## What to expect

Acknowledgment within a few days. Time to a fix depends on severity and on whether AK's own behavior is involved.
