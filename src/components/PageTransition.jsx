import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduced ? 1 : 0.95, filter: 'blur(8px)', y: reduced ? 0 : 20 }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 1.05, filter: 'blur(4px)', y: reduced ? 0 : -20 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full min-h-screen flex flex-col pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto z-10 relative"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
