import { motion } from 'framer-motion';
import { Download, FileText, BookOpen, Mail } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

const EASE = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────────────────
//  Drop your PDF files into /public/downloads/ and update
//  the `file` paths below, e.g. '/downloads/resume.pdf'
// ─────────────────────────────────────────────────────────
const downloads = [
  {
    id: 'resume',
    icon: FileText,
    label: 'Résumé',
    heading: 'One-page résumé',
    desc: 'A concise snapshot of my skills, experience, and recent projects — optimised for recruiters.',
    meta: 'PDF · 1 page · Updated 2026',
    file: '/downloads/Ferrer, Javez Isaq B. - Resume.pdf',
    color: '#f72585',
    bg: '#0d0306',
  },
  {
    id: 'cv',
    icon: BookOpen,
    label: 'Curriculum Vitae',
    heading: 'Full CV',
    desc: 'Complete academic and professional history including education, projects, and technical depth.',
    meta: 'PDF · 2–3 pages · Updated 2026',
    file: '/downloads/Ferrer, Javez Isaq B. - CV.pdf',
    color: '#b44af7',
    bg: '#08040d',
  },
  {
    id: 'cover',
    icon: Mail,
    label: 'Cover Letter',
    heading: 'Cover letter',
    desc: 'My motivation, values, and what I bring to a team — tailored for software development roles.',
    meta: 'PDF · 1 page · Updated 2026',
    file: '/downloads/Ferrer, Javez Isaq B. - Cover Letter.pdf',
    color: '#4361ee',
    bg: '#03040e',
  },
];

function DownloadCard({ doc, index }) {
  const Icon = doc.icon;
  const mag = useMagnetic(0.3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: doc.bg,
        border: `1px solid ${doc.color}20`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${doc.color}80, transparent)`,
        }}
      />

      {/* Hover glow bloom */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `0 0 55px ${doc.color}10, inset 0 0 35px ${doc.color}06`,
          border: `1px solid ${doc.color}35`,
        }}
      />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-8 gap-6">
        {/* Icon + label */}
        <div className="flex items-center justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${doc.color}14`, border: `1px solid ${doc.color}28` }}
          >
            <Icon size={18} style={{ color: doc.color }} />
          </div>
          <span
            className="font-mono text-[9px] tracking-[0.32em] uppercase"
            style={{ color: `${doc.color}55` }}
          >
            {doc.label}
          </span>
        </div>

        {/* Heading + desc */}
        <div className="flex-1">
          <h3
            className="text-white font-bold text-[1.35rem] leading-tight tracking-tight mb-3 group-hover:text-white transition-colors"
          >
            {doc.heading}
          </h3>
          <p className="text-[#777] text-[13px] leading-relaxed">{doc.desc}</p>
        </div>

        {/* Meta + download */}
        <div className="flex items-center justify-between pt-5 border-t border-white/[0.05]">
          <span className="font-mono text-[10px] text-[#666] tracking-[0.18em]">
            {doc.meta}
          </span>

          <motion.a
            ref={mag.ref}
            href={doc.file}
            download
            style={{
              ...mag.style,
              color: doc.color,
              background: `${doc.color}12`,
              border: `1px solid ${doc.color}35`,
              boxShadow: `0 0 22px ${doc.color}12`,
            }}
            onMouseMove={mag.onMouseMove}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-[11px] tracking-[0.2em] uppercase font-semibold relative overflow-hidden"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${doc.color}20`;
              e.currentTarget.style.boxShadow = `0 0 32px ${doc.color}28`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${doc.color}12`;
              e.currentTarget.style.boxShadow = `0 0 22px ${doc.color}12`;
              mag.onMouseLeave();
            }}
          >
            {/* Shimmer sweep */}
            <motion.span
              className="absolute inset-y-0 w-1/2 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '300%' }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
            />
            <Download size={12} />
            Download
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Downloads() {
  return (
    <section id="downloads" className="relative overflow-hidden py-36 px-6 bg-black">
      {/* Section watermark */}
      <div
        aria-hidden="true"
        className="absolute -top-4 right-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em] text-white/[0.018]"
        style={{ fontSize: 'clamp(9rem, 24vw, 20rem)' }}
      >
        06
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-4 mb-5"
        >
          <span className="font-mono text-[10px] tracking-[0.35em] text-[#f72585] uppercase">
            Downloads
          </span>
          <div className="flex-1 max-w-xs h-px bg-white/[0.06]" />
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-white tracking-tighter leading-[1.05]"
          >
            Take a copy
            <br />
            <span style={{ color: '#f72585' }}>of my story.</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
          className="text-[#777] text-base leading-relaxed max-w-xl mb-16"
        >
          Everything you need to evaluate my work — available to download instantly.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {downloads.map((doc, i) => (
            <DownloadCard key={doc.id} doc={doc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
