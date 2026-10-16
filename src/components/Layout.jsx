import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import Stickers from './Stickers.jsx';
import Panel from './Panel.jsx';
import { milestones, pages, profile } from '../data/content.js';

// The whole site is one screen: the character animation fills it, section stickers
// sit around her, and each section opens in a glass panel over the animation.
export default function Layout() {
  const { pathname } = useLocation();
  const open = pathname !== '/';

  useEffect(() => {
    const page = [...pages, ...milestones].find((p) => p.path === pathname);
    document.title = page ? `${page.title} · ${profile.name}` : profile.name;
  }, [pathname]);

  // Send /research/ to /research so titles and the menu highlight match.
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return <Navigate to={pathname.slice(0, -1)} replace />;
  }

  return (
    <div className={`app${open ? ' panel-open' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <Hero />
      <main id="main">
        {open && (
          <Panel key={pathname} path={pathname}>
            <Outlet />
          </Panel>
        )}
      </main>
      <Stickers />
    </div>
  );
}
