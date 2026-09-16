'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { GUACAMAYA_EVENTO } from './IntroGuacamaya';

/**
 * Nombre clickeable de un integrante que abre un modal con el resumen de la
 * parte que expuso y el código real de sus celdas del notebook.
 *
 * Al abrir dispara GUACAMAYA_EVENTO, la misma guacamaya animada del intro
 * (IntroGuacamaya) escucha ese evento y cruza la pantalla como parte de la
 * apertura — no hay una guacamaya propia de este componente.
 *
 * Sin dependencias externas: overlay + tarjeta propios, cierre con Esc,
 * click afuera o botón "X", y bloqueo de scroll del fondo mientras está
 * abierto.
 *
 * @param {object} props
 * @param {string} props.nombre
 * @param {string} [props.accent]  token de color (--canopy, --gold, --macaw, --sky…)
 * @param {import('../data/exposicion.js').equipo[number]} [props.expo]
 */
export default function TeamMemberCard({ nombre, accent, expo }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    window.dispatchEvent(new Event(GUACAMAYA_EVENTO));
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  // Si no hay contenido de exposición para este integrante, el nombre queda
  // como texto plano (sin abrir nada).
  if (!expo) {
    return <>{nombre}</>;
  }

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className="member-name-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        {nombre}
      </button>

      {open && (
        <div
          className="expo-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="expo-jungle" aria-hidden="true">
            <span className="expo-blob expo-blob-a" />
            <span className="expo-blob expo-blob-b" />
            <span className="expo-blob expo-blob-c" />
            <span className="expo-blob expo-blob-d" />
          </div>

          <div
            className="expo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            style={accent ? { '--accent': `var(--${accent})` } : undefined}
          >
            <button
              type="button"
              ref={closeRef}
              className="expo-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <p className="expo-celdas">{expo.celdas}</p>
            <h3 id={titleId} className="expo-name">
              {expo.nombre}
            </h3>
            <p className="expo-rol">{expo.rol}</p>

            <ul className="expo-resumen">
              {expo.resumen.map((linea) => (
                <li key={linea}>{linea}</li>
              ))}
            </ul>

            <div className="expo-codigo">
              {expo.codigo.map((bloque) => (
                <div className="expo-codigo-bloque" key={bloque.titulo}>
                  <p className="expo-codigo-titulo">{bloque.titulo}</p>
                  <pre>
                    <code className={`lang-${bloque.lenguaje}`}>{bloque.codigo}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
