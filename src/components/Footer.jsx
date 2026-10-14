import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/content.js';

export default function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        {pathname !== '/contact' && (
          <Link className="footer-link" to="/contact">Let's connect <span aria-hidden="true">→</span></Link>
        )}
      </div>
    </footer>
  );
}
