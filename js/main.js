/* ============================================================
   CIRKLEUP — Landing Page
   js/script.js
   ============================================================ */

'use strict';

/* ── Utility: select elements ─────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];


/* ── 1. Scroll-Reveal Observer ────────────────────────────── */
(function initScrollReveal() {
  const els = $$('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
})();


/* ── 2. Sticky Nav ────────────────────────────────────────── */
(function initNav() {
  const nav = $('.nav');
  if (!nav) return;

  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) {
      nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.3)';
    } else {
      nav.style.boxShadow = 'none';
    }
    lastY = y;
  }, { passive: true });
})();


/* ── 3. Email Validation ──────────────────────────────────── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function setFieldError(input, errorEl, msg) {
  input.classList.add('is-error');
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
  }
  input.focus();
}

function clearFieldError(input, errorEl) {
  input.classList.remove('is-error');
  if (errorEl) errorEl.classList.remove('visible');
}

// Clear error on type
$$('.js-email-input').forEach((input) => {
  const errorEl = input.closest('.hero__form-wrap, .cta__form-wrap')
    ?.querySelector('.input-error-msg');

  input.addEventListener('input', () => clearFieldError(input, errorEl));
  input.addEventListener('blur', () => {
    if (input.value && !isValidEmail(input.value)) {
      setFieldError(input, errorEl, 'Enter a valid email address.');
    }
  });
});


/* ── 4. Form Submit Handler ───────────────────────────────── */
function generateRef(email) {
  let h = 5381;
  for (let i = 0; i < email.length; i++) h = (h * 33) ^ email.charCodeAt(i);
  return Math.abs(h).toString(36).toUpperCase().slice(0, 7);
}

async function handleFormSubmit(form, emailInput) {
  const email = emailInput.value.trim();
  const errorEl = form.querySelector('.input-error-msg');

  if (!email) {
    setFieldError(emailInput, errorEl, 'Please enter your email address.');
    return;
  }

  if (!isValidEmail(email)) {
    setFieldError(emailInput, errorEl, 'Enter a valid email address.');
    return;
  }

  // Set loading
  const btn = form.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<span class="btn-spinner"></span> Joining…`;
  btn.style.opacity = '0.75';

  try {
    // ─── Replace URL with your real endpoint: Formspree, Make.com, etc. ───
    // await fetch('https://your-endpoint.com/waitlist', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, ref: getRefParam(), ts: Date.now() }),
    // });

    // Simulate network latency (remove with real endpoint)
    await new Promise((r) => setTimeout(r, 1400));

    // Persist to prevent double signup
    try { localStorage.setItem('cu_waitlist', JSON.stringify({ email, ts: Date.now() })); }
    catch (_) {}

    // Show success modal
    openModal(email);
    emailInput.value = '';

  } catch (err) {
    console.error('Submit error:', err);
    showToast('Something went wrong — please try again.', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHTML;
    btn.style.opacity = '';
  }
}

$$('.js-invite-form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('.js-email-input');
    handleFormSubmit(form, emailInput);
  });
});

// Check if already on waitlist
(function checkPrior() {
  try {
    const stored = JSON.parse(localStorage.getItem('cu_waitlist'));
    if (stored?.email) {
      // Optionally show a subtle "already joined" note
      $$('.hero__invite-note').forEach((el) => {
        el.textContent = `✓ ${stored.email} is on the list — we'll be in touch!`;
        el.style.color = 'var(--accent)';
      });
    }
  } catch (_) {}
})();


/* ── 5. Success Modal ─────────────────────────────────────── */
const modalOverlay = $('.modal-overlay');

function openModal(email) {
  if (!modalOverlay) return;
  const refEl = $('#modal-ref');
  if (refEl) refEl.textContent = `Ref #${generateRef(email)}`;
  modalOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Trap focus
  const firstBtn = modalOverlay.querySelector('button');
  if (firstBtn) firstBtn.focus();
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

if (modalOverlay) {
  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) closeModal();
  });

  // Close button
  const closeBtn = modalOverlay.querySelector('.modal__close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
}


/* ── 6. Toast Notification ────────────────────────────────── */
function showToast(message, type = 'info') {
  const existing = $('.cu-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'cu-toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;

  const color = type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : '#5b4cf5';

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '28px',
    left: '50%',
    transform: 'translateX(-50%) translateY(12px)',
    background: '#16161f',
    color: 'rgba(255,255,255,0.9)',
    border: `1px solid ${color}33`,
    borderLeft: `3px solid ${color}`,
    borderRadius: '10px',
    padding: '12px 22px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.875rem',
    fontWeight: '500',
    zIndex: '999',
    opacity: '0',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    maxWidth: '360px',
    textAlign: 'center',
    boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
    whiteSpace: 'nowrap',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}


/* ── 7. Comparison Table: Tab Filter ─────────────────────── */
(function initComparison() {
  const tabs = $$('.comparison-tab');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      // Future: filter comparison rows by platform
    });
  });
})();


/* ── 8. Animated Stats Counter ───────────────────────────── */
(function initCounters() {
  const counters = $$('.js-counter');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);

      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;

        // Format: if integer show int, else 1 decimal
        const display = Number.isInteger(target)
          ? Math.round(value).toLocaleString()
          : value.toFixed(1);

        el.textContent = `${prefix}${display}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => io.observe(el));
})();


/* ── 9. Cursor Glow (desktop) ────────────────────────────── */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed',
    width: '400px', height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: '1',
    transform: 'translate(-50%, -50%)',
    transition: 'left 0.2s ease, top 0.2s ease',
    willChange: 'left, top',
  });
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
})();


/* ── 10. Ref Param ───────────────────────────────────────── */
function getRefParam() {
  return new URLSearchParams(window.location.search).get('ref') || null;
}


/* ── 11. Smooth Section CTA Links ─────────────────────────── */
$$('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = $(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});