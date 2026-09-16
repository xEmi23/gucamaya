import { NextResponse } from 'next/server';

/* Se fuerza dinámica porque informa tiempo activo y hora: no debe cachearse. */
export const dynamic = 'force-dynamic';

/** Estado del servicio. Útil como healthcheck de despliegue. */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
