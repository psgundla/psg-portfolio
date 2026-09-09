import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { socialPosts } from "../data/portfolio";

const profiles = [
  { platform: "linkedin", label: "LinkedIn", mark: "in", href: "https://linkedin.com/in/pranavswaroopgundla/" },
  { platform: "twitter", label: "X", mark: "X", href: "https://x.com/im_pranavgundla" },
];

function PostCard({ post, profile }) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const reduced = useReducedMotion();
  const long = post.text.length > 280;
  return (
    <motion.article className="social-post" whileHover={reduced ? {} : { y: -4 }}>
      <header className="social-post-author">
        <span className="social-avatar" aria-hidden="true">{post.initials || "PG"}</span>
        <div><strong>{post.author || "Pranav Swaroop Gundla"}</strong><span>{post.date || profile.label}</span></div>
        <span className="social-mark" aria-label={profile.label}>{profile.mark}</span>
      </header>
      {post.summary && <p className="eyebrow">Post summary</p>}
      <p className="social-post-text" id={contentId}>{long && !expanded ? `${post.text.slice(0, 280)}…` : post.text}</p>
      {long && <button className="social-expand" type="button" aria-expanded={expanded} aria-controls={contentId} onClick={() => setExpanded(!expanded)}>{expanded ? "Show less" : "Read more"}</button>}
      {post.image && <img className="social-post-image" src={post.image.src} alt={post.image.alt} loading="lazy" />}
      <a className="social-post-source" href={post.url} target="_blank" rel="noreferrer">View post on {profile.label} <span aria-hidden="true">↗</span></a>
    </motion.article>
  );
}

export default function SocialPosts({ posts = socialPosts }) {
  return (
    <section id="social" className="section social" aria-labelledby="social-title">
      <div className="section-heading"><span className="chapter-index">05 / In conversation</span><h2 id="social-title">Research & <em>conversations.</em></h2><p>Posts and conversations from LinkedIn and X.</p></div>
      <div className="social-columns">{profiles.map(profile => {
        const selected = posts.filter(post => post.platform === profile.platform);
        return <div className="social-column" key={profile.platform}>
          <div className="social-column-heading"><h3>{profile.label}</h3></div>
          {selected.length ? selected.map(post => <PostCard key={post.url} post={post} profile={profile} />) : <div className="social-empty"><span className="social-mark" aria-hidden="true">{profile.mark}</span><p>Selected posts coming soon.</p><a className="text-link" href={profile.href} target="_blank" rel="noreferrer">Find me on {profile.label} ↗</a></div>}
        </div>;
      })}</div>
    </section>
  );
}
