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

  /* Línea inferior de la barra y barra de progreso, en el mismo ciclo de scroll. */
  var topbar = document.getElementById('topbar');
  var progress = document.getElementById('scrollProgress');
  var ticking = false;

  function updateOnScroll() {
    topbar.classList.toggle('stuck', window.scrollY > 8);
    if (progress) {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var pct = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      progress.style.transform = 'scaleX(' + pct + ')';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateOnScroll);
  }, { passive: true });
  updateOnScroll();

  /* Revelado de secciones al entrar en pantalla. */
  var revealTargets = document.querySelectorAll(
    '.band-title, .band-sub, .prose, .member, .identity-inner, .foot-inner'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('reveal', 'in-view'); });
  }

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
