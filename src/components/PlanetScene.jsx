import React from 'react';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════════
   CSS-drawn planet illustrations — one per mission stop.
   All planets are positioned absolute (behind content) and partially
   off-screen to the right.
═══════════════════════════════════════════════════════════════════════════ */

/* ── Shared planet wrapper ─────────────────────────────────────────────── */
const PlanetWrapper = ({ size = 360, right = -80, top = '50%', topTranslate = '-50%', children, floatDuration = 14 }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    style={{
      right,
      top,
      transform: `translateY(${topTranslate})`,
      width: size,
      height: size,
      zIndex: 0,
    }}
    animate={{ y: [0, -18, 0] }}
    transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
    aria-hidden="true"
  >
    {children}
  </motion.div>
);

/* ── TERRA — Earth-like blue globe ─────────────────────────────────────── */
const Terra = () => (
  <PlanetWrapper size={400} right={-100} top="55%" topTranslate="-50%" floatDuration={16}>
    {/* Atmosphere glow */}
    <div style={{
      position: 'absolute', inset: -30,
      borderRadius: '50%',
      background: 'radial-gradient(circle, transparent 48%, rgba(56,189,248,0.18) 65%, transparent 80%)',
      filter: 'blur(12px)',
    }} />

    {/* Main sphere */}
    <div style={{
      width: '100%', height: '100%', borderRadius: '50%', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(circle at 33% 32%, #7dd3fc 0%, #2563eb 40%, #1e3a8a 70%, #0a1628 100%)',
      boxShadow: '0 0 80px rgba(56,189,248,0.30), inset -30px -20px 60px rgba(0,0,20,0.7)',
    }}>
      {/* Ocean / land tint */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(34,197,94,0.15) 0%, transparent 45%), radial-gradient(ellipse at 20% 70%, rgba(34,197,94,0.12) 0%, transparent 35%)',
      }} />

      {/* Cloud band 1 */}
      <div style={{
        position: 'absolute', left: '5%', top: '28%', width: '90%', height: 28,
        background: 'rgba(255,255,255,0.18)',
        borderRadius: 20, filter: 'blur(6px)',
        transform: 'rotate(-3deg)',
      }} />
      {/* Cloud band 2 */}
      <div style={{
        position: 'absolute', left: '15%', top: '52%', width: '65%', height: 18,
        background: 'rgba(255,255,255,0.13)',
        borderRadius: 20, filter: 'blur(5px)',
        transform: 'rotate(2deg)',
      }} />
      {/* Cloud patch */}
      <div style={{
        position: 'absolute', right: '12%', top: '18%', width: 70, height: 40,
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '50%', filter: 'blur(8px)',
      }} />

      {/* Terminator (shadow side) */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(ellipse at 80% 60%, transparent 35%, rgba(0,5,20,0.72) 70%)',
      }} />
    </div>

    {/* Thin atmosphere rim */}
    <div style={{
      position: 'absolute', inset: -4, borderRadius: '50%',
      border: '1px solid rgba(56,189,248,0.22)',
      boxShadow: '0 0 30px rgba(56,189,248,0.15)',
    }} />
  </PlanetWrapper>
);

/* ── PERSONA — Amber desert planet ─────────────────────────────────────── */
const Persona = () => (
  <PlanetWrapper size={320} right={-70} top="45%" topTranslate="-50%" floatDuration={12}>
    {/* Glow */}
    <div style={{
      position: 'absolute', inset: -24,
      borderRadius: '50%',
      background: 'radial-gradient(circle, transparent 50%, rgba(251,146,60,0.15) 70%, transparent 85%)',
      filter: 'blur(16px)',
    }} />

    {/* Main sphere */}
    <div style={{
      width: '100%', height: '100%', borderRadius: '50%', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(circle at 35% 30%, #fde68a 0%, #f97316 38%, #c2410c 65%, #450a00 100%)',
      boxShadow: '0 0 60px rgba(251,146,60,0.28), inset -25px -20px 50px rgba(0,0,0,0.65)',
    }}>
      {/* Desert bands */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {[22, 40, 58].map((top, i) => (
          <div key={i} style={{
            position: 'absolute', left: 0, right: 0, top: `${top}%`,
            height: i === 1 ? 12 : 8,
            background: i === 1
              ? 'rgba(194,65,12,0.35)'
              : 'rgba(124,45,18,0.28)',
            filter: 'blur(3px)',
          }} />
        ))}
      </div>
      {/* Terminator */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(ellipse at 82% 65%, transparent 30%, rgba(0,0,0,0.75) 68%)',
      }} />
    </div>

    {/* Rim */}
    <div style={{
      position: 'absolute', inset: -3, borderRadius: '50%',
      border: '1px solid rgba(251,146,60,0.20)',
    }} />
  </PlanetWrapper>
);

/* ── ARSENAL — Cyan planet with Saturn-like ring ────────────────────────── */
const Arsenal = () => (
  <PlanetWrapper size={300} right={-90} top="50%" topTranslate="-50%" floatDuration={18}>
    {/* Glow */}
    <div style={{
      position: 'absolute', inset: -30,
      borderRadius: '50%',
      background: 'radial-gradient(circle, transparent 45%, rgba(34,211,238,0.14) 65%, transparent 82%)',
      filter: 'blur(18px)',
    }} />

    {/* Ring behind */}
    <div style={{
      position: 'absolute',
      top: '50%', left: '50%',
      width: '190%', height: '55%',
      border: '8px solid transparent',
      borderTop: '8px solid rgba(34,211,238,0.18)',
      borderBottom: '8px solid transparent',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%) rotateX(72deg)',
      boxShadow: '0 -4px 20px rgba(34,211,238,0.1)',
      zIndex: -1,
    }} />

    {/* Main sphere */}
    <div style={{
      width: '100%', height: '100%', borderRadius: '50%', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(circle at 37% 33%, #a5f3fc 0%, #0891b2 42%, #0c4a6e 70%, #040f1e 100%)',
      boxShadow: '0 0 60px rgba(34,211,238,0.30), inset -22px -18px 50px rgba(0,0,0,0.65)',
    }}>
      {/* Electric grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(34,211,238,0.04) 0px, transparent 1px, transparent 28px, rgba(34,211,238,0.04) 29px)',
      }} />
      {/* Terminator */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(ellipse at 80% 60%, transparent 32%, rgba(0,0,10,0.75) 65%)',
      }} />
    </div>

    {/* Ring in front (upper arc) */}
    <div style={{
      position: 'absolute',
      top: '50%', left: '50%',
      width: '190%', height: '55%',
      borderTop: '6px solid rgba(34,211,238,0.45)',
      borderBottom: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%) rotateX(72deg)',
      boxShadow: '0 -6px 24px rgba(34,211,238,0.25)',
      zIndex: 2,
    }} />

    {/* Rim */}
    <div style={{
      position: 'absolute', inset: -3, borderRadius: '50%', zIndex: 1,
      border: '1px solid rgba(34,211,238,0.22)',
      boxShadow: '0 0 20px rgba(34,211,238,0.12)',
    }} />
  </PlanetWrapper>
);

/* ── NEXUS — Purple planet with moons ──────────────────────────────────── */
const Nexus = () => {
  const moons = [
    { size: 12, orbitR: '140%', angle: 30,  color: '#c4b5fd', delay: 0 },
    { size: 9,  orbitR: '165%', angle: 145, color: '#a78bfa', delay: -5 },
    { size: 14, orbitR: '120%', angle: 230, color: '#ddd6fe', delay: -10 },
  ];

  return (
    <PlanetWrapper size={340} right={-80} top="48%" topTranslate="-50%" floatDuration={14}>
      {/* Nebula glow */}
      <div style={{
        position: 'absolute', inset: -50,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.18) 30%, transparent 72%)',
        filter: 'blur(20px)',
      }} />

      {/* Moons */}
      {moons.map((m, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: m.size, height: m.size,
            marginLeft: -m.size / 2, marginTop: -m.size / 2,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear', delay: m.delay }}
        >
          <div style={{
            position: 'absolute',
            top: `calc(-${m.orbitR} / 2)`,
            left: '50%',
            transform: `translateX(-50%) rotate(${m.angle}deg) translateY(-60px)`,
            width: m.size, height: m.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${m.color}, rgba(88,28,135,0.8))`,
            boxShadow: `0 0 8px ${m.color}88`,
          }} />
        </motion.div>
      ))}

      {/* Main sphere */}
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%', position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(circle at 35% 32%, #c4b5fd 0%, #7c3aed 42%, #3b0764 70%, #0f0520 100%)',
        boxShadow: '0 0 80px rgba(167,139,250,0.30), inset -28px -20px 60px rgba(0,0,0,0.70)',
      }}>
        {/* Swirl bands */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(196,181,253,0.06) 0deg, transparent 15deg, rgba(167,139,250,0.04) 30deg)',
        }} />
        {/* Terminator */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'radial-gradient(ellipse at 80% 62%, transparent 30%, rgba(0,0,10,0.78) 65%)',
        }} />
      </div>

      {/* Rim */}
      <div style={{
        position: 'absolute', inset: -3, borderRadius: '50%',
        border: '1px solid rgba(167,139,250,0.22)',
        boxShadow: '0 0 24px rgba(167,139,250,0.12)',
      }} />
    </PlanetWrapper>
  );
};

/* ── CHRONOS — Teal temporal vortex ─────────────────────────────────────── */
const Chronos = () => (
  <PlanetWrapper size={380} right={-100} top="50%" topTranslate="-50%" floatDuration={20}>
    {/* Vortex glow */}
    <div style={{
      position: 'absolute', inset: -30,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(52,211,153,0.20) 30%, rgba(16,185,129,0.08) 60%, transparent 80%)',
      filter: 'blur(14px)',
    }} />

    {/* Main sphere */}
    <div style={{
      width: '100%', height: '100%', borderRadius: '50%', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(circle at 38% 34%, #6ee7b7 0%, #059669 38%, #064e3b 68%, #012018 100%)',
      boxShadow: '0 0 70px rgba(52,211,153,0.30), inset -26px -20px 55px rgba(0,0,0,0.68)',
    }}>
      {/* Concentric temporal rings */}
      {[20, 35, 50, 65].map((r, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: `${r * 2}%`, height: `${r * 2}%`,
            borderRadius: '50%',
            border: `1px solid rgba(52,211,153,${0.22 - i * 0.04})`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {/* Terminator */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(ellipse at 80% 60%, transparent 30%, rgba(0,5,0,0.78) 65%)',
      }} />
    </div>

    {/* Rim */}
    <div style={{
      position: 'absolute', inset: -3, borderRadius: '50%',
      border: '1px solid rgba(52,211,153,0.22)',
      boxShadow: '0 0 28px rgba(52,211,153,0.15)',
    }} />
  </PlanetWrapper>
);

/* ── CORONA — Orange solar body with corona rays ────────────────────────── */
const Corona = () => (
  <PlanetWrapper size={280} right={-50} top="42%" topTranslate="-50%" floatDuration={10}>
    {/* Solar wind outer glow */}
    <div style={{
      position: 'absolute', inset: -60,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(251,191,36,0.22) 30%, rgba(249,115,22,0.10) 60%, transparent 80%)',
      filter: 'blur(20px)',
    }} />

    {/* Corona rays (12 thin flares) */}
    {Array.from({ length: 12 }, (_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 3,
          height: '55%',
          transformOrigin: '50% 100%',
          transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
          background: `linear-gradient(to top, rgba(251,191,36,0.7), rgba(253,224,71,0.2), transparent)`,
          borderRadius: 4,
        }}
        animate={{ scaleY: [1, 1.15, 0.92, 1.08, 1], opacity: [0.7, 1, 0.6, 0.9, 0.7] }}
        transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
      />
    ))}

    {/* Main sphere */}
    <div style={{
      width: '100%', height: '100%', borderRadius: '50%', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(circle at 38% 35%, #fef08a 0%, #fbbf24 30%, #f97316 58%, #7c2d12 100%)',
      boxShadow: '0 0 80px rgba(251,191,36,0.45), 0 0 140px rgba(249,115,22,0.20), inset -20px -18px 50px rgba(0,0,0,0.50)',
    }}>
      {/* Sunspot patch */}
      <div style={{
        position: 'absolute', left: '35%', top: '42%',
        width: 28, height: 20,
        background: 'rgba(124,45,18,0.5)',
        borderRadius: '50%', filter: 'blur(4px)',
      }} />
      <div style={{
        position: 'absolute', right: '20%', top: '30%',
        width: 16, height: 14,
        background: 'rgba(124,45,18,0.45)',
        borderRadius: '50%', filter: 'blur(3px)',
      }} />
      {/* Limb darkening */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 50%, transparent 48%, rgba(100,20,0,0.45) 80%)',
      }} />
    </div>

    {/* Rim halo */}
    <div style={{
      position: 'absolute', inset: -6, borderRadius: '50%',
      border: '2px solid rgba(251,191,36,0.28)',
      boxShadow: '0 0 30px rgba(251,191,36,0.20)',
    }} />
  </PlanetWrapper>
);

/* ── Router ─────────────────────────────────────────────────────────────── */
const PLANET_MAP = { TERRA: Terra, PERSONA: Persona, ARSENAL: Arsenal, NEXUS: Nexus, CHRONOS: Chronos, CORONA: Corona };

const PlanetScene = ({ planetType }) => {
  const Planet = PLANET_MAP[planetType];
  if (!Planet) return null;
  return <Planet />;
};

export default PlanetScene;
