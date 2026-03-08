import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '12+', label: 'Technologies' },
  { value: '5★', label: 'Client Rating' },
];

const EASE = [0.22, 1, 0.36, 1];

// Parse numeric prefix and trailing suffix from a string like "3+" or "5★"
function parseValue(str) {
  const match = str.match(/^(\d+)(.*)$/);
  if (!match) return { num: null, suffix: str };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function useCountUp(target, duration = 1.6, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    setCount(0);
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

function StatCard({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { num, suffix } = parseValue(value);
  const count = useCountUp(num ?? 0, 1.6, inView && num !== null);
  const display = num !== null ? `${count}${suffix}` : value;

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, scale: 0.88 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="glass-card rounded-2xl p-5 cursor-default"
    >
      <div className="text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-white mb-0.5 leading-none">
        {display}
      </div>
      <div className="text-[#444] text-xs font-medium mt-1.5">{label}</div>
    </motion.div>
  );
}

function FadeUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-36 px-6 bg-[#080808]">
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute -top-4 right-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em] text-white/[0.018]"
        style={{ fontSize: 'clamp(9rem, 24vw, 20rem)' }}
      >
        01
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* ── Text column ── */}
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[#222] text-[10px] tracking-[0.3em]">// 01</span>
                <div className="w-6 h-px bg-white/[0.08]" />
                <span className="text-[#f72585] text-[10px] font-semibold tracking-[0.28em] uppercase">About</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold text-white tracking-tight leading-[1.1] mb-8">
                Turning ideas into reality,
                <br />
                <span className="text-[#86868b]">one line at a time.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[#86868b] text-lg leading-relaxed mb-5">
                I'm a passionate full-stack developer who loves creating elegant,
                efficient, and user-centric applications. I bridge the gap between
                design and functionality — delivering seamless experiences that
                feel as good as they look.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-[#555] text-lg leading-relaxed mb-10">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source, or designing interfaces that push
                creative boundaries.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#f72585] font-medium hover:text-[#ff4d9b] transition-colors text-sm group"
              >
                Let's work together
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </FadeUp>
          </div>

          {/* ── Right: photo + stats ── */}
          <div className="flex flex-col items-center gap-6">
            {/* Small portrait with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative"
            >
              {/* Glow bloom */}
              <div
                className="absolute -inset-6 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(247,37,133,0.15) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />
              {/* Photo frame */}
              <div
                className="relative rounded-2xl overflow-hidden w-full max-w-[340px] aspect-[4/5]"
                style={{ border: '1px solid rgba(247,37,133,0.2)' }}
              >
                <img
                  src="/avatar.jpg"
                  alt="Your Name"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background =
                      'linear-gradient(135deg, #1a0a14 0%, #2d0f2a 50%, #1a0a1a 100%)';
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 55%)' }}
                />
              </div>
            </motion.div>

            {/* Stats grid below photo */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
              }}
              className="grid grid-cols-2 gap-3 w-full max-w-[340px]"
            >
              {stats.map(({ value, label }, i) => (
                <StatCard key={label} value={value} label={label} delay={i * 0.1} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
