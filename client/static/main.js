/* Tech Horizon Labs — Scroll Animations + Interactions
   1. Dot grid canvas with focal points
   2. Fade-in on scroll (with stagger support)
   3. Metric counting animation
   4. Flow line SVG drawing
   5. Mobile nav toggle
   6. Contact form submission
   7. Research page bar chart animation
   8. Company card expand/collapse
*/

(function () {
  'use strict';

  // --- 1. Dot Grid Canvas ---
  const canvas = document.getElementById('dot-grid');
  if (canvas && canvas.getContext && window.innerWidth > 640) {
    const ctx = canvas.getContext('2d');
    let scrollY = 0;
    let ticking = false;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawDots();
    }

    function drawDots() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 32;
      const baseRadius = 1;
      const baseAlpha = 0.04;
      const centerY = canvas.height / 2;

      // Find heading positions relative to viewport
      const headings = document.querySelectorAll('h1, h2');
      const focalPoints = [];
      headings.forEach(h => {
        const rect = h.getBoundingClientRect();
        if (rect.top > -200 && rect.top < canvas.height + 200) {
          focalPoints.push({ x: rect.left + rect.width / 2, y: rect.top });
        }
      });

      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          let maxInfluence = 0;
          focalPoints.forEach(fp => {
            const dist = Math.sqrt((x - fp.x) ** 2 + (y - fp.y) ** 2);
            const influence = Math.max(0, 1 - dist / 300);
            maxInfluence = Math.max(maxInfluence, influence);
          });

          const radius = baseRadius + maxInfluence * 2;
          const alpha = baseAlpha + maxInfluence * 0.08;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(181, 101, 74, ${alpha})`;
          ctx.fill();
        }
      }
    }

    function onScroll() {
      scrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          drawDots();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    resize();
  }

  // --- 2. Fade-in on scroll ---
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach((el) => {
    fadeObserver.observe(el);
  });

  // --- 3. Metric counting animation ---
  const metricObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateMetric(entry.target);
          metricObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  function animateMetric(el) {
    const target = parseFloat(el.dataset.value) || 0;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1200;
    const start = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(target * eased);
      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll('.metric[data-value]').forEach((el) => {
    // Set initial state to 0
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    el.textContent = prefix + '0' + suffix;
    metricObserver.observe(el);
  });

  // --- 4. Flow line SVG drawing ---
  const flowLine = document.querySelector('.flow-line path');
  if (flowLine) {
    const flowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            flowLine.classList.add('drawn');
            flowObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    flowObserver.observe(flowLine.closest('.flow-line-container') || flowLine.parentElement);
  }

  // --- 5. Mobile nav toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 6. Contact form submission ---
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

  // --- 7. Research page bar chart animation ---
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.bar-fill');
          fills.forEach((fill) => {
            const width = fill.dataset.width || '0%';
            fill.style.width = width;
            fill.classList.add('animated');
          });
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.bar-chart').forEach((chart) => {
    barObserver.observe(chart);
  });

  // --- 8. Company card expand/collapse ---
  document.querySelectorAll('.company-card').forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
    });
  });
})();
