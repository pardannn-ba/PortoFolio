import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`mono-label inline-flex items-center gap-2 border-2 px-2.5 py-1.5 transition-colors duration-200 hover:border-flame hover:text-flame ${
        isDark
          ? "border-cream/40 text-cream hover:bg-cream/10"
          : "border-navy/30 text-navy"
      } ${className}`}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
      <span className="hidden sm:inline">{isDark ? "LIGHT" : "DARK"}</span>
    </button>
  );
}
