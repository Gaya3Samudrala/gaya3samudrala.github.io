import PageHeader from '../components/PageHeader.jsx';
import { experience } from '../data/content.js';

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function Experience() {
  return (
    <>
      <PageHeader path="/experience">
        <ul className="jump-links" aria-label="Jump to">
          {experience.map(({ group, entries }) => (
            <li key={group}>
              <a href={`#${slug(group)}`}>{group} <span>{entries.length}</span></a>
            </li>
          ))}
        </ul>
      </PageHeader>
      <section className="section">
        <div className="container">
          {experience.map(({ group, entries }) => (
            <div className="exp-group" id={slug(group)} key={group}>
              <h2 className="group-title">{group}</h2>
              <div className="timeline">
                {entries.map((entry) => (
                  <article className="entry" key={entry.title}>
                    <div className="entry-head">
                      <h3>{entry.title}</h3>
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
        </div>
      </section>
    </>
  );
}
