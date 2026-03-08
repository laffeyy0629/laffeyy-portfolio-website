import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// ── Language data ──────────────────────────────────────────────────
// status options: 'Native' | 'Fluent' | 'Conversational' | 'Learning'
const LANGUAGES = [
  {
    index: '01',
    name: 'Filipino',
    native: 'ᜉᜒᜎᜒᜉᜒᜈᜓ',   // Baybayin script (decorative ghost)
    nativeLabel: 'Baybayin',
    status: 'Native',
    level: 100,
    note: 'Mother tongue',
  },
  {
    index: '02',
    name: 'English',
    native: 'ENGLISH',
    nativeLabel: 'Latin script',
    status: 'Native',
    level: 100,
    note: 'Academic · Professional',
  },
  {
    index: '03',
    name: 'Japanese',
    native: '日本語',
    nativeLabel: 'Nihongo',
    status: 'Conversational',
    level: 42,
    note: 'Actively studying',
  },
];

// ── Status visual config ────────────────────────────────────────────
const STATUS_STYLE = {
  Native:         { pill: 'border-white/15 bg-white/[0.04]',  text: 'text-white',    bar: 'bg-white/40'  },
  Fluent:         { pill: 'border-[#f72585]/30 bg-[#f72585]/[0.06]', text: 'text-[#f72585]', bar: 'bg-[#f72585]' },
  Conversational: { pill: 'border-[#f72585]/20 bg-[#f72585]/[0.04]', text: 'text-[#f72585]', bar: 'bg-[#f72585]' },
  Learning:       { pill: 'border-white/[0.07] bg-transparent', text: 'text-[#666]', bar: 'bg-white/[0.18]' },
};

// ── Single language row ─────────────────────────────────────────────
function LangRow({ lang, rowIndex, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const s = STATUS_STYLE[lang.status];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: rowIndex * 0.14, ease: EASE }}
      className="group relative"
    >
      {/* Top rule */}
      <div className="w-full h-px bg-white/[0.05]" />

      <div className="relative py-10 sm:py-14 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-0 overflow-hidden">

        {/* ── Ghost native script ── */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 flex items-center select-none pointer-events-none"
        >
          <span
            className="font-black leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(5rem, 18vw, 13rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.028)',
              userSelect: 'none',
            }}
          >
            {lang.native}
          </span>
        </div>

        {/* ── Row index ── */}
        <span className="hidden lg:block w-16 font-mono text-[9px] tracking-[0.35em] text-[#555] shrink-0">
          {lang.index}
        </span>

        {/* ── Language name + script label ── */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-white tracking-tighter leading-none"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 6rem)' }}
          >
            {lang.name}
          </h3>
          <div className="flex items-center gap-3 mt-2.5">
            <span className="font-mono text-[9px] tracking-[0.35em] text-[#555] uppercase">
              {lang.nativeLabel}
            </span>
            <span className="w-3 h-px bg-white/[0.08]" />
            <span className="font-mono text-[9px] tracking-[0.28em] text-[#555] uppercase">
              {lang.note}
            </span>
          </div>
        </div>

        {/* ── Right: badge + bar ── */}
        <div className="flex flex-col items-start sm:items-end gap-3 sm:pl-10 shrink-0">
          {/* Status pill */}
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border ${s.pill}`}
          >
            {/* Dot indicator */}
            <span
              className={`w-1.5 h-1.5 rounded-full ${lang.status === 'Native' ? 'bg-white/60' : 'bg-[#f72585]'}`}
              style={lang.status === 'Conversational' || lang.status === 'Fluent'
                ? { boxShadow: '0 0 5px rgba(247,37,133,0.6)' }
                : {}
              }
            />
            <span className={`font-mono text-[9px] tracking-[0.28em] uppercase ${s.text}`}>
              {lang.status}
            </span>
          </div>

          {/* Proficiency bar */}
          <div className="w-36 sm:w-44 flex flex-col gap-1.5">
            <div className="w-full h-[1.5px] bg-white/[0.05] rounded-full relative overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full ${s.bar}`}
                initial={{ width: '0%' }}
                animate={inView ? { width: `${lang.level}%` } : {}}
                transition={{ duration: 1.3, delay: rowIndex * 0.14 + 0.45, ease: EASE }}
              />
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[8px] text-[#555] tracking-[0.25em]">PROFICIENCY</span>
              <motion.span
                className="font-mono text-[8px] text-[#666] tracking-wide"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: rowIndex * 0.14 + 1.0 }}
              >
                {lang.level}%
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom rule on last item */}
      {rowIndex === total - 1 && (
        <div className="w-full h-px bg-white/[0.05]" />
      )}
    </motion.div>
  );
}

// ── Section ─────────────────────────────────────────────────────────
export default function Languages() {
  return (
    <section id="languages" className="relative overflow-hidden py-36 px-6 bg-[#060606]">
    <div
        aria-hidden="true"
        className="absolute -top-4 right-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em] text-white/[0.018]"
        style={{ fontSize: 'clamp(9rem, 24vw, 20rem)' }}
      >
        03
    </div>

      {/* ── Ambient tint ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none select-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(247,37,133,0.05) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Watermark ── */}
      <div
        aria-hidden="true"
        className="absolute -top-4 left-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em]"
        style={{
          fontSize: 'clamp(9rem, 24vw, 20rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.015)',
        }}
      >
        語
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[#222] text-[10px] tracking-[0.3em]">// LA</span>
            <div className="w-6 h-px bg-white/[0.08]" />
            <span className="text-[#f72585] text-[10px] font-semibold tracking-[0.28em] uppercase">
              Languages
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-bold text-white tracking-tighter leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
            >
              Spoken across
              <br />
              <span className="text-[#86868b]">cultures.</span>
            </h2>
            <p className="font-mono text-[10px] tracking-[0.22em] text-[#555] leading-relaxed uppercase lg:text-right">
              Language is the bridge<br />between worlds.
            </p>
          </div>
        </motion.div>

        {/* ── Language rows ── */}
        <div>
          {LANGUAGES.map((lang, i) => (
            <LangRow
              key={lang.name}
              lang={lang}
              rowIndex={i}
              total={LANGUAGES.length}
            />
          ))}
        </div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 font-mono text-[9px] tracking-[0.3em] text-[#555] uppercase text-right"
        >
          + more being learned
        </motion.p>

      </div>
    </section>
  );
}
