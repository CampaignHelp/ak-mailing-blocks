// Render tier-1 blocks to PNG.
//
// Fragments (cta-button, donation-array) get wrapped in a minimal email canvas
// before rendering. Full-document blocks (email-wrapper) render as-is.
// Preheader is intentionally skipped — it's an invisible preview-text span.
//
// Output: blocks/<name>/screenshots/<file>.png
//
// Run:
//   cd ~/.claude/skills/playwright-skill && node run.js <repo>/tests/screenshots.js

const { chromium } = require('playwright');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

// The playwright-skill runner copies this file to its own directory before
// executing, so __dirname can't be trusted. Resolve from this file's known
// location in the repo.
const REPO_ROOT = '/Users/jordankrueger/ClaudeCode/business/campaignhelp/ak-mailing-blocks';
const BLOCKS_DIR = path.join(REPO_ROOT, 'blocks');

const EMAIL_WIDTH = 600;
const CANVAS_BG = '#f0f0f0';
const PADDING = 24;

const SKIP_BLOCKS = new Set(['_TEMPLATE', 'preheader']);
const TIER_1_PATTERN = /^1-/;

function wrapFragment(fragment) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: ${PADDING}px; background: ${CANVAS_BG}; font-family: Helvetica, Arial, sans-serif; }
  .canvas { background: #ffffff; max-width: ${EMAIL_WIDTH}px; margin: 0 auto; padding: ${PADDING}px; }
</style>
</head>
<body>
<div class="canvas">
${fragment}
</div>
</body>
</html>`;
}

function isFullDocument(html) {
  return /<!DOCTYPE|<html[\s>]/i.test(html);
}

// Swap ActionKit/Django template tags with sample content so the screenshot
// shows what a real send looks like instead of literal `{% ... %}` markers.
function substituteForPreview(html) {
  return html
    // Conditional preview text block — drop it (preheader is invisible anyway)
    .replace(/\{% if preview_text %\}[\s\S]*?\{% endif %\}/g, '')
    // Logo placeholder — inline SVG data URI sized to match the email-wrapper
    // img tag's width=180, so it renders at a reasonable size in the screenshot.
    .replace(
      /https:\/\/example\.org\/logo\.png/g,
      'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="48" viewBox="0 0 180 48"><rect width="180" height="48" rx="4" fill="#1a57c2"/><text x="90" y="30" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="bold" fill="#fff">YOUR LOGO</text></svg>'
      )
    )
    .replace(/\[LOGO_URL\]/g, 'https://campaign.help/img/logo-placeholder.png')
    .replace(/\[ORG_NAME\]/g, 'Your Organization')
    .replace(/\[MAILING_ADDRESS\]/g, '123 Main Street, Anytown, ST 00000')
    .replace(/\[BRAND_COLOR\]/g, '#1a57c2')
    // Sample mailing body inside the wrapper's content block
    .replace(
      /\{% block content %\}[\s\S]*?\{% endblock content %\}/g,
      `
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #222222; margin: 0 0 16px;">Friend,</p>
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #222222; margin: 0 0 16px;">Sample mailing body. This is where your email content goes — paragraphs, calls to action, donation arrays, anything else you build in.</p>
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #222222; margin: 0 0 16px;">Thanks,<br>The Team</p>
      `
    )
    // Unsubscribe include — swap for a representative footer line
    .replace(
      /\{% include "unsubscribe\.html" %\}/g,
      '<a href="#" style="color: #666;">Unsubscribe</a>'
    )
    // Any other unresolved tags — render as nothing
    .replace(/\{% [^%]*? %\}/g, '')
    .replace(/\{\{ [^}]*? \}\}/g, '');
}

async function discoverTargets() {
  const blocks = await fsp.readdir(BLOCKS_DIR, { withFileTypes: true });
  const targets = [];
  for (const entry of blocks) {
    if (!entry.isDirectory()) continue;
    if (SKIP_BLOCKS.has(entry.name)) continue;
    const blockDir = path.join(BLOCKS_DIR, entry.name);
    const files = await fsp.readdir(blockDir);
    for (const file of files) {
      if (!file.endsWith('.html')) continue;
      if (!TIER_1_PATTERN.test(file)) continue;
      targets.push({
        block: entry.name,
        file,
        source: path.join(blockDir, file),
        outDir: path.join(blockDir, 'screenshots'),
        outFile: file.replace(/\.html$/, '.png'),
      });
    }
  }
  return targets;
}

async function renderOne(browser, target) {
  const raw = await fsp.readFile(target.source, 'utf8');
  const substituted = substituteForPreview(raw);
  const html = isFullDocument(substituted) ? substituted : wrapFragment(substituted);

  const context = await browser.newContext({
    // Small viewport height so fullPage captures real content height, not padding.
    viewport: { width: EMAIL_WIDTH + PADDING * 2, height: 100 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.setContent(html, { waitUntil: 'networkidle' });

  if (!fs.existsSync(target.outDir)) {
    await fsp.mkdir(target.outDir, { recursive: true });
  }
  const outPath = path.join(target.outDir, target.outFile);
  await page.screenshot({ path: outPath, fullPage: true });
  await context.close();
  return outPath;
}

(async () => {
  const targets = await discoverTargets();
  if (targets.length === 0) {
    console.log('No tier-1 blocks found to render.');
    return;
  }

  const browser = await chromium.launch({ headless: true });
  console.log(`Rendering ${targets.length} block(s)...`);

  for (const target of targets) {
    try {
      const outPath = await renderOne(browser, target);
      const rel = path.relative(REPO_ROOT, outPath);
      console.log(`  OK  ${target.block}/${target.file} -> ${rel}`);
    } catch (err) {
      console.error(`  FAIL ${target.block}/${target.file}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('Done.');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
