import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Konami sequence ─────────────────────────────────────────────────────────
const KONAMI = [
  'ArrowUp','ArrowUp',
  'ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight',
  'ArrowLeft','ArrowRight',
  'KeyB','KeyA',
];

const EASE = [0.22, 1, 0.36, 1];

// ── Burst sparkles on entry ─────────────────────────────────────────────────
const BURST_COUNT = 18;
const BURST_COLORS = ['#f72585','#b44af7','#ffffff','#ffd6f0','#4361ee','#00e5ff'];
function burst() {
  return Array.from({ length: BURST_COUNT }, (_, i) => {
    const angle = (i / BURST_COUNT) * 360;
    const dist = 120 + Math.random() * 200;
    const rad = (angle * Math.PI) / 180;
    return {
      id: i,
      tx: Math.cos(rad) * dist,
      ty: Math.sin(rad) * dist,
      color: BURST_COLORS[i % BURST_COLORS.length],
      scale: 0.7 + Math.random() * 1.1,
      dur: 0.55 + Math.random() * 0.4,
    };
  });
}

// ── Floating ✦ background particles ────────────────────────────────────────
const FLOAT_STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 8 + Math.random() * 14,
  dur: 2.5 + Math.random() * 3,
  delay: Math.random() * 4,
  color: BURST_COLORS[i % BURST_COLORS.length],
}));

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [particles, setParticles] = useState([]);
  const [gifFailed, setGifFailed] = useState(false);
  const bufferRef = useRef([]);

  // ── Key listener ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      bufferRef.current = [...bufferRef.current, e.code].slice(-KONAMI.length);
      if (bufferRef.current.join(',') === KONAMI.join(',')) {
        setParticles(burst());
        setActive(true);
        bufferRef.current = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Dismiss on any key when active ───────────────────────────────────────
  useEffect(() => {
    if (!active) return;
    const onAnyKey = () => setActive(false);
    window.addEventListener('keydown', onAnyKey);
    return () => window.removeEventListener('keydown', onAnyKey);
  }, [active]);

  // ── Show native cursor while overlay is open ─────────────────────────────
  useEffect(() => {
    if (active) {
      document.body.classList.add('konami-open');
    } else {
      document.body.classList.remove('konami-open');
    }
    return () => document.body.classList.remove('konami-open');
  }, [active]);

  const dismiss = () => setActive(false);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="konami"
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onClick={dismiss}
          style={{ cursor: 'pointer' }}
        >
          {/* ── Deep-space backdrop ─────────────────────────────────────── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, #1a0030 0%, #0a000f 45%, #04020a 100%)',
            }}
          />

          {/* ── Speed lines (imploding) ─────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 24 }, (_, i) => {
              const angle = (i / 24) * 360;
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    width: '55vw',
                    height: '1px',
                    marginTop: '-0.5px',
                    rotate: `${angle}deg`,
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(247,37,133,0.18) 40%, transparent 100%)',
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 0.7, 0] }}
                  transition={{ duration: 0.9, delay: 0.05, ease: [0.2, 0, 0.6, 1] }}
                />
              );
            })}
          </div>

          {/* ── Floating background ✦ stars ─────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {FLOAT_STARS.map((s) => (
              <motion.div
                key={s.id}
                className="absolute select-none font-bold leading-none"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  fontSize: s.size,
                  color: s.color,
                  opacity: 0.18,
                  textShadow: `0 0 10px ${s.color}`,
                }}
                animate={{ y: [0, -12, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: s.dur,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: s.delay,
                }}
              >
                ✦
              </motion.div>
            ))}
          </div>

          {/* ── Burst sparkles from center ──────────────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute text-xl select-none"
                style={{ color: p.color, textShadow: `0 0 8px ${p.color}` }}
                initial={{ x: 0, y: 0, opacity: 1, scale: p.scale }}
                animate={{ x: p.tx, y: p.ty, opacity: 0, scale: 0, rotate: 180 }}
                transition={{ duration: p.dur, ease: [0.22, 1, 0.36, 1] }}
              >
                ✦
              </motion.div>
            ))}
          </div>

          {/* ── Radial flash ring ──────────────────────────────────────────  */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(247,37,133,0.4) 0%, rgba(180,74,247,0.2) 40%, transparent 70%)',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: '180vmax', height: '180vmax', opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0, 0.6, 1] }}
          />

          {/* ── Main panel ─────────────────────────────────────────────────  */}
          <motion.div
            className="relative z-10 flex flex-col items-center text-center px-8"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          >
            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px" style={{ background: '#f72585' }} />
              <span
                className="font-mono text-[10px] tracking-[0.45em] uppercase"
                style={{ color: '#f72585' }}
              >
                ↑↑↓↓←→←→ B A
              </span>
              <div className="w-8 h-px" style={{ background: '#f72585' }} />
            </motion.div>

            {/* Impact heading — chromatic aberration slam */}
            <motion.h1
              initial={{ y: 60, skewY: 8, opacity: 0 }}
              animate={{ y: 0, skewY: 0, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
              className="font-black tracking-tighter leading-none mb-2 select-none"
              style={{
                fontSize: 'clamp(3.2rem, 11vw, 8rem)',
                color: '#ffffff',
                textShadow:
                  '3px 0 0 #f72585, -3px 0 0 #4361ee, 0 0 40px rgba(247,37,133,0.6)',
              }}
            >
              CHEAT CODE
            </motion.h1>
            <motion.h2
              initial={{ y: 60, skewY: 8, opacity: 0 }}
              animate={{ y: 0, skewY: 0, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.34, ease: EASE }}
              className="font-black tracking-tighter leading-none mb-8 select-none"
              style={{
                fontSize: 'clamp(2rem, 7vw, 5rem)',
                background: 'linear-gradient(90deg, #f72585, #b44af7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ACTIVATED. ✦
            </motion.h2>

            {/* Sub-message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-mono text-sm tracking-widest mb-10 max-w-sm"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              You found the secret. Konami code approved ✓ GIF by OffScript
            </motion.p>

            {/* ── GIF frame ──────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.55, ease: EASE }}
              className="relative mb-10"
            >
              {/* Neon border frame */}
              <div
                className="rounded-2xl p-[2px]"
                style={{
                  background: 'linear-gradient(135deg, #f72585, #b44af7, #4361ee, #f72585)',
                  boxShadow: '0 0 40px rgba(247,37,133,0.4), 0 0 80px rgba(180,74,247,0.2)',
                }}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: '#0d0010' }}
                >
                  {/*
                    ↓ Drop your GIF into /public/easter-egg.gif
                      and replace the src below.
                      Recommended size: 400×300 or similar landscape ratio.
                  */}
                  <img
                    src="/easter-egg.gif"
                    alt="Easter egg"
                    className="block"
                    style={{ width: 'clamp(260px, 40vw, 420px)', height: 'auto' }}
                    onError={(e) => {
                      // Placeholder shown until you add the gif
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.style.cssText +=
                        ';width:clamp(260px,40vw,420px);height:200px;display:flex;align-items:center;justify-content:center;';
                      const ph = document.createElement('span');
                      ph.textContent = '✦  your gif goes here  ✦';
                      ph.style.cssText =
                        'font-family:monospace;font-size:11px;letter-spacing:0.3em;color:rgba(247,37,133,0.45);';
                      e.currentTarget.parentElement.appendChild(ph);
                    }}
                  />
                </div>
              </div>

              {/* Corner bracket decorations */}
              {[
                'top-0 left-0 border-t-2 border-l-2',
                'top-0 right-0 border-t-2 border-r-2',
                'bottom-0 left-0 border-b-2 border-l-2',
                'bottom-0 right-0 border-b-2 border-r-2',
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-5 h-5 ${cls} rounded-sm`}
                  style={{ borderColor: '#f72585', margin: '-6px' }}
                />
              ))}
            </motion.div>

            {/* Dismiss hint */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              onClick={dismiss}
              className="font-mono text-[10px] tracking-[0.4em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(247,37,133,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              [ press any key or click to close ]
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
