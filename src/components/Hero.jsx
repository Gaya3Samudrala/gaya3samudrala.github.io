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

// The character: wide on landscape screens, tall on portrait screens (phones).
// Plays the matching video when there is one, with the still image as its poster.
// Light and dark versions are both rendered; CSS shows the one matching the theme,
// and lazy loading keeps the hidden one from downloading.
function Art({ wide, tall, wideVideo, tallVideo, className, alt }) {
  const landscape = useMedia('(min-aspect-ratio: 1/1)');
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');
  const video = landscape ? wideVideo : tallVideo;
  const still = landscape ? wide : tall;

  if (video && !reduceMotion) {
    return (
      <div className={className}>
        <video
          key={video}
          className="about-hero-media"
          src={src(video)}
          poster={src(still)}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={alt}
        />
      </div>
    );
  }

  return (
    <picture className={className}>
      <source srcSet={src(wide)} media="(min-aspect-ratio: 1/1)" />
      <img className="about-hero-media" src={src(tall)} alt={alt} loading="lazy" />
    </picture>
  );
}

// Full-screen character with "About Gayathri" over it.
export default function Hero() {
  const { wide, tall, wideDark, tallDark, videos } = profile.aboutArt;
  const firstName = profile.name.split(' ')[0];
  const alt = `3D illustration of ${firstName}, smiling`;

  return (
    <section className="about-hero" id="top">
      <Art className="art-light" wide={wide} tall={tall} wideVideo={videos.wide} tallVideo={videos.tall} alt={alt} />
      <Art className="art-dark" wide={wideDark} tall={tallDark} wideVideo={videos.wideDark} tallVideo={videos.tallDark} alt={alt} />
      <div className="about-hero-text container">
        <h1>About {firstName}</h1>
        <p>{profile.intro}</p>
        <a className="scroll-cue" href="#about">
          Scroll
          <span aria-hidden="true"></span>
        </a>
      </div>
    </section>
  );
}
