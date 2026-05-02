/* ============================================================
   CIRKLEUP — main.js
   Formspree endpoint: https://formspree.io/f/xdabakqy
   Uses URLSearchParams + application/x-www-form-urlencoded
   — the only format Formspree free tier reliably accepts.
   ============================================================ */

(function () {
  'use strict';

  var ENDPOINT = 'https://formspree.io/f/xdabakqy';

  /* ── Scroll Reveal ────────────────────────────────────────
     Add js-loaded to body FIRST. CSS uses this class to
     activate the hide→reveal animation. Without it, all
     content is always visible (safe no-JS fallback).
  ─────────────────────────────────────────────────────────── */
  document.body.classList.add('js-loaded');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  /* ── Helpers ──────────────────────────────────────────── */
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  }

  function makeRef(email) {
    var h = 5381;
    for (var i = 0; i < email.length; i++) {
      h = (h * 33) ^ email.charCodeAt(i);
    }
    return Math.abs(h).toString(36).toUpperCase().slice(0, 7);
  }

  /* ── Modal ────────────────────────────────────────────── */
  var modal = document.getElementById('modal');

  function openModal(email) {
    var refEl = document.getElementById('modalRef');
    if (refEl) refEl.textContent = 'Reference: #' + makeRef(email);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modal) {
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* ── Waitlist Submit ──────────────────────────────────────
     Sends email to Formspree using URL-encoded body.
     This is what Formspree free tier accepts without errors.
  ─────────────────────────────────────────────────────────── */
  function submitWaitlist(input, errEl, btn) {
    var email = input.value.trim();

    input.classList.remove('err');
    errEl.classList.remove('show');

    if (!email || !isValidEmail(email)) {
      input.classList.add('err');
      errEl.textContent = 'Please enter a valid email address.';
      errEl.classList.add('show');
      input.focus();
      return;
    }

    var orig = btn.innerHTML;
    btn.disabled  = true;
    btn.innerHTML = '&#8987; Joining&hellip;';

    var body = new URLSearchParams();
    body.append('email',        email);
    body.append('_subject',     'New CirkleUp waitlist signup');
    body.append('source',       'waitlist');
    body.append('submitted_at', new Date().toISOString());

    fetch(ENDPOINT, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept':       'application/json'
      },
      body: body.toString()
    })
    .then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, data: data };
      });
    })
    .then(function (result) {
      btn.disabled  = false;
      btn.innerHTML = orig;

      if (!result.ok) {
        var msg = (result.data && result.data.errors)
          ? result.data.errors.map(function (e) { return e.message; }).join(', ')
          : 'Submission failed — please try again.';
        errEl.textContent = msg;
        errEl.classList.add('show');
        return;
      }

      /* Success */
      input.value = '';
      try {
        localStorage.setItem('cu_wl', JSON.stringify({ email: email, ts: Date.now() }));
      } catch (e) {}
      openModal(email);
    })
    .catch(function (err) {
      btn.disabled  = false;
      btn.innerHTML = orig;
      errEl.textContent = 'Network error — check your connection and try again.';
      errEl.classList.add('show');
      console.error('[CirkleUp] Waitlist error:', err);
    });
  }

  /* Hook both waitlist forms */
  var heroForm = document.getElementById('heroForm');
  var ctaForm  = document.getElementById('ctaForm');

  if (heroForm) {
    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      submitWaitlist(
        document.getElementById('heroEmail'),
        document.getElementById('heroErr'),
        document.getElementById('heroBtn')
      );
    });
  }

  if (ctaForm) {
    ctaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      submitWaitlist(
        document.getElementById('ctaEmail'),
        document.getElementById('ctaErr'),
        document.getElementById('ctaBtn')
      );
    });
  }

  /* Clear field error while user is typing */
  ['heroEmail', 'ctaEmail'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      this.classList.remove('err');
      var errEl = document.getElementById(id === 'heroEmail' ? 'heroErr' : 'ctaErr');
      if (errEl) errEl.classList.remove('show');
    });
  });

  /* ── Contact / Investor Form ──────────────────────────── */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameEl  = document.getElementById('cName');
      var orgEl   = document.getElementById('cOrg');
      var emailEl = document.getElementById('cEmail');
      var typeEl  = document.getElementById('cType');
      var msgEl   = document.getElementById('cMsg');
      var errEl   = document.getElementById('contactErr');
      var btn     = document.getElementById('contactBtn');

      errEl.classList.remove('show');

      if (!nameEl.value.trim()) {
        errEl.textContent = 'Please enter your name.';
        errEl.classList.add('show');
        nameEl.focus();
        return;
      }
      if (!emailEl.value.trim() || !isValidEmail(emailEl.value)) {
        errEl.textContent = 'Please enter a valid email address.';
        errEl.classList.add('show');
        emailEl.focus();
        return;
      }

      var orig = btn.innerHTML;
      btn.disabled  = true;
      btn.innerHTML = '&#8987; Sending&hellip;';

      var body = new URLSearchParams();
      body.append('name',         nameEl.value.trim());
      body.append('organisation', orgEl.value.trim());
      body.append('email',        emailEl.value.trim());
      body.append('type',         typeEl.value || 'Not selected');
      body.append('message',      msgEl.value.trim());
      body.append('source',       'investor-contact');
      body.append('_subject',     'New CirkleUp investor/partner enquiry');
      body.append('submitted_at', new Date().toISOString());

      fetch(ENDPOINT, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept':       'application/json'
        },
        body: body.toString()
      })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        btn.disabled = false;
        if (!result.ok) {
          var msg = (result.data && result.data.errors)
            ? result.data.errors.map(function (e) { return e.message; }).join(', ')
            : 'Submission failed — please try again.';
          errEl.textContent = msg;
          errEl.classList.add('show');
          btn.innerHTML = orig;
          return;
        }
        btn.innerHTML        = '\u2713 Enquiry received \u2014 we\'ll be in touch.';
        btn.style.background = '#16a34a';
        contactForm.reset();
        setTimeout(function () {
          btn.innerHTML        = orig;
          btn.style.background = '';
        }, 6000);
      })
      .catch(function (err) {
        btn.disabled  = false;
        btn.innerHTML = orig;
        errEl.textContent = 'Network error — please try again.';
        errEl.classList.add('show');
        console.error('[CirkleUp] Contact error:', err);
      });
    });
  }

  /* ── Smooth Scroll ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top:      target.getBoundingClientRect().top + window.scrollY - 68,
        behavior: 'smooth'
      });
    });
  });

  /* ── Prior Waitlist Check ─────────────────────────────── */
  try {
    var stored = JSON.parse(localStorage.getItem('cu_wl'));
    if (stored && stored.email) {
      document.querySelectorAll('.invite-note').forEach(function (el) {
        el.textContent = '\u2713 ' + stored.email + ' is already on the list!';
        el.style.color = 'var(--accent)';
      });
    }
  } catch (e) {}

}()); /* end IIFE */
