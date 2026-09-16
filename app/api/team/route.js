import { NextResponse } from 'next/server';

import { team } from '@/data/team.js';

/** Listado completo del equipo. */
export async function GET() {
  return NextResponse.json({ count: team.length, members: team });
}
