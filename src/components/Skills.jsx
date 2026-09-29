import Section from './Section.jsx';
import { skills } from '../data/content.js';

export default function Skills() {
  return (
    <Section id="skills" title="Skills and certifications">
      <div className="skills-grid">
        {skills.map((block) => (
          <div className="skill-block" key={block.groups[0].title}>
            {block.groups.map(({ title, style, items }) => (
              <div className="skill-group" key={title}>
                <h3>{title}</h3>
                <ul className={style === 'chips' ? 'chips chips-sm' : 'skill-list'}>
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
