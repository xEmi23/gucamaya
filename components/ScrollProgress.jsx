'use client';

import { useEffect, useRef } from 'react';

/** Barra de progreso de lectura fija en el borde superior de la página. */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const bar = barRef.current;
      if (bar) {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
        bar.style.transform = `scaleX(${pct})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
}
