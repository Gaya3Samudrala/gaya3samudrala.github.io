import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { milestones, pages } from '../data/content.js';

// A frosted-glass panel that slides up over the animation and holds one section.
// Closes with the × button or the Esc key. Long sections scroll inside the panel.
export default function Panel({ path, children }) {
  const navigate = useNavigate();
  const body = useRef(null);
  const page = [...pages, ...milestones].find((p) => p.path === path);
  const close = () => navigate('/');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    body.current?.focus({ preventScroll: true });
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="panel" aria-labelledby="panel-title">
      <div className="panel-head">
        <div>
          <h2 id="panel-title">{page ? page.title : 'Page not found'}</h2>
          <p className="panel-intro">{page ? page.intro : "That page doesn't exist. Pick a sticker to open something else."}</p>
        </div>
        <button className="panel-close" type="button" onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>
      <div className="panel-body" ref={body} tabIndex={-1}>
        {children}
      </div>
    </section>
  );
}
