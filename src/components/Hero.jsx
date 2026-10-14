import { profile } from '../data/content.js';

const src = (file) => import.meta.env.BASE_URL + file;

// Full-screen character with "About Gayathri" over it. Uses the wide image
// on landscape screens and the tall one on portrait screens (phones).
export default function Hero() {
  const { wide, tall, video } = profile.aboutArt;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const firstName = profile.name.split(' ')[0];

  return (
    <section className="about-hero" id="top">
      <picture>
        <source srcSet={src(wide)} media="(min-aspect-ratio: 1/1)" />
        <img className="about-hero-media" src={src(tall)} alt={`3D illustration of ${firstName}, smiling`} />
      </picture>
      {video && !reduceMotion && (
        <video className="about-hero-media" src={src(video)} autoPlay muted loop playsInline aria-hidden="true" />
      )}
      <div className="about-hero-shade" aria-hidden="true"></div>
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
