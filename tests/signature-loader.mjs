// Run: node tests/signature-loader.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../public/coffee-loader.js', import.meta.url), 'utf8');
function setup({ reduced = false, path = '/', inert = false, targetMissing = false } = {}) {
  const timers = new Map();
  const listeners = new Map();
  let nextId = 0;
  const properties = {};
  const mark = { getBoundingClientRect: () => ({left: 500, top: 300, width: 240}), style: {setProperty: (key,value) => {properties[key]=value;}} };
  const target = targetMissing ? null : {getBoundingClientRect: () => ({left: 40, top: 20, bottom: 78, width: 72})};
  const root = { inert, querySelector: () => target };
  const classes = new Set();
  const loader = { hidden: true, querySelector: () => mark, remove() { loader.removed = true; }, classList: { add: name => classes.add(name) } };
  const document = { getElementById: id => id === 'root' ? root : loader, documentElement: { dataset: {} } };
  const window = {addEventListener: (name, cb) => listeners.set(name, cb), removeEventListener: name => listeners.delete(name)};
  runInNewContext(script, { document, window, innerHeight: 900, location: { pathname: path }, matchMedia: () => ({ matches: reduced }), setTimeout: (callback, delay) => { timers.set(++nextId, { callback, delay }); return nextId; } });
  const tick = delay => { for (const [id, timer] of [...timers]) if (timer.delay === delay) { timers.delete(id); timer.callback(); } };
  return { loader, root, document, timers, tick, classes, properties, listeners };
}
const normal = setup();
assert.equal(normal.root.inert, true);
assert.equal(normal.loader.hidden, false);
normal.tick(2400);
assert(normal.classes.has('is-docking'));
assert.equal(normal.properties['--logo-x'], '-460px');
assert.equal(normal.properties['--logo-y'], '-280px');
assert.equal(normal.properties['--logo-scale'], '0.3');
assert.equal(normal.document.documentElement.dataset.coffeeLoading, 'handoff');
normal.tick(700);
assert.equal(normal.loader.removed, true);
assert.equal(normal.root.inert, false);
assert.equal(normal.document.documentElement.dataset.coffeeLoading, undefined);
const reduced = setup({ reduced: true });
reduced.tick(300);
assert.equal(reduced.loader.removed, true);
assert.equal(reduced.root.inert, false);
assert.equal(reduced.classes.size, 0);
const missing = setup({targetMissing: true});
missing.tick(2400); assert(missing.classes.has('is-leaving')); missing.tick(300);
assert.equal(missing.loader.removed, true);
const resize = setup(); resize.tick(2400); resize.listeners.get('resize')();
assert.equal(resize.loader.removed, true);
assert.equal(resize.root.inert, false);
const deepLink = setup({ path: '/missing-page' });
assert.equal(deepLink.loader.removed, true);
assert.equal(deepLink.timers.size, 0);
const alreadyInert = setup({ inert: true });
alreadyInert.tick(2400); alreadyInert.tick(700);
assert.equal(alreadyInert.root.inert, true);
const svg = readFileSync(new URL('../public/brand/signature-reveal.svg', import.meta.url), 'utf8').trim();
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
assert(html.includes(svg), 'Saved SVG and first-paint inline SVG must stay identical');
assert(svg.includes('prefers-reduced-motion: reduce'));
assert(!html.includes('signature-loader-footer'));
assert(!html.includes('Enter site'));
console.log('Signature loader passed: docking geometry, missing target, resize, reduced motion, route bypass, inert restoration, asset parity.');

for (const color of ['black', 'white']) {
  const asset = readFileSync(new URL(`../public/brand/signature-${color}.svg`, import.meta.url), 'utf8');
  assert(!asset.includes('<style>'), 'Header logo must be static');
  const paths = [...asset.matchAll(/<path d="([^"]+)"/g)].map(match => match[1]);
  assert.equal(paths.length, 2);
  for (const path of paths) assert(svg.includes(`d="${path}"`), 'Header preserves original geometry');
}
