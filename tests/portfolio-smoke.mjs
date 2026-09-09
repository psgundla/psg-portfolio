import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Render the real Vite modules without a browser; interaction checks run separately.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const html = renderToStaticMarkup(React.createElement(App));
  for (const anchor of ['main', 'work', 'life', 'social', 'contact']) {
    assert.ok(html.includes(`id="${anchor}"`), `Missing navigation target: ${anchor}`);
  }
  assert.ok(html.includes('aria-label="Open navigation"'), 'Missing pill trigger');
  assert.ok(html.includes('aria-expanded="false"'), 'Pill must start closed');
  assert.ok(html.includes('id="primary-navigation" hidden'), 'Closed navigation must be hidden');
  const { publications, photos } = await server.ssrLoadModule('/src/data/portfolio.js');
  for (const paper of publications) assert.ok(html.includes(paper.href), `Missing publication: ${paper.title}`);
  assert.ok(!html.includes('id="about"'), 'Journey must remain outside main portfolio');
  for (const [file] of photos) await access(`public/portfolio/photos/${file}.webp`);
  assert.ok(!photos.some(([file]) => ['esmo-merit-award', 'conference-friends', 'ikim-summer'].includes(file)), 'People photos remain in reel');
  await access('public/CV-Pranav-Swaroop-Gundla.pdf');
  await access('public/bunker/index.html');
  assert.ok(html.includes('/portfolio/avatar-light.png') && !html.includes('/portfolio/research-desk.png'), 'Avatar hero or removed research art is incorrect');
  for (const file of ['public/portfolio/avatar-light.png', 'public/portfolio/avatar-dark.png']) await access(file);
  assert.ok(html.includes('class="photo-reel"') && !html.includes('photo-controls'), 'Infinite photo reel missing');
  assert.ok(html.replace(/<[^>]*>/g, '').includes('Let’s Connect') && !html.includes('Frame 1 of'), 'Requested copy cleanup missing');
  assert.ok(html.includes('class="achievement-award"') && html.includes('Genetic subtype prediction in diffuse gliomas'), 'Achievement award redesign missing');
  assert.ok(html.includes('class="stack-icon"') && html.includes('aria-label="Python"') && html.includes('aria-label="Apptainer"') && !html.includes('img.shields.io'), 'React icon stack missing');
  assert.ok(html.includes('id="open-source"') && html.includes('154') && html.includes('mahmoodlab/TRIDENT'), 'Current GitHub contribution section missing');
  assert.equal((html.match(/class="github-day github-level-/g) || []).length, 372, 'GitHub calendar or legend is incomplete');
  const documentHead = await readFile('index.html', 'utf8');
  assert.ok(documentHead.includes('/brand/psg-final/favicon/psg-favicon-white.svg'), 'Final vector favicon missing');
  assert.ok(html.includes('/brand/psg-final/psg-black.svg'), 'Final vector header logo missing');
  for (const file of ['public/favicon.ico', 'public/brand/psg-final/psg-white.svg', 'public/brand/psg-final/favicon/apple-touch-icon.png']) await access(file);
  assert.ok(html.includes('<dialog'), 'Missing native project dialog');
  const { default: SocialPosts } = await server.ssrLoadModule('/src/components/SocialPosts.jsx');
  const cards = renderToStaticMarkup(React.createElement(SocialPosts, { posts: [
    { platform: 'linkedin', url: 'https://www.linkedin.com/feed/update/urn:li:activity:123/', text: 'Long post '.repeat(40), image: { src: '/test.webp', alt: 'Test illustration' } },
    { platform: 'twitter', url: 'https://x.com/test/status/123', text: 'Short post <script> must be escaped.' },
  ] }));
  assert.equal((cards.match(/class="social-post"/g) || []).length, 2);
  assert.ok(cards.includes('aria-expanded="false"') && cards.includes('Read more'));
  assert.ok(cards.includes('alt="Test illustration"'));
  assert.ok(cards.includes('&lt;script&gt;') && !cards.includes('<script>'));
  assert.ok(cards.includes('https://x.com/test/status/123'));
  assert.ok(!cards.includes('Selected posts coming soon.'));
  const empty = renderToStaticMarkup(React.createElement(SocialPosts, { posts: [] }));
  assert.ok(empty.includes('Selected posts coming soon.'), 'Empty posts must not fabricate content');
  assert.ok(html.includes('Inigo Martincorena') && html.includes('Post summary'));
  assert.ok(html.includes('ugcPost-7394493698782384129') && html.includes('2095432511593587188'));
  assert.ok(!html.includes('Selected posts coming soon.'));
  const pkg = JSON.parse(await readFile('package.json', 'utf8'));
  assert.ok(pkg.dependencies.motion, 'Motion dependency missing');
  assert.ok(!pkg.dependencies.gsap && !pkg.dependencies['@gsap/react'], 'GSAP dependency remains');
  console.log('Portfolio smoke passed: render, anchors, publications, assets, and Motion migration.');
} finally {
  await server.close();
}
