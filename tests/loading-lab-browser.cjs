// Run with NODE_PATH pointing to Playwright; Vite on port 4174.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({ headless: true, channel: 'chrome' });
 try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4174/loading-lab/index.html');
  const setProgress = value => page.locator('#timeline').evaluate((el,value) => { el.value=value;el.dispatchEvent(new Event('input',{bubbles:true})); },value);
  for (let i=0;i<5;i++) {
   await page.locator('.option').nth(i).click();
   await setProgress(50);
   assert.equal(await page.locator('.scene:not([hidden])').getAttribute('data-scene'), String(i));
   assert.equal(await page.locator('#progress-output').innerText(), '50%');
   assert.equal(await page.locator('#pause').innerText(), 'Play');
   await page.screenshot({path:`/tmp/loading-study-${i+1}.png`});
   await setProgress(100);
   assert(await page.locator('#stage').evaluate(el=>el.classList.contains('complete')));
  }
  await page.locator('#duration').selectOption('1500');
  await page.locator('#replay').click();
  await page.waitForFunction(()=>document.querySelector('#stage').classList.contains('complete'));
  await page.locator('#pause').click();
  assert.equal(await page.locator('#pause').innerText(),'Pause');
  await page.locator('#pause').click();
  await page.locator('#timeline').focus();
  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#timeline').inputValue(),'1');
  for(const width of [375,768,1024,1440]) {
   await page.setViewportSize({width,height:850});
   for(const theme of ['light','dark']) {
    await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
    for(let i=0;i<5;i++) {
     await page.locator('.option').nth(i).click();await setProgress(50);
     assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${width}, ${theme}, ${i}`);
    }
   }
  }
  await page.setViewportSize({width:812,height:375});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Landscape overflow');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.option').first().click();
  assert.equal(await page.locator('#pause').innerText(),'Play');
  assert.equal(await page.locator('.seal').evaluate(el=>getComputedStyle(el).transform),'none');
  await page.setViewportSize({width:375,height:850});
  await page.locator('#theme').click();
  assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
  await setProgress(50);
  await page.screenshot({path:'/tmp/loading-studies-mobile.png',fullPage:true});
  const undersized=await page.locator('button,select,input').evaluateAll(els=>els.filter(el=>el.getBoundingClientRect().height<44).length);
  assert.equal(undersized,0,'Controls need 44px touch height');
  assert.deepEqual(errors,[]);
  console.log('Five loading variants passed: selection, scrub, replay/completion, keyboard, themes, 375–1440px layouts, landscape, reduced motion, touch targets.');
 } finally {await browser.close();}
})();
