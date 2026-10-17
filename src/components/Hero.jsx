import { useEffect, useState } from 'react';
import { profile } from '../data/content.js';

const src = (file) => import.meta.env.BASE_URL + file;

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

// Full-screen character with "About Gayathri" over it. Plays the video when there is one,
// with the still image as its poster; visitors who reduce motion see the still.
// Phones show the same video as computers, smaller (see styles.css), so the
// background color matches everywhere.
export default function Hero() {
  const { wide, videos } = profile.aboutArt;
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');
  const firstName = profile.name.split(' ')[0];
  const alt = `3D illustration of ${firstName}, smiling`;

  return (
    <section className="about-hero" id="top">
      {videos.wide && !reduceMotion ? (
        <video
          className="about-hero-media"
          src={src(videos.wide)}
          poster={src(wide)}
          autoPlay
          muted
          loop
          playsInline
          aria-label={alt}
        />
      ) : (
        <img className="about-hero-media" src={src(wide)} alt={alt} />
      )}
      <div className="about-hero-text container">
        <h1>About {firstName}</h1>
        <p>{profile.intro}</p>
      </div>
    </section>
  );
}
