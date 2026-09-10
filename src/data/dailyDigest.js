// Drafts are loaded only by the local development server.
const published = import.meta.glob('../../content/daily-digest/published/*.json', { eager: true, import: 'default' });
const drafts = import.meta.env.DEV
  ? import.meta.glob('../../content/daily-digest/drafts/*.json', { eager: true, import: 'default' })
  : {};

export function validateArticle(post) {
  if (!post || !/^\d{4}-\d{2}-\d{2}$/.test(post.date) || Number.isNaN(Date.parse(post.date)) || new Date(post.date).toISOString().slice(0, 10) !== post.date) throw new Error('Invalid article date');
  if (post.slug !== `daily-digest-${post.date}`) throw new Error('Slug must match the digest date');
  for (const key of ['title', 'summary', 'intro']) if (typeof post[key] !== 'string' || !post[key].trim()) throw new Error(`Missing ${key}`);
  if (!['draft', 'published'].includes(post.status)) throw new Error('Invalid article status');
  if (!Array.isArray(post.sections) || !post.sections.length) throw new Error('Article needs sections');
  if (!Array.isArray(post.sources) || !post.sources.length) throw new Error('Article needs primary sources');
  for (const source of post.sources) {
    const url = new URL(source.url);
    if (url.protocol !== 'https:' || url.username || url.password || !source.title?.trim()) throw new Error('Invalid source');
  }
  for (const section of post.sections) {
    if (!section.heading?.trim() || !Array.isArray(section.paragraphs) || !section.paragraphs.length || section.paragraphs.some(text => typeof text !== 'string' || !text.trim())) throw new Error('Invalid article section');
  }
  return post;
}

export function selectArticles(posts, includeDrafts = false) {
  const dates = new Set();
  return posts.map(validateArticle).filter(post => includeDrafts || post.status === 'published').map(post => {
    if (dates.has(post.date)) throw new Error(`Duplicate digest date: ${post.date}`);
    dates.add(post.date);
    return post;
  }).sort((a, b) => b.date.localeCompare(a.date));
}

export const articles = selectArticles([...Object.values(published), ...Object.values(drafts)], import.meta.env.DEV);

export function isBlogPath(path) {
  return /^\/blog(?:\/[a-z0-9-]+)?\/?$/.test(path);
}
