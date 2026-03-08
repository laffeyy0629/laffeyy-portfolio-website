import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const experiences = [
  {
    type: 'work',
    role: 'Mobile Application and QA Intern',
    company: 'Xtreme Offshore Outsourcing Inc.',
    period: '2026 – Present',
    description:
      'Currently an intern at XOO, where I am gaining hands-on experience in mobile app development and quality assurance. Currently I debug and add requested changes and features to their project, I also QA and do usability testing on the project I am in.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Gitlabs'],
  },
  {
    type: 'education',
    role: 'Bachelor of Science in Information Technology',
    company: 'University of Technology',
    period: '2022 - Present',
    description:
      'Currently pursuing a bachelor\'s degree in Information Technology at the University of Technology and on track to graduate this October 2026, I also am on track to receiving Magna Cum Laude honors.',
    tags: ['Software Development', 'Web Development', 'Database Management/Creation', 'UI/UX Design', 'Data Structures', 'Multimedia Production'],
  },
   {
    type: 'work',
    role: 'I.T. Support Intern',
    company: 'Christian Grace School of Cavite',
    period: '2022 – 2023',
    description:
      'I mainly fix and build computers to be used by teachers during the pandemic, I also kept inventory of equipment and items via the use of Google Sheets. During this time, I also handled equipment during events such as cameras, lights, etc.',
    tags: ['Computer Hardware', 'Google Sheets', 'Inventory Management'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-36 px-6 bg-[#080808]">
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute -top-4 right-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em] text-white/[0.018]"
        style={{ fontSize: 'clamp(9rem, 24vw, 20rem)' }}
      >
        05
      </div>
      <div className="max-w-3xl mx-auto">
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
            <span className="text-[#f72585] text-[10px] font-semibold tracking-[0.28em] uppercase">Experience</span>
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold text-white tracking-tight">
            My journey.
          </h2>
          <p className="mt-5 text-[#777] text-lg max-w-xl mx-auto leading-relaxed">
            Where I've been, what I've built, and how I've grown as a developer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical track */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-white/15 via-white/8 to-transparent" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: EASE }}
                className="relative pl-[60px]"
              >
                {/* Icon bubble */}
                <div className="absolute left-0 top-4 w-12 h-12 rounded-2xl glass-card flex items-center justify-center z-10">
                  {exp.type === 'work' ? (
                    <Briefcase size={17} className="text-[#f72585]" />
                  ) : (
                    <GraduationCap size={17} className="text-purple-400" />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="glass-card rounded-2xl p-6 transition-colors duration-300"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-base">{exp.role}</h3>
                      <p className="text-[#86868b] text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-[11px] text-[#777] font-medium bg-white/[0.05] px-3 py-1 rounded-full border border-white/[0.08] whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[#777] text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-[#777] px-2.5 py-1 bg-white/[0.04] rounded-full border border-white/[0.07]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
