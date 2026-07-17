import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getMission } from '../data/missionConfig';
import PlanetScene from './PlanetScene';

/**
 * WarpTransition
 * Replaces the old PageTransition component.
 * Adds:
 * - Hyperspace warp exit / enter animation
 * - Per-route CSS planet illustration (auto-read from useLocation)
 * - Mission designation banner at top of each page
 */
const WarpTransition = ({ children }) => {
  const reduced = useReducedMotion();
  const location = useLocation();
  const mission = getMission(location.pathname);

  return (
    <motion.div
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.88, filter: 'blur(14px)', y: 30 }
      }
      animate={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }
      }
      exit={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, scale: 1.12, filter: 'blur(18px)', y: -20 }
      }
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full min-h-screen flex flex-col pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto relative"
      style={{ zIndex: 10 }}
    >
      {/* ── CSS Planet (behind all content) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <PlanetScene planetType={mission.planetType} />
      </div>

      {/* ── Mission Designation Banner ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-6 relative"
        style={{ zIndex: 10 }}
      >
        {/* Animated blinking dot */}
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
            style={{ background: mission.color }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: mission.color }}
          />
        </span>

        {/* Mission ID */}
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-md font-mono text-[10px] font-bold tracking-[0.18em] uppercase border"
          style={{
            background: `${mission.color}10`,
            borderColor: `${mission.color}28`,
            color: mission.color,
          }}
        >
          <span>MISSION-{mission.id}</span>
          <span className="opacity-40">//</span>
          <span>{mission.planet}</span>
          <span
            className="hidden sm:inline-flex items-center opacity-40"
          >
            —
          </span>
          <span className="hidden sm:inline text-gray-400 opacity-80 font-normal">{mission.description}</span>
        </div>

        {/* Sector label */}
        <span
          className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-gray-600 uppercase tracking-widest"
        >
          <span style={{ color: mission.color }}>▸</span>
          {mission.sector}
        </span>

        {/* Status indicator */}
        <span
          className="ml-auto hidden lg:flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border"
          style={{
            color: mission.color,
            borderColor: `${mission.color}25`,
            background: `${mission.color}08`,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ●
          </motion.span>
          {mission.status}
        </span>
      </motion.div>

      {/* ── Page Content ── */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default WarpTransition;
