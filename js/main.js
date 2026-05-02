/* ══════════════════════════════════════════════
   CIRKLEUP — script.js
   Formspree endpoint: https://formspree.io/f/xdabakqy
══════════════════════════════════════════════ */
'use strict';

const FORMSPREE_WAITLIST = 'https://formspree.io/f/xdabakqy';
const FORMSPREE_CONTACT  = 'https://formspree.io/f/xdabakqy'; // swap for a separate form ID when ready

/* ── Scroll Reveal ──
   Step 1: Add js-loaded to <body> — this activates the CSS
           that hides .reveal elements. Without this class,
           all content is visible regardless (safe fallback).
   Step 2: IntersectionObserver adds .visible as each
           section enters the viewport.
── */
document.body.classList.add('js-loaded');

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

/* ── Helpers ── */
function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

function refCode(email) {
  let h = 5381;
  for (let i = 0; i < email.length; i++) h = (h * 33) ^ email.charCodeAt(i);
  return Math.abs(h).toString(36).toUpperCase().slice(0, 7);
}

/* ── Modal ── */
const modal = document.getElementById('modal');

function openModal(email) {
  document.getElementById('modalRef').textContent = 'Reference: #' + refCode(email);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ══════════════════════════════════════════════
   WAITLIST FORM HANDLER
   Uses FormData — Formspree handles CORS correctly
══════════════════════════════════════════════ */
async function handleSubmit(form, input, errEl, btn) {
  const email = input.value.trim();

  input.classList.remove('err');
  errEl.classList.remove('show');

  if (!email || !validEmail(email)) {
    input.classList.add('err');
    errEl.classList.add('show');
    input.focus();
    return;
  }

  const orig = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spin">⟳</span> Joining…';

  try {
    const fd = new FormData();
    fd.append('email',        email);
    fd.append('source',       'waitlist');
    fd.append('submitted_at', new Date().toISOString());

    const res = await fetch(FORMSPREE_WAITLIST, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    fd
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error || 'Submission failed — please try again.');
    }

    try {
      localStorage.setItem('cu_wl', JSON.stringify({ email, ts: Date.now() }));
    } catch (_) {}

    input.value = '';
    openModal(email);

  } catch (err) {
    console.error('Waitlist error:', err);
    errEl.textContent = err.message || 'Something went wrong — please try again.';
    errEl.classList.add('show');
  } finally {
    btn.disabled  = false;
    btn.innerHTML = orig;
  }
}

document.getElementById('heroForm').addEventListener('submit', e => {
  e.preventDefault();
  handleSubmit(e.target, document.getElementById('heroEmail'), document.getElementById('heroErr'), document.getElementById('heroBtn'));
});

document.getElementById('ctaForm').addEventListener('submit', e => {
  e.preventDefault();
  handleSubmit(e.target, document.getElementById('ctaEmail'), document.getElementById('ctaErr'), document.getElementById('ctaBtn'));
});

['heroEmail', 'ctaEmail'].forEach(id => {
  document.getElementById(id).addEventListener('input', function () {
    this.classList.remove('err');
    document.getElementById(id === 'heroEmail' ? 'heroErr' : 'ctaErr').classList.remove('show');
  });
});

/* ══════════════════════════════════════════════
   CONTACT / INVESTOR FORM HANDLER
══════════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const nameEl  = document.getElementById('cName');
    const orgEl   = document.getElementById('cOrg');
    const emailEl = document.getElementById('cEmail');
    const typeEl  = document.getElementById('cType');
    const msgEl   = document.getElementById('cMsg');
    const errEl   = document.getElementById('contactErr');
    const btn     = document.getElementById('contactBtn');

    errEl.classList.remove('show');

    if (!nameEl.value.trim()) {
      errEl.textContent = 'Please enter your name.';
      errEl.classList.add('show');
      nameEl.focus();
      return;
    }
    if (!emailEl.value.trim() || !validEmail(emailEl.value)) {
      errEl.textContent = 'Please enter a valid email address.';
      errEl.classList.add('show');
      emailEl.focus();
      return;
    }

    const orig = btn.innerHTML;
    btn.disabled  = true;
    btn.innerHTML = '<span class="spin">⟳</span> Sending…';

    try {
      const fd = new FormData();
      fd.append('name',         nameEl.value.trim());
      fd.append('organisation', orgEl.value.trim());
      fd.append('email',        emailEl.value.trim());
      fd.append('type',         typeEl.value || 'Not selected');
      fd.append('message',      msgEl.value.trim());
      fd.append('source',       'investor-contact');
      fd.append('submitted_at', new Date().toISOString());

      const res = await fetch(FORMSPREE_CONTACT, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    fd
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Submission failed — please try again.');
      }

      btn.innerHTML        = "✓ Enquiry received — we'll be in touch.";
      btn.style.background = '#16a34a';
      contactForm.reset();

      setTimeout(() => {
        btn.innerHTML        = orig;
        btn.style.background = '';
      }, 6000);

    } catch (err) {
      console.error('Contact error:', err);
      errEl.textContent = err.message || 'Something went wrong — please try again.';
      errEl.classList.add('show');
      btn.disabled  = false;
      btn.innerHTML = orig;
    }
  });
}

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
  });
});

/* ── Prior waitlist check ── */
try {
  const p = JSON.parse(localStorage.getItem('cu_wl'));
  if (p?.email) {
    document.querySelectorAll('.invite-note').forEach(el => {
      el.textContent = '✓ ' + p.email + ' is already on the list!';
      el.style.color = 'var(--accent)';
    });
  }
} catch (_) {}
