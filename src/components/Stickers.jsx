import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { milestones } from '../data/content.js';

const src = (file) => import.meta.env.BASE_URL + file;

// Where each sticker sits, in the same order as `milestones` in content.js: [x %, y %, tilt in degrees].
// Her outline in the computer video, as % of the frame width: the widest left and right
// edges (over the whole animation) beside each row of stickers. Measured from the video.
const OUTLINE = [[35.9, 57.6], [34.6, 58.8], [34.4, 65.7]];
const OUTLINE_BELOW = 28.3;          // left edge further down, for a sticker that moves below

const LAYOUTS = {
  // Computers: rows of stickers beside her head and shoulders; [ignored x, y % of the frame, tilt].
  // Their x is worked out from OUTLINE so the gap is the same on her left and right.
  wide: [[30, 19, -10], [70, 17, 8], [24, 39, 7], [76, 38, -8], [21, 58, -5], [79, 57, 9]],
  // Computers, section open, when there's no room between her and the panel: a column
  // on the left (screen %). With room, the stickers instead stay around her (see below).
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

  // On computers the character video fills the window like `object-fit: cover`
  // (16:9, aligned 30% from the top), so map frame % to screen pixels the same way.
  const stageW = Math.max(w, (h * 16) / 9), stageH = (stageW * 9) / 16;
  const stageLeft = (w - stageW) / 2, stageTop = (h - stageH) * 0.3;

  // Sticker size scales with the window.
  const fullSize = wide ? Math.round(Math.min(105, Math.max(68, h * 0.12))) : 62;
  const toScreen = ([px, py, tilt]) => [(px / 100) * w, (py / 100) * h, tilt];
  let positions, size = fullSize;

  if (!wide) {
    positions = (open ? LAYOUTS.tallOpen : LAYOUTS.tall).map(toScreen);
    if (open) size = 48;
  } else {
    // Stickers sit an equal gap from her outline on both sides, row by row. With a panel
    // open she slides left by 22% of the window (see .panel-open in styles.css) and the
    // right-hand stickers must also fit before the panel.
    const shift = open ? 0.22 * w : 0;
    const panelLeft = open ? w - 24 - Math.min(620, 0.52 * w) : w;
    const toX = (p) => stageLeft + (p / 100) * stageW - shift;
    const toY = (p) => stageTop + (p / 100) * stageH;
    const edges = OUTLINE.map(([l, r]) => [toX(l), toX(r)]);
    const widths = milestones.map(({ ratio }) => dims(fullSize, ratio)[0] + 16); // incl. tilt and shadow
    // the largest equal gap each sticker allows: screen edge on the left, panel (or screen edge) on the right
    const room = (i) => {
      const [l, r] = edges[Math.floor(i / 2) % 3];
      return i % 2 === 0 ? l - widths[i] - 20 : panelLeft - 16 - r - widths[i];
    };
    const lowRight = 5;                                              // shoulder-height row on the right
    const gap = Math.min(0.035 * stageW, ...milestones.map((_, i) => (i === lowRight ? Infinity : room(i))));
    const lowFits = milestones.length <= lowRight || room(lowRight) >= gap;

    if (gap >= 8) {
      positions = milestones.map((_, i) => {
        const [, py, tilt] = LAYOUTS.wide[i % LAYOUTS.wide.length];
        const [l, r] = edges[Math.floor(i / 2) % 3];
        const half = widths[i] / 2, y = toY(py);
        if (i % 2 === 0) return [l - gap - half, y, tilt];            // left-hand stickers
        if (i !== lowRight || lowFits) return [r + gap + half, y, tilt]; // right-hand stickers
        // no room beside her shoulder: join the left-hand stickers, just below them
        return [Math.max(toX(OUTLINE_BELOW) - gap - half, half + 20), Math.min(toY(77), h - 80), tilt];
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
