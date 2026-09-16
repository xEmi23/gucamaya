'use client';

import { useCallback, useEffect, useState } from 'react';
import estilos from './IntroGuacamaya.module.css';

/**
 * Animación recurrente: una guacamaya cruza la pantalla y desaparece.
 *
 * Se repite sola cada REPETIR_MS y, además, cualquier parte de la app puede
 * pedir un vuelo extra disparando el evento GUACAMAYA_EVENTO en window (lo
 * usa TeamMemberCard al abrir una tarjeta de exposición). Cada vuelo —sea
 * automático o pedido— remonta la capa con una key distinta para que la
 * animación CSS arranque siempre desde el primer fotograma, incluso si se
 * pide uno nuevo mientras el anterior todavía está en pantalla.
 *
 * Por qué está hecho así:
 *
 *  - No se dibuja en el servidor. El primer render devuelve null tanto en el
 *    servidor como en el cliente, así que no hay desajuste de hidratación.
 *    El vuelo arranca después, ya montado el componente.
 *  - No aporta texto ni contenido indexable y va marcado como decorativo, de
 *    modo que no toca el SEO ni el árbol de accesibilidad.
 *  - La capa es fija, no ocupa hueco en el diseño y deja pasar los clics, así
 *    que la página se puede usar desde el primer instante.
 *  - Al terminar se desmonta sola: no queda ningún nodo en el documento.
 *
 * Sobre el movimiento reducido: por decisión expresa del equipo la intro se
 * reproduce siempre, también cuando el sistema pide menos movimiento. Se
 * asumió a sabiendas. Pesa a favor que cada vuelo dura tres segundos, no
 * bloquea la interacción y no arrastra el contenido de la página. Para
 * volver a respetarlo basta con descomentar la comprobación de abajo y
 * retirar el bloque equivalente de la hoja de estilos.
 *
 * El ave es un SVG propio. El logo del proyecto lleva una guacamaya, pero es
 * una composición cerrada con escudo, paisaje y rótulo, en pixel art, y
 * desplazarla sería mover un cartel, no volar.
 */

const VUELO = 3100; // duración del vuelo en milisegundos
const COLCHON = 300; // margen antes de retirar el nodo
const REPETIR_MS = 6000; // cada cuánto vuela sola

export const GUACAMAYA_EVENTO = 'guacamaya:vuelo';

export default function IntroGuacamaya() {
  const [visible, setVisible] = useState(false);
  const [vueloId, setVueloId] = useState(0);

  const volar = useCallback(() => {
    // Para respetar la preferencia del sistema, descomentar esta línea:
    // if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVueloId((id) => id + 1);
    setVisible(true);
  }, []);

  // Vuelo inicial al cargar, y uno nuevo cada REPETIR_MS.
  useEffect(() => {
    volar();
    const interval = setInterval(volar, REPETIR_MS);
    return () => clearInterval(interval);
  }, [volar]);

  // Vuelo extra bajo pedido (p. ej. al abrir una tarjeta del equipo).
  useEffect(() => {
    window.addEventListener(GUACAMAYA_EVENTO, volar);
    return () => window.removeEventListener(GUACAMAYA_EVENTO, volar);
  }, [volar]);

  useEffect(() => {
    if (!visible) return undefined;
    const id = setTimeout(() => setVisible(false), VUELO + COLCHON);
    return () => clearTimeout(id);
  }, [visible, vueloId]);

  if (!visible) return null;

  return (
    <div
      key={vueloId}
      className={estilos.capa}
      aria-hidden="true"
      style={{ '--vuelo': `${VUELO}ms` }}
    >
      <div className={estilos.vuelo}>
        <div className={estilos.onda}>
          <div className={estilos.resplandor} />

          <span className={`${estilos.pluma} ${estilos.pluma1}`} />
          <span className={`${estilos.pluma} ${estilos.pluma2}`} />
          <span className={`${estilos.pluma} ${estilos.pluma3}`} />
          <span className={`${estilos.pluma} ${estilos.pluma4}`} />

          <svg
            className={estilos.ave}
            viewBox="0 0 280 200"
            role="presentation"
            focusable="false"
          >
            <defs>
              {/* Los colores son los de la paleta del sitio, que son además
                  los de una guacamaya real: azul, verde, dorado y rojo. */}
              <linearGradient id="ga-ala" x1="0.1" y1="1" x2="0.9" y2="0">
                <stop offset="0%" stopColor="#B33E1E" />
                <stop offset="38%" stopColor="#C08A22" />
                <stop offset="72%" stopColor="#3C6A32" />
                <stop offset="100%" stopColor="#4F7CB0" />
              </linearGradient>

              <linearGradient id="ga-ala-fondo" x1="0.1" y1="0" x2="0.9" y2="1">
                <stop offset="0%" stopColor="#8D2E15" />
                <stop offset="45%" stopColor="#966C1C" />
                <stop offset="100%" stopColor="#2F5528" />
              </linearGradient>

              <linearGradient id="ga-cuerpo" x1="0" y1="0" x2="1" y2="0.3">
                <stop offset="0%" stopColor="#8D2E15" />
                <stop offset="55%" stopColor="#B33E1E" />
                <stop offset="100%" stopColor="#C85B31" />
              </linearGradient>

              <linearGradient id="ga-cola" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4F7CB0" />
                <stop offset="46%" stopColor="#3C6A32" />
                <stop offset="78%" stopColor="#C08A22" />
                <stop offset="100%" stopColor="#B33E1E" />
              </linearGradient>
            </defs>

            {/* Ala del fondo. Gira al revés que la delantera: juntas abren y
                cierran, que es como se lee un aleteo de verdad. */}
            <g className={`${estilos.ala} ${estilos.alaFondo}`}>
              <path
                d="M146 116 C134 130 118 150 92 172 C100 154 110 137 121 124
                   C129 115 140 112 146 116 Z"
                fill="url(#ga-ala-fondo)"
              />
              <path
                d="M140 121 C128 136 117 152 105 166 M136 125 C127 138 118 150 109 161"
                fill="none"
                stroke="#1B2721"
                strokeOpacity="0.2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>

            {/* Cola larga: es la silueta que identifica a una guacamaya. */}
            <path
              d="M132 114 C102 124 62 140 18 158 C28 164 42 166 54 162
                 C88 150 118 136 138 126 Z"
              fill="url(#ga-cola)"
            />
            <path
              d="M130 124 C104 138 72 154 40 170 C52 173 64 171 74 166
                 C100 152 120 140 136 132 Z"
              fill="url(#ga-cola)"
              opacity="0.68"
            />

            {/* Cuerpo y cabeza en una sola pieza: sin costuras visibles. */}
            <path
              d="M120 112 C128 98 148 88 168 86 C184 84 198 90 204 100
                 C209 108 207 118 199 124 C189 131 172 135 154 134
                 C138 133 126 129 119 123 C114 119 115 116 120 112 Z"
              fill="url(#ga-cuerpo)"
            />

            {/* Antifaz claro y ojo, rasgos propios de la especie. */}
            <ellipse cx="189" cy="100" rx="10" ry="8.5" fill="#EDE6D5" opacity="0.93" />
            <circle cx="192" cy="99" r="2.9" fill="#1B2721" />

            {/* Pico ganchudo. */}
            <path
              d="M201 94 C213 91 224 97 225 105 C226 114 218 119 209 117
                 C205 116 203 112 203 108 C203 102 202 98 201 94 Z"
              fill="#1B2721"
            />
            <path
              d="M206 112 C211 114 217 113 221 110"
              fill="none"
              stroke="#EDE6D5"
              strokeOpacity="0.35"
              strokeWidth="1.3"
              strokeLinecap="round"
            />

            {/* Ala delantera: la grande, la que manda visualmente. */}
            <g className={`${estilos.ala} ${estilos.alaFrente}`}>
              <path
                d="M150 106 C136 84 116 56 88 30 C92 50 100 72 110 90
                   C118 104 132 112 146 112 C150 112 152 110 150 106 Z"
                fill="url(#ga-ala)"
              />
              <path
                d="M144 103 C132 83 118 61 98 41 M140 107 C130 89 118 71 102 55
                   M136 110 C128 96 118 82 106 69"
                fill="none"
                stroke="#1B2721"
                strokeOpacity="0.17"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
