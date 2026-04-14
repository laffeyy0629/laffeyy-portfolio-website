import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

const EASE = [0.22, 1, 0.36, 1];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&';

function useScramble(text, { delay = 0, duration = 1.2 } = {}) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let frame;
    const timeout = setTimeout(() => {
      const len = text.length;
      const startTime = performance.now();
      const step = (now) => {
        const elapsed = (now - startTime) / (duration * 1000);
        const revealed = Math.floor(elapsed * len);
        let result = '';
        for (let i = 0; i < len; i++) {
          if (text[i] === ' ') { result += ' '; continue; }
          if (i < revealed) {
            result += text[i];
          } else if (i === revealed) {
            result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          } else {
            result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }
        setDisplay(result);
        if (elapsed < 1) frame = requestAnimationFrame(step);
        else setDisplay(text);
      };
      frame = requestAnimationFrame(step);
    }, delay * 1000);
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame); };
  }, [text, delay, duration]);
  return display;
}

// ── Floating anime sparkle decoration ──
function Sparkle({ style }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5], rotate: [0, 180, 360] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute pointer-events-none select-none text-[#f72585]"
      style={style}
    >
      ✦
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y       = useTransform(scrollYProgress, [0, 1],    ['0%',   '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1,      0]);
  const imgY    = useTransform(scrollYProgress, [0, 1],    ['0%',   '15%']);

  // Scramble "Your" and "Name." — triggers after clip-reveal (~0.8s)
  const scrambleYour = useScramble('Javez Isaq', { delay: 0.9, duration: 1.0 });
  const scrambleName = useScramble('Ferrer', { delay: 1.1, duration: 1.0 });

  // Magnetic CTAs
  const magProjects = useMagnetic(0.38);
  const magContact = useMagnetic(0.38);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Ambient orbs ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[20%] left-[15%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(247,37,133,0.16) 0%, transparent 65%)' }}
        />
        <motion.div
          animate={{ x: [0, -70, 50, 0], y: [0, 60, -50, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[15%] right-[10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(161,90,255,0.10) 0%, transparent 65%)' }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          }}
        />
        <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* ── Two-column content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center"
      >
        {/* ── Left: text ── */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.15 }}
            className="font-mono text-[10px] tracking-[0.5em] text-[#2a2a2a] uppercase mb-8"
          >
            F U L L &nbsp; S T A C K &nbsp; D E V E L O P E R
          </motion.p>

          {/* Clip-reveal heading */}
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold tracking-tighter leading-[0.88] mb-6">
            <div className="overflow-hidden">
              <motion.span
                className="block text-white font-mono"
                initial={{ y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
              >
                {scrambleYour}
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="block text-gradient-white font-mono"
                initial={{ y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.52, ease: EASE }}
              >
                {scrambleName}
              </motion.span>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="text-[clamp(0.9rem,2vw,1.15rem)] text-[#8a8a8a] mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-light tracking-wide"
          >
            Crafting beautiful, performant, and intuitive digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <motion.a
              ref={magProjects.ref}
              href="#projects"
              style={magProjects.style}
              onMouseMove={magProjects.onMouseMove}
              onMouseLeave={magProjects.onMouseLeave}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-7 py-3 bg-[#f72585] text-white rounded-full font-semibold text-sm hover:bg-[#ff4d9b] transition-colors duration-300 shadow-lg shadow-[#f72585]/25"
            >
              View Projects
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </motion.a>
            <motion.a
              ref={magContact.ref}
              href="#contact"
              style={magContact.style}
              onMouseMove={magContact.onMouseMove}
              onMouseLeave={magContact.onMouseLeave}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-7 py-3 bg-white/[0.06] text-white rounded-full font-semibold text-sm border border-white/10 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right: portrait ── */}
        <motion.div
          style={{ y: imgY }}
          className="relative flex justify-center items-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
        >
          {/* Outer glow bloom */}
          <div
            className="absolute w-[340px] h-[340px] lg:w-[420px] lg:h-[420px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(247,37,133,0.22) 0%, rgba(180,74,247,0.12) 45%, transparent 72%)',
              filter: 'blur(18px)',
            }}
          />

          {/* Floating wrapper */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Rotating neon ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-[3px] rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #f72585, #b44af7, #4361ee, #f72585)',
                borderRadius: '50%',
              }}
            />
            {/* Counter-rotating inner ring (opposite direction, slower) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-[7px] rounded-full opacity-40"
              style={{
                background: 'conic-gradient(from 180deg, transparent 60%, #f72585 80%, transparent 100%)',
                borderRadius: '50%',
              }}
            />

            {/* Black inset gap + image */}
            <div
              className="relative rounded-full overflow-hidden bg-[#0d0d0d]"
              style={{ padding: '4px', borderRadius: '50%' }}
            >
              <div className="rounded-full overflow-hidden w-56 h-56 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px]">
                {/* 
                  ↓ Replace this src with your real photo path.
                    Place your image at: public/avatar.jpg
                    Then change src to "/avatar.jpg"
                */}
                <img
                  src="/avatar.jpg"
                  alt="Your Name"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback placeholder until real photo is added
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background =
                      'linear-gradient(135deg, #1a0a14 0%, #2d0f2a 50%, #1a0a1a 100%)';
                  }}
                />
                {/* Overlay: subtle pink-to-transparent tint at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(247,37,133,0.18) 0%, transparent 50%)',
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Decorative ✦ sparkles orbiting the portrait */}
          <Sparkle style={{ top: '6%',  right: '10%', fontSize: '10px', opacity: 0.7 }} />
          <Sparkle style={{ top: '20%', left:  '4%',  fontSize: '7px',  opacity: 0.5 }} />
          <Sparkle style={{ bottom: '12%', right: '6%',  fontSize: '8px',  opacity: 0.6 }} />
          <Sparkle style={{ bottom: '22%', left:  '10%', fontSize: '12px', opacity: 0.45 }} />
          <Sparkle style={{ top: '50%',  right: '-2%', fontSize: '6px',  opacity: 0.4 }} />
        </motion.div>
      </motion.div>

      {/* ── Bottom metadata bar + scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.9 }}
        className="absolute bottom-9 left-8 right-8 flex items-end justify-between pointer-events-none"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] text-[#1c1c1c] uppercase">
          Portfolio · 2026
        </span>
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#2e2e2e]">
          <span className="font-mono text-[8px] tracking-[0.35em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={13} />
          </motion.div>
        </div>
        <span className="font-mono text-[9px] tracking-[0.35em] text-[#1c1c1c] uppercase">
          React · TS · Node.js
        </span>
      </motion.div>
    </section>
  );
}
