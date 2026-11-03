import { profile } from '../data/content.js';

// The home screen's "About Gayathri" title and intro line.
export default function Hero() {
  const firstName = profile.name.split(' ')[0];

  return (
    <section className="about-hero" id="top">
      <div className="about-hero-text container">
        <h1>About {firstName}</h1>
        <p>{profile.intro}</p>
      </div>
    </section>
  );
}
