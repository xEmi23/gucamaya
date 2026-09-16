import Image from 'next/image';
import Reveal from './Reveal';

/**
 * Tarjeta de un integrante. El color de acento se define una sola vez en la
 * variable --accent y de ahí lo heredan el borde de la foto y la regla del
 * título.
 *
 * @param {object} props
 * @param {import('../data/team.js').team[number]} props.member
 * @param {boolean} props.reverse  invierte el orden de foto y texto
 */
export default function TeamMember({ member, reverse = false }) {
  return (
    <Reveal
      as="article"
      className={`member${reverse ? ' reverse' : ''}`}
      style={{ '--accent': `var(--${member.accent})` }}
    >
      <figure className="member-figure">
        <Image
          src={member.image}
          alt={`Caricatura de ${member.name}`}
          width={1024}
          height={768}
          sizes="(max-width: 900px) 92vw, 55vw"
        />
      </figure>

      <div className="member-text">
        <span className="rule" />
        <h3>{member.name}</h3>
        <p className="member-role">{member.role}</p>
        <p>{member.bio}</p>
      </div>
    </Reveal>
  );
}
