import HangingCard from "./HangingCard.jsx";

const CARDS = [
  { tag: "01 / LAYANAN", label: "UI DESIGN", meta: "INTERFACE", w: 130 },
  { tag: "02 / CODE", label: "FRONTEND", meta: "CLEAN CODE", w: 140 },
  { tag: "03 / STACK", label: "REACT", meta: "SINCE 2023", w: 120 },
  { tag: "04 / TOOL", label: "FIGMA", meta: "DESIGN FILE", w: 120 },
  { tag: "05 / ARCHIVE", label: "PROJECT 2026", meta: "IN PROGRESS", w: 150 },
];

// anchor: posisi titik gantung (% stage); drop: panjang tali (% tinggi stage)
const ANCHORS = [
  { x: 6, y: 2, drop: 18 },
  { x: 32, y: 0, drop: 10 },
  { x: 58, y: 4, drop: 16 },
  { x: 82, y: 1, drop: 12 },
  { x: 44, y: 8, drop: 26 },
  { x: 18, y: 6, drop: 30 },
];

export default function Hero() {
  return (
    <section id="home" className="halftone relative overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-6 pb-10 pt-28 md:pt-32">
        {/* Label kecil */}
        <p className="mono-label anim-rise mb-8 flex items-center gap-2 text-navy/70 dark:text-cream/70">
          <span className="reg-mark text-flame" aria-hidden="true">
            <span className="reg-mark-circle" />
          </span>
          + DESIGNER & FRONTEND DEVELOPER — JAKARTA
        </p>

        {/* Headline besar */}
        <h1 className="anim-rise title-3d max-w-[13ch] font-display text-[clamp(3rem,9.5vw,8.5rem)] uppercase leading-[0.92] text-navy [animation-delay:0.08s] dark:text-cream">
          Merancang
          <br />
          Ide,
          <br />
          Membangun
          <br />
          Pengalaman.
        </h1>
        {/* Deskripsi + CTA */}
        <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="anim-rise max-w-md text-base leading-relaxed text-navy/75 [animation-delay:0.16s] dark:text-cream/75">
            Saya membangun pengalaman digital melalui desain, frontend
            development, dan visual yang sederhana namun memiliki karakter.
          </p>
          <div className="anim-rise flex flex-col gap-3 sm:flex-row [animation-delay:0.24s]">
            <a href="#karya" className="btn">
              LIHAT KARYA →
            </a>
            <a href="#kontak" className="btn btn--alt">
              HUBUNGI SAYA
            </a>
          </div>
        </div>

        {/* Elemen dekoratif kecil */}
        <div
          aria-hidden="true"
          className="mono-label pointer-events-none absolute left-6 top-24 hidden text-navy/30 md:block dark:text-cream/30"
        >
          ✳ 01
        </div>
        <div
          aria-hidden="true"
          className="mono-label pointer-events-none absolute bottom-28 right-6 hidden text-navy/30 md:block dark:text-cream/30"
        >
          FIG. A — PORTFOLIO
        </div>
      </div>

      {/* Stage hanging cards */}
      <div className="hang-stage relative h-[340px] select-none md:h-[420px]" aria-label="Kartu keahlian interaktif — bisa digeser">
        {/* Garis rel teratas tempat anchor menempel */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 border-t-2 border-dashed border-navy/25 dark:border-cream/25"
        />
        {CARDS.map((config, i) => (
          <HangingCard key={config.label} index={i} anchor={ANCHORS[i]} config={config} />
        ))}
      </div>

      {/* Marquee band */}
      <div
        className="relative overflow-hidden border-y-2 border-navy bg-navy py-3 text-cream dark:border-cream/40 dark:bg-[#0d0d1f] dark:text-cream"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="mono-label whitespace-nowrap px-2">
              BRANDING • FRONTEND • UI/UX • REACT • FIGMA • MOTION • TAILWIND •
              TYPESCRIPT • ACCESSIBILITY •&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
