import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const SPRING_CFG = { stiffness: 260, damping: 28, mass: 0.6 };

/**
 * Returns { ref, style } — attach ref to the element and spread style onto a motion element.
 * @param {number} strength  Fraction of cursor offset to pull (0–1). Default 0.35.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CFG);
  const y = useSpring(rawY, SPRING_CFG);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  }, [rawX, rawY, strength]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, style: { x, y }, onMouseMove, onMouseLeave };
}
