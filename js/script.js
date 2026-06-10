/* ============================================================
   SAIED AL MASUD — PORTFOLIO JS
   Animations, Interactions, EmailJS, Canvas Particles
   ============================================================ */

'use strict';

/* ── EMAILJS CONFIG ─────────────────────────────────────────────
   Replace these with your actual EmailJS credentials.
   Sign up at https://www.emailjs.com/ (free tier: 200 emails/mo)
   1. Create an account → Email Services → Add New Service
   2. Email Templates → Create Template (use {{name}}, {{email}}, {{subject}}, {{message}})
   3. Account → Public Key
   ──────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abcDEFghiJKL123'

/* ============================================================
   1. INITIALISE LIBRARIES
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // AOS (Animate on Scroll)
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  // EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // Boot all modules
  initCursor();
  initScrollProgress();
  initNavbar();
  initParticles();
  initSpotlight();
  initTyped();
  initTilt();
  initCounters();
  initProjectModals();
  initFooterYear();
  initActiveNavLinks();

  // GSAP hero entrance
  heroEntrance();
});

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Only on pointer devices
  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring follows with lerp for smooth lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow cursor on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .project-card, .skill-category, .stat-card, [role="button"]'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  // Hide off window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}

/* ============================================================
   3. SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ============================================================
   4. NAVBAR — sticky glass + hamburger
   ============================================================ */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!navbar) return;

  // Add .scrolled class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger toggle
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close on mobile link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ============================================================
   5. ACTIVE NAV LINKS ON SCROLL
   ============================================================ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   6. CANVAS PARTICLES
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H, raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.3,
      vy:    (Math.random() - 0.5) * 0.3 - 0.1,
      size:  Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    };
  }

  function initParticlesList() {
    particles = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) particles.push(createParticle());
  }

  function drawLines() {
    const maxDist = 100;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      // Wrap around
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
      ctx.fill();
    });
    drawLines();
    raf = requestAnimationFrame(animate);
  }

  resize();
  initParticlesList();
  animate();

  const resizeObserver = new ResizeObserver(() => {
    resize();
    initParticlesList();
  });
  resizeObserver.observe(canvas.parentElement);
}

/* ============================================================
   7. MOUSE SPOTLIGHT
   ============================================================ */
function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  const hero      = document.querySelector('.hero');
  if (!spotlight || !hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    spotlight.style.left = (e.clientX - rect.left) + 'px';
    spotlight.style.top  = (e.clientY - rect.top)  + 'px';
  });
}

/* ============================================================
   8. TYPED.JS
   ============================================================ */
function initTyped() {
  const el = document.getElementById('typedText');
  if (!el || typeof Typed === 'undefined') return;

  new Typed('#typedText', {
    strings: [
      'Full Stack Apps',
      'REST APIs',
      'React Interfaces',
      'Modern Experiences',
      'Next.js Projects',
    ],
    typeSpeed:    55,
    backSpeed:    30,
    backDelay:    2000,
    startDelay:   600,
    loop:         true,
    cursorChar:   '|',
  });
}

/* ============================================================
   9. VANILLA TILT ON PROJECT CARDS
   ============================================================ */
function initTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  // Only desktop
  if (window.matchMedia('(hover: none)').matches) return;

  VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max:        6,
    speed:      400,
    glare:      true,
    'max-glare': 0.08,
    scale:      1.02,
  });
}

/* ============================================================
   10. ANIMATED COUNTERS
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const dur    = 1400;
      const step   = 16;
      const steps  = dur / step;
      let current  = 0;

      const increment = target / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ============================================================
   11. PROJECT MODALS
   ============================================================ */
const projectData = {
  qurbanihat: {
    num:   '01',
    title: 'QurbaniHat',
    type:  'Full Stack · E-Marketplace',
    desc:  'A full-stack livestock marketplace platform built to enable users to browse animal listings, view detailed information, and submit booking requests — deployed on Vercel with CI/CD.',
    highlights: [
      'Implemented Google OAuth and email/password login using Better Auth with MongoDB integration',
      'Built reusable React components with Next.js App Router, Tailwind CSS, and DaisyUI',
      'Optimised routing, state management, and form validation for smooth UX',
      'Deployed with Vercel CI/CD for zero-downtime continuous delivery',
    ],
    tech:   ['Next.js', 'React.js', 'MongoDB', 'Node.js', 'Express.js', 'Tailwind CSS', 'Better Auth', 'DaisyUI'],
    github: 'https://github.com/SaiedAlMasud',
    live:   '#',
  },
  drivefleet: {
    num:   '02',
    title: 'DriveFleet',
    type:  'Full Stack · Car Rental SaaS',
    desc:  'A full-stack car rental platform where users can browse, search, filter, and book vehicles. Car owners get CRUD control over listings and booking dashboards.',
    highlights: [
      'Better Auth with Google OAuth and email/password; JWT stored in HTTP-only cookies',
      'Car owner CRUD: add, edit, update, and delete listings with booking history dashboard',
      'Search & filter using MongoDB $regex; booking count tracked with $inc',
      'Framer Motion animations for premium UX; deployed on Vercel with protected routes',
    ],
    tech:   ['Next.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Better Auth', 'Tailwind CSS', 'HeroUI', 'Framer Motion'],
    github: 'https://github.com/SaiedAlMasud',
    live:   '#',
  },
  docappoint: {
    num:   '03',
    title: 'Doctor Appointment System',
    type:  '.NET MVC · Healthcare',
    desc:  'A multi-role healthcare management system for Patients, Doctors, and Administrators — featuring appointment scheduling, patient records, and role-based dashboards.',
    highlights: [
      'Three distinct roles: Patient, Doctor, Admin — each with tailored dashboards',
      'Cookie-based authentication using ASP.NET ClaimsIdentity for secure access',
      'Entity Framework Core + SQL Server for efficient data management',
      'Appointment booking, schedule management, and patient record tracking',
    ],
    tech:   ['ASP.NET Core MVC', 'C#', 'SQL Server', 'Entity Framework Core', 'Bootstrap', 'Cookie Auth'],
    github: 'https://github.com/SaiedAlMasud',
    live:   null,
  },
  gamemart: {
    num:   '04',
    title: 'Game Mart Management System',
    type:  'Desktop · Inventory Management',
    desc:  'A Windows desktop application for managing game store inventory, product records, and sales — featuring full CRUD operations backed by MySQL.',
    highlights: [
      'Full CRUD operations for products, stock levels, and sales records',
      'MySQL database integration for persistent data storage',
      'Stock tracking module with low-inventory alerts',
      'Sales management with transaction history',
    ],
    tech:   ['C#', 'WinForms', 'MySQL', '.NET Framework'],
    github: 'https://github.com/SaiedAlMasud',
    live:   null,
  },
};

function initProjectModals() {
  const overlay   = document.getElementById('modalOverlay');
  const closeBtn  = document.getElementById('modalClose');
  const content   = document.getElementById('modalContent');
  if (!overlay || !closeBtn || !content) return;

  // Open on card click / keyboard
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    const open = () => openModal(card.dataset.project);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  // Close
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  function openModal(key) {
    const d = projectData[key];
    if (!d) return;

    const highlightsHTML = d.highlights.map(h => `<li>${h}</li>`).join('');
    const techHTML       = d.tech.map(t => `<span>${t}</span>`).join('');
    const liveBtn        = d.live
      ? `<a href="${d.live}" target="_blank" rel="noopener" class="btn-primary">Live Demo ↗</a>`
      : `<span class="project-btn-muted" style="padding:14px 28px;border-radius:16px;">No Live Demo</span>`;

    content.innerHTML = `
      <div class="modal-project-num">Project ${d.num} · ${d.type}</div>
      <h2 class="modal-title">${d.title}</h2>
      <p class="modal-desc">${d.desc}</p>
      <p class="modal-section-label">Key Highlights</p>
      <ul class="modal-highlights">${highlightsHTML}</ul>
      <p class="modal-section-label">Tech Stack</p>
      <div class="modal-tech">${techHTML}</div>
      <div class="modal-actions">
        <a href="${d.github}" target="_blank" rel="noopener" class="btn-ghost">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          View on GitHub
        </a>
        ${liveBtn}
      </div>
    `;

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ============================================================
   12. EMAILJS FORM SUBMISSION
   ============================================================ */
window.sendEmail = function () {
  const nameEl    = document.getElementById('contactName');
  const emailEl   = document.getElementById('contactEmail');
  const subjectEl = document.getElementById('contactSubject');
  const msgEl     = document.getElementById('contactMessage');
  const btn       = document.getElementById('submitBtn');
  const btnText   = document.getElementById('btnText');
  const msgBox    = document.getElementById('formMessage');

  if (!nameEl || !emailEl || !subjectEl || !msgEl) return;

  // Simple validation
  const name    = nameEl.value.trim();
  const email   = emailEl.value.trim();
  const subject = subjectEl.value.trim();
  const message = msgEl.value.trim();

  if (!name || !email || !subject || !message) {
    showFormMsg('Please fill in all fields.', 'error');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormMsg('Please enter a valid email address.', 'error');
    return;
  }

  // Loading state
  btn.disabled   = true;
  btnText.textContent = 'Sending…';

  if (typeof emailjs === 'undefined') {
    // EmailJS not configured — show instructions
    showFormMsg('⚠ EmailJS not configured yet. See README.md for setup instructions. Your message: ' + message, 'error');
    btn.disabled   = false;
    btnText.textContent = 'Send Message';
    return;
  }

  const templateParams = { name, email, subject, message };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      showFormMsg('✓ Message sent! I\'ll get back to you soon.', 'success');
      nameEl.value = emailEl.value = subjectEl.value = msgEl.value = '';
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      showFormMsg('Something went wrong. Please email me directly at saiedalmasud@gmail.com', 'error');
    })
    .finally(() => {
      btn.disabled   = false;
      btnText.textContent = 'Send Message';
    });

  function showFormMsg(text, type) {
    msgBox.textContent  = text;
    msgBox.className    = 'form-message ' + type;
    msgBox.style.display = 'block';
    setTimeout(() => { msgBox.style.display = 'none'; }, 6000);
  }
};

/* ============================================================
   13. HERO GSAP ENTRANCE
   ============================================================ */
function heroEntrance() {
  // Always make hero content visible first (safety net)
  const heroEls = document.querySelectorAll(
    '.hero-badge, .hero-title, .hero-typed-wrapper, .hero-description, .hero-actions, .hero-socials, .profile-card-wrapper'
  );
  heroEls.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });

  // If GSAP not available, CSS keyframes handle animation (see style.css)
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Animate hero text elements in sequence
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-badge',          { opacity: 0, y: -20, duration: 0.6, delay: 0.2 })
    .from('.hero-title',          { opacity: 0, y: 30,  duration: 0.7 }, '-=0.3')
    .from('.hero-typed-wrapper',  { opacity: 0, y: 20,  duration: 0.6 }, '-=0.4')
    .from('.hero-description',    { opacity: 0, y: 20,  duration: 0.6 }, '-=0.4')
    .from('.hero-actions',        { opacity: 0, y: 20,  duration: 0.6 }, '-=0.4')
    .from('.hero-socials',        { opacity: 0, y: 20,  duration: 0.6 }, '-=0.4')
    .from('.profile-card-wrapper',{ opacity: 0, x: 40, scale: 0.95, duration: 0.9 }, '-=0.8');

  // Subtle blob parallax on scroll
  gsap.to('.blob-1', { y: -80, scrollTrigger: { trigger: '.hero', scrub: 1.5 } });
  gsap.to('.blob-2', { y:  60, scrollTrigger: { trigger: '.hero', scrub: 1.5 } });
}

/* ============================================================
   14. FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   15. SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
