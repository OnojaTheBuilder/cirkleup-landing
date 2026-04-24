/* ══════════════════════════════════════════════
   SCRIPT
══════════════════════════════════════════════ */
'use strict';

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
revealEls.forEach(el => io.observe(el));

/* ── Helpers ── */
function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }

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

/* ── Form Handler ── */
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

  /* Swap for your real endpoint: */
  /* await fetch('https://your-endpoint.com/waitlist', {
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body: JSON.stringify({ email, ts: Date.now() })
     }); */
  await new Promise(r => setTimeout(r, 1200)); // simulated delay

  try { localStorage.setItem('cu_wl', JSON.stringify({ email, ts: Date.now() })); } catch(_) {}

  btn.disabled = false;
  btn.innerHTML = orig;
  input.value = '';
  openModal(email);
}

document.getElementById('heroForm').addEventListener('submit', e => {
  e.preventDefault();
  handleSubmit(
    e.target,
    document.getElementById('heroEmail'),
    document.getElementById('heroErr'),
    document.getElementById('heroBtn')
  );
});

document.getElementById('ctaForm').addEventListener('submit', e => {
  e.preventDefault();
  handleSubmit(
    e.target,
    document.getElementById('ctaEmail'),
    document.getElementById('ctaErr'),
    document.getElementById('ctaBtn')
  );
});

/* Clear errors on input */
['heroEmail','ctaEmail'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
    this.classList.remove('err');
    const errId = id === 'heroEmail' ? 'heroErr' : 'ctaErr';
    document.getElementById(errId).classList.remove('show');
  });
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 68, behavior: 'smooth' });
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
} catch(_) {}