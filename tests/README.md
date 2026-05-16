# tests/

## screenshots.js

Renders each block's tier-1 HTML to a PNG saved alongside the block, so READMEs can embed a real preview.

Fragments (CTA button, donation array) get wrapped in a minimal email canvas before rendering. Full documents (email wrapper) render as-is with ActionKit/Django template tags substituted for sample content so the screenshot shows what a real send looks like, not literal `{% ... %}` markers. The preheader block is intentionally skipped — it's an invisible preview-text span.

### Run it

The script depends on Playwright, which is installed in the `playwright-skill` global skill rather than this repo. Invoke it via that skill's runner:

```bash
cd ~/.claude/skills/playwright-skill
node run.js /Users/jordankrueger/ClaudeCode/business/campaignhelp/ak-mailing-blocks/tests/screenshots.js
```

Output goes to `blocks/<name>/screenshots/<filename>.png` at 2x density.

### Re-render when

- A block's tier-1 HTML changes
- The substitution map in `screenshots.js` needs new sample values (e.g., a new block introduces a template tag the script doesn't yet handle)

Commit the PNGs alongside the HTML changes — they're small (under 50KB) and the alternative is a CI step we don't have yet.
