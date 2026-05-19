# QA results

Live record of how each block renders across email clients. Updated after each QA run.

This is the **single source of truth** for compatibility — the per-block READMEs and the top-level compatibility summary both point here. See [`QA-PROCEDURE.md`](./QA-PROCEDURE.md) for how to run a pass and fill this in.

## Cell legend

- `✓` — renders correctly, matches expectation
- `~` — renders with a known limitation, documented in Notes column below
- `✗` — fails to render or renders broken
- `—` — not yet tested

## Current matrix

**Latest full run:** 2026-05-19 (partial — 4 of 9 free-tier clients covered, email-wrapper not yet QA'd as a wrapper install).

### Run 2026-05-19 — by jordankrueger@campaign.help

**Setup notes:**

- AK instance: Robotic Dogs
- Email wrapper used for proofs: Robotic Dogs default
- Test mailing source: `tests/test-mailing.html` at commit `c2791d0`

**Matrix:**

| Client | Mode | cta-button | cta-line | callout-box | donation-array | email-wrapper |
|---|---|---|---|---|---|---|
| Apple Mail macOS | light | ✓ | ✓ | ✓ | ✓ | — |
| Apple Mail macOS | dark | — | — | — | — | — |
| Apple Mail iOS | light | ✓ | ✓ | ~ (1) | ✓ | — |
| Apple Mail iOS | dark | — | — | — | — | — |
| Gmail web (Chrome) | light | ✓ | ✓ | ✓ | ✓ | — |
| Gmail web (Chrome) | dark | — | — | — | — | — |
| Gmail iOS app | light | ✓ | ✓ | ✓ | ✓ | — |
| Gmail iOS app | dark | — | — | — | — | — |
| Gmail Android app | — | — | — | — | — | — |
| Outlook web | — | — | — | — | — | — |
| Outlook iOS app | — | — | — | — | — | — |
| Yahoo Mail web | — | — | — | — | — | — |
| Proton Mail web | — | — | — | — | — | — |

**Out of scope this run** (requires paid tools or specific hardware):
- Outlook Windows desktop (multiple versions) — requires Litmus or a Windows VM
- Samsung Mail (Android default) — requires an Android device

**Not yet tested in this run** (covered by next run):
- Dark mode across all confirmed clients
- Gmail Android app
- Outlook web (free Microsoft account)
- Outlook iOS app
- Yahoo Mail web
- Proton Mail web
- email-wrapper installed as the AK wrapper

**Notes / known issues:**

1. **callout-box on Apple Mail iOS — image didn't scale.** When the media query stacks the card to full width on mobile, the image inside stayed pinned at 220px instead of expanding to match the card. **Fixed** in commit on 2026-05-19 — the media query now includes `.ak-callout-box img { width: 100% !important; max-width: 100% !important; }` so the image follows its parent. Same fix applied to `blocks/callout-box/1-basic.html`, `2-with-cmfs.html`, the playground generator, and `tests/test-mailing.html`. Re-test on next QA pass to confirm.

---

## Run history

Past runs in reverse chronological order. Keep the matrix snapshot small — just the headline (X passing, Y limitations, Z failing) and a link to the commit where the per-block READMEs were updated.

- **2026-05-19** — partial pass (4 of 9 clients, light mode only). 19 ✓, 1 ~ (callout-box image-scaling on Apple Mail iOS, fixed same-day). No ✗. email-wrapper not yet QA'd as an installed wrapper.

---

## Standing known limitations

Things we already know don't render perfectly. These come from email-HTML standards, not from this repo's bugs.

- **callout-box on Outlook Windows desktop** — float CSS isn't supported. The card sits top-right of the parent cell instead of having body copy wrap around it. The card itself still renders correctly via VML.
- **callout-box on Gmail web on phone** — Gmail Web strips `<style>` blocks, so the mobile-stacking media query never fires. The card stays right-aligned at 220px even on narrow viewports. Readable but cramped.
- **cta-line on Gmail web on phone** — same media-query-stripping behavior. Headline and button stay side-by-side on mobile Gmail Web rather than stacking.
- **Dark mode color inversion** — aggressive dark-mode overrides on some Outlook iOS and Samsung Mail builds can flip backgrounds and shift brand colors. Documented per block.
- **Yahoo Mail** — historically strips `background-color` on `<table>` elements in some paths. cta-line's strip background may not render.

These are flagged in advance so a QA run doesn't surprise the tester. If a behavior is worse than what's described here, file a bug.
