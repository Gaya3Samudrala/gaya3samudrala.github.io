import { profile } from '../data/content.js';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <span className="watermark" aria-hidden="true">ψ</span>
      <div className="container hero-inner">
        {profile.photo ? (
          <img className="avatar" src={import.meta.env.BASE_URL + profile.photo} alt={profile.name} />
        ) : (
          <div className="avatar avatar-placeholder" aria-hidden="true">{profile.initials}</div>
        )}
        <div className="hero-text">
          <p className="eyebrow">Hello, I'm</p>
          <h1>{profile.name}</h1>
          <p className="tagline">
            {profile.tagline.map((line, i) => (
              <span key={line}>{i > 0 && <br />}{line}</span>
            ))}
          </p>
          <ul className="chips" aria-label="Research interests">
            {profile.interests.map((interest) => <li key={interest}>{interest}</li>)}
          </ul>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#research">View research</a>
            <a className="btn btn-sage" href={profile.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
