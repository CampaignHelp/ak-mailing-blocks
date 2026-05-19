# QA results

Live record of how each block renders across email clients. Updated after each QA run.

This is the **single source of truth** for compatibility — the per-block READMEs and the top-level compatibility summary both point here. See [`QA-PROCEDURE.md`](./QA-PROCEDURE.md) for how to run a pass and fill this in.

## Cell legend

- `✓` — renders correctly, matches expectation
- `~` — renders with a known limitation, documented in Notes column below
- `✗` — fails to render or renders broken
- `—` — not yet tested

## Current matrix

**Latest full run:** never. Run the procedure and replace this section.

```
Replace the matrix below with results from your run.
Keep the "Setup notes" and "Notes / known issues" sections — they
explain anything that's not a clean ✓.
```

### Run YYYY-MM-DD — by jordankrueger@campaign.help

**Setup notes:**

- AK instance: Robotic Dogs
- Email wrapper used for proofs: [name of the wrapper]
- Test mailing source: `tests/test-mailing.html` at commit `<short-sha>`

**Matrix:**

| Client | Mode | cta-button | cta-line | callout-box | donation-array | email-wrapper |
|---|---|---|---|---|---|---|
| Apple Mail macOS | light | — | — | — | — | — |
| Apple Mail macOS | dark | — | — | — | — | — |
| Apple Mail iOS | light | — | — | — | — | — |
| Apple Mail iOS | dark | — | — | — | — | — |
| Gmail web (Chrome) | light | — | — | — | — | — |
| Gmail web (Chrome) | dark | — | — | — | — | — |
| Gmail iOS app | light | — | — | — | — | — |
| Gmail iOS app | dark | — | — | — | — | — |
| Gmail Android app | light | — | — | — | — | — |
| Gmail Android app | dark | — | — | — | — | — |
| Outlook web | light | — | — | — | — | — |
| Outlook web | dark | — | — | — | — | — |
| Outlook iOS app | light | — | — | — | — | — |
| Outlook iOS app | dark | — | — | — | — | — |
| Yahoo Mail web | light | — | — | — | — | — |
| Yahoo Mail web | dark | — | — | — | — | — |
| Proton Mail web | light | — | — | — | — | — |
| Proton Mail web | dark | — | — | — | — | — |

**Out of scope this run** (requires paid tools or specific hardware):
- Outlook Windows desktop (multiple versions) — requires Litmus or a Windows VM
- Samsung Mail (Android default) — requires an Android device

**Notes / known issues:**

(Document anything that's a `~` or `✗` here. Cross-reference any issue numbers filed.)

---

## Run history

Past runs in reverse chronological order. Keep the matrix snapshot small — just the headline (X passing, Y limitations, Z failing) and a link to the commit where the per-block READMEs were updated.

- (no runs yet)

---

## Standing known limitations

Things we already know don't render perfectly. These come from email-HTML standards, not from this repo's bugs.

- **callout-box on Outlook Windows desktop** — float CSS isn't supported. The card sits top-right of the parent cell instead of having body copy wrap around it. The card itself still renders correctly via VML.
- **callout-box on Gmail web on phone** — Gmail Web strips `<style>` blocks, so the mobile-stacking media query never fires. The card stays right-aligned at 220px even on narrow viewports. Readable but cramped.
- **cta-line on Gmail web on phone** — same media-query-stripping behavior. Headline and button stay side-by-side on mobile Gmail Web rather than stacking.
- **Dark mode color inversion** — aggressive dark-mode overrides on some Outlook iOS and Samsung Mail builds can flip backgrounds and shift brand colors. Documented per block.
- **Yahoo Mail** — historically strips `background-color` on `<table>` elements in some paths. cta-line's strip background may not render.

These are flagged in advance so a QA run doesn't surprise the tester. If a behavior is worse than what's described here, file a bug.
