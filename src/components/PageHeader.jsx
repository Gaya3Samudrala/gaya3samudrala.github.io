import { pages } from '../data/content.js';

// The banner at the top of the Research, Experience, and Skills pages.
export default function PageHeader({ path, children }) {
  const { title, intro } = pages.find((p) => p.path === path);
  return (
    <section className="page-header">
      <span className="watermark watermark-sm" aria-hidden="true">ψ</span>
      <div className="container">
        <h1>{title}</h1>
        <p className="page-intro">{intro}</p>
        {children}
      </div>
    </section>
  );
}
