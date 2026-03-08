import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const SPRING = { damping: 22, stiffness: 200, mass: 0.65 };
const TRAIL_COLORS = ['#f72585', '#b44af7', '#ffffff', '#ffd6f0', '#f72585'];
const TRAIL_MAX = 10;
const TRAIL_LIFETIME = 520;

export default function CustomCursor() {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const ringX = useSpring(mouseX, SPRING);
  const ringY = useSpring(mouseY, SPRING);

  useEffect(() => {
    // Only show on pointer-fine (mouse) devices
    setShow(!window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const removeTrailParticle = useCallback((id) => {
    setTrail((t) => t.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    if (!show) return;

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const now = Date.now();
      if (now - lastTrailTime.current < 40) return; // throttle to ~25fps
      lastTrailTime.current = now;

      const id = trailIdRef.current++;
      const color = TRAIL_COLORS[id % TRAIL_COLORS.length];
      setTrail((t) => {
        const next = [...t, { id, x: e.clientX, y: e.clientY, color }];
        return next.slice(-TRAIL_MAX);
      });
      setTimeout(() => removeTrailParticle(id), TRAIL_LIFETIME);
    };
    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      if (el) {
        setHovered(true);
        setLabel(el.dataset.cursor ?? '');
      }
    };
    const onOut = (e) => {
      const from = e.target.closest('a, button, [data-cursor]');
      const to = e.relatedTarget?.closest?.('a, button, [data-cursor]');
      if (from && from !== to) {
        setHovered(false);
        setLabel('');
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [show, mouseX, mouseY]);

  if (!show) return null;

  return (
    <>
      {/* Cursor trail sparkles */}
      {trail.map((particle, i) => {
        const age = i / TRAIL_MAX; // 0 = newest tail, 1 = oldest head
        const size = 10 - age * 6;
        return (
          <motion.div
            key={particle.id}
            className="fixed top-0 left-0 pointer-events-none z-[999996] select-none"
            style={{
              x: particle.x,
              y: particle.y,
              translateX: '-50%',
              translateY: '-50%',
              color: particle.color,
              fontSize: `${size}px`,
              lineHeight: 1,
              textShadow: `0 0 6px ${particle.color}`,
            }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 0, rotate: 45 }}
            transition={{ duration: TRAIL_LIFETIME / 1000, ease: 'easeOut' }}
          >
            ✦
          </motion.div>
        );
      })}
      {/* Outer ring — spring-delayed follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999998] rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: pressed ? 24 : hovered ? 72 : 40,
          height: pressed ? 24 : hovered ? 72 : 40,
          borderColor: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
          backgroundColor: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0)',
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Label rendered inside the ring on hover */}
      <AnimatePresence>
        {hovered && label && (
          <motion.span
            key="cursor-label"
            className="fixed top-0 left-0 pointer-events-none z-[999999] text-white font-bold tracking-[0.2em] uppercase select-none"
            style={{
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '-50%',
              fontSize: '8px',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Inner dot — no lag, instant follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999999] rounded-full"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: pressed ? 3 : hovered ? 4 : 5,
          height: pressed ? 3 : hovered ? 4 : 5,
          backgroundColor: hovered ? '#f72585' : '#ffffff',
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
