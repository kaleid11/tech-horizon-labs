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
  // ANTI-SPAM — global fetch interceptor
  //
  // Wraps window.fetch so every POST to /api/contact, /api/newsletter,
  // and /api/audit automatically includes a Cloudflare Turnstile token
  // plus a honeypot field value.
  //
  // Loads the Turnstile script lazily (only when the sitekey meta tag
  // is present). In dev (no TURNSTILE_SITEKEY), falls through so local
  // development isn't blocked; the server mirrors this behaviour.
  // ─────────────────────────────────────────────
  (function installAntiSpamFetch() {
    const meta = document.querySelector('meta[name="turnstile-sitekey"]');
    const sitekey = meta && meta.getAttribute('content');
    const PROTECTED = ['/api/contact', '/api/newsletter', '/api/audit'];

    function isProtected(url) {
      if (typeof url !== 'string') return false;
      return PROTECTED.some(function(p) { return url === p || url.indexOf(p + '?') === 0; });
    }

    function readHoneypot() {
      const el = document.querySelector('input[name="company_website"]');
      return el && typeof el.value === 'string' ? el.value : '';
    }

    let turnstileLoadPromise = null;
    function loadTurnstile() {
      if (turnstileLoadPromise) return turnstileLoadPromise;
      turnstileLoadPromise = new Promise(function(resolve, reject) {
        if (window.turnstile) { resolve(); return; }
        const s = document.createElement('script');
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        s.defer = true;
        s.onload = function() {
          const start = Date.now();
          (function poll() {
            if (window.turnstile) { resolve(); return; }
            if (Date.now() - start > 8000) { reject(new Error('Turnstile load timeout')); return; }
            setTimeout(poll, 50);
          })();
        };
        s.onerror = function() { reject(new Error('Turnstile script failed to load')); };
        document.head.appendChild(s);
      });
      return turnstileLoadPromise;
    }

    let widgetReady = null;
    let widgetId = null;
    let widgetContainer = null;
    let pending = null;

    function ensureWidget() {
      if (widgetReady) return widgetReady;
      widgetReady = loadTurnstile().then(function() {
        return new Promise(function(resolve) {
          widgetContainer = document.createElement('div');
          widgetContainer.style.position = 'absolute';
          widgetContainer.style.left = '-9999px';
          widgetContainer.style.top = '-9999px';
          widgetContainer.setAttribute('aria-hidden', 'true');
          document.body.appendChild(widgetContainer);
          widgetId = window.turnstile.render(widgetContainer, {
            sitekey: sitekey,
            size: 'invisible',
            retry: 'auto',
            'refresh-expired': 'auto',
            callback: function(token) {
              if (pending) { pending.resolve(token); pending = null; }
            },
            'error-callback': function(err) {
              if (pending) { pending.reject(new Error('Turnstile error: ' + err)); pending = null; }
            },
            'timeout-callback': function() {
              if (pending) { pending.reject(new Error('Turnstile timed out')); pending = null; }
            },
          });
          resolve();
        });
      });
      return widgetReady;
    }

    function getTurnstileToken() {
      return ensureWidget().then(function() {
        return new Promise(function(resolve, reject) {
          pending = { resolve: resolve, reject: reject };
          try {
            window.turnstile.reset(widgetId);
            window.turnstile.execute(widgetId);
          } catch (err) {
            pending = null;
            reject(err);
          }
          setTimeout(function() {
            if (pending) {
              const p = pending; pending = null;
              p.reject(new Error('Turnstile execution timed out'));
            }
          }, 15000);
        });
      });
    }

    const origFetch = window.fetch.bind(window);
    window.fetch = function patchedFetch(input, init) {
      const url = typeof input === 'string' ? input : (input && input.url) || '';
      const method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();

      if (method !== 'POST' || !isProtected(url)) {
        return origFetch(input, init);
      }

      return (function() {
        const honeypotValue = readHoneypot();
        const baseBodyPromise = (sitekey
          ? getTurnstileToken().catch(function(err) {
              console.warn('[anti-spam] turnstile token unavailable:', err && err.message);
              return null;
            })
          : Promise.resolve(null)
        );

        return baseBodyPromise.then(function(token) {
          let body = init && init.body;
          if (typeof body === 'string') {
            try {
              const obj = JSON.parse(body);
              if (token) obj.turnstileToken = token;
              obj.company_website = honeypotValue;
              body = JSON.stringify(obj);
            } catch (_) {
              // body is not JSON — leave alone
            }
          } else if (!body || typeof body === 'object') {
            const obj = Object.assign({}, body || {});
            if (token) obj.turnstileToken = token;
            obj.company_website = honeypotValue;
            body = JSON.stringify(obj);
            init = Object.assign({}, init || {}, {
              headers: Object.assign({ 'Content-Type': 'application/json' }, (init && init.headers) || {}),
            });
          }
          const newInit = Object.assign({}, init || {}, { body: body });
          return origFetch(input, newInit);
        });
      })();
    };
  })();

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
    const fieldNames = ['name', 'email', 'message'];
    const clearInvalid = () => fieldNames.forEach((n) => {
      const el = form.querySelector('[name="' + n + '"]');
      if (el) el.removeAttribute('aria-invalid');
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const msg = document.getElementById('form-message');
      btn.disabled = true; btn.textContent = 'Sending…';
      if (msg) {
        msg.textContent = '';
        msg.setAttribute('role', 'status');
        msg.className = '';
      }
      clearInvalid();
      const nameEl = form.querySelector('[name="name"]');
      const emailEl = form.querySelector('[name="email"]');
      const messageEl = form.querySelector('[name="message"]');
      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const message = messageEl.value.trim();
      if (!name) nameEl.setAttribute('aria-invalid', 'true');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) emailEl.setAttribute('aria-invalid', 'true');
      if (!message) messageEl.setAttribute('aria-invalid', 'true');
      if (form.querySelector('[aria-invalid="true"]')) {
        if (msg) {
          msg.setAttribute('role', 'alert');
          msg.textContent = 'Please fill in every field with a valid email.';
          msg.className = 'form-message error';
        }
        const firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad && typeof firstBad.focus === 'function') firstBad.focus();
        btn.disabled = false; btn.textContent = 'Send message';
        return;
      }
      try {
        const r = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, message: message }),
        });
        if (!r.ok) throw new Error((await r.json()).error || 'Failed');
        form.reset();
        clearInvalid();
        if (msg) { msg.textContent = 'Sent. We’ll be in touch.'; msg.className = 'form-message success'; }
      } catch (err) {
        if (msg) {
          msg.setAttribute('role', 'alert');
          msg.textContent = err.message;
          msg.className = 'form-message error';
        }
      } finally {
        btn.disabled = false; btn.textContent = 'Send message';
      }
    });
    fieldNames.forEach((n) => {
      const el = form.querySelector('[name="' + n + '"]');
      if (el) el.addEventListener('input', () => el.removeAttribute('aria-invalid'));
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
    xLabels: ['2014-01', '2019-01', '2021-01', '2023-01', '2024-01', '2025-01', '2026-01', '2026-06'],
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
          { date: '2026-02', val: 380, label: 'Series G' },
          { date: '2026-05', val: 965, label: 'Series H' }
        ]
      },
      {
        name: 'Google DeepMind', color: '#4285F4',
        points: [
          { date: '2014-01', val: 0.5, label: 'Acquired' },
          { date: '2024-01', val: 1800, label: 'Alphabet cap' },
          { date: '2025-01', val: 2400, label: 'Alphabet cap' },
          { date: '2026-03', val: 3600, label: 'Alphabet cap' },
          { date: '2026-06', val: 4300, label: 'Alphabet cap' }
        ]
      },
      {
        name: 'Meta AI', color: '#0668E1',
        points: [
          { date: '2024-01', val: 900, label: 'Meta cap' },
          { date: '2025-01', val: 1400, label: 'Meta cap' },
          { date: '2026-03', val: 1450, label: 'Meta cap' },
          { date: '2026-06', val: 1440, label: 'Meta cap' }
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
          { date: '2026-05', val: 20, label: 'Meituan-led $2B' }
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
    xLabels: ['2019-07', '2021-01', '2022-01', '2023-01', '2024-01', '2025-01', '2026-01', '2026-06'],
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
          { date: '2026-02', val: 67.3 },
          { date: '2026-05', val: 132.3 }
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
          { date: '2026-02', val: 2.6 },
          { date: '2026-05', val: 4.6 }
        ]
      }
    ]
  });
})();

/* =====================================================
   ICP ROTATOR — Hero H1 stable-claimable rotating span
   Cycles through 10 ICPs. Stable static H1 default
   ("growing businesses") is SSR'd for AEO/GEO.
   ===================================================== */
(function () {
  'use strict';
  const el = document.querySelector('.icp-rotator');
  if (!el) return;

  const ICPS = [
    'growing businesses',
    'VCs and private equity',
    'wealth managers and financial advisors',
    'SaaS scale-ups',
    'talent agencies',
    'legal firms',
    'construction and trades',
    'healthcare and allied health',
    'manufacturing',
    'engineering and advisory firms'
  ];

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // honour reduced motion — stay on default
  }

  // Measure widest ICP so the span min-width prevents layout shift
  try {
    const probe = document.createElement('span');
    const cs = window.getComputedStyle(el);
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;';
    probe.style.font = cs.font;
    probe.style.fontFamily = cs.fontFamily;
    probe.style.fontSize = cs.fontSize;
    probe.style.fontWeight = cs.fontWeight;
    probe.style.letterSpacing = cs.letterSpacing;
    document.body.appendChild(probe);
    let widest = 0;
    for (let i = 0; i < ICPS.length; i++) {
      probe.textContent = ICPS[i];
      if (probe.offsetWidth > widest) widest = probe.offsetWidth;
    }
    document.body.removeChild(probe);
    if (widest > 0) el.style.minWidth = Math.ceil(widest) + 'px';
  } catch (_) { /* noop */ }

  let idx = 0;
  let timer = null;
  let inView = true;
  const HOLD_MS = 2000;
  const FADE_MS = 300;

  function tick() {
    if (!inView) return;
    el.classList.add('is-fading');
    setTimeout(function () {
      idx = (idx + 1) % ICPS.length;
      el.textContent = ICPS[idx];
      el.classList.remove('is-fading');
      timer = setTimeout(tick, HOLD_MS);
    }, FADE_MS);
  }

  function start() {
    if (timer) return;
    timer = setTimeout(tick, HOLD_MS);
  }
  function stop() {
    if (timer) { clearTimeout(timer); timer = null; }
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        inView = e.isIntersecting;
        if (inView) start(); else stop();
      });
    }, { threshold: 0 });
    io.observe(el);
  } else {
    start();
  }
})();

/* =====================================================
   HERO RUN-LOG REPLAY — reveals the Theo run-log lines
   one by one with a trailing caret, like a log replaying.
   Lines are SSR'd visible for crawlers and no-JS; JS hides
   them at startup and replays once when the panel is seen.
   ===================================================== */
(function () {
  'use strict';
  const body = document.querySelector('#hero-runlog .hero-runlog-body');
  if (!body) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // honour reduced motion — keep the full log static
  }

  const lines = Array.from(body.querySelectorAll('.runlog-line'));
  if (!lines.length) return;

  const STEP_MS = 480;
  const HUMAN_PAUSE_MS = 950; // a beat before the human-approval line lands
  const caret = document.createElement('span');
  caret.className = 'runlog-caret';
  caret.setAttribute('aria-hidden', 'true');
  caret.textContent = '▌';

  lines.forEach((l) => { l.style.visibility = 'hidden'; });

  let started = false;
  function play() {
    if (started) return;
    started = true;
    let i = 0;
    function step() {
      if (i >= lines.length) {
        if (caret.parentNode) caret.parentNode.removeChild(caret);
        return;
      }
      const line = lines[i];
      line.style.visibility = '';
      line.appendChild(caret);
      i++;
      const next = lines[i];
      const delay = next && next.classList.contains('rl-human') ? HUMAN_PAUSE_MS : STEP_MS;
      setTimeout(step, delay);
    }
    step();
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { play(); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(body);
  } else {
    play();
  }
})();

/* =====================================================
   WEBMCP — expose interactive tools to in-browser AI agents

   Registers WebMCP tools on navigator.modelContext so AI
   agents running in the browser can use the site's
   interactive features directly: score the AI Readiness
   Assessment, score the 28-question Scorecard, and fetch
   THL's recommended AI tool stack.

   Feature-detected and fully no-op in browsers without
   WebMCP support — no errors, normal behaviour unchanged.
   Logic reuses the in-page data/scoring rules rather than
   duplicating them. All tools are read-only (no network,
   no UI mutation) so they never touch the CSP or backend.
   ===================================================== */
(function () {
  'use strict';

  if (typeof navigator === 'undefined') return;
  var mc = navigator.modelContext;
  if (!mc) return;

  // Register helper — prefers the current registerTool() surface and
  // falls back to the earlier provideContext() bulk API. No-op if
  // neither is present, so unsupported browsers are unaffected.
  function registerTools(tools) {
    if (!tools || !tools.length) return;
    if (typeof mc.registerTool === 'function') {
      tools.forEach(function (t) {
        try { mc.registerTool(t); }
        catch (err) { /* already registered or invalid — ignore */ }
      });
    } else if (typeof mc.provideContext === 'function') {
      try { mc.provideContext({ tools: tools }); }
      catch (err) { /* ignore */ }
    }
  }

  function textResult(text) {
    return { content: [{ type: 'text', text: text }] };
  }

  function statusFor(pct) {
    if (pct >= 70) return 'Strong';
    if (pct >= 40) return 'Developing';
    return 'Needs work';
  }

  // ── AI Readiness Assessment (/assessment) ──
  function buildAssessmentTools() {
    if (!Array.isArray(window.QUESTIONS) || !Array.isArray(window.STAGES) ||
        !Array.isArray(window.DIMENSIONS) || typeof window.getStage !== 'function') {
      return [];
    }
    var QUESTIONS = window.QUESTIONS, DIMENSIONS = window.DIMENSIONS;
    var topics = QUESTIONS.map(function (q, i) { return (i + 1) + '. ' + q.q; }).join(' ');

    return [{
      name: 'score_ai_readiness_assessment',
      description: 'Score the Tech Horizon Labs AI Readiness Assessment (10 questions, result 0–100 mapping to 4 maturity stages: Unaware, ChatGPT Plateau, Enabled, AI-Native). Provide one answer per question as an option index 0–3, where 0 is the least mature option and 3 is the most mature. Returns the score, maturity stage, a per-dimension breakdown, and prioritised recommendations. Questions: ' + topics,
      annotations: { readOnlyHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          answers: {
            type: 'array',
            description: 'Exactly ' + QUESTIONS.length + ' option indices (integers 0–3), one per question in order. 0 = least mature, 3 = most mature.',
            items: { type: 'integer', minimum: 0, maximum: 3 },
            minItems: QUESTIONS.length,
            maxItems: QUESTIONS.length
          }
        },
        required: ['answers']
      },
      execute: function (args) {
        var answers = args && args.answers;
        if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
          return textResult('Error: "answers" must be an array of exactly ' + QUESTIONS.length + ' option indices (0–3).');
        }
        var score = 0;
        for (var i = 0; i < QUESTIONS.length; i++) {
          var idx = answers[i];
          if (typeof idx !== 'number' || idx < 0 || idx > 3 || !QUESTIONS[i].opts[idx]) {
            return textResult('Error: answer ' + (i + 1) + ' must be an integer 0–3.');
          }
          score += QUESTIONS[i].opts[idx].score;
        }
        var stage = window.getStage(score);
        var dims = DIMENSIONS.map(function (dim) {
          var ds = dim.questions.reduce(function (sum, qi) {
            return sum + QUESTIONS[qi].opts[answers[qi]].score;
          }, 0);
          var pct = Math.round((ds / dim.max) * 100);
          return { name: dim.name, score: ds, max: dim.max, percent: pct, status: statusFor(pct) };
        });
        var lines = [];
        lines.push('AI Readiness Assessment — Score: ' + score + '/100');
        lines.push('Maturity stage: ' + stage.stageNum + ' — ' + stage.name);
        lines.push(stage.desc);
        lines.push('');
        lines.push('Dimension breakdown:');
        dims.forEach(function (d) {
          lines.push('• ' + d.name + ': ' + d.score + '/' + d.max + ' (' + d.percent + '% — ' + d.status + ')');
        });
        lines.push('');
        lines.push('Recommended next steps:');
        stage.recs.forEach(function (r, n) { lines.push((n + 1) + '. ' + r); });
        return textResult(lines.join('\n'));
      }
    }];
  }

  // ── AI Readiness Scorecard (/scorecard) ──
  function buildScorecardTools() {
    if (!Array.isArray(window.SECTIONS) || !Array.isArray(window.STAGES) ||
        typeof window.getStage !== 'function') {
      return [];
    }
    var SECTIONS = window.SECTIONS;
    var totalQuestions = SECTIONS.reduce(function (sum, s) { return sum + s.questions.length; }, 0);
    var maxScore = SECTIONS.reduce(function (sum, s) { return sum + s.max; }, 0);
    var layout = SECTIONS.map(function (s) {
      return s.letter + ' (' + s.shortName + ', ' + s.questions.length + ' questions)';
    }).join(', ');

    return [{
      name: 'score_ai_readiness_scorecard',
      description: 'Score the Tech Horizon Labs 28-question AI Readiness Scorecard across 6 dimensions: ' + layout + '. Provide ' + totalQuestions + ' ratings (integers 1–5, where 1 = strongly disagree and 5 = strongly agree) in section order. Returns the total out of ' + maxScore + ', the maturity stage, a per-dimension breakdown, and dimension-specific recommendations sorted weakest-first.',
      annotations: { readOnlyHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          ratings: {
            type: 'array',
            description: 'Exactly ' + totalQuestions + ' ratings (integers 1–5) in section order: ' + layout + '.',
            items: { type: 'integer', minimum: 1, maximum: 5 },
            minItems: totalQuestions,
            maxItems: totalQuestions
          }
        },
        required: ['ratings']
      },
      execute: function (args) {
        var ratings = args && args.ratings;
        if (!Array.isArray(ratings) || ratings.length !== totalQuestions) {
          return textResult('Error: "ratings" must be an array of exactly ' + totalQuestions + ' integers (1–5).');
        }
        for (var i = 0; i < ratings.length; i++) {
          if (typeof ratings[i] !== 'number' || ratings[i] < 1 || ratings[i] > 5) {
            return textResult('Error: rating ' + (i + 1) + ' must be an integer 1–5.');
          }
        }
        var cursor = 0, total = 0;
        var dims = SECTIONS.map(function (sec) {
          var secScore = 0;
          for (var q = 0; q < sec.questions.length; q++) { secScore += ratings[cursor++]; }
          total += secScore;
          var pct = Math.round((secScore / sec.max) * 100);
          return { letter: sec.letter, name: sec.shortName, score: secScore, max: sec.max, percent: pct, status: statusFor(pct), priority: sec.priority };
        });
        var stage = window.getStage(total);
        var sorted = dims.slice().sort(function (a, b) { return (a.score / a.max) - (b.score / b.max); });
        var lines = [];
        lines.push('AI Readiness Scorecard — Score: ' + total + '/' + maxScore);
        lines.push('Maturity stage: ' + stage.stageNum + ' — ' + stage.name);
        lines.push(stage.desc);
        lines.push('');
        lines.push('Dimension breakdown:');
        dims.forEach(function (d) {
          lines.push('• ' + d.letter + ' ' + d.name + ': ' + d.score + '/' + d.max + ' (' + d.percent + '% — ' + d.status + ')');
        });
        lines.push('');
        lines.push('Priorities (weakest first):');
        sorted.forEach(function (d, n) {
          lines.push((n + 1) + '. ' + d.name + ' (' + d.percent + '%): ' + d.priority);
        });
        return textResult(lines.join('\n'));
      }
    }];
  }

  // ── AI Tool Cheat Sheet (/tools) ──
  function buildToolsTools() {
    var grid = document.querySelector('.tools-grid');
    var cards = document.querySelectorAll('.tool-card');
    if (!grid || !cards.length) return [];

    var cats = [];
    document.querySelectorAll('.filter-btn').forEach(function (b) {
      var f = b.getAttribute('data-filter');
      if (f && cats.indexOf(f) === -1) cats.push(f);
    });
    if (cats.indexOf('all') === -1) cats.unshift('all');

    function txt(el, sel) {
      var n = el.querySelector(sel);
      return n ? n.textContent.replace(/\s+/g, ' ').trim() : '';
    }

    return [{
      name: 'recommend_ai_tools',
      description: "Return Tech Horizon Labs' recommended AI tool stack for small and medium businesses. Optionally filter by category. Each result includes the tool name, category, what it is used for, pricing, and THL's note. Available categories: " + cats.join(', ') + '.',
      annotations: { readOnlyHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Category to filter by. Use "all" or omit for every tool.',
            enum: cats
          }
        }
      },
      execute: function (args) {
        var category = (args && args.category) || 'all';
        if (cats.indexOf(category) === -1) {
          return textResult('Error: unknown category "' + category + '". Available: ' + cats.join(', ') + '.');
        }
        var results = [];
        cards.forEach(function (card) {
          if (category !== 'all' && card.getAttribute('data-category') !== category) return;
          results.push({
            name: txt(card, '.tool-name'),
            category: txt(card, '.tool-category'),
            useFor: txt(card, '.tool-use-for'),
            pricing: txt(card, '.tool-pricing'),
            note: txt(card, '.tool-note')
          });
        });
        if (!results.length) return textResult('No tools found for category "' + category + '".');
        var lines = ['Recommended AI tools' + (category !== 'all' ? ' (' + category + ')' : '') + ':', ''];
        results.forEach(function (t, n) {
          lines.push((n + 1) + '. ' + t.name + ' — ' + t.category);
          if (t.useFor) lines.push('   Use for: ' + t.useFor);
          if (t.pricing) lines.push('   Pricing: ' + t.pricing);
          if (t.note) lines.push('   THL note: ' + t.note);
        });
        return textResult(lines.join('\n'));
      }
    }];
  }

  // ── Site-wide tools (every page) ──
  function buildSiteTools() {
    return [{
      name: 'get_company_overview',
      description: 'Get an overview of Tech Horizon Labs: what the company does, who it serves, where it operates, and how to make contact or book a call.',
      annotations: { readOnlyHint: true },
      inputSchema: { type: 'object', properties: {} },
      execute: function () {
        return textResult([
          'Tech Horizon Labs — AI infrastructure as a service (not a SaaS platform).',
          '',
          'What we do: we lay AI infrastructure into the systems a business already runs (email, CRM, databases, documents), implement it into workflows, and train the team to own it. Engagements follow the Horizon Method: Discover (fixed-price feasibility evaluation) → Architect (fixed-priced build phases) → Activate (training and handover) → Partner Tier (ongoing support).',
          '',
          'Theo, our go-to-market agent fleet, runs this pattern in production: market research, lead verification, cold and warm outreach drafting, proposal/RFQ/RFT assembly, and reporting — drafts-only outbound, a human presses send, append-only audit log. First production numbers: 3 qualified meetings booked from 50 emails in week one of a client campaign; 4 meetings in week one on our own pipeline. Details: https://techhorizonlabs.com/infrastructure',
          '',
          'Verticals: growing businesses, VCs and private equity, wealth management, SaaS scale-ups, talent agencies, legal, construction and trades, healthcare and allied health, manufacturing, engineering and project advisory firms.',
          '',
          'Location: Noosa Heads, Queensland, Australia. On-site across Brisbane, Sunshine Coast, and Gold Coast; remote Australia-wide and globally.',
          '',
          'Contact: hello@techhorizonlabs.com · Book a free pre-discovery call (30 min, human-run): https://app.klipycrm.com/book/pre-discovery/free-pre-discovery',
          'Site map for agents: https://techhorizonlabs.com/llms.txt'
        ].join('\n'));
      }
    }, {
      name: 'get_engagement_pricing',
      description: 'Get Tech Horizon Labs engagement pricing: the Horizon Method phases, Block One entry price, build-phase pricing, and ongoing Partner Tier. All prices AUD ex-GST.',
      annotations: { readOnlyHint: true },
      inputSchema: { type: 'object', properties: {} },
      execute: function () {
        return textResult([
          'Tech Horizon Labs pricing (AUD, ex-GST):',
          '',
          '- Pre-discovery call: free, 30 minutes.',
          '- Block One: $8,000 — a fixed-price Feasibility Evaluation ($6,000, 2–3 weeks, ends with a working pilot and a fixed build quote) plus the first month of Partner Tier. The only commitment to start.',
          '- Architect/Activate build phases: fixed-priced from ~$5,000 each (skills libraries, governance packs, data tooling; enablement from ~$4,000), sized by the evaluation and approved one at a time.',
          '- Partner Tier: $2,000/month from month two — strategy sessions, same/next business day support, work-credit pool. Month-to-month, 30 days notice.',
          '- Ad-hoc beyond credit: $210/hour.',
          '- AI Workshop Academy membership: from $197/month.',
          '',
          'Software licences (e.g. Claude seats) are purchased by the client direct at vendor list price — no margin added. All deliverables are client-owned with full export; no lock-in.'
        ].join('\n'));
      }
    }];
  }

  function boot() {
    var tools = buildSiteTools()
      .concat(buildAssessmentTools())
      .concat(buildScorecardTools())
      .concat(buildToolsTools());
    registerTools(tools);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
