// Run with NODE_PATH pointing to Playwright and Vite running on port 4174.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({ headless: true, channel: 'chrome' });
 try {
  const page = await browser.newPage({ viewport: { width: 1135, height: 1264 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4174/#technical-stack');
  assert.equal(await page.locator('.glass-key').count(), 12);
  assert.equal(await page.locator('.glass-keyboard').count(), 1);
  assert.equal(await page.locator('.stack-readout, .stack-communication').count(), 0);
  const key = page.getByRole('button', { name: 'PyTorch', exact: true });
  await key.hover();
  assert.match(await page.getByRole('tooltip').innerText(), /Deep learning/);
  await page.getByRole('tooltip').hover();
  assert.equal(await page.getByRole('tooltip').count(), 1, 'Hover card stays open under pointer');
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('tooltip').count(), 0);
  await key.focus();
  assert.equal(await page.getByRole('tooltip').count(), 1);
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('tooltip').count(), 0);
  await page.keyboard.press('Enter');
  assert.equal(await page.getByRole('tooltip').count(), 1);
  await page.mouse.click(15, 500);
  for (const theme of ['light', 'dark']) {
   await page.evaluate(theme => { document.documentElement.dataset.theme = theme; }, theme);
   await page.locator('.technical-stack').screenshot({ path: `/tmp/technical-stack-${theme}.png` });
  }
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await mobile.goto('http://127.0.0.1:4174/#technical-stack');
  await mobile.emulateMedia({ reducedMotion: 'reduce' });
  for (const label of ['Cloud', 'Containers', 'HPCs', 'Paper writing']) {
   await mobile.getByRole('button', { name: label, exact: true }).tap();
   assert.match(await mobile.getByRole('tooltip').innerText(), new RegExp(label));
   const rect = await mobile.getByRole('tooltip').boundingBox();
   assert(rect.x >= 0 && rect.x + rect.width <= 390, 'Mobile tooltip fits viewport');
  }
  assert.equal(await mobile.locator('.glass-key').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  const overflow = await mobile.locator('.glass-key').evaluateAll(elements => elements.filter(el => el.scrollWidth > el.clientWidth + 1).length);
  assert.equal(overflow, 0, 'Key labels fit on mobile');
  await mobile.mouse.click(10, 400);
  await mobile.locator('.technical-stack').screenshot({ path: '/tmp/technical-stack-mobile.png' });
  assert.deepEqual(errors, []);
  console.log('Stack: 12 keys, one block, hover persistence, Escape, keyboard, mobile taps and tooltip fit passed.');
 } finally { await browser.close(); }
})();
