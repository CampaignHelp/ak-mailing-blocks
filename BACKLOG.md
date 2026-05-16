# Block backlog

Working list of blocks worth adding. Capture freely here; promote to `blocks/` once a block has a clear shape and a real use case.

## How to add an idea

Append a bullet under "Candidates" with this shape:

- **block-name** — one-line description of what it does
  - **Who edits it:** developer / AK admin / recipient-personalized
  - **Tier ambition:** which tiers feel realistic (1 / 1+2 / 1+2+3)
  - **Why we'd build it:** the real-world problem it solves, ideally with a client or campaign reference

## Triage criteria

A candidate is ready to promote out of the backlog when:

- The HTML pattern is non-trivial (worth packaging — not just "add an h1")
- At least one real client or campaign has needed it
- It renders correctly in Apple Mail, iOS Mail, and headless Chrome at minimum
- The tier 2 path (if proposed) has a sensible CMF naming convention

## Candidates

- **callout-box** — Right-aligned floating callout with a title, image, and button so the CTA is visible at a glance while body copy wraps around it
  - **Who edits it:** developer at tier 1; AK admin at tier 2 (CMFs for title, image URL, button label, button URL, brand color — ~5 fields)
  - **Tier ambition:** 1+2
  - **Why we'd build it:** Surfaces the action above the fold visually without forcing the reader to scroll past body copy first. Common pattern in newsletters and policy alerts. Many orgs rebuild this from scratch every send.
  - **Open questions:** Mobile behavior — stack below body copy at narrow widths (typical), or stay aligned and let body copy reflow next to it? Mobile-stacking is the safer email pattern; needs media queries + Gmail-friendly fallback.

- **playground (cta-button)** — Mirror the donation-array playground pattern for cta-button: tweak label, URL, brand color, text color; live preview iframe; copy-HTML button. Reuse the same layout and `buildHtml` substitution approach from `playground/index.html`. Add a tab/section switcher so users can move between blocks without reloading.

- **playground (email-wrapper)** — Same pattern for email-wrapper, but with brand tokens (primary color, accent color, logo URL, org name, address) and a sample body content area. More involved than the smaller blocks because the wrapper IS the brand definition for an org.

- **brand-tokens via Email Wrapper Fields** — Refactor existing blocks to read brand colors and font from `{{ wrapper_custom_fields.brand_primary_color }}` etc. instead of hardcoding per-block. One change in AK updates every send. Highest-leverage long-term move; requires updating every block, so wait until the playground UX is settled first.

- **cta-line** — Inline CTA row with a headline and a button, no image. Lighter visual weight than a full hero CTA, good for mid-body reminders or secondary asks
  - **Who edits it:** developer at tier 1; AK admin at tier 2 (CMFs for headline, button label, button URL, optionally subhead)
  - **Tier ambition:** 1+2
  - **Why we'd build it:** Existing `cta-button` covers the button itself but not the copy alongside it. Senders often want a "remind me" CTA strip partway through a long email and end up reinventing the table layout each time.
  - **Open questions:** Variants — headline + button only, or headline + one-line subhead + button? Horizontal on desktop with stack-on-mobile, or always stacked?

## Shipped

Blocks that have moved out of the backlog and into `blocks/`.

- cta-button (tier 1, 2)
- donation-array (tier 1, 2, 3) — tighter spacing, uniform 140px buttons
- email-wrapper (tier 1, 2) — includes built-in preview text support

## Shipped — tooling

- **Public repo launch** — flipped public 2026-05-16, hosted under the CampaignHelp org, linked from awesome-actionkit
- **Screenshot pipeline** — `tests/screenshots.js` renders all tier-1 blocks via Playwright into each block's `screenshots/` folder
- **Playground (donation-array)** — live at https://campaignhelp.github.io/ak-mailing-blocks/playground/. Vanilla JS, no build. Proof of concept for the broader playground roadmap.

## Won't build

Ideas considered and intentionally declined. Keep these so the same idea doesn't keep getting re-proposed.

- **preheader** — AK handles preview text natively. The Compose screen has a dedicated preview text field below the subject line, and AK exposes `{{ preview_text }}` as a template variable inside wrappers. Our `email-wrapper` block already includes the `{% if preview_text %}` conditional, so any org using it gets preview text "for free" by typing in the Compose-screen field. A standalone preheader block would only matter for orgs on legacy or third-party wrappers without preview text support — too narrow to maintain.
