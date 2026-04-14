import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, FolderOpen, User, Zap, Briefcase, Clock, Download, Mail } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',      href: '#about',      icon: User },
  { label: 'Skills',     href: '#skills',     icon: Zap },
  { label: 'Projects',   href: '#projects',   icon: Briefcase },
  { label: 'Experience', href: '#experience', icon: Clock },
  { label: 'Downloads',  href: '#downloads',  icon: Download },
  { label: 'Contact',    href: '#contact',    icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'experience', 'downloads', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/75 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 select-none">
          <img
            src="/carlogo.jpg"
            alt="Logo"
            width={28}
            height={28}
            className="rounded-lg"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="text-white font-semibold text-lg tracking-tight">
            IsaqF<span className="text-[#f72585]">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => {
            const sectionId = href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={href}
                href={href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-[#f72585]' : 'text-[#86868b] hover:text-white'
                }`}
              >
                <Icon size={13} />
                {label}
              </a>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/ojt"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              color: '#f72585',
              background: 'rgba(247,37,133,0.08)',
              border: '1px solid rgba(247,37,133,0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(247,37,133,0.16)';
              e.currentTarget.style.boxShadow = '0 0 18px rgba(247,37,133,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(247,37,133,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FolderOpen size={13} />
            OJT Docs
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 border border-white/15 text-white text-sm font-medium hover:bg-white/20 hover:border-white/25 transition-all duration-300 backdrop-blur-sm"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href, icon: Icon }, i) => {
                const sectionId = href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 transition-colors py-3 text-lg font-medium border-b border-white/[0.05] ${
                      isActive ? 'text-[#f72585]' : 'text-[#86868b] hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </motion.a>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07 }}
                className="pt-4"
              >
                <Link
                  to="/ojt"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                  style={{
                    color: '#f72585',
                    background: 'rgba(247,37,133,0.08)',
                    border: '1px solid rgba(247,37,133,0.25)',
                  }}
                >
                  <FolderOpen size={13} />
                  OJT Docs
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
