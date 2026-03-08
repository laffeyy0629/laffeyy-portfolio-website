import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useCallback } from 'react';
import {
  SiJavascript, SiCplusplus, SiDotnet, SiPhp,
  SiDart, SiReact, SiSpringboot, SiFlutter,
  SiLaravel, SiTailwindcss, SiDaisyui, SiBootstrap,
  SiPostgresql, SiMysql, SiGit, SiGitlab,
  SiUnity, SiClickup, SiJira,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { BsDatabase } from 'react-icons/bs';
import { Film, SlidersHorizontal, Layers } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];
const REPEL_RADIUS = 130;
const REPEL_STRENGTH = 32;

const techStack = [
  // Languages
  { label: 'JavaScript', Icon: SiJavascript,      color: '#f7df1e', floatDur: 3.2, size: 'lg' },
  { label: 'C++',        Icon: SiCplusplus,        color: '#659ad2', floatDur: 3.8, size: 'md' },
  { label: 'C#',         Icon: SiDotnet,           color: '#9b4f96', floatDur: 4.2, size: 'md' },
  { label: 'PHP',        Icon: SiPhp,              color: '#8892bf', floatDur: 3.5, size: 'md' },
  { label: 'Java',       Icon: FaJava,             color: '#f89820', floatDur: 4.6, size: 'md' },
  { label: 'SQL',        Icon: BsDatabase,         color: '#00b4d8', floatDur: 4.0, size: 'sm' },
  { label: 'Dart',       Icon: SiDart,             color: '#44d0ff', floatDur: 3.9, size: 'sm' },
  // Frameworks & UI
  { label: 'React',      Icon: SiReact,            color: '#61dafb', floatDur: 3.3, size: 'lg' },
  { label: 'SpringBoot', Icon: SiSpringboot,       color: '#6db33f', floatDur: 4.4, size: 'md' },
  { label: 'Flutter',    Icon: SiFlutter,          color: '#54c5f8', floatDur: 3.7, size: 'md' },
  { label: 'Laravel',    Icon: SiLaravel,          color: '#ff2d20', floatDur: 4.1, size: 'md' },
  { label: 'Tailwind',   Icon: SiTailwindcss,      color: '#06b6d4', floatDur: 3.6, size: 'md' },
  { label: 'DaisyUI',    Icon: SiDaisyui,          color: '#ff9903', floatDur: 4.5, size: 'sm' },
  { label: 'Bootstrap',  Icon: SiBootstrap,        color: '#7952b3', floatDur: 3.4, size: 'sm' },
  // Databases & Tools
  { label: 'PostgreSQL', Icon: SiPostgresql,       color: '#818cf8', floatDur: 4.3, size: 'md' },
  { label: 'MySQL',      Icon: SiMysql,            color: '#00758f', floatDur: 3.8, size: 'sm' },
  { label: 'Git/GitHub', Icon: SiGit,              color: '#f97316', floatDur: 4.0, size: 'md' },
  { label: 'GitLab',     Icon: SiGitlab,           color: '#fc6d26', floatDur: 3.5, size: 'sm' },
  { label: 'Unity',      Icon: SiUnity,            color: '#c4c4c4', floatDur: 4.2, size: 'md' },
  // Creative & PM
  { label: 'Premiere',   Icon: Film,               color: '#9999ff', floatDur: 3.6, size: 'sm' },
  { label: 'Lightroom',  Icon: SlidersHorizontal,  color: '#48b4ff', floatDur: 4.4, size: 'sm' },
  { label: 'Photoshop',  Icon: Layers,             color: '#26c9ff', floatDur: 3.9, size: 'sm' },
  { label: 'ClickUp',    Icon: SiClickup,          color: '#7b68ee', floatDur: 4.1, size: 'sm' },
  { label: 'Jira',       Icon: SiJira,             color: '#0052cc', floatDur: 3.7, size: 'sm' },
];

const SIZE = {
  lg: { box: 76, iconSize: 36 },
  md: { box: 62, iconSize: 28 },
  sm: { box: 50, iconSize: 22 },
};

function CloudBadge({ label, Icon, color, floatDur, size = 'md', index, mouseX, mouseY }) {
  const ref = useRef(null);

  // Repulsion offset
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 220, damping: 24, mass: 0.55 });
  const sy = useSpring(py, { stiffness: 220, damping: 24, mass: 0.55 });

  // Proximity glow intensity (0 = far, 1 = close)
  const glowRaw = useMotionValue(0);
  const glowSpring = useSpring(glowRaw, { stiffness: 90, damping: 16 });

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const mx = mouseX.get();
      const my = mouseY.get();
      if (mx < -500) { px.set(0); py.set(0); glowRaw.set(0); return; }
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0) {
        const t = 1 - dist / REPEL_RADIUS;
        px.set(-(dx / dist) * t * REPEL_STRENGTH);
        py.set(-(dy / dist) * t * REPEL_STRENGTH);
        glowRaw.set(t * t);
      } else {
        px.set(0);
        py.set(0);
        glowRaw.set(0);
      }
    };
    const u1 = mouseX.on('change', update);
    const u2 = mouseY.on('change', update);
    return () => { u1(); u2(); };
  }, [mouseX, mouseY, px, py, glowRaw]);

  const dim = SIZE[size];
  const floatY = size === 'lg' ? 13 : size === 'md' ? 9 : 6;
  const floatPhase = (index % 8) * 0.42; // stagger float phase so not all sync

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.52, delay: index * 0.038, ease: EASE }}
      className="relative flex flex-col items-center gap-2 cursor-default select-none"
    >
      {/* Proximity glow halo — sits behind the icon */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: glowSpring }}
        className="absolute inset-[-10px] pointer-events-none rounded-3xl"
        css-note="glow"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            background: `radial-gradient(circle, ${color}55 0%, transparent 72%)`,
            filter: 'blur(12px)',
          }}
        />
      </motion.div>

      {/* Floating wrapper — separate from repulsion so both compose cleanly */}
      <motion.div
        animate={{ y: [0, -floatY, 0] }}
        transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut', delay: floatPhase }}
        className="relative z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          whileHover={{ scale: 1.22 }}
          transition={{ duration: 0.16 }}
          style={{
            width: dim.box,
            height: dim.box,
            backgroundColor: `${color}14`,
            border: `1px solid ${color}30`,
            color,
            borderRadius: '16px',
            boxShadow: `0 0 14px ${color}1a`,
          }}
          className="flex items-center justify-center"
        >
          <Icon style={{ width: dim.iconSize, height: dim.iconSize }} />
        </motion.div>
        <span
          className="text-[9px] font-mono tracking-widest uppercase whitespace-nowrap"
          style={{ color: `${color}88` }}
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const onMouseMove = useCallback(
    (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); },
    [mouseX, mouseY]
  );
  const onMouseLeave = useCallback(
    () => { mouseX.set(-9999); mouseY.set(-9999); },
    [mouseX, mouseY]
  );

  return (
    <section
      id="skills"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden py-36 px-6 bg-black"
    >
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute -top-4 right-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em] text-white/[0.018]"
        style={{ fontSize: 'clamp(9rem, 24vw, 20rem)' }}
      >
        02
      </div>

      {/* Nebula blobs — slow-breathing glow behind the cloud */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '20%', left: '10%',
            width: '60%', height: '60%',
            background: 'radial-gradient(ellipse, rgba(180,74,247,0.07) 0%, rgba(67,97,238,0.04) 45%, transparent 70%)',
            filter: 'blur(55px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{
            position: 'absolute', top: '50%', left: '55%',
            width: '42%', height: '42%',
            background: 'radial-gradient(ellipse, rgba(97,218,251,0.06) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
          style={{
            position: 'absolute', top: '60%', left: '5%',
            width: '35%', height: '35%',
            background: 'radial-gradient(ellipse, rgba(247,37,133,0.05) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-mono text-[#222] text-[10px] tracking-[0.3em]">// 02</span>
            <div className="w-6 h-px bg-white/[0.08]" />
            <span className="text-[#f72585] text-[10px] font-semibold tracking-[0.28em] uppercase">Skills</span>
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold text-white tracking-tight">
            What I work with.
          </h2>
          <p className="mt-5 text-[#555] text-lg max-w-xl mx-auto leading-relaxed">
            A curated toolkit of modern technologies I use to build scalable,
            beautiful products from idea to production.
          </p>
        </motion.div>

        {/* Mouse-reactive tech cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap justify-center gap-x-7 gap-y-11"
        >
          {techStack.map((tech, i) => (
            <CloudBadge
              key={tech.label}
              {...tech}
              index={i}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
