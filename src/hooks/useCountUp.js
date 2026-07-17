import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animates a number from 0 to `target` when element enters viewport.
 * Returns [ref, count].
 */
export const useCountUp = (target, duration = 1400) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
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
  }, [inView, target, duration]);

  return [ref, count];
};

export default useCountUp;
