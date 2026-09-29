import Section from './Section.jsx';
import { about } from '../data/content.js';

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="about-grid">
        <div className="about-text">
          {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
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
    </Section>
  );
}
