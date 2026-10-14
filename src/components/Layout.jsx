import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { pages, profile } from '../data/content.js';

export default function Layout() {
  const { pathname, hash } = useLocation();

  // On page change: set the tab title, then scroll to the top
  // (or to the #section in the link, such as #clinical-internships).
  useEffect(() => {
    const page = pages.find((p) => p.path === pathname);
    document.title = page?.title ? `${page.title} · ${profile.name}` : profile.name;

    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  // Send /research/ to /research so titles and the menu highlight match.
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return <Navigate to={pathname.slice(0, -1) + hash} replace />;
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
