import { profile } from '../data/content.js';

const src = (file) => import.meta.env.BASE_URL + file;

// The character image: wide on landscape screens, tall on portrait screens (phones).
// Both a light and a dark version are rendered; CSS shows the one matching the
// current theme, and `loading="lazy"` keeps the hidden one from downloading.
function Art({ wide, tall, className, alt }) {
  return (
    <picture className={className}>
      <source srcSet={src(wide)} media="(min-aspect-ratio: 1/1)" />
      <img className="about-hero-media" src={src(tall)} alt={alt} loading="lazy" />
    </picture>
  );
}

// Full-screen character with "About Gayathri" over it.
export default function Hero() {
  const { wide, tall, wideDark, tallDark, video } = profile.aboutArt;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const firstName = profile.name.split(' ')[0];
  const alt = `3D illustration of ${firstName}, smiling`;

  return (
    <section className="about-hero" id="top">
      <Art className="art-light" wide={wide} tall={tall} alt={alt} />
      <Art className="art-dark" wide={wideDark} tall={tallDark} alt={alt} />
      {video && !reduceMotion && (
        <video className="about-hero-media" src={src(video)} autoPlay muted loop playsInline aria-hidden="true" />
      )}
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
