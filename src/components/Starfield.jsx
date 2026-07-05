import React, { useEffect, useRef } from 'react';

// ─── Injected CSS: nebula blobs + shooting star ─────────────────────────────
const STYLES = `
@keyframes nebula-drift-1 {
  0%   { transform: translate(0,0) scale(1);        opacity: 0.13; }
  40%  { transform: translate(50px,-35px) scale(1.1); opacity: 0.19; }
  70%  { transform: translate(-25px,45px) scale(0.95); opacity: 0.10; }
  100% { transform: translate(0,0) scale(1);        opacity: 0.13; }
}
@keyframes nebula-drift-2 {
  0%   { transform: translate(0,0) scale(1.05);       opacity: 0.10; }
  40%  { transform: translate(-45px,30px) scale(0.9);  opacity: 0.16; }
  70%  { transform: translate(35px,-55px) scale(1.12); opacity: 0.09; }
  100% { transform: translate(0,0) scale(1.05);       opacity: 0.10; }
}
@keyframes nebula-drift-3 {
  0%   { transform: translate(0,0) scale(1);   opacity: 0.07; }
  50%  { transform: translate(60px,30px) scale(1.08); opacity: 0.12; }
  100% { transform: translate(0,0) scale(1);   opacity: 0.07; }
}
@keyframes shooting-star {
  0%   { transform: translateX(0) translateY(0); opacity: 0; }
  8%   { opacity: 1; }
  100% { transform: translateX(850px) translateY(380px); opacity: 0; }
}

/* Nebula blobs */
.nebula-blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
  will-change: transform, opacity;
}
.nebula-1 {
  width: 650px; height: 550px;
  background: radial-gradient(ellipse, rgba(99,102,241,0.45) 0%, rgba(79,70,229,0.22) 45%, transparent 70%);
  top: -120px; left: -80px;
  animation: nebula-drift-1 30s ease-in-out infinite;
}
.nebula-2 {
  width: 750px; height: 620px;
  background: radial-gradient(ellipse, rgba(109,40,217,0.35) 0%, rgba(67,56,202,0.18) 50%, transparent 70%);
  bottom: -180px; right: -120px;
  animation: nebula-drift-2 38s ease-in-out infinite;
}
.nebula-3 {
  width: 420px; height: 360px;
  background: radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.1) 55%, transparent 70%);
  top: 38%; left: 52%;
  animation: nebula-drift-3 24s ease-in-out infinite;
}

/* Shooting star */
.shooting-star-el {
  position: fixed;
  width: 200px;
  height: 1.5px;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.85) 60%, rgba(200,210,255,0.4) 85%, transparent 100%);
  border-radius: 999px;
  pointer-events: none;
  z-index: 1;
  box-shadow: 0 0 5px 1px rgba(220,225,255,0.35);
  animation: shooting-star 1.1s ease-out forwards;
  will-change: transform, opacity;
}

/* Dot grid overlay */
.star-dot-grid {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(148,163,184,0.09) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}

@media (prefers-reduced-motion: reduce) {
  .nebula-blob { animation: none !important; }
  .shooting-star-el { display: none !important; }
}
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  const el = document.createElement('style');
  el.id = 'starfield-styles';
  el.textContent = STYLES;
  document.head.appendChild(el);
  stylesInjected = true;
}

const rand = (a, b) => Math.random() * (b - a) + a;

// ─── Component ────────────────────────────────────────────────────────────────
const Starfield = () => {
  const canvasRef = useRef(null);
  const shootTimerRef = useRef(null);

  // Shooting star spawner
  const spawnShot = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = document.createElement('div');
    el.className = 'shooting-star-el';
    el.style.top = `${rand(4, 40)}%`;
    el.style.left = `${rand(0, 35)}%`;
    el.style.transform = `rotate(${rand(18, 38)}deg)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
    shootTimerRef.current = setTimeout(spawnShot, rand(10000, 20000));
  };

  useEffect(() => {
    injectStyles();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let rafId;
    let starsL1 = [], starsL2 = [], starsL3 = [];
    let drift = { angle: 0 };
    let mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let visible = true;
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const onMouse = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 14;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 9;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const build = () => {
      const W = canvas.width, H = canvas.height;

      // Layer 1 — faint distant stars — pure white, very small
      starsL1 = Array.from({ length: 140 }, () => ({
        x: rand(0, W), y: rand(0, H),
        r: rand(0.25, 0.75),
        alpha: rand(0.15, 0.45),
        ts: rand(0.002, 0.007) * (Math.random() < 0.5 ? 1 : -1),
        vx: rand(-0.025, 0.025), vy: rand(-0.015, 0.015),
      }));

      // Layer 2 — mid stars — slightly larger, cool white-blue
      starsL2 = Array.from({ length: 70 }, () => ({
        x: rand(0, W), y: rand(0, H),
        r: rand(0.6, 1.3),
        alpha: rand(0.2, 0.55),
        ts: rand(0.003, 0.009) * (Math.random() < 0.5 ? 1 : -1),
        vx: rand(-0.055, 0.055), vy: rand(-0.035, 0.035),
        blue: Math.random() < 0.4, // slight blue tint on some
      }));

      // Layer 3 — foreground bright accent stars (still white, just slightly larger & brighter)
      starsL3 = Array.from({ length: 18 }, () => ({
        x: rand(0, W), y: rand(0, H),
        r: rand(1.2, 2.0),
        alpha: rand(0.3, 0.7),
        ts: rand(0.005, 0.012) * (Math.random() < 0.5 ? 1 : -1),
        vx: rand(-0.1, 0.1), vy: rand(-0.07, 0.07),
        glowR: rand(0, 1.5), glowDir: 1, glowSpeed: rand(0.008, 0.018),
      }));
    };

    // Draw a gently glowing bright star (white/ice-blue only)
    const drawBrightStar = (x, y, r, glowR, alpha) => {
      // Glow halo — icy white-blue
      const g = ctx.createRadialGradient(x, y, 0, x, y, (r + glowR) * 5);
      g.addColorStop(0, `rgba(200,215,255,${(alpha * 0.6).toFixed(2)})`);
      g.addColorStop(0.5, `rgba(180,200,255,${(alpha * 0.15).toFixed(2)})`);
      g.addColorStop(1, 'rgba(180,200,255,0)');
      ctx.beginPath();
      ctx.arc(x, y, (r + glowR) * 5, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      // Core
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,240,255,${alpha.toFixed(2)})`;
      ctx.fill();
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      build();
    };
    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      if (!visible) { rafId = requestAnimationFrame(animate); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      if (!reduced) {
        drift.angle += 0.00007;
      }
      const driftX = Math.sin(drift.angle) * 22;
      const driftY = Math.cos(drift.angle * 0.65) * 14;

      // ── Layer 1: distant stars ──
      for (const s of starsL1) {
        if (!reduced) {
          s.x += s.vx; s.y += s.vy;
          if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
          if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
          s.alpha += s.ts;
          if (s.alpha > 0.5) s.ts = -Math.abs(s.ts);
          if (s.alpha < 0.05) s.ts = Math.abs(s.ts);
        }
        const px = s.x + driftX * 0.2 + mouse.x * 0.15;
        const py = s.y + driftY * 0.2 + mouse.y * 0.12;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,228,255,${s.alpha.toFixed(2)})`;
        ctx.fill();
      }

      // ── Layer 2: mid stars ──
      for (const s of starsL2) {
        if (!reduced) {
          s.x += s.vx; s.y += s.vy;
          if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
          if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
          s.alpha += s.ts;
          if (s.alpha > 0.6) s.ts = -Math.abs(s.ts);
          if (s.alpha < 0.08) s.ts = Math.abs(s.ts);
        }
        const px = s.x + driftX * 0.5 + mouse.x * 0.3;
        const py = s.y + driftY * 0.5 + mouse.y * 0.25;
        const color = s.blue ? `rgba(185,205,255,${s.alpha.toFixed(2)})` : `rgba(230,238,255,${s.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // ── Layer 3: bright foreground glow stars ──
      for (const s of starsL3) {
        if (!reduced) {
          s.x += s.vx; s.y += s.vy;
          if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
          if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
          s.alpha += s.ts;
          if (s.alpha > 0.75) s.ts = -Math.abs(s.ts);
          if (s.alpha < 0.15) s.ts = Math.abs(s.ts);
          s.glowR += s.glowSpeed * s.glowDir;
          if (s.glowR > 2) s.glowDir = -1;
          if (s.glowR < 0) s.glowDir = 1;
        }
        const px = s.x + driftX * 0.9 + mouse.x * 0.55;
        const py = s.y + driftY * 0.9 + mouse.y * 0.45;
        drawBrightStar(px, py, s.r, s.glowR, s.alpha);
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    if (!reduced) {
      shootTimerRef.current = setTimeout(spawnShot, rand(5000, 10000));
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(shootTimerRef.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <>
      {/* Subtle dot grid overlay */}
      <div className="star-dot-grid" aria-hidden="true" />

      {/* Deep indigo/violet nebula blobs */}
      <div className="nebula-blob nebula-1" aria-hidden="true" />
      <div className="nebula-blob nebula-2" aria-hidden="true" />
      <div className="nebula-blob nebula-3" aria-hidden="true" />

      {/* Canvas — 3-layer star system */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
    </>
  );
};

export default Starfield;
