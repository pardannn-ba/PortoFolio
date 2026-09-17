import { useEffect } from "react";

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/60 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail project ${project.title}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="anim-rise max-h-[92vh] w-full max-w-3xl overflow-y-auto border-2 border-navy bg-cream shadow-[10px_10px_0_#10A6A0] dark:border-cream/50 dark:bg-[#12122a] dark:shadow-[10px_10px_0_rgba(16,166,160,0.55)]">
        <div className="flex items-center justify-between border-b-2 border-navy/15 px-6 py-4 dark:border-cream/15">
          <p className="mono-label text-navy/60 dark:text-cream/60">
            {project.category} — {project.year}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mono-label border-2 border-navy/25 px-2 py-1 text-navy/60 transition-colors hover:border-flame hover:text-flame dark:border-cream/25 dark:text-cream/60"
            aria-label="Tutup detail project"
          >
            ✕ CLOSE
          </button>
        </div>

        <div className="aspect-[16/8] w-full overflow-hidden border-b-2 border-navy/15 bg-navy/5 dark:border-cream/15 dark:bg-cream/5">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto]">
          <div className="grid gap-3">
            <h3 className="font-display text-3xl uppercase text-navy dark:text-cream">
              {project.title}
            </h3>
            <p className="leading-relaxed text-navy/75 dark:text-cream/75">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="mono-label border border-navy/25 px-2 py-0.5 text-navy/60 dark:border-cream/25 dark:text-cream/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-2">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                VIEW PROJECT →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--alt"
              >
                GITHUB ↗
              </a>
            )}
            <button type="button" onClick={onClose} className="btn">
              KEMBALI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
