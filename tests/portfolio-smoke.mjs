import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Render the real Vite modules without a browser; interaction checks run separately.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: NotFound, isPortfolioPath } = await server.ssrLoadModule('/src/components/NotFound.jsx');
  assert.ok(isPortfolioPath('/') && isPortfolioPath('/index.html'));
  assert.ok(!isPortfolioPath('/missing-page') && !isPortfolioPath('/404'));
  for (const path of ['/work', '/life', '/contact', '/contact/', '/logo']) assert.ok(isPortfolioPath(path));
  assert.ok(isPortfolioPath('/', '#contact'));
  assert.ok(!isPortfolioPath('/', '#blogs') && !isPortfolioPath('/blogs'));
  const missingHtml = renderToStaticMarkup(React.createElement(NotFound));
  assert.ok(missingHtml.includes('Page Not Found') && missingHtml.includes('href="/"') && !missingHtml.includes('<iframe'));
  assert.ok(!missingHtml.includes('youtube'));
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const html = renderToStaticMarkup(React.createElement(App));
  for (const path of ['/work', '/life', '/contact']) assert.ok(html.includes(`href="${path}"`));
  assert.equal((html.match(/class="stack-tooltip"/g) || []).length, 1, 'Toolkit must share one tooltip outside the key slots');
  for (const anchor of ['main', 'work', 'life', 'social', 'contact', 'logo']) {
    assert.ok(html.includes(`id="${anchor}"`), `Missing navigation target: ${anchor}`);
  }
  assert.ok(html.includes('aria-label="Open navigation"'), 'Missing pill trigger');
  assert.ok(html.includes('aria-expanded="false"'), 'Pill must start closed');
  assert.ok(html.includes('id="primary-navigation" hidden'), 'Closed navigation must be hidden');
  const { publications, photos } = await server.ssrLoadModule('/src/data/portfolio.js');
  for (const paper of publications) assert.ok(html.includes(paper.href), `Missing publication: ${paper.title}`);
  assert.ok(html.includes('Divergent Genomic Evolution in Astrocytomas and Oligodendrogliomas'));
  assert.ok(html.includes('Accepted · Nature') && html.includes('bioRxiv · Archived preprint'));
  assert.ok(html.includes('I might not be where I want to be yet, but <mark>I get closer</mark> <em>every day.</em>'));
  assert.ok(html.includes('class="contact-logo"') && !html.includes('class="research-placeholder"'));
  assert.ok(!html.includes('class="chapter-index"'), 'Main-page section eyebrow labels must stay removed');
  assert.ok(html.includes('href="https://doi.org/10.1016/j.esmorw.2025.100474" target="_blank" rel="noreferrer">View abstract'), 'ESMO abstract link must not change when publications are reordered');
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
  assert.equal((html.match(/class="glass-key"/g) || []).length, 12, 'Selected toolkit and communication keys must render');
  for (const skill of ['PyTorch', 'Foundation models', 'Multi-omics integration', 'Python', 'R', 'OpenCV', 'Cloud', 'Containers', 'HPCs', 'Presentation', 'Talks', 'Paper writing']) {
    assert.ok(html.includes(skill), `Missing stack skill: ${skill}`);
  }
  assert.ok(html.includes('id="open-source"') && html.includes('154') && html.includes('mahmoodlab/TRIDENT'), 'Current GitHub contribution section missing');
  assert.equal((html.match(/class="github-day github-level-/g) || []).length, 372, 'GitHub calendar or legend is incomplete');
  const documentHead = await readFile('index.html', 'utf8');
  assert.ok(documentHead.includes('/brand/signature-icons/favicon.svg'), 'Final vector favicon missing');
  assert.ok(html.includes('/brand/signature-black.svg'), 'Final vector header logo missing');
  for (const file of ['public/favicon.ico', 'public/brand/signature-white.svg', 'public/brand/signature-icons/apple-touch-icon.png']) await access(file);
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
