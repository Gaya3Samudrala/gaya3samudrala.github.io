import { profile } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
