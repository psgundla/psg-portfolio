import { useEffect } from 'react';
import { articles } from '../data/dailyDigest';
import NotFound from './NotFound';
import '../styles/Blog.css';

const formatDate = date => new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));

function DigestCard({ post, children }) {
  return <article className="digest-card">
    <div className="digest-visual" aria-hidden="true">
      <span className="digest-orbit" /><span className="digest-orbit digest-orbit-inner" />
      <span className="digest-core">↗</span><span className="digest-spark" />
    </div>
    <div className="digest-card-content">
      <p className="chapter-index"><time dateTime={post.date}>{formatDate(post.date)}</time>{post.status === 'draft' ? ' · Draft preview' : ' · Daily Digest'}</p>
      <h2>{children ? post.title : <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">{post.title}</a>}</h2>
      <p className="digest-card-summary">{post.summary}</p>
      {children || <a className="digest-card-link" href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">Explore the story <span aria-hidden="true">↗</span></a>}
    </div>
  </article>;
}

export default function Blog({ pathname = window.location.pathname, posts = articles }) {
  const slug = pathname.split('/').filter(Boolean)[1];
  const article = slug ? posts.find(post => post.slug === slug) : null;
  useEffect(() => {
    document.title = `${article?.title || (slug ? 'Page not found' : 'Daily Digest — Blog')} | Pranav Swaroop Gundla`;
  }, [article, slug]);
  if (slug && !article) return <NotFound />;

  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="text-link" href="/" target="_blank" rel="noreferrer">← Portfolio</a><nav className="header-actions" aria-label="Blog navigation"><a href="/blog" target="_blank" rel="noreferrer" aria-current={!slug ? 'page' : undefined}>Blog</a><a href="/#contact" target="_blank" rel="noreferrer">Contact ↗</a></nav></header>
    <main id="main" className="digest-main">
      <header className="digest-heading"><span className="chapter-index">The reading room</span><h1>Daily Digest<span aria-hidden="true">.</span></h1>
        <p>A little signal. A fresh perspective. Something worth your time.</p>
      </header>
      {article ? <DigestCard post={article}><details className="digest-expand">
        <summary><span>Read the editorial</span><span className="digest-expand-icon" aria-hidden="true">+</span></summary>
        <div className="digest-article">
        <p className="digest-intro">{article.intro}</p>
        {article.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>)}
        <section><h2>Sources & further reading</h2><ol>{article.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></li>)}</ol></section>
        <p className="digest-disclosure">AI-assisted editorial synthesis of Morning AI News Radar. Source claims and proposed experiments are distinct; this is not a report of experiments performed.</p>
        <a className="text-link" href="/blog" target="_blank" rel="noreferrer">← All Daily Digest posts</a>
        </div>
      </details></DigestCard> : <div className="digest-list">{posts.length ? posts.map(post => <DigestCard key={post.slug} post={post} />) : <p>Daily Digest articles are on their way. Check back for the first edition.</p>}</div>}
    </main>
    <footer className="site-footer"><span>Pranav Swaroop Gundla · Daily Digest</span><a href="/" target="_blank" rel="noreferrer">Portfolio ↗</a></footer>
  </div>;
}
