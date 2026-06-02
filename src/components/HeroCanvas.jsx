import { useEffect, useRef } from 'react';

/**
 * HeroCanvas — "Neural Orbit" Visual Centerpiece
 * Pure Canvas2D animation. Zero external assets.
 * Renders: central glowing core, three orbital particle rings,
 * floating connection nodes, animated bezier arcs, mouse parallax.
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, cx, cy;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.scale(dpr, dpr);
      cx = W / 2;
      cy = H / 2;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    // Mouse tracking (normalised -1 to 1 relative to canvas center)
    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - rect.left - W / 2) / (W / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - rect.top - H / 2) / (H / 2))),
      };
    };
    window.addEventListener('mousemove', handleMouse);

    // ── ORBITAL RINGS ──────────────────────────────────────────────
    const rings = [
      { r: 78,  speed: 0.0075, count: 16, dotR: 1.6, color: [14, 165, 233],  alpha: 0.75 },
      { r: 132, speed: 0.0042, count: 10, dotR: 2.2, color: [139, 92, 246],  alpha: 0.50 },
      { r: 188, speed: 0.0026, count:  7, dotR: 2.8, color: [14, 165, 233],  alpha: 0.28 },
    ];

    // ── FLOATING NODES ────────────────────────────────────────────
    const NUM_NODES = 9;
    const nodes = Array.from({ length: NUM_NODES }, (_, i) => ({
      angle:      (i / NUM_NODES) * Math.PI * 2 + Math.random() * 0.6,
      r:          108 + Math.random() * 82,
      driftSpeed: (Math.random() < 0.5 ? 1 : -1) * (0.0018 + Math.random() * 0.002),
      size:       2.2 + Math.random() * 2.2,
      pulse:      Math.random() * Math.PI * 2,
      pulseSpeed: 0.018 + Math.random() * 0.022,
    }));

    // ── SPARKLES ──────────────────────────────────────────────────
    const NUM_SPARKLES = 18;
    const sparkles = Array.from({ length: NUM_SPARKLES }, () => ({
      angle: Math.random() * Math.PI * 2,
      r:     55 + Math.random() * 155,
      life:  Math.random(),
      speed: 0.003 + Math.random() * 0.005,
    }));

    // ── ARC STATE ────────────────────────────────────────────────
    let arcProgress = 0;
    let arcPair = [0, 4];
    let arcFrame = 0;
    const ARC_DURATION = 110;
    const ARC_PAUSE    = 55;

    let t = 0;

    // ── HELPERS ──────────────────────────────────────────────────
    const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

    const getNodeXY = (node, tiltX) => {
      const ryMod = 1 - Math.abs(tiltX) * 0.18;
      return {
        x: cx + Math.cos(node.angle) * node.r,
        y: cy + Math.sin(node.angle) * node.r * ryMod,
      };
    };

    // ── DRAW LOOP ────────────────────────────────────────────────
    const draw = () => {
      if (!canvas.parentElement) return;
      ctx.clearRect(0, 0, W, H);

      t++;
      arcFrame++;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Tilt parameters from mouse
      const tiltX = mx * 0.28;
      const tiltY = my * 0.14;

      // ── AMBIENT OUTER GLOW ──
      const outerGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      outerGrd.addColorStop(0,   'rgba(14,165,233,0.055)');
      outerGrd.addColorStop(0.45,'rgba(139,92,246,0.025)');
      outerGrd.addColorStop(1,   'transparent');
      ctx.fillStyle = outerGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, 200, 0, Math.PI * 2);
      ctx.fill();

      // ── MID GLOW ──
      const midGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52);
      midGrd.addColorStop(0,   'rgba(14,165,233,0.28)');
      midGrd.addColorStop(0.5, 'rgba(14,165,233,0.07)');
      midGrd.addColorStop(1,   'transparent');
      ctx.fillStyle = midGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, 52, 0, Math.PI * 2);
      ctx.fill();

      // ── ORBIT RINGS + PARTICLES ──
      rings.forEach((ring, ri) => {
        const dir = ri % 2 === 0 ? 1 : -1;
        const angleOffset = t * ring.speed * dir;
        const ryFactor = 1 - Math.abs(tiltX) * 0.22;
        const rxFactor = 1 - Math.abs(tiltY) * 0.10;

        // Faint orbit path ellipse
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.035)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, ring.r * rxFactor, ring.r * ryFactor, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Particles
        for (let j = 0; j < ring.count; j++) {
          const a = (j / ring.count) * Math.PI * 2 + angleOffset;
          const px = cx + Math.cos(a) * ring.r * rxFactor;
          const py = cy + Math.sin(a) * ring.r * ryFactor;
          const leading = j === 0; // Leading particle gets extra glow

          ctx.save();
          ctx.shadowBlur  = leading ? 18 : 8;
          ctx.shadowColor = rgba(ring.color, 0.9);
          ctx.fillStyle   = rgba(ring.color, leading ? 1 : ring.alpha);
          ctx.globalAlpha = leading ? 1 : ring.alpha;
          ctx.beginPath();
          ctx.arc(px, py, ring.dotR * (leading ? 1.5 : 1), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // ── CORE RING (animated pulse) ──
      const coreScale = 1 + Math.sin(t * 0.038) * 0.055;
      ctx.save();
      ctx.shadowBlur  = 16;
      ctx.shadowColor = 'rgba(14,165,233,0.6)';
      ctx.strokeStyle = 'rgba(14,165,233,0.45)';
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 29 * coreScale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // ── CORE DOT ──
      const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 11);
      coreGrd.addColorStop(0,   'rgba(255,255,255,1)');
      coreGrd.addColorStop(0.45,'rgba(14,165,233,0.8)');
      coreGrd.addColorStop(1,   'transparent');
      ctx.save();
      ctx.shadowBlur  = 20;
      ctx.shadowColor = 'rgba(14,165,233,0.9)';
      ctx.fillStyle   = coreGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── FLOATING NODES ──
      nodes.forEach((node) => {
        node.angle += node.driftSpeed;
        node.pulse += node.pulseSpeed;
        const { x, y } = getNodeXY(node, tiltX);
        const pf = 0.65 + Math.sin(node.pulse) * 0.35;

        // Outer pulse ring
        ctx.save();
        ctx.strokeStyle = `rgba(14,165,233,${0.22 * pf})`;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.arc(x, y, node.size * 2.2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Node dot
        ctx.save();
        ctx.shadowBlur  = 14;
        ctx.shadowColor = 'rgba(14,165,233,0.7)';
        ctx.fillStyle   = `rgba(255,255,255,${0.85 * pf})`;
        ctx.globalAlpha = pf;
        ctx.beginPath();
        ctx.arc(x, y, node.size * 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── STATIC DIM CONNECTIONS between close nodes ──
      for (let a = 0; a < NUM_NODES; a++) {
        for (let b = a + 1; b < NUM_NODES; b++) {
          const pa = getNodeXY(nodes[a], tiltX);
          const pb = getNodeXY(nodes[b], tiltX);
          const dist = Math.hypot(pa.x - pb.x, pa.y - pb.y);
          if (dist < 145) {
            const alpha = (1 - dist / 145) * 0.055;
            ctx.save();
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth   = 1;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // ── ANIMATED BEZIER ARC ──
      if (arcFrame > ARC_DURATION + ARC_PAUSE) {
        arcFrame = 0;
        let a = Math.floor(Math.random() * NUM_NODES);
        let b = Math.floor(Math.random() * NUM_NODES);
        while (b === a) b = Math.floor(Math.random() * NUM_NODES);
        arcPair = [a, b];
      }

      if (arcFrame < ARC_DURATION) {
        arcProgress = arcFrame / ARC_DURATION;
        const pa = getNodeXY(nodes[arcPair[0]], tiltX);
        const pb = getNodeXY(nodes[arcPair[1]], tiltX);
        const cpX = (pa.x + pb.x) / 2 + (Math.random() < 0.5 ? -1 : 1) * 38;
        const cpY = (pa.y + pb.y) / 2 - 45;
        const envelope = Math.sin(arcProgress * Math.PI);

        ctx.save();
        ctx.strokeStyle = `rgba(14,165,233,${0.55 * envelope})`;
        ctx.lineWidth   = 1.2;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = 'rgba(14,165,233,0.5)';
        ctx.beginPath();
        const steps = Math.max(2, Math.floor(arcProgress * 40));
        for (let s = 0; s <= steps; s++) {
          const tt  = (s / steps) * arcProgress;
          const bx  = (1-tt)*(1-tt)*pa.x + 2*(1-tt)*tt*cpX + tt*tt*pb.x;
          const by  = (1-tt)*(1-tt)*pa.y + 2*(1-tt)*tt*cpY + tt*tt*pb.y;
          s === 0 ? ctx.moveTo(bx, by) : ctx.lineTo(bx, by);
        }
        ctx.stroke();
        ctx.restore();
      }

      // ── SPARKLES ──
      sparkles.forEach((sp) => {
        sp.life += sp.speed;
        if (sp.life > 1) { sp.life = 0; sp.angle = Math.random() * Math.PI * 2; sp.r = 55 + Math.random() * 155; }
        const alpha = Math.sin(sp.life * Math.PI);
        const sx = cx + Math.cos(sp.angle) * sp.r;
        const sy = cy + Math.sin(sp.angle) * sp.r * (1 - Math.abs(tiltX) * 0.12);
        ctx.save();
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.45})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouse);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
