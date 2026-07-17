import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin 2px scroll progress bar fixed at the very top of the viewport.
 * Animated with Framer Motion spring for smooth tracking.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, transformOrigin: 'left' }}
    />
  );
};

export default ScrollProgress;
