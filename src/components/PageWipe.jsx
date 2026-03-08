import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Fixed star positions for the wipe panel — deterministic, no random jitter
const STARS = [
  { x: 8,  y: 12, r: 1.5, op: 0.7  },
  { x: 18, y: 68, r: 1,   op: 0.5  },
  { x: 27, y: 33, r: 2,   op: 0.9  },
  { x: 35, y: 82, r: 1,   op: 0.4  },
  { x: 42, y: 18, r: 1.5, op: 0.65 },
  { x: 50, y: 55, r: 2.5, op: 0.8  },
  { x: 58, y: 90, r: 1,   op: 0.5  },
  { x: 65, y: 28, r: 1.5, op: 0.7  },
  { x: 73, y: 72, r: 1,   op: 0.45 },
  { x: 80, y: 44, r: 2,   op: 0.85 },
  { x: 88, y: 10, r: 1,   op: 0.55 },
  { x: 92, y: 60, r: 1.5, op: 0.6  },
  { x: 15, y: 48, r: 1,   op: 0.4  },
  { x: 55, y: 76, r: 1.5, op: 0.7  },
  { x: 78, y: 88, r: 1,   op: 0.5  },
  { x: 30, y: 6,  r: 2,   op: 0.75 },
  { x: 62, y: 40, r: 1,   op: 0.45 },
  { x: 46, y: 96, r: 1.5, op: 0.6  },
];

// ✦ sparkle positions
const SPARKLES = [
  { x: 22, y: 24, size: 10 },
  { x: 68, y: 62, size: 8  },
  { x: 48, y: 38, size: 12 },
  { x: 85, y: 18, size: 9  },
  { x: 12, y: 78, size: 10 },
];

export default function PageWipe() {
  const location = useLocation();
  const controls = useAnimation();
  const prevPath = useRef(null);

  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = location.pathname;
      return;
    }
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    const run = async () => {
      controls.set({ clipPath: 'inset(0 100% 0 0)' });
      await controls.start({
        clipPath: 'inset(0 0% 0 0)',
        transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
      });
      await new Promise((r) => setTimeout(r, 80));
      await controls.start({
        clipPath: 'inset(0 0% 0 100%)',
        transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
      });
    };

    run();
  }, [location.pathname, controls]);

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={controls}
      className="fixed inset-0 z-[9940] pointer-events-none overflow-hidden"
      style={{
        /* Deep space: near-black with a faint violet-to-pink diagonal blush */
        background: 'linear-gradient(135deg, #04020a 0%, #0a0414 40%, #0d0318 100%)',
      }}
    >
      {/* Subtle radial nebula glow — low opacity so it's atmospheric, not flashbang */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(180,74,247,0.10) 0%, rgba(247,37,133,0.06) 45%, transparent 70%)',
        }}
      />

      {/* Star field dots */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="white"
            opacity={s.op}
          />
        ))}
        {/* A few pink/violet tinted stars */}
        <circle cx="35%" cy="55%" r="2"   fill="#f72585" opacity="0.5" />
        <circle cx="71%" cy="28%" r="1.5" fill="#b44af7" opacity="0.55" />
        <circle cx="55%" cy="80%" r="1.5" fill="#c9b8ff" opacity="0.5" />
      </svg>

      {/* ✦ sparkles */}
      {SPARKLES.map((sp, i) => (
        <span
          key={i}
          className="absolute select-none leading-none"
          style={{
            left: `${sp.x}%`,
            top: `${sp.y}%`,
            fontSize: sp.size,
            color: i % 2 === 0 ? '#f72585' : '#c9b8ff',
            opacity: 0.45,
            textShadow: `0 0 8px ${i % 2 === 0 ? '#f72585' : '#c9b8ff'}`,
          }}
        >
          ✦
        </span>
      ))}

      {/* Speed lines — very faint horizontal streaks for motion feel */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0px, transparent 180px, rgba(180,74,247,0.028) 180px, rgba(180,74,247,0.028) 181px)',
        }}
      />

      {/* Leading-edge glow line — neon but thin & soft, not blinding */}
      <div
        className="absolute inset-y-0 right-0 w-[2px]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(247,37,133,0.6) 20%, rgba(247,37,133,0.9) 50%, rgba(247,37,133,0.6) 80%, transparent 100%)',
          filter: 'blur(1.5px)',
          boxShadow: '0 0 12px 2px rgba(247,37,133,0.35)',
        }}
      />
      {/* Soft halo behind the leading edge */}
      <div
        className="absolute inset-y-0 right-0 w-12"
        style={{
          background:
            'linear-gradient(to left, rgba(247,37,133,0.06), transparent)',
        }}
      />

      {/* Trailing-edge vignette */}
      <div
        className="absolute inset-y-0 left-0 w-24"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.55), transparent)',
        }}
      />
    </motion.div>
  );
}
