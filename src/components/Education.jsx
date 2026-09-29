import Section from './Section.jsx';
import { education } from '../data/content.js';

export default function Education() {
  return (
    <Section id="education" title="Education" soft>
      <div className="cards">
        {education.map(({ degree, meta, detail }) => (
          <article className="card" key={degree}>
            <h3>{degree}</h3>
            <p className="meta">{meta}</p>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
