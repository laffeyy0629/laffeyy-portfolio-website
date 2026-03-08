import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// Stable sparkle positions — deterministic so no hydration mismatch
const SPARKLES = [
  { id: 0,  x: 6,  y: 10, size: 11, delay: 0    },
  { id: 1,  x: 88, y: 15, size: 8,  delay: 0.4  },
  { id: 2,  x: 12, y: 78, size: 14, delay: 0.8  },
  { id: 3,  x: 82, y: 80, size: 9,  delay: 0.2  },
  { id: 4,  x: 48, y: 4,  size: 7,  delay: 1.2  },
  { id: 5,  x: 94, y: 48, size: 12, delay: 0.6  },
  { id: 6,  x: 2,  y: 52, size: 8,  delay: 1.0  },
  { id: 7,  x: 35, y: 93, size: 10, delay: 0.3  },
  { id: 8,  x: 68, y: 6,  size: 9,  delay: 0.7  },
  { id: 9,  x: 25, y: 32, size: 6,  delay: 1.4  },
  { id: 10, x: 75, y: 65, size: 13, delay: 0.1  },
  { id: 11, x: 55, y: 88, size: 8,  delay: 0.9  },
  { id: 12, x: 91, y: 28, size: 10, delay: 0.5  },
  { id: 13, x: 4,  y: 88, size: 7,  delay: 1.1  },
  { id: 14, x: 62, y: 96, size: 11, delay: 0.35 },
  { id: 15, x: 30, y: 18, size: 9,  delay: 0.65 },
  { id: 16, x: 72, y: 42, size: 7,  delay: 1.05 },
  { id: 17, x: 18, y: 55, size: 12, delay: 0.85 },
];

const SPARK_COLORS = ['#f72585', '#b44af7', '#ffffff', '#ffd6f0', '#c9b8ff'];

// Small ✦ that orbit the title during the impact
const BURST_SPARKS = [0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => ({
  id: i,
  angle,
  dist: 70 + (i % 3) * 20,
}));

export default function IntroScreen({ onEnter }) {
  const [phase, setPhase] = useState('building'); // building → ready → exiting
  const entered = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 2600);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    if (entered.current) return;
    entered.current = true;
    setPhase('exiting');
    setTimeout(onEnter, 1100);
  };

  const isExiting = phase === 'exiting';

  return (
    <motion.div
      className="fixed inset-0 z-[9950] flex items-center justify-center overflow-hidden bg-black select-none"
      animate={isExiting ? { opacity: 0 } : {}}
      transition={isExiting ? { duration: 0.45, delay: 0.6 } : { duration: 0 }}
    >
      {/* ── Speed lines (conic repeating) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0.45 : 0.16 }}
        transition={{ duration: isExiting ? 0.3 : 1.8, delay: isExiting ? 0 : 0.3 }}
        style={{
          background: `repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg 3.2deg,
            rgba(247,37,133,0.1) 3.2deg 4deg,
            transparent 4deg 8.5deg
          )`,
        }}
      />

      {/* ── Center glow bloom ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 750,
          height: 750,
          background:
            'radial-gradient(circle, rgba(247,37,133,0.16) 0%, rgba(180,74,247,0.08) 45%, transparent 70%)',
          filter: 'blur(55px)',
        }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: isExiting ? 2 : 1.35, opacity: isExiting ? 0 : 1 }}
        transition={{ duration: isExiting ? 0.5 : 3, ease: EASE }}
      />

      {/* ── Floating ✦ sparkles ── */}
      {SPARKLES.map((sp, i) => {
        const c = SPARK_COLORS[i % SPARK_COLORS.length];
        return (
          <motion.span
            key={sp.id}
            className="absolute pointer-events-none"
            style={{
              left: `${sp.x}%`,
              top: `${sp.y}%`,
              fontSize: sp.size,
              color: c,
              textShadow: `0 0 12px ${c}`,
              lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.75, 0.35, 0.85, 0], y: [0, -65] }}
            transition={{
              duration: 4.4 + sp.delay,
              delay: sp.delay * 0.55,
              repeat: Infinity,
              repeatDelay: sp.delay * 0.3,
              ease: 'easeOut',
            }}
          >
            ✦
          </motion.span>
        );
      })}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-3xl w-full">

        {/* Top mono label */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="flex items-center gap-3 mb-10 font-mono text-[10px] tracking-[0.45em] uppercase"
          style={{ color: 'rgba(247,37,133,0.45)' }}
        >
          <span className="w-8 h-px inline-block" style={{ background: 'rgba(247,37,133,0.22)' }} />
          PORTFOLIO · 2026
          <span className="w-8 h-px inline-block" style={{ background: 'rgba(247,37,133,0.22)' }} />
        </motion.div>

        {/* ── WELCOME. title — anime slam ── */}
        <div className="overflow-hidden mb-2 relative">
          <motion.h1
            initial={{ y: '108%', skewY: 10 }}
            animate={{ y: '0%', skewY: 0 }}
            transition={{ duration: 0.82, delay: 0.55, ease: EASE }}
            className="font-black leading-[0.88] tracking-tighter text-white"
            style={{
              fontSize: 'clamp(3.2rem, 13vw, 9rem)',
              textShadow: '-4px 0 0 rgba(247,37,133,0.65), 4px 0 0 rgba(180,74,247,0.65)',
            }}
          >
            WELCOME.
          </motion.h1>

          {/* Impact white flash when title lands ≈ 1.37s */}
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.22, delay: 1.35 }}
          />
        </div>

        {/* Impact burst sparkles that fly outward when title hits */}
        <div className="relative h-0 w-full overflow-visible">
          {BURST_SPARKS.map((bs) => {
            const rad = (bs.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * bs.dist;
            const ty = Math.sin(rad) * bs.dist;
            return (
              <motion.span
                key={bs.id}
                className="absolute pointer-events-none text-[#f72585]"
                style={{
                  left: '50%',
                  top: '50%',
                  fontSize: 10,
                  textShadow: '0 0 8px #f72585',
                  lineHeight: 1,
                }}
                initial={{ opacity: 0, x: '-50%', y: '-50%' }}
                animate={{
                  opacity: [0, 0.9, 0],
                  x: [`-50%`, `calc(-50% + ${tx}px)`],
                  y: [`-50%`, `calc(-50% + ${ty}px)`],
                  scale: [0.5, 1.2, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.38,
                  ease: EASE,
                }}
              >
                ✦
              </motion.span>
            );
          })}
        </div>

        {/* Divider lines extending outward */}
        <div className="flex items-center gap-4 mt-6 mb-5 w-full max-w-md">
          <motion.div
            className="h-px flex-1"
            style={{
              background: 'linear-gradient(to left, rgba(247,37,133,0.28), transparent)',
              transformOrigin: 'right',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.25, ease: EASE }}
          />
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.48, ease: EASE }}
            style={{ color: 'rgba(247,37,133,0.38)', fontSize: 11, lineHeight: 1 }}
          >
            ✦
          </motion.span>
          <motion.div
            className="h-px flex-1"
            style={{
              background: 'linear-gradient(to right, rgba(247,37,133,0.28), transparent)',
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.25, ease: EASE }}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.32, ease: EASE }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase mb-16"
          style={{ color: '#282828' }}
        >
          Full Stack Developer · Creative · Builder
        </motion.p>

        {/* ── Blinking cursor while loading ── */}
        <AnimatePresence>
          {phase === 'building' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
                className="font-mono text-2xl"
                style={{ color: '#f72585' }}
              >
                _
              </motion.span>
              <span
                className="font-mono text-[8px] tracking-[0.5em] uppercase"
                style={{ color: '#1c1c1c' }}
              >
                Loading
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ENTER button ── */}
        <AnimatePresence>
          {phase === 'ready' && (
            <motion.div
              key="enter-btn"
              initial={{ opacity: 0, y: 22, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.85 }}
              transition={{ duration: 0.52, ease: EASE }}
            >
              {/* Outer decorative corner brackets */}
              <div className="relative inline-block">
                {/* Corner ticks */}
                {[
                  'top-0 left-0 border-t border-l',
                  'top-0 right-0 border-t border-r',
                  'bottom-0 left-0 border-b border-l',
                  'bottom-0 right-0 border-b border-r',
                ].map((cls, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-3 h-3 ${cls} pointer-events-none`}
                    style={{ borderColor: 'rgba(247,37,133,0.35)' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.3, ease: EASE }}
                  />
                ))}

                <motion.button
                  onClick={handleEnter}
                  className="relative font-mono text-[13px] tracking-[0.45em] uppercase px-12 py-4 text-white rounded-none overflow-hidden mx-3 my-2"
                  style={{
                    background: 'rgba(247,37,133,0.06)',
                    border: '1px solid rgba(247,37,133,0.32)',
                    boxShadow:
                      '0 0 35px rgba(247,37,133,0.12), 0 0 80px rgba(247,37,133,0.04)',
                    borderRadius: '2px',
                  }}
                  whileHover={{
                    scale: 1.06,
                    backgroundColor: 'rgba(247,37,133,0.12)',
                    boxShadow:
                      '0 0 55px rgba(247,37,133,0.3), 0 0 110px rgba(247,37,133,0.1)',
                  }}
                  whileTap={{ scale: 0.93 }}
                >
                  {/* Pulsing outer glow ring */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      boxShadow: [
                        '0 0 0 0px rgba(247,37,133,0.45)',
                        '0 0 0 18px rgba(247,37,133,0)',
                      ],
                    }}
                    transition={{ duration: 1.85, repeat: Infinity, ease: 'easeOut' }}
                    style={{ borderRadius: '2px' }}
                  />

                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-y-0 w-1/2 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    }}
                    initial={{ x: '-100%' }}
                    animate={{ x: '300%' }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 0.9,
                      ease: 'linear',
                    }}
                  />

                  {/* Text with subtle glow */}
                  <span
                    style={{
                      textShadow: '0 0 20px rgba(247,37,133,0.6)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    [ ENTER ]
                  </span>
                </motion.button>
              </div>

              {/* Hint text below */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="font-mono text-[8px] tracking-[0.4em] uppercase text-center mt-4"
                style={{ color: '#1a1a1a' }}
              >
                press to continue
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Exit flash burst (radial explosion from center) ── */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            key="exit-flash"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, #ffffff 0%, #f72585 18%, rgba(180,74,247,0.6) 38%, transparent 62%)',
              zIndex: 30,
            }}
            initial={{ scale: 0.12, opacity: 1 }}
            animate={{ scale: 4.5, opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
          />
        )}
      </AnimatePresence>

      {/* ── Exit speed-line burst ── */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            key="exit-lines"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg 3deg,
                rgba(247,37,133,0.22) 3deg 3.8deg,
                transparent 3.8deg 8deg
              )`,
              zIndex: 25,
            }}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 0.05, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 1, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
