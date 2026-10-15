import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { pages, profile } from '../data/content.js';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">ψ</span>
          <span className="brand-name">{profile.shortName}</span>
        </Link>
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
          {pages.map(({ path, label }) => (
            <li key={path}>
              <NavLink to={path} end onClick={closeMenu}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
