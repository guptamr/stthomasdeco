/* ========================================
   St.Thomas Deco by Raj — Main JS
   ======================================== */

(function () {
  'use strict';

  /* ---------- Sticky Header ---------- */
  const header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Smooth Scroll (anchor links) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var headerH = header.offsetHeight;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll Reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var items = Array.from(document.querySelectorAll('.gallery__item'));
  var currentIdx = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    var item = items[idx];
    lightboxImg.src = item.href;
    lightboxImg.alt = item.querySelector('img').alt;
    lightboxCaption.textContent = item.getAttribute('data-caption') || '';
    if (!lightbox.open) lightbox.showModal();
  }

  function closeLightbox() {
    lightbox.close();
    lightboxImg.src = '';
  }

  function navigate(dir) {
    currentIdx = (currentIdx + dir + items.length) % items.length;
    openLightbox(currentIdx);
  }

  items.forEach(function (item, idx) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', function () { navigate(-1); });
  document.getElementById('lightboxNext').addEventListener('click', function () { navigate(1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Close on backdrop click (dialog::backdrop)
  lightbox.addEventListener('cancel', function (e) {
    e.preventDefault();
    closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.open) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  /* ---------- Active Nav Highlight ---------- */
  var sections = document.querySelectorAll('section[id]');
  function highlightNav() {
    var scrollPos = window.scrollY + header.offsetHeight + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      var link = nav.querySelector('a[href="#' + id + '"]');
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
})();
