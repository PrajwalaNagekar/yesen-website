import { useEffect, useRef } from "react";

import { onScrollFrame } from "@/lib/scroll-scrub";

type Row = {
  stat: string;
  statSub: string;
  title: string;
  body: React.ReactNode;
};

const ROWS: Row[] = [
  {
    stat: "2019",
    statSub: "founded",
    title: "In passenger service since 2021",
    body: (
      <>
        Founded in <strong>2019</strong>. Our solar-electric ferry entered regular passenger service on{" "}
        <strong>Vembanad Lake, Kerala in 2021</strong> — the CIAL Vembanad project.
      </>
    ),
  },
  {
    stat: "IRS",
    statSub: "approved",
    title: "Marine-certified battery systems",
    body: (
      <>
        The <strong>B-KOOL pack is IRS-approved</strong>: Tier-1 LFP cells, integrated BMS, liquid cooling, and
        WiFi/Bluetooth monitoring.
      </>
    ),
  },
  {
    stat: "10+",
    statSub: "vessel types",
    title: "Retrofit or new build",
    body: (
      <>
        E-MARINE kits electrify houseboats, shikaras, ferries, RORO and barges. We also deliver new-build vessels end
        to end — design, fabrication, testing, launch, commissioning.
      </>
    ),
  },
  {
    stat: "200+",
    statSub: "installs",
    title: "Work on land as well as water",
    body: (
      <>
        <strong>200+ MNRE-registered solar installations across Kerala</strong>, plus completed commercial projects in
        Guam and Abu Dhabi.
      </>
    ),
  },
  {
    stat: "3 yr",
    statSub: "payback",
    title: "The economics work out",
    body: (
      <>
        No fuel, no emissions, and far fewer moving parts than an IC drivetrain — typically a{" "}
        <strong>three-year payback</strong> once fuel and maintenance savings are counted.
      </>
    ),
  },
];

export default function WhyYesen() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cleanups: Array<() => void> = [];

    /* single-shot reveal per row */
    const rows = Array.from(section.querySelectorAll<HTMLElement>(".why-row"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.28 },
    );
    rows.forEach((r) => io.observe(r));
    cleanups.push(() => io.disconnect());

    /* scroll progress line — transform only, so it never triggers layout */
    const measureTrack = () => {
      const list = listRef.current;
      const fill = fillRef.current;
      if (!list || !fill) return;
      const rect = list.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -vh * 0.2 || rect.top > vh * 1.2) return;
      const total = rect.height || 1;
      const visible = Math.min(total, Math.max(0, vh * 0.65 - rect.top));
      const next = (Math.round((Math.min(1, visible / total) * 100) / 2) * 2) / 100;
      if (fill.dataset.p === String(next)) return;
      fill.dataset.p = String(next);
      fill.style.transform = `scaleY(${next})`;
    };
    cleanups.push(onScrollFrame(measureTrack));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={sectionRef} id="why-yesen" className="why-section">
      <div className="why-head">
        <div className="why-eyebrow">Why YESEN</div>
        <h2 className="why-title">
          <span className="line">
            <span>Proven on the water,</span>
          </span>
          <span className="line">
            <span>not just on paper.</span>
          </span>
        </h2>
        <span className="why-underline" />
        <p className="why-sub">
          Every point below is something already built, certified, or in service.
        </p>
      </div>

      <div ref={listRef} className="why-list">
        <div className="why-track">
          <div ref={fillRef} className="why-track-fill" />
        </div>

        {ROWS.map((row) => (
          <div key={row.title} className="why-row">
            <span className="why-node" />
            <div className="why-medal">
              <div className="why-stat">
                {row.stat}
                <span>{row.statSub}</span>
              </div>
            </div>
            <div className="why-body">
              <h3>{row.title}</h3>
              <p>{row.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
