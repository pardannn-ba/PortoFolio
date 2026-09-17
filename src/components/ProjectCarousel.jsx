import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";

export default function ProjectCarousel({ projects, onOpen, onDelete }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows, projects]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (projects.length === 0) {
    return (
      <div className="border-2 border-dashed border-navy/30 p-10 text-center dark:border-cream/30">
        <p className="mono-label text-navy/50 dark:text-cream/50">
          BELUM ADA PROJECT DI KATEGORI INI.
        </p>
      </div>
    );
  }

  const arrowCls = (enabled) =>
    `flex h-11 w-11 items-center justify-center border-2 font-mono text-lg transition-all duration-200 ${
      enabled
        ? "border-navy text-navy hover:bg-navy hover:text-cream dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-navy"
        : "cursor-not-allowed border-navy/20 text-navy/25 dark:border-cream/20 dark:text-cream/25"
    }`;

  return (
    <div className="relative">
      {/* Tombol navigasi */}
      <div className="mb-5 flex items-center justify-between">
        <p className="mono-label text-navy/45 dark:text-cream/45">
          {String(projects.length).padStart(2, "0")} PROJECTS — GESER UNTUK
          LIHAT →
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className={arrowCls(canPrev)}
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Project sebelumnya"
          >
            ←
          </button>
          <button
            type="button"
            className={arrowCls(canNext)}
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Project berikutnya"
          >
            →
          </button>
        </div>
      </div>

      {/* Track: snap + swipe native; key={filter} memicu re-animasi */}
      <div
        ref={trackRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2"
      >
        {projects.map((p, i) => (
          <div
            key={`${p.id}`}
            data-card
            className="anim-rise w-[85%] flex-none snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            style={{ animationDelay: `${Math.min(i * 60, 300)}ms` }}
          >
            <ProjectCard
              project={p}
              index={i}
              onOpen={onOpen}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
