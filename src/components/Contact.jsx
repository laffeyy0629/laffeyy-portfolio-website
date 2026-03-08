import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

const EASE = [0.22, 1, 0.36, 1];

const socials = [
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com',
    color: '#e2e8f0',
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com',
    color: '#60a5fa',
  },
  {
    label: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com',
    color: '#38bdf8',
  },
];

export default function Contact() {
  const magSayHello = useMagnetic(0.36);

  return (
    <section id="contact" className="relative overflow-hidden py-36 px-6 bg-[#080808]">
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute -top-4 right-0 select-none pointer-events-none font-black leading-none tracking-[-0.04em] text-white/[0.018]"
        style={{ fontSize: 'clamp(9rem, 24vw, 20rem)' }}
      >
        05
      </div>
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(247,37,133,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-mono text-[#222] text-[10px] tracking-[0.3em]">// 05</span>
            <div className="w-6 h-px bg-white/[0.08]" />
            <span className="text-[#f72585] text-[10px] font-semibold tracking-[0.28em] uppercase">Contact</span>
          </div>
          <h2 className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold text-white tracking-tight leading-[0.95] mb-8">
            Let's build
            <br />
            <span className="text-gradient-blue">something great.</span>
          </h2>
          <p className="text-[#555] text-xl mb-14 max-w-lg mx-auto leading-relaxed">
            Have a project in mind, a question, or just want to say hello?
            My inbox is always open — I'll respond promptly.
          </p>

          {/* Primary email button */}
          <motion.a
            ref={magSayHello.ref}
            href="mailto:hello@yourname.com"
            style={magSayHello.style}
            onMouseMove={magSayHello.onMouseMove}
            onMouseLeave={magSayHello.onMouseLeave}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#f72585] text-white rounded-full font-semibold text-base hover:bg-[#ff4d9b] transition-colors duration-300 shadow-xl shadow-[#f72585]/30 mb-14"
          >
            <Mail size={19} />
            Say Hello
            <ArrowUpRight size={17} strokeWidth={2.5} />
          </motion.a>

          {/* Social links */}
          <div className="flex items-center justify-center flex-wrap gap-3">
            {socials.map(({ label, icon: Icon, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: EASE }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-[#86868b] hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                <Icon size={15} />
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
