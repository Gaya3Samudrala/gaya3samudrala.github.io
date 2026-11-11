import { timeline } from '../data/content.js';
import Skills from '../pages/Skills.jsx';
import Contact from '../pages/Contact.jsx';

// One timeline card, for a degree (from `education`), a role (from `experience`) or a
// project (from `research`): they share title, meta, tag, summary, link, bullets and status.
function Entry({ item }) {
  const meta = [].concat(item.meta);
  const summary = item.lede || item.summary || item.detail;
  return (
    <>
      <div className="card-head">
        <h3>{item.degree || item.title}</h3>
        {item.tag && <span className="tag tag-lav">{item.tag}</span>}
      </div>
      <p className="meta">
        {meta.map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}
      </p>
      {summary && <p className={item.lede ? 'lede' : undefined}>{summary}</p>}
      {item.link && (
        <p className="card-link">
          <a href={item.link.href} target="_blank" rel="noopener noreferrer">{item.link.label} ↗</a>
        </p>
      )}
      {item.bullets && (
        <ul>
          {item.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}
      {item.status && <p className="status">{item.status}</p>}
    </>
  );
}

// The scroll timeline, newest first. Each card carries `data-focus`, the sticker the
// camera zooms in on while it's being read; the closing sections carry `data-end`.
export default function Timeline() {
  return (
    <main id="main" className="tl">
      <ol className="tl-list">
        {timeline.map(({ id, group, focus, item }) => (
          <li className="tl-step" key={id}>
            {group && <p className="tl-group">{group}</p>}
            <article className="card tl-card" id={id} data-focus={focus}>
              <Entry item={item} />
            </article>
          </li>
        ))}
      </ol>
      <section className="tl-end container" id="skills" data-end>
        <h2>Skills and certifications</h2>
        <Skills />
      </section>
      <section className="tl-end container" id="contact" data-end>
        <h2>Let's connect</h2>
        <p className="tl-end-intro">I'm happy to talk about research, graduate study, or collaboration.</p>
        <Contact />
      </section>
    </main>
  );
}
