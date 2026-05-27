(function () {
  'use strict';

  const navbar  = document.querySelector('.navbar');
  const toggle  = document.querySelector('.navbar__toggle');
  const menu    = document.querySelector('.navbar__links');
  const links   = document.querySelectorAll('.navbar__links a');

  
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle && toggle.classList.remove('open');
      toggle && toggle.setAttribute('aria-expanded', 'false');
    });
  });

  
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

(function () {
  'use strict';

  
  document.documentElement.classList.add('js-reveal');

  var revealEls = document.querySelectorAll('[data-reveal]');

  
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); 
        }
      });
    },
    {
      threshold: 0.13,
      rootMargin: '0px 0px -40px 0px' 
    }
  );

  revealEls.forEach(function (el) { revealObserver.observe(el); });
})();

/* ─── Carrete de imágenes ─────────────────────────────── */
(function () {
  'use strict';

  var pista   = document.getElementById('carretePista');
  var btnPrev = document.getElementById('carretePrev');
  var btnNext = document.getElementById('carreteNext');

  if (!pista || !btnPrev || !btnNext) return;

  function desplazamiento() {
    var item = pista.querySelector('.carrete__item');
    if (!item) return pista.clientWidth;
    var gap = parseFloat(getComputedStyle(pista).gap) || 20;
    return item.offsetWidth + gap;
  }

  btnPrev.addEventListener('click', function () {
    pista.scrollBy({ left: -desplazamiento(), behavior: 'smooth' });
  });

  btnNext.addEventListener('click', function () {
    pista.scrollBy({ left: desplazamiento(), behavior: 'smooth' });
  });
})();
