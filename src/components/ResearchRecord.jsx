import { LuMic, LuPresentation } from "react-icons/lu";
import AchievementAward from "./AchievementAward";
import { publications } from "../data/portfolio";

export default function ResearchRecord() {
  return <div className="research-board">
    <div className="record-timeline">
    <header className="record-banner">
      <div><span className="chapter-index">Research record</span><h2>Ideas, shared.</h2><p>Publications, conversations, and recognition.</p></div>
    </header>
    <div className="record-columns">
      <section className="record-papers" aria-labelledby="record-publications">
        <header><span className="chapter-index">01 / Selected research</span><h3 id="record-publications">Publications</h3></header>
        <div className="publications">{publications.map(paper => <a className="publication" key={paper.href} href={paper.href} target="_blank" rel="noreferrer">
          <span className="publication-year">{paper.year}<small>{paper.month}</small></span><div><span className="publication-type">{paper.type}</span><h3>{paper.title}</h3><p>{paper.venue}</p></div><span aria-hidden="true">↗</span>
        </a>)}</div>
        <a className="text-link scholar-glass" href="https://scholar.google.com/citations?user=UzlYsbgAAAAJ&hl=en" target="_blank" rel="noreferrer">Google Scholar ↗</a>
      </section>
      <section className="record-events" aria-labelledby="record-events-title">
        <header><span className="chapter-index">02 / Research exchange</span><h3 id="record-events-title">Conferences, talks & posters</h3></header>
        <a className="record-note" href={publications[0].href} target="_blank" rel="noreferrer"><LuPresentation aria-hidden="true" /><span className="record-note-year">2025 · Conference & poster · 278P</span><h4>ESMO AI &amp; Digital Oncology Congress</h4><p>1st ESMO AI Congress · Genetic subtype prediction in diffuse gliomas</p><span className="text-link">View abstract ↗</span></a>
        <article className="record-note"><LuMic aria-hidden="true" /><span className="record-note-year">Invited Talk to PostDoc/PhD Retreat</span><h4>CANTAR retreat</h4><p>CANcer TARgeting PhD/PostDoc Retreat, CIO Cologne</p></article>
        <article className="record-note"><span className="record-note-year">Symposium attendance</span><h4>CRC symposium</h4><p>CIO Cologne</p></article>
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
