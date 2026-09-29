import { profile } from '../data/content.js';

export default function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="container contact-inner">
        <h2 className="section-title">Let's connect</h2>
        <p>I'm happy to talk about research, graduate study, or collaboration.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>Email me</a>
          <a className="btn btn-sage" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p className="contact-meta">{profile.email} · {profile.location}</p>
      </div>
    </section>
  );
}
