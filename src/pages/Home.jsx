import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import spacemanImg from '../../media/astronout_3d.a026954aa7516298baee.png';
import resumePdf from '../../media/Sarthak_Fullstack_developer_new.32a16d90b49080b023f3.pdf';
import DownloadButton from '../components/DownloadButton';

/* ── Rotating Roles typewriter ────────────────────────────────────────────── */
const ROLES = [
  'Full-Stack MERN Developer',
  'Backend Developer (Node.js)',
  'React & Node.js Engineer',
  'Open to Freelance Projects',
];

const TypingSubtitle = () => {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState('typing');
  const [charIdx, setCharIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const current = ROLES[roleIdx];
    if (phase === 'typing') {
      if (charIdx < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pause'), 1800);
        return () => clearTimeout(t);
      }
    }
    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('deleting'), 200);
      return () => clearTimeout(t);
    }
    if (phase === 'deleting') {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 30);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(r => (r + 1) % ROLES.length);
        setPhase('typing');
      }
    }
  }, [phase, charIdx, roleIdx]);

  return (
    <div className="flex items-center gap-1.5 font-mono text-lg sm:text-xl font-bold h-8 min-w-[320px] w-full">
      <span className="text-gray-500">/</span>
      <span className="bg-gradient-to-r from-[#6e93f7] to-[#a78bfa] bg-clip-text text-transparent">
        {displayed}
      </span>
      <span
        className="inline-block w-[2px] h-[1.1em] bg-[#6e93f7] rounded-sm"
        style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.08s' }}
      />
    </div>
  );
};

/* ── Orbit Rings (decorative behind astronaut) ────────────────────────────── */
const OrbitRings = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
    {/* Outermost ring — slow CW spin */}
    <div
      className="absolute rounded-full animate-orbit-cw"
      style={{
        width: '105%', height: '105%',
        border: '1px dashed rgba(110,147,247,0.18)',
        boxShadow: '0 0 24px rgba(110,147,247,0.06) inset',
      }}
    />
    {/* Mid ring — slow CCW spin */}
    <div
      className="absolute rounded-full animate-orbit-ccw"
      style={{
        width: '82%', height: '82%',
        border: '1px solid rgba(139,92,246,0.14)',
        boxShadow: '0 0 16px rgba(139,92,246,0.05) inset',
      }}
    />
    {/* Inner ring — pulse */}
    <motion.div
      className="absolute rounded-full"
      style={{
        width: '60%', height: '60%',
        border: '1px solid rgba(45,212,191,0.1)',
      }}
      animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.02, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Orbiting dot on outer ring */}
    <motion.div
      className="absolute"
      style={{ width: '105%', height: '105%' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="absolute"
        style={{
          top: '50%', left: 0,
          width: 6, height: 6, borderRadius: '50%',
          background: '#6e93f7',
          transform: 'translateY(-50%)',
          boxShadow: '0 0 10px rgba(110,147,247,0.9)',
        }}
      />
    </motion.div>

    {/* Orbiting dot on mid ring (CCW) */}
    <motion.div
      className="absolute"
      style={{ width: '82%', height: '82%' }}
      animate={{ rotate: -360 }}
      transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="absolute"
        style={{
          top: '50%', right: 0,
          width: 5, height: 5, borderRadius: '50%',
          background: '#a78bfa',
          transform: 'translateY(-50%)',
          boxShadow: '0 0 8px rgba(167,139,250,0.9)',
        }}
      />
    </motion.div>
  </div>
);

/* ── Main Home Component ──────────────────────────────────────────────────── */
const Home = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 2);
    mouseY.set((clientY / innerHeight - 0.5) * 2);
  };

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const textX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const textY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const astroX = useTransform(smoothX, [-1, 1], [20, -20]);
  const astroY = useTransform(smoothY, [-1, 1], [20, -20]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.setAttribute('download', 'Sarthak_Shastrakar_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="flex flex-col gap-16 w-full mt-4 md:mt-8" onMouseMove={handleMouseMove}>

      {/* ══ HERO ROW ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[calc(100vh-180px)]">

        {/* ── LEFT: Text ── */}
        <motion.div
          className="flex flex-col items-start text-left space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ x: textX, y: textY }}
        >
          {/* 🟢 Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(45,212,191,0.06)',
              borderColor: 'rgba(45,212,191,0.22)',
              color: '#2dd4bf',
              boxShadow: '0 0 16px rgba(45,212,191,0.1)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]" />
            </span>
            Available for Opportunities
          </motion.div>

          {/* Hi, I'm */}
          <div className="space-y-1">
            <p className="font-sans text-lg text-gray-400 font-medium tracking-wide">Hi, I'm</p>
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.0] tracking-tight">
              {/* Animated gradient text */}
              <span
                className="animate-gradient-text bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #dde5ff 30%, #a78bfa 60%, #6e93f7 80%, #ffffff 100%)',
                  backgroundSize: '200% 200%',
                }}
              >
                Sarthak
              </span>
              <br />
              <span
                className="animate-gradient-text bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #6e93f7 0%, #a78bfa 40%, #8b5cf6 70%, #6e93f7 100%)',
                  backgroundSize: '200% 200%',
                  animationDelay: '-2s',
                }}
              >
                Shastrakar
              </span>
            </h1>
          </div>

          {/* Typing role */}
          <TypingSubtitle />

          {/* 1-line bio */}
          <p className="text-gray-400 text-base md:text-lg font-sans max-w-md">
            I build <span className="text-white font-semibold">fast, scalable web apps</span> — from database to deployment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/work"
              className="btn-shimmer group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-[#8b5cf6]/40 hover:scale-[1.04] transition-all duration-300 focus-visible:outline-none"
            >
              <span>View My Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <DownloadButton onClick={handleDownload} />
          </div>

          {/* Subtle tech stack row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center gap-2 pt-2"
          >
            <span className="text-[11px] text-gray-600 font-mono uppercase tracking-widest">Stack:</span>
            {['React', 'Node.js', 'MongoDB', 'Express'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/8 text-gray-500"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Astronaut with orbit rings ── */}
        <motion.div
          className="flex justify-center items-center lg:justify-end"
          initial={{ opacity: 0, x: 30, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ x: astroX, y: astroY }}
        >
          <div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-square flex items-center justify-center">

            {/* Orbit rings (purely decorative) */}
            <OrbitRings />

            {/* Background glow */}
            <div
              className="absolute w-[65%] h-[65%] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* 3D tilt wrapper + astronaut image */}
            <Tilt
              maxTilt={14}
              perspective={900}
              glareEnable={false}
              tiltReverse={false}
              transitionSpeed={600}
              className="w-[75%] h-[75%] flex items-center justify-center"
            >
              <motion.img
                src={spacemanImg}
                alt="Waving Astronaut"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.30)) drop-shadow(0 0 80px rgba(110,147,247,0.15))',
                }}
                animate={{ y: [0, -16, 0], rotate: [0, 0.8, -0.8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              />
            </Tilt>
          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default Home;
