import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { LuContainer, LuWorkflow, LuMic, LuPresentation, LuFileText, LuSun, LuMoon } from "react-icons/lu";
import { SiDocker, SiGit, SiLinux, SiNextflow, SiPython, SiPytorch, SiR } from "react-icons/si";
import NavPill from "./components/NavPill";
import MorphingCursor from "./components/MorphingCursor";
import SocialPosts from "./components/SocialPosts";
import ResearchNotebook from "./components/ResearchNotebook";
import GitHubContributions from "./components/GitHubContributions";
import ResearchRecord from "./components/ResearchRecord";
import { photos } from "./data/portfolio";
import "./styles/Portfolio.css";
import "./styles/Editorial.css";

const stackGroups = [
  {
    label: "Models and data",
    badges: [
      ["Python", SiPython],
      ["PyTorch", SiPytorch],
      ["R", SiR],
    ],
  },
  {
    label: "Research workflows",
    badges: [
      ["Snakemake", LuWorkflow],
      ["Nextflow", SiNextflow],
      ["Git", SiGit],
    ],
  },
  {
    label: "Compute and environments",
    badges: [
      ["Linux", SiLinux],
      ["Docker", SiDocker],
      ["Apptainer", LuContainer],
    ],
  },
];

function initialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* Fall back to the system preference. */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [selectedProject, setSelectedProject] = useState(null);
  const dialog = useRef(null);
  const returnFocus = useRef(null);
  const hero = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 45]);
  const reveal = { initial: { opacity: 1, y: reduced ? 0 : 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#111A29" : "#F4F5F7");
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* Keep the session theme. */ }
  }, [theme]);

  useEffect(() => {
    if (!selectedProject) return;
    const element = dialog.current;
    returnFocus.current = document.activeElement;
    element.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
      if (element.open) element.close();
      returnFocus.current?.focus();
    };
  }, [selectedProject]);

  return (
    <div className="site-shell">
      <MorphingCursor />
      <a className="skip-link" href="#main">Skip to content</a>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#main" aria-label="Pranav Swaroop Gundla, home">
          <img src={`/brand/psg-final/psg-${theme === "dark" ? "white" : "black"}.svg`} width="1600" height="864" alt="" />
        </a>
        <NavPill />
        <div className="header-actions">
          <button type="button" className="theme-toggle" aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? <LuMoon size={20} aria-hidden="true" /> : <LuSun size={20} aria-hidden="true" />}</button>
          <a className="header-cv" href="/CV-Pranav-Swaroop-Gundla.pdf" target="_blank" rel="noreferrer">CV ↗</a>

        </div>
      </header>
      <main id="main">
        <section className="hero editorial-hero" ref={hero} aria-labelledby="hero-title">
          <h1 className="hero-masthead" id="hero-title"><span>Pranav Swaroop</span><span>Gundla</span></h1>
          <motion.div className="hero-copy" initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.65 }}>
            <p className="eyebrow">Computational oncology researcher</p>
            <p className="hero-summary">Doctoral researcher building deep learning strategies for histology, spatial biology, and understanding glioma TMEs.</p>
          </motion.div>
          <motion.figure className="hero-avatar" style={{ y: reduced ? 0 : heroY }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.8 }}>
            <img src={theme === "light" ? "/portfolio/avatar-light.png" : "/portfolio/avatar-dark.png"} width="1024" height="1536" fetchPriority="high" alt="Illustrated portrait of Pranav Swaroop Gundla" />
          </motion.figure>
          <aside className="hero-editor-note"><span className="chapter-index">Tissue. Context. Code.</span><p>Understanding glioma through histology, spatial biology, and deep learning.</p><span className="hero-location">Essen, Germany</span></aside>
          <div className="hero-colophon"><span>Computational oncology / Selected work</span><a href="#work">Read on ↓</a></div>
        </section>
        <ResearchNotebook onExplore={setSelectedProject} />
        <motion.section className="section research-record" aria-label="Publications and methods" {...reveal}>
          <ResearchRecord />
          <section className="technical-stack" aria-labelledby="technical-stack-title">
          <header><span className="chapter-index">Skills & methods</span><h2 id="technical-stack-title">Technical stack</h2></header>
          <div className="stack-grid" aria-label="Research technology stack">
            {stackGroups.map((group, index) => <motion.section className="stack-card" key={group.label}
              whileHover={reduced ? {} : { y: -6, rotate: index === 1 ? 0 : index ? 1 : -1 }}>
              <h3>{group.label}</h3>
              <div className="stack-icons">{group.badges.map(([label, Icon]) => <span className="stack-icon" aria-label={label} title={label} key={label}><Icon aria-hidden="true" /></span>)}</div>
            </motion.section>)}
            <section className="stack-card communication-skills"><h3>Science communication</h3><ul><li><LuFileText aria-hidden="true" />Scientific writing</li><li><LuPresentation aria-hidden="true" />Research posters</li><li><LuMic aria-hidden="true" />Talks & presentations</li></ul></section>
          </div>
          </section>
        </motion.section>
        <GitHubContributions />
        <section id="life" className="section life" aria-labelledby="life-title">
          <div className="life-heading"><div><h2 id="life-title">Life, <em>in frames.</em></h2><p>Places photographed between research days.</p></div></div>
          <div className="photo-reel" tabIndex="0" role="region" aria-label="Looping photo reel of places">
            <div className="photo-reel-track">
              {[...photos, ...photos].map(([file, , alt], index) => {
                const clone = index >= photos.length;
                return <figure className="photo" key={`${file}-${clone ? "clone" : "original"}`} data-clone={clone || undefined} aria-hidden={clone || undefined}>
                  <img src={`/portfolio/photos/${file}.webp`} alt={clone ? "" : alt} decoding="async" width="600" height="800" />
                </figure>;
              })}
            </div>
          </div>
          <motion.article className="bunker-card" whileHover={reduced ? {} : { y: -5 }}>
            <div className="bunker-thumbnail"><img src="/portfolio/bunker-preview.png" alt="BUNKER techno sequencer interface with synthesizer and drum controls" width="1440" height="960" loading="lazy" /></div>
            <span className="eyebrow">Side project</span><h3>BUNKER</h3><p>Browser-based techno sequencer built with Web Audio.</p><a className="text-link" href="/bunker/index.html">Open sequencer ↗</a>
          </motion.article>
        </section>
        <SocialPosts />
        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="contact-invitation"><p className="eyebrow">Have a question or a project in mind?</p>
          <h2 id="contact-title">Let’s Connect</h2>
          <a className="contact-email" href="mailto:contact@psgundla.com">contact@psgundla.com</a>
          </div>
          <aside className="contact-profile-card" aria-label="Contact card">
            <span className="chapter-index">@researcher</span><h3>Pranav Swaroop Gundla</h3>
            <dl><div><dt>field</dt><dd>Computational oncology</dd></div><div><dt>based in</dt><dd>Essen, Germany</dd></div><div><dt>email</dt><dd><a href="mailto:contact@psgundla.com">contact@psgundla.com ↗</a></dd></div><div><dt>ORCID</dt><dd><a href="https://orcid.org/0000-0002-3726-1445" target="_blank" rel="noreferrer">0000-0002-3726-1445 ↗</a></dd></div></dl>
          </aside>
            <nav className="contact-profiles" aria-label="External profiles">
              <a href="https://linkedin.com/in/pranavswaroopgundla/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/psgundla" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://orcid.org/0000-0002-3726-1445" target="_blank" rel="noreferrer">ORCID ↗</a>
              <a href="https://researchgate.net/profile/Pranav-Swaroop-Gundla" target="_blank" rel="noreferrer">ResearchGate ↗</a>
            </nav>
        </section>
      </main>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Pranav Swaroop Gundla</span><a href="#main">Back to top ↑</a></footer>
      <dialog className="project-dialog" ref={dialog} aria-labelledby="project-dialog-title" onClose={() => setSelectedProject(null)}
        onClick={event => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect();
            if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
          }
        }}>
        {selectedProject && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.2 }}>
          <div className="dialog-top"><span className="eyebrow">{selectedProject.tag}</span><button type="button" className="dialog-close" onClick={() => dialog.current.close()} aria-label="Close project details">Close ×</button></div>
          <h2 id="project-dialog-title">{selectedProject.title}</h2><p className="project-question">{selectedProject.question}</p>
          <h3>My work</h3><p>{selectedProject.work}</p><h3>Approach</h3><p>{selectedProject.approach}</p>
          <div className="project-note">{selectedProject.note}</div>
          <div className="project-links">{selectedProject.links.map(link => <a className="text-link" href={link.href} key={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{link.label} ↗</a>)}</div>
        </motion.div>}
      </dialog>
    </div>
  );
}
