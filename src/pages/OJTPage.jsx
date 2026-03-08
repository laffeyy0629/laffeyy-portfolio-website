import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, ClipboardList, PlayCircle } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import StarField from '../components/StarField';
import Documents from '../components/Documents';
import WeeklyReports from '../components/WeeklyReports';

const EASE = [0.22, 1, 0.36, 1];

function OJTNavbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Back to portfolio */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#666] hover:text-white transition-colors duration-200 text-sm font-medium group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Portfolio
        </Link>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <img
            src="/carlogo.png"
            alt="Logo"
            width={28}
            height={28}
            className="rounded-lg"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="text-white font-semibold text-lg tracking-tight">
            IsaqF<span className="text-[#f72585]">.</span>
          </span>
        </Link>

        {/* Within-page anchors */}
        <div className="flex items-center gap-6">
          <a
            href="#documents"
            className="flex items-center gap-1.5 text-[#666] hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <FileText size={13} />
            Docs
          </a>
          <a
            href="#reports"
            className="flex items-center gap-1.5 text-[#666] hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <ClipboardList size={13} />
            Reports
          </a>
          <a
            href="#resume-video"
            className="flex items-center gap-1.5 transition-colors duration-200 text-sm font-medium"
            style={{ color: '#f72585' }}
          >
            <PlayCircle size={13} />
            Video
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

function SectionBridge() {
  return (
    <div className="relative py-4 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(247,37,133,0.06), rgba(180,74,247,0.06), transparent)',
        }}
      />
      <motion.span
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative font-mono text-[9px] tracking-[0.55em] px-6"
        style={{ background: '#090909', color: '#222' }}
      >
        ✦ ✦ ✦
      </motion.span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  RESUME VIDEO
//  Replace YOUTUBE_VIDEO_ID with your actual YouTube video ID
//  e.g. for https://youtu.be/dQw4w9WgXcQ the ID is dQw4w9WgXcQ
//  YouTube IDs are exactly 11 characters: letters, digits, _ or -
// ─────────────────────────────────────────────────────────
const YOUTUBE_VIDEO_ID = 'YOUR_VIDEO_ID_HERE';

// Whitelist: YouTube IDs are always exactly 11 URL-safe chars.
// Reject anything that doesn't match before putting it in a src URL.
const VALID_YT_ID = /^[A-Za-z0-9_-]{11}$/;

function ResumeVideo() {
  const isPlaceholder = YOUTUBE_VIDEO_ID === 'YOUR_VIDEO_ID_HERE';
  const safeId = !isPlaceholder && VALID_YT_ID.test(YOUTUBE_VIDEO_ID) ? YOUTUBE_VIDEO_ID : null;
  const embedUrl = safeId
    ? `https://www.youtube.com/embed/${safeId}?rel=0&modestbranding=1&color=white`
    : null;

  return (
    <section id="resume-video" className="relative py-32 px-6 overflow-hidden">
      {/* Section watermark */}
      <span
        className="absolute top-12 right-8 font-black text-[clamp(5rem,14vw,11rem)] leading-none select-none pointer-events-none"
        style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.03)' }}
      >
        08
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
            Resume
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
            Resume
            <br />
            <span style={{ color: '#f72585' }}>Video.</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
          className="text-[#3a3a3a] text-base leading-relaxed max-w-xl mb-12 flex items-center gap-3"
        >
          <PlayCircle size={14} className="text-[#f72585] shrink-0" />
          A brief video introduction and walkthrough of my background, skills, and goals.
        </motion.p>

        {/* Video embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(247,37,133,0.18)',
            boxShadow: '0 0 60px rgba(247,37,133,0.06), 0 0 120px rgba(180,74,247,0.04)',
          }}
        >
          {/* Corner accent ticks */}
          {[
            'top-0 left-0 border-t border-l',
            'top-0 right-0 border-t border-r',
            'bottom-0 left-0 border-b border-l',
            'bottom-0 right-0 border-b border-r',
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 ${cls} pointer-events-none z-10`}
              style={{ borderColor: 'rgba(247,37,133,0.4)', margin: '-1px' }}
            />
          ))}

          {isPlaceholder || !embedUrl ? (
            /* Placeholder shown until a real video ID is set */
            <div
              className="aspect-video flex flex-col items-center justify-center gap-4"
              style={{ background: 'rgba(247,37,133,0.04)' }}
            >
              <PlayCircle size={48} style={{ color: 'rgba(247,37,133,0.25)' }} />
              <div className="text-center">
                <p className="text-white/20 text-sm font-medium mb-1">Video coming soon</p>
                <p className="font-mono text-[10px] tracking-[0.3em] text-[#1e1e1e] uppercase">
                  Set YOUTUBE_VIDEO_ID in OJTPage.jsx
                </p>
              </div>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                title="Resume Video"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-popups"
                allowFullScreen
                loading="lazy"
                className="block"
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function OJTFooter() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-[#666] hover:text-white border border-white/[0.07] hover:border-white/[0.18] hover:bg-white/[0.04] transition-all duration-300"
        >
          <ArrowLeft size={13} />
          Back to Portfolio
        </Link>
        <p className="font-mono text-[9px] tracking-[0.4em] text-[#1a1a1a] uppercase">
          OJT Documentation · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default function OJTPage() {
  useEffect(() => {
    document.title = 'OJT Docs — Your Name';
    return () => { document.title = 'Your Name — Portfolio'; };
  }, []);

  return (
    <motion.div
      className="bg-black min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
    >
      <CustomCursor />
      <StarField />
      <OJTNavbar />

      {/* Offset for fixed navbar */}
      <div className="pt-16">
        <ResumeVideo />
        <SectionBridge />
        <Documents />
        <SectionBridge />
        <WeeklyReports />
        <OJTFooter />
      </div>
    </motion.div>
  );
}
