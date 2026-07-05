import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 22, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: reduced ? 0 : -14, filter: 'blur(3px)' }}
      transition={{
        enter: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        exit:  { duration: 0.28, ease: 'easeInOut' },
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full min-h-screen flex flex-col pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto z-10 relative"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
