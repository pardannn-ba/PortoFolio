import { useEffect } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#karya", label: "Karya" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#kontak", label: "Kontak" },
];

export default function MobileMenu({ open, onClose }) {
  // Escape untuk menutup menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className={`halftone fixed inset-0 top-16 z-40 overflow-y-auto overscroll-contain bg-cream transition-[opacity,transform] duration-300 ease-out md:hidden dark:bg-[#0d0d1f] ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <nav
        className="px-6 pt-10 pb-16 flex flex-col"
        aria-label="Navigasi mobile"
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="group flex items-baseline justify-between border-b-2 border-navy/10 py-5 font-display text-4xl uppercase text-navy transition-colors hover:text-flame dark:border-cream/15 dark:text-cream"
          >
            {l.label}
            <span className="mono-label text-navy/40 group-hover:text-flame dark:text-cream/40">
              0{i + 1}
            </span>
          </a>
        ))}
        <a href="#kontak" onClick={onClose} className="btn mt-10 self-start">
          Ajak Kolaborasi →
        </a>
        <p className="mono-label mt-12 text-navy/50 dark:text-cream/50">
          DESIGNER & FRONTEND DEVELOPER — JAKARTA
        </p>
      </nav>
    </div>
  );
}
