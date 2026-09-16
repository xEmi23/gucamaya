'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const LINKS = [
  { href: '#equipo', label: 'Equipo' },
  { href: '#reto', label: 'Reto' },
  { href: '#identidad', label: 'Identidad' },
];

export default function Topbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setStuck(window.scrollY > 8);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`topbar${stuck ? ' stuck' : ''}`}>
      <div className="topbar-inner">
        <a className="mark" href="#inicio" onClick={() => setOpen(false)}>
          <Image
            src="/assets/logo.png"
            alt=""
            className="mark-img"
            width={56}
            height={31}
            priority
          />
          <span className="mark-text">Guacamaya Analytics</span>
        </a>

        <nav
          className={`menu${open ? ' open' : ''}`}
          id="menu"
          aria-label="Secciones"
        >
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`menu-btn${open ? ' open' : ''}`}
          aria-controls="menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <em>Menú</em>
        </button>
      </div>
    </header>
  );
}
