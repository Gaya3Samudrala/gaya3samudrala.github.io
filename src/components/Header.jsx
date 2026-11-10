import { Link } from 'react-router-dom';
import { profile } from '../data/content.js';

// Top bar with just the name, which leads back to the top of the page.
export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Home">
        <Link className="brand" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-mark" aria-hidden="true">ψ</span>
          <span className="brand-name">{profile.name}</span>
        </Link>
      </nav>
    </header>
  );
}
