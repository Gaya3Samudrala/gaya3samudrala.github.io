import Section from './Section.jsx';
import { research } from '../data/content.js';

export default function Research() {
  return (
    <Section id="research" title="Research" soft>
      <div className="interests">
        <h3>Research interests</h3>
        <p>{research.interests}</p>
      </div>
      <div className="cards">
        {research.projects.map((project) => (
          <article className="card" key={project.title}>
            <div className="card-head">
              <h3>{project.title}</h3>
              {project.tag && <span className="tag tag-lav">{project.tag}</span>}
            </div>
            <p className="meta">{project.meta}</p>
            <p>{project.summary}</p>
            {project.bullets && (
              <ul>
                {project.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
            {project.status && <p className="status">{project.status}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}
