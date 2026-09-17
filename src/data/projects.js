export const CATEGORIES = [
  "ALL",
  "WEB",
  "UI/UX",
  "BRANDING",
  "MOBILE",
  "GRAPHIC",
  "OTHER",
];

export const PROJECTS = [
  {
    id: "lasles-vpn",
    title: "LASLES VPN",
    category: "UI/UX",
    year: "2025",
    description:
      "Responsive landing page built with React and Tailwind CSS. Fokus pada hierarchy tipografi, kecepatan load, dan konversi.",
    image:
      "/laslesVPN.png",
    technologies: ["React", "Vite", "Tailwind"],
    projectUrl: "https://lasles-vpn-lemon.vercel.app/",
    githubUrl: "https://github.com/pardannn-ba/Lasles-VPN",
    custom: false,
  },
  {
    id: "album-film",
    title: "ALBUM FILM",
    category: "UI/UX",
    year: "2025",
    description:
      "Identitas visual digital untuk studio kopi lokal: logotype, palet warna tanah, dan sistem kemasan daur ulang.",
    image:
      "/albumFilm.png",
    technologies: ["React", "Vite", "Tailwind"],
    projectUrl: "https://album-film.vercel.app/",
    githubUrl: "https://github.com/pardannn-ba/AlbumFilm",
    custom: false,
  },
  {
    id: "company-profile",
    title: "COMPANY PROFILE",
    category: "WEB",
    year: "2024",
    description:
      "Aplikasi pembaca majalah independen dengan grid tipografi eksperimental dan mode baca malam.",
    image:
      "/companyProfile.png",
    technologies: ["React", "Vite", "tailwind"],
    projectUrl: "https://legacy-company.vercel.app/",
    githubUrl: "https://github.com/pardannn-ba/Legacy-Company",
    custom: false,
  },
  {
    id: "kopi-sore",
    title: "KOPI SORE",
    category: "BRANDING",
    year: "2024",
    description:
      "Landing page Kopi Sore dengan desain hangat, modern, dan responsif.",
    image:
      "/kopiSore.png",
    technologies: ["Photoshop", "Risograph"],
    projectUrl: "https://kopi-sore-sand.vercel.app/",
    githubUrl: "https://github.com/pardannn-ba/Kopi-Sore",
    custom: false,
  },
  {
    id: "tenun-track",
    title: "TENUN TRACKER",
    category: "MOBILE",
    year: "2023",
    description:
      "Aplikasi katalog kain tenun tradisional dari lima daerah, dengan dokumentasi motif dan asal-usulnya.",
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1200&q=80&auto=format&fit=crop",
    technologies: ["React Native", "Firebase"],
    projectUrl: "",
    githubUrl: "https://github.com/fardanbakhtiyar/tenun-tracker",
    custom: false,
  },
  {
    id: "arsip-type",
    title: "ARSIP TIPOGRAFI",
    category: "OTHER",
    year: "2023",
    description:
      "Eksperimen arsip spesimen huruf Nusantara dalam format web interaktif.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80&auto=format&fit=crop",
    technologies: ["JavaScript", "Canvas"],
    projectUrl: "",
    githubUrl: "",
    custom: false,
  },
];

const STORAGE_KEY = "portfolio.projects.v1";

export function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return PROJECTS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return PROJECTS;
    return parsed;
  } catch {
    return PROJECTS;
  }
}

export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    /* storage penuh / private mode — abaikan */
  }
}
