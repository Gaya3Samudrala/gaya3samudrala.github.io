import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Section from '../components/Section.jsx';
import { education, experience, pages, research } from '../data/content.js';

const roleCount = experience.reduce((n, g) => n + g.entries.length, 0);

// A short count shown on each "Explore" card.
const stats = {
  '/research': `${research.projects.length} projects`,
  '/experience': `${roleCount} roles`,
  '/education': `${education.length} degrees`,
  '/skills': 'Trainings and tools',
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Section id="explore" title="Explore" soft>
        <div className="explore-grid">
          {pages.filter((p) => stats[p.path]).map(({ path, title, intro }) => (
            <Link className="explore-card" to={path} key={path}>
              <span className="explore-stat">{stats[path]}</span>
              <h3>{title}</h3>
              <p>{intro}</p>
              <span className="explore-more">View {title.split(' ')[0].toLowerCase()} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
