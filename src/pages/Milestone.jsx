import { milestones } from '../data/content.js';

// The panel for one milestone sticker: its entries as cards.
export default function Milestone({ path }) {
  const { entries } = milestones.find((m) => m.path === path);
  return (
    <div className="cards">
      {entries.map(({ degree, meta, detail }) => (
        <article className="card" key={degree}>
          <h2>{degree}</h2>
          <p className="meta">{meta}</p>
          <p>{detail}</p>
        </article>
      ))}
    </div>
  );
}
