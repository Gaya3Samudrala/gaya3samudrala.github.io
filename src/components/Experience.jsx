import Section from './Section.jsx';
import { experience } from '../data/content.js';

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      {experience.map(({ group, entries }) => (
        <div className="exp-group" key={group}>
          <h3 className="group-title">{group}</h3>
          <div className="timeline">
            {entries.map((entry) => (
              <article className="entry" key={entry.title}>
                <div className="entry-head">
                  <h4>{entry.title}</h4>
                  {entry.tag && <span className="tag tag-lav">{entry.tag}</span>}
                </div>
                <p className="meta">
                  {entry.meta.map((line, i) => (
                    <span key={line}>{i > 0 && <br />}{line}</span>
                  ))}
                </p>
                {entry.lede && <p className="lede">{entry.lede}</p>}
                <ul>
                  {entry.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
