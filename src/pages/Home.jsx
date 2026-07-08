import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import spacemanImg from '../../media/astronout_3d.a026954aa7516298baee.png';
import resumePdf from '../../media/Sarthak_Fullstack_developer_new.32a16d90b49080b023f3.pdf';
import DownloadButton from '../components/DownloadButton';

/* ── Rotating Roles with blinking cursor ─────────────────────────────────── */
const ROLES = [
  'Full-Stack MERN Developer',
  'React & Node.js Engineer',
  'UI/UX Focused Developer',
  'Open Source Contributor',
];

const TypingSubtitle = () => {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pause' | 'deleting'
  const [charIdx, setCharIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Type / delete cycle
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
      <span className="text-gray-400">/</span>
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

/* ── Count-up stat number ─────────────────────────────────────────────────── */
const CountUp = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-serif text-3xl font-extrabold text-white">
      {count}{suffix}
    </span>
  );
};

/* ── Main Home Component ─────────────────────────────────────────────────── */
const Home = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.setAttribute('download', 'Sarthak_Shastrakar_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="flex flex-col gap-16 w-full mt-4 md:mt-8">



      {/* ══ HERO ROW ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[calc(100vh-180px)]">

        {/* ── LEFT: Text ── */}
        <motion.div
          className="flex flex-col items-start text-left space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* 🟢 Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#2dd4bf]/25 text-[10px] font-mono font-bold text-[#2dd4bf] tracking-widest uppercase"
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
              <span className="bg-gradient-to-r from-white via-[#e0e7ff] to-[#a78bfa] bg-clip-text text-transparent">
                Sarthak
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#6e93f7] via-[#a78bfa] to-[#8b5cf6] bg-clip-text text-transparent">
                Shastrakar
              </span>
            </h1>
          </div>

          {/* Typing role */}
          <TypingSubtitle />

          {/* 1-line bio */}
          <p className="text-gray-400 text-base md:text-lg font-sans">
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
        </motion.div>

        {/* ── RIGHT: Astronaut ── */}
        <motion.div
          className="flex justify-center items-center lg:justify-end"
          initial={{ opacity: 0, x: 30, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-square flex items-center justify-center">



            {/* Spinning orbit ring */}
            <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-white/8 animate-spin" style={{ animationDuration: '55s' }} />
            {/* Inner ring */}
            <div className="absolute w-[60%] h-[60%] rounded-full border border-white/5 animate-pulse" />

            {/* Astronaut Image */}
            <motion.img 
              src={spacemanImg} 
              alt="Waving Astronaut" 
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(139,92,246,0.25)] mix-blend-normal" 
              style={{ mixBlendMode: 'normal' }}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default Home;
