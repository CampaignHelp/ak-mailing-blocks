# QA procedure

How to verify that every block renders correctly across the email clients we care about. Designed to run in ~90 minutes against personal accounts — no Litmus subscription required.

## What this covers

| Block | Tier | How it's tested |
|---|---|---|
| `cta-button` | 1 | In the bundled test mailing |
| `cta-line` | 1 | In the bundled test mailing |
| `callout-box` | 1 | In the bundled test mailing |
| `donation-array` | 1 | In the bundled test mailing |
| `email-wrapper` | 1 | Separate — installed as the AK wrapper, then any mailing sent through it |

Tier 2 (CMF-based) blocks should be verified separately once Tier 1 baseline passes — Tier 2 only adds template-tag substitution, which AK either does correctly or breaks visibly with literal `{{ ... }}` text.

## Client matrix (free-tier coverage)

These are the clients reachable without a paid subscription. Mark each row Pass / Pass with notes / Fail when you've checked it.

| Client | Light mode | Dark mode | Mobile sibling |
|---|---|---|---|
| Apple Mail macOS | □ | □ | — |
| Apple Mail iOS | □ | □ | — |
| Gmail web (Chrome) | □ | □ | — |
| Gmail iOS app | □ | □ | (covered separately) |
| Gmail Android app | □ | □ | (covered separately) |
| Outlook web (`outlook.live.com`, free Microsoft account) | □ | □ | — |
| Outlook iOS app | □ | □ | (covered separately) |
| Yahoo Mail web | □ | □ | — |
| Proton Mail web | □ | □ | — |

**Out of scope for free-tier:**
- Outlook for Windows desktop (multiple versions) — requires Litmus or a Windows VM
- Samsung Mail (Android default) — requires an Android device

Document these gaps in each block's "Known compatibility" section rather than testing them.

## Setup

### 1. Email accounts

You'll need test addresses on each provider. If you don't already have all of them:

- Gmail: any personal Gmail address
- Outlook: free Microsoft account at outlook.live.com
- Yahoo: free at yahoo.com
- Proton: free at proton.me
- Apple iCloud: covered by Apple Mail iOS / macOS via your existing Apple ID

### 2. Robotic Dogs

Your CampaignHelp AK test instance. Confirm you have a `general` donation page short name (or whatever you want the donation array buttons to point at) configured.

### 3. Wrapper

For the test mailing, use a real email wrapper that includes your unsubscribe link and CAN-SPAM footer. Either:
- Install the `email-wrapper` block from this repo as your QA wrapper (kills two birds), OR
- Use whatever default wrapper Robotic Dogs has

## Running the test mailing

### 1. Create the draft

In Robotic Dogs, create a new mailing:
- Subject: `ak-mailing-blocks QA — YYYY-MM-DD`
- Preview text: `Render check across email clients`
- Wrapper: the one you chose above
- Body: paste the contents of [`tests/test-mailing.html`](./test-mailing.html) directly into the body field

### 2. Send proofs

Send a proof to each test address. Don't send to a real list. Robotic Dogs proof functionality only sends to addresses you specify, so there's no risk to subscribers.

### 3. Open each proof

For each email client in the matrix above:
1. Open the proof
2. Toggle light → dark (most clients have an option in settings; on iOS use the OS-level toggle)
3. Compare each rendered block against the expectation in the body comments

### 4. Capture findings

For each (block, client) cell, record:
- Pass / Pass-with-notes / Fail
- If anything's off, a one-line description and a screenshot

Screenshots optional but useful — drop them in `tests/qa-screenshots/<client-slug>/<block>-<mode>.png` if you want them in the repo (small PNGs only, please).

### 5. Update each block's README

In each `blocks/<name>/README.md`, replace the "Tested on" section's placeholder with the matrix from your run. Use this format:

```markdown
## Tested on

| Client | Light | Dark | Notes |
|---|---|---|---|
| Apple Mail macOS 14.4 | ✓ | ✓ | |
| Apple Mail iOS 17.4 | ✓ | ✓ | |
| Gmail web (Chrome) | ✓ | ✓ | |
| Gmail iOS app | ✓ | ✓ | |
| Outlook web | ✓ | ✓ | |
| Yahoo Mail web | ✓ | ✓ | |
| Proton Mail web | ✓ | ✓ | |

Last verified: 2026-MM-DD by jordankrueger@campaign.help
```

Use `—` for "not tested" rows. Use `✗` only when something genuinely fails — and file a [bug report](https://github.com/CampaignHelp/ak-mailing-blocks/issues/new/choose) for each failure.

## Email-wrapper-specific QA

The wrapper can't be in the test mailing because it IS the wrapper. To verify it:

1. In Robotic Dogs, go to Mailings tab → Email Wrappers → Add email wrapper
2. Paste the contents of `blocks/email-wrapper/1-basic.html` into the Template box
3. Edit the four placeholders (`[LOGO_URL]`, `[ORG_NAME]`, `[MAILING_ADDRESS]`, `[BRAND_COLOR]`)
4. Save as a new wrapper named "ak-mailing-blocks QA wrapper"
5. Create a tiny test mailing that's just a `<p>` of body copy
6. Use the new wrapper, send proof, check across the matrix above
7. Verify: logo renders, accent bar visible, content area readable, footer with mailing address present, unsubscribe link works

Then update `blocks/email-wrapper/README.md` Tested-on section.

## When to re-run

- After every change to a block's HTML in `blocks/`
- After every change to the screenshot pipeline (`tests/screenshots.js`)
- Before adding a "Tested on" row claiming a new client works
- Periodically (~quarterly) to catch client-side rendering drift

A full pass takes ~90 minutes. A spot check of just the changed block takes ~15.
