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
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  /* ---------- Eager gallery preload ---------- */
  var galleryImgs = document.querySelectorAll('.gallery__item img[loading="lazy"]');
  if ('IntersectionObserver' in window && galleryImgs.length) {
    var preloader = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.loading = 'eager';
          preloader.unobserve(entry.target);
        }
      });
    }, { rootMargin: '500px 0px' });
    galleryImgs.forEach(function (img) { preloader.observe(img); });
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

  /* Delegate clicks so filtered items work correctly */
  document.querySelector('.gallery').addEventListener('click', function (e) {
    var link = e.target.closest('.gallery__item');
    if (!link || link.classList.contains('gallery__item--hidden')) return;
    e.preventDefault();
    var idx = items.indexOf(link);
    if (idx !== -1) openLightbox(idx);
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

  /* ---------- Service Card Carousels ---------- */
  var carousels = document.querySelectorAll('.card__carousel');
  carousels.forEach(function (carousel) {
    var slides = carousel.querySelectorAll('.card__slide');
    var dots = carousel.querySelectorAll('.card__dot');
    var current = 0;
    var total = slides.length;
    if (total < 2) return;
    setInterval(function () {
      slides[current].classList.remove('card__slide--active');
      if (dots[current]) dots[current].classList.remove('card__dot--active');
      current = (current + 1) % total;
      slides[current].classList.add('card__slide--active');
      if (dots[current]) dots[current].classList.add('card__dot--active');
    }, 3000);
  });

  /* ---------- Gallery Filters ---------- */
  var filterBtns = document.querySelectorAll('.gallery-filter');
  var galleryItems = document.querySelectorAll('.gallery__item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');
      filterBtns.forEach(function (b) { b.classList.remove('gallery-filter--active'); });
      this.classList.add('gallery-filter--active');
      galleryItems.forEach(function (item) {
        var cat = item.getAttribute('data-category') || '';
        if (filter === 'all' || cat === filter) {
          item.classList.remove('gallery__item--hidden');
        } else {
          item.classList.add('gallery__item--hidden');
        }
      });
      /* Re-query visible items so lightbox nav stays in sync */
      items = Array.from(document.querySelectorAll('.gallery__item:not(.gallery__item--hidden)'));
    });
  });
})();
