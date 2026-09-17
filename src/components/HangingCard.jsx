import { useEffect, useRef } from "react";

/**
 * Kartu gantung interaktif dengan fisika pendulum sederhana.
 *
 * - Selama drag: posisi kartu mengikuti pointer (di-clamp ke stage),
 *   sudut rotasi dihitung dari jarak horizontal kartu terhadap anchor,
 *   sehingga tali & rotasi ikut berubah secara natural.
 * - Setelah dilepas: spring sudut (stiffness + damping) menggoyang kartu
 *   kembali ke posisi diam; offset horizontal/vertikal perlahan decay.
 * - Mendukung mouse & touch via Pointer Events + setPointerCapture.
 */
const STIFFNESS = 130; // kekakuan spring sudut
const DAMPING = 9.5; // redaman (makin besar makin cepat settle)
const DT = 1 / 60;

export default function HangingCard({ index, anchor, config }) {
  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const ropeRef = useRef(null);

  const stateRef = useRef({
    angle: 0, // rad; rotasi kartu + ayunan pendulum
    velocity: 0, // rad/s
    x0: 0, // offset horizontal kartu dari anchor (px)
    yOff: 0, // offset vertikal dari posisi diam (px)
    dragging: false,
    pointerId: null,
    grabDX: 0, // jarak pointer ke tengah kartu saat grab
    grabDY: 0, // jarak pointer ke atas kartu saat grab
    prevX: 0,
    raf: 0,
    running: false,
  });

  useEffect(() => {
    const s = stateRef.current;
    const root = rootRef.current;
    const body = bodyRef.current;
    const rope = ropeRef.current;
    if (!root || !body || !rope) return;

    const stage = root.parentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Anchor & panjang tali dalam persen terhadap stage => responsif.
    const metrics = () => {
      const rect = stage.getBoundingClientRect();
      return {
        stageW: rect.width,
        ax: (anchor.x / 100) * rect.width,
        ay: (anchor.y / 100) * rect.height,
        ropeLen: (anchor.drop / 100) * rect.height,
      };
    };

    const render = () => {
      const { stageW, ax, ay, ropeLen } = metrics();
      const w = body.offsetWidth;
      const swingX = Math.sin(s.angle) * ropeLen * 0.22;
      // Clamp agar kartu tidak terpotong di tepi stage (termasuk saat resize)
      const cardX = Math.max(
        w / 2 + 4,
        Math.min(ax + s.x0 + swingX, stageW - w / 2 - 4)
      );
      const cardY = ay + ropeLen + s.yOff;

      // Tali: dari anchor ke lubang di atas kartu (koordinat lokal root)
      rope.setAttribute("x1", String(ax - (cardX - w / 2)));
      rope.setAttribute("y1", String(ay - cardY));
      rope.setAttribute("x2", String(w / 2));
      rope.setAttribute("y2", "7");

      body.style.transform = `rotate(${(s.angle * 180) / Math.PI}deg)`;
      root.style.left = `${cardX - w / 2}px`;
      root.style.top = `${cardY}px`;
    };

    const step = () => {
      const acc = -STIFFNESS * s.angle - DAMPING * s.velocity;
      s.velocity += acc * DT;
      s.angle += s.velocity * DT;
      s.x0 *= 0.9; // kartu kembali ke bawah anchor-nya
      s.yOff *= 0.85; // tinggi kembali ke posisi diam
      render();
      if (
        Math.abs(s.angle) > 0.0005 ||
        Math.abs(s.velocity) > 0.0005 ||
        Math.abs(s.x0) > 0.5 ||
        Math.abs(s.yOff) > 0.5
      ) {
        s.raf = requestAnimationFrame(step);
      } else {
        s.angle = 0;
        s.velocity = 0;
        s.x0 = 0;
        s.yOff = 0;
        render();
        s.running = false;
      }
    };

    const ensureLoop = () => {
      if (!s.running) {
        s.running = true;
        s.raf = requestAnimationFrame(step);
      }
    };

    const onPointerDown = (e) => {
      if (s.dragging || reduceMotion) return;
      s.dragging = true;
      s.pointerId = e.pointerId;
      root.classList.add("is-grabbed");
      const rootRect = root.getBoundingClientRect();
      s.grabDX = e.clientX - (rootRect.left + rootRect.width / 2);
      s.grabDY = e.clientY - rootRect.top;
      s.prevX = e.clientX;
      try {
        root.setPointerCapture(e.pointerId);
      } catch {
        /* abaikan */
      }
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!s.dragging || e.pointerId !== s.pointerId) return;
      const { stageW, ax, ay, ropeLen } = metrics();
      const stageLeft = stage.getBoundingClientRect().left;
      const w = body.offsetWidth;

      // Posisi tengah kartu mengikuti pointer, di-clamp ke dalam stage
      let cx = e.clientX - s.grabDX - stageLeft;
      cx = Math.max(w / 2 + 10, Math.min(cx, stageW - w / 2 - 10));
      // Vertikal: boleh diangkat/ditekan terbatas
      let cy = e.clientY - s.grabDY - stage.getBoundingClientRect().top;
      cy = Math.max(ay + 36, Math.min(cy, ay + ropeLen + 90));

      // Sudut pendulum dari posisi horizontal terhadap anchor
      s.angle = Math.max(-0.55, Math.min(0.55, (cx - ax) / ropeLen));
      s.velocity = Math.max(
        -0.8,
        Math.min(0.8, (e.clientX - s.prevX) * 0.015)
      );
      s.prevX = e.clientX;

      // Solve x0 agar posisi render tepat di bawah pointer
      const swingX = Math.sin(s.angle) * ropeLen * 0.22;
      s.x0 = cx - ax - swingX;
      s.yOff = cy - (ay + ropeLen);

      render();
    };

    const onPointerUp = (e) => {
      if (!s.dragging || e.pointerId !== s.pointerId) return;
      s.dragging = false;
      s.pointerId = null;
      root.classList.remove("is-grabbed");
      ensureLoop(); // spring menyalakan kembali ayunan
    };

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);

    render();

    // Re-render saat ukuran stage berubah (responsive)
    const ro = new ResizeObserver(() => render());
    ro.observe(stage);

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="hang-card anim-drop z-10"
      style={{
        left: `${anchor.x}%`,
        top: `${anchor.y}%`,
        animationDelay: `${0.45 + index * 0.12}s`,
      }}
    >
      <svg
        className="pointer-events-none absolute left-0 top-0"
        width="1"
        height="1"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <line
          ref={ropeRef}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-navy/50 dark:text-cream/50"
        />
      </svg>
      {/* Wrapper hover-scale (dipisah agar tidak bentrok dgn rotate inline) */}
      <div className="hang-card__scale">
        <div
          ref={bodyRef}
          className="hang-card__body"
          style={{ "--card-w": `${config.w}px` }}
        >
          <span className="hang-card__hole" aria-hidden="true" />
          <p className="mono-label mb-1 text-navy/45 dark:text-cream/45">
            {config.tag}
          </p>
          <p className="font-display text-base leading-tight text-navy dark:text-cream">
            {config.label}
          </p>
          <p className="mono-label mt-1.5 text-flame">{config.meta}</p>
        </div>
      </div>
    </div>
  );
}
