import { team, siteInfo } from '@/data/team.js';
import Reveal from './Reveal';

export default function SiteFooter() {
  return (
    <footer className="foot">
      <Reveal className="foot-inner">
        <div>
          <p className="foot-name">{siteInfo.name}</p>
          <p className="foot-slogan">{siteInfo.slogan}</p>
        </div>

        <ul className="foot-team">
          {team.map((member) => (
            <li key={member.slug}>{member.name}</li>
          ))}
        </ul>

        <p className="foot-year">© {new Date().getFullYear()}</p>
      </Reveal>
    </footer>
  );
}
