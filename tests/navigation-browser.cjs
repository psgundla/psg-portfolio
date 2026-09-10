// Run with NODE_PATH pointing to Playwright and localhost:4174 running.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.BASE_URL || 'http://localhost:4174';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const aligned = async id => {
      await page.waitForFunction(id => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        return top >= 0 && top < 150;
      }, id);
    };
    await page.goto(`${base}/`);
    await page.locator('.nav-desktop-links a[href="/work"]').click();
    assert.equal(new URL(page.url()).pathname, '/work');
    await aligned('work');
    await page.locator('.nav-desktop-links a[href="/contact"]').click();
    await aligned('contact');
    assert.equal(new URL(page.url()).hash, '');
    await page.goBack();
    await aligned('work');
    await page.goForward();
    await aligned('contact');
    await page.reload();
    await aligned('contact');
    await page.goto(`${base}/#contact`);
    await page.waitForURL('**/contact');
    await aligned('contact');
    await page.goto(`${base}/#blogs`);
    await page.getByRole('heading', { name: 'Page Not Found' }).waitFor();
    await page.getByRole('link', { name: 'Go to Home Page' }).click();
    await page.locator('.hero-masthead').waitFor();
    await page.evaluate(() => { window.location.hash = 'blogs'; });
    await page.getByRole('heading', { name: 'Page Not Found' }).waitFor();
    await page.goBack();
    await page.locator('.hero-masthead').waitFor();
    assert(!((await page.title()).startsWith('404')));
    await page.goto(`${base}/missing-page`);
    await page.getByRole('heading', { name: 'Page Not Found' }).waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/`);
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.locator('#primary-navigation a[href="/life"]').click();
    await aligned('life');
    assert.equal(new URL(page.url()).pathname, '/life');
    assert.equal(await page.locator('#primary-navigation').isVisible(), false);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'life');
    console.log('Navigation passed: desktop/mobile, focus, refresh, history, legacy links, unknown paths/fragments, and 404 recovery.');
  } finally { await browser.close(); }
})();
