import { useEffect, useRef } from "react";

import { onScrollFrame, quantize } from "@/lib/scroll-scrub";
import { attachMeshParallax, attachTilt } from "@/lib/pointer-tilt";


const TITLE_WORDS = ["Engineered", "cell", "to", "cloud", "—", "not", "just", "charged", "and", "shipped."];
const GRADIENT_WORDS = new Set(["cell", "cloud"]);

const SPECS = [
  {
    title: "IRS Approved LFP Marine Battery",
    note: "Certified marine-safe, not just marketed that way",
    pill: "Certified Safe",
  },
  {
    title: "Tier-1 LFP Cells + Integrated BMS",
    note: "Safety micro-controller built into every pack",
    pill: "High Reliability",
  },
  {
    title: "Liquid-Cooled Thermal Management",
    note: "Advanced cooling for safety and longevity",
    pill: "Longer Life",
  },
  {
    title: "Pre-Charge Circuit for Cell Balancing",
    note: "WiFi & Bluetooth monitoring, always on",
    pill: "Smart Control",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Real-Time Monitoring & Control",
    body: "Live vessel data, battery status, motor performance, and system health, at your fingertips.",
  },
  {
    num: "02",
    title: "Operational Cost & Data Analytics",
    body: "Track energy usage, predict maintenance needs, and optimize routes with actionable insights.",
  },
  {
    num: "03",
    title: "Access From Everywhere",
    body: "Web & mobile apps with data mining and predictive insights for proactive fleet management.",
  },
];

export default function TechDeepDive() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const meshRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cleanups: Array<() => void> = [];

    const title = titleRef.current;
    if (title) {
      const sub = subRef.current;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            if (sub) {
              sub.style.transition =
                "opacity .9s cubic-bezier(.16,1,.3,1) .5s, transform .9s cubic-bezier(.16,1,.3,1) .5s";
              sub.style.opacity = "1";
              sub.style.transform = "translateY(0)";
            }
            io.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(title);
      cleanups.push(() => io.disconnect());
    }


    const cards = Array.from(section.querySelectorAll<HTMLElement>(".td-reveal"));
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const update = () => {
      const vh = window.innerHeight;
      // Read every rect first, then write — mixing reads and writes forces the
      // browser to re-layout the whole page for each card.
      const measured = cards.map((card) => ({ card, top: card.getBoundingClientRect().top }));
      for (const { card, top } of measured) {
        if (top > vh + 120 || top < -vh) continue; // off-screen: nothing to scrub
        const p = clamp((vh - top) / (vh * 0.65), 0, 1);
        const eased = quantize(1 - Math.pow(1 - p, 3));
        if (card.dataset.scrub === String(eased)) continue;
        card.dataset.scrub = String(eased);
        card.style.opacity = String(eased);
        card.style.transform = `translate3d(0, ${((1 - eased) * 34).toFixed(1)}px, 0)`;
        if (eased > 0.96 && !card.classList.contains("in-view")) {
          card.classList.add("in-view", "shine");
        }
      }
    };
    cleanups.push(onScrollFrame(update));


    cleanups.push(attachMeshParallax(section, () => meshRef.current));

    /* spotlight + tilt on each glass card — rect cached, one write per frame */
    for (const card of Array.from(section.querySelectorAll<HTMLElement>(".td-glass"))) {
      cleanups.push(attachTilt(card, { rx: 4, ry: 5 }));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={sectionRef} id="technology" className="td-section">
      <div ref={meshRef} className="td-mesh" aria-hidden />
      <div className="td-grain" aria-hidden />

      <div className="td-head">
        <div className="td-eyebrow">The Technology</div>
        <h2 ref={titleRef} className="td-title">
          {TITLE_WORDS.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={
                GRADIENT_WORDS.has(word)
                  ? { color: "#4d8f18" }
                  : undefined
              }
            >
              {word}{" "}
            </span>
          ))}
        </h2>
        <p ref={subRef} className="td-sub">
          Every battery we ship is certified. Every vessel we fit is watched, live, from anywhere.
        </p>
      </div>

      <div className="td-wrap">
        <div className="td-glass td-battery td-reveal">
          <div className="td-battery-info">
            <div className="td-tag">
              <i />
              B-KOOL Battery Technology
            </div>
            <h3>Certified from the cell up</h3>
            <p className="td-lede">
              B-KOOL supports CAN &amp; Modbus data protocols for integration with vessel management systems,
              with real-time WiFi and Bluetooth monitoring built in.
            </p>

            {SPECS.map((s) => (
              <div key={s.title} className="td-spec">
                <span className="td-dot" />
                <div className="td-spec-body">
                  <b>{s.title}</b>
                  <span>{s.note}</span>
                </div>
                <span className="td-pill">{s.pill}</span>
              </div>
            ))}
          </div>

          <div className="td-visual">
            <span className="td-visual-caption">Live cell status</span>
            <div className="td-cell">
              <div className="td-cell-fill" />
              <div className="td-cell-pulse" />
              <div className="td-cell-label">B-KOOL</div>
            </div>
          </div>
        </div>

        <div className="td-flow">
          <div className="td-flow-line" aria-hidden>
            <span className="td-beam" />
          </div>
          <div className="td-flow-grid">
            {STEPS.map((s) => (
              <div key={s.num} className="td-glass td-step td-reveal">
                <div className="td-step-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
