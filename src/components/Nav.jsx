import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Home, User, Layers, Briefcase, Radio, Award, Mail, Phone } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons';

const NAV_LINKS = [
  { path: '/', label: 'Home', icon: Home, end: true },
  { path: '/about', label: 'About', icon: User, end: false },
  { path: '/skills', label: 'Skills', icon: Layers, end: false },
  { path: '/work', label: 'Work', icon: Briefcase, end: false },
  { path: '/experience', label: 'Experience', icon: Radio, end: false },
  { path: '/certification', label: 'Certifications', icon: Award, end: false },
];

/* ── Magnetic tilt hook ─────────────────────────────────────────────────── */
const useMagneticTilt = (disabled) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  }, [disabled]);

  const onMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);
  return { ref, tilt, onMouseMove, onMouseLeave };
};

/* ── Single desktop nav item ─────────────────────────────────────────────── */
const NavItem = ({ link, index, reduced }) => {
  const { ref, tilt, onMouseMove, onMouseLeave } = useMagneticTilt(reduced);

  return (
    <NavLink to={link.path} end={link.end} className="focus-visible:outline-none">
      {({ isActive }) => (
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          animate={reduced ? {} : { rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: 'spring', stiffness: 500, damping: 22, mass: 0.3 }}
          style={{ perspective: 400, transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative flex items-center gap-1.5 px-4 py-2 rounded-full cursor-pointer select-none group"
        >
          {/* Shared-layout active pill */}
          {isActive && (
            <motion.span
              layoutId={reduced ? undefined : 'nav-pill'}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'rgba(110,147,247,0.12)',
                border: '1px solid rgba(110,147,247,0.28)',
                borderRadius: 999,
              }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 380, damping: 32 }
              }
            />
          )}

          {/* Animated bottom underline on hover */}
          <motion.span
            className="absolute bottom-0 left-4 right-4 h-px rounded-full"
            style={{ background: 'linear-gradient(90deg, #6e93f7, #8b5cf6)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: isActive ? 0 : 1 }}
            transition={{ duration: 0.22 }}
          />

          {/* Icon */}
          <span
            className="relative z-10 flex items-center transition-colors duration-200"
            style={{ color: isActive ? '#c4d0ff' : 'rgba(138,147,179,1)' }}
          >
            <link.icon size={13} />
          </span>

          {/* Label */}
          <span
            className="relative z-10 text-[13.5px] font-medium transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-sans)',
              color: isActive ? '#dde5ff' : 'rgba(138,147,179,1)',
            }}
          >
            {link.label}
          </span>
        </motion.div>
      )}
    </NavLink>
  );
};

/* ── Main Navbar ─────────────────────────────────────────────────────────── */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock scroll when mobile menu is open to prevent page scrolling behind it
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ══ NAVBAR HEADER ═══════════════════════════════════════════════════ */}
      <motion.header
        initial={reduced ? { opacity: 0 } : { y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          background: scrolled
            ? 'rgba(8,10,22,0.88)'
            : 'rgba(8,10,22,0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: scrolled
            ? '1px solid rgba(110,147,247,0.15)'
            : '1px solid rgba(255,255,255,0.05)',
          boxShadow: scrolled
            ? '0 4px 40px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(110,147,247,0.1)'
            : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* ── LOGO ── */}
        <NavLink to="/" className="focus-visible:outline-none flex-shrink-0">
          <motion.div
            whileHover={reduced ? {} : { scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 select-none"
          >
            <span className="font-mono text-base font-bold flex items-center leading-none">
              <motion.span
                style={{ color: '#ff8a65' }}
                animate={reduced ? {} : { x: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >{'<'}</motion.span>
              <span
                className="font-extrabold px-1"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(90deg, #6e93f7 0%, #a78bfa 60%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >Portfolio</span>
              <motion.span
                style={{ color: '#ff8a65' }}
                animate={reduced ? {} : { x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >{'/>'}</motion.span>
            </span>
          </motion.div>
        </NavLink>

        {/* ── DESKTOP NAV LINKS ── */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link, i) => (
            <NavItem key={link.path} link={link} index={i} reduced={reduced} />
          ))}
        </nav>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-full text-gray-400 hover:text-white hover:bg-white/5 active:scale-95 focus:outline-none transition-all duration-200 z-50 relative"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="menu"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.header>

      {/* ══ MOBILE SIDEBAR DRAWER (80% Width) ═════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Sidebar Container */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={reduced ? { duration: 0.15 } : { type: 'spring', damping: 26, stiffness: 220 }}
              className="md:hidden fixed right-0 top-0 bottom-0 z-50 w-[80%] max-w-[340px] bg-slate-950/95 border-l border-white/5 shadow-2xl flex flex-col justify-between pt-20 pb-6 px-4 backdrop-blur-2xl"
              style={{
                background: 'rgba(8,10,22,0.96)',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Main Links List (Scrollable for Landscape/Small screens) */}
              <div className="flex-1 overflow-y-auto pr-1 card-scroll flex flex-col gap-1.5 py-4">
                {NAV_LINKS.map((link, i) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.end}
                    onClick={() => setMobileOpen(false)}
                    className="focus-visible:outline-none block"
                  >
                    {({ isActive }) => (
                      <motion.div
                        initial={reduced ? {} : { x: 30, opacity: 0 }}
                        animate={reduced ? {} : { x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 touch-manipulation"
                        style={{
                          background: isActive ? 'rgba(110,147,247,0.1)' : 'transparent',
                          border: isActive ? '1px solid rgba(110,147,247,0.2)' : '1px solid transparent',
                          color: isActive ? '#dde5ff' : 'rgba(138,147,179,1)',
                        }}
                      >
                        <link.icon size={18} className="flex-shrink-0" />
                        <span>{link.label}</span>
                        {isActive && (
                          <span
                            className="ml-auto w-2 h-2 rounded-full"
                            style={{
                              background: '#ff8a65',
                              boxShadow: '0 0 8px #ff8a65',
                            }}
                          />
                        )}
                      </motion.div>
                    )}
                  </NavLink>
                ))}
              </div>

              {/* Fixed bottom footer area containing Social Links */}
              <div className="border-t border-white/5 pt-4 mt-auto flex flex-col gap-4">
                <div className="text-[10px] font-mono tracking-wider uppercase opacity-45 text-center">
                  Commander Socials
                </div>
                <div className="flex justify-around items-center px-2">
                  <a
                    href="https://github.com/sarthak-shastrakar"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/sarthak-shastrakar"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="mailto:sarthakshastrakar9@gmail.com"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all duration-200"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                  <a
                    href="tel:+918767901968"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all duration-200"
                    aria-label="Call"
                  >
                    <Phone size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
