import Image from 'next/image';
import Reveal from './Reveal';
import TeamMemberCard from './TeamMemberCard';
import { findExposicion } from '../data/exposicion.js';

/**
 * Tarjeta de un integrante. El color de acento se define una sola vez en la
 * variable --accent y de ahí lo heredan el borde de la foto y la regla del
 * título.
 *
 * El nombre es clickeable: abre un modal con el resumen de la parte que esa
 * persona expuso del proyecto y el código de sus celdas del notebook (ver
 * data/exposicion.js).
 *
 * @param {object} props
 * @param {import('../data/team.js').team[number]} props.member
 * @param {boolean} props.reverse  invierte el orden de foto y texto
 */
export default function TeamMember({ member, reverse = false }) {
  const expo = findExposicion(member.slug);

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
        <h3>
          <TeamMemberCard nombre={member.name} accent={member.accent} expo={expo} />
        </h3>
        <p className="member-role">{member.role}</p>
        <p>{member.bio}</p>
      </div>
    </Reveal>
  );
}
