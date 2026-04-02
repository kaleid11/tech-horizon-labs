/* =====================================================
   Tech Horizon Labs — Narrative Physics Canvas

   The particle system TELLS the THL story:
   - Hero: scattered chaos (unstructured business data)
   - Method: particles organize into 4 clusters (mapping)
   - Work: tight efficient networks (deployed systems)
   - Contact: particles converge to one point (get in touch)

   Plus: mouse interaction, data packets, smooth transitions
   ===================================================== */

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  // NARRATIVE PARTICLE SYSTEM
  // ─────────────────────────────────────────────
  const canvas = document.getElementById('dot-grid');
  if (canvas && canvas.getContext && window.innerWidth > 640) {
    const ctx = canvas.getContext('2d');
    let w, h, animFrame;
    let mouseX = -9999, mouseY = -9999, mouseDown = false;
    let time = 0;
    let scrollProgress = 0; // 0 = top, 1 = bottom

    const A = { r: 181, g: 101, b: 74 }; // terracotta accent
    const COUNT = Math.min(140, Math.floor(window.innerWidth / 10));
    const CONNECT_DIST = 180;
    const MOUSE_RADIUS = 300;

    // Scroll section detection
    const sections = { hero: 0, method: 0.2, work: 0.45, tools: 0.6, security: 0.72, principles: 0.82, contact: 0.92 };
    let currentMode = 'chaos';

    function getMode(progress) {
      if (progress < 0.15) return 'chaos';
      if (progress < 0.38) return 'clusters';
      if (progress < 0.65) return 'network';
      if (progress < 0.85) return 'flow';
      return 'converge';
    }

    // Noise for flow field
    function noise(x, y, t) {
      return Math.sin(x * 0.007 + t * 0.4) * Math.cos(y * 0.005 + t * 0.25) +
             Math.sin((x + y) * 0.004 + t * 0.18) * 0.6;
    }

    // Particle
    const particles = [];

    class Particle {
      constructor(i) {
        this.i = i;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = 0;
        this.vy = 0;
        this.targetX = this.x;
        this.targetY = this.y;
        this.radius = Math.random() * 2 + 1;
        this.baseRadius = this.radius;
        this.alpha = Math.random() * 0.25 + 0.12;
        this.baseAlpha = this.alpha;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.02 + 0.006;
        this.active = Math.random() < 0.15;
        this.trail = []; // position history for trail effect
        // Cluster assignment (0-3) for 'clusters' mode
        this.cluster = Math.floor(Math.random() * 4);
      }

      getClusterTarget() {
        // 4 clusters arranged in a 2x2 grid, breathing
        const cx = [w * 0.22, w * 0.78, w * 0.22, w * 0.78];
        const cy = [h * 0.28, h * 0.28, h * 0.72, h * 0.72];
        const spread = 100;
        const breathe = Math.sin(time * 0.3 + this.cluster) * 15;
        return {
          x: cx[this.cluster] + Math.sin(this.i * 1.7 + time * 0.2) * (spread + breathe),
          y: cy[this.cluster] + Math.cos(this.i * 2.3 + time * 0.15) * (spread + breathe)
        };
      }

      getNetworkTarget() {
        // Multiple orbiting rings
        const angle = (this.i / COUNT) * Math.PI * 2;
        const ringIndex = this.i % 5;
        const ring = ringIndex * 35 + 25;
        const orbitSpeed = 0.15 - ringIndex * 0.02;
        return {
          x: w * 0.5 + Math.cos(angle + time * orbitSpeed) * ring,
          y: h * 0.5 + Math.sin(angle + time * orbitSpeed) * ring
        };
      }

      getConvergeTarget() {
        // All converge to a single point (center-bottom of screen)
        const jitter = 3;
        return {
          x: w * 0.5 + Math.sin(this.i) * jitter,
          y: h * 0.6 + Math.cos(this.i) * jitter
        };
      }

      update(t, mode) {
        this.phase += this.speed;

        // Store trail (last 6 positions)
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 6) this.trail.shift();

        // Determine target based on mode
        if (mode === 'chaos') {
          // Energetic flow field drift
          const fx = noise(this.x, this.y, t) * 0.35;
          const fy = noise(this.x + 500, this.y + 500, t) * 0.35;
          this.vx += fx;
          this.vy += fy;
          // Add gentle wandering
          this.vx += Math.sin(this.phase * 2) * 0.04;
          this.vy += Math.cos(this.phase * 1.3) * 0.04;
        } else if (mode === 'clusters') {
          const target = this.getClusterTarget();
          this.vx += (target.x - this.x) * 0.008;
          this.vy += (target.y - this.y) * 0.008;
          // Small orbit around target
          this.vx += Math.cos(this.phase) * 0.05;
          this.vy += Math.sin(this.phase * 0.7) * 0.05;
        } else if (mode === 'network') {
          const target = this.getNetworkTarget();
          this.vx += (target.x - this.x) * 0.012;
          this.vy += (target.y - this.y) * 0.012;
        } else if (mode === 'flow') {
          // Flowing river-like motion left to right
          const fx = 0.3 + noise(this.x, this.y, t) * 0.15;
          const fy = noise(this.x + 1000, this.y, t) * 0.2;
          this.vx += fx;
          this.vy += fy;
          // Wrap horizontally
          if (this.x > w + 50) { this.x = -50; }
          // Stay in a band
          this.vy += (h * 0.5 - this.y) * 0.002;
        } else if (mode === 'converge') {
          const target = this.getConvergeTarget();
          this.vx += (target.x - this.x) * 0.02;
          this.vy += (target.y - this.y) * 0.02;
        }

        // Mouse interaction — swarm toward cursor with orbit
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 1) {
          const proximity = 1 - dist / MOUSE_RADIUS;
          const force = proximity * (mouseDown ? 1.8 : 0.8);
          // Attract + slight tangential orbit
          const angle = Math.atan2(dy, dx);
          const orbitAngle = angle + Math.PI * 0.3;
          this.vx += Math.cos(angle) * force * 0.7 + Math.cos(orbitAngle) * force * 0.3;
          this.vy += Math.sin(angle) * force * 0.7 + Math.sin(orbitAngle) * force * 0.3;
          this.radius = this.baseRadius + proximity * 4;
          this.alpha = Math.min(0.9, this.baseAlpha + proximity * 0.6);
        } else {
          this.radius += (this.baseRadius - this.radius) * 0.04;
          this.alpha += (this.baseAlpha - this.alpha) * 0.04;
        }

        // Active node pulse
        if (this.active) {
          const pulse = Math.sin(this.phase * 3) * 0.5 + 0.5;
          this.radius = Math.max(this.radius, this.baseRadius + pulse * 2);
          this.alpha = Math.max(this.alpha, this.baseAlpha + pulse * 0.2);
        }

        // Damping (varies by mode)
        const damp = mode === 'converge' ? 0.92 : mode === 'flow' ? 0.96 : 0.95;
        this.vx *= damp;
        this.vy *= damp;

        // Speed limit
        const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpd = mode === 'flow' ? 3 : 2;
        if (spd > maxSpd) { this.vx = (this.vx / spd) * maxSpd; this.vy = (this.vy / spd) * maxSpd; }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap (except in converge mode)
        if (mode !== 'converge' && mode !== 'network') {
          if (this.x < -80) this.x = w + 80;
          if (this.x > w + 80) this.x = -80;
          if (this.y < -80) this.y = h + 80;
          if (this.y > h + 80) this.y = -80;
        }
      }

      draw(mode) {
        // Trail effect (subtle, fading)
        if (this.trail.length > 2 && (mode === 'flow' || this.alpha > 0.25)) {
          ctx.beginPath();
          ctx.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
          }
          ctx.strokeStyle = `rgba(${A.r}, ${A.g}, ${A.b}, ${this.alpha * 0.15})`;
          ctx.lineWidth = this.radius * 0.5;
          ctx.stroke();
        }

        // Glow for active nodes
        if (this.active && this.alpha > 0.15) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${A.r}, ${A.g}, ${A.b}, ${this.alpha * 0.08})`;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${A.r}, ${A.g}, ${A.b}, ${this.alpha})`;
        ctx.fill();
      }
    }

    // Data packets
    const packets = [];
    class DataPacket {
      constructor(from, to) {
        this.fromX = from.x; this.fromY = from.y;
        this.toX = to.x; this.toY = to.y;
        this.progress = 0;
        this.speed = Math.random() * 0.02 + 0.01;
        this.alive = true;
      }
      update() {
        this.progress += this.speed;
        if (this.progress >= 1) this.alive = false;
      }
      draw() {
        const x = this.fromX + (this.toX - this.fromX) * this.progress;
        const y = this.fromY + (this.toY - this.fromY) * this.progress;
        const a = Math.sin(this.progress * Math.PI) * 0.7;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${A.r}, ${A.g}, ${A.b}, ${a})`;
        ctx.fill();
      }
    }

    function init() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles.length = 0;
      packets.length = 0;
      for (let i = 0; i < COUNT; i++) particles.push(new Particle(i));
    }

    function drawConnections(mode) {
      // Connection density varies by mode
      const maxDist = mode === 'network' ? CONNECT_DIST * 1.5 :
                      mode === 'clusters' ? CONNECT_DIST * 0.8 :
                      mode === 'converge' ? CONNECT_DIST * 2 :
                      mode === 'chaos' ? CONNECT_DIST * 0.5 :
                      CONNECT_DIST;
      const packetChance = mode === 'network' ? 0.003 : mode === 'flow' ? 0.002 : 0.0005;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            let alpha = (1 - dist / maxDist) * 0.15;
            let lw = 0.6;

            // Strong glow near mouse — lines thicken and brighten
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mDist = Math.sqrt((midX - mouseX) ** 2 + (midY - mouseY) ** 2);
            if (mDist < MOUSE_RADIUS) {
              const boost = (1 - mDist / MOUSE_RADIUS);
              alpha += boost * 0.3;
              lw += boost * 1;
            }

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${A.r}, ${A.g}, ${A.b}, ${alpha})`;
            ctx.lineWidth = lw;
            ctx.stroke();

            // Spawn data packets more often near mouse
            const spawnChance = mDist < MOUSE_RADIUS ? packetChance * 4 : packetChance;
            if (Math.random() < spawnChance && packets.length < 60) {
              packets.push(new DataPacket(particles[i], particles[j]));
            }
          }
        }
      }
    }

    function animate() {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      const mode = getMode(scrollProgress);
      currentMode = mode;

      for (const p of particles) {
        p.update(time, mode);
        p.draw(mode);
      }

      drawConnections(mode);

      for (let i = packets.length - 1; i >= 0; i--) {
        packets[i].update();
        if (packets[i].alive) packets[i].draw();
        else packets.splice(i, 1);
      }

      animFrame = requestAnimationFrame(animate);
    }

    // Scroll tracking
    function updateScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    window.addEventListener('mousedown', () => { mouseDown = true; });
    window.addEventListener('mouseup', () => { mouseDown = false; });
    window.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; mouseDown = false; });
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
    }, { passive: true });
    window.addEventListener('touchend', () => { mouseX = -9999; mouseY = -9999; });
    window.addEventListener('resize', () => { cancelAnimationFrame(animFrame); init(); animFrame = requestAnimationFrame(animate); });

    init();
    updateScroll();
    animFrame = requestAnimationFrame(animate);
  }

  // ─────────────────────────────────────────────
  // METRIC COUNTING
  // ─────────────────────────────────────────────
  const metricObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        const el = e.target;
        const target = parseFloat(el.dataset.value) || 0;
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const dur = 1400, start = performance.now();

        el.style.transform = 'scale(0.5)';
        el.style.opacity = '0';
        requestAnimationFrame(() => {
          el.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease';
          el.style.transform = 'scale(1)';
          el.style.opacity = '1';
        });

        function step(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          el.textContent = prefix + Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        metricObs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.metric[data-value]').forEach((el) => {
    el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || '');
    metricObs.observe(el);
  });

  // ─────────────────────────────────────────────
  // FADE-IN + PARALLAX
  // ─────────────────────────────────────────────
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-in').forEach((el) => fadeObs.observe(el));

  // Parallax
  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (!scrollTick) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        const tag = document.querySelector('.hero .tagline');
        if (tag) { tag.style.transform = `translateY(${sy * 0.12}px)`; tag.style.opacity = Math.max(0, 1 - sy / 400); }
        document.querySelectorAll('.method-number').forEach((n) => {
          const r = n.parentElement.getBoundingClientRect();
          n.style.transform = `translateY(${(r.top - window.innerHeight / 2) * 0.06}px)`;
        });
        scrollTick = false;
      });
      scrollTick = true;
    }
  }, { passive: true });

  // Method flow activation
  const ms = document.querySelector('.method-grid');
  if (ms) {
    const fo = new IntersectionObserver((e) => { e.forEach((x) => { if (x.isIntersecting) { ms.classList.add('flow-active'); fo.unobserve(x.target); } }); }, { threshold: 0.15 });
    fo.observe(ms);
  }

  // ─────────────────────────────────────────────
  // REPORT PREVIEW — animated reveal
  // ─────────────────────────────────────────────
  const reportObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('report-visible');
        reportObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.report-preview').forEach((el) => reportObs.observe(el));

  // ─────────────────────────────────────────────
  // MOBILE NAV
  // ─────────────────────────────────────────────
  const navT = document.querySelector('.nav-toggle');
  const navL = document.querySelector('.nav-links');
  if (navT && navL) {
    navT.addEventListener('click', () => { navL.classList.toggle('open'); navT.setAttribute('aria-expanded', navL.classList.contains('open')); });
    navL.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { navL.classList.remove('open'); navT.setAttribute('aria-expanded', 'false'); }));
  }

  // ─────────────────────────────────────────────
  // CONTACT FORM
  // ─────────────────────────────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const msg = document.getElementById('form-message');
      btn.disabled = true; btn.textContent = 'Sending\u2026';
      if (msg) msg.textContent = '';
      try {
        const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.querySelector('[name="name"]').value.trim(), email: form.querySelector('[name="email"]').value.trim(), message: form.querySelector('[name="message"]').value.trim() }) });
        if (!r.ok) throw new Error((await r.json()).error || 'Failed');
        form.reset();
        if (msg) { msg.textContent = 'Sent. We\u2019ll be in touch.'; msg.className = 'form-message success'; }
      } catch (err) { if (msg) { msg.textContent = err.message; msg.className = 'form-message error'; } }
      finally { btn.disabled = false; btn.textContent = 'Send message'; }
    });
  }

  // ─────────────────────────────────────────────
  // RESEARCH PAGE
  // ─────────────────────────────────────────────
  const barObs = new IntersectionObserver((e) => {
    e.forEach((x) => { if (x.isIntersecting) { x.target.querySelectorAll('.bar-fill').forEach((f, i) => { setTimeout(() => { f.style.width = f.dataset.width || '0%'; }, i * 120); }); barObs.unobserve(x.target); } });
  }, { threshold: 0.2 });
  document.querySelectorAll('.bar-chart').forEach((c) => barObs.observe(c));
  document.querySelectorAll('.company-card').forEach((c) => c.addEventListener('click', () => c.classList.toggle('expanded')));
})();
