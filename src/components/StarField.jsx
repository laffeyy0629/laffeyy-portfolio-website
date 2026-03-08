import { useEffect, useRef } from 'react';

// Neon palette: white, pink, violet, lavender
const PALETTE = ['#ffffff', '#ffb3d9', '#e0aaff', '#ffd6f0', '#c9b8ff', '#ff99cc', '#f0e0ff'];

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mkStar(w, h) {
  const hex = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const [cr, cg, cb] = hexToRgb(hex);
  const x = Math.random() * w;
  const y = Math.random() * h;
  const isBig = Math.random() > 0.78; // ~22% big sparkles
  return {
    homeX: x, homeY: y, x, y, vx: 0, vy: 0,
    r: isBig ? Math.random() * 3.5 + 2.2 : Math.random() * 1.1 + 0.3,
    base: isBig ? Math.random() * 0.55 + 0.35 : Math.random() * 0.3 + 0.08,
    phase: Math.random() * Math.PI * 2,
    freq: Math.random() * 0.7 + 0.15,
    cr, cg, cb,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.008,
    isBig,
  };
}

// 4-pointed anime sparkle ✦ with glow halo + cross gleam
function drawSparkle(ctx, s, alpha) {
  const { x, y, r, rot, cr, cg, cb } = s;

  // Soft glow halo
  const haloR = r * 6;
  const glow = ctx.createRadialGradient(x, y, 0, x, y, haloR);
  glow.addColorStop(0, `rgba(${cr},${cg},${cb},${(alpha * 0.45).toFixed(3)})`);
  glow.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
  ctx.globalAlpha = 1;
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, haloR, 0, Math.PI * 2);
  ctx.fill();

  // 4-pointed diamond star body
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4 - Math.PI / 4;
    const rad = i % 2 === 0 ? r : r * 0.12;
    const px = Math.cos(a) * rad;
    const py = Math.sin(a) * rad;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`;
  ctx.fill();

  // Cross-line gleam through center (anime highlight)
  const gleamLen = r * 2.8;
  ctx.globalAlpha = alpha * 0.55;
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},1)`;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-gleamLen, 0); ctx.lineTo(gleamLen, 0);
  ctx.moveTo(0, -gleamLen); ctx.lineTo(0, gleamLen);
  ctx.stroke();

  ctx.restore();
}

// Small glowing dot for background fill
function drawDot(ctx, s, alpha) {
  const { x, y, r, cr, cg, cb } = s;
  const gr = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
  gr.addColorStop(0, `rgba(${cr},${cg},${cb},${(alpha * 0.5).toFixed(3)})`);
  gr.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
  ctx.globalAlpha = 1;
  ctx.fillStyle = gr;
  ctx.beginPath();
  ctx.arc(x, y, r * 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = alpha;
  ctx.fillStyle = `rgba(${cr},${cg},${cb},1)`;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

export default function StarField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let id;
    let t = 0;
    let stars = [];
    let comets = [];
    let bursts = [];        // click burst particles
    let lastComet = 0;
    const mouse = { x: -9999, y: -9999 };

    const REPEL_R   = 150;
    const REPEL_F   = 5.5;
    const SPRING_K  = 0.055;
    const DAMP      = 0.78;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 195 }, () => mkStar(canvas.width, canvas.height));
    };

    const spawnComet = () => {
      const angle = (Math.random() * 28 + 14) * (Math.PI / 180);
      const speed = Math.random() * 6 + 9;
      const hex = Math.random() > 0.5 ? '#ffb3d9' : '#c4b5fd';
      const [cr, cg, cb] = hexToRgb(hex);
      comets.push({
        x: Math.random() * canvas.width * 0.55,
        y: Math.random() * canvas.height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0, cr, cg, cb,
      });
    };

    // Burst of small sparkles on click
    const spawnBurst = (ex, ey) => {
      const count = 10 + Math.floor(Math.random() * 6);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const speed = Math.random() * 3.5 + 1.5;
        const hex = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const [cr, cg, cb] = hexToRgb(hex);
        bursts.push({
          x: ex, y: ey,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          r: Math.random() * 2 + 1,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.18,
          cr, cg, cb,
        });
      }
    };

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onClick     = (e) => spawnBurst(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const tick = () => {
      t += 1 / 60;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Stars ──
      for (const s of stars) {
        const dx = s.homeX - s.x;
        const dy = s.homeY - s.y;
        s.vx += dx * SPRING_K;
        s.vy += dy * SPRING_K;

        const mdx = s.x - mouse.x;
        const mdy = s.y - mouse.y;
        const dist = Math.hypot(mdx, mdy);
        if (dist < REPEL_R && dist > 0.5) {
          const force = ((REPEL_R - dist) / REPEL_R) ** 1.5 * REPEL_F;
          s.vx += (mdx / dist) * force;
          s.vy += (mdy / dist) * force;
        }

        s.vx *= DAMP;
        s.vy *= DAMP;
        s.x  += s.vx;
        s.y  += s.vy;
        s.rot += s.rotSpeed;

        const nearBoost = dist < REPEL_R ? (1 - dist / REPEL_R) * 0.55 : 0;
        const twinkle = s.base * (0.4 + 0.6 * Math.sin(t * s.freq * Math.PI * 2 + s.phase));
        const alpha = Math.min(twinkle + nearBoost, 1);

        if (s.isBig) drawSparkle(ctx, s, alpha);
        else         drawDot(ctx, s, alpha);
      }

      // ── Click burst particles ──
      bursts = bursts.filter((b) => b.life > 0.02);
      for (const b of bursts) {
        b.x += b.vx; b.y += b.vy;
        b.vx *= 0.93; b.vy *= 0.93;
        b.rot += b.rotSpeed;
        b.life -= 0.028;
        drawSparkle(ctx, { ...b, homeX: b.x, homeY: b.y }, b.life);
      }

      // ── Comets ──
      ctx.globalAlpha = 1;
      comets = comets.filter((c) => c.life > 0.01);
      for (const c of comets) {
        c.x += c.vx; c.y += c.vy; c.life -= 0.013;
        const mag = Math.hypot(c.vx, c.vy);
        const len = 150;
        const tx = c.x - (c.vx / mag) * len;
        const ty = c.y - (c.vy / mag) * len;

        const g = ctx.createLinearGradient(tx, ty, c.x, c.y);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(1, `rgba(${c.cr},${c.cg},${c.cb},${(c.life * 0.9).toFixed(3)})`);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(c.x, c.y); ctx.stroke();

        // Bright sparkle head
        const headAlpha = Math.min(c.life * 1.8, 1);
        drawSparkle(ctx, { x: c.x, y: c.y, r: 2.5, rot: t * 2, cr: 255, cg: 255, cb: 255 }, headAlpha * 0.75);
      }

      ctx.globalAlpha = 1;
      const now = Date.now();
      if (now - lastComet > 4600) { spawnComet(); lastComet = now; }

      id = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 select-none pointer-events-none"
      // mix-blend-mode: screen makes the black canvas background "invisible"
      // so only the star dots glow additively over every section
      style={{ zIndex: 8000, mixBlendMode: 'screen', opacity: 0.85 }}
    />
  );
}
