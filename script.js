document.addEventListener('DOMContentLoaded', () => {

  /* ===== PRELOADER ===== */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hide'), 400);
    });
  }

  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.getElementById('navbar');
  const hasHero = !!document.querySelector('.hero');

  function updateNavbar() {
    if (!navbar) return;
    // Pages without a hero section have no dark background behind the navbar,
    // so keep it permanently solid/dark instead of transparent.
    if (!hasHero) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
  }
  updateNavbar();

  window.addEventListener('scroll', () => {
    updateNavbar();
    toggleBackToTop();
    setActiveNavLink();
  });

  /* ===== MOBILE MENU ===== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) hamburger.classList.remove('active');
      if (navLinks) navLinks.classList.remove('active');
    });
  });

  /* ===== ACTIVE NAV LINK ON SCROLL (only relevant on pages with in-page sections) ===== */
  const sections = document.querySelectorAll('section[id], #home');
  const navItems = document.querySelectorAll('.nav-link');

  function setActiveNavLink() {
    if (!sections.length) return;
    let current = 'home';
    sections.forEach(sec => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      if (top >= offset && top < offset + height) {
        current = sec.getAttribute('id');
      }
    });
    navItems.forEach(item => {
      const href = item.getAttribute('href') || '';
      if (href.startsWith('#') || href.includes('#')) {
        const hash = href.split('#')[1];
        item.classList.toggle('active', hash === current);
      }
    });
  }

  /* ===== AOS-LIKE SCROLL REVEAL ===== */
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  aosElements.forEach(el => aosObserver.observe(el));

  /* ===== ANIMATED COUNTERS ===== */
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  /* ===== BACK TO TOP ===== */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
  }
  toggleBackToTop();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== FORM HANDLING (front-end only demo) ===== */
  const joinForm = document.getElementById('joinForm');
  const formNote = document.getElementById('formNote');

  if (joinForm && formNote) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = '✅ Thank you! Your registration has been received. We will contact you shortly.';
      formNote.style.color = 'green';
      joinForm.reset();
      setTimeout(() => formNote.textContent = '', 6000);
    });
  }

  const contactForm = document.getElementById('contactForm');
  const contactNote = document.getElementById('contactNote');

  if (contactForm && contactNote) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactNote.textContent = '✅ Message sent! We\'ll get back to you soon.';
      contactNote.style.color = 'green';
      contactForm.reset();
      setTimeout(() => contactNote.textContent = '', 6000);
    });
  }

  const partnerForm = document.getElementById('partnerForm');
  const partnerNote = document.getElementById('partnerNote');

  if (partnerForm && partnerNote) {
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      partnerNote.textContent = '✅ Thank you! Your partnership request has been received.';
      partnerNote.style.color = 'green';
      partnerForm.reset();
      setTimeout(() => partnerNote.textContent = '', 6000);
    });
  }

  const parentSignupForm = document.getElementById('parentSignupForm');
  const signupNote = document.getElementById('signupNote');

  if (parentSignupForm && signupNote) {
    parentSignupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const password = parentSignupForm.password.value;
      const confirmPassword = parentSignupForm.confirm_password.value;

      if (password !== confirmPassword) {
        signupNote.textContent = 'Passwords do not match. Please try again.';
        signupNote.style.color = '#d33';
        return;
      }

      signupNote.textContent = 'Account created successfully! Welcome to RYAD.';
      signupNote.style.color = 'green';
      parentSignupForm.reset();
    });
  }

  /* ===== SMOOTH ANCHOR SCROLL (same-page only) ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===== DYNAMIC YEAR ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== HERO MOUSE PARALLAX ===== */
  const shapes = document.querySelectorAll('.shape');
  if (shapes.length) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 20;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

});
