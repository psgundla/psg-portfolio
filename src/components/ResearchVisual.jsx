const illustrations = {
  glioma: {
    position: "0%",
    description:
      "Ink and watercolor study of tissue slides and cellular architecture",
  },
  spatial: {
    position: "50%",
    description:
      "Ink and watercolor study of cells and their spatial relationships",
  },
  workflows: {
    position: "100%",
    description:
      "Ink and watercolor research notebook and computational workflow",
  },
};

export default function ResearchVisual({ kind, className = "" }) {
  const illustration = illustrations[kind] || illustrations.workflows;
  return (
    <div className={`research-plate ${className}`}>
      <img
        src="/portfolio/research-studies.png"
        alt={illustration.description}
        loading="lazy"
        width="2172"
        height="724"
        style={{ objectPosition: `${illustration.position} center` }}
      />
    </div>
  );
}
