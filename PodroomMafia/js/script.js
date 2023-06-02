'use strict';

console.log('PodRoom get ready');

//sticky navigation

const logo = document.querySelector('.logo');
const navLinks = document.querySelectorAll('.main-nav-link');
const cta = document.querySelector('.nav-cta');

const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add('sticky');
      logo.classList.add('sticky--invert');
      cta.classList.add('sticky--invert');
      cta.classList.add('sticky--border');
      navLinks.forEach(link => {
        link.classList.add('sticky--invert');
        link.classList.add('sticky-nav-cta');
      });
    }

    if (ent.isIntersecting) {
      document.body.classList.remove('sticky');
      logo.classList.remove('sticky--invert');
      cta.classList.remove('sticky--invert');
      cta.classList.remove('sticky--border');

      navLinks.forEach(link => {
        link.classList.remove('sticky--invert');
        link.classList.remove('sticky-nav-cta');
      });
    }
  },
  {
    root: null,
    treshold: 0,
    rootMargin: '-80px',
  }
);
obs.observe(sectionHeroEl);

////////////////////////////////

const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

const allLinks = document.querySelectorAll('a:any-link');
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    if (href == '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    if (link.classList.contains('man-nav-link'))
      headerEl.classList.toggle('nav-open');
  });
});

//////////////////////////////////////////////////
//SLIDER
//////////////////////////////////////////////////

const carousel = document.querySelector('.carousel');
const arrowIcons = document.querySelectorAll('.arrow');

const leftArrow = document.getElementById('left');
const rightArrow = document.getElementById('right');

const firstImg = document.querySelectorAll('.c-item')[0];

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

  leftArrow.style.display = carousel.scrollLeft == 0 ? 'none' : 'inline-block';
  rightArrow.style.display =
    carousel.scrollLeft == scrollWidth ? 'none' : 'inline-block';
  console.log(carousel.scrollLeft);
  console.log(scrollWidth);
};

arrowIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    let firstImgWidth = firstImg.clientWidth;

    carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 500);
  });
});

////////////////////////////////////////////////////////////////
//reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////
//modal view

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const preventScroll = event => {
  event.preventDefault();
};

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');

  document.addEventListener('touchmove', preventScroll, { passive: false });
  document.addEventListener('wheel', preventScroll, { passive: false });
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

  document.removeEventListener('touchmove', preventScroll);
  document.removeEventListener('wheel', preventScroll);
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
