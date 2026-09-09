import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";

const frames = [
  {
    id: "2015-2018",
    month: "2015",
    year: "2015",
    city: "Hyderabad",
    title: "Math, logic, first questions",
    text: "At Osmania University, I learned how to reason with structure: math, electronics, and computing fundamentals that still shape how I design experiments.",
    tag: "Foundation",
  },
  {
    id: "2018-2020",
    month: "2018",
    year: "2018",
    city: "Manipal",
    title: "Bioinformatics as a language",
    text: "MSc in Bioinformatics moved me from isolated coding to biological questions, where patterns could be tested with evidence.",
    tag: "Education",
  },
  {
    id: "2019-2020",
    month: "2019",
    year: "2019",
    city: "Grenoble",
    title: "Cancer signals and data signals",
    text: "A research internship at IAB and Université Grenoble Alpes tied molecular signaling, omics, and computational design into practical biomedical questions.",
    note: "Early focus became reproducibility across cohorts instead of single-run results.",
    tag: "Research training",
  },
  {
    id: "2020-2023",
    month: "2020",
    year: "2020",
    city: "Paris",
    title: "Industry scale-up",
    text: "At Plantik Biosciences, genomics pipelines and cloud infrastructure taught me what reproducible production code looks like in a lab setting.",
    note: "Data moved from a notebook to an auditable pipeline.",
    tag: "Industry",
  },
  {
    id: "2023-07",
    month: "Jul",
    year: "2023",
    city: "Essen",
    title: "Doctoral mission starts",
    text: "At IKIM, Universitätsmedizin Essen, I entered computational oncology as a doctoral researcher.",
    note: "Project direction became histology, weak supervision, and molecular context.",
    tag: "Methods",
  },
  {
    id: "2024-01",
    month: "Jan",
    year: "2024",
    city: "Essen",
    title: "Research in progress",
    text: "I moved from isolated analyses to reproducible whole-slide workflows that survive reruns and external checks.",
    note: "Skills now run through containerized and reusable pipelines.",
    tag: "Development",
  },
  {
    id: "2025-03",
    month: "Mar",
    year: "2025",
    city: "ESMO AI",
    title: "Poster 278P",
    text: "Genetic glioma subtype prediction with vision transformers reached conference publication, with attention to interpretation and external cohort checks.",
    links: [
      {
        label: "Read the abstract",
        href: "https://doi.org/10.1016/j.esmorw.2025.100474",
      },
    ],
    tag: "Achievement",
  },
  {
    id: "2025-04",
    month: "Apr",
    year: "2025",
    city: "Recognition",
    title: "ESMO Merit Award",
    text: "Recognition from ESMO AI Congress shifted this work from private research thread to visible scientific direction.",
    tag: "Award",
  },
  {
    id: "2026-present",
    month: "Present",
    year: "2026",
    city: "Present",
    title: "Current frontier",
    text: "Current work blends tissue morphology, spatial context, and model interpretation to make decision support more reliable and explainable.",
    note: "Open doors: collaborations, reproducibility-first code sharing, translational workflows.",
    tag: "Now",
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=UzlYsbgAAAAJ&hl=en",
      },
    ],
  },
  {
    id: "2026-connect",
    month: "Now",
    year: "2026",
    city: "Connect",
    title: "Connect further",
    text: "If this story feels aligned to your next project, let’s open a conversation for reproducible ML workflows or translational collaboration.",
    tag: "Bridge",
    links: [
      {
        label: "Email",
        href: "mailto:contact@psgundla.com?subject=Portfolio%20collaboration",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/pranavswaroopgundla/",
      },
      {
        label: "GitHub",
        href: "https://github.com/psgundla",
      },
      {
        label: "ORCID",
        href: "https://orcid.org/0000-0002-3726-1445",
      },
    ],
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function JourneyCard({ frame, index, progress, active }) {
  const offset = useTransform(progress, value => index - value);
  const distance = useTransform(offset, value => Math.abs(value));
  const x = useTransform(offset, value => value * 86);
  const y = useTransform(offset, value => value * -54);
  const z = useTransform(distance, value => value * -260);
  const rotateY = useTransform(offset, value => value * -9);
  const rotateZ = useTransform(offset, value => value * 1.2);
  const scale = useTransform(distance, value => clamp(1 - value * 0.12, 0.84, 1));
  const opacity = useTransform(distance, value => clamp(1 - value * 1.55, 0, 1));
  const filter = useTransform(distance, value => `blur(${clamp(value * 8, 0, 10)}px)`);

  return (
    <div className="journey-immersive-card-slot" style={{ zIndex: active ? 10 : 1 }}>
      <motion.article
        className={`journey-immersive-card ${active ? "is-active" : ""}`}
        style={{ x, y, z, rotateY, rotateZ, scale, opacity, filter }}
        aria-current={active ? "step" : undefined}
        aria-hidden={!active}
      >
        <header className="journey-immersive-head">
          <div><p>{frame.month}</p><span>{frame.year}</span></div>
          <span>{frame.city}</span>
        </header>
        {frame.tag ? <span className="journey-immersive-tag">{frame.tag}</span> : null}
        <h3>{frame.title}</h3>
        <p>{frame.text}</p>
        {frame.note ? <p className="journey-immersive-note">{frame.note}</p> : null}
        {frame.links?.length ? (
          <div className="journey-immersive-links">
            {frame.links.map(post => <a href={post.href} key={post.href} target="_blank" rel="noreferrer">{post.label} ↗</a>)}
          </div>
        ) : null}
      </motion.article>
    </div>
  );
}

export default function Journey() {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const frameCount = frames.length;
  const activeFrame = frames[active];
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);
  const wheelAngle = useTransform(scrollYProgress, [0, 1], [150, -210]);
  const trackStyle = {
    "--frames": frameCount,
    "--track-height": `${100 + (frameCount - 1) * 72}vh`,
    "--track-height-mobile": `${100 + (frameCount - 1) * 86}vh`,
  };

  useMotionValueEvent(progress, "change", latest => {
    const next = clamp(Math.round(latest), 0, frameCount - 1);
    setActive(current => current === next ? current : next);
  });

  if (reduced) {
    return (
      <section id="about" className="journey-immersive" aria-labelledby="journey-title">
        <div className="journey-immersive-intro">
          <span className="chapter-index">Journey</span>
          <h2 id="journey-title">From bioinformatics to computational oncology.</h2>
          <p>Scroll animation reduced. Cards remain readable below.</p>
        </div>
        <div className="journey-immersive-static" role="list">
          {frames.map((frame) => (
            <article className="journey-immersive-card is-static" role="listitem" key={frame.id}>
              <div className="journey-immersive-head">
                <div>
                  <p>{frame.month}</p>
                  <span>{frame.year}</span>
                </div>
                <span>{frame.city}</span>
              </div>
              {frame.tag ? <p className="journey-immersive-kicker">{frame.tag}</p> : null}
              <h3>{frame.title}</h3>
              <p>{frame.text}</p>
              {frame.note ? <p className="journey-immersive-note">{frame.note}</p> : null}
              {frame.links?.length ? (
                <div className="journey-immersive-links">
                  {frame.links.map(post => <a href={post.href} key={post.href} target="_blank" rel="noreferrer">{post.label} ↗</a>)}
                </div>
              ) : null}
              <hr />
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="journey-immersive" aria-labelledby="journey-title">
      <div className="journey-immersive-intro">
        <span className="chapter-index">Journey</span>
        <h2 id="journey-title">From bioinformatics to computational oncology.</h2>
        <p>Month and year advance as each chapter comes into view.</p>
      </div>

      <div className="journey-immersive-track" ref={trackRef} style={trackStyle}>
        <div className="journey-immersive-stage">
          <aside className="journey-immersive-wheel" aria-hidden="true">
            <div className="journey-immersive-wheel-disc">
              <motion.div className="journey-immersive-wheel-ring" style={{ rotate: wheelAngle }}>
                {frames.map((frame, index) => (
                  <span
                    className={`journey-immersive-wheel-tick ${index === active ? "is-active" : ""}`}
                    key={frame.id}
                    style={{ "--tick-angle": `${(index / frameCount) * 360}deg` }}
                  />
                ))}
              </motion.div>
              <div className="journey-immersive-wheel-core" />
              <span className="journey-immersive-wheel-pointer" />
            </div>
            <p className="journey-immersive-wheel-label">
              <strong>{activeFrame.month}</strong>
              <span>{activeFrame.year}</span>
            </p>
          </aside>

          <div className="journey-immersive-viewport" aria-live="polite">
            <div className="journey-immersive-orbit">
              {frames.map((frame, index) => <JourneyCard frame={frame} index={index} progress={progress} active={index === active} key={frame.id} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
