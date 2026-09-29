import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/content.js';

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme() {
  const t = document.documentElement.getAttribute('data-theme');
  if (t === 'light' || t === 'dark') return t;
  return darkQuery.matches ? 'dark' : 'light';
}

export default function Header() {
  const [theme, setTheme] = useState(currentTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  // Follow the device setting until the visitor picks a theme.
  useEffect(() => {
    const onChange = () => setTheme(currentTheme());
    darkQuery.addEventListener('change', onChange);
    return () => darkQuery.removeEventListener('change', onChange);
  }, []);

  // Highlight the nav link for the section in view.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    setTheme(next);
  }

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">ψ</span>
          <span className="brand-name">{profile.shortName}</span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="nav-links">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="theme-toggle"
          type="button"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" /></svg>
          )}
        </button>
      </nav>
    </header>
  );
}
