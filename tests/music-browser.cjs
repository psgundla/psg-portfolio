// Run with NODE_PATH pointing to Playwright and localhost:4174 running.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:4174');
    assert(await page.locator('audio').evaluate(e => e.paused));
    await page.locator('.theme-toggle').click(); // Real user activation permits sound.
    await page.locator('.vinyl-deck').scrollIntoViewIfNeeded();
    await page.waitForSelector('.vinyl-deck.is-playing');
    assert.equal(await page.locator('audio').evaluate(e => e.controls), false);
    await page.getByRole('button', { name: 'Pause soundtrack' }).click();
    await page.waitForFunction(() => !document.querySelector('.vinyl-deck.is-playing'));
    await page.locator('.hero-masthead').scrollIntoViewIfNeeded();
    await page.locator('.vinyl-deck').scrollIntoViewIfNeeded();
    assert(await page.locator('audio').evaluate(e => e.paused));
    await page.getByRole('button', { name: 'Play soundtrack' }).click();
    await page.waitForSelector('.music-waves.is-playing');
    await page.getByRole('slider', { name: 'Seek soundtrack' }).fill('20');
    assert(await page.locator('audio').evaluate(e => e.currentTime >= 19));
    await page.getByRole('button', { name: 'Pause soundtrack' }).click();
    const blocked = await browser.newPage();
    await blocked.addInitScript(() => {
      HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException('Blocked', 'NotAllowedError'));
    });
    await blocked.goto('http://localhost:4174/#contact');
    await blocked.locator('.vinyl-deck').scrollIntoViewIfNeeded();
    await blocked.getByRole('status').waitFor();
    assert.equal(await blocked.locator('.is-playing').count(), 0);
    console.log('Viewport playback, manual pause persistence, and blocked autoplay fallback passed');
  } finally { await browser.close(); }
})();
