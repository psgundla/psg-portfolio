import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { createServer, build } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { validateArticle, selectArticles, isBlogPath } = await server.ssrLoadModule('/src/data/dailyDigest.js');
  const posts = [];
  for (const status of ['draft', 'published']) {
    const folder = `content/daily-digest/${status === 'draft' ? 'drafts' : 'published'}`;
    for (const file of (await readdir(folder)).filter(file => file.endsWith('.json'))) {
      const post = validateArticle(JSON.parse(await readFile(`${folder}/${file}`, 'utf8')));
      assert.equal(post.status, status);
      assert.equal(file, `${post.date}.json`);
      posts.push(post);
    }
  }
  selectArticles(posts, true);
  const sample = { ...posts[0], status: 'draft' };
  assert.ok(sample.title);
  assert.equal(selectArticles([sample]).length, 0, 'Draft leaked into public selection');
  assert.equal(selectArticles([sample], true).length, 1);
  assert.throws(() => selectArticles([sample, sample], true), /Duplicate/);
  assert.throws(() => validateArticle({ ...sample, date: '2026-02-30' }), /date/);
  assert.throws(() => validateArticle({ ...sample, sources: [{ title: 'Bad', url: 'javascript:alert(1)' }] }), /source/);
  assert.ok(isBlogPath('/blog') && isBlogPath('/blog/daily-digest-2026-09-10/'));
  assert.ok(!isBlogPath('/blogger') && !isBlogPath('/blog/a/b'));
  const { default: Blog } = await server.ssrLoadModule('/src/components/Blog.jsx');
  const render = (pathname, data) => renderToStaticMarkup(React.createElement(Blog, { pathname, posts: data }));
  assert.ok(render('/blog', [sample]).includes(`/blog/${sample.slug}`));
  assert.ok(render(`/blog/${sample.slug}`, [sample]).includes('Draft preview'));
  const card = render(`/blog/${sample.slug}`, [sample]);
  assert.ok(card.includes('class="digest-card"') && card.includes('class="digest-card-summary"'));
  assert.ok(card.includes('<details class="digest-expand">') && !card.includes('<details class="digest-expand" open'), 'Editorial must start collapsed');
  assert.ok(render('/blog/missing', [sample]).includes('Page Not Found'));
  assert.ok(render('/blog', []).includes('first edition'));
  const escaped = render(`/blog/${sample.slug}`, [{ ...sample, intro: '<script>alert(1)</script>' }]);
  assert.ok(escaped.includes('&lt;script&gt;') && !escaped.includes('<script>'));
  // The SSR development server sets NODE_ENV; test the real production setting.
  process.env.NODE_ENV = 'production';
  const output = await build({ mode: 'production', logLevel: 'error', build: { write: false } });
  const code = output.output.filter(item => item.type === 'chunk').map(item => item.code).join('\n');
  for (const draft of posts.filter(post => post.status === 'draft')) assert.ok(!code.includes(draft.intro), 'Draft text leaked into production bundle');
  console.log('Daily Digest passed: schema, duplicate dates, draft exclusion, routes, escaping, and production bundle.');
} finally {
  await server.close();
}
