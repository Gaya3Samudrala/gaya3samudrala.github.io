import { milestones } from '../data/content.js';

// The panel for one milestone sticker: its entries as cards, whether they're
// degrees (from `education`) or roles (from `experience`).
export default function Milestone({ path }) {
  const { entries } = milestones.find((m) => m.path === path);
  return (
    <div className="cards">
      {entries.map((entry) =>
        entry.degree ? (
          <article className="card" key={entry.degree}>
            <h2>{entry.degree}</h2>
            <p className="meta">{entry.meta}</p>
            <p>{entry.detail}</p>
          </article>
        ) : (
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
        )
      )}
    </div>
  );
}
