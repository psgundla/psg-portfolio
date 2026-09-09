export default function AchievementAward() {
  return (
    <article className="achievement-award" aria-labelledby="achievement-title">
      <svg className="achievement-laurel" viewBox="0 0 420 330" aria-hidden="true">
        <defs>
          <g id="achievement-laurel-half">
            <path d="M152 286C83 248 49 180 61 103" fill="none" stroke="currentColor" strokeWidth="3" />
            <ellipse cx="137" cy="272" rx="11" ry="25" transform="rotate(-54 137 272)" />
            <ellipse cx="111" cy="249" rx="11" ry="25" transform="rotate(-48 111 249)" />
            <ellipse cx="90" cy="220" rx="11" ry="25" transform="rotate(-38 90 220)" />
            <ellipse cx="74" cy="186" rx="11" ry="25" transform="rotate(-27 74 186)" />
            <ellipse cx="64" cy="149" rx="11" ry="25" transform="rotate(-15 64 149)" />
            <ellipse cx="63" cy="111" rx="11" ry="25" transform="rotate(-2 63 111)" />
            <ellipse cx="93" cy="258" rx="10" ry="23" transform="rotate(-73 93 258)" />
            <ellipse cx="70" cy="225" rx="10" ry="23" transform="rotate(-62 70 225)" />
            <ellipse cx="56" cy="189" rx="10" ry="23" transform="rotate(-50 56 189)" />
            <ellipse cx="50" cy="150" rx="10" ry="23" transform="rotate(-38 50 150)" />
          </g>
        </defs>
        <use href="#achievement-laurel-half" />
        <use href="#achievement-laurel-half" transform="translate(420 0) scale(-1 1)" />
      </svg>

      <div className="achievement-content">
        <span className="achievement-level">Merit award</span>
        <h3 id="achievement-title">ESMO Merit Award</h3>
        <span className="achievement-rule" aria-hidden="true" />
        <strong>Poster 278P</strong>
        <p>Genetic subtype prediction in diffuse gliomas with a vision transformer-based model</p>
        <footer><span>1st ESMO AI Congress</span><time dateTime="2025">2025</time></footer>
      </div>
    </article>
  );
}
