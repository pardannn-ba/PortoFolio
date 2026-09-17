import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import MobileMenu from "./MobileMenu.jsx";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#karya", label: "Karya" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b-2 bg-cream transition-shadow duration-200 dark:bg-[#0d0d1f] ${
          scrolled
            ? "border-navy/70 shadow-[0_2px_0_rgba(21,21,45,0.08)] dark:border-cream/30"
            : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
          <a
            href="#home"
            className="flex items-center gap-2 font-mono text-lg font-bold tracking-widest text-navy dark:text-cream"
            onClick={close}
          >
            <span className="reg-mark text-flame" aria-hidden="true">
              <span className="reg-mark-circle" />
            </span>
            ALIEF.P
          </a>

          {/* Desktop */}
          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Navigasi utama"
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
            <ThemeToggle />
            <a href="#kontak" className="btn px-4! py-2! text-xs!">
              AJAK KOLABORASI
            </a>
          </nav>

          {/* Mobile: hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              className="group relative flex h-10 w-10 items-center justify-center border-2 border-navy/70 text-navy transition-colors hover:border-flame hover:text-flame dark:border-cream/50 dark:text-cream"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={close} />
    </>
  );
}
