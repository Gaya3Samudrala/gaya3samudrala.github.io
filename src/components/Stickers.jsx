import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { milestones } from '../data/content.js';

const src = (file) => import.meta.env.BASE_URL + file;

// Where each sticker sits, in the same order as `milestones` in content.js: [x %, y %, tilt in degrees].
// Her outline in the home-screen image, as % of the frame width: the widest left and right
// edges (hair included) beside each row of stickers. Measured from the image.
const OUTLINE = [[40.9, 58.6], [36.7, 63.1], [32.5, 66.1], [28.6, 71.4]];
const OUTLINE_BELOW = 26.8;          // left edge further down, for a sticker that moves below
const IMAGE_RATIO = 1920 / 1071;     // the image's width ÷ height
const IMAGE_HEIGHT = 0.7;            // as a share of the window height; it stands on the bottom edge

const LAYOUTS = {
  // Computers: rows of stickers beside her head and shoulders; [ignored x, y % of the frame, tilt].
  // Their x is worked out from OUTLINE so the gap is the same on her left and right.
  wide: [[30, 5, -10], [70, 3, 8], [24, 26, 7], [76, 25, -8], [21, 48, -5], [79, 47, 9], [20, 70, 6], [80, 69, -7]],
  // Computers, section open, when there's no room between her and the panel: a column
  // on the left (screen %). With room, the stickers instead stay around her (see below).
  wideOpen: [[7, 18, -8], [11, 28, 6], [6, 38, -5], [11, 48, 7], [6, 58, -7], [11, 68, 5], [6, 78, -6], [11, 88, 7]],
  // Phones, no section open: around the face, above the title (screen %).
  tall: [[15, 13, -10], [85, 12, 9], [13, 21.5, 7], [87, 21.5, -7], [15, 30, -5], [85, 30, 8], [13, 38.5, 6], [87, 38.5, -6]],
  // Phones, section open: framing the face above the panel (screen %).
  tallOpen: [[13, 12, -8], [87, 12, 8], [13, 21, 6], [87, 21, -6], [13, 30, -5], [87, 30, 6], [13, 39, 7], [87, 39, -7]],
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

// A sticker's width and height: stickers come in different shapes, so each gets about
// the same area (that of a `size` × `size` square) whatever its shape.
const dims = (size, ratio) => [size * Math.sqrt(ratio), size / Math.sqrt(ratio)];

// Clickable milestone stickers around the character. Clicking a sticker opens its
// panel; clicking the open milestone's sticker again closes it.
export default function Stickers() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [w, h] = useWindowSize();
  const open = pathname !== '/';
  const wide = w >= h;

  // On computers the character image is IMAGE_HEIGHT of the window tall, centered and on
  // the bottom edge (see .about-hero-media in styles.css), so map frame % to screen pixels
  // the same way.
  const stageH = IMAGE_HEIGHT * h, stageW = stageH * IMAGE_RATIO;
  const stageLeft = (w - stageW) / 2, stageTop = h - stageH;

  // Sticker size scales with the window.
  const fullSize = wide ? Math.round(Math.min(105, Math.max(68, h * 0.12))) : 52;
  const toScreen = ([px, py, tilt]) => [(px / 100) * w, (py / 100) * h, tilt];
  let positions, size = fullSize;

  if (!wide) {
    positions = (open ? LAYOUTS.tallOpen : LAYOUTS.tall).map(toScreen);
    if (open) size = 42;
  } else {
    // Stickers sit an equal gap from her outline on both sides, row by row. With a panel
    // open she slides left by 15% of the window (see .panel-open in styles.css) and the
    // right-hand stickers must also fit before the panel.
    const shift = open ? 0.15 * w : 0;
    const panelLeft = open ? w - 24 - Math.min(620, 0.52 * w) : w;
    const toX = (p) => stageLeft + (p / 100) * stageW - shift;
    const toY = (p) => stageTop + (p / 100) * stageH;
    const edges = OUTLINE.map(([l, r]) => [toX(l), toX(r)]);
    const widths = milestones.map(({ ratio }) => dims(fullSize, ratio)[0] + 16); // incl. tilt and shadow
    // the largest equal gap each sticker allows: screen edge on the left, panel (or screen edge) on the right
    const room = (i) => {
      const [l, r] = edges[Math.floor(i / 2) % OUTLINE.length];
      return i % 2 === 0 ? l - widths[i] - 20 : panelLeft - 16 - r - widths[i];
    };
    const lowRight = 7;                                              // shoulder-height row on the right
    const gap = Math.min(0.035 * stageW, ...milestones.map((_, i) => (i === lowRight ? Infinity : room(i))));
    const lowFits = milestones.length <= lowRight || room(lowRight) >= gap;

    if (gap >= 8) {
      positions = milestones.map((_, i) => {
        const [, py, tilt] = LAYOUTS.wide[i % LAYOUTS.wide.length];
        const [l, r] = edges[Math.floor(i / 2) % OUTLINE.length];
        const half = widths[i] / 2, y = toY(py);
        if (i % 2 === 0) return [l - gap - half, y, tilt];            // left-hand stickers
        if (i !== lowRight || lowFits) return [r + gap + half, y, tilt]; // right-hand stickers
        // no room beside her shoulder: join the left-hand stickers, just below them
        return [Math.max(toX(OUTLINE_BELOW) - gap - half, half + 20), Math.min(toY(88), h - 80), tilt];
      });
    } else {
      positions = LAYOUTS.wideOpen.map(toScreen);
      size = Math.round(Math.min(80, h * 0.075));                   // smaller so they fit in one column
    }
  }

  return (
    <nav className="stickers" aria-label="Milestones">
      {milestones.map(({ path, label, sticker, ratio }, i) => {
        const [x, y, tilt] = positions[i % positions.length];
        const [sw, sh] = dims(size, ratio);
        return (
          <NavLink
            key={path}
            to={path}
            end
            className="sticker"
            aria-label={label}
            style={{ left: x, top: y, '--tilt': `${tilt}deg`, '--w': `${sw}px`, '--h': `${sh}px`, '--delay': `${-i * 0.9}s` }}
            onClick={(e) => {
              if (pathname === path) { e.preventDefault(); navigate('/'); }
            }}
          >
            <span className="sticker-float">
              <img src={src(sticker)} alt="" aria-hidden="true" />
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
