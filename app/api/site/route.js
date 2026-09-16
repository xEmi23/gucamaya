import { NextResponse } from 'next/server';

import { siteInfo } from '@/data/team.js';

/** Datos generales del sitio. */
export async function GET() {
  return NextResponse.json(siteInfo);
}
