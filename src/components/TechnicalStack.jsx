import { useEffect, useId, useRef, useState } from "react";
import { SiPytorch, SiOpencv, SiPython, SiR } from "react-icons/si";
import { LuLayers, LuCombine, LuServer, LuContainer, LuCloud, LuPresentation, LuMic, LuFileText } from "react-icons/lu";
import "../styles/TechnicalStack.css";

const keys = [
  ["PyTorch", SiPytorch, "violet", "Deep learning for image representations and predictive models."],
  ["Foundation models", LuLayers, "violet", "Pretrained representations for computational pathology."],
  ["Multi-omics integration", LuCombine, "green", "Connecting transcriptomics, genomics, and spatial omics."],
  ["Python", SiPython, "amber", "Scientific computing, data analysis, and machine learning."],
  ["R", SiR, "amber", "Statistical analysis, bioinformatics, and visualization."],
  ["OpenCV", SiOpencv, "cyan", "Image processing and feature extraction for research."],
  ["Cloud", LuCloud, "blue", "Research computing across GCP, AWS, and Azure."],
  ["Containers", LuContainer, "blue", "Reproducible environments with Docker and Apptainer/Singularity."],
  ["HPCs", LuServer, "blue", "Large-scale research workloads and SLURM job scheduling."],
  ["Presentation", LuPresentation, "rose", "Research posters and visual presentations of scientific results."],
  ["Talks", LuMic, "rose", "Sharing research through conference talks and scientific discussions."],
  ["Paper writing", LuFileText, "rose", "Scientific manuscripts, methods, and clear research narratives."],
];

export default function TechnicalStack() {
  const [active, setActive] = useState(null);
  const root = useRef(null);
  const tooltipId = useId();
  const selected = keys.find(([label]) => label === active);
  useEffect(() => {
    const dismiss = event => { if (event.key === "Escape") setActive(null); };
    const dismissOutside = event => { if (!root.current?.contains(event.target)) setActive(null); };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismissOutside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", dismissOutside);
    };
  }, []);
  return <div className="liquid-stack" ref={root} onPointerLeave={() => { if (!root.current?.querySelector(".glass-key:focus-visible")) setActive(null); }}>
    <div className="stack-console"><span><span className="stack-led" /> RESEARCH TOOLKIT</span><span>Hover, focus, or tap a key</span></div>
    <div className="glass-keyboard" role="group" aria-label="Research and science communication toolkit">
      <div className="keyboard-keys">{keys.map(([label, Icon, color]) => <div className={`stack-key-slot keys-${color}`} key={label}>
        <button type="button" className="glass-key" aria-describedby={active === label ? tooltipId : undefined} data-active={active === label || undefined}
          onPointerEnter={event => { if (event.pointerType !== "touch") setActive(label); }}
          onFocus={() => setActive(label)} onBlur={() => setActive(null)} onClick={() => setActive(label)}>
          <Icon aria-hidden="true" /><span>{label}</span>
        </button>

      </div>)}</div>
      <div className="stack-tooltip" id={tooltipId} role="tooltip" hidden={!selected} key={active}>
        <strong>{selected?.[0]}</strong><p>{selected?.[3]}</p>
      </div>
    </div>
  </div>;
}
