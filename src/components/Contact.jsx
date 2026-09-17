export default function Contact() {
  return (
    <section
      id="kontak"
      className="halftone border-t-2 border-navy/15 py-20 dark:border-cream/15"
    >
      <div className="mx-auto max-w-[1180px] px-6">
        <p className="mono-label mb-4 flex items-center gap-2 text-flame">
          <span className="reg-mark" aria-hidden="true">
            <span className="reg-mark-circle" />
          </span>
          03 — KONTAK
        </p>

        <h2 className="title-3d mb-8 max-w-[16ch] font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.95] text-navy dark:text-cream">
          Ada ide yang perlu dibangun?
        </h2>

        <p className="mb-10 max-w-md leading-relaxed text-navy/75 dark:text-cream/75">
          Ceritakan project Anda — saya bantu dari konsep, desain, sampai
          kode terakhir. Kolaborasi bisa dimulai dari satu email singkat.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="mailto:halo@aliefp.dev" className="btn">
            HALO@ALIEFP.DEV →
          </a>
          <a
            href="https://github.com/fardanbakhtiyar"
            target="_blank"
            rel="noreferrer"
            className="btn btn--alt"
          >
            GITHUB ↗
          </a>
        </div>

        <footer className="mt-16 flex flex-col gap-3 border-t-2 border-navy/15 pt-6 dark:border-cream/15 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label flex items-center gap-2 text-navy/50 dark:text-cream/50">
            <span className="reg-mark text-flame" aria-hidden="true">
              <span className="reg-mark-circle" />
            </span>
            © {new Date().getFullYear()} ALIEF.P — JAKARTA
          </p>
          <p className="mono-label text-navy/50 dark:text-cream/50">
            DESIGNED & BUILT WITH REACT + TAILWIND
          </p>
        </footer>
      </div>
    </section>
  );
}
