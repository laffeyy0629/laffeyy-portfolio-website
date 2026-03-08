import { useScroll, useSpring, motion, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 38, restDelta: 0.001 });

  // Comet head x-position: tracks the leading edge of the bar (0% → 100% of viewport width)
  const cometX = useTransform(scrollYProgress, [0, 1], ['-8px', 'calc(100vw - 4px)']);

  return (
    // Sits flush below the navbar (top: 64px = h-16)
    <div className="fixed top-16 left-0 right-0 z-[9995] pointer-events-none">
      {/* Dim track — the "starfield rail" */}
      <div
        className="absolute inset-0"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(180,74,247,0.08) 20%, rgba(67,97,238,0.12) 60%, transparent 100%)',
        }}
      />

      {/* Filled bar — very muted */}
      <motion.div
        style={{
          height: '1px',
          scaleX,
          transformOrigin: 'left',
          background: 'linear-gradient(90deg, rgba(120,40,160,0.55) 0%, rgba(90,60,200,0.45) 50%, rgba(67,97,238,0.35) 100%)',
        }}
      />

      {/* Comet head — the only bright element */}
      <motion.div
        style={{ x: cometX }}
        className="absolute top-0"
        aria-hidden="true"
      >
        {/* Tail glow — elongated blur behind the head */}
        <div
          style={{
            position: 'absolute',
            top: '-1px',
            right: '2px',
            width: '48px',
            height: '3px',
            background: 'linear-gradient(270deg, rgba(180,74,247,0.55) 0%, transparent 100%)',
            filter: 'blur(2px)',
            borderRadius: '999px',
          }}
        />
        {/* Head sparkle — the bright star point */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-3px',
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, rgba(220,180,255,0.95) 0%, rgba(180,74,247,0.6) 50%, transparent 100%)',
            filter: 'blur(1px)',
            borderRadius: '50%',
          }}
        />
      </motion.div>
    </div>
  );
}
