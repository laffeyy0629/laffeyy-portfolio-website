import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A fully-featured online store with real-time inventory management, Stripe payment processing, and an intuitive admin dashboard used by 1,000+ customers.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    accent: '#f72585',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'AI Task Manager',
    description:
      'Smart productivity tool that uses AI to intelligently categorize, prioritize, and schedule tasks. Reduced planning time by 60% for early adopters.',
    tags: ['React', 'OpenAI API', 'Node.js', 'MongoDB'],
    accent: '#a15aff',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'Real-time Chat App',
    description:
      'Scalable messaging platform with end-to-end encryption, live presence indicators, and seamless file sharing, built for remote teams.',
    tags: ['React', 'Socket.io', 'Redis', 'Docker'],
    accent: '#ff375f',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'Portfolio Dashboard',
    description:
      'Investment portfolio tracker with real-time market data feeds, advanced analytics, and intelligent allocation recommendations powered by Python.',
    tags: ['Vue.js', 'Python', 'FastAPI', 'Chart.js'],
    accent: '#32d74b',
    github: '#',
    live: '#',
    featured: false,
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 30 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 30 });

  const onMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const dx = (e.clientX - cx) / (width / 2);
    const dy = (e.clientY - cy) / (height / 2);
    rotX.set(-dy * 10);
    rotY.set(dx * 10);
  }, [rotX, rotY]);

  const onMouseLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
  }, [rotX, rotY]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay: index * 0.09, ease: EASE }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      data-cursor="VIEW"
      className="group relative rounded-3xl overflow-hidden glass-card p-8 flex flex-col"
    >
      {/* Hover accent glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 0%, ${project.accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Top bar */}
      <div className="relative flex items-start justify-between mb-7">
        {/* Accent indicator */}
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${project.accent}15`,
            border: `1px solid ${project.accent}35`,
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: project.accent, boxShadow: `0 0 10px ${project.accent}80` }}
          />
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            aria-label="GitHub"
            className="text-white hover:text-[#f72585] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} />
          </a>
          <a
            href={project.live}
            aria-label="Live demo"
            className="text-white hover:text-[#f72585] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-[#555] text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full text-[#888] border border-white/[0.08] bg-white/[0.03]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-36 px-6 bg-[#080808]">
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute -top-4 right-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em] text-white/[0.018]"
        style={{ fontSize: 'clamp(9rem, 24vw, 20rem)' }}
      >
        03
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
            <span className="font-mono text-[#222] text-[10px] tracking-[0.3em]">// 03</span>
            <div className="w-6 h-px bg-white/[0.08]" />
            <span className="text-[#f72585] text-[10px] font-semibold tracking-[0.28em] uppercase">Projects</span>
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold text-white tracking-tight">
            Things I've built.
          </h2>
          <p className="mt-5 text-[#555] text-lg max-w-xl mx-auto leading-relaxed">
            A selection of projects that showcase my skills and passion for
            building great software.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#555] hover:text-white transition-colors text-sm font-medium group"
          >
            <Github size={16} />
            See more on GitHub
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
