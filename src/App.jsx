import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import ParticleBackground from './components/ParticleBackground';
import SocialDock from './components/SocialDock';
import PageTransition from './components/PageTransition';

// Lazy-load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Work = lazy(() => import('./pages/Work'));
const Experience = lazy(() => import('./pages/Experience'));
const Certification = lazy(() => import('./pages/Certification'));

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
      <div className="relative min-h-screen text-gray-200 overflow-x-hidden font-sans selection:bg-[#ff8a65]/30 selection:text-white pb-10 md:pl-14">
        {/* Global Particles canvas background */}
        <ParticleBackground />

        {/* Global floating social dock */}
        <SocialDock />

        {/* Global Nav Menu */}
        <Nav />

        {/* Main Routed Page Content */}
        <Suspense fallback={
          <div className="flex items-center justify-center w-full min-h-screen">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-[#ff8a65] animate-spin" />
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
