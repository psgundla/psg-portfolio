import { FaLinkedin, FaGithub, FaOrcid, FaResearchgate, FaInstagram } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { LuPlay, LuPause, LuContainer, LuWorkflow, LuMic, LuPresentation, LuFileText, LuSun, LuMoon, LuCoffee, LuCodeXml, LuSearch } from "react-icons/lu";
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
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicTime, setMusicTime] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);
  const [rolesPaused, setRolesPaused] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const audio = useRef(null);
  const vinyl = useRef(null);
  const musicStarted = useRef(false);
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
    let disposed = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.8 || musicStarted.current) return;
      musicStarted.current = true;
      observer.disconnect();
      audio.current.play().catch(error => {
        if (disposed) return;
        if (error.name === "NotAllowedError") setMusicBlocked(true);
        else if (error.name !== "AbortError") setMusicError(true);
      });
    }, { threshold: 0.8 });
    observer.observe(vinyl.current);
    return () => { disposed = true; observer.disconnect(); };
  }, []);

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
            <span className="chapter-index">Tissue. Context. Code.</span>
            <p className="hero-summary">Understanding glioma through histology, spatial biology, and deep learning.</p>
            <span className="hero-location">Essen, Germany</span>
          </motion.div>
          <motion.figure className="hero-avatar" style={{ y: reduced ? 0 : heroY }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.8 }}>
            <img src={theme === "light" ? "/portfolio/avatar-light.png" : "/portfolio/avatar-dark.png"} width="1024" height="1536" fetchPriority="high" alt="Illustrated portrait of Pranav Swaroop Gundla" />
          </motion.figure>
          <aside className="hero-editor-note" aria-label="About me">
            <span className="chapter-index">A few sides of me</span>
            <div className={`role-wheel${rolesPaused ? " is-paused" : ""}`} role="button" tabIndex={0}
              aria-label={rolesPaused ? "Resume role rotation" : "Pause role rotation"} aria-pressed={rolesPaused}
              onClick={() => setRolesPaused(!rolesPaused)} onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setRolesPaused(!rolesPaused); }
              }}>
              <ul className="role-track" aria-hidden="true">{["AI researcher", "Interdisciplinary enthusiast", "Hobbyist", "AI researcher", "Interdisciplinary enthusiast", "Hobbyist"].map((role, index) => <li key={index}>{role}</li>)}</ul>
            </div>
            <span className="role-accessible">AI researcher, Interdisciplinary enthusiast, Hobbyist.</span>
          </aside>
        </section>
        <ResearchNotebook onExplore={setSelectedProject} />
        <motion.section className="section research-record" aria-label="Publications and methods" {...reveal}>
          <ResearchRecord />
          <section className="technical-stack" aria-labelledby="technical-stack-title">
          <header>
            <span className="chapter-index">Brew. Build. Discover.</span>
            <h2 id="technical-stack-title">Caffeinated <em>Stack</em></h2>
            <div className="caffeinated-icons" role="img" aria-label="Coffee, code, and research">
              <span><LuCoffee aria-hidden="true" /></span><b aria-hidden="true">+</b>
              <span><LuCodeXml aria-hidden="true" /></span><b aria-hidden="true">+</b>
              <span><LuSearch aria-hidden="true" /></span>
            </div>
            <p className="caffeinated-note">Fuelled by coffee. Built with code. Shared through science.</p>
          </header>
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
              {[...photos, ...photos].map(([file, place, alt], index) => {
                const clone = index >= photos.length;
                return <figure className="photo insta-card" key={`${file}-${clone ? "clone" : "original"}`} data-clone={clone || undefined} aria-hidden={clone || undefined}>
                  <img src={`/portfolio/photos/${file}.webp`} alt={clone ? "" : alt} decoding="async" width="600" height="800" />
                  <figcaption className="insta-footer">
                    <a href="https://www.instagram.com/im_pranavgundla/" target="_blank" rel="noreferrer" tabIndex={clone ? -1 : 0} aria-label={`View @im_pranavgundla on Instagram — ${place}`}>
                      <img className="insta-avatar" src={theme === "dark" ? "/portfolio/avatar-dark.png" : "/portfolio/avatar-light.png"} alt="" width="44" height="44" />
                      <span className="insta-identity"><strong>@im_pranavgundla</strong><span>{place}</span></span>
                      <FaInstagram aria-hidden="true" />
                    </a>
                  </figcaption>
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
          <h2 id="contact-title">Let’s <span className="contact-accent">Connect</span></h2>
          <a className="contact-email" href="mailto:contact@psgundla.com">contact@psgundla.com</a>
          </div>
          <aside className="contact-profile-card music-card" aria-labelledby="music-title">
            <span className="chapter-index">Off the clock · on repeat</span>
            <div ref={vinyl} className={`vinyl-deck${musicPlaying ? " is-playing" : ""}`} role="img" aria-label="Vintage vinyl record with a red center label and silver tonearm">
              <div className="vinyl-record"><div className="vinyl-label"><span>PSG</span><small>SIDE A · DAILY ROTATION</small></div></div>
              <div className="vinyl-arm" />
            </div>
            <h3 id="music-title">Always a soundtrack.</h3>
            <p className="music-fact">Fun fact: I listen to music for more than <strong>7 hours a day.</strong></p>
            <p className="music-track">Piano background music · Delosound</p>
            <div className="soundtrack-controls">
              <button type="button" className="soundtrack-toggle" aria-label={musicPlaying ? "Pause soundtrack" : "Play soundtrack"}
                onClick={() => {
                  if (!audio.current.paused) audio.current.pause();
                  else audio.current.play().catch(error => {
                    if (error.name === "NotAllowedError") setMusicBlocked(true);
                    else if (error.name !== "AbortError") setMusicError(true);
                  });
                }}>
                {musicPlaying ? <LuPause aria-hidden="true" /> : <LuPlay aria-hidden="true" />}
              </button>
              <div className="soundtrack-seek">
                <div className={`music-waves${musicPlaying ? " is-playing" : ""}`} aria-hidden="true">
                  {Array.from({ length: 36 }, (_, index) => (
                    <span key={index} className={musicDuration && index / 36 <= musicTime / musicDuration ? "is-elapsed" : undefined}
                      style={{ height: `${18 + Math.abs(Math.sin(index * 1.7)) * 70}%`, animationDelay: `${-index * .13}s` }} />
                  ))}
                </div>
                <input type="range" min="0" max={musicDuration || 1} step="0.1" value={musicTime} disabled={!musicDuration}
                  aria-label="Seek soundtrack" aria-valuetext={`${Math.floor(musicTime)} of ${Math.floor(musicDuration)} seconds`}
                  onChange={event => { const time = Number(event.target.value); audio.current.currentTime = time; setMusicTime(time); }} />
              </div>
            </div>
            <audio ref={audio} preload="metadata"
              onLoadedMetadata={event => { const duration = event.currentTarget.duration; setMusicDuration(Number.isFinite(duration) ? duration : 0); }}
              onTimeUpdate={event => setMusicTime(event.currentTarget.currentTime)}
              src="/audio/delosound-piano-background-music-398277.mp3"
              onPlay={() => { musicStarted.current = true; }}
              onPlaying={() => { setMusicPlaying(true); setMusicBlocked(false); }} onPause={() => setMusicPlaying(false)}
              onWaiting={() => setMusicPlaying(false)} onEnded={() => setMusicPlaying(false)}
              onError={() => { setMusicPlaying(false); setMusicError(true); }} />
            {musicBlocked && !musicError && <p className="music-track" role="status">Press Play to start the soundtrack.</p>}
            {musicError && <p role="alert">Audio could not load. Please reload and try again.</p>}
          </aside>
            <nav className="contact-profiles" aria-label="External profiles">
              <a href="https://linkedin.com/in/pranavswaroopgundla/" target="_blank" rel="noreferrer" className="raised-glass brand-linkedin" aria-label="LinkedIn" title="LinkedIn"><FaLinkedin aria-hidden="true" /></a>
              <a href="https://github.com/psgundla" target="_blank" rel="noreferrer" className="raised-glass brand-github" aria-label="GitHub" title="GitHub"><FaGithub aria-hidden="true" /></a>
              <a href="https://orcid.org/0000-0002-3726-1445" target="_blank" rel="noreferrer" className="raised-glass brand-orcid" aria-label="ORCID" title="ORCID"><FaOrcid aria-hidden="true" /></a>
              <a href="https://researchgate.net/profile/Pranav-Swaroop-Gundla" target="_blank" rel="noreferrer" className="raised-glass brand-researchgate" aria-label="ResearchGate" title="ResearchGate"><FaResearchgate aria-hidden="true" /></a>
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
