import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { milestones, profile } from '../data/content.js';

const src = (file) => import.meta.env.BASE_URL + file;

const IMAGE_RATIO = 1920 / 1071;     // the image's width ÷ height
const IMAGE_HEIGHT = 0.7;            // computers: share of the window height, standing on the bottom edge
const PHONE_HEIGHT = 0.72;           // phones: the image box's share of the window height (see styles.css)
const ZOOM = 2.6;                    // how far the camera zooms in on a sticker while scrolling
const SEED = 11;                     // change it for a different scatter of the stickers

// True while `query` matches; updates when the screen is resized or rotated.
function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

function useWindowSize() {
  const [size, setSize] = useState(() => [window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const onResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

// Her outline as a coarse grid (1 = her, 0 = plain background), read from the image itself,
// so stickers can be kept off her whatever the screen shape.
function useSilhouette(file) {
  const [mask, setMask] = useState(null);
  useEffect(() => {
    const img = new Image();
    img.src = src(file);
    img.decode().then(() => {
      const cols = 120, rows = Math.round(cols / IMAGE_RATIO);
      const canvas = document.createElement('canvas');
      canvas.width = cols; canvas.height = rows;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, cols, rows);
      const d = ctx.getImageData(0, 0, cols, rows).data;
      const cells = new Uint8Array(cols * rows);
      for (let k = 0; k < cells.length; k++) {
        const diff = Math.abs(d[k * 4] - d[0]) + Math.abs(d[k * 4 + 1] - d[1]) + Math.abs(d[k * 4 + 2] - d[2]);
        cells[k] = diff > 36 ? 1 : 0;
      }
      setMask({ cols, rows, cells });
    }).catch(() => setMask({ cols: 1, rows: 1, cells: new Uint8Array(1) }));
  }, [file]);
  return mask;
}

// Where the image sits on screen, matching .about-hero-media in styles.css.
function imageBox(w, h) {
  if (w >= h) {
    const bh = IMAGE_HEIGHT * h, bw = bh * IMAGE_RATIO;
    return { x: (w - bw) / 2, y: h - bh, w: bw, h: bh };
  }
  const boxH = PHONE_HEIGHT * h, bw = Math.max(w, boxH * IMAGE_RATIO), bh = bw / IMAGE_RATIO;
  return { x: (w - bw) / 2, y: h - boxH + (boxH - bh) / 2, w: bw, h: bh };
}

// A small seeded random number generator, so the scatter is the same on every visit.
function random(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A sticker's width and height: stickers come in different shapes, so each gets about
// the same area (that of a `size` × `size` square) whatever its shape.
const dims = (size, ratio) => [size * Math.sqrt(ratio), size / Math.sqrt(ratio)];

// Scatter the stickers at random around her: never on her, on each other, under the header
// or on the title. Of several random spots, each takes the one furthest from the stickers
// already placed (and not too far from her), so they spread out without lining up.
function scatter(w, h, mask, textTop) {
  const wide = w >= h;
  const box = imageBox(w, h);
  const rand = random(SEED);
  const base = wide ? Math.min(105, Math.max(68, h * 0.12)) : 46;
  const gap = wide ? 16 : 10, margin = wide ? 14 : 8;   // space between stickers, and from her
  const x0 = wide ? Math.max(12, box.x) : 12, x1 = wide ? Math.min(w - 12, box.x + box.w) : w - 12;
  const y0 = 76, y1 = textTop - 8;
  const herX = box.x + box.w / 2, herY = box.y + box.h * 0.35;
  const isHer = (x, y) => {
    const cx = Math.floor(((x - box.x) / box.w) * mask.cols), cy = Math.floor(((y - box.y) / box.h) * mask.rows);
    return cx >= 0 && cy >= 0 && cx < mask.cols && cy < mask.rows && mask.cells[cy * mask.cols + cx] === 1;
  };
  const clearOfHer = (x, y, hw, hh) => {
    for (let yy = y - hh - margin; yy <= y + hh + margin; yy += 6)
      for (let xx = x - hw - margin; xx <= x + hw + margin; xx += 6) if (isHer(xx, yy)) return false;
    return true;
  };

  const placed = [];
  for (const { ratio } of milestones) {
    const size = base * (0.88 + rand() * 0.22);
    const [sw, sh] = dims(size, ratio);
    const hw = sw / 2 + 6, hh = sh / 2 + 6;                 // room for the tilt and shadow
    const tilt = Math.round((rand() - 0.5) * 26);
    let best = null, bestScore = -Infinity, valid = 0;
    for (let t = 0; t < 3000 && valid < 24; t++) {
      const x = x0 + hw + rand() * Math.max(0, x1 - x0 - 2 * hw);
      const y = y0 + hh + rand() * Math.max(0, y1 - y0 - 2 * hh);
      const apart = placed.every((p) => Math.abs(p.x - x) > p.hw + hw + gap || Math.abs(p.y - y) > p.hh + hh + gap);
      if (!apart || !clearOfHer(x, y, hw, hh)) {
        if (!best) best = { x, y };                         // fallback if nothing fits
        continue;
      }
      valid++;
      const nearest = placed.length ? Math.min(...placed.map((p) => Math.hypot(p.x - x, p.y - y))) : 0;
      const score = nearest - 0.35 * Math.hypot(x - herX, y - herY);
      if (score > bestScore || bestScore === -Infinity) { bestScore = score; best = { x, y }; }
    }
    placed.push({ ...best, hw, hh, w: sw, h: sh, tilt });
  }
  return placed;
}

// The full-screen picture with the milestone stickers scattered around her. While the
// timeline is being read (`mode` "zoom"), the camera zooms in on the sticker at `focus`;
// at the end ("end") it zooms back out, with the picture softly blurred behind the text.
export default function Stage({ mode, focus, onSelect }) {
  const { wide: image, videos } = profile.aboutArt;
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');
  const alt = `3D illustration of ${profile.name.split(' ')[0]}, smiling`;
  const [w, h] = useWindowSize();
  const mask = useSilhouette(image);
  const [textTop, setTextTop] = useState(null);

  // The title's top edge on the first screen, which the stickers stay above.
  useEffect(() => {
    const measure = () => {
      const el = document.querySelector('.about-hero-text');
      if (el) setTextTop(el.getBoundingClientRect().top + window.scrollY);
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [w, h]);

  const spots = useMemo(() => (mask && textTop ? scatter(w, h, mask, textTop) : null), [w, h, mask, textTop]);

  let camera;
  const i = milestones.findIndex((m) => m.path === focus);
  if (mode === 'zoom' && spots && i >= 0) {
    // the sticker moves to the left of the timeline on computers, near the top on phones
    const [fx, fy] = w >= h ? [0.27 * w, 0.5 * h] : [0.5 * w, 0.22 * h];
    camera = `translate(${fx - spots[i].x * ZOOM}px, ${fy - spots[i].y * ZOOM}px) scale(${ZOOM})`;
  }

  return (
    <div className={`stage stage-${mode}`}>
      <div className="camera" style={{ transform: camera }}>
        {videos.wide && !reduceMotion ? (
          <video className="about-hero-media" src={src(videos.wide)} poster={src(image)}
            autoPlay muted loop playsInline aria-label={alt} />
        ) : (
          <img className="about-hero-media" src={src(image)} alt={alt} />
        )}
        {spots && (
          <nav className="stickers" aria-label="Milestones">
            {milestones.map(({ path, label, sticker }, n) => {
              const { x, y, w: sw, h: sh, tilt } = spots[n];
              return (
                <Link
                  key={path}
                  to={path}
                  className={`sticker${mode === 'zoom' && path === focus ? ' active' : ''}`}
                  aria-label={label}
                  style={{ left: x, top: y, '--tilt': `${tilt}deg`, '--w': `${sw}px`, '--h': `${sh}px`, '--delay': `${-n * 0.9}s` }}
                  onClick={(e) => { e.preventDefault(); onSelect(path); }}
                >
                  <span className="sticker-float">
                    <img src={src(sticker)} alt="" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}
