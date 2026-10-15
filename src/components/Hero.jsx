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

// Full-screen character with "About Gayathri" over it: wide on landscape screens,
// tall on portrait screens (phones). Plays the matching video when there is one,
// with the still image as its poster; visitors who reduce motion see the still.
export default function Hero() {
  const { wide, tall, videos } = profile.aboutArt;
  const landscape = useMedia('(min-aspect-ratio: 1/1)');
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');
  const video = landscape ? videos.wide : videos.tall;
  const firstName = profile.name.split(' ')[0];
  const alt = `3D illustration of ${firstName}, smiling`;

  return (
    <section className="about-hero" id="top">
      {video && !reduceMotion ? (
        <video
          key={video}
          className="about-hero-media"
          src={src(video)}
          poster={src(landscape ? wide : tall)}
          autoPlay
          muted
          loop
          playsInline
          aria-label={alt}
        />
      ) : (
        <picture>
          <source srcSet={src(wide)} media="(min-aspect-ratio: 1/1)" />
          <img className="about-hero-media" src={src(tall)} alt={alt} />
        </picture>
      )}
      <div className="about-hero-text container">
        <h1>About {firstName}</h1>
        <p>{profile.intro}</p>
      </div>
    </section>
  );
}
