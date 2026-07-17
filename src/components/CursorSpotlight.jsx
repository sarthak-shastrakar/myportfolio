import React, { useEffect, useRef } from 'react';
import { useCursorPosition } from '../hooks/useCursorPosition';

/**
 * Subtle radial-gradient spotlight that follows the cursor.
 * Gives a soft "warm light source" feel to the hero section.
 * Completely invisible on touch/mobile devices.
 */
const CursorSpotlight = () => {
  const divRef = useRef(null);
  const { x, y } = useCursorPosition();

  // Use RAF for smooth rendering
  const rafRef = useRef(null);
  useEffect(() => {
    if (!divRef.current) return;
    // Cancel if mobile / touch-only
    if (window.matchMedia('(pointer: coarse)').matches) return;

    rafRef.current = requestAnimationFrame(() => {
      if (divRef.current) {
        divRef.current.style.background = `radial-gradient(
          600px circle at ${x}px ${y}px,
          rgba(110, 147, 247, 0.06) 0%,
          rgba(139, 92, 246, 0.03) 40%,
          transparent 70%
        )`;
      }
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [x, y]);

  return (
    <div
      ref={divRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'background 0.05s ease',
      }}
      aria-hidden="true"
    />
  );
};

export default CursorSpotlight;
