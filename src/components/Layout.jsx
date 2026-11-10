import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import Stage from './Stage.jsx';
import Timeline from './Timeline.jsx';
import { milestones, pages, profile, timeline } from '../data/content.js';

// The id each address scrolls to: a sticker's first timeline entry, or a page's target.
function targetFor(path) {
  const milestone = timeline.find((t) => t.focus === path);
  return milestone ? milestone.id : pages.find((p) => p.path === path)?.target;
}

// Scroll so the card with `id` sits beside its zoomed sticker: centered on computers,
// below the sticker on phones. No id: back to the top.
function scrollToTarget(id, smooth) {
  const el = id && document.getElementById(id);
  let top = 0;
  if (el) {
    const vh = window.innerHeight, wide = window.innerWidth >= vh;
    const offset = wide ? Math.max(84, (vh - el.offsetHeight) / 2) : vh * 0.42;
    top = el.getBoundingClientRect().top + window.scrollY - offset;
  }
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
}

// One scrolling page: the picture and stickers stay put behind (Stage), the first screen
// shows the title, and scrolling runs through the timeline while the camera follows it.
export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState({ mode: 'home', focus: null });
  const first = useRef(true);

  // Which card is being read: the last one whose top has passed the reading line.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * (window.innerWidth >= window.innerHeight ? 0.6 : 0.75);
      let next = { mode: 'home', focus: null };
      for (const el of document.querySelectorAll('[data-focus], [data-end]')) {
        if (el.getBoundingClientRect().top < line) {
          next = el.dataset.focus ? { mode: 'zoom', focus: el.dataset.focus } : { mode: 'end', focus: null };
        }
      }
      setView((v) => (v.mode === next.mode && v.focus === next.focus ? v : next));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Addresses like /ualbany open at that entry: straight there on load, smoothly after.
  useEffect(() => {
    const page = [...pages, ...milestones].find((p) => p.path === pathname);
    document.title = page ? `${page.title || page.label} · ${profile.name}` : profile.name;
    const smooth = !first.current;
    first.current = false;
    requestAnimationFrame(() => scrollToTarget(targetFor(pathname), smooth));
  }, [pathname]);

  // Clicking a sticker goes to its entry, even when its address is already open.
  const select = (path) => {
    if (path === pathname) scrollToTarget(targetFor(path), true);
    else navigate(path);
  };

  // Send /research/ to /research so titles match.
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return <Navigate to={pathname.slice(0, -1)} replace />;
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <Stage mode={view.mode} focus={view.focus} onSelect={select} />
      <Hero />
      <Timeline />
    </div>
  );
}
