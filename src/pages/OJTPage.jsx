import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, ClipboardList, PlayCircle, Download, Sparkles } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import StarField from '../components/StarField';
import Documents from '../components/Documents';
import WeeklyReports from '../components/WeeklyReports';

const EASE = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────────────────
//  OJT ACTIVITIES DATA
//  Add your activities here. Each activity can be:
//  - type: 'video' (YouTube) or 'pdf'
//  - For videos: provide videoId (11-char YouTube ID)
//  - For PDFs: provide pdfUrl (link to PDF file)
//  - category: 'coding', 'design', 'documentation', 'presentation', 'research'
// ─────────────────────────────────────────────────────────
const OJT_ACTIVITIES = [
  {
    id: 1,
    title: 'Work Accomplishment Report Video - Weeks 1-4',
    description: 'Overview of modern web technologies and frameworks',
    type: 'video',
    videoId: 'YOUR_VIDEO_ID_1', // Replace with actual YouTube video ID
    date: '2026-03-21',
    tags: ['Weeks 1-4', 'Work Overview'],
    category: 'documentation', // coding, design, documentation, presentation, research
  },
  {
    id: 2,
    title: 'Lesson 2: Learning Exercise Work Ethics and Behaviors',
    description: 'Key work ethics and behaviors for success in a professional environment and what to do if encountering sexual harrassment in the workplace.',
    type: 'pdf',
    pdfUrl: '/ojtActivities/Lesson 2 - Learning Exercise.pdf', // Replace with actual PDF path
    date: '2026-03-11',
    tags: ['Lesson 2', 'Work Ethics, Behavior, and Laws'],
    category: 'written_activity',
  },
  {
    id: 3,
    title: 'Lesson 3: Learning Exercise About the Company and the Environment',
    description: 'Overview of the company, its culture, and the work environment.',
    type: 'pdf',
    pdfUrl: '/ojtActivities/Lesson 3 - Learning Exercise.pdf',
    date: '2026-03-12',
    tags: ['Lesson 3', 'Company Overview'],
    category: 'written_activity',
  },
  // Add more activities as needed
];

// Category color mapping
const CATEGORY_COLORS = {
  coding: { primary: '#f72585', secondary: '#b44af7', name: 'Coding' },
  design: { primary: '#4cc9f0', secondary: '#4361ee', name: 'Design' },
  documentation: { primary: '#06ffa5', secondary: '#00d9ff', name: 'Documentation' },
  presentation: { primary: '#ffb703', secondary: '#fb8500', name: 'Presentation' },
  research: { primary: '#90e0ef', secondary: '#48cae4', name: 'Research' },
  written_activity: { primary: '#ff6b6b', secondary: '#ffa502', name: 'Written Activity' },
};

const VALID_YT_ID = /^[A-Za-z0-9_-]{11}$/;

function ActivitiesHero() {
  const [filter, setFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 items initially
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);
  const y3 = useTransform(scrollY, [0, 500], [0, -40]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  const filters = [
    { id: 'all', label: 'All Activities', icon: Sparkles },
    { id: 'video', label: 'Videos', icon: PlayCircle },
    { id: 'pdf', label: 'Documents', icon: FileText },
  ];

  const filteredActivities = filter === 'all'
    ? OJT_ACTIVITIES
    : OJT_ACTIVITIES.filter(activity => activity.type === filter);

  const visibleActivities = filteredActivities.slice(0, visibleCount);
  const hasMore = visibleCount < filteredActivities.length;

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(6);
  }, [filter]);

  // Get bento grid layout positions
  const getBentoLayout = () => {
    const layouts = [
      { span: 'md:col-span-2 md:row-span-2', size: 'large' }, // Featured
      { span: 'md:col-span-1', size: 'normal' },
      { span: 'md:col-span-1', size: 'normal' },
      { span: 'md:col-span-1', size: 'normal' },
      { span: 'md:col-span-2', size: 'wide' },
      { span: 'md:col-span-1', size: 'normal' },
    ];
    return layouts;
  };

  const bentoLayout = getBentoLayout();

  return (
    <section
      id="activities"
      className="relative pt-32 pb-24 px-6 overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      {/* Multi-layer parallax backgrounds */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-20 left-[10%] w-[700px] h-[700px] rounded-full pointer-events-none blur-3xl"
        animate={{
          background: [
            'radial-gradient(circle, rgba(247,37,133,0.12) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(180,74,247,0.12) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(247,37,133,0.12) 0%, transparent 70%)',
          ],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-60 right-[15%] w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl"
        animate={{
          background: [
            'radial-gradient(circle, rgba(180,74,247,0.1) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(247,37,133,0.1) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(180,74,247,0.1) 0%, transparent 70%)',
          ],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#f72585] rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative">
        {/* Hero Header with split animation */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(247,37,133,0.08), rgba(180,74,247,0.08))',
              border: '1px solid rgba(247,37,133,0.2)',
              boxShadow: '0 0 40px rgba(247,37,133,0.15), 0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={16} className="text-[#f72585]" />
            </motion.div>
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#f72585] uppercase font-semibold">
              Professor Assigned Tasks
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ y: '100%', rotateX: 90 }}
                  animate={{ y: '0%', rotateX: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                  className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold text-white tracking-tighter leading-[0.95]"
                  style={{
                    textShadow: '0 0 60px rgba(247,37,133,0.3)',
                  }}
                >
                  Training
                  <br />
                  <span style={{ color: '#f72585' }}>Activities</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="text-[#888] text-base leading-relaxed max-w-lg"
              >
                Immersive learning experiences through video tutorials, comprehensive documentation,
                and hands-on assignments throughout my professional journey.
              </motion.p>
            </div>

            {/* Filter Pills with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              className="flex flex-wrap gap-3 md:justify-end"
            >
              {filters.map((f, idx) => {
                const Icon = f.icon;
                const isActive = filter === f.id;
                return (
                  <motion.button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.1, ease: EASE }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 overflow-hidden"
                    style={
                      isActive
                        ? {
                            background: 'linear-gradient(135deg, rgba(247,37,133,0.15), rgba(180,74,247,0.15))',
                            border: '1px solid rgba(247,37,133,0.4)',
                            boxShadow: '0 0 40px rgba(247,37,133,0.2), 0 8px 24px rgba(0,0,0,0.3), inset 0 0 20px rgba(247,37,133,0.08)',
                            color: 'white',
                          }
                        : {
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#666',
                          }
                    }
                  >
                    {/* Animated background on hover */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(135deg, rgba(247,37,133,0.05), rgba(180,74,247,0.05))',
                        }}
                      />
                    )}

                    {/* Animated border */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(247,37,133,0.5), transparent)',
                        }}
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    )}

                    <span className="relative flex items-center gap-2">
                      <Icon size={14} />
                      {f.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 md:gap-6"
        >
          {visibleActivities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={index}
              bentoSpan={bentoLayout[index % bentoLayout.length]?.span}
              size={bentoLayout[index % bentoLayout.length]?.size}
              mousePosition={mousePosition}
            />
          ))}
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={() => setVisibleCount(prev => prev + 6)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(247,37,133,0.15), rgba(180,74,247,0.15))',
                border: '1px solid rgba(247,37,133,0.3)',
                color: 'white',
                boxShadow: '0 0 30px rgba(247,37,133,0.15)',
              }}
            >
              Load More Activities
              <motion.span
                className="ml-2 inline-block"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </motion.button>
          </motion.div>
        )}

        {filteredActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FileText size={64} className="text-[#333] mx-auto mb-4" />
            </motion.div>
            <p className="text-[#666] text-lg">No activities in this category yet</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ActivityCard({ activity, index, bentoSpan = '', size = 'normal', mousePosition }) {
  const [isHovered, setIsHovered] = useState(false);
  const [cardRef, setCardRef] = useState(null);
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 });

  const isVideo = activity.type === 'video';
  const isValidVideo = isVideo && VALID_YT_ID.test(activity.videoId);
  const thumbnailUrl = isValidVideo
    ? `https://img.youtube.com/vi/${activity.videoId}/maxresdefault.jpg`
    : null;

  const isFeatured = size === 'large';
  const isWide = size === 'wide';

  // Get category colors
  const categoryColor = CATEGORY_COLORS[activity.category] || CATEGORY_COLORS.coding;
  const primaryColor = categoryColor.primary;
  const secondaryColor = categoryColor.secondary;

  // Calculate 3D transform based on mouse position
  const calculate3DTransform = () => {
    if (!isHovered || !cardRef) return {};
    const rect = cardRef.getBoundingClientRect();
    const cardX = localMouse.x - rect.width / 2;
    const cardY = localMouse.y - rect.height / 2;
    const rotateX = -(cardY / rect.height) * 10;
    const rotateY = (cardX / rect.width) * 10;

    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
    };
  };

  // Determine entry animation direction
  const getEntryAnimation = () => {
    const directions = [
      { x: -100, y: 0, rotate: -10 },
      { x: 100, y: 0, rotate: 10 },
      { x: 0, y: 100, rotate: 5 },
      { x: 0, y: -100, rotate: -5 },
    ];
    return directions[index % directions.length];
  };

  const entryAnim = getEntryAnimation();

  return (
    <motion.div
      ref={setCardRef}
      layout
      initial={{
        opacity: 0,
        x: entryAnim.x,
        y: entryAnim.y,
        rotate: entryAnim.rotate,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: EASE,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={(e) => {
        if (cardRef) {
          const rect = cardRef.getBoundingClientRect();
          setLocalMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
      }}
      className={`group relative rounded-3xl overflow-hidden ${bentoSpan}`}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(30px)',
        transformStyle: 'preserve-3d',
        ...(isHovered ? calculate3DTransform() : {}),
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease',
        boxShadow: isHovered
          ? '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(247,37,133,0.2)'
          : '0 10px 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${primaryColor}99, transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
        animate={isHovered ? {
          rotate: [0, 360],
        } : {}}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
      />

      {/* Inner glow effect */}
      <motion.div
        className="absolute inset-[1px] rounded-3xl pointer-events-none"
        style={{
          background: '#0a0a0a',
          opacity: 1,
        }}
      />

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}1f, transparent 60%)`,
        }}
      />

      {/* Spotlight effect following cursor */}
      {isHovered && (
        <motion.div
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${primaryColor}26, transparent 70%)`,
            left: localMouse.x - 128,
            top: localMouse.y - 128,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Corner accents with animation */}
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} pointer-events-none z-10`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0.4,
            scale: isHovered ? 1.3 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d={i === 0 ? "M0,5 L0,0 L5,0" :
                 i === 1 ? "M20,0 L15,0 M20,0 L20,5" :
                 i === 2 ? "M0,20 L0,15 M0,20 L5,20" :
                 "M20,20 L20,15 M20,20 L15,20"}
              stroke={primaryColor}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}

      <div className="relative h-full flex flex-col" style={{ transform: 'translateZ(0)' }}>
        {/* Thumbnail/Preview with parallax */}
        <motion.div
          className={`relative overflow-hidden cursor-pointer ${
            isFeatured ? 'aspect-video' : isWide ? 'aspect-[21/9]' : 'aspect-video'
          }`}
          onClick={(e) => {
            if (isVideo) {
              window.open(`https://youtube.com/watch?v=${activity.videoId}`, '_blank', 'noopener,noreferrer');
            } else if (activity.pdfUrl) {
              window.open(activity.pdfUrl, '_blank', 'noopener,noreferrer');
            }
          }}
          style={{
            transform: isHovered ? `translateZ(30px) scale(1.05)` : 'translateZ(0)',
            transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {isVideo && thumbnailUrl ? (
            <>
              <motion.img
                src={thumbnailUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.7, ease: EASE }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
                }}
              />

              {/* Play button with pulse effect */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0.8 }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {/* Pulse rings */}
                  {isHovered && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `${primaryColor}4d`,
                          filter: 'blur(10px)',
                        }}
                        animate={{
                          scale: [1, 2, 2],
                          opacity: [0.8, 0, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `${primaryColor}4d`,
                          filter: 'blur(10px)',
                        }}
                        animate={{
                          scale: [1, 2, 2],
                          opacity: [0.8, 0, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: 0.75,
                        }}
                      />
                    </>
                  )}

                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}f2, ${secondaryColor}f2)`,
                      boxShadow: `0 0 60px ${primaryColor}99, 0 10px 40px rgba(0,0,0,0.5)`,
                    }}
                  >
                    <PlayCircle size={36} className="text-white" />
                  </div>
                </motion.div>
              </motion.div>
            </>
          ) : !isVideo && activity.pdfUrl ? (
            <div className="w-full h-full relative" style={{ background: '#f8f9fa' }}>
              <iframe
                src={`${activity.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="w-full h-[150%] pointer-events-none relative z-0"
                style={{ border: 'none', transform: 'scale(0.8)', transformOrigin: 'top center' }}
                title={activity.title}
                scrolling="no"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                }}
              />
              
              {/* Overlay icon with pulse effect */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0.8 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}cc, ${secondaryColor}cc)`,
                    boxShadow: `0 0 40px ${primaryColor}80, 0 10px 20px rgba(0,0,0,0.4)`,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <FileText size={28} className="text-white" />
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}1f, ${secondaryColor}14)`,
              }}
            >
              {/* Animated grid pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(${primaryColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {isVideo ? (
                  <PlayCircle size={64} style={{ color: primaryColor, opacity: 0.4 }} />
                ) : (
                  <FileText size={64} style={{ color: primaryColor, opacity: 0.4 }} />
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Type badge with glitch effect */}
          <motion.div
            className="absolute top-4 right-4 px-4 py-2 rounded-xl backdrop-blur-xl text-[11px] font-mono tracking-widest uppercase font-bold"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}e6, ${secondaryColor}b3)`,
              border: `1px solid ${primaryColor}cc`,
              color: 'white',
              boxShadow: `0 0 20px ${primaryColor}80`,
            }}
            animate={isHovered ? {
              textShadow: [
                '0 0 0px rgba(255,255,255,0)',
                `2px 0 10px ${primaryColor}cc, -2px 0 10px ${secondaryColor}cc`,
                '0 0 0px rgba(255,255,255,0)',
              ],
            } : {}}
            transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
          >
            {isVideo ? 'VIDEO' : 'PDF'}
          </motion.div>
        </motion.div>

        {/* Content with enhanced styling */}
        <motion.div
          className={`p-6 flex-1 flex flex-col ${isFeatured ? 'md:p-8' : ''}`}
          style={{
            transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)',
            transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Category badge */}
            <motion.span
              className="px-3 py-1 rounded-lg text-[10px] font-mono tracking-wider uppercase font-bold"
              style={{
                background: `${primaryColor}26`,
                color: primaryColor,
                border: `1px solid ${primaryColor}33`,
              }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {categoryColor.name}
            </motion.span>

            {activity.tags?.map((tag, i) => (
              <motion.span
                key={i}
                className="px-3 py-1 rounded-lg text-[10px] font-mono tracking-wider uppercase font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#888',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Title with gradient */}
          <motion.h3
            className={`text-white font-bold mb-3 leading-tight tracking-tight ${
              isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'
            }`}
            style={{
              backgroundImage: isHovered
                ? `linear-gradient(135deg, #ffffff, ${primaryColor}, ${secondaryColor})`
                : 'linear-gradient(135deg, #ffffff, #ffffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: isHovered ? 'transparent' : 'white',
              transition: 'all 0.5s ease',
            }}
          >
            {activity.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className={`text-[#888] leading-relaxed mb-auto ${
              isFeatured ? 'text-base' : 'text-sm'
            }`}
            animate={{
              color: isHovered ? '#aaa' : '#888',
            }}
          >
            {activity.description}
          </motion.p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
            <motion.span
              className="text-[#555] text-xs font-mono font-semibold tracking-wider"
              animate={{
                color: isHovered ? primaryColor : '#555',
              }}
            >
              {new Date(activity.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </motion.span>

            {isVideo ? (
              <motion.button
                onClick={() => window.open(`https://youtube.com/watch?v=${activity.videoId}`, '_blank', 'noopener,noreferrer')}
                whileHover={{ scale: 1.08, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
                style={{
                  color: 'white',
                  background: `linear-gradient(135deg, ${primaryColor}33, ${secondaryColor}26)`,
                  border: `1px solid ${primaryColor}4d`,
                  boxShadow: isHovered ? `0 0 30px ${primaryColor}4d` : 'none',
                }}
              >
                <PlayCircle size={14} />
                Watch
              </motion.button>
            ) : (
              <motion.a
                href={activity.pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
                style={{
                  color: 'white',
                  background: `linear-gradient(135deg, ${primaryColor}33, ${secondaryColor}26)`,
                  border: `1px solid ${primaryColor}4d`,
                  boxShadow: isHovered ? `0 0 30px ${primaryColor}4d` : 'none',
                  textDecoration: 'none'
                }}
              >
                <Download size={14} />
                Download
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function OJTNavbar() {
  const [activeSection, setActiveSection] = useState('activities');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['activities', 'resume-video', 'documents', 'reports'];
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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        </Link>

        {/* Within-page anchors */}
        <div className="flex items-center gap-6">
          <a
            href="#activities"
            className={`flex items-center gap-1.5 transition-colors duration-200 text-sm font-medium ${
              activeSection === 'activities' ? 'text-[#f72585]' : 'text-[#666] hover:text-white'
            }`}
          >
            <Sparkles size={13} />
            Activities
          </a>
          <a
            href="#resume-video"
            className={`flex items-center gap-1.5 transition-colors duration-200 text-sm font-medium ${
              activeSection === 'resume-video' ? 'text-[#f72585]' : 'text-[#666] hover:text-white'
            }`}
          >
            <PlayCircle size={13} />
            Video
          </a>
          <a
            href="#documents"
            className={`flex items-center gap-1.5 transition-colors duration-200 text-sm font-medium ${
              activeSection === 'documents' ? 'text-[#f72585]' : 'text-[#666] hover:text-white'
            }`}
          >
            <FileText size={13} />
            Docs
          </a>
          <a
            href="#reports"
            className={`flex items-center gap-1.5 transition-colors duration-200 text-sm font-medium ${
              activeSection === 'reports' ? 'text-[#f72585]' : 'text-[#666] hover:text-white'
            }`}
          >
            <ClipboardList size={13} />
            Reports
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
    document.title = "Isaq Ferrer's Cool Portfolio Website";
    return () => { document.title = "Isaq Ferrer's Cool Portfolio Website"; };
  }, []);

  return (
    <motion.div
      className="bg-black min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
    >
      <CustomCursor />
      <StarField />
      <OJTNavbar />

      {/* Offset for fixed navbar */}
      <div className="pt-16">
        <ActivitiesHero />
        <SectionBridge />
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
