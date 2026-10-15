import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { pages } from '../data/content.js';

const src = (file) => import.meta.env.BASE_URL + file;

// Where each sticker sits, in the same order as `pages` in content.js: [x %, y %, tilt in degrees].
const LAYOUTS = {
  // Computers, no section open: around the head and shoulders. Measured on the
  // character's video frame, so they stay lined up with her at any window size.
  wide: [[30, 19, -10], [70, 17, 8], [24, 39, 7], [76, 38, -8], [21, 58, -5], [79, 57, 9]],
  // Computers, section open: a column beside her, clear of the panel (screen %).
  wideOpen: [[7, 22, -8], [11, 34, 6], [6, 46, -5], [11, 58, 7], [6, 70, -7], [11, 82, 5]],
  // Phones, no section open: around the face, above the title (screen %).
  tall: [[17, 17, -10], [83, 16, 9], [15, 33, 7], [85, 33, -7], [17, 49, -5], [83, 49, 8]],
  // Phones, section open: framing the face above the panel (screen %).
  tallOpen: [[14, 14, -8], [86, 14, 8], [14, 26, 6], [86, 26, -6], [14, 38, -5], [86, 38, 6]],
};

function useWindowSize() {
  const [size, setSize] = useState(() => [window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const onResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

// Clickable stickers around the character, one per section. Clicking a sticker opens
// its section; clicking the open section's sticker again closes it.
export default function Stickers() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [w, h] = useWindowSize();
  const open = pathname !== '/';
  const wide = w >= h;

  // On computers the character video fills the window like `object-fit: cover`
  // (16:9, aligned 30% from the top), so map frame % to screen pixels the same way.
  const stageW = Math.max(w, (h * 16) / 9), stageH = (stageW * 9) / 16;
  const stageLeft = (w - stageW) / 2, stageTop = (h - stageH) * 0.3;

  const layout = wide ? (open ? LAYOUTS.wideOpen : LAYOUTS.wide) : (open ? LAYOUTS.tallOpen : LAYOUTS.tall);
  // Sticker size: scales with the window; in the open column it shrinks so six fit without touching.
  const size = wide
    ? Math.round(open ? Math.min(80, h * 0.075) : Math.min(100, Math.max(64, h * 0.11)))
    : (open ? 46 : 58);

  return (
    <nav className="stickers" aria-label="Sections">
      {pages.map(({ path, label, icon }, i) => {
        const [px, py, tilt] = layout[i % layout.length];
        const x = wide && !open ? stageLeft + (px / 100) * stageW : (px / 100) * w;
        const y = wide && !open ? stageTop + (py / 100) * stageH : (py / 100) * h;
        return (
          <NavLink
            key={path}
            to={path}
            end
            className="sticker"
            style={{ left: x, top: y, '--tilt': `${tilt}deg`, '--size': `${size}px`, '--delay': `${-i * 0.9}s` }}
            onClick={(e) => {
              if (pathname === path) { e.preventDefault(); navigate('/'); }
            }}
          >
            <span className="sticker-float">
              <img src={src(icon)} alt="" aria-hidden="true" />
              <span className="sticker-label">{label}</span>
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
