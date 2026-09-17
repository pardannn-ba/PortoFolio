const SKILLS = [
  {
    no: "01",
    name: "UI / UX DESIGN",
    desc: "Wireframe, design system, prototyping interaktif di Figma.",
    tools: ["FIGMA", "AUTOFLOW", "VARIABLES"],
    accent: "#FF5738",
  },
  {
    no: "02",
    name: "FRONTEND DEVELOPMENT",
    desc: "Implementasi desain menjadi web yang cepat dan aksesibel.",
    tools: ["REACT", "VITE", "TAILWIND"],
    accent: "#10A6A0",
  },
  {
    no: "03",
    name: "VISUAL & BRANDING",
    desc: "Identitas visual, tipografi, dan komposisi editorial.",
    tools: ["TYPE", "GRID", "PRINT"],
    accent: "#F4D000",
  },
];

export default function Skills() {
  return (
    <section
      id="keahlian"
      className="border-t-2 border-navy/15 py-20 dark:border-cream/15"
    >
      <div className="mx-auto max-w-[1180px] px-6">
        <p className="mono-label mb-4 flex items-center gap-2 text-flame">
          <span className="reg-mark" aria-hidden="true">
            <span className="reg-mark-circle" />
          </span>
          02 — KEAHLIAN
        </p>
        <h2 className="mb-12 font-display text-4xl uppercase leading-[0.95] text-navy sm:text-5xl lg:text-6xl dark:text-cream">
          Peralatan kerja.
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {SKILLS.map((s) => (
            <article
              key={s.no}
              className="group relative border-2 border-navy bg-[#faf7f0] p-6 transition-transform duration-300 hover:-translate-y-1 dark:border-cream/40 dark:bg-[#171732]"
              style={{ boxShadow: `6px 6px 0 ${s.accent}` }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="mono-label text-navy/40 dark:text-cream/40">
                  {s.no}
                </span>
                <span
                  className="h-2.5 w-10"
                  style={{ background: s.accent }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-2 font-display text-xl uppercase leading-tight text-navy dark:text-cream">
                {s.name}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-navy/70 dark:text-cream/70">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.tools.map((t) => (
                  <span
                    key={t}
                    className="mono-label border border-navy/25 px-2 py-0.5 text-navy/60 dark:border-cream/25 dark:text-cream/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
