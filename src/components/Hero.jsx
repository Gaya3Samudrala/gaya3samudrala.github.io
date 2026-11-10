import { profile } from '../data/content.js';

// The first screen: "About Gayathri" and the intro over the picture (drawn by Stage),
// with a cue to scroll into the timeline.
export default function Hero() {
  return (
    <section className="intro" id="top">
      <div className="about-hero-text container">
        <h1>About {profile.name.split(' ')[0]}</h1>
        <p>{profile.intro}</p>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
