import { useMemo, useState } from "react";
import { loadProjects, saveProjects } from "../data/projects.js";
import ProjectFilter from "./ProjectFilter.jsx";
import ProjectCarousel from "./ProjectCarousel.jsx";
import AddProjectModal from "./AddProjectModal.jsx";
import ProjectDetailModal from "./ProjectDetailModal.jsx";

export default function ProjectSection() {
  const [projects, setProjects] = useState(loadProjects);
  const [filter, setFilter] = useState("ALL");
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  const update = (next) => {
    setProjects(next);
    saveProjects(next);
  };

  const filtered = useMemo(
    () =>
      filter === "ALL"
        ? projects
        : projects.filter((p) => p.category === filter),
    [projects, filter]
  );

  const addProject = (project) => update([project, ...projects]);

  const deleteProject = (id) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    if (window.confirm(`Hapus project "${target.title}"?`)) {
      update(projects.filter((p) => p.id !== id));
      if (detail?.id === id) setDetail(null);
    }
  };

  return (
    <section id="karya" className="halftone border-t-2 border-navy/15 py-20 dark:border-cream/15">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Section head */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label mb-4 flex items-center gap-2 text-flame">
              <span className="reg-mark" aria-hidden="true">
                <span className="reg-mark-circle" />
              </span>
              01 — KARYA PILIHAN
            </p>
            <h2 className="font-display text-4xl uppercase leading-[0.95] text-navy sm:text-5xl lg:text-6xl dark:text-cream">
              Karya yang
              <br />
              sedang dibangun.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="btn btn--alt self-start md:self-auto"
          >
            + ADD PROJECT
          </button>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <ProjectFilter active={filter} onChange={setFilter} />
        </div>

        {/* Carousel */}
        <ProjectCarousel
          key={filter}
          projects={filtered}
          onOpen={setDetail}
          onDelete={deleteProject}
        />
      </div>

      <AddProjectModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addProject}
      />
      <ProjectDetailModal project={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
