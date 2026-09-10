export const projects = [
  {
    id: "glioma",
    number: "01",
    title: "Glioma AI",
    tag: "Computational pathology",
    description: "Predicting molecular subtypes from H&E whole-slide images.",
    question:
      "What can tissue morphology tell us about the molecular features of a glioma?",
    work: "My doctoral work connects whole-slide imaging with molecular subtype prediction. I build workflows for tissue patching, feature extraction, weakly supervised learning, and attention-based interpretation.",
    approach:
      "Vision transformers · Multiple-instance learning · External cohort evaluation",
    note: "The linked conference abstract describes this research. Illustrations on this page are not model outputs; attention maps require careful biological interpretation.",
    links: [
      {
        label: "Read the conference abstract",
        href: "https://doi.org/10.1016/j.esmorw.2025.100474",
      },
    ],
  },
  {
    id: "spatial",
    number: "02",
    title: "Spatial biology",
    tag: "Morphology + molecular context",
    description:
      "Connecting the cells we see with their molecular surroundings.",
    question: "How do tissue structure and molecular context fit together?",
    work: "I explore how histology and spatial omics can be brought into a shared frame to study cancer ecotypes and the tumor microenvironment. This includes registration, cellular context, and visual quality control.",
    approach: "Image registration · Spatial omics · Cellular neighborhoods",
    note: "An ongoing research direction. The cell map shown here is an illustration, not a measured dataset or a reported result.",
    links: [
      {
        label: "Discuss this research",
        href: "mailto:contact@psgundla.com?subject=Spatial%20biology%20research",
      },
    ],
  },
  {
    id: "workflows",
    number: "03",
    title: "Reproducible workflows",
    tag: "Software + research practice",
    description: "Making analysis easier to run, inspect, and use again.",
    question:
      "How can an analysis remain useful beyond its first successful run?",
    work: "I work with Python, R, workflow tools, containers, and HPC to connect the steps of an analysis. My public projects include RNA-seq automation and a Nextflow workflow for splitting FASTA sequences with NCBI BLAST+ tooling.",
    approach: "Python & R · Snakemake & Nextflow · Containers · SLURM",
    note: "Repository documentation describes the scope and requirements of each workflow.",
    links: [
      {
        label: "RNA-Seq-Automation",
        href: "https://github.com/psgundla/RNA-Seq-Automation",
      },
      { label: "SplitSeq-nf", href: "https://github.com/psgundla/SplitSeq-nf" },
    ],
  },
];

export const publications = [
  {
    year: "2025",
    month: "Preprint",
    type: "Accepted · Nature",
    title: "Divergent Genomic Evolution in Astrocytomas and Oligodendrogliomas",
    venue: "bioRxiv · Archived preprint",
    href: "https://doi.org/10.1101/2025.07.11.664189",
    // Accepted title and journal status supplied by the author; DOI points to the earlier preprint.
  },
  {
    year: "2025",
    month: "November",
    type: "Conference abstract",
    title:
      "Genetic subtype prediction in diffuse gliomas with a vision transformer-based model",
    venue: "ESMO Real World Data and Digital Oncology · 278P",
    href: "https://doi.org/10.1016/j.esmorw.2025.100474",
  },
  {
    year: "2023",
    month: "November",
    published: "2023-11-01",
    type: "Journal article",
    title:
      "A comprehensive analysis of mRNA expression profiles of esophageal squamous cell carcinoma reveals downregulation of Desmoglein 1 and crucial genomic targets",
    venue: "Cancer Biomarkers · 38(4)",
    href: "https://doi.org/10.3233/CBM-230145",
  },
  {
    year: "2023",
    month: "August",
    published: "2023-08-28",
    type: "Journal article",
    title:
      "Global comparative transcriptomes uncover novel and population-specific gene expression in esophageal squamous cell carcinoma",
    venue: "Infectious Agents and Cancer · 18, 47",
    href: "https://doi.org/10.1186/s13027-023-00525-8",
  },
];

export const journey = [
  {
    city: "Hyderabad",
    country: "India",
    dates: "2015–2018",
    title: "Starting with mathematics.",
    institution: "Osmania University",
    story:
      "I studied mathematics, electronics, and computer science. This is where the computational side of my work began.",
    field: "Mathematics & computer science",
  },
  {
    city: "Manipal",
    country: "India",
    dates: "2018–2020",
    title: "Finding biology in the data.",
    institution: "Manipal Academy of Higher Education",
    story:
      "An MSc in Bioinformatics brought biology into the picture, connecting computation with questions about living systems.",
    field: "MSc Bioinformatics",
  },
  {
    city: "Grenoble",
    country: "France",
    dates: "2019–2020",
    title: "Turning toward cancer research.",
    institution: "Université Grenoble Alpes · IAB",
    story:
      "During my international M2 track and research internship, I studied signaling and omics in lung adenocarcinoma.",
    field: "Cancer biology & omics",
  },
  {
    city: "Paris",
    country: "France",
    dates: "2020–2023",
    title: "Building beyond the notebook.",
    institution: "Plantik Biosciences",
    story:
      "As an associate bioinformatician, I built genomics workflows and cloud infrastructure for plant-breeding research.",
    field: "Genomics in industry",
  },
  {
    city: "Essen",
    country: "Germany",
    dates: "July 2023–present",
    title: "Bringing tissue and code together.",
    institution: "University Hospital Essen · IKIM",
    story:
      "Today, my doctoral research connects tissue morphology, molecular features, and spatial context to study cancer.",
    field: "Doctoral research · Computational oncology",
  },
];

export const photos = [
  ["ramappa-temple", "Ramappa", "Ramappa Temple framed by trees at dusk"],
  ["charminar", "Hyderabad", "Charminar illuminated at night"],
  ["eiffel-tower", "Paris", "Eiffel Tower through tree branches at night"],
  [
    "arc-de-triomphe",
    "Arc de Triomphe",
    "Arc de Triomphe beneath an overcast sky",
  ],
  [
    "new-year-paris",
    "New Year in Paris",
    "New Year light show at the Arc de Triomphe",
  ],
  ["notre-dame", "Notre-Dame", "Notre-Dame Cathedral illuminated at night"],
  [
    "paris-from-above",
    "Paris, from above",
    "Night view across Paris from the Eiffel Tower",
  ],
  ["koblenz", "Koblenz", "The Rhine and Moselle meeting in Koblenz"],
  [
    "neuschwanstein",
    "Bavaria",
    "Neuschwanstein Castle above the Bavarian landscape",
  ],
];

// Curated post content. Twitter text is a summary; source links retain original attribution.
export const socialPosts = [
  {
    "platform": "linkedin",
    "url": "https://www.linkedin.com/posts/pranavswaroopgundla_esmomeritaward-esmoai25-278p-ugcPost-7394493698782384129-3pSo/",
    "author": "Pranav Swaroop Gundla",
    "initials": "PG",
    "text": "Honored to receive the #ESMOMeritAward and present our poster at the very first #ESMOAI25 Congress co-chaired by Rudolf Fehrmann, Mireia Crispin, and Jakob Nikolas Kather.\n\nGrateful for this opportunity and for the guidance of my mentors Emre Kocakavuk and Christian Reinhardt, as well as the incredible support from our team at Universitätsmedizin Essen | IKIM - Institute for Artificial Intelligence in Medicine.\n\nIt was a privilege to represent our lab and showcase our work “Genetic subtype prediction in diffuse gliomas using a vision transformer-based model.”\n\nOur study highlights how foundation models and attention-based multiple instance learning (MIL) can help decode the molecular landscape of gliomas directly from H&E-stained whole slide images — moving one step closer toward precision pathology.\n📌 Poster FPN: #278P\n\n\n#ESMOAI25 #CancerResearch #Oncology #ArtificialIntelligence #DigitalOncology #DigitalPathology #MedicalOncology"
  },
  {
    "platform": "twitter",
    "url": "https://x.com/imartincorena/status/2095432511593587188",
    "author": "Inigo Martincorena",
    "initials": "IM",
    "date": "3 September 2026 · @imartincorena",
    "summary": true,
    "text": "Inigo shares a collaborative NanoSeq study mapping somatic mutation rates and signatures across 53 tissues or cell types, led by Mimy Pham, Mike Stratton and Raheleh Rahbari."
  }
];
