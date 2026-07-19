import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Nav from './components/Nav';
import ParticleBackground from './components/ParticleBackground';
import SocialDock from './components/SocialDock';
import PageTransition from './components/PageTransition';
import CursorSpotlight from './components/CursorSpotlight';


// Lazy-load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Work = lazy(() => import('./pages/Work'));
const Experience = lazy(() => import('./pages/Experience'));
const Certification = lazy(() => import('./pages/Certification'));

/* ── Lenis smooth-scroll initialiser ─────────────────────────────────────── */
const LenisInit = () => {
  useEffect(() => {
    // Skip on touch / coarse-pointer devices for performance
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
        <Route path="/certification" element={<PageTransition><Certification /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HashRouter>
      <div className="relative min-h-screen text-gray-200 font-sans selection:bg-[#6e93f7]/30 selection:text-white pb-10 md:pl-14">

        {/* Smooth scroll (desktop only) */}
        <LenisInit />

        {/* Global Particles canvas background */}
        <ParticleBackground />

        {/* Cursor spotlight glow */}
        <CursorSpotlight />



        {/* Global floating social dock */}
        <SocialDock />

        {/* Global Nav Menu */}
        <Nav />

        {/* Main Routed Page Content */}
        <Suspense fallback={
          <div className="flex items-center justify-center w-full min-h-screen">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-[#6e93f7] animate-spin" />
              <span className="font-mono text-xs uppercase tracking-widest text-gray-400">Loading portfolio...</span>
            </div>
          </div>
        }>
          <AnimatedRoutes />
        </Suspense>
      </div>
    </HashRouter>
  );
}

export default App;
