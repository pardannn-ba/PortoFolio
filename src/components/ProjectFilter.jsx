import { CATEGORIES } from "../data/projects.js";

export default function ProjectFilter({ active, onChange }) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter kategori project"
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`mono-label border-2 px-3.5 py-1.5 transition-all duration-200 ${
              isActive
                ? "border-flame bg-flame text-cream shadow-[3px_3px_0_rgba(21,21,45,1)] dark:shadow-[3px_3px_0_rgba(244,241,234,0.9)]"
                : "border-navy/25 text-navy/60 hover:border-navy hover:text-navy dark:border-cream/25 dark:text-cream/60 dark:hover:border-cream dark:hover:text-cream"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
