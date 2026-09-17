import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../data/projects.js";

const EMPTY = {
  title: "",
  category: "WEB",
  year: String(new Date().getFullYear()),
  description: "",
  image: "",
  technologies: "",
  projectUrl: "",
  githubUrl: "",
};

export default function AddProjectModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setErrors({});
      // Fokus ke field pertama setelah transisi mulai
      const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
      const onKey = (e) => e.key === "Escape" && onClose();
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Nama project wajib diisi.";
    if (!form.description.trim()) errs.description = "Deskripsi wajib diisi.";
    if (!/^\d{4}$/.test(form.year.trim()))
      errs.year = "Tahun harus 4 digit angka.";
    if (!form.image.trim()) errs.image = "Image URL wajib diisi.";
    else if (!/^https?:\/\/.+/.test(form.image.trim()))
      errs.image = "URL harus diawali http:// atau https://";
    if (form.projectUrl && !/^https?:\/\/.+/.test(form.projectUrl.trim()))
      errs.projectUrl = "URL harus diawali http:// atau https://";
    if (form.githubUrl && !/^https?:\/\/.+/.test(form.githubUrl.trim()))
      errs.githubUrl = "URL harus diawali http:// atau https://";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onAdd({
      id: `custom-${Date.now()}`,
      title: form.title.trim(),
      category: form.category,
      year: form.year.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      projectUrl: form.projectUrl.trim(),
      githubUrl: form.githubUrl.trim(),
      custom: true,
    });
    onClose();
  };

  const fieldCls =
    "w-full border-2 border-navy/25 bg-transparent px-3 py-2 font-sans text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-flame dark:border-cream/25 dark:text-cream dark:placeholder:text-cream/35";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Tambah project baru"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="anim-rise max-h-[92vh] w-full max-w-xl overflow-y-auto border-2 border-navy bg-cream shadow-[10px_10px_0_#FF5738] dark:border-cream/50 dark:bg-[#12122a] dark:shadow-[10px_10px_0_rgba(255,87,56,0.55)]">
        <div className="flex items-center justify-between border-b-2 border-navy/15 px-6 py-4 dark:border-cream/15">
          <h3 className="font-display text-xl uppercase text-navy dark:text-cream">
            + Add Project
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="mono-label border-2 border-navy/25 px-2 py-1 text-navy/60 transition-colors hover:border-flame hover:text-flame dark:border-cream/25 dark:text-cream/60"
            aria-label="Tutup modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="grid gap-4 p-6">
          <label className="grid gap-1.5">
            <span className="mono-label text-navy/70 dark:text-cream/70">
              Project Name *
            </span>
            <input
              ref={firstFieldRef}
              type="text"
              value={form.title}
              onChange={set("title")}
              placeholder="cth: LASLES VPN"
              className={fieldCls}
            />
            {errors.title && (
              <span className="mono-label text-flame">{errors.title}</span>
            )}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="mono-label text-navy/70 dark:text-cream/70">
                Category
              </span>
              <select
                value={form.category}
                onChange={set("category")}
                className={fieldCls}
              >
                {CATEGORIES.filter((c) => c !== "ALL").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5">
              <span className="mono-label text-navy/70 dark:text-cream/70">
                Year *
              </span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={form.year}
                onChange={set("year")}
                className={fieldCls}
              />
              {errors.year && (
                <span className="mono-label text-flame">{errors.year}</span>
              )}
            </label>
          </div>

          <label className="grid gap-1.5">
            <span className="mono-label text-navy/70 dark:text-cream/70">
              Description *
            </span>
            <textarea
              rows={3}
              value={form.description}
              onChange={set("description")}
              placeholder="Deskripsi singkat project…"
              className={`${fieldCls} resize-y`}
            />
            {errors.description && (
              <span className="mono-label text-flame">
                {errors.description}
              </span>
            )}
          </label>

          <label className="grid gap-1.5">
            <span className="mono-label text-navy/70 dark:text-cream/70">
              Image URL *
            </span>
            <input
              type="url"
              value={form.image}
              onChange={set("image")}
              placeholder="https://…"
              className={fieldCls}
            />
            {errors.image && (
              <span className="mono-label text-flame">{errors.image}</span>
            )}
          </label>

          <label className="grid gap-1.5">
            <span className="mono-label text-navy/70 dark:text-cream/70">
              Technologies (pisahkan dengan koma)
            </span>
            <input
              type="text"
              value={form.technologies}
              onChange={set("technologies")}
              placeholder="React, Vite, Tailwind"
              className={fieldCls}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="mono-label text-navy/70 dark:text-cream/70">
                Project URL
              </span>
              <input
                type="url"
                value={form.projectUrl}
                onChange={set("projectUrl")}
                placeholder="https://…"
                className={fieldCls}
              />
              {errors.projectUrl && (
                <span className="mono-label text-flame">
                  {errors.projectUrl}
                </span>
              )}
            </label>
            <label className="grid gap-1.5">
              <span className="mono-label text-navy/70 dark:text-cream/70">
                GitHub URL
              </span>
              <input
                type="url"
                value={form.githubUrl}
                onChange={set("githubUrl")}
                placeholder="https://github.com/…"
                className={fieldCls}
              />
              {errors.githubUrl && (
                <span className="mono-label text-flame">
                  {errors.githubUrl}
                </span>
              )}
            </label>
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="btn btn--alt">
              BATAL
            </button>
            <button type="submit" className="btn">
              TAMBAH PROJECT →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
