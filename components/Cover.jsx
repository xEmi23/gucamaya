'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Portada. La clase "loaded" se activa después del primer render para que la
 * entrada escalonada de los textos se anime en lugar de aparecer de golpe.
 */
export default function Cover() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={`cover${loaded ? ' loaded' : ''}`} id="inicio">
      <div className="ambient-glow" aria-hidden="true">
        <span className="glow glow-1" />
        <span className="glow glow-2" />
        <span className="glow glow-3" />
      </div>

      <div className="cover-inner">
        <div className="cover-text">
          <p className="kicker" data-enter style={{ '--d': '0ms' }}>
            <span className="kicker-dot" />
            Equipo de análisis de datos
          </p>

          <h1 className="cover-title" data-enter style={{ '--d': '90ms' }}>
            Guacamaya
            <br />
            <span className="grad-text">Analytics</span>
          </h1>

          <p className="cover-slogan" data-enter style={{ '--d': '180ms' }}>
            Datos que vuelan alto
          </p>

          <p className="cover-lead" data-enter style={{ '--d': '270ms' }}>
            Somos cuatro personas trabajando sobre la misma idea: que un dato
            suelto no sirve de nada hasta que alguien lo ordena, lo entiende y
            lo cuenta bien. De eso se trata nuestro proyecto.
          </p>

          <div className="cover-actions" data-enter style={{ '--d': '360ms' }}>
            <a className="link-solid" href="#equipo">
              Ver el equipo
            </a>
            <a className="link-plain" href="#reto">
              Conocer el reto
            </a>
          </div>
        </div>

        <figure className="cover-logo" data-enter style={{ '--d': '200ms' }}>
          <Image
            src="/assets/logo.png"
            alt="Logo de Guacamaya Analytics"
            width={1024}
            height={559}
            sizes="(max-width: 900px) 92vw, 45vw"
            priority
          />
        </figure>
      </div>

      <a
        href="#nosotros"
        className="scroll-cue"
        aria-label="Bajar a la siguiente sección"
      >
        <span />
      </a>
    </section>
  );
}
