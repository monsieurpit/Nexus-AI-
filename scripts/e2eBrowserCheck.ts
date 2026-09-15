/**
 * Real browser end-to-end checks, via Playwright — a different failure class than
 * regressionCheck.ts (which only ever hits the API directly with curl-shaped requests).
 * Built after a real production bug (2026-09-15) that a screenshot caught but no API test would
 * have: the reasoning-trace panel not showing real thinking, root-caused not to a rendering bug
 * but to the LLM call itself failing — still, the LESSON was that nobody was actually looking at
 * the rendered page during regression testing, only at raw JSON. This script drives an actual
 * Chromium browser against the real site (composer, buttons, panels, modals, geolocation
 * permission, image upload, mobile layout) so a frontend wiring bug (a prop never threaded
 * through, a button that does nothing, a modal that opens blank, layout that breaks at phone
 * width) gets caught the same way a human looking at the screen would catch it — and every
 * scenario saves a screenshot to scripts/e2e-screenshots/ so a human (or Claude, via Read) can
 * actually LOOK at the result, not just trust a DOM assertion.
 *
 * Run: bun run scripts/e2eBrowserCheck.ts [--base-url http://localhost:3000] [--headed]
 *
 * Requires a running server at --base-url (default http://localhost:3000). Scenarios that send a
 * real chat message need a real Ollama connection (same requirement as regressionCheck.ts's live
 * tier); pure-UI scenarios (opening modals, the sidebar, mobile layout) do not.
 */
import { chromium, type Browser, type Page } from 'playwright';
import { mkdirSync } from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const baseUrlArg = args.indexOf('--base-url');
const BASE_URL = baseUrlArg !== -1 ? args[baseUrlArg + 1] : 'http://localhost:3000';
const HEADED = args.includes('--headed');
const SCREENSHOT_DIR = path.join(process.cwd(), 'scripts', 'e2e-screenshots');
mkdirSync(SCREENSHOT_DIR, { recursive: true });

let passed = 0;
let failed = 0;
const failures: string[] = [];

function check(label: string, condition: boolean, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${label}`);
  } else {
    failed++;
    failures.push(label);
    console.log(`  ❌ ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

async function shot(page: Page, name: string) {
  const file = path.join(SCREENSHOT_DIR, `${name}.png`);
  await page.screenshot({ path: file });
  console.log(`     📸 ${path.relative(process.cwd(), file)}`);
}

async function withFreshPage(
  browser: Browser,
  opts: { viewport?: { width: number; height: number }; geolocation?: boolean },
  fn: (page: Page) => Promise<void>
) {
  // Fresh context per scenario, not just a fresh page — a shared context would let localStorage
  // (conversation history, cached geolocation, dismissed-modal flags) leak between scenarios and
  // make one test's outcome depend on execution order, exactly the kind of flake this exists to
  // avoid in the API-level suite too.
  const context = await browser.newContext({
    viewport: opts.viewport ?? { width: 1440, height: 900 },
    geolocation: { latitude: 45.5017, longitude: -73.5673 },
    permissions: opts.geolocation ? ['geolocation'] : [],
    // The site's own EntryAnimation (App.tsx) takes ~7.3s and plays on every fresh session (no
    // storage yet to remember it already ran) unless prefers-reduced-motion is set, which App.tsx
    // already explicitly checks and honors — found live: the first version of this script's mobile
    // screenshot only ever captured the boot animation because every scenario uses a fresh context
    // with no storage. Skips the animation entirely rather than adding a long fixed wait everywhere.
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  try {
    await fn(page);
  } finally {
    await context.close();
  }
}

async function sendMessage(page: Page, text: string, timeoutMs = 90000): Promise<void> {
  const textarea = page.locator('textarea').first();
  await textarea.click();
  await textarea.fill(text);
  await page.locator('button[aria-label="Send message"]').click();
  // Wait for generation to actually finish (Stop button reverts back to Send) rather than a fixed
  // sleep — replies now legitimately take 25-45s (see the OLLAMA_NUM_CTX fix), so a fixed wait
  // would either be flaky-short or wastefully long.
  await page.locator('button[aria-label="Send message"]').waitFor({ state: 'visible', timeout: timeoutMs });
}

async function run() {
  console.log(`\n=== Browser E2E checks (Playwright, against ${BASE_URL}) ===\n`);
  const browser = await chromium.launch({ headless: !HEADED });

  // Scenario 1: casual chat produces a real, non-empty reply and a reasoning-trace panel that
  // actually expands to show a real thinking step — the exact thing the 2026-09-15 bug report was
  // about, now checked against the rendered page instead of raw JSON.
  await withFreshPage(browser, {}, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await sendMessage(page, 'yo whats up man how you doing');
    await shot(page, '01-casual-chat-reply');
    const toggle = page.locator('button[aria-label="Toggle reasoning trace"]').last();
    const hasToggle = await toggle.count() > 0;
    check('casual reply renders a reasoning-trace toggle', hasToggle);
    if (hasToggle) {
      await toggle.click();
      await page.waitForTimeout(300);
      await shot(page, '02-reasoning-trace-expanded');
      const panelText = await page.locator('text=Internal neural thought stream').last().isVisible().catch(() => false);
      check('reasoning-trace panel actually expands', panelText);
      const rawThinkingVisible = await page
        .getByText(/What the model actually thought/i)
        .last()
        .isVisible()
        .catch(() => false);
      check('a real raw-thinking step is present in the panel (not just synthetic steps)', rawThinkingVisible);
    } else {
      check('reasoning-trace panel actually expands', false, 'no toggle to click');
      check('a real raw-thinking step is present in the panel (not just synthetic steps)', false, 'no toggle to click');
    }
    // Regenerate button — real functional check, not just presence: click it and confirm the
    // message actually changes (a broken regenerate that silently no-ops would pass a
    // presence-only check).
    const regenBtn = page.locator('button[aria-label="Regenerate last response"]').last();
    if (await regenBtn.count() > 0) {
      const before = await page.locator('body').innerText();
      await regenBtn.click();
      await page.locator('button[aria-label="Send message"]').waitFor({ state: 'visible', timeout: 90000 });
      await page.waitForTimeout(500);
      const after = await page.locator('body').innerText();
      check('regenerate button produces a new reply', before !== after);
    } else {
      check('regenerate button produces a new reply', false, 'button not found');
    }
  });

  // Scenario 2: the location button exists, is clickable, and flips to the "granted" visual state
  // once geolocation permission is granted (mocked via the browser context above) — this is the
  // actual UI flow Patrick asked for this session, never exercised by any curl-based test.
  await withFreshPage(browser, { geolocation: true }, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const locationBtn = page.locator('button[aria-label="Share your location"]');
    const hasButton = await locationBtn.count() > 0;
    check('location button is present in the composer', hasButton);
    if (hasButton) {
      await locationBtn.click();
      await page.waitForTimeout(1500);
      const pressed = await locationBtn.getAttribute('aria-pressed');
      check('location button flips to granted state after permission is allowed', pressed === 'true', `aria-pressed=${pressed}`);
      await shot(page, '03-location-granted');
    } else {
      check('location button flips to granted state after permission is allowed', false, 'no button to click');
    }
  });

  // Scenario 3: end-to-end weather grounding through the real UI, with geolocation already
  // granted — confirms the whole chain (button -> cached coords -> generator.ts -> server.ts ->
  // handleLocationAwareQuery -> real Open-Meteo data -> rendered reply) works from a real click,
  // not just a hand-crafted curl payload with clientLocation typed in manually.
  await withFreshPage(browser, { geolocation: true }, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const locationBtn = page.locator('button[aria-label="Share your location"]');
    if (await locationBtn.count() > 0) {
      await locationBtn.click();
      await page.waitForTimeout(1500);
    }
    await sendMessage(page, 'whats the weather like right now', 90000);
    await shot(page, '04-weather-reply');
    const bodyText = await page.locator('body').innerText();
    // Real Open-Meteo data reliably produces EITHER a numeric °C figure OR a specific condition
    // word (overcast/rain/clear/etc — live-tested 2026-09-15, the model sometimes describes the
    // condition in words without restating the number) — checking for either is what actually
    // distinguishes a genuinely grounded answer from the "I need a city" no-location fallback,
    // without being tied to one specific phrasing the model happens to choose this run.
    const hasTemp = /-?\d+\s*°?\s*c\b|\d+\s*degrees/i.test(bodyText);
    const hasCondition = /overcast|cloud|rain|drizzle|snow|clear sky|sunny|thunderstorm|fog|humid/i.test(bodyText);
    check('weather reply looks genuinely grounded (temperature or specific condition)', hasTemp || hasCondition);
  });

  // Scenario 4: image upload — attach a real image, confirm the preview renders with the correct
  // filename, and that the "remove" control actually clears it. Never exercised by the API suite
  // at all (that only ever sends imageUrl as a string, never through the actual file picker).
  await withFreshPage(browser, {}, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.count() > 0) {
      // A minimal valid 1x1 PNG, generated inline — no dependency on a fixture file existing.
      const pngBase64 =
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
      await fileInput.setInputFiles({
        name: 'e2e-test-pixel.png',
        mimeType: 'image/png',
        buffer: Buffer.from(pngBase64, 'base64'),
      });
      await page.waitForTimeout(500);
      const previewVisible = await page.locator('img[alt="Upload preview"]').isVisible().catch(() => false);
      check('image upload shows a preview', previewVisible);
      await shot(page, '05-image-upload-preview');
      const removeBtn = page.locator('button[aria-label="Remove attached image"]');
      if (await removeBtn.count() > 0) {
        await removeBtn.click();
        await page.waitForTimeout(300);
        const stillVisible = await page.locator('img[alt="Upload preview"]').isVisible().catch(() => false);
        check('remove-image button actually clears the preview', !stillVisible);
      } else {
        check('remove-image button actually clears the preview', false, 'remove button not found');
      }
    } else {
      check('image upload shows a preview', false, 'no file input found');
      check('remove-image button actually clears the preview', false, 'no file input found');
    }
  });

  // Scenario 5: every modal opens, renders real content (not blank), and closes cleanly —
  // Customize persona, Knowledge base, Bot API & SDK, Attention visualizer. None of these are
  // touched by regressionCheck.ts at all since they have no API endpoint of their own.
  const modals: { rail: string; expectText: RegExp }[] = [
    { rail: 'Customize', expectText: /temperature|persona|reasoning/i },
    { rail: 'Knowledge base', expectText: /knowledge|teach|fact/i },
    { rail: 'Bot API & SDK', expectText: /api|endpoint|token/i },
    { rail: 'Attention visualizer', expectText: /attention|semantic|latent/i },
  ];
  await withFreshPage(browser, {}, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    for (const modal of modals) {
      const railBtn = page.locator(`button[aria-label="${modal.rail}"]`);
      if (await railBtn.count() === 0) {
        check(`modal "${modal.rail}" opens with real content`, false, 'rail button not found');
        continue;
      }
      await railBtn.click();
      await page.waitForTimeout(400);
      const dialog = page.locator('[role="dialog"]');
      const dialogOpen = await dialog.isVisible().catch(() => false);
      const dialogText = dialogOpen ? await dialog.innerText().catch(() => '') : '';
      check(
        `modal "${modal.rail}" opens with real content`,
        dialogOpen && dialogText.trim().length > 20 && modal.expectText.test(dialogText)
      );
      await shot(page, `06-modal-${modal.rail.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
      const closeBtn = page.locator('button[aria-label="Close"]');
      if (await closeBtn.count() > 0) {
        await closeBtn.click();
        await page.waitForTimeout(300);
        const stillOpen = await dialog.isVisible().catch(() => false);
        check(`modal "${modal.rail}" closes via its Close button`, !stillOpen);
      } else {
        check(`modal "${modal.rail}" closes via its Close button`, false, 'no Close button found');
      }
    }
  });

  // Scenario 6: Nexus Code view — the sidebar's Chat/Code top-level switch actually navigates and
  // renders something real, not a blank pane.
  await withFreshPage(browser, {}, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const codeBtn = page.locator('button[aria-label="Nexus Code"]');
    if (await codeBtn.count() > 0) {
      await codeBtn.click();
      await page.waitForTimeout(500);
      await shot(page, '07-nexus-code-view');
      const heading = await page.locator('h1').first().innerText().catch(() => '');
      check('Nexus Code view renders real content after switching', heading.trim().length > 0, `heading="${heading}"`);
    } else {
      check('Nexus Code view renders real content after switching', false, 'Nexus Code rail button not found');
    }
  });

  // Scenario 7: mobile viewport (~390px, iPhone-width) — the design system's own stated
  // requirement (see the artifact/design rules this codebase already follows: "must also work at
  // phone width"). Confirms the page doesn't overflow horizontally and the composer/send button
  // stay usable, purely by screenshot for a human/Claude to actually look at — this is exactly the
  // kind of thing a DOM-only assertion is bad at catching.
  await withFreshPage(browser, { viewport: { width: 390, height: 844 } }, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await shot(page, '08-mobile-viewport-390px');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    check('page does not overflow horizontally at 390px width', scrollWidth <= clientWidth + 2, `scrollWidth=${scrollWidth} clientWidth=${clientWidth}`);
    const sendBtnVisible = await page.locator('button[aria-label="Send message"]').isVisible().catch(() => false);
    check('send button is visible/usable at mobile width', sendBtnVisible);
  });

  await browser.close();

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.log('\nFailed checks:');
    failures.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('E2E run crashed:', err);
  process.exit(1);
});
