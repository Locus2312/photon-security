// Two party poppers firing confetti from the bottom corners of the screen,
// drawn on a temporary full-screen canvas that removes itself when the last
// piece has fallen. No dependency; skipped under prefers-reduced-motion.

const COLORS = ["#22d3ee", "#2563eb", "#6d4aff", "#a78bfa", "#f6a04d", "#ffffff"];

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: "rect" | "strip" | "dot";
  angle: number;
  spin: number;
  tilt: number;
  tiltSpeed: number;
  life: number;
};

function burst(pieces: Piece[], fromLeft: boolean, w: number, h: number, count: number) {
  const originX = fromLeft ? 0 : w;
  const originY = h;
  // Aim up and in, towards the upper middle of the screen.
  const base = fromLeft ? -Math.PI / 3.4 : -Math.PI + Math.PI / 3.4;
  const power = Math.max(h, 600) / 38;
  for (let i = 0; i < count; i++) {
    const angle = base + (Math.random() - 0.5) * 0.75;
    const speed = power * (0.55 + Math.random() * 0.6);
    const r = Math.random();
    pieces.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 6 + Math.random() * 6,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      shape: r < 0.55 ? "rect" : r < 0.85 ? "strip" : "dot",
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      tilt: Math.random() * Math.PI * 2,
      tiltSpeed: 0.08 + Math.random() * 0.12,
      life: 0,
    });
  }
}

export function firePartyPoppers() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "90",
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  let w = 0;
  let h = 0;
  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  const pieces: Piece[] = [];
  const perPopper = w < 640 ? 70 : 130;
  burst(pieces, true, w, h, perPopper);
  burst(pieces, false, w, h, perPopper);
  // A second, smaller pop from each side.
  const second = window.setTimeout(() => {
    burst(pieces, true, w, h, perPopper / 2);
    burst(pieces, false, w, h, perPopper / 2);
  }, 450);

  const gravity = 0.32;
  const drag = 0.985;
  let frame = 0;

  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      p.life++;
      p.vx *= drag;
      p.vy = p.vy * drag + gravity;
      // Flutter sideways as pieces slow down.
      p.x += p.vx + Math.sin(p.tilt) * 0.6;
      p.y += p.vy;
      p.angle += p.spin;
      p.tilt += p.tiltSpeed;

      if (p.y > h + 40 || p.life > 600) {
        pieces.splice(i, 1);
        continue;
      }

      const fade = p.life > 420 ? Math.max(0, 1 - (p.life - 420) / 180) : 1;
      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(1, Math.cos(p.tilt));
      ctx.fillStyle = p.color;
      if (p.shape === "dot") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === "strip") {
        ctx.fillRect(-p.size / 5, -p.size, p.size / 2.5, p.size * 2);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.5);
      }
      ctx.restore();
    }

    if (pieces.length) {
      frame = requestAnimationFrame(tick);
    } else {
      window.clearTimeout(second);
      window.removeEventListener("resize", resize);
      canvas.remove();
    }
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    window.clearTimeout(second);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };
}
