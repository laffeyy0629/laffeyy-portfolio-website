import { motion } from 'framer-motion';
import { FileText, Download, Eye, FolderOpen } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────────────────
//  ADD YOUR DOCUMENTS HERE
//  - For local files: put the PDF in /public/docs/ and set
//    url: '/docs/your-file.pdf'
//  - For external links (Google Drive, OneDrive, etc.):
//    set url: 'https://drive.google.com/file/d/...'
//  - Set download: false if you only want a View button
// ─────────────────────────────────────────────────────────
const documents = [
  {
    id: 1,
    title: 'Endorsement Letter',
    category: 'Requirement',
    desc: 'Letter from the institution endorsing the student for OJT placement.',
    date: 'Feb 23, 2026',
    url: '/docs/Ferrer, Javez Isaq B._Endorsement Letter.pdf',
    download: true,
  },
  {
    id: 2,
    title: 'Notarized MOA / Memorandum of Agreement',
    category: 'Requirement',
    desc: 'Signed agreement between the school and the host company.',
    date: 'Apr, 08 2025',
    url: '/docs/Xtreme-Offshore-Outsourcing-Inc.-MOA.pdf',
    download: true,
  },
  {
    id: 3,
    title: 'Good Moral Certificate',
    category: 'Requirement',
    desc: 'Certificate issued by the school attesting to the student’s good moral character.',
    date: 'Mar 13, 2026',
    url: '/docs/Ferrer, Javez Isaq B_Good Moral Cert_.pdf',
    download: true,
  },
  {
    id: 4,
    title: 'Consent Form',
    category: 'Requirement',
    desc: 'Signed parental consent form for OJT participation.',
    date: 'Mar 17, 2026',
    url: '/docs/Ferrer, Javez Isaq B._Consent Form.pdf',
    download: true,
  },
  {
    id: 5,
    title: 'Acceptance Letter',
    category: 'Requirement',
    desc: 'Letter of acceptance from the host company for OJT placement.',
    date: 'February 23, 2026',
    url: '/docs/Ferrer, Javez Isaq B_Acceptance Letter_XOO.pdf',
    download: true,
  },
  {
    id: 6,
    title: 'Training Partner Sheet',
    category: 'Requirement',
    desc: 'Form listing the details of the training partner (company) for OJT.',
    date: 'Mar 13, 2026',
    url: '/docs/Ferrer, Javez Isaq B._TRAINING PARTNER SHEET.pdf',
    download: true,
  },
  {
    id: 7,
    title: 'Student Information Sheet',
    category: 'Requirement',
    desc: 'Form listing the details of the student for OJT.',
    date: 'Mar 13, 2026',
    url: '/docs/Ferrer, Javez Isaq B._STUDENT-INFORMATION-SHEET.pdf',
    download: true,
  },
  {
    id: 8,
    title: 'DTR / Daily Time Record',
    category: 'Requirement',
    desc: 'Record of student’s daily attendance and hours during OJT.',
    date: 'Mar 13, 2026',
    url: 'https://drive.google.com/drive/folders/1q0gqGV_ooey54ZMvaS94B-QzWFqqk8eG?usp=sharing',
    download: false,
  },
];

// Maps category labels to accent colors
const CATEGORY_COLOR = {
  Official:      { bg: 'rgba(247,37,133,0.12)',  border: 'rgba(247,37,133,0.3)',  text: '#f72585' },
  Requirement:   { bg: 'rgba(180,74,247,0.12)',  border: 'rgba(180,74,247,0.3)',  text: '#b44af7' },
  Certificate:   { bg: 'rgba(0,229,255,0.10)',   border: 'rgba(0,229,255,0.28)',  text: '#00e5ff' },
  Report:        { bg: 'rgba(50,215,75,0.10)',   border: 'rgba(50,215,75,0.28)',  text: '#32d74b' },
};

function CategoryBadge({ category }) {
  const style = CATEGORY_COLOR[category] ?? CATEGORY_COLOR['Requirement'];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase"
      style={{ backgroundColor: style.bg, border: `1px solid ${style.border}`, color: style.text }}
    >
      {category}
    </span>
  );
}

function DocCard({ doc, index }) {
  const accentColor = (CATEGORY_COLOR[doc.category] ?? CATEGORY_COLOR['Requirement']).text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
      className="group relative rounded-2xl flex flex-col overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
        style={{ background: accentColor, opacity: 0.5 }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 30px ${accentColor}08, 0 0 0 1px ${accentColor}18` }}
      />

      <div className="p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${accentColor}14`, border: `1px solid ${accentColor}25` }}
          >
            <FileText size={17} style={{ color: accentColor }} />
          </div>
          <CategoryBadge category={doc.category} />
        </div>

        {/* Title + desc */}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-[15px] leading-snug tracking-tight mb-1.5 group-hover:text-white transition-colors">
            {doc.title}
          </h3>
          <p className="text-[#404040] text-[12px] leading-relaxed">{doc.desc}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
          <span className="font-mono text-[10px] text-[#2a2a2a] tracking-[0.2em]">{doc.date}</span>
          <div className="flex items-center gap-2">
            {doc.download && (
              <a
                href={doc.url}
                download
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-250"
                style={{
                  color: '#fff',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; 
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(255,255,255,0.2)'; 
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; 
                  e.currentTarget.style.boxShadow = 'none'; 
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)';
                }}
              >
                <Download size={10} />
                Save
              </a>
            )}
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-250"
              style={{
                color: accentColor,
                background: `${accentColor}10`,
                border: `1px solid ${accentColor}28`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${accentColor}1c`; e.currentTarget.style.boxShadow = `0 0 16px ${accentColor}20`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = `${accentColor}10`; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Eye size={10} />
              View
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Documents() {
  return (
    <section id="documents" className="relative py-32 px-6 overflow-hidden">
      {/* Section watermark */}
      <span
        className="absolute top-12 right-8 font-black text-[clamp(5rem,14vw,11rem)] leading-none select-none pointer-events-none"
        style={{
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.03)',
        }}
      >
        06
      </span>

      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-4 mb-5"
        >
          <span className="font-mono text-[10px] tracking-[0.35em] text-[#f72585] uppercase">
            Requirements
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
            Documents &amp;
            <br />
            <span style={{ color: '#f72585' }}>Requirements.</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
          className="text-[#3a3a3a] text-base leading-relaxed max-w-xl mb-16 flex items-center gap-3"
        >
          <FolderOpen size={14} className="text-[#f72585] shrink-0" />
          Official documents and requirements submitted as part of the OJT program.
        </motion.p>

        {/* Document grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, i) => (
            <DocCard key={doc.id} doc={doc} index={i} />
          ))}
        </div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-mono text-[9px] tracking-[0.4em] text-[#1e1e1e] uppercase text-center mt-12"
        >
          All files are PDF format · Click VIEW to open in browser
        </motion.p>
      </div>
    </section>
  );
}
