/**
 * Aarav Sharma Portfolio — Engine & Interactions
 * Liquid Chrome Parallax, IntersectionObserver Reveals, UPI Clipboard & Dynamic Telemetry
 */

document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initScrollProgress();
  initCursorSpotlight();
  initIntersectionObserver();
  initUPIClipboard();
  initProjectFilters();
  initThemeToggle();
  initMobileDrawer();
  initLiveISTClock();
  initContactForm();
  initVideoOptimization();
  initCardTiltPhysics();
});

/* ==========================================================================
   1. Hardware-Accelerated Liquid Video & Chrome Parallax
   ========================================================================== */
function initParallax() {
  const chromeLayer = document.querySelector('.liquid-chrome-layer');
  const videoBg = document.querySelector('.liquid-video-bg');
  if (!chromeLayer && !videoBg) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        if (chromeLayer) {
          chromeLayer.style.transform = `translate3d(0, ${scrolled * 0.18}px, 0)`;
        }
        if (videoBg) {
          videoBg.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.12}px)) scale(1.02)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function initVideoOptimization() {
  const videoBg = document.querySelector('.liquid-video-bg');
  if (!videoBg) return;

  // Programmatically set muted and playsInline to bypass browser autoplay blocks
  videoBg.muted = true;
  videoBg.defaultMuted = true;
  videoBg.setAttribute('muted', '');
  videoBg.setAttribute('playsinline', '');
  videoBg.setAttribute('webkit-playsinline', '');

  const attemptPlay = () => {
    const playPromise = videoBg.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked; unlock on first user scroll, touch, or key
        const unlockPlay = () => {
          videoBg.play().catch(() => {});
          window.removeEventListener('pointerdown', unlockPlay);
          window.removeEventListener('touchstart', unlockPlay);
          window.removeEventListener('scroll', unlockPlay);
          window.removeEventListener('keydown', unlockPlay);
        };
        window.addEventListener('pointerdown', unlockPlay, { once: true });
        window.addEventListener('touchstart', unlockPlay, { once: true, passive: true });
        window.addEventListener('scroll', unlockPlay, { once: true, passive: true });
        window.addEventListener('keydown', unlockPlay, { once: true });
      });
    }
  };

  attemptPlay();

  // If user prefers reduced motion, pause background loop
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    videoBg.pause();
  }
}

/* Subtle 3D Glassmorphic Card Tilt */
function initCardTiltPhysics() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const cards = document.querySelectorAll('.project-card, .upi-highlight-card');

  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      card.style.transform = `perspective(1000px) rotateY(${deltaX * 2.5}deg) rotateX(${-deltaY * 2.5}deg) translateY(-5px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   2. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.pageYOffset / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* ==========================================================================
   3. Cursor Spotlight Tracking
   ========================================================================== */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) return;

  // Only run on fine pointers (desktops/laptops)
  if (window.matchMedia('(pointer: coarse)').matches) return;

  window.addEventListener('pointermove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  }, { passive: true });
}

/* ==========================================================================
   4. IntersectionObserver Element Reveals
   ========================================================================== */
function initIntersectionObserver() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   5. UPI Integration (ghanshyamsharma.nlu@okicici) & Clipboard Feedback
   ========================================================================== */
function initUPIClipboard() {
  const copyButtons = document.querySelectorAll('.js-copy-upi');
  const toast = document.getElementById('toast-notice');

  const upiID = 'ghanshyamsharma.nlu@okicici';

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(upiID);
        showToast(`✓ UPI ID copied: ${upiID}`);

        const originalHTML = btn.innerHTML;
        btn.innerHTML = `✓ Copied!`;
        btn.style.backgroundColor = '#ffffff';
        btn.style.color = '#000000';

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2200);
      } catch (err) {
        showToast(`UPI ID: ${upiID}`);
      }
    });
  });

  // Render QR Code via SVG if placeholder container exists
  const qrContainer = document.getElementById('upi-qr-image-container');
  if (qrContainer && !qrContainer.querySelector('img')) {
    // Generate high-res Quick Response code via secure dynamic endpoint
    const upiUri = encodeURIComponent(`upi://pay?pa=${upiID}&pn=Aarav%20Sharma&cu=INR`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${upiUri}&margin=6`;
    
    const qrImg = document.createElement('img');
    qrImg.src = qrUrl;
    qrImg.alt = `UPI QR Code for ${upiID}`;
    qrImg.loading = 'lazy';
    qrContainer.appendChild(qrImg);
  }
}

function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   6. Project Repertory Filter Tabs (Projects Page)
   ========================================================================== */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab-item');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterTabs.length || !projectCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const agency = card.getAttribute('data-agency');
        if (filterValue === 'all' || agency === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 240);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Theme Switcher (Dark Obsidian / Titanium Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleButtons = document.querySelectorAll('.js-theme-toggle');
  const savedTheme = localStorage.getItem('aarav-portfolio-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('aarav-portfolio-theme', nextTheme);
      updateThemeIcons(nextTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const toggleButtons = document.querySelectorAll('.js-theme-toggle');
  toggleButtons.forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☼' : '☾';
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  });
}

/* ==========================================================================
   8. Fullscreen Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.getElementById('mobile-menu-trigger');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-nav-drawer');

  if (!openBtn || !drawer) return;

  openBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close when tapping links
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   9. Live Indian Standard Time (IST) Clock
   ========================================================================== */
function initLiveISTClock() {
  const clockElement = document.getElementById('ist-live-clock');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    // Format in IST (Asia/Kolkata)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
    clockElement.textContent = `${timeString} IST (UTC+5:30)`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   10. Contact Form Interaction
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('aarav-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Transmitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast('✓ Handshake sent! Aarav will respond within 24 hours.');
      form.reset();
      submitBtn.textContent = 'Handshake Transmitted';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 900);
  });
}
