/* Guacamaya Analytics — interacciones mínimas, sin librerías. */

(function () {
  'use strict';

  /* Animación de entrada: se dispara una sola vez, al cargar. */
  function start() {
    requestAnimationFrame(function () {
      document.body.classList.add('loaded');
    });
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);

  /* Línea inferior de la barra solo cuando la página ya se movió. */
  var topbar = document.getElementById('topbar');
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      topbar.classList.toggle('stuck', window.scrollY > 8);
      ticking = false;
    });
  }, { passive: true });

  /* Menú en pantallas pequeñas. */
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu');

  menuBtn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  menu.addEventListener('click', function (e) {
    if (e.target.tagName !== 'A') return;
    menu.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });

  /* Año en el pie. */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
