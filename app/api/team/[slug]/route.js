import { NextResponse } from 'next/server';

import { team, findMember } from '@/data/team.js';

/* Prerenderiza una respuesta por integrante en el build. Los slugs que no
   existan se siguen resolviendo en tiempo de ejecución y devuelven 404. */
export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

/** Un integrante por slug, por ejemplo /api/team/emiliano-serna */
export async function GET(request, { params }) {
  const { slug } = await params;
  const member = findMember(slug);

  if (!member) {
    return NextResponse.json(
      { error: 'No existe un integrante con ese identificador.', slug },
      { status: 404 }
    );
  }

  return NextResponse.json(member);
}
