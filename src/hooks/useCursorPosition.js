import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Returns the current cursor { x, y } position in pixels,
 * updated on every mousemove. Also provides normalised [-1, 1] values.
 */
export const useCursorPosition = () => {
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 });

  const handleMove = useCallback((e) => {
    setPos({
      x: e.clientX,
      y: e.clientY,
      nx: (e.clientX / window.innerWidth  - 0.5) * 2,
      ny: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [handleMove]);

  return pos;
};

export default useCursorPosition;
