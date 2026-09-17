const ACCENTS = ["#FF5738", "#10A6A0", "#F4D000"];

export default function ProjectCard({ project, index, onOpen, onDelete }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className="group relative flex h-full flex-col border-2 border-navy bg-[#faf7f0] transition-all duration-300 hover:-translate-y-1.5 hover:border-navy dark:border-cream/40 dark:bg-[#171732] dark:hover:border-cream/70"
      style={{ boxShadow: `8px 8px 0 ${accent}` }}
    >
      {/* Meta atas: nomor + tahun */}
      <div className="flex items-center justify-between border-b-2 border-navy/10 px-5 py-3 dark:border-cream/15">
        <span className="mono-label text-navy/50 dark:text-cream/50">
          {number}
        </span>
        <span className="mono-label text-navy/50 dark:text-cream/50">
          {project.year}
        </span>
      </div>

      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="relative block aspect-[16/9] w-full cursor-pointer overflow-hidden border-b-2 border-navy/10 focus-visible:outline-offset-[-6px] dark:border-cream/15"
        aria-label={`Buka detail ${project.title}`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: accent }}
          aria-hidden="true"
        />
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="mono-label" style={{ color: accent }}>
          {project.category} {project.technologies[0] ? `· ${project.technologies[0]}` : ""}
        </p>
        <h3 className="font-display text-2xl uppercase leading-tight text-navy dark:text-cream">
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-navy/70 dark:text-cream/70">
          {project.description}
        </p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="mono-label border border-navy/25 px-2 py-0.5 text-navy/60 dark:border-cream/25 dark:text-cream/60"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="mono-label inline-flex items-center gap-1.5 border-b-2 pb-0.5 text-navy transition-colors hover:text-flame dark:text-cream dark:hover:text-flame"
            style={{ borderColor: accent }}
          >
            VIEW PROJECT
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>

          {/* Delete hanya untuk project buatan user — sengaja dibuat subtle */}
          {project.custom && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(project.id)}
              className="mono-label rounded-none border border-transparent px-1 py-0.5 text-navy/30 opacity-0 transition-opacity hover:border-flame/40 hover:text-flame focus-visible:opacity-100 group-hover:opacity-100 dark:text-cream/30"
              aria-label={`Hapus project ${project.title}`}
              title="Hapus project ini"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
