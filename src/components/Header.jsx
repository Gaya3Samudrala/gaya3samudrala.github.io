import { Link } from 'react-router-dom';
import { profile } from '../data/content.js';

// Top bar with just the name; sections are opened from the stickers around the character.
export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Home">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">ψ</span>
          <span className="brand-name">{profile.shortName}</span>
        </Link>
      </nav>
    </header>
  );
}
