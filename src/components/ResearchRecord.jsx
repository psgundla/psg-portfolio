import { SiGooglescholar } from "react-icons/si";
import { LuMic, LuPresentation, LuUsersRound } from "react-icons/lu";
import AchievementAward from "./AchievementAward";
import { publications } from "../data/portfolio";

export default function ResearchRecord() {
  return <div className="research-board">
    <div className="record-timeline">
    <header className="record-banner">
      <div><span className="chapter-index">Research record</span><h2>Research in print &amp; in person</h2></div>
    </header>
    <div className="record-columns">
      <section className="record-papers" aria-labelledby="record-publications">
        <header><span className="chapter-index">01 / Selected research</span><h3 id="record-publications">Publications</h3></header>
        <div className="publications">{publications.map(paper => <a className="publication" key={paper.href} href={paper.href} target="_blank" rel="noreferrer">
          <span className="publication-year">{paper.year}<small>{paper.month}</small></span><div><span className="publication-type">{paper.type}</span><h3>{paper.title}</h3><p>{paper.venue}</p></div>
        </a>)}</div>
        <a className="text-link scholar-glass raised-glass brand-scholar" aria-label="Google Scholar" title="Google Scholar" href="https://scholar.google.com/citations?user=UzlYsbgAAAAJ&hl=en" target="_blank" rel="noreferrer"><SiGooglescholar aria-hidden="true" /></a>
      </section>
      <section className="record-events" aria-labelledby="record-events-title">
        <header><span className="chapter-index">02 / Research exchange</span><h3 id="record-events-title">Conferences, talks & posters</h3></header>
        <article className="record-note"><LuPresentation aria-hidden="true" /><span className="record-note-year">2025 · Conference & poster · 278P</span><h4>ESMO AI &amp; Digital Oncology Congress</h4><p>1st ESMO AI Congress · Genetic subtype prediction in diffuse gliomas</p><a className="text-link" href={publications.find(paper => paper.type === "Conference abstract").href} target="_blank" rel="noreferrer">View abstract</a></article>
        <article className="record-note"><LuMic aria-hidden="true" /><span className="record-note-year">Invited Talk to PostDoc/PhD Retreat</span><h4>CANTAR retreat</h4><p>CANcer TARgeting PhD/PostDoc Retreat, CIO Cologne</p></article>
        <article className="record-note"><LuUsersRound aria-hidden="true" /><span className="record-note-year">Symposium attendance</span><h4>CRC symposium</h4><p>CIO Cologne</p></article>
        <article className="record-note"><LuPresentation aria-hidden="true" /><span className="record-note-year">Poster presentation</span><h4>Tag der Research 2024</h4><p>Lehrzentrum, UK Essen</p></article>
      </section>
    </div>
    </div>
    <section className="record-achievements" aria-labelledby="record-awards"><header><span className="chapter-index">Recognition</span><h3 id="record-awards">Achievements</h3></header><div className="record-award-grid">
      <AchievementAward />
      <article className="achievement-award"><div className="achievement-content"><span className="achievement-level">First place</span><h3>Hackathon</h3><span className="achievement-rule" aria-hidden="true" /><strong>Congrès National des Pharmaciens</strong><p>Bordeaux, France</p><footer><span>Hackathon</span><time dateTime="2020">2020</time></footer></div></article>
      <article className="achievement-award"><div className="achievement-content"><span className="achievement-level">Scholarship</span><h3>IDEX & UGA Foundation</h3><span className="achievement-rule" aria-hidden="true" /><strong>Université Grenoble Alpes</strong><p>Grenoble, France</p><footer><span>Scholarship</span><time dateTime="2019">2019</time></footer></div></article>
    </div></section>
  </div>;
}
