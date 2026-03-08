import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ChevronDown, ClipboardList } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────────────────
//  ADD YOUR WEEKLY REPORTS HERE
//  - For local files: put the PDF in /public/reports/ and
//    set url: '/reports/week1.pdf'
//  - For external links (Google Drive, OneDrive, etc.):
//    set url: 'https://drive.google.com/file/d/...'
//  - status: 'logged' | 'on-file' | 'incoming'
// ─────────────────────────────────────────────────────────
const reports = [
  {
    week: 1,
    title: 'Week 1 Accomplishment Report',
    dateRange: 'Jan 20 – Jan 24, 2026',
    summary: 'Orientation with the company, set up development environment, met with the team lead, and reviewed the project codebase.',
    url: '/reports/week1.pdf',
    status: 'logged',
  },
  {
    week: 2,
    title: 'Week 2 Accomplishment Report',
    dateRange: 'Jan 27 – Jan 31, 2026',
    summary: 'Started working on the assigned module. Attended daily standups, completed initial UI components, and submitted the first feature branch for review.',
    url: '/reports/week2.pdf',
    status: 'logged',
  },
  {
    week: 3,
    title: 'Week 3 Accomplishment Report',
    dateRange: 'Feb 3 – Feb 7, 2026',
    summary: 'Resolved pull request comments, implemented API integration for the dashboard, and joined the weekly sprint planning meeting.',
    url: '/reports/week3.pdf',
    status: 'on-file',
  },
  {
    week: 4,
    title: 'Week 4 Accomplishment Report',
    dateRange: 'Feb 10 – Feb 14, 2026',
    summary: 'Completed the main feature module, wrote unit tests, and presented progress to the supervisor.',
    url: '/reports/week4.pdf',
    status: 'on-file',
  },
  {
    week: 5,
    title: 'Week 5 Accomplishment Report',
    dateRange: 'Feb 17 – Feb 21, 2026',
    summary: 'Bug fixes and code review participation. Began working on secondary task assigned by the supervisor.',
    url: '/reports/week5.pdf',
    status: 'incoming',
  },
  // Add more weeks below as needed ↓
  // {
  //   week: 6,
  //   title: 'Week 6 Accomplishment Report',
  //   dateRange: 'Feb 24 – Feb 28, 2026',
  //   summary: '',
  //   url: '/reports/week6.pdf',
  //   status: 'pending',
  // },
];

const STATUS_STYLE = {
  'logged':   { label: 'Logged',   bg: 'rgba(50,215,75,0.1)',    border: 'rgba(50,215,75,0.28)',   text: '#32d74b' },
  'on-file':  { label: 'On File',  bg: 'rgba(180,74,247,0.1)',   border: 'rgba(180,74,247,0.28)',  text: '#b44af7' },
  'incoming': { label: 'Incoming', bg: 'rgba(255,159,10,0.1)',   border: 'rgba(255,159,10,0.28)',  text: '#ff9f0a' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase shrink-0"
      style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: s.text }} />
      {s.label}
    </span>
  );
}

function ReportRow({ report, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.022)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(247,37,133,0.04), 0 0 0 1px rgba(247,37,133,0.10)' }}
      />

      {/* Main row */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-5 px-6 py-5 text-left group/row"
      >
        {/* Week number */}
        <span
          className="font-black text-[clamp(1.5rem,4vw,2.2rem)] leading-none tracking-tighter shrink-0 w-14 text-right"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(247,37,133,0.45)',
            fontVariantNumeric: 'tabular-nums',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(247,37,133,0.7)'; e.currentTarget.style.WebkitTextStroke = '1.5px rgba(247,37,133,0)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'transparent'; e.currentTarget.style.WebkitTextStroke = '1.5px rgba(247,37,133,0.45)'; }}
        >
          {String(report.week).padStart(2, '0')}
        </span>

        {/* Divider */}
        <div className="w-px h-8 bg-white/[0.05] shrink-0" />

        {/* Title + date */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-[14px] font-semibold tracking-tight truncate group-hover/row:text-white transition-colors">
            {report.title}
          </p>
          <p className="font-mono text-[10px] text-[#666] tracking-[0.18em] mt-0.5">
            {report.dateRange}
          </p>
        </div>

        {/* Status + actions */}
        <div className="flex items-center gap-3 shrink-0">
          <StatusBadge status={report.status} />

          <a
            href={report.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
            style={{
              color: '#f72585',
              background: 'rgba(247,37,133,0.08)',
              border: '1px solid rgba(247,37,133,0.22)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(247,37,133,0.16)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(247,37,133,0.18)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(247,37,133,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Eye size={10} />
            View
          </a>

          {/* Expand chevron */}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="text-[#777]"
          >
            <ChevronDown size={15} />
          </motion.span>
        </div>
      </button>

      {/* Expandable summary */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="summary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-5 pt-0 ml-[calc(3.5rem+1.25rem+1px+1.25rem)]"
            >
              <div
                className="rounded-xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#666] mb-2">Summary</p>
                <p className="text-[#888] text-[13px] leading-relaxed">{report.summary}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WeeklyReports() {
  const submitted = reports.filter((r) => r.status !== 'incoming').length;

  return (
    <section id="reports" className="relative py-32 px-6 overflow-hidden">
      {/* Section watermark */}
      <span
        className="absolute top-12 right-8 font-black text-[clamp(5rem,14vw,11rem)] leading-none select-none pointer-events-none"
        style={{
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.03)',
        }}
      >
        07
      </span>

      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-4 mb-5"
        >
          <span className="font-mono text-[10px] tracking-[0.35em] text-[#f72585] uppercase">
            OJT Reports
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
            Weekly
            <br />
            <span style={{ color: '#b44af7' }}>Accomplishments.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
          className="flex flex-wrap items-center gap-6 mb-16"
        >
          <p className="text-[#777] text-base leading-relaxed flex items-center gap-3">
            <ClipboardList size={14} className="text-[#b44af7] shrink-0" />
            Weekly progress reports filed during the OJT period.
          </p>

          {/* Quick stats */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-center">
              <p className="text-white font-bold text-xl leading-none">{reports.length}</p>
              <p className="font-mono text-[9px] text-[#666] tracking-[0.25em] uppercase mt-1">Total</p>
            </div>
            <div className="w-px h-8 bg-white/[0.05]" />
            <div className="text-center">
              <p className="font-bold text-xl leading-none" style={{ color: '#32d74b' }}>{submitted}</p>
              <p className="font-mono text-[9px] text-[#666] tracking-[0.25em] uppercase mt-1">Filed</p>
            </div>
            <div className="w-px h-8 bg-white/[0.05]" />
            <div className="text-center">
              <p className="font-bold text-xl leading-none" style={{ color: '#ff9f0a' }}>{reports.length - submitted}</p>
              <p className="font-mono text-[9px] text-[#666] tracking-[0.25em] uppercase mt-1">Incoming</p>
            </div>
          </div>
        </motion.div>

        {/* Report rows */}
        <div className="flex flex-col gap-3">
          {reports.map((report, i) => (
            <ReportRow key={report.week} report={report} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-mono text-[9px] tracking-[0.4em] text-[#1e1e1e] uppercase text-center mt-12"
        >
          Click any row to expand · View opens PDF in browser
        </motion.p>
      </div>
    </section>
  );
}
