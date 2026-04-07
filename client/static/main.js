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
  if (canvas && canvas.getContext && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let w, h, animFrame;
    let mouseX = -9999, mouseY = -9999, mouseDown = false;
    let time = 0;
    let scrollProgress = 0; // 0 = top, 1 = bottom

    const A = { r: 181, g: 101, b: 74 }; // terracotta accent
    const isMobile = window.innerWidth <= 768;
    const COUNT = isMobile ? Math.min(40, Math.max(28, Math.floor(window.innerWidth / 11))) : Math.min(100, Math.floor(window.innerWidth / 12));
    const CONNECT_DIST = isMobile ? 120 : 180;
    const MOUSE_RADIUS = isMobile ? 200 : 300;

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
      w = canvas.width = document.documentElement.clientWidth;
      h = canvas.height = document.documentElement.clientHeight;
      particles.length = 0;
      packets.length = 0;
      for (let i = 0; i < COUNT; i++) particles.push(new Particle(i));
    }

    function drawConnections(mode) {
      // Connection density varies by mode
      const maxDist = mode === 'network' ? CONNECT_DIST * 0.75 :
                      mode === 'clusters' ? CONNECT_DIST * 0.8 :
                      mode === 'converge' ? CONNECT_DIST * 0.9 :
                      mode === 'chaos' ? CONNECT_DIST * 0.5 :
                      CONNECT_DIST;
      const packetChance = mode === 'network' ? 0.003 : mode === 'flow' ? 0.002 : 0.0005;
      const jStep = isMobile ? 2 : 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j += jStep) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            let alpha = (1 - dist / maxDist) * 0.09;
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

    let lastFrameTime = 0;
    const MOBILE_FRAME_INTERVAL = 1000 / 30; // 30fps cap on mobile only

    function animate(now) {
      if (isMobile && now - lastFrameTime < MOBILE_FRAME_INTERVAL) {
        animFrame = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = now || 0;

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
    window.addEventListener('touchstart', (e) => {
      if (e.touches[0]) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; mouseDown = true; }
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
    }, { passive: true });
    window.addEventListener('touchend', () => { mouseX = -9999; mouseY = -9999; mouseDown = false; });
    window.addEventListener('resize', () => { cancelAnimationFrame(animFrame); init(); animFrame = requestAnimationFrame(animate); });

    function start() {
      init();
      updateScroll();
      animFrame = requestAnimationFrame(animate);
    }

    function deferredStart() {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(start, { timeout: 1500 });
      } else {
        setTimeout(start, 800);
      }
    }

    if (document.readyState === 'complete') {
      deferredStart();
    } else {
      window.addEventListener('load', deferredStart, { once: true });
    }
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

  // Parallax — cache nodes once, batch reads before writes to avoid forced reflows
  const heroTagline = document.querySelector('.hero .tagline');
  const methodNumbers = Array.from(document.querySelectorAll('.method-number'));
  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      const vh = window.innerHeight;

      // READ pass — gather all geometry first
      const reads = new Array(methodNumbers.length);
      for (let i = 0; i < methodNumbers.length; i++) {
        reads[i] = methodNumbers[i].parentElement.getBoundingClientRect().top;
      }

      // WRITE pass — apply all style changes
      if (heroTagline) {
        heroTagline.style.transform = `translateY(${sy * 0.12}px)`;
        heroTagline.style.opacity = Math.max(0, 1 - sy / 400);
      }
      for (let i = 0; i < methodNumbers.length; i++) {
        methodNumbers[i].style.transform = `translateY(${(reads[i] - vh / 2) * 0.06}px)`;
      }
      scrollTick = false;
    });
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

  document.querySelectorAll('.company-card').forEach((card) => {
    var hdr = card.querySelector('.company-header');
    if (hdr) {
      hdr.setAttribute('role', 'button');
      hdr.setAttribute('tabindex', '0');
      hdr.setAttribute('aria-expanded', 'false');
      hdr.addEventListener('click', () => {
        card.classList.toggle('expanded');
        hdr.setAttribute('aria-expanded', card.classList.contains('expanded'));
      });
      hdr.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('expanded');
          hdr.setAttribute('aria-expanded', card.classList.contains('expanded'));
        }
      });
    }

    card.querySelectorAll('.card-tab').forEach((tab) => {
      tab.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const target = tab.dataset.tab;
        card.querySelectorAll('.card-tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        card.querySelectorAll('.card-panel').forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const panel = card.querySelector('[data-panel="' + target + '"]');
        if (panel) panel.classList.add('active');
      });
    });
  });

  // ─────────────────────────────────────────────
  // DASHBOARD TABS
  // ─────────────────────────────────────────────
  document.querySelectorAll('.dash-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.dataset.dash;
      document.querySelectorAll('.dash-tab').forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.dash-panel').forEach(function(p) { p.classList.remove('active'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      var panel = document.querySelector('[data-dash-panel="' + target + '"]');
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.bar-chart').forEach(function(c) { barObs.observe(c); });
      }
    });
  });

  // ─────────────────────────────────────────────
  // SVG CHART BUILDER (shared between charts)
  // ─────────────────────────────────────────────
  var svgNS = 'http://www.w3.org/2000/svg';
  function svgCreate(tag, attrs) {
    var el = document.createElementNS(svgNS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function parseDate(d) { var p = d.split('-'); return new Date(parseInt(p[0]), parseInt(p[1]) - 1); }

  function buildLineChart(config) {
    var svgEl = document.getElementById(config.svgId);
    if (!svgEl) return;

    var companies = config.companies;
    var pad = config.pad || { top: 30, right: 30, bottom: 50, left: 80 };
    var vb = svgEl.viewBox.baseVal;
    var W = vb.width, H = vb.height;
    var cw = W - pad.left - pad.right;
    var ch = H - pad.top - pad.bottom;

    var allDates = [], maxVal = 0;
    companies.forEach(function(co) {
      co.points.forEach(function(p) {
        allDates.push(parseDate(p.date));
        if (p.val > maxVal) maxVal = p.val;
      });
    });
    var minTime = Math.min.apply(null, allDates.map(function(d) { return d.getTime(); }));
    var maxTime = Math.max.apply(null, allDates.map(function(d) { return d.getTime(); }));
    var timeRange = maxTime - minTime || 1;

    var niceMax = maxVal;
    if (maxVal > 100) niceMax = Math.ceil(maxVal / 100) * 100;
    else if (maxVal > 10) niceMax = Math.ceil(maxVal / 10) * 10;
    else niceMax = Math.ceil(maxVal);

    function xPos(dateStr) { return pad.left + ((parseDate(dateStr).getTime() - minTime) / timeRange) * cw; }
    function yPos(v) { return pad.top + ch - (v / niceMax) * ch; }

    var gridG = svgCreate('g', {});
    var yTicks = 5;
    for (var i = 0; i <= yTicks; i++) {
      var v = (niceMax / yTicks) * i;
      var y = yPos(v);
      gridG.appendChild(svgCreate('line', { x1: pad.left, y1: y, x2: W - pad.right, y2: y, stroke: '#e5e5e5', 'stroke-width': '1' }));
      var lbl = svgCreate('text', { x: pad.left - 10, y: y + 4, fill: '#999', 'font-size': '11', 'text-anchor': 'end', 'font-family': 'Instrument Sans, sans-serif' });
      lbl.textContent = config.formatY ? config.formatY(v) : (v >= 1 ? '$' + Math.round(v) + 'B' : '$' + (v * 1000).toFixed(0) + 'M');
      gridG.appendChild(lbl);
    }

    var usedYears = {};
    var lastLabelX = -Infinity;
    (config.xLabels || []).forEach(function(d) {
      var x = xPos(d);
      if (x >= pad.left && x <= W - pad.right) {
        var year = d.substring(0, 4);
        if (usedYears[year] || (x - lastLabelX) < 35) return;
        usedYears[year] = true;
        lastLabelX = x;
        gridG.appendChild(svgCreate('line', { x1: x, y1: pad.top, x2: x, y2: H - pad.bottom, stroke: '#f0f0f0', 'stroke-width': '1' }));
        var t = svgCreate('text', { x: x, y: H - pad.bottom + 20, fill: '#999', 'font-size': '11', 'text-anchor': 'middle', 'font-family': 'Instrument Sans, sans-serif' });
        t.textContent = year;
        gridG.appendChild(t);
      }
    });
    svgEl.appendChild(gridG);

    svgEl.appendChild(svgCreate('line', { x1: pad.left, y1: H - pad.bottom, x2: W - pad.right, y2: H - pad.bottom, stroke: '#ccc', 'stroke-width': '1' }));
    svgEl.appendChild(svgCreate('line', { x1: pad.left, y1: pad.top, x2: pad.left, y2: H - pad.bottom, stroke: '#ccc', 'stroke-width': '1' }));

    var defs = svgCreate('defs', {});
    companies.forEach(function(co, ci) {
      var grad = svgCreate('linearGradient', { id: config.svgId + '-grad-' + ci, x1: '0', y1: '0', x2: '0', y2: '1' });
      var stop1 = svgCreate('stop', { offset: '0%', 'stop-color': co.color, 'stop-opacity': '0.18' });
      var stop2 = svgCreate('stop', { offset: '100%', 'stop-color': co.color, 'stop-opacity': '0.01' });
      grad.appendChild(stop1);
      grad.appendChild(stop2);
      defs.appendChild(grad);
    });
    svgEl.appendChild(defs);

    var highlighted = null;
    var lineGroups = [];

    companies.forEach(function(co, ci) {
      var g = svgCreate('g', { 'data-company': ci, style: 'transition: opacity 0.3s;' });
      var areaPath = 'M', linePath = 'M';
      co.points.forEach(function(p, pi) {
        var x = xPos(p.date), y = yPos(p.val);
        linePath += (pi === 0 ? '' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        areaPath += (pi === 0 ? '' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
      });
      var lastP = co.points[co.points.length - 1], firstP = co.points[0];
      areaPath += 'L' + xPos(lastP.date).toFixed(1) + ',' + yPos(0) + 'L' + xPos(firstP.date).toFixed(1) + ',' + yPos(0) + 'Z';

      g.appendChild(svgCreate('path', { d: areaPath, fill: 'url(#' + config.svgId + '-grad-' + ci + ')' }));
      g.appendChild(svgCreate('path', { d: linePath, fill: 'none', stroke: co.color, 'stroke-width': '2.5', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

      co.points.forEach(function(p) {
        var cx = xPos(p.date), cy = yPos(p.val);
        var dot = svgCreate('circle', { cx: cx, cy: cy, r: '4', fill: co.color, stroke: '#fff', 'stroke-width': '2', style: 'cursor:pointer;' });
        dot.addEventListener('mouseenter', function(ev) { showTip(ev, co.name, p); });
        dot.addEventListener('mouseleave', hideTip);
        dot.addEventListener('click', function(ev) { ev.stopPropagation(); showTip(ev, co.name, p); });
        g.appendChild(dot);
      });

      svgEl.appendChild(g);
      lineGroups.push({ g: g, co: co, idx: ci });
    });

    var tooltip = document.getElementById(config.tooltipId);
    function showTip(ev, name, p) {
      if (!tooltip) return;
      var valStr = p.val >= 1 ? '$' + p.val.toFixed(1) + 'B' : '$' + (p.val * 1000).toFixed(0) + 'M';
      if (p.val >= 1000) valStr = '$' + (p.val / 1000).toFixed(2) + 'T';
      var dateStr = p.date.replace('-', '/');
      var roundStr = p.label ? '<br><span style="color:var(--text-muted);font-size:0.75rem;">' + p.label + '</span>' : '';
      tooltip.innerHTML = '<strong>' + name + '</strong> ' + valStr + '<br>' + dateStr + roundStr;
      tooltip.style.left = '0px';
      tooltip.style.top = '0px';
      tooltip.classList.add('visible');
      var wrap = document.getElementById(config.wrapId);
      var wRect = wrap.getBoundingClientRect();
      var tipW = tooltip.offsetWidth;
      var tipH = tooltip.offsetHeight;
      var tipLeft = ev.clientX - wRect.left + 14;
      var tipTop = ev.clientY - wRect.top - tipH - 8;
      if (tipLeft + tipW > wRect.width) tipLeft = Math.max(0, ev.clientX - wRect.left - tipW - 14);
      if (tipTop < 0) tipTop = ev.clientY - wRect.top + 14;
      if (tipLeft < 0) tipLeft = 4;
      tooltip.style.left = tipLeft + 'px';
      tooltip.style.top = tipTop + 'px';
    }
    function hideTip() { if (tooltip) tooltip.classList.remove('visible'); }

    var legendEl = document.getElementById(config.legendId);
    if (legendEl) {
      companies.forEach(function(co, ci) {
        var item = document.createElement('div');
        item.className = 'legend-item';
        item.dataset.idx = ci;
        item.innerHTML = '<span class="legend-dot" style="background:' + co.color + ';"></span>' + co.name;
        item.addEventListener('click', function() { toggle(ci); });
        legendEl.appendChild(item);
      });
    }

    function toggle(idx) {
      if (highlighted === idx) {
        highlighted = null;
        lineGroups.forEach(function(lg) { lg.g.style.opacity = '1'; });
        legendEl.querySelectorAll('.legend-item').forEach(function(li) { li.classList.remove('dimmed'); });
      } else {
        highlighted = idx;
        lineGroups.forEach(function(lg) { lg.g.style.opacity = lg.idx === idx ? '1' : '0.12'; });
        legendEl.querySelectorAll('.legend-item').forEach(function(li) { li.classList.toggle('dimmed', parseInt(li.dataset.idx) !== idx); });
      }
    }

    svgEl.addEventListener('click', function() {
      if (highlighted !== null) {
        highlighted = null;
        lineGroups.forEach(function(lg) { lg.g.style.opacity = '1'; });
        legendEl.querySelectorAll('.legend-item').forEach(function(li) { li.classList.remove('dimmed'); });
      }
    });
  }

  // ─────────────────────────────────────────────
  // VALUATION RACE CHART
  // ─────────────────────────────────────────────
  buildLineChart({
    svgId: 'valuation-race-chart',
    tooltipId: 'valuation-tooltip',
    wrapId: 'valuation-race-wrap',
    legendId: 'valuation-legend',
    xLabels: ['2014-01', '2019-01', '2021-01', '2023-01', '2024-01', '2025-01', '2026-01', '2026-04'],
    formatY: function(v) {
      if (v >= 1000) return '$' + (v / 1000).toFixed(1) + 'T';
      if (v >= 1) return '$' + Math.round(v) + 'B';
      return '$' + (v * 1000).toFixed(0) + 'M';
    },
    companies: [
      {
        name: 'OpenAI', color: '#10A37F',
        points: [
          { date: '2023-01', val: 29, label: 'MSFT $10B' },
          { date: '2024-10', val: 157, label: 'Series A PBC' },
          { date: '2025-03', val: 300, label: 'SoftBank $40B' },
          { date: '2026-02', val: 840, label: 'Series B' },
          { date: '2026-03', val: 852, label: 'Series B ext.' }
        ]
      },
      {
        name: 'Anthropic', color: '#d4a843',
        points: [
          { date: '2022-04', val: 4, label: 'Series B' },
          { date: '2023-02', val: 4.6, label: 'Google strategic' },
          { date: '2023-05', val: 4.1, label: 'Series C' },
          { date: '2023-08', val: 4.1, label: 'SK Telecom strategic' },
          { date: '2023-12', val: 18.4, label: 'Series D' },
          { date: '2024-06', val: 18.4, label: 'Series E' },
          { date: '2025-01', val: 60, label: 'Series D ext.' },
          { date: '2025-03', val: 61.5, label: 'Series E' },
          { date: '2025-09', val: 183, label: 'Series F' },
          { date: '2026-02', val: 380, label: 'Series G' }
        ]
      },
      {
        name: 'Google DeepMind', color: '#4285F4',
        points: [
          { date: '2014-01', val: 0.5, label: 'Acquired' },
          { date: '2024-01', val: 1800, label: 'Alphabet cap' },
          { date: '2025-01', val: 2400, label: 'Alphabet cap' },
          { date: '2026-03', val: 3600, label: 'Alphabet cap' }
        ]
      },
      {
        name: 'Meta AI', color: '#0668E1',
        points: [
          { date: '2024-01', val: 900, label: 'Meta cap' },
          { date: '2025-01', val: 1400, label: 'Meta cap' },
          { date: '2026-03', val: 1500, label: 'Meta cap' }
        ]
      },
      {
        name: 'xAI', color: '#1DA1F2',
        points: [
          { date: '2023-12', val: 1, label: 'Initial' },
          { date: '2024-05', val: 18, label: 'Series B' },
          { date: '2025-03', val: 113, label: 'X acq.' },
          { date: '2025-09', val: 200, label: 'Series D' },
          { date: '2026-01', val: 230, label: 'Series E' },
          { date: '2026-02', val: 250, label: 'SpaceX acq.' }
        ]
      },
      {
        name: 'Perplexity', color: '#20B8CD',
        points: [
          { date: '2023-06', val: 0.15, label: 'Seed' },
          { date: '2024-01', val: 0.52, label: 'Series B' },
          { date: '2024-04', val: 1, label: 'B+' },
          { date: '2024-06', val: 3, label: 'Series C' },
          { date: '2024-12', val: 9, label: 'Series D' },
          { date: '2025-06', val: 14, label: 'Series E' },
          { date: '2025-09', val: 20, label: 'E-2' },
          { date: '2026-01', val: 21.2, label: 'E-6' }
        ]
      },
      {
        name: 'Kimi', color: '#6366F1',
        points: [
          { date: '2023-06', val: 0.3, label: 'Angel' },
          { date: '2024-02', val: 2.5, label: 'Series A' },
          { date: '2025-10', val: 4.3, label: 'Series C' },
          { date: '2026-02', val: 10, label: 'Series D' },
          { date: '2026-03', val: 18, label: 'Seeking $1B' }
        ]
      },
      {
        name: 'Mistral', color: '#FF7000',
        points: [
          { date: '2023-12', val: 2, label: 'Series A' },
          { date: '2024-06', val: 6, label: 'Series B' },
          { date: '2025-09', val: 13.7, label: 'Series C' },
          { date: '2026-03', val: 14, label: 'Current' }
        ]
      }
    ]
  });

  // ─────────────────────────────────────────────
  // CUMULATIVE FUNDING SVG CHART
  // ─────────────────────────────────────────────
  buildLineChart({
    svgId: 'funding-chart',
    tooltipId: 'funding-tooltip',
    wrapId: 'funding-chart-wrap',
    legendId: 'funding-legend',
    xLabels: ['2019-07', '2021-01', '2022-01', '2023-01', '2024-01', '2025-01', '2026-01', '2026-04'],
    companies: [
      {
        name: 'OpenAI', color: '#10A37F',
        points: [
          { date: '2019-07', val: 1 },
          { date: '2023-01', val: 11 },
          { date: '2024-10', val: 17.6 },
          { date: '2025-03', val: 57.6 },
          { date: '2026-02', val: 167.6 },
          { date: '2026-03', val: 189.6 }
        ]
      },
      {
        name: 'Anthropic', color: '#d4a843',
        points: [
          { date: '2021-05', val: 0.124 },
          { date: '2022-04', val: 0.704 },
          { date: '2023-02', val: 1.004 },
          { date: '2023-05', val: 1.454 },
          { date: '2023-09', val: 2.704 },
          { date: '2023-12', val: 3.454 },
          { date: '2024-03', val: 6.204 },
          { date: '2024-06', val: 8.204 },
          { date: '2024-11', val: 12.204 },
          { date: '2025-01', val: 14.204 },
          { date: '2025-03', val: 17.704 },
          { date: '2025-07', val: 18.704 },
          { date: '2025-09', val: 31.704 },
          { date: '2025-11', val: 37.204 },
          { date: '2026-02', val: 67.3 }
        ]
      },
      {
        name: 'xAI', color: '#1DA1F2',
        points: [
          { date: '2023-12', val: 0.134 },
          { date: '2024-05', val: 6.134 },
          { date: '2025-09', val: 16.134 },
          { date: '2026-01', val: 36.134 }
        ]
      },
      {
        name: 'Mistral', color: '#FF7000',
        points: [
          { date: '2023-06', val: 0.115 },
          { date: '2023-12', val: 0.53 },
          { date: '2024-06', val: 1.19 },
          { date: '2025-09', val: 2.27 },
          { date: '2026-03', val: 3.1 }
        ]
      },
      {
        name: 'Perplexity', color: '#20B8CD',
        points: [
          { date: '2023-06', val: 0.026 },
          { date: '2024-01', val: 0.099 },
          { date: '2024-04', val: 0.264 },
          { date: '2024-06', val: 0.514 },
          { date: '2024-12', val: 1.014 },
          { date: '2025-06', val: 1.514 },
          { date: '2025-09', val: 1.714 }
        ]
      },
      {
        name: 'Kimi', color: '#6366F1',
        points: [
          { date: '2023-06', val: 0.05 },
          { date: '2024-02', val: 1.05 },
          { date: '2025-10', val: 1.55 },
          { date: '2026-02', val: 2.6 }
        ]
      }
    ]
  });
})();
