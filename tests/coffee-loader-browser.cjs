// Run with NODE_PATH pointing to Playwright and Vite on port 4174.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({ headless:true, channel:'chrome' });
 try {
  const page = await browser.newPage({viewport:{width:1280,height:900}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(() => {
   localStorage.setItem('portfolio-theme', 'light');
   // Record actual visibility lifetime, including the fade, independently of navigation timing.
   new MutationObserver(() => {
    const loader=document.querySelector('#coffee-loader');
    if(loader && !loader.hidden && !window.loaderStarted) window.loaderStarted=performance.now();
    if(window.loaderStarted && !loader && !window.loaderElapsed) window.loaderElapsed=performance.now()-window.loaderStarted;
   }).observe(document,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  });
  await page.goto('http://127.0.0.1:4174/',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('#root').evaluate(el=>el.inert),true);
  assert.equal(await page.locator('#coffee-loader button, .signature-loader-footer').count(),0);
  await page.screenshot({path:'/tmp/coffee-loader-installed.png'});
  await page.locator('#coffee-loader.is-docking').waitFor({state:'attached'});
  assert.equal(await page.locator('.brand img').getAttribute('src'),'/brand/signature-black.svg');
  await page.waitForFunction(()=>window.loaderElapsed);
  const duration=await page.evaluate(()=>window.loaderElapsed);
  assert(duration>=2800 && duration<=3400,`Expected 3.1-second signature handoff, measured ${duration}ms`);
  assert.equal(await page.locator('#root').evaluate(el=>el.inert),false);
  assert.equal(await page.locator('html').getAttribute('data-coffee-loading'),null);

  await page.goto('http://127.0.0.1:4174/missing-page',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('#coffee-loader').count(),0);

  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:375,height:812});
  await page.route('**/portfolio/avatar-*.png',route=>route.abort());
  await page.goto('http://127.0.0.1:4174/',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('.signature-logo .pen-one').evaluate(el=>getComputedStyle(el).animationName),'none');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'/tmp/coffee-loader-mobile.png'});
  await page.waitForFunction(()=>window.loaderElapsed);
  const reducedDuration=await page.evaluate(()=>window.loaderElapsed);
  assert(reducedDuration>=250 && reducedDuration<=800,`Reduced-motion duration: ${reducedDuration}ms`);
  assert.equal(await page.locator('#root').evaluate(el=>el.inert),false);
  assert.deepEqual(errors,[]);
  console.log(`Signature loader passed: ${Math.round(duration)}ms standard, ${Math.round(reducedDuration)}ms reduced motion; automatic exit, mobile, 404, failed portrait.`);
 }finally{await browser.close();}
})();
