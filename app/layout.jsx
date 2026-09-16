import { Archivo, Source_Serif_4 } from 'next/font/google';

import IntroGuacamaya from '@/components/IntroGuacamaya';
import ScrollProgress from '@/components/ScrollProgress';
import Topbar from '@/components/Topbar';
import SiteFooter from '@/components/SiteFooter';
import { siteInfo } from '@/data/team.js';

import './globals.css';

/* Las fuentes se descargan en el build y se sirven desde el propio dominio:
   no hay petición a Google en tiempo de ejecución ni salto de texto al cargar. */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata = {
  title: `${siteInfo.name} — ${siteInfo.slogan}`,
  description: `${siteInfo.name} — ${siteInfo.slogan}. Presentación del equipo.`,
  openGraph: {
    title: `${siteInfo.name} — ${siteInfo.slogan}`,
    description: siteInfo.description,
    locale: 'es_ES',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#E8E4D9',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body>
        <IntroGuacamaya />
        <ScrollProgress />
        <Topbar />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
