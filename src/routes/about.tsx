import { ClientOnly, Link, createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  Compass,
  Cpu,
  Gauge,
  Leaf,
  Lightbulb,
  Ship,
  ShieldCheck,
  Sun,
  Waves,
  Wrench,
} from "lucide-react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

import { ManifestoPanel } from "@/components/ManifestoPanel";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { WORLD_DOTS } from "@/components/world-map-dots";

import heroVideo from "@/assets/about-hero.mp4.asset.json";
import ourStoryVideo from "@/assets/our-story.mp4.asset.json";
import brandElco from "@/assets/brand-elco.jpg";
import brandPhocos from "@/assets/brand-phocos.jpg";
import brandVsun from "@/assets/brand-vsun.jpg";
import brandYesen from "@/assets/brand-yesen-sustain.jpg";

const HeroWebGL = lazy(() => import("@/components/HeroWebGL"));

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | YESEN Technologies Pvt Ltd — Sustainable Marine Mobility" },
      {
        name: "description",
        content:
          "YESEN Technologies Pvt Ltd engineers sustainable marine mobility — electrification, clean energy integration, vessel management systems and advanced battery technologies.",
      },
      {
        property: "og:title",
        content: "About Us | YESEN Technologies Pvt Ltd — Sustainable Marine Mobility",
      },
      {
        property: "og:description",
        content:
          "Founded in 2019, YESEN delivers design, fabrication, retrofitting, testing, launching and commissioning for a cleaner marine industry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/about" }],
  }),
  component: AboutPage,
});

/* -------------------------------------------------------------------------- */
/* Motion helpers                                                             */
/* -------------------------------------------------------------------------- */

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

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
  const offset = from === "left" ? { x: -60, y: 0 } : from === "right" ? { x: 60, y: 0 } : { x: 0, y: 34 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line mask reveal used on the oversized editorial headlines. */
function MaskLines({ lines, className = "" }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <span ref={ref} className={`uc-mask ${inView ? "is-in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span key={line} className="uc-mask-line">
          <span className="uc-mask-inner" style={{ ["--mi" as string]: i }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */



const STORY_CARDS = [
  { title: "Founded in 2019", body: "Born from a conviction that clean marine mobility is overdue.", Icon: Compass },
  { title: "End-to-End Solutions", body: "Design, fabrication, retrofit, testing, launch and commissioning.", Icon: Wrench },
  { title: "Sustainable by Design", body: "Every system is engineered to lower emissions from day one.", Icon: Leaf },
  { title: "Engineering Excellence", body: "Marine-grade rigour across electrical, structural and software.", Icon: Gauge },
];

const VALUES = [
  { title: "Innovation", body: "We look past convention to find answers the water actually needs.", Icon: Lightbulb },
  { title: "Sustainability", body: "Cleaner waterways are the measure of every decision we make.", Icon: Leaf },
  { title: "Engineering Excellence", body: "Precision, testing and documentation on every deliverable.", Icon: Gauge },
  { title: "Responsibility", body: "To crews, coastlines and the communities that depend on them.", Icon: ShieldCheck },
];

const CAPABILITIES = [
  { title: "Vessel Design", body: "Hull, layout and systems design tuned for electric propulsion.", Icon: Ship },
  { title: "Marine Electrification", body: "Propulsion, drives and battery architecture for zero-emission runs.", Icon: BatteryCharging },
  { title: "Solar Integration", body: "Onboard and shore-side solar arrays sized to real duty cycles.", Icon: Sun },
  { title: "Retrofitting Solutions", body: "Converting existing fleets to clean power without losing service.", Icon: Wrench },
  { title: "Smart Monitoring Systems", body: "Telemetry, diagnostics and intelligent vessel management.", Icon: Cpu },
  { title: "Testing and Commissioning", body: "Sea trials, certification support and handover you can trust.", Icon: ShieldCheck },
];

/** Rotating word column — reference "OUR DIFFERENCE" band. */
const DIFF_WORDS = ["INNOVATIVE", "SUSTAINABLE", "PRECISE", "RESPONSIBLE"];

const LOCATIONS = [
  {
    name: "Kerala, India",
    x: 71.2,
    y: 52.6,
    entity: "YESEN Technologies Pvt Ltd",
    address: ["5th floor, YESEN Enclave, Vallamattam Estate", "Ravipuram, Kochi, Kerala 682015"],
    phone: "+91 77080 07554",
    lat: 9.9702,
    lng: 76.2807,
  },
  {
    name: "Delaware, USA",
    x: 25.4,
    y: 39.4,
    entity: "YESEN Technologies Inc.",
    address: ["8 The Green, Ste A", "Dover, DE 19901"],
    phone: "+1 917 609 8082",
    lat: 39.1573,
    lng: -75.5244,
  },
  {
    name: "Dubai, UAE",
    x: 65.1,
    y: 44.6,
    entity: "YESEN Technologies — MENA",
    address: ["206, Bin Sougat Building", "PO Box 6727, Dubai"],
    phone: "+971 58 670 6900",
    lat: 25.2582,
    lng: 55.3644,
  },
  {
    name: "Western Australia",
    x: 84.4,
    y: 76.5,
    entity: "YESEN Technologies Pvt Ltd",
    address: ["Unit 19, Level 2, 100 Railway Road", "Subiaco WA 6008"],
    phone: "+61 490 928 496",
    lat: -31.9483,
    lng: 115.8262,
  },
];

const STATS = [
  { label: "Countries served", value: 12 },
  { label: "Solar installations", value: 240, suffix: "+" },
  { label: "Projects completed", value: 85, suffix: "+" },
  { label: "Stakeholders impacted", value: 50, suffix: "k+" },
];

const PARTNERS = [
  { name: "Phocos", src: brandPhocos },
  { name: "V-Sun", src: brandVsun },
  { name: "Elco", src: brandElco },
  { name: "YESEN Technologies", src: brandYesen },
];

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

/** Scroll-parallax tile used in the staggered "Our Story" collage. */
function DriftTile({
  children,
  depth = 60,
  className = "",
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  return (
    <motion.div ref={ref} style={{ y }} className={`uc-tile ${className}`}>
      {children}
    </motion.div>
  );
}

/** Reference "OUR DIFFERENCE" band: fixed phrase + rotating word stack. */
function DifferenceBand() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % DIFF_WORDS.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="uc-diff">
      <div className="uc-diff-inner">
        <p className="uc-eyebrow">Our Difference</p>
        <span className="uc-diff-mark">::</span>
        <p className="uc-diff-phrase">Everything we build is</p>
        <ul className="uc-diff-words" aria-label="Yesen difference">
          {DIFF_WORDS.map((word, i) => (
            <li key={word} className={`uc-diff-word ${active === i ? "is-active" : ""}`}>
              {word}
            </li>
          ))}
        </ul>
        <span className="uc-diff-mark uc-diff-mark-end">::</span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function AboutPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);

  const [activeLocation, setActiveLocation] = useState(0);

  // Some browsers ignore the autoplay attribute on hydrated media; nudge it.
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const start = () => {
      const el = heroVideoRef.current;
      if (!el) return;
      el.muted = true;
      void el.play().catch(() => { });
    };
    start();
    const id = window.setTimeout(start, 600);
    window.addEventListener("pointerdown", start, { once: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("pointerdown", start);
    };
  }, []);



  return (
    <div className="about-page uc-about relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />
      <div className="about-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>

      <SiteHeader />

      <main className="relative z-10">
        {/* ------------------------------------------------ SECTION 1 — HERO */}
        <section ref={heroRef} className="relative isolate overflow-hidden">
          <ClientOnly fallback={null}>
            <Suspense fallback={null}>
              <HeroWebGL className="about-hero-gl" />
            </Suspense>
          </ClientOnly>
          <div className="about-ring about-ring-a" aria-hidden="true" />
          <div className="about-ring about-ring-b" aria-hidden="true" />

          <div className="about-hero-stage">
            <div className="about-hero-media" aria-hidden="true">
              <motion.video
                ref={heroVideoRef}
                src={heroVideo.url}
                style={{ y: heroImageY, scale: heroImageScale }}
                className="about-hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={(event) => {
                  const el = event.currentTarget;
                  el.muted = true;
                  void el.play().catch(() => { });
                }}
              />
              <div className="about-hero-scrim" />
            </div>

            <div className="uc-hero-inner">
              <motion.p
                className="uc-hero-kicker"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                Engineering the future of
              </motion.p>

              <h1 className="uc-hero-title">
                <MaskLines lines={["SUSTAINABLE MARINE", "MOBILITY"]} />
              </h1>

              <div className="uc-hero-foot">
                <motion.p
                  className="uc-hero-lede"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  YESEN Technologies Pvt Ltd develops sustainable engineering solutions for
                  marine transportation through electrification, clean energy integration, intelligent
                  vessel management systems, and advanced battery technologies.
                </motion.p>

                <motion.div
                  className="uc-hero-actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a href="#capabilities" className="about-btn about-btn-primary">
                    Explore Solutions <ArrowRight size={16} />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- SECTION 2 — OUR STORY */}
        <section className="uc-section">
          <div className="uc-shell uc-story">
            <div className="uc-story-copy">
              <div className="uc-story-sticky">
                <p className="uc-eyebrow">Our Story</p>
                <h2 className="uc-story-lead">
                  <MaskLines lines={["It’s not about us —", "it’s about the water."]} />
                </h2>
                <div className="uc-story-body">
                  <p>
                    YESEN Technologies Pvt Ltd was founded in 2019 to develop, integrate, and
                    deliver sustainable products and engineering solutions for the marine industry.
                  </p>
                  <p>We believe innovation becomes meaningful only when it solves real-world problems.</p>
                  <p>
                    Our expertise includes design, fabrication, retrofitting, testing, launching, and
                    commissioning.
                  </p>
                </div>
              </div>
            </div>

            <div className="uc-story-collage">
              <DriftTile depth={70} className="uc-tile-a">
                <div className="uc-frame uc-frame-video">
                  <video
                    className="uc-story-video"
                    src={ourStoryVideo.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    title="YESEN Technologies Pvt Ltd film"
                  />
                </div>
              </DriftTile>

              {STORY_CARDS.map(({ title, body, Icon }, i) => (
                <DriftTile
                  key={title}
                  depth={45 + i * 18}
                  className={["uc-tile-b", "uc-tile-c", "uc-tile-d", "uc-tile-e"][i]}
                >
                  <article className="uc-note">
                    <span className="about-icon">
                      <Icon size={18} />
                    </span>
                    <h3 className="uc-note-title">{title}</h3>
                    <p className="uc-note-body">{body}</p>
                  </article>
                </DriftTile>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------- SECTION 3 — OUR DIFFERENCE */}
        <DifferenceBand />

        {/* ------------------------------------- SECTION 4 — MISSION & VISION */}
        <section className="uc-section">
          <div className="uc-shell">
            <p className="uc-eyebrow">Our Mission &amp; Vision</p>
            <div className="uc-fea">
              {[
                {
                  label: "Mission",
                  body: "Accelerating the transition toward cleaner and smarter marine transportation.",
                  Icon: Compass,
                },
                {
                  label: "Vision",
                  body: "Creating cleaner waterways and a more sustainable future.",
                  Icon: Waves,
                },
              ].map(({ label, body, Icon }, i) => (
                <motion.article
                  key={label}
                  variants={rise}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.12 }}
                  className="uc-fea-panel"
                >
                  <span className="uc-fea-ghost" aria-hidden="true">
                    {label.toUpperCase()}
                  </span>
                  <span className="about-icon about-icon-lg">
                    <Icon size={22} />
                  </span>
                  <h3 className="uc-fea-title">{label.toUpperCase()}</h3>
                  <p className="uc-fea-body">{body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------ SECTION 5 — WHAT WE STAND FOR */}
        <section className="uc-section uc-stand">
          <div className="uc-shell">
            <div className="uc-stand-head">
              <h2 className="uc-big">
                <MaskLines lines={["WHAT WE", "STAND FOR"]} className="uc-big-mask" />
              </h2>
              <Reveal delay={0.12}>
                <p className="uc-stand-note">
                  Our values aren’t a list on the wall. They shape every decision we make, every
                  drawing we release and every vessel we put back on the water.
                </p>
              </Reveal>
            </div>

            <ul className="uc-rows">
              {VALUES.map(({ title, body, Icon }, i) => (
                <motion.li
                  key={title}
                  className="uc-row"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="uc-row-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="uc-row-title">{title.toUpperCase()}</h3>
                  <p className="uc-row-body">{body}</p>
                  <span className="uc-row-icon">
                    <Icon size={18} strokeWidth={1.4} />
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------ SECTION 6 — OUR CAPABILITIES */}
        <section id="capabilities" className="uc-section scroll-mt-16">
          <div className="uc-shell">
            <div className="uc-stand-head">
              <h2 className="uc-big">
                <MaskLines lines={["WHAT WE", "ACTUALLY DO"]} className="uc-big-mask" />
              </h2>
              <Reveal delay={0.12}>
                <p className="uc-stand-note">
                  Six disciplines, one delivery chain — from first sketch to sea trials and handover.
                </p>
              </Reveal>
            </div>

            <ul className="uc-rows">
              {CAPABILITIES.map(({ title, body, Icon }, i) => (
                <motion.li
                  key={title}
                  className="uc-row"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="uc-row-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="uc-row-title">{title.toUpperCase()}</h3>
                  <p className="uc-row-body">{body}</p>
                  <span className="uc-row-icon">
                    <Icon size={18} strokeWidth={1.4} />
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------- SECTION 7 — GLOBAL IMPACT */}
        <section className="uc-section">
          <div className="uc-shell">
            <div className="uc-trade-head">
              <h2 className="uc-big uc-big-stack">
                <MaskLines lines={["BUILT", "AROUND", "GLOBAL", "WATERS"]} className="uc-big-mask" />
              </h2>
              <Reveal delay={0.1} className="uc-trade-note">
                <p>
                  Yesen operates from offices in Kerala, Delaware, Dubai and Western Australia,
                  supported by a network of fabricators, integrators and service partners.
                </p>
                <p>
                  That footprint lets us hold local expertise close to the vessel while delivering
                  the same engineering standard across every market we serve.
                </p>
              </Reveal>
            </div>

            <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1.35fr_0.65fr]">
              <Reveal from="left" className="h-full">
                <div className="about-card about-map flex h-full flex-col">
                  <div className="about-map-canvas">
                    <svg viewBox="0 0 1000 500" className="about-map-grid" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                      <path className="about-map-land" d={WORLD_DOTS} />
                      {LOCATIONS.map((loc, i) => (
                        <circle
                          key={`halo-${loc.name}`}
                          className={`about-map-halo ${activeLocation === i ? "is-active" : ""}`}
                          cx={(loc.x / 100) * 1000}
                          cy={(loc.y / 100) * 500}
                          r={26}
                        />
                      ))}
                    </svg>

                    {LOCATIONS.map((loc, i) => (
                      <button
                        key={loc.name}
                        type="button"
                        onClick={() => setActiveLocation(i)}
                        style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        className={`about-marker ${activeLocation === i ? "is-active" : ""}`}
                        aria-label={loc.name}
                      >
                        <span className="about-marker-dot" />
                        <span className="about-marker-label">{loc.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {LOCATIONS.map((loc, i) => (
                      <button
                        key={`tab-${loc.name}`}
                        type="button"
                        onClick={() => setActiveLocation(i)}
                        className={`rounded-full border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-colors ${activeLocation === i
                          ? "border-brand-forest/40 bg-brand-forest/10 text-brand-forest"
                          : "border-brand-navy/12 bg-white/60 text-brand-navy/60 hover:text-brand-navy"
                          }`}
                      >
                        {loc.name}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
                    <div className="text-sm leading-relaxed text-brand-navy/70">
                      <p className="font-display text-lg text-brand-navy">{LOCATIONS[activeLocation].name}</p>
                      <p className="mt-2 font-medium text-brand-navy/85">{LOCATIONS[activeLocation].entity}</p>
                      {LOCATIONS[activeLocation].address.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                      <p className="mt-2 font-mono text-xs tracking-wide text-brand-navy/60">
                        {LOCATIONS[activeLocation].phone}
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-brand-navy/10 bg-white/60">
                      <iframe
                        key={LOCATIONS[activeLocation].name}
                        title={`Map of ${LOCATIONS[activeLocation].name} office`}
                        className="h-56 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://maps.google.com/maps?q=${LOCATIONS[activeLocation].lat},${LOCATIONS[activeLocation].lng}&z=15&hl=en&output=embed`}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal from="right" className="h-full">
                <div className="grid h-full gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-4">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="about-card about-stat flex flex-col justify-center">
                      <p className="display-xl text-4xl text-brand-navy">
                        <Counter to={stat.value} suffix={stat.suffix ?? ""} />
                      </p>
                      <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-navy/55">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- SECTION 8 — PARTNERS */}
        <section className="uc-section">
          <div className="uc-shell">
            <Reveal>
              <p className="uc-eyebrow">Trusted By</p>
              <h2 className="uc-big mt-4">
                <MaskLines lines={["OUR PARTNERS"]} className="uc-big-mask" />
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="about-card mt-6 overflow-hidden py-5">
                <div className="about-marquee">
                  <div className="about-marquee-track">
                    {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
                      <div key={`${p.name}-${i}`} className="about-logo">
                        <img decoding="async" src={p.src} alt={p.name} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------ SECTION 9 — CTA */}
        <section className="relative px-6 pb-10 pt-0 sm:px-12">
          <Reveal className="mx-auto w-full max-w-[100rem]">
            <div className="about-card about-cta text-center">
              <h2 className="display-xl text-[clamp(2rem,3.6vw,3.4rem)]">
                Partner with <span className="about-highlight">YESEN Technologies Pvt Ltd</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-[1.8] text-brand-navy/70">
                The next chapter of green mobility will not be written only on roads. It will also be
                written on water.
              </p>
              <div className="mt-6 flex justify-center">
                <Link to="/contact" className="about-btn about-btn-primary">
                  Start Your Journey <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <ManifestoPanel />

      <SiteFooter />
    </div>
  );
}
