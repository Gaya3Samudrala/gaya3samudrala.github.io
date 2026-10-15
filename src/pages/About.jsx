import { about, profile } from '../data/content.js';

export default function About() {
  return (
    <div className="about-grid">
      <div className="about-text">
        <p className="about-name">{profile.name}</p>
        {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
        <h3 className="interests-label">Research interests</h3>
        <ul className="chips">
          {profile.interests.map((interest) => <li key={interest}>{interest}</li>)}
        </ul>
      </div>
      <aside className="facts" aria-label="Quick facts">
        <dl>
          {about.facts.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
