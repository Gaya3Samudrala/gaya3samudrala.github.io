import PageHeader from '../components/PageHeader.jsx';
import { education } from '../data/content.js';

export default function Education() {
  return (
    <>
      <PageHeader path="/education" />
      <section className="section">
        <div className="container">
          <div className="cards">
            {education.map(({ degree, meta, detail }) => (
              <article className="card" key={degree}>
                <h2>{degree}</h2>
                <p className="meta">{meta}</p>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
