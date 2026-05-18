/* ============================================================
   navbar.js — Comportamiento del navbar | FORLAWDER
   ============================================================
   1. Efecto scroll: agrega/quita la clase .scrolled en .navbar
   2. Menú hamburguesa: toggle de .open en botón y lista
   3. Cierre del menú al hacer clic en un link (móvil)
   4. IntersectionObserver: marca el link activo según la sección visible
   ============================================================ */

(function () {
  'use strict';

  const navbar  = document.querySelector('.navbar');
  const toggle  = document.querySelector('.navbar__toggle');
  const menu    = document.querySelector('.navbar__links');
  const links   = document.querySelectorAll('.navbar__links a');

  /* ——— 1. Efecto scroll ——— */
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial

  /* ——— 2. Hamburguesa ——— */
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ——— 3. Cerrar menú al navegar (móvil) ——— */
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle && toggle.classList.remove('open');
      toggle && toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ——— 4. Link activo con IntersectionObserver ——— */
  const sections = document.querySelectorAll('section[id]');

  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + entry.target.id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
