import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarClock, Cpu, MapPin } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { fetchProjects, isValidProjectId, type ProjectRecord } from "@/api/projects";
import { STATUS_DOT, STATUS_STYLES, type ProjectStatus } from "@/lib/projects-log";

import { ProjectInquiryDrawer } from "@/components/ProjectInquiryDrawer";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

import heroFerry from "@/assets/hero-eferry-clean.jpg";
import pjHeroVideo from "@/assets/projects-hero.mp4.asset.json";

const PROJECTS_LIST_KEY = ["projects", "list"] as const;

export const Route = createFileRoute("/projects")({
  loader: async ({ context }) => {
    const cached = context.queryClient.getQueryData<{
      projects: ProjectRecord[];
      error: string | null;
    }>(PROJECTS_LIST_KEY);

    try {
      const { projects } = await fetchProjects({ limit: 100 });
      const result = { projects, error: null as string | null };
      context.queryClient.setQueryData(PROJECTS_LIST_KEY, result);
      return result;
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Failed to load projects";
      if (cached?.projects?.length) {
        return { projects: cached.projects, error: message };
      }
      return { projects: [] as ProjectRecord[], error: message };
    }
  },
  staleTime: 5 * 60 * 1000,
  head: () => ({
    meta: [
      { title: "Projects | YESEN Technologies Pvt Ltd — Real Projects, Real Impact" },
      {
        name: "description",
        content:
          "From vessel electrification to tourism infrastructure, explore YESEN Technologies Pvt Ltd projects delivered across India, USA and UAE.",
      },
      { property: "og:title", content: "Projects | YESEN Technologies Pvt Ltd — Real Projects, Real Impact" },
      {
        property: "og:description",
        content:
          "Solar electric ferries, houseboats and tourism infrastructure delivered across the globe by YESEN Technologies Pvt Ltd.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/projects" }],
  }),
  component: ProjectsPage,
});

/* -------------------------------------------------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right";
}) {
  const offset =
    from === "left" ? { x: -50, y: 0 } : from === "right" ? { x: 50, y: 0 } : { x: 0, y: 32 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

const TICKER =
  "LAT 09.4981° N · LONG 76.3388° E · KOCHI STATION · STATUS: ONLINE · 5 COUNTRIES · 12 ACTIVE DEPLOYMENTS · 48 MW INSTALLED";

const READOUTS = [
  { val: "48", lbl: "MW installed" },
  { val: "12", lbl: "Deployments" },
  { val: "05", lbl: "Countries" },
] as const;


const ROUTE_STOPS = [
  { n: "01", title: "01 — Consultation", copy: "Understanding site, scale and requirements." },
  { n: "02", title: "02 — Design", copy: "Engineering and full system design." },
  { n: "03", title: "03 — Fabrication", copy: "Quality build and integration." },
  { n: "04", title: "04 — Testing", copy: "Rigorous testing and quality assurance." },
  { n: "05", title: "05 — Commissioning", copy: "Deployment and sea trials." },
  { n: "06", title: "06 — Operations", copy: "Ongoing monitoring and support." },
] as const;

const PARTNERS = [
  { name: "C-DAC", role: "R&D partner" },
  { name: "CMLRE", role: "R&D partner" },
  { name: "Hypercraft", role: "OEM partner" },
  { name: "Elco", role: "OEM partner" },
  { name: "Polarium", role: "OEM partner" },
  { name: "TECO 2030", role: "OEM partner" },
  { name: "Victron Energy", role: "OEM partner" },
  { name: "EnArka", role: "OEM partner" },
] as const;

/* -------------------------------------------------------------------------- */

function SectionHead({
  tag,
  title,
  copy,
}: {
  tag: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal className="mx-auto w-full max-w-[100rem]">
      <p className="flex items-center gap-3 font-mono text-[0.5rem] uppercase tracking-[0.3em] text-brand-forest">
        <span className="h-px w-6 bg-brand-forest/60" />
        {tag}
      </p>
      <h2 className="pjx-heading mt-4">{title}</h2>
      {copy ? (
        <p className="mt-3 max-w-lg text-[0.95rem] leading-[1.9] text-brand-navy/70">{copy}</p>
      ) : null}
      <span className="pjx-rule" aria-hidden="true" />
    </Reveal>
  );
}



function ProjectsPage() {
  const { projects, error } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.14]);

  return (
    <div className="about-page relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10">
        {/* ------------------------------------------------------- TICKER BAR */}
        <div className="pj-header-clear overflow-hidden border-y border-brand-navy/10 bg-brand-navy py-2">
          <div className="flex whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brand-ivory/70 [animation:jm-ticker_36s_linear_infinite]">
            <span className="px-8">{TICKER}</span>
            <span className="px-8">{TICKER}</span>
            <span className="px-8">{TICKER}</span>
          </div>
        </div>

        {/* --------------------------------------- HERO — instrument panel */}
        <section ref={heroRef} className="relative isolate overflow-hidden">
          <div className="grid w-full lg:grid-cols-[0.9fr_1.1fr]">
            {/* left readout panel */}
            <div className="relative flex flex-col justify-between bg-brand-navy px-6 py-14 sm:px-12 lg:py-20">
              <Reveal>

                <h1 className="display-xl mt-8 text-[clamp(2.3rem,5vw,4.4rem)] leading-[1.06] text-brand-ivory">
                  Clean energy, engineered for water, land and{" "}
                  <span className="text-brand-leaf">everywhere between</span>
                </h1>
                <p className="mt-6 max-w-md text-[0.95rem] leading-[1.9] text-brand-ivory/70">
                  Solar-electric marine systems, off-grid power and smart infrastructure — deployed
                  across India, the Gulf and the Pacific.
                </p>
                <a
                  href="#project-log"
                  className="mt-8 inline-flex items-center gap-2 border border-brand-ivory/40 px-6 py-3 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-brand-ivory transition-colors hover:border-brand-leaf hover:bg-brand-leaf hover:text-brand-navy"
                >
                  View project log <ArrowRight size={14} />
                </a>
              </Reveal>

              <Reveal delay={0.15} className="mt-12">
                <div className="flex flex-wrap gap-10 border-t border-brand-ivory/15 pt-7">
                  {READOUTS.map((r) => (
                    <div key={r.lbl} className="font-mono">
                      <p className="text-[1.6rem] font-semibold leading-none text-brand-leaf">
                        {r.val}
                      </p>
                      <p className="mt-2 text-[0.58rem] uppercase tracking-[0.28em] text-brand-ivory/55">
                        {r.lbl}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* right image frame */}
            <div className="relative min-h-[22rem] overflow-hidden bg-brand-navy/90 lg:min-h-[34rem]">
              <motion.video
                src={pjHeroVideo.url}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                style={{ y: heroY, scale: heroScale }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span
                className="pointer-events-none absolute left-5 top-5 h-6 w-6 border-l-2 border-t-2 border-brand-leaf/80"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b-2 border-r-2 border-brand-leaf/80"
                aria-hidden="true"
              />
              <p className="absolute bottom-6 left-6 flex items-center gap-2 bg-brand-navy/60 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-brand-ivory/85 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-leaf" />
                Live deployment
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- PROJECT LOG */}
        <ProjectLogSection projects={projects} error={error} />


        {/* --------------------------------------------- EXECUTION ROUTE */}
        <section className="relative border-y border-brand-navy/10 bg-white/55 px-6 py-12 sm:px-12">
          <SectionHead tag="Execution route" title="From first contact to ongoing operations" />

          <div className="relative mx-auto mt-10 w-full max-w-[62rem]">

            <span
              className="absolute left-5 top-0 h-full w-px bg-brand-navy/15 sm:left-1/2 sm:-translate-x-1/2"
              aria-hidden="true"
            />

            {ROUTE_STOPS.map((s, i) => {
              const rightSide = i % 2 === 1;
              return (
                <Reveal
                  key={s.n}
                  delay={i * 0.06}
                  from={rightSide ? "right" : "left"}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="grid grid-cols-[2.5rem_1fr] items-start sm:grid-cols-[1fr_3rem_1fr]">
                    {/* left cell */}
                    <div
                      className={`hidden sm:block ${rightSide ? "" : "order-1 pr-8 text-right"}`}
                    >
                      {!rightSide ? (
                        <>
                          <p className="font-display text-[1.02rem] text-brand-navy">{s.title}</p>
                          <p className="mt-1.5 text-[0.85rem] leading-[1.8] text-brand-navy/65">
                            {s.copy}
                          </p>
                        </>
                      ) : null}
                    </div>

                    {/* node */}
                    <div className="order-2 flex justify-center">
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-brand-navy/40 bg-white font-mono text-[0.66rem] font-semibold text-brand-navy">
                        {s.n}
                      </span>
                    </div>

                    {/* right cell (also mobile content) */}
                    <div className="order-3 pl-6 sm:pl-8">
                      {rightSide ? (
                        <>
                          <p className="font-display text-[1.02rem] text-brand-navy">{s.title}</p>
                          <p className="mt-1.5 text-[0.85rem] leading-[1.8] text-brand-navy/65">
                            {s.copy}
                          </p>
                        </>
                      ) : (
                        <div className="sm:hidden">
                          <p className="font-display text-[1.02rem] text-brand-navy">{s.title}</p>
                          <p className="mt-1.5 text-[0.85rem] leading-[1.8] text-brand-navy/65">
                            {s.copy}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------- CERTIFIED ALLIANCES */}
        <section className="relative px-6 py-12 sm:px-12">
          <SectionHead tag="Certified alliances" title="Technology partners" />

          <div className="mx-auto mt-8 grid w-full max-w-[100rem] grid-cols-2 gap-px border border-brand-navy/12 bg-brand-navy/12 sm:grid-cols-4">

            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.04}>
                <div className="group relative h-full bg-white/80 px-4 py-9 text-center">
                  <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-brand-leaf opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-brand-leaf opacity-0 transition-opacity group-hover:opacity-100" />
                  <p className="font-display text-[0.98rem] text-brand-navy/70 transition-colors group-hover:text-brand-navy">
                    {p.name}
                  </p>
                  <p className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-brand-navy/45">
                    {p.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- CTA */}
        <section className="relative px-6 pb-16 pt-4 sm:px-12">
          <Reveal className="mx-auto w-full max-w-[100rem]">
            <div className="about-card pjx-cta">
              <div className="relative z-10 max-w-xl px-2 py-6 sm:px-6 sm:py-10">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-forest">
                  Log a new mission
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.6rem,2.9vw,2.6rem)] leading-[1.15] text-brand-blue">
                  Let&apos;s Build a <span className="about-highlight">Sustainable</span>
                  <br />
                  Marine Future Together.
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-[1.9] text-brand-navy/70">
                  Tell us about your site, your fleet, or your city — we&apos;ll get back with
                  what&apos;s possible.
                </p>
                <ProjectInquiryDrawer
                  triggerClassName="about-btn about-btn-primary mt-8"
                  triggerLabel="Get In Touch"
                />
              </div>

              <img
                decoding="async"
                src={heroFerry}
                alt="Solar electric ferry"
                loading="lazy"
                className="pjx-cta-shot"
              />
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ProjectCardContent({ project: p, index }: { project: ProjectRecord; index: number }) {
  return (
    <>
      <div className="relative h-40 overflow-hidden bg-brand-navy/5">
        {p.cover ? (
          <img
            src={p.cover}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : null}
        <span className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/0 to-transparent" />
        <span className="absolute bottom-3 left-3 font-mono text-[0.66rem] tracking-[0.2em] text-brand-ivory">
          {String(index + 1).padStart(3, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-[1.02rem] leading-snug text-brand-navy">{p.title}</h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-brand-navy/55">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={11} strokeWidth={2} /> {p.country}
          </span>
          <span className="text-brand-navy/25">/</span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarClock size={11} strokeWidth={2} /> {p.timeline}
          </span>
        </p>
        <p className="mt-2 flex items-start gap-1.5 text-left text-[0.78rem] leading-snug text-brand-navy/70">
          <Cpu size={12} strokeWidth={2} className="mt-[0.15rem] shrink-0 text-brand-blue" />
          {p.technology}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] ${STATUS_STYLES[p.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[p.status]}`} />
            {p.statusLabel}
          </span>
          {isValidProjectId(p.id) ? (
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-blue transition-colors group-hover:text-brand-forest">
              Learn more <ArrowRight size={13} />
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}

const FILTERS = [
  { key: "all", label: "All projects" },
  { key: "complete", label: "Complete" },
  { key: "progress", label: "In progress" },
  { key: "live", label: "Live" },
] as const;

function ProjectLogSection({
  projects,
  error,
}: {
  projects: ProjectRecord[];
  error: string | null;
}) {
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");
  const visible = useMemo(
    () => projects.filter((p) => filter === "all" || p.status === filter),
    [filter, projects],
  );

  return (
    <section id="project-log" className="relative scroll-mt-28 px-6 py-12 sm:px-12">
      <SectionHead
        tag="Projects"
        title="Execution across marine, solar and infrastructure"
        copy="Filter by status to browse ongoing and completed deployments."
      />

      <div className="mx-auto mt-8 flex w-full max-w-[100rem] flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] transition-colors ${filter === f.key
              ? "border-brand-navy bg-brand-navy text-brand-ivory"
              : "border-brand-navy/15 bg-white/70 text-brand-navy hover:border-brand-blue"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && projects.length === 0 ? (
        <p className="mx-auto mt-8 max-w-[84rem] rounded-md border border-brand-navy/12 bg-white/80 px-5 py-6 text-center text-sm text-brand-navy/70">
          {error}
        </p>
      ) : visible.length === 0 ? (
        <p className="mx-auto mt-8 max-w-[84rem] rounded-md border border-brand-navy/12 bg-white/80 px-5 py-6 text-center text-sm text-brand-navy/70">
          {projects.length === 0
            ? "Projects will appear here once published in the CMS."
            : "No projects match this filter."}
        </p>
      ) : (
        <div className="mx-auto mt-8 grid w-full max-w-[84rem] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 6) * 0.05}>
              {isValidProjectId(p.id) ? (
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: p.id }}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-brand-navy/12 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(11,42,74,0.10)]"
                >
                  <ProjectCardContent project={p} index={i} />
                </Link>
              ) : (
                <article className="group flex h-full flex-col overflow-hidden rounded-md border border-brand-navy/12 bg-white/80">
                  <ProjectCardContent project={p} index={i} />
                </article>
              )}
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
