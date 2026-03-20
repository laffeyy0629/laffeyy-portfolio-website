import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
      { title: 'Bloodborne',         sub: 'Action RPG · FromSoftware',      img: 'https://assets1.ignimgs.com/2019/01/05/bloodborne---button-1546669457774.jpg?crop=1%3A1%2Csmart&format=jpg&auto=webp&quality=80' },
      { title: 'Persona 5',      sub: 'JRPG · Atlus',     img: 'https://sm.ign.com/ign_pk/cover/p/persona-5-/persona-5-the-royal_rw71.jpg' },
      { title: "Ace Combat 0",    sub: 'Flight Sim · PROJECT ACES',           img: 'https://m.media-amazon.com/images/M/MV5BYWE1OGQyY2UtNDQ0Ny00MmIwLTlmODUtZjZhYWY1YzRiMjM0XkEyXkFqcGc@._V1_.jpg' },
      { title: 'Cyberpunk 2077',            sub: 'RPG · CD Projekt RED', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/250px-Cyberpunk_2077_box_art.jpg' },
    ],
  },
  {
    id: 'reading',
    icon: BookOpen,
    title: 'Reading',
    color: '#a15aff',
    bg: '#a15aff0d',
    border: '#a15aff22',
    desc: 'Manga and Light Novels that shaped my perspective.',
    coverAspect: 'aspect-[2/3]',
    items: [
      { title: 'Berserk',                    sub: 'Manga · Kentaro Miura',    img: 'https://static.wikia.nocookie.net/enmanga/images/6/64/Berserk_Vol_1.jpg/revision/latest/scale-to-width-down/1200?cb=20210928030221' },
      { title: 'Wistoria',             sub: 'Manga/LN · Makoto Yukimura', img: 'https://bukkuzon.com/cdn/shop/products/9781646519194_wistoria-wand-and-sword-manga-volume-7_1.jpg?v=1738138562' },
      { title: 'Re:Zero',    sub: 'Light Novel · Nagatsuki Tappei', img: 'https://static.wikia.nocookie.net/rezero/images/e/eb/Re_Zero_Volume_1_Cover.png/revision/latest?cb=20211219142902' },
      { title: 'Oregairu',                 sub: 'Manga · Watari Wataru',          img: 'https://static.wikia.nocookie.net/yahari/images/e/e0/Cover_Volume_1_HQ.png/revision/latest?cb=20180729200357' },
    ],
  },
  {
    id: 'watching',
    icon: Tv,
    title: 'Watching',
    color: '#ff375f',
    bg: '#ff375f0d',
    border: '#ff375f22',
    desc: 'Anime, and cinema. A great story well told — whatever the medium.',
    coverAspect: 'aspect-[2/3]',
    items: [
      { title: 'Steins;Gate',      sub: 'Anime · White Fox',    img: 'https://m.media-amazon.com/images/M/MV5BZjI1YjZiMDUtZTI3MC00YTA5LWIzMmMtZmQ0NTZiYWM4NTYwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
      { title: 'Angel Beats',    sub: 'Anime · Key', img: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Angel_Beats%21_DVD_Complete_Collection_cover.jpg' },
      { title: 'Iron Man',        sub: 'Film · Marvel',         img: 'https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg' },
      { title: 'Look Back',  sub: 'Film - Tatsuki Fujimoto',            img: 'https://m.media-amazon.com/images/M/MV5BOTVhN2ZlNmUtZTY1Mi00OTUwLWIxNzEtYzgwZjg2ZTlhNWU1XkEyXkFqcGc@._V1_QL75_UX174_.jpg' },
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
    spotifyUrl: 'https://open.spotify.com/embed/album/3kbT2L3KUCnl547a6zZKKE',
    items: [
      { title: 'ONE OK ROCK', sub: 'J-Rock / Alternative', img: 'https://i.scdn.co/image/ab6761610000e5eb65f3ecf43652596ef75f3293' },
      { title: 'Zutomayo',    sub: 'J-Pop / Indie',        img: 'https://cdn-images.dzcdn.net/images/artist/61bcbf8296b1669499064406c534d39d/500x500.jpg' },
      { title: 'Yorushika',   sub: 'J-Rock / Indie Pop',   img: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Yorushika_Logo.jpg' },
    ],
  },
];

// Place your photos in public/photos/ and update the list below.
// e.g. public/photos/photo1.jpg → src: '/photos/photo1.jpg'
const photos = [
  { id: 1, src: '/personalPhotos/photo2.png', title: 'Golden Hour',     sub: 'Tokyo, Ameyoko, 2024' },
  { id: 2, src: '/personalPhotos/photo3.png', title: 'Tokyo Horizons',  sub: 'Tokyo, 2024' },
  { id: 3, src: '/personalPhotos/photo1.png', title: 'Green in the City',      sub: 'Tokyo, Koyamadai, 2024' },
  { id: 4, src: '/personalPhotos/photo4.png', title: 'Fast Life',     sub: 'Sapporo, 2024' },
  { id: 5, src: '/personalPhotos/photo5.png', title: 'Warmth in the Winter',        sub: 'Sapporo, 2024' },
  { id: 6, src: '/personalPhotos/photo6.png', title: 'City within A City', sub: 'Yokohama, Ramen Museum, 2024' },
  { id: 7, src: '/personalPhotos/photo7.png', title: 'Light in the Snow',     sub: 'Hokkaido, 2024' },
  { id: 8, src: '/personalPhotos/photo8.png', title: 'Finding your embrace',        sub: 'Sapporo, 2024' },
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
        <p className="text-[#4a8080] text-[12px] leading-relaxed font-mono">{desc}</p>
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
        <p className="text-[#888] text-[12px] leading-relaxed">{desc}</p>
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
        <p className="text-[#8a7aaa] text-[12px] leading-relaxed">{desc}</p>
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
        <p className="text-[#8a5a5a] text-[12px] leading-relaxed">{desc}</p>
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
              sandbox="allow-scripts allow-same-origin allow-storage-access-by-user-activation allow-popups"
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
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.style.background =
                'linear-gradient(135deg, #0d0d0d 0%, #1a0a14 100%)';
              e.currentTarget.parentElement.style.minHeight = '160px';
            }}
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
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef(null);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth, natural movement
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const rotate = useSpring(0, springConfig);

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

  // Mouse tracking for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!buttonRef.current || !isHovering) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      // Calculate distance from cursor to button center
      const deltaX = e.clientX - buttonCenterX;
      const deltaY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Magnetic effect: button follows cursor within hover range
      const maxDistance = 150; // Magnetic field radius
      const strength = 0.35; // How much the button moves (0-1)

      if (distance < maxDistance) {
        mouseX.set(deltaX * strength);
        mouseY.set(deltaY * strength);

        // Calculate rotation based on cursor angle
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        rotate.set(angle * 0.08); // Subtle rotation
      } else {
        mouseX.set(0);
        mouseY.set(0);
        rotate.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering, mouseX, mouseY, rotate]);

  // Reset position when not hovering
  useEffect(() => {
    if (!isHovering) {
      mouseX.set(0);
      mouseY.set(0);
      rotate.set(0);
    }
  }, [isHovering, mouseX, mouseY, rotate]);

  return (
    <>
      {/* Floating trigger with mouse tracking */}
      <motion.button
        ref={buttonRef}
        initial={{ opacity: 0, y: 14, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.6, duration: 0.7, ease: EASE }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => setOpen(true)}
        data-cursor="OPEN"
        className="fixed bottom-8 right-8 z-[8900] flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl text-white text-sm font-semibold tracking-wide shadow-2xl overflow-visible select-none"
        style={{
          x,
          y,
          rotate,
          background: 'linear-gradient(135deg, rgba(247,37,133,0.22) 0%, rgba(180,74,247,0.18) 100%)',
          border: '1px solid rgba(247,37,133,0.45)',
          boxShadow: '0 0 22px rgba(247,37,133,0.25), 0 0 50px rgba(247,37,133,0.08), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Rotating sparkle */}
        <motion.span
          animate={{
            rotate: [0, 20, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            display: 'flex',
            color: '#f72585',
            textShadow: '0 0 12px #f72585, 0 0 6px #f72585',
            lineHeight: 1,
            fontSize: 11,
          }}
        >
          ✦
        </motion.span>

        <span style={{ textShadow: '0 0 18px rgba(247,37,133,0.55)' }}>Personal</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Dim backdrop with blur effect */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[9000] bg-black/70"
            />

            {/* Panel slides up with enhanced animations */}
            <motion.div
              initial={{
                y: '100%',
                scale: 0.95,
                borderRadius: '40px 40px 0 0',
                opacity: 0,
              }}
              animate={{
                y: 0,
                scale: 1,
                borderRadius: '28px 28px 0 0',
                opacity: 1,
              }}
              exit={{
                y: '100%',
                scale: 0.96,
                opacity: 0,
                transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 30,
                mass: 0.8,
              }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[9100] h-[92dvh] bg-[#090909] border-t border-x border-white/[0.06] flex flex-col overflow-hidden"
              style={{
                width: 'min(calc(100vw - 2rem), 860px)',
                boxShadow: '0 -10px 80px rgba(247,37,133,0.15), 0 -4px 40px rgba(0,0,0,0.8)',
              }}
            >
              {/* Animated gradient top border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(247,37,133,0.8), rgba(180,74,247,0.8), transparent)',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              />

              {/* Drag notch with animation */}
              <motion.div
                className="shrink-0 flex justify-center pt-4 pb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
              >
                <motion.div
                  className="w-10 h-[3px] rounded-full bg-white/[0.15]"
                  whileHover={{ width: 50, backgroundColor: 'rgba(247,37,133,0.4)' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Panel header */}
              <motion.div
                className="shrink-0 px-8 py-4 flex items-center justify-between border-b border-white/[0.05]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
              >
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
                  whileHover={{
                    scale: 1.15,
                    rotate: 90,
                    backgroundColor: 'rgba(247,37,133,0.1)',
                    borderColor: 'rgba(247,37,133,0.3)',
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotate: 180,
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onClick={() => setOpen(false)}
                  data-cursor="CLOSE"
                  className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.09] flex items-center justify-center text-[#555] hover:text-[#f72585] transition-colors"
                >
                  <X size={14} />
                </motion.button>
              </motion.div>

              {/* Scrollable body */}
              <motion.div
                className="flex-1 overflow-y-auto px-8 py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
              >
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
                      className="text-[#777] text-lg leading-relaxed max-w-lg mt-5"
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
                      className="text-[#777] text-sm leading-relaxed mb-10 max-w-md"
                    >
                      I shoot mostly street and urban architecture — there's something about
                      capturing a fleeting city moment that feels like writing with light.
                    </motion.p>
                    <PhotoGrid />
                  </div>

                  {/* Bottom breathing room */}
                  <div className="h-8" />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
