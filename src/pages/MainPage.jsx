import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from '../components/IntroScreen';
import CustomCursor from '../components/CustomCursor';
import StarField from '../components/StarField';
import PersonalPanel from '../components/PersonalPanel';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Languages from '../components/Languages';
import Downloads from '../components/Downloads';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import KonamiEasterEgg from '../components/KonamiEasterEgg';

const EASE = [0.22, 1, 0.36, 1];

// Module-level flag: resets on hard refresh (full JS re-evaluation) but
// survives SPA back-navigation (module stays in memory).
let _introPlayed = false;

export default function MainPage() {
  const [showIntro, setShowIntro] = useState(!_introPlayed);

  useEffect(() => {
    document.title = 'Your Name — Portfolio';
  }, []);

  return (
    <motion.div
      className="bg-black min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Delay matches wipe-out timing (~0.43s) so content appears as the bar exits
      transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
    >
      <ScrollProgress />
      <CustomCursor />
      <StarField />
      <PersonalPanel />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Languages />
      <Marquee reverse dim />
      <Projects />
      <Experience />
      <Marquee />
      <Downloads />
      <Contact />
      <Marquee reverse dim />
      <Footer />

      <KonamiEasterEgg />

      <AnimatePresence>
        {showIntro && (
          <IntroScreen
            key="intro"
            onEnter={() => {
              _introPlayed = true;
              setShowIntro(false);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
