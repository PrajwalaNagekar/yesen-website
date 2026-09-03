import { Link, createFileRoute, isNotFound, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarClock, Cpu, MapPin } from "lucide-react";

import {
  fetchProject,
  fetchProjects,
  isValidProjectId,
  type ProjectRecord,
} from "@/api/projects";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { STATUS_DOT, STATUS_STYLES, projectNeighbours } from "@/lib/projects-log";

const PROJECTS_LIST_KEY = ["projects", "list"] as const;

export const Route = createFileRoute("/projects_/$projectId")({
  loader: async ({ params, context }) => {
    if (!isValidProjectId(params.projectId)) {
      throw notFound();
    }

    try {
      const project = await fetchProject(params.projectId);
      if (!project?.id) throw notFound();

      const cachedList = context.queryClient.getQueryData<{
        projects: ProjectRecord[];
        error: string | null;
      }>(PROJECTS_LIST_KEY);

      let projects = cachedList?.projects ?? [];

      if (!projects.length) {
        try {
          const { projects: items } = await fetchProjects({ limit: 100 });
          projects = items;
          context.queryClient.setQueryData(PROJECTS_LIST_KEY, {
            projects: items,
            error: null,
          });
        } catch {
          projects = [project];
        }
      }

      if (!projects.some((item) => item.id === project.id)) {
        projects = [project, ...projects];
      }

      return { project, projects };
    } catch (err) {
      if (isNotFound(err)) throw err;
      if (err && typeof err === "object" && "status" in err) {
        const status = (err as { status?: number }).status;
        if (status === 404 || status === 400) throw notFound();
      }
      throw err;
    }
  },
  staleTime: 5 * 60 * 1000,
  head: ({ loaderData }) => {
    if (!loaderData?.project) {
      return {
        meta: [
          { title: "Project not found | YESEN Technologies Pvt Ltd" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} | YESEN Technologies Pvt Ltd Projects`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(project.cover
          ? [
              { property: "og:image", content: project.cover },
              { name: "twitter:image", content: project.cover },
            ]
          : []),
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project, projects } = Route.useLoaderData() as {
    project: ProjectRecord;
    projects: ProjectRecord[];
  };

  const more = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-brand-ivory">
      <SiteHeader />

      <main className="px-6 pb-20 pt-28 sm:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <Link
            to="/projects"
            hash="project-log"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-navy/70 transition-colors hover:text-brand-forest"
          >
            <ArrowLeft size={14} /> Back to projects
          </Link>

          {project.cover ? (
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 h-[22rem] overflow-hidden rounded-lg"
            >
              <img
                src={project.cover}
                alt={project.title}
                className="h-full w-full object-cover"
                decoding="async"
              />
            </motion.div>
          ) : (
            <div className="mt-6 h-[22rem] rounded-lg bg-brand-navy/10" />
          )}

          <div className="mt-7 flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-display text-[1.9rem] font-light leading-tight text-brand-navy sm:text-[2.3rem]">
              {project.title}
            </h1>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] ${STATUS_STYLES[project.status]}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
              {project.statusLabel}
            </span>
          </div>

          <p className="mt-2 flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-navy/55">
            <MapPin size={12} strokeWidth={2} /> {project.country}
          </p>

          <div className="mt-6 grid gap-px overflow-hidden rounded-md border border-brand-navy/12 bg-brand-navy/10 sm:grid-cols-3">
            {[
              { icon: MapPin, label: "Location", value: project.country },
              { icon: CalendarClock, label: "Completion", value: project.timeline },
              { icon: Cpu, label: "Technology", value: project.technology },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/85 px-4 py-3">
                <p className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-navy/50">
                  <Icon size={11} strokeWidth={2} className="text-brand-blue" /> {label}
                </p>
                <p className="mt-1 text-[0.92rem] leading-snug text-brand-navy">{value}</p>
              </div>
            ))}
          </div>

          {project.summary ? (
            <p className="mt-6 max-w-3xl font-display text-[1.15rem] leading-relaxed text-brand-navy/90">
              {project.summary}
            </p>
          ) : null}

          <div className="mt-6 grid max-w-xl gap-px overflow-hidden rounded-md border border-brand-navy/12 bg-brand-navy/10 sm:grid-cols-2">
            {[
              { label: "Deployed", value: project.timeline },
              { label: "Status", value: project.statusLabel },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/85 px-4 py-3">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-navy/50">
                  {label}
                </p>
                <p className="mt-1 text-[0.92rem] leading-snug text-brand-navy">{value}</p>
              </div>
            ))}
          </div>

          {project.specs.filter(([k]) => k !== "Deployed" && k !== "Status").length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.specs
                .filter(([k]) => k !== "Deployed" && k !== "Status")
                .map(([k, v]) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-md border border-brand-navy/12 bg-white/80 px-4 py-3"
                  >
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-navy/50">
                      {k}
                    </p>
                    <p className="mt-1 text-[0.92rem] text-brand-navy">{v}</p>
                  </motion.div>
                ))}
            </div>
          ) : null}

          {project.body && project.body !== project.summary ? (
            <p className="mt-8 max-w-3xl text-[0.95rem] leading-[1.75] text-brand-navy/80">
              {project.body}
            </p>
          ) : null}

          {project.gallery.length > 0 ? (
            <div className="mt-10">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-navy/50">
                Site photography
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((src, index) => (
                  <motion.div
                    key={`${src}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                    className="overflow-hidden rounded-md border border-brand-navy/12 bg-white/80"
                  >
                    <img
                      src={src}
                      alt={`${project.title} site photo ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : null}

          <ProjectPager id={project.id} projects={projects} />

          {more.length > 0 ? (
            <div className="mt-14 border-t border-brand-navy/12 pt-8">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-navy/50">
                More projects
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {more.map((p) =>
                  isValidProjectId(p.id) ? (
                    <Link
                      key={p.id}
                      to="/projects/$projectId"
                      params={{ projectId: p.id }}
                      className="group overflow-hidden rounded-md border border-brand-navy/12 bg-white/80 transition-transform hover:-translate-y-1"
                    >
                      {p.cover ? (
                        <img
                          src={p.cover}
                          alt={p.title}
                          loading="lazy"
                          decoding="async"
                          className="h-28 w-full object-cover"
                        />
                      ) : (
                        <div className="h-28 w-full bg-brand-navy/10" />
                      )}
                      <p className="p-3 font-display text-[0.95rem] leading-snug text-brand-navy">
                        {p.title}
                      </p>
                    </Link>
                  ) : null,
                )}
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function ProjectPager({ id, projects }: { id: string; projects: ProjectRecord[] }) {
  const { prev, next } = projectNeighbours(id, projects);
  if (!prev || !next || projects.length < 2 || prev.id === next.id) return null;
  if (!isValidProjectId(prev.id) || !isValidProjectId(next.id)) return null;

  return (
    <div className="mt-12 grid gap-3 border-t border-brand-navy/12 pt-8 sm:grid-cols-2">
      {[
        { p: prev, dir: "Previous project", align: "left" as const },
        { p: next, dir: "Next project", align: "right" as const },
      ].map(({ p, dir, align }) => (
        <Link
          key={dir}
          to="/projects/$projectId"
          params={{ projectId: p.id }}
          className={`group flex items-center gap-3 rounded-md border border-brand-navy/12 bg-white/80 p-3 transition-all hover:-translate-y-0.5 hover:border-brand-blue ${
            align === "right" ? "sm:flex-row-reverse sm:text-right" : ""
          }`}
        >
          {p.cover ? (
            <img
              src={p.cover}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="h-14 w-20 shrink-0 rounded object-cover"
            />
          ) : (
            <div className="h-14 w-20 shrink-0 rounded bg-brand-navy/10" />
          )}
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-brand-navy/50">
              {align === "left" ? <ArrowLeft size={11} /> : null}
              {dir}
              {align === "right" ? <ArrowRight size={11} /> : null}
            </span>
            <span className="mt-1 block truncate font-display text-[0.95rem] text-brand-navy">
              {p.title}
            </span>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-brand-navy/45">
              {p.country} / {p.timeline}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
