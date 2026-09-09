const activity = {
  "2025-10-09": 4, "2025-10-22": 1, "2025-10-31": 2, "2025-11-10": 1,
  "2025-11-17": 4, "2025-12-08": 1, "2025-12-09": 18, "2025-12-11": 21,
  "2025-12-12": 2, "2025-12-14": 2, "2026-01-03": 18, "2026-01-08": 5,
  "2026-03-02": 1, "2026-03-03": 1, "2026-03-09": 5, "2026-03-13": 1,
  "2026-05-27": 12, "2026-06-02": 5, "2026-06-16": 1, "2026-07-13": 1,
  "2026-07-17": 4, "2026-07-27": 1, "2026-07-29": 1, "2026-08-08": 19,
  "2026-08-29": 7, "2026-08-31": 1, "2026-09-02": 3, "2026-09-04": 4,
  "2026-09-05": 2, "2026-09-06": 3, "2026-09-07": 3,
};

const repositories = [
  { name: "mahmoodlab/TRIDENT", description: "Toolkit for large-scale whole-slide image processing.", language: "Python", stars: 626, contribution: "Pull request", url: "https://github.com/mahmoodlab/TRIDENT" },
  { name: "mahmoodlab/HEST", description: "Integrating histology and spatial transcriptomics.", language: "Jupyter Notebook", stars: 436, contribution: "Pull request", url: "https://github.com/mahmoodlab/HEST" },
  { name: "imageio/imageio", description: "Python library for reading and writing image data.", language: "Python", stars: 1712, contribution: "Pull request", url: "https://github.com/imageio/imageio" },
  { name: "scientific-python/cookie", description: "Scientific Python library development guide and cookiecutter.", language: "Python", stars: 410, contribution: "Commit + pull request", url: "https://github.com/scientific-python/cookie" },
];

const days = Array.from({ length: 367 }, (_, index) => {
  const date = new Date(Date.UTC(2025, 8, 7 + index)).toISOString().slice(0, 10);
  return { date, count: activity[date] || 0 };
});

function level(count) {
  if (!count) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 12) return 3;
  return 4;
}

export default function GitHubContributions() {
  return (
    <section id="open-source" className="section github-section" aria-labelledby="github-title">
      <div className="github-heading">
        <div>
          <span className="chapter-index">Open source</span>
          <h2 id="github-title">Open-source <em>contributions.</em></h2>
        </div>
        <p className="github-total"><strong>154</strong><span>contributions in the last year</span></p>
      </div>

      <div className="github-overview">
      <div className="github-calendar-panel">
        <h3 className="github-panel-title">Contribution activity</h3>
        <div className="github-calendar-scroll" role="img" aria-label="154 GitHub contributions from September 2025 to September 2026">
          <div className="github-months" aria-hidden="true"><span>Sep</span><span>Nov</span><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span></div>
          <div className="github-calendar" aria-hidden="true">
            {days.map(({ date, count }) => <span className={`github-day github-level-${level(count)}`} key={date} title={`${date}: ${count} contribution${count === 1 ? "" : "s"}`} />)}
          </div>
        </div>
        <div className="github-legend" aria-hidden="true"><span>Less</span>{[0, 1, 2, 3, 4].map(item => <i className={`github-day github-level-${item}`} key={item} />)}<span>More</span></div>
      </div>

      <div className="github-repositories">
        {repositories.map(repo => <a className="github-repo" href={repo.url} target="_blank" rel="noreferrer" key={repo.name}>
          <span className="github-repo-mark" aria-hidden="true">⌁</span>
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          <div><span>{repo.contribution}</span><span>{repo.language}</span><span>★ {repo.stars.toLocaleString("en")}</span></div>
        </a>)}
      </div>

      </div>

      <div className="github-footer"><span>Public GitHub activity · updated 8 September 2026</span><a className="text-link" href="https://github.com/psgundla" target="_blank" rel="noreferrer">View current profile ↗</a></div>
    </section>
  );
}
