import PageHeader from '../components/PageHeader.jsx';
import { profile } from '../data/content.js';

const icons = {
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  pin: <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
};

function Icon({ name }) {
  return (
    <span className="contact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{icons[name]}</svg>
    </span>
  );
}

export default function Contact() {
  return (
    <>
      <PageHeader path="/contact" />
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <a className="contact-card" href={`mailto:${profile.email}`}>
              <Icon name="mail" />
              <h2>Email</h2>
              <p className="contact-value">
                {/* Let long addresses wrap at the @ rather than mid-word */}
                {profile.email.split('@')[0]}<wbr />@{profile.email.split('@')[1]}
              </p>
              <span className="explore-more">Send an email <span aria-hidden="true">→</span></span>
            </a>
            <a className="contact-card" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Icon name="link" />
              <h2>LinkedIn</h2>
              <p className="contact-value">in/gayathri-gupta-samudrala</p>
              <span className="explore-more">View profile <span aria-hidden="true">→</span></span>
            </a>
            <div className="contact-card contact-card-static">
              <Icon name="pin" />
              <h2>Location</h2>
              <p className="contact-value">{profile.location}</p>
              <span className="contact-note">University at Albany, SUNY</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
