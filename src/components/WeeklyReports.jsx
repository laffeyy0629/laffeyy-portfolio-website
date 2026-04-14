import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ClipboardList } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
//  ADD YOUR WEEKLY REPORTS HERE
//  status: 'logged' | 'on-file' | 'incoming'
// ─────────────────────────────────────────────────────────────────────────────
const REPORTS = [
  {
    week: 1,
    title: 'Week 1 Accomplishment Report',
    dateRange: 'Feb 23 – Feb 27, 2026',
    summary: 'Orientation with the company, set up development environment, met with the team lead, started learning Flutter, and reviewed the project codebase.',
    url: '/reports/Ferrer, Javez Isaq B._Week 1 Report.pdf',
    status: 'on-file',
  },
  {
    week: 2,
    title: 'Week 2 Accomplishment Report',
    dateRange: 'Mar 2 – Mar 6, 2026',
    summary: 'Started working on the assigned project. Attended meetings, finished learning Flutter, and tested the mobile application.',
    url: '/reports/Ferrer, Javez Isaq B._Week 2 Report.pdf',
    status: 'on-file',
  },
  {
    week: 3,
    title: 'Week 3 Accomplishment Report',
    dateRange: 'Mar 9 – Mar 13, 2026',
    summary: 'Intensive investigations on assigned tickets, started implementing fixes and writing documentations and test cases for the tickets.',
    url: '/reports/Ferrer, Javez Isaq B._Week 3 Report.pdf',
    status: 'on-file',
  },
  {
    week: 4,
    title: 'Week 4 Accomplishment Report',
    dateRange: 'Mar 16 – Mar 20, 2026',
    summary: 'Continued working on testing, finding fixes for bugs related to Ticket 1083.',
    url: '/reports/Ferrer, Javez Isaq B._Week 4 Report.pdf',
    status: 'on-file',
  },
  {
    week: 5,
    title: 'Week 5 Accomplishment Report',
    dateRange: 'Mar 23 – Mar 27, 2026',
    summary: 'Finished Ticket 1083, started working on Tickets 1019 and 1096, and did some testing on new release on iOS and Android.',
    url: '/reports/Ferrer, Javez Isaq B._Week 5 Report.pdf',
    status: 'on-file',
  },
  {
    week: 6,
    title: 'Week 6 Accomplishment Report',
    dateRange: 'Mar 30 – Apr 1, 2026',
    summary: 'Tested implementation of Ticket 1096, and drafted documentation and test cases for it. Investigated commands being sent to device. Created an expense tracker side project during free time.',
    url: '/reports/Ferrer, Javez Isaq B._Week 6 Report.pdf',
    status: 'incoming',
  },
];

// ─── Thread connections (index pairs) ────────────────────────────────────────
const CONNECTIONS = [[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [2, 5], [3, 4], [4, 5]];

// ─── Constellation initial layout [x%, y%] of container ─────────────────────
// Adjust these to reposition nodes. Values are fractions (0–1) of the scene area.
const LAYOUT = [
  [0.05, 0.07],  // Node 0 – top-left
  [0.34, 0.04],  // Node 1 – top-center
  [0.63, 0.09],  // Node 2 – top-right
  [0.10, 0.60],  // Node 3 – bottom-left
  [0.40, 0.63],  // Node 4 – bottom-center
  [0.68, 0.56],  // Node 5 – bottom-right
];

// ─── Starfield (deterministic positions) ─────────────────────────────────────
const STARS = Array.from({ length: 24 }, (_, i) => ({
  xPct: (i * 137.508) % 100,
  yPct: (i * 89.3 + 15) % 100,
  r: i % 6 === 0 ? 1.3 : i % 3 === 0 ? 0.9 : 0.55,
  delay: (i * 0.38) % 4,
  dur: 2.5 + (i % 3) * 0.7,
}));

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CFG = {
  logged: { label: 'Logged', color: '#32d74b', bg: 'rgba(50,215,75,0.1)', border: 'rgba(50,215,75,0.22)' },
  'on-file': { label: 'On File', color: '#b44af7', bg: 'rgba(180,74,247,0.1)', border: 'rgba(180,74,247,0.22)' },
  incoming: { label: 'Incoming', color: '#ff9f0a', bg: 'rgba(255,159,10,0.1)', border: 'rgba(255,159,10,0.22)' },
};

// ─── Physics constants ────────────────────────────────────────────────────────
const NODE_W = 190;
const NODE_H = 120;
const SPRING = 0.052;
const DAMP = 0.87;
const FLOAT_X = 9;
const FLOAT_Y = 6;
const MOUSE_R = 185;
const MOUSE_F = 2.8;
const DRAG_THRESHOLD = 5;
const ROPE_SPRING = 0.06;
const ROPE_DAMP = 0.84;
const ROPE_MOUSE_R = 150;
const ROPE_MOUSE_F = 1.75;
const EASE = [0.22, 1, 0.36, 1];

// ─── StatusBadge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const c = STATUS_CFG[status] ?? STATUS_CFG['on-file'];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: 100,
        fontSize: 8,
        fontFamily: 'monospace',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
      {c.label}
    </span>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ report, onClose }) {
  const accent = STATUS_CFG[report.status]?.color ?? '#f72585';

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.28, ease: EASE }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.65, rotate: -14 }}
        animate={{ opacity: [0, 0.5, 0.16], scale: [0.65, 1.34, 1.2], rotate: [-14, 1, 9] }}
        exit={{ opacity: 0, scale: 1.5, rotate: 16 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          pointerEvents: 'none',
          background: `radial-gradient(circle, ${accent}55 0%, rgba(180,74,247,0.2) 35%, rgba(180,74,247,0.08) 55%, transparent 72%)`,
          mixBlendMode: 'screen',
          filter: 'blur(4px)',
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
          y: 38,
          rotateX: 18,
          rotateY: -7,
          filter: 'blur(9px)',
          clipPath: 'inset(44% 0 44% 0 round 24px)',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          filter: 'blur(0px)',
          clipPath: 'inset(0% 0 0% 0 round 24px)',
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: 24,
          rotateX: 13,
          rotateY: 6,
          filter: 'blur(7px)',
          clipPath: 'inset(40% 0 40% 0 round 24px)',
        }}
        transition={{
          opacity: { duration: 0.24 },
          filter: { duration: 0.3 },
          clipPath: { duration: 0.42, ease: EASE },
          y: { type: 'spring', stiffness: 260, damping: 23, mass: 0.86 },
          scale: { type: 'spring', stiffness: 235, damping: 22, mass: 0.88 },
          rotateX: { type: 'spring', stiffness: 230, damping: 21, mass: 0.9 },
          rotateY: { type: 'spring', stiffness: 220, damping: 20, mass: 0.9 },
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 480,
          borderRadius: 24,
          background: 'rgba(8,8,12,0.97)',
          border: '1px solid rgba(247,37,133,0.18)',
          padding: '32px 28px',
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 80px rgba(247,37,133,0.07), 0 0 0 1px rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          aria-hidden="true"
          initial={{ x: '-125%', opacity: 0 }}
          animate={{ x: '145%', opacity: [0, 0.26, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: -40,
            bottom: -40,
            width: '38%',
            transform: 'skewX(-16deg)',
            pointerEvents: 'none',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.06, 1], opacity: [0.14, 0.3, 0.14] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 240,
            height: 240,
            right: -94,
            top: -118,
            borderRadius: '50%',
            pointerEvents: 'none',
            background: `radial-gradient(circle, ${accent}2e 0%, rgba(180,74,247,0.16) 42%, transparent 70%)`,
          }}
        />

        {/* Week + status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.3em', color: '#f72585', textTransform: 'uppercase' }}>
            Week {String(report.week).padStart(2, '0')}
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(247,37,133,0.12)' }} />
          <StatusBadge status={report.status} />
          <button
            onClick={onClose}
            aria-label="Close report details"
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#7a7a7a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <X size={12} />
          </button>
        </div>

        {/* Title */}
        <h3 style={{
          color: '#fff', fontSize: '1.35rem', fontWeight: 700,
          letterSpacing: '-0.025em', lineHeight: 1.2, margin: '0 0 8px',
        }}>
          {report.title}
        </h3>

        {/* Date */}
        <p style={{
          fontFamily: 'monospace', fontSize: 10, color: '#444',
          letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 24px',
        }}>
          {report.dateRange}
        </p>

        {/* Summary box */}
        <div style={{
          borderRadius: 14, padding: '16px 18px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          marginBottom: 22,
        }}>
          <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3a3a3a', margin: '0 0 10px' }}>
            Summary
          </p>
          <p style={{ color: '#888', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            {report.summary}
          </p>
        </div>

        {/* Actions */}
        <div>
          <a
            href={report.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              padding: '11px', borderRadius: 12, textDecoration: 'none',
              background: 'rgba(247,37,133,0.1)', border: '1px solid rgba(247,37,133,0.22)',
              color: '#f72585', fontSize: 10, fontFamily: 'monospace',
              letterSpacing: '0.15em', textTransform: 'uppercase',
            }}
          >
            <Eye size={11} /> View PDF
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WeeklyReports() {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const ropeRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dragRef = useRef(null);
  const dragOffRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const didDragRef = useRef(false);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const cSizeRef = useRef({ w: 700, h: 560 });

  const [positions, setPositions] = useState(() =>
    LAYOUT.map(([fx, fy]) => ({ x: fx * (700 - NODE_W), y: fy * (560 - NODE_H) }))
  );
  const [cSize, setCSize] = useState({ w: 700, h: 560 });
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  // ── Init & resize ──
  useEffect(() => {
    const init = () => {
      if (!containerRef.current) return;
      const { width: w, height: h } = containerRef.current.getBoundingClientRect();
      cSizeRef.current = { w, h };
      setCSize({ w, h });

      nodesRef.current = LAYOUT.slice(0, REPORTS.length).map(([fx, fy], i) => {
        const rx = fx * (w - NODE_W);
        const ry = fy * (h - NODE_H);
        return { x: rx, y: ry, restX: rx, restY: ry, vx: 0, vy: 0, phase: i * 1.1 + 0.4 };
      });

      ropeRef.current = CONNECTIONS.map(([a, b], index) => {
        const na = nodesRef.current[a];
        const nb = nodesRef.current[b];
        if (!na || !nb) {
          return {
            cx: 0,
            cy: 0,
            vx: 0,
            vy: 0,
            phase: index * 0.9 + 0.5,
            prevAx: 0,
            prevAy: 0,
            prevBx: 0,
            prevBy: 0,
          };
        }

        const ax = na.x + NODE_W / 2;
        const ay = na.y + NODE_H / 2;
        const bx = nb.x + NODE_W / 2;
        const by = nb.y + NODE_H / 2;
        const dx = bx - ax;
        const dy = by - ay;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = -dy / dist;
        const ny = dx / dist;
        const sag = Math.min(56, 12 + dist * 0.085);

        return {
          cx: (ax + bx) / 2 + nx * sag,
          cy: (ay + by) / 2 + ny * sag,
          vx: 0,
          vy: 0,
          phase: index * 0.9 + 0.5,
          prevAx: ax,
          prevAy: ay,
          prevBx: bx,
          prevBy: by,
        };
      });

      setPositions(nodesRef.current.map((n) => ({ x: n.x, y: n.y })));
    };

    init();
    const ro = new ResizeObserver(init);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // ── Physics RAF loop ──
  useEffect(() => {
    const loop = () => {
      tRef.current += 0.007;
      const t = tRef.current;
      const { w, h } = cSizeRef.current;

      nodesRef.current.forEach((nd, i) => {
        if (dragRef.current === i) return;

        const tx = nd.restX + Math.sin(t + nd.phase) * FLOAT_X;
        const ty = nd.restY + Math.cos(t * 0.72 + nd.phase) * FLOAT_Y;

        nd.vx += (tx - nd.x) * SPRING;
        nd.vy += (ty - nd.y) * SPRING;

        const dx = mouseRef.current.x - (nd.x + NODE_W / 2);
        const dy = mouseRef.current.y - (nd.y + NODE_H / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_R && dist > 1) {
          const frac = (1 - dist / MOUSE_R) ** 1.8;
          nd.vx -= (dx / dist) * frac * MOUSE_F;
          nd.vy -= (dy / dist) * frac * MOUSE_F;
        }

        nd.vx *= DAMP;
        nd.vy *= DAMP;
        nd.x += nd.vx;
        nd.y += nd.vy;
        nd.x = Math.max(0, Math.min(w - NODE_W, nd.x));
        nd.y = Math.max(0, Math.min(h - NODE_H, nd.y));
      });

      ropeRef.current.forEach((rope, index) => {
        const [a, b] = CONNECTIONS[index] ?? [];
        const na = nodesRef.current[a];
        const nb = nodesRef.current[b];
        if (!na || !nb) {
          return;
        }

        const ax = na.x + NODE_W / 2;
        const ay = na.y + NODE_H / 2;
        const bx = nb.x + NODE_W / 2;
        const by = nb.y + NODE_H / 2;
        const dx = bx - ax;
        const dy = by - ay;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = -dy / dist;
        const ny = dx / dist;

        const midpointX = (ax + bx) / 2;
        const midpointY = (ay + by) / 2;
        const ripple = Math.sin(t * 1.85 + rope.phase) * 3.6;
        const baseSag = Math.min(60, 10 + dist * 0.09);

        const targetX = midpointX + nx * (baseSag + ripple);
        const targetY = midpointY + ny * (baseSag + ripple);

        const endpointImpulseX = ((ax - rope.prevAx) + (bx - rope.prevBx)) * 0.06;
        const endpointImpulseY = ((ay - rope.prevAy) + (by - rope.prevBy)) * 0.06;
        rope.vx += endpointImpulseX;
        rope.vy += endpointImpulseY;

        const mdx = mouseRef.current.x - rope.cx;
        const mdy = mouseRef.current.y - rope.cy;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < ROPE_MOUSE_R && mdist > 1) {
          const f = (1 - mdist / ROPE_MOUSE_R) ** 2;
          rope.vx -= (mdx / mdist) * f * ROPE_MOUSE_F;
          rope.vy -= (mdy / mdist) * f * ROPE_MOUSE_F;
        }

        rope.vx += (targetX - rope.cx) * ROPE_SPRING;
        rope.vy += (targetY - rope.cy) * ROPE_SPRING;
        rope.vx *= ROPE_DAMP;
        rope.vy *= ROPE_DAMP;

        rope.cx += rope.vx;
        rope.cy += rope.vy;
        rope.prevAx = ax;
        rope.prevAy = ay;
        rope.prevBx = bx;
        rope.prevBy = by;
      });

      setPositions(nodesRef.current.map((n) => ({ x: n.x, y: n.y })));
      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (nodesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        setTimeout(start, 100);
      }
    };
    start();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Event handlers ──
  const onMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };

    if (dragRef.current !== null) {
      if (Math.hypot(x - dragStartRef.current.x, y - dragStartRef.current.y) > DRAG_THRESHOLD) {
        didDragRef.current = true;
      }
      const nd = nodesRef.current[dragRef.current];
      nd.x = Math.max(0, Math.min(cSizeRef.current.w - NODE_W, x - dragOffRef.current.x));
      nd.y = Math.max(0, Math.min(cSizeRef.current.h - NODE_H, y - dragOffRef.current.y));
      nd.restX = nd.x;
      nd.restY = nd.y;
      nd.vx = 0;
      nd.vy = 0;
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
    dragRef.current = null;
  }, []);

  const onMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const onNodeDown = useCallback((e, i) => {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const nd = nodesRef.current[i];
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dragOffRef.current = { x: x - nd.x, y: y - nd.y };
    dragStartRef.current = { x, y };
    didDragRef.current = false;
    dragRef.current = i;
  }, []);

  const onNodeUp = useCallback((report) => {
    if (!didDragRef.current) {
      setSelected(report);
    }
    dragRef.current = null;
    didDragRef.current = false;
  }, []);

  // ── Thread path (quadratic bezier with natural sag) ──
  const getPath = (index, a, b) => {
    const pa = positions[a];
    const pb = positions[b];
    if (!pa || !pb) return '';
    const ax = pa.x + NODE_W / 2, ay = pa.y + NODE_H / 2;
    const bx = pb.x + NODE_W / 2, by = pb.y + NODE_H / 2;
    const rope = ropeRef.current[index];

    if (rope) {
      return `M${ax},${ay} Q${rope.cx},${rope.cy} ${bx},${by}`;
    }

    const sag = Math.hypot(bx - ax, by - ay) * 0.055;
    return `M${ax},${ay} Q${(ax + bx) / 2},${(ay + by) / 2 + sag} ${bx},${by}`;
  };

  const submitted = REPORTS.filter((r) => r.status !== 'incoming').length;

  return (
    <section id="reports" className="relative py-32 px-6 overflow-hidden">
      {/* Watermark */}
      <span
        className="absolute top-12 right-8 font-black leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(5rem,14vw,11rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.03)',
        }}
      >
        07
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
            OJT Reports
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
            className="font-bold text-white tracking-tighter leading-[1.05]"
            style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)' }}
          >
            Weekly
            <br />
            <span style={{ color: '#b44af7' }}>Accomplishments.</span>
          </motion.h2>
        </div>

        {/* Subline + stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
          className="flex flex-wrap items-center gap-6 mb-10"
        >
          <p className="text-[#666] text-sm flex items-center gap-2">
            <ClipboardList size={13} style={{ color: '#b44af7', flexShrink: 0 }} />
            Drag nodes · hover to preview · click to open
          </p>
          <div className="flex items-center gap-4 ml-auto">
            {[
              { label: 'Total', val: REPORTS.length, color: '#fff' },
              { label: 'Filed', val: submitted, color: '#32d74b' },
              { label: 'Incoming', val: REPORTS.length - submitted, color: '#ff9f0a' },
            ].map(({ label, val, color }) => (
              <div key={label} className="text-center">
                <p className="font-bold text-xl leading-none" style={{ color }}>{val}</p>
                <p className="font-mono text-[9px] text-[#555] tracking-[0.25em] uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Constellation scene ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          ref={containerRef}
          className="relative w-full select-none"
          style={{ height: 580 }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
        >
          {/* Nebula glows */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '35%', left: '42%', width: 420, height: 280,
              background: 'radial-gradient(ellipse, rgba(180,74,247,0.06) 0%, transparent 70%)',
              transform: 'translate(-50%,-50%)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              top: '18%', left: '18%', width: 260, height: 180,
              background: 'radial-gradient(ellipse, rgba(247,37,133,0.05) 0%, transparent 70%)',
              transform: 'translate(-50%,-50%)',
            }}
          />

          {/* SVG: stars + threads */}
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${cSize.w} ${cSize.h}`}
            className="absolute inset-0 overflow-visible pointer-events-none"
          >
            <defs>
              <filter id="threadGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Starfield */}
            {STARS.map((s, i) => (
              <circle
                key={i}
                cx={s.xPct / 100 * cSize.w}
                cy={s.yPct / 100 * cSize.h}
                r={s.r}
                fill="white"
                style={{
                  animation: `wrTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                }}
              />
            ))}

            {/* Threads */}
            {CONNECTIONS.map(([a, b], i) => {
              const active = hovered !== null && (hovered === a || hovered === b);
              const ropePath = getPath(i, a, b);

              return (
                <g key={i}>
                  <path
                    d={ropePath}
                    fill="none"
                    stroke="rgba(0,0,0,0.34)"
                    strokeWidth={active ? 2.8 : 2.3}
                    opacity={0.38}
                    strokeLinecap="round"
                  />
                  <path
                    d={ropePath}
                    fill="none"
                    stroke={active ? '#f72585' : 'rgba(247,37,133,0.27)'}
                    strokeWidth={active ? 1.55 : 1.15}
                    opacity={active ? 0.9 : 0.82}
                    filter={active ? 'url(#threadGlow)' : undefined}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transition: 'stroke 0.26s, stroke-width 0.26s, opacity 0.26s',
                    }}
                  />
                  <path
                    d={ropePath}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth={0.55}
                    strokeLinecap="round"
                    strokeDasharray="2 8"
                    style={{
                      animation: `wrFlow ${3.4 + i * 0.18}s linear infinite`,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Keyframe injection */}
          <style>{`
            @keyframes wrFlow { to { stroke-dashoffset: -20; } }
            @keyframes wrTwinkle { 0%,100% { opacity: 0.1; } 50% { opacity: 0.45; } }
          `}</style>

          {/* ── Nodes ── */}
          {REPORTS.map((report, i) => {
            const pos = positions[i] ?? { x: 0, y: 0 };
            const isHov = hovered === i;

            return (
              <div
                key={report.week}
                onMouseDown={(e) => onNodeDown(e, i)}
                onMouseUp={() => onNodeUp(report)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  width: NODE_W,
                  cursor: 'grab',
                  zIndex: isHov ? 10 : 1,
                  willChange: 'left, top',
                }}
              >
                {/* Hover glow ring */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -14,
                    borderRadius: 24,
                    background: isHov ? 'radial-gradient(ellipse, rgba(247,37,133,0.1) 0%, transparent 65%)' : 'none',
                    pointerEvents: 'none',
                    transition: 'background 0.3s',
                  }}
                />

                {/* Card */}
                <div
                  style={{
                    borderRadius: 18,
                    background: isHov
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(247,37,133,0.04) 100%)'
                      : 'rgba(255,255,255,0.022)',
                    border: `1px solid ${isHov ? 'rgba(247,37,133,0.32)' : 'rgba(255,255,255,0.07)'}`,
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    padding: '15px 16px',
                    transition: 'background 0.28s, border-color 0.28s, box-shadow 0.28s',
                    boxShadow: isHov
                      ? '0 8px 32px rgba(0,0,0,0.35), 0 0 20px rgba(247,37,133,0.1), inset 0 1px 0 rgba(255,255,255,0.07)'
                      : '0 2px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)',
                  }}
                >
                  {/* Week + status */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{
                      fontFamily: 'monospace', fontSize: 10, color: '#f72585',
                      letterSpacing: '0.22em', opacity: 0.85, textTransform: 'uppercase',
                    }}>
                      WK {String(report.week).padStart(2, '0')}
                    </span>
                    <StatusBadge status={report.status} />
                  </div>

                  {/* Title */}
                  <p style={{
                    color: isHov ? '#fff' : 'rgba(255,255,255,0.72)',
                    fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.35,
                    overflow: 'hidden', display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    transition: 'color 0.2s', margin: '0 0 8px',
                  }}>
                    {report.title}
                  </p>

                  {/* Date */}
                  <p style={{ fontFamily: 'monospace', fontSize: 8.5, color: '#3e3e3e', letterSpacing: '0.12em', margin: 0 }}>
                    {report.dateRange}
                  </p>

                  {/* Hover summary */}
                  <div style={{ maxHeight: isHov ? 64 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '10px 0 8px' }} />
                    <p style={{
                      color: '#585858', fontSize: 10.5, lineHeight: 1.55,
                      overflow: 'hidden', display: '-webkit-box',
                      WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', margin: 0,
                    }}>
                      {report.summary}
                    </p>
                  </div>
                </div>

                {/* Anchor dot */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 5, height: 5, borderRadius: '50%',
                  background: isHov ? '#f72585' : 'rgba(247,37,133,0.25)',
                  boxShadow: isHov ? '0 0 10px #f72585, 0 0 20px rgba(247,37,133,0.4)' : 'none',
                  transition: 'all 0.22s', pointerEvents: 'none', zIndex: 2,
                }} />
              </div>
            );
          })}
        </motion.div>

        {/* Footer hint */}
        <p className="font-mono text-[8px] tracking-[0.4em] uppercase text-center mt-10"
          style={{ color: 'rgba(255,255,255,0.06)' }}>
          Drag · Hover · Click to expand
        </p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <Modal report={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
