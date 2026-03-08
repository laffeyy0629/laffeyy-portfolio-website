import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, BookOpen, Tv, Music } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const hobbies = [
  {
    id: 'gaming',
    icon: Gamepad2,
    title: 'Gaming',
    color: '#f72585',
    bg: '#f725850d',
    border: '#f7258522',
    desc: 'From open-world RPGs to precision indie platformers — gaming is how I experience stories and worlds that only exist in code.',
    coverAspect: 'aspect-[2/3]',
    items: [
      { title: 'Elden Ring',         sub: 'Action RPG · FromSoftware',      img: 'https://picsum.photos/seed/gm_er/200/300' },
      { title: 'Hollow Knight',      sub: 'Metroidvania · Team Cherry',     img: 'https://picsum.photos/seed/gm_hk/200/300' },
      { title: "Baldur's Gate 3",    sub: 'RPG · Larian Studios',           img: 'https://picsum.photos/seed/gm_bg/200/300' },
      { title: 'Celeste',            sub: 'Platformer · Maddy Makes Games', img: 'https://picsum.photos/seed/gm_cl/200/300' },
    ],
  },
  {
    id: 'reading',
    icon: BookOpen,
    title: 'Reading',
    color: '#a15aff',
    bg: '#a15aff0d',
    border: '#a15aff22',
    desc: 'Sci-fi, philosophy, and software craft. Books are how I think slowly and deeply about hard problems.',
    coverAspect: 'aspect-[2/3]',
    items: [
      { title: 'Dune',                    sub: 'Sci-Fi · Frank Herbert',    img: 'https://picsum.photos/seed/bk_du/200/300' },
      { title: 'Meditations',             sub: 'Philosophy · M. Aurelius', img: 'https://picsum.photos/seed/bk_me/200/300' },
      { title: 'Pragmatic Programmer',    sub: 'Dev Craft · Hunt & Thomas', img: 'https://picsum.photos/seed/bk_pp/200/300' },
      { title: 'Sapiens',                 sub: 'History · Harari',          img: 'https://picsum.photos/seed/bk_sa/200/300' },
    ],
  },
  {
    id: 'watching',
    icon: Tv,
    title: 'Watching',
    color: '#ff375f',
    bg: '#ff375f0d',
    border: '#ff375f22',
    desc: 'Anime, thoughtful cinema, and nature documentaries. A great story well told — whatever the medium.',
    coverAspect: 'aspect-[2/3]',
    items: [
      { title: 'Steins;Gate',      sub: 'Anime · White Fox',    img: 'https://picsum.photos/seed/tv_sg/200/300' },
      { title: 'Spirited Away',    sub: 'Film · Studio Ghibli', img: 'https://picsum.photos/seed/tv_sa/200/300' },
      { title: 'Inception',        sub: 'Film · Nolan',         img: 'https://picsum.photos/seed/tv_in/200/300' },
      { title: 'Planet Earth II',  sub: 'Doc · BBC',            img: 'https://picsum.photos/seed/tv_pe/200/300' },
    ],
  },
  {
    id: 'music',
    icon: Music,
    title: 'Music',
    color: '#e8003d',
    bg: '#e8003d0d',
    border: '#e8003d22',
    desc: 'J-Rock that hits different — ONE OK ROCK\'s anthems, Zutomayo\'s chaotic genius, Yorushika\'s bittersweet poetry.',
    coverAspect: 'aspect-square',
    // ↓ Replace with your own Spotify playlist / artist / album embed URL
    spotifyUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS?utm_source=generator&theme=0',
    items: [
      { title: 'ONE OK ROCK', sub: 'J-Rock / Alternative', img: 'https://picsum.photos/seed/mu_oor/200/200' },
      { title: 'Zutomayo',    sub: 'J-Pop / Indie',        img: 'https://picsum.photos/seed/mu_ztm/200/200' },
      { title: 'Yorushika',   sub: 'J-Rock / Indie Pop',   img: 'https://picsum.photos/seed/mu_yrs/200/200' },
    ],
  },
];

// Replace src/title/subtitle values with your real photography
const photos = [
  { id: 1, src: 'https://picsum.photos/seed/pf1/700/1000', title: 'Golden Hour', sub: 'Tokyo, 2024' },
  { id: 2, src: 'https://picsum.photos/seed/pf2/700/500',  title: 'Urban Geometry', sub: 'Shinjuku Station' },
  { id: 3, src: 'https://picsum.photos/seed/pf3/700/600',  title: 'Still Life', sub: 'f/1.8 · ISO 200' },
  { id: 4, src: 'https://picsum.photos/seed/pf4/700/480',  title: 'Neon & Rain', sub: 'Shibuya, 2025' },
  { id: 5, src: 'https://picsum.photos/seed/pf5/700/900',  title: 'Solitude', sub: 'Kyoto Gardens' },
  { id: 6, src: 'https://picsum.photos/seed/pf6/700/520',  title: 'Concrete Layers', sub: 'Architecture series' },
  { id: 7, src: 'https://picsum.photos/seed/pf7/700/460',  title: 'Motion Blur', sub: '1/15s · f/8' },
  { id: 8, src: 'https://picsum.photos/seed/pf8/700/700',  title: 'Symmetry', sub: 'Osaka, 2025' },
  { id: 9, src: 'https://picsum.photos/seed/pf9/700/550',  title: 'Twilight', sub: 'Blue hour series' },
];

// ── Arcade / Gaming Card ─────────────────────────────────────────────────────
function GamingCard({ hobby, index }) {
  const { icon: Icon, title, desc, items, coverAspect } = hobby;
  const cyan = '#00e5ff';
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.38 + index * 0.08, ease: EASE }}
      className="rounded-2xl overflow-hidden flex flex-col cursor-default relative"
      style={{
        background: '#070a0a',
        border: `1px solid ${cyan}22`,
        boxShadow: `0 0 40px ${cyan}06`,
      }}
    >
      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.9) 2px, rgba(0,229,255,0.9) 3px)',
        }}
      />
      {/* Arcade header bar */}
      <div
        className="px-5 py-2.5 flex items-center justify-between shrink-0"
        style={{ borderBottom: `1px solid ${cyan}15`, background: `${cyan}07` }}
      >
        <span className="font-mono text-[9px] tracking-[0.32em] uppercase" style={{ color: cyan }}>
          [ GAME SELECT ]
        </span>
        <span className="font-mono text-[9px]" style={{ color: cyan, opacity: 0.5 }}>♥♥♥ P1</span>
      </div>
      {/* Body */}
      <div className="p-5 pb-3 relative z-20">
        <div className="flex items-center gap-3 mb-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${cyan}15`, border: `1px solid ${cyan}30` }}
          >
            <Icon size={15} style={{ color: cyan }} />
          </div>
          <h3 className="font-mono text-sm tracking-[0.1em] uppercase" style={{ color: cyan }}>
            {title}_
          </h3>
        </div>
        <p className="text-[#2e3a3a] text-[12px] leading-relaxed font-mono">{desc}</p>
      </div>
      {/* Thumbnail strip with per-image scanline */}
      <div className="px-4 pb-4 relative z-20">
        <p className="font-mono text-[8px] tracking-[0.3em] mb-2" style={{ color: cyan, opacity: 0.35 }}>
          &gt; LIBRARY //
        </p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {items.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="group/cover relative shrink-0 w-[80px] cursor-default"
            >
              <div className={`${coverAspect} overflow-hidden rounded relative`}
                style={{ border: `1px solid ${cyan}20` }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover/cover:scale-110 saturate-50 group-hover/cover:saturate-100"
                  loading="lazy"
                />
                {/* scanline on image */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)',
                  }}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,8,10,0.96) 0%, rgba(0,8,10,0.5) 55%, transparent 100%)' }}
                >
                  <p className="font-mono text-[9px] leading-tight line-clamp-2" style={{ color: cyan }}>{item.title}</p>
                  <p className="font-mono text-[7px] leading-tight mt-0.5 text-[#3a5a5a]">{item.sub}</p>
                </div>
                <div
                  className="absolute inset-0 rounded opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${cyan}80, 0 0 18px ${cyan}30` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Footer credits */}
      <div className="px-5 pb-4 relative z-20">
        <p className="font-mono text-[8px] tracking-[0.4em] text-center" style={{ color: cyan, opacity: 0.1 }}>
          ─── INSERT COIN TO CONTINUE ───
        </p>
      </div>
    </motion.div>
  );
}

// ── Manga / Reading Card ──────────────────────────────────────────────────────
function ReadingCard({ hobby, index }) {
  const { icon: Icon, title, desc, items, coverAspect } = hobby;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.38 + index * 0.08, ease: EASE }}
      className="rounded-2xl overflow-hidden flex flex-col cursor-default relative"
      style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.13)' }}
    >
      {/* Screentone dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
      />
      {/* Chapter header */}
      <div
        className="px-5 py-2.5 flex items-center justify-between shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}
      >
        <span className="font-mono text-[9px] tracking-[0.28em] text-white/25 uppercase">VOL.01 · CH.∞</span>
        <span className="font-mono text-[9px] text-white/12 tracking-widest">READ →</span>
      </div>
      {/* Body */}
      <div className="p-5 pb-3 relative z-10">
        <div className="flex items-center gap-3 mb-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            <Icon size={15} className="text-white/60" />
          </div>
          <h3 className="text-white font-bold text-sm tracking-tight">{title}</h3>
        </div>
        <p className="text-[#303030] text-[12px] leading-relaxed">{desc}</p>
      </div>
      {/* Manga panel 2×2 grid */}
      <div className="px-4 pb-5 relative z-10">
        <p className="font-mono text-[8px] tracking-[0.28em] text-white/10 uppercase mb-3">Reading List</p>
        <div className="grid grid-cols-4 gap-1.5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.07, rotate: i % 2 === 0 ? 1.2 : -1.2 }}
              transition={{ duration: 0.22 }}
              className="group/cover relative cursor-default"
            >
              <div
                className={`${coverAspect} overflow-hidden relative`}
                style={{ border: '2px solid rgba(255,255,255,0.18)' }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover/cover:grayscale-0 group-hover/cover:scale-110"
                  loading="lazy"
                />
                {/* Red accent square */}
                <div
                  className="absolute top-1 left-1 w-[7px] h-[7px] opacity-0 group-hover/cover:opacity-100 transition-opacity"
                  style={{ background: '#e8003d' }}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-1.5 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 70%)' }}
                >
                  <p className="text-white text-[8px] font-bold leading-tight line-clamp-2">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Sound effect watermark */}
        <p
          className="font-mono text-[9px] tracking-[0.5em] text-right mt-3 select-none"
          style={{ color: 'rgba(255,255,255,0.05)', fontStyle: 'italic' }}
        >FLIP THE PAGE</p>
      </div>
    </motion.div>
  );
}

// ── Anime / Watching Card ─────────────────────────────────────────────────────
function WatchingCard({ hobby, index }) {
  const { icon: Icon, title, desc, items, coverAspect } = hobby;
  const palette = ['#ff6b9d', '#c77dff', '#4cc9f0', '#f72585'];
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.38 + index * 0.08, ease: EASE }}
      className="rounded-2xl overflow-hidden flex flex-col cursor-default relative"
      style={{
        background: 'linear-gradient(145deg, #080814 0%, #0c0a18 100%)',
        border: '1px solid rgba(199,125,255,0.18)',
        boxShadow: '0 0 40px rgba(199,125,255,0.04)',
      }}
    >
      {/* Sparkle accents */}
      {[['top-3 right-7', '10px', 0.18], ['top-6 right-3', '8px', 0.12], ['bottom-14 right-5', '11px', 0.14]].map(
        ([pos, size, op], i) => (
          <span
            key={i}
            className={`absolute ${pos} pointer-events-none select-none text-[#c77dff]`}
            style={{ fontSize: size, opacity: op }}
          >
            ✦
          </span>
        )
      )}
      {/* Anime header */}
      <div
        className="px-5 py-2.5 flex items-center justify-between shrink-0"
        style={{ borderBottom: '1px solid rgba(199,125,255,0.09)', background: 'rgba(199,125,255,0.04)' }}
      >
        <span className="font-mono text-[9px] tracking-[0.28em] uppercase" style={{ color: '#c77dff', opacity: 0.45 }}>
          ◈ Now Streaming
        </span>
        <span className="font-mono text-[9px]" style={{ color: '#c77dff', opacity: 0.18 }}>
          {new Date().getFullYear()}
        </span>
      </div>
      {/* Body */}
      <div className="p-5 pb-3 relative z-10">
        <div className="flex items-center gap-3 mb-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(199,125,255,0.12)', border: '1px solid rgba(199,125,255,0.25)' }}
          >
            <Icon size={15} style={{ color: '#c77dff' }} />
          </div>
          <h3 className="text-white font-semibold text-sm tracking-tight">{title}</h3>
        </div>
        <p className="text-[#2a2535] text-[12px] leading-relaxed">{desc}</p>
      </div>
      {/* Thumbnail strip with character color bars */}
      <div className="px-4 pb-5 relative z-10">
        <p className="font-mono text-[8px] tracking-[0.28em] mb-2" style={{ color: '#c77dff', opacity: 0.22 }}>Favorites</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="group/cover relative shrink-0 w-[80px] rounded-xl overflow-hidden cursor-default"
            >
              <div className={`${coverAspect} overflow-hidden rounded-xl relative`}>
                {/* Character color bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] z-10"
                  style={{ background: palette[i % palette.length] }}
                />
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/cover:scale-110"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}
                >
                  <p className="text-white font-semibold text-[9px] leading-tight line-clamp-2">{item.title}</p>
                  <p className="font-mono text-[7px] leading-tight mt-0.5" style={{ color: palette[i % palette.length], opacity: 0.9 }}>
                    {item.sub}
                  </p>
                </div>
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${palette[i % palette.length]}55, 0 0 18px ${palette[i % palette.length]}20` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── J-Rock / Music Card ───────────────────────────────────────────────────────
function MusicCard({ hobby, index }) {
  const { icon: Icon, title, desc, items, coverAspect, spotifyUrl } = hobby;
  const red = '#e8003d';
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.38 + index * 0.08, ease: EASE }}
      className="rounded-2xl overflow-hidden flex flex-col cursor-default relative"
      style={{
        background: '#0a0505',
        border: `1px solid ${red}28`,
        boxShadow: `0 0 40px ${red}06`,
      }}
    >
      {/* Top accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${red}, transparent)` }}
      />
      {/* J-Rock header */}
      <div
        className="px-5 py-2.5 flex items-center justify-between shrink-0"
        style={{ borderBottom: `1px solid ${red}12`, background: `${red}05` }}
      >
        <span className="font-mono text-[9px] tracking-[0.32em] uppercase" style={{ color: red, opacity: 0.7 }}>
          ▶ J-ROCK
        </span>
        <span className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(255,255,255,0.08)' }}>日本語</span>
      </div>
      {/* Body */}
      <div className="p-5 pb-3">
        <div className="flex items-center gap-3 mb-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${red}14`, border: `1px solid ${red}28` }}
          >
            <Icon size={15} style={{ color: red }} />
          </div>
          <h3 className="text-white font-semibold text-sm tracking-tight">{title}</h3>
        </div>
        <p className="text-[#2e1a1a] text-[12px] leading-relaxed">{desc}</p>
      </div>
      {/* Artist strip */}
      <div className="px-4 pb-4">
        <p className="font-mono text-[8px] tracking-[0.3em] mb-2" style={{ color: red, opacity: 0.32 }}>ARTISTS</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {items.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="group/cover relative shrink-0 w-[80px] cursor-default"
            >
              <div className={`${coverAspect} overflow-hidden rounded-xl relative`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover/cover:scale-110"
                  loading="lazy"
                  style={{ filter: 'saturate(0.65) contrast(1.1)' }}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, rgba(14,2,6,0.97) 0%, rgba(14,2,6,0.45) 55%, transparent 100%)` }}
                >
                  <p className="text-white font-bold text-[9px] leading-tight line-clamp-2">{item.title}</p>
                  <p className="font-mono text-[7px] leading-tight mt-0.5" style={{ color: red, opacity: 0.85 }}>{item.sub}</p>
                </div>
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${red}80, 0 0 20px ${red}30` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Spotify */}
      {spotifyUrl && (
        <div className="px-4 pb-5">
          <p className="font-mono text-[8px] tracking-[0.3em] mb-2" style={{ color: red, opacity: 0.32 }}>PLAYLIST</p>
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${red}22` }}>
            <iframe
              src={spotifyUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify — J-Rock Playlist"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Dispatcher ────────────────────────────────────────────────────────────────
function HobbyCard({ hobby, index }) {
  if (hobby.id === 'gaming')  return <GamingCard  hobby={hobby} index={index} />;
  if (hobby.id === 'reading') return <ReadingCard hobby={hobby} index={index} />;
  if (hobby.id === 'watching') return <WatchingCard hobby={hobby} index={index} />;
  if (hobby.id === 'music')   return <MusicCard   hobby={hobby} index={index} />;
  return null;
}

function PhotoGrid() {
  return (
    <div
      style={{
        columns: 'clamp(160px, 30%, 280px)',
        columnGap: '10px',
      }}
    >
      {photos.map((photo, i) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42 + i * 0.055, ease: EASE }}
          className="group relative overflow-hidden rounded-xl mb-[10px] break-inside-avoid"
          style={{ display: 'block' }}
        >
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-auto object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Gradient + text overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Bottom gradient */}
            <div
              className="absolute inset-x-0 bottom-0 h-2/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
              }}
            />
            {/* Text — slides up from below */}
            <div className="absolute inset-x-0 bottom-0 px-4 pb-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
              <p className="text-white text-[13px] font-semibold tracking-tight leading-tight">{photo.title}</p>
              <p className="text-white/45 text-[10px] font-mono tracking-[0.18em] mt-0.5">{photo.sub}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function PersonalPanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (!open) document.body.style.overflow = '';
    };
  }, [open]);

  // Cleanup on unmount
  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        initial={{ opacity: 0, y: 14, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.6, duration: 0.7, ease: EASE }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen(true)}
        data-cursor="OPEN"
        className="fixed bottom-8 right-8 z-[8900] flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl text-white text-sm font-semibold tracking-wide shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(247,37,133,0.22) 0%, rgba(180,74,247,0.18) 100%)',
          border: '1px solid rgba(247,37,133,0.45)',
          boxShadow: '0 0 22px rgba(247,37,133,0.25), 0 0 50px rgba(247,37,133,0.08), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Pulsing beacon ring */}
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(247,37,133,0.5)',
              '0 0 0 10px rgba(247,37,133,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Shimmer sweep */}
        <motion.span
          className="absolute inset-y-0 w-1/3 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '400%' }}
          transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: 'linear' }}
        />
        <motion.span
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', color: '#f72585', textShadow: '0 0 10px #f72585', lineHeight: 1, fontSize: 11 }}
        >
          ✦
        </motion.span>
        <span style={{ textShadow: '0 0 18px rgba(247,37,133,0.55)' }}>Personal</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Dim backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[9000] bg-black/70 backdrop-blur-sm"
            />

            {/* Panel slides up — centered, capped width */}
            <motion.div
              initial={{ y: '100%', scale: 0.97, borderRadius: '36px 36px 0 0' }}
              animate={{ y: 0, scale: 1, borderRadius: '28px 28px 0 0' }}
              exit={{ y: '100%', scale: 0.98, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } }}
              transition={{ type: 'spring', stiffness: 310, damping: 34, mass: 1 }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[9100] h-[92dvh] bg-[#090909] border-t border-x border-white/[0.06] flex flex-col overflow-hidden"
              style={{ width: 'min(calc(100vw - 2rem), 860px)' }}
            >
              {/* Drag notch */}
              <div className="shrink-0 flex justify-center pt-4 pb-2">
                <div className="w-10 h-[3px] rounded-full bg-white/[0.1]" />
              </div>

              {/* Panel header */}
              <div className="shrink-0 px-8 py-4 flex items-center justify-between border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#1e1e1e] text-[10px] tracking-[0.32em] uppercase">
                    // Personal
                  </span>
                  <div className="w-5 h-px bg-white/[0.07]" />
                  <span className="font-mono text-[#2e2e2e] text-[10px] tracking-[0.28em] uppercase">
                    The Human Behind the Code
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  data-cursor="CLOSE"
                  className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.09] flex items-center justify-center text-[#555] hover:text-white transition-colors"
                >
                  <X size={14} />
                </motion.button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-24">

                  {/* Hero text */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
                  >
                    <div className="overflow-hidden mb-3">
                      <motion.h2
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                        className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold text-white tracking-tighter leading-[0.9]"
                      >
                        Beyond the code.
                      </motion.h2>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.7 }}
                      className="text-[#383838] text-lg leading-relaxed max-w-lg mt-5"
                    >
                      A developer is shaped by everything they read, watch, play, and see.
                      Here's a glimpse into what makes me, me.
                    </motion.p>
                  </motion.div>

                  {/* ── Hobbies ── */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                      className="flex items-center gap-4 mb-10"
                    >
                      <span className="font-mono text-[10px] tracking-[0.32em] text-[#1a1a1a]">01</span>
                      <div className="flex-1 h-px bg-white/[0.05]" />
                      <span className="font-mono text-[10px] tracking-[0.32em] text-[#2e2e2e] uppercase">
                        Interests
                      </span>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {hobbies.map((hobby, i) => (
                        <HobbyCard key={hobby.title} hobby={hobby} index={i} />
                      ))}
                    </div>
                  </div>

                  {/* ── Photography ── */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
                      className="flex items-center gap-4 mb-5"
                    >
                      <span className="font-mono text-[10px] tracking-[0.32em] text-[#1a1a1a]">02</span>
                      <div className="flex-1 h-px bg-white/[0.05]" />
                      <span className="font-mono text-[10px] tracking-[0.32em] text-[#2e2e2e] uppercase">
                        Photography
                      </span>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
                      className="text-[#383838] text-sm leading-relaxed mb-10 max-w-md"
                    >
                      I shoot mostly street and urban architecture — there's something about
                      capturing a fleeting city moment that feels like writing with light.
                    </motion.p>
                    <PhotoGrid />
                  </div>

                  {/* Bottom breathing room */}
                  <div className="h-8" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
