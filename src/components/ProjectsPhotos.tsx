import { useEffect, useMemo, useRef, useState, type ReactNode, Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { fetchProjects, isValidProjectId, type ProjectRecord } from "@/api/projects";
import pp1 from "@/assets/proj-photo-1.jpg";
import pp2 from "@/assets/proj-photo-2.jpg";
import pp3 from "@/assets/proj-photo-3.jpg";
import pp4 from "@/assets/proj-photo-4.jpg";
import pp5 from "@/assets/proj-photo-5.jpg";
import pp6 from "@/assets/proj-photo-6.jpg";
import pp7 from "@/assets/proj-photo-7.jpg";
import pp8 from "@/assets/proj-photo-8.jpg";
import pp9 from "@/assets/proj-photo-9.jpg";

const TITLE_WORDS = ["From", "pilot", "to", "fleet", "—", "in", "our", "own", "photos."];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "ongoing", label: "Ongoing" },
  { key: "done", label: "Completed" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];
type Status = Exclude<FilterKey, "all">;

function progressPct() {
  const awarded = new Date("2025-11-13").getTime();
  const completion = new Date("2026-08-31").getTime();
  const now = Date.now();
  const span = completion - awarded;
  const elapsed = Math.max(0, Math.min(now - awarded, span));
  return Math.round((elapsed / span) * 100);
}

export default function ProjectsPhotos() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [pct, setPct] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [apiProjects, setApiProjects] = useState<ProjectRecord[]>([]);

  useEffect(() => {
    setPct(progressPct());
  }, []);

  useEffect(() => {
    let active = true;
    fetchProjects({ limit: 100 })
      .then(({ projects }) => {
        if (active && projects && projects.length > 0) {
          setApiProjects(projects);
        }
      })
      .catch(() => {
        // Graceful fallback to static slides on error
      });
    return () => {
      active = false;
    };
  }, []);

  /* filter pill indicator */
  useEffect(() => {
    const move = () => {
      const bar = filtersRef.current;
      if (!bar) return;
      const btn = bar.querySelector<HTMLElement>(".pj-filter.active");
      if (!btn) return;
      setIndicator({ left: btn.offsetLeft - 6, width: btn.offsetWidth });
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [filter]);

  /* title blur-to-focus reveal */
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const words = Array.from(title.querySelectorAll<HTMLElement>(".pj-word"));
    words.forEach((w, i) => {
      w.style.transition = `opacity .8s cubic-bezier(.16,1,.3,1) ${i * 0.045}s, transform .8s cubic-bezier(.16,1,.3,1) ${i * 0.045}s, filter .8s cubic-bezier(.16,1,.3,1) ${i * 0.045}s`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          words.forEach((w) => {
            w.style.opacity = "1";
            w.style.transform = "translateY(0)";
            w.style.filter = "blur(0px)";
          });
          const sub = subRef.current;
          if (sub) {
            sub.style.transition =
              "opacity .9s cubic-bezier(.16,1,.3,1) .5s, transform .9s cubic-bezier(.16,1,.3,1) .5s";
            sub.style.opacity = "1";
            sub.style.transform = "translateY(0)";
          }
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(title);
    return () => io.disconnect();
  }, []);

  /* staggered reveal for the filtered cards */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".pj-card"));
    cards.forEach((card) => card.classList.remove("in-view"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const siblings = Array.from(grid.querySelectorAll<HTMLElement>(".pj-card"));
          const i = siblings.indexOf(card);
          card.style.transitionDelay = `${i * 0.06}s`;
          card.classList.add("in-view");
          io.unobserve(card);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );

    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, [filter, apiProjects]);

  const staticSlides = useMemo<Array<{ id: string; status: Status; title: string; node: ReactNode }>>(
    () => [
      {
        id: "patratu",
        status: "ongoing",
        title: "Tourism Solar Houseboats",
        node: (
          <article className="pj-card">
            <div className="pj-img" style={{ backgroundImage: `url(${pp1})` }} />
            <div className="pj-scrim" />
            <div className="pj-shine" />
            <div className="pj-thumb br" style={{ backgroundImage: `url(${pp2})` }} />
            <div className="pj-content">
              <span className="pj-badge ongoing">
                <i />
                Ongoing
              </span>
              <h3>Tourism Solar Houseboats</h3>
              <div className="pj-loc">India</div>
              <p>
                2BHK &amp; 4BHK solar houseboats plus shore infrastructure — ticketing counter,
                jetty, waiting room.
              </p>
              <div className="pj-progress">
                <div className="pj-progress-meta">
                  <span>Awarded Nov 2025</span>
                  <span>{pct}% to completion</span>
                </div>
                <div className="pj-progress-track">
                  <div className="pj-progress-fill" style={{ ["--pct" as string]: `${pct}%` }} />
                </div>
              </div>
            </div>
          </article>
        ),
      },
      {
        id: "cial-ferry",
        status: "done",
        title: "CIAL Solar-Electric Ferry",
        node: (
          <article className="pj-card">
            <div className="pj-img" style={{ backgroundImage: `url(${pp3})` }} />
            <div className="pj-scrim" />
            <div className="pj-shine" />
            <div className="pj-content">
              <span className="pj-badge done">
                <i />
                Completed
              </span>
              <h3>CIAL Solar-Electric Ferry</h3>
              <div className="pj-loc">India</div>
              <p>Solar-electric passenger ferry in real daily service.</p>
            </div>
          </article>
        ),
      },
      {
        id: "rancare",
        status: "done",
        title: "Rancare Commercial Centre",
        node: (
          <article className="pj-card">
            <div className="pj-img" style={{ backgroundImage: `url(${pp4})` }} />
            <div className="pj-scrim" />
            <div className="pj-shine" />
            <div className="pj-value-tag">USD 188,471</div>
            <div className="pj-thumb tl" style={{ backgroundImage: `url(${pp5})` }} />
            <div className="pj-content">
              <span className="pj-badge done">
                <i />
                Completed
              </span>
              <h3>Rancare Commercial Centre</h3>
              <div className="pj-loc">USA</div>
              <p>212 solar modules — 114.48 kWp installed capacity.</p>
            </div>
          </article>
        ),
      },
      {
        id: "cial-boat",
        status: "done",
        title: "Electric Boat for CIAL",
        node: (
          <article className="pj-card">
            <div className="pj-img" style={{ backgroundImage: `url(${pp6})` }} />
            <div className="pj-scrim" />
            <div className="pj-shine" />
            <div className="pj-thumb br" style={{ backgroundImage: `url(${pp7})` }} />
            <div className="pj-content">
              <span className="pj-badge done">
                <i />
                Completed
              </span>
              <h3>Electric Boat for CIAL</h3>
              <div className="pj-loc">India</div>
              <p>Purpose-built electric craft delivered for Cochin International Airport.</p>
            </div>
          </article>
        ),
      },
      {
        id: "residential",
        status: "done",
        title: "Residential Solar Installations",
        node: (
          <article className="pj-card">
            <div className="pj-img" style={{ backgroundImage: `url(${pp8})` }} />
            <div className="pj-scrim" />
            <div className="pj-shine" />
            <div className="pj-thumb tl" style={{ backgroundImage: `url(${pp9})` }} />
            <div className="pj-content">
              <span className="pj-badge done">
                <i />
                Completed
              </span>
              <h3>Residential Solar Installations</h3>
              <div className="pj-loc">USA &amp; India</div>
              <p>Multiple house solar installations across both regions.</p>
            </div>
          </article>
        ),
      },
    ],
    [pct],
  );

  const slides = useMemo<Array<{ id: string; status: Status; node: ReactNode }>>(() => {
    const fallbackCovers = [pp1, pp3, pp4, pp6, pp8];

    const apiSlides = apiProjects.map((p, idx) => {
      const isOngoing = p.status === "progress";
      const isLive = p.status === "live";
      const status: Status = isOngoing ? "ongoing" : "done";
      const badgeClass = isOngoing ? "ongoing" : isLive ? "live" : "done";
      const badgeLabel = isOngoing ? "Ongoing" : isLive ? "Live" : "Completed";
      const coverUrl = p.cover || fallbackCovers[idx % fallbackCovers.length];

      return {
        id: p.id || `api-proj-${idx}`,
        status,
        node: (
          <article className="pj-card" key={p.id || idx}>
            <div className="pj-img" style={{ backgroundImage: `url(${coverUrl})` }} />
            <div className="pj-scrim" />
            <div className="pj-shine" />
            <div className="pj-content">
              <span className={`pj-badge ${badgeClass}`}>
                <i />
                {badgeLabel}
              </span>
              <h3>{p.title}</h3>
              <div className="pj-loc">{p.loc || p.country || "India"}</div>
              <p>{p.summary || p.body || ""}</p>
              {isOngoing && (
                <div className="pj-progress">
                  <div className="pj-progress-meta">
                    <span>{p.timeline && p.timeline !== "—" ? `Awarded ${p.timeline}` : "In progress"}</span>
                    <span>{pct}% to completion</span>
                  </div>
                  <div className="pj-progress-track">
                    <div className="pj-progress-fill" style={{ ["--pct" as string]: `${pct}%` }} />
                  </div>
                </div>
              )}
              {isValidProjectId(p.id) ? (
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: p.id }}
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-ivory/90 transition-colors hover:text-white"
                >
                  Learn more <ArrowRight size={13} />
                </Link>
              ) : null}
            </div>
          </article>
        ),
      };
    });

    if (!apiSlides.length) return staticSlides;

    const apiTitles = new Set(apiProjects.map((p) => p.title.trim().toLowerCase()));
    const extraStatic = staticSlides.filter((slide) => !apiTitles.has(slide.title.trim().toLowerCase()));

    return [...apiSlides, ...extraStatic];
  }, [apiProjects, staticSlides, pct]);

  const visible = useMemo(
    () => slides.filter((s) => filter === "all" || s.status === filter),
    [slides, filter],
  );

  return (
    <section id="projects" className="pj-section">
      <div className="pj-grain" aria-hidden />

      <div className="pj-head">
        <div className="pj-eyebrow">Proof of Work</div>
        <h2 ref={titleRef} className="pj-title">
          {TITLE_WORDS.map((w, i) => (
            <span key={`${w}-${i}`} className="pj-word">
              {w === "fleet" ? <em>fleet</em> : w}{" "}
            </span>
          ))}
        </h2>
        <p ref={subRef} className="pj-sub">
          Every image below is from an actual site — not stock photography.
        </p>
      </div>

      <div ref={filtersRef} className="pj-filters">
        <span
          className="pj-filter-indicator"
          style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
          aria-hidden
        />
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`pj-filter${filter === f.key ? " active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="pj-grid">
        {visible.map((s) => (
          <Fragment key={s.id}>{s.node}</Fragment>
        ))}
      </div>
    </section>
  );
}
