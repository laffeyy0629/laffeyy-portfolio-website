import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const projects = [
  {
    title: 'e-STREAM: Event Scheduling, Tracking, Registration, Evaluation, Attendance, and Management System',
    description:
      'A fully-featured online event management platform built with Laravel. Streamlined event creation, registration, certificate sending/generation, survey sending/creation, in-depth analytics and attendee management for seamless experiences.',
    tags: ['Laravel', 'MySQL', 'Tailwind CSS', 'Daisy UI'],
    accent: '#f72585',
    github: '#',
    live: 'https://dost-erms.ojt-ims-bsit.net/',
    featured: true,
  },
  {
    title: 'AI Powered Legal Docs Assistant',
    description:
      'Smart document assistant that uses AI to analyze, summarize, and extract key insights from legal documents, contracts, and case files, built with React and SpringBoot.',
    tags: ['React', 'SpringBoot', 'PostgreSQL'],
    accent: '#a15aff',
    github: 'https://github.com/laffeyy0629/AI-Powered-Legal-Docs-Assistant',
    live: '#',
    featured: true,
  },
  {
    title: 'MagiGears: Steampunk FPS Game',
    description:
      'Small-scale FPS game built with Unity, featuring a steampunk world, unique weapons, and fast-paced combat. Developed as a passion project to explore game design and mechanics.',
    tags: ['Unity', 'C#', 'Blender'],
    accent: '#ff375f',
    github: '#',
    live: 'https://youtu.be/kEAUVxEGyjM',
    featured: false,
  },
  {
    title: 'Feedback and Assessment System',
    description:
      'Simple web app for collecting and analyzing feedback, built with JSP and MySQL.',
    tags: ['JSP', 'MySQL', 'Java', 'Bootstrap'],
    accent: '#32d74b',
    github: 'https://github.com/laffeyy0629/Feedback-and-Assessment-System',
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
        <p className="text-[#777] text-sm leading-relaxed mb-6 flex-1">
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
    <section id="projects" className="relative overflow-hidden py-36 px-6 bg-black">
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute -top-4 right-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em] text-white/[0.018]"
        style={{ fontSize: 'clamp(9rem, 24vw, 20rem)' }}
      >
        04
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
            <span className="font-mono text-[#222] text-[10px] tracking-[0.3em]">// 04</span>
            <div className="w-6 h-px bg-white/[0.08]" />
            <span className="text-[#f72585] text-[10px] font-semibold tracking-[0.28em] uppercase">Projects</span>
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold text-white tracking-tight">
            Things I've built.
          </h2>
          <p className="mt-5 text-[#777] text-lg max-w-xl mx-auto leading-relaxed">
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
            href="https://github.com/laffeyy0629"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#777] hover:text-white transition-colors text-sm font-medium group"
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
