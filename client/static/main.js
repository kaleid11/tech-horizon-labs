/* Tech Horizon Labs — Minimal JS
   1. Fade-in on scroll
   2. Mobile nav toggle
   3. Contact form submission
*/

(function () {
  'use strict';

  // --- Fade-in on scroll ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });

  // --- Mobile nav toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Contact form submission ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const msgEl = document.getElementById('form-message');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Sending\u2026';
      if (msgEl) msgEl.textContent = '';

      const data = {
        name: form.querySelector('[name="name"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        message: form.querySelector('[name="message"]').value.trim(),
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Something went wrong.');
        }

        form.reset();
        if (msgEl) {
          msgEl.textContent = 'Message sent. We\u2019ll be in touch.';
          msgEl.className = 'form-message success';
        }
      } catch (err) {
        if (msgEl) {
          msgEl.textContent = err.message || 'Something went wrong. Try emailing us directly.';
          msgEl.className = 'form-message error';
        }
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }
})();
