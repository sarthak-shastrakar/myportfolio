import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Home, User, Layers, Briefcase, Radio, Award } from 'lucide-react';

const NAV_LINKS = [
  { path: '/',            label: 'Home',       icon: Home,     end: true },
  { path: '/about',       label: 'About',      icon: User,     end: false },
  { path: '/skills',      label: 'Skills',     icon: Layers,   end: false },
  { path: '/work',        label: 'Work',       icon: Briefcase,end: false },
  { path: '/experience',  label: 'Experience', icon: Radio,    end: false },
  { path: '/certification',label: 'Certifications', icon: Award,    end: false },
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
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
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
          className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full cursor-pointer select-none"
        >
          {/* Shared-layout sliding active pill */}
          {isActive && (
            <motion.span
              layoutId={reduced ? undefined : 'nav-pill'}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'rgba(110,147,247,0.15)',
                border: '1px solid rgba(110,147,247,0.35)',
                borderRadius: 999,
              }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 420, damping: 36 }
              }
            />
          )}

          {/* Icon */}
          <span
            className="relative z-10 flex items-center transition-colors duration-200"
            style={{ color: isActive ? '#eef1fb' : 'rgba(138,147,179,1)' }}
          >
            <link.icon size={13} />
          </span>

          {/* Label */}
          <span
            className="relative z-10 text-[14px] font-medium transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-sans)',
              color: isActive ? '#eef1fb' : 'rgba(138,147,179,1)',
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
  const [scrolled,  setScrolled]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced  = useReducedMotion();
  const location = useLocation();
  const drawerRef = useRef(null);

  /* scroll listener */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  /* close on outside click */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  return (
    <>
      {/* ══ NAVBAR BAR ══════════════════════════════════════════════════════ */}
      <motion.header
        initial={reduced ? { opacity: 0 } : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         50,
          height:         64,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 2rem',
          background:     'rgba(8,10,22,0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom:   '1px solid rgba(124,158,255,0.12)',
          boxShadow: scrolled
            ? '0 4px 30px rgba(110,147,247,0.1)'
            : 'none',
          transition: 'box-shadow 0.4s ease',
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
              {/* < */}
              <motion.span
                style={{ color: '#ff8a65' }}
                animate={reduced ? {} : { x: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >
                {'<'}
              </motion.span>

              {/* Portfolio */}
              <span
                className="font-extrabold px-1"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(90deg, #6e93f7 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Portfolio
              </span>

              {/* /> */}
              <motion.span
                style={{ color: '#ff8a65' }}
                animate={reduced ? {} : { x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >
                {'/>'}
              </motion.span>
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
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-white focus:outline-none transition-colors duration-200"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.header>

      {/* ══ MOBILE DRAWER ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            key="mobile-drawer"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position:       'fixed',
              top:            64,
              left:           0,
              right:          0,
              zIndex:         49,
              background:     'rgba(8,10,22,0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom:   '1px solid rgba(124,158,255,0.12)',
            }}
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link, i) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className="focus-visible:outline-none"
                >
                  {({ isActive }) => (
                    <motion.div
                      initial={{ x: 16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16,1,0.3,1] }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
                      style={{
                        background:  isActive ? 'rgba(110,147,247,0.12)' : 'transparent',
                        border:      isActive ? '1px solid rgba(110,147,247,0.25)' : '1px solid transparent',
                        color:       isActive ? '#eef1fb' : 'rgba(138,147,179,1)',
                      }}
                    >
                      <link.icon size={17} />
                      <span>{link.label}</span>
                      {isActive && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            width:       6,
                            height:      6,
                            borderRadius:'50%',
                            background:  '#ff8a65',
                            display:    'inline-block',
                          }}
                        />
                      )}
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
