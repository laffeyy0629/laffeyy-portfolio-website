import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const experiences = [
  {
    type: 'work',
    role: 'Senior Frontend Developer',
    company: 'Tech Startup Inc.',
    period: '2023 – Present',
    description:
      'Led frontend development for a SaaS product serving 50k+ users. Architected the component library, improved core web vitals by 40%, and mentored a team of three junior developers.',
    tags: ['React', 'TypeScript', 'GraphQL', 'Storybook'],
  },
  {
    type: 'work',
    role: 'Full Stack Developer',
    company: 'Digital Agency Co.',
    period: '2021 – 2023',
    description:
      'Built and maintained 10+ client web applications across e-commerce, SaaS, and media sectors. Consistently delivered on schedule while maintaining high code quality and test coverage.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
  },
  {
    type: 'work',
    role: 'Junior Web Developer',
    company: 'Web Solutions Ltd.',
    period: '2020 – 2021',
    description:
      'Started my professional journey building responsive landing pages and integrating third-party APIs. Gained experience in agile workflows and client communication.',
    tags: ['JavaScript', 'React', 'CSS', 'REST APIs'],
  },
  {
    type: 'education',
    role: 'B.Sc. Computer Science',
    company: 'University of Technology',
    period: '2016 – 2020',
    description:
      'Graduated with honours. Specialised in software engineering, algorithms, and human-computer interaction. Senior thesis focused on ML-driven UI personalisation.',
    tags: ['Algorithms', 'Machine Learning', 'Software Engineering'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-36 px-6 bg-black">
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute -top-4 right-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em] text-white/[0.018]"
        style={{ fontSize: 'clamp(9rem, 24vw, 20rem)' }}
      >
        04
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
          <p className="mt-5 text-[#555] text-lg max-w-xl mx-auto leading-relaxed">
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
                    <span className="text-[11px] text-[#555] font-medium bg-white/[0.05] px-3 py-1 rounded-full border border-white/[0.08] whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[#555] text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-[#666] px-2.5 py-1 bg-white/[0.04] rounded-full border border-white/[0.07]"
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
