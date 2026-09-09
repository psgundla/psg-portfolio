// Run with NODE_PATH pointing to a Playwright installation and the local dev server running.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  try {
    const page = await browser.newPage();
    page.on('pageerror', error => console.log(error.message));
    await page.emulateMedia({ reducedMotion: 'no-preference', forcedColors: 'none' });
    await page.goto('http://127.0.0.1:4174/');
    await page.locator('.morphing-cursor').waitFor({ state: 'attached' });
    await page.waitForTimeout(300);
    await page.mouse.move(300, 200);
    await page.mouse.move(310, 210);
    await page.waitForFunction(() => document.querySelector('.morphing-cursor.is-visible'), {timeout: 3000});
    assert(await page.locator('.morphing-cursor.is-visible').count());
    await page.locator('.nav-desktop-links a').first().hover();
    assert(await page.locator('.morphing-cursor.is-text').count());
    assert.equal(await page.locator('.morphing-cursor').textContent(), '');
    await page.waitForTimeout(220);
    assert.equal(await page.locator('.morphing-cursor > span').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(25, 25, 25)');
    await page.mouse.move(30, 220);
    await page.waitForTimeout(220);
    assert.equal(await page.locator('.morphing-cursor > span').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(252, 59, 29)');
    const position = await page.locator('.morphing-cursor').evaluate(el => { const r = el.getBoundingClientRect(); return [r.x, r.y]; });
    assert(Math.abs(position[0] - 30) < 1 && Math.abs(position[1] - 220) < 1);
    await page.mouse.down();
    assert(await page.locator('.morphing-cursor.is-pressed').count());
    await page.mouse.up();
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('html.morphing-cursor-on').count(), 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.mouse.move(30, 220);
    assert.equal(await page.locator('html.morphing-cursor-on').count(), 0);
    console.log('Cursor hover, press, keyboard and reduced-motion checks passed');
  } finally { await browser.close(); }
})();
