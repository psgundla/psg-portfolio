import { LuNotebookPen } from "react-icons/lu";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "../data/portfolio";
export default function ResearchNotebook({ onExplore }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const project = projects[active];
  return (
    <section id="work" className="section research" aria-labelledby="work-title">
      <div className="section-heading">
        <h2 id="work-title">Research focus</h2>
      </div>
      <div className="notebook">
        <div className="notebook-index" role="group" aria-label="Choose a research project">
          {projects.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={active === index}
              aria-controls="research-page" onClick={() => setActive(index)}>
              <span className="index-number">{item.number}</span>
              <span>{item.title}<small>{item.tag}</small></span>
            </button>
          ))}
        </div>
        <motion.div id="research-page" className="notebook-page" data-project={project.id} key={project.id}
          initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.35 }}>
          <div className="notebook-copy">
            <span className="eyebrow">Research question</span>
            <h3>{project.question}</h3>
            <p>{project.description}</p>
            <div className="method-tags">{project.approach.split(" · ").map(method => <span key={method}>{method}</span>)}</div>
            <motion.button className="text-link raised-glass" type="button" whileHover={reduced ? {} : { x: 4 }}
              whileTap={reduced ? {} : { scale: 0.98 }} onClick={() => onExplore(project)}
              aria-label={`Explore the work: ${project.title}`}>
              <LuNotebookPen aria-hidden="true" /><span>Open research notes</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
