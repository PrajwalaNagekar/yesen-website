import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  CircuitBoard,
  MapPin,
  Ship,
  Sun,
  Waves,
  Workflow,
  Wrench,
  Palmtree,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { fetchSolutions, solutionImageUrl, type Solution } from "@/api/solutions";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { EMarineInquiryDrawer } from "@/components/EMarineInquiryDrawer";
import { useHydrated } from "@/hooks/use-hydrated";

import retrofitSunboat from "@/assets/retrofit-sunboat.png.asset.json";
import sunBoatAsset from "@/assets/sunboat-ii.png.asset.json";
import cialVembanadAsset from "@/assets/cial-vembanad.png.asset.json";
import shikaraAsset from "@/assets/shikara-emarine.png.asset.json";
import emarineRetrofitAsset from "@/assets/emarine-retrofit-batteries.png.asset.json";
import goElectricAsset from "@/assets/retrofit-go-electric.png.asset.json";
import benefitsAsset from "@/assets/retrofit-benefits.png.asset.json";
import emarineRetrofitNoLogo from "@/assets/videoplayback-no-logo.mp4.asset.json";
import sunboatFilm from "@/assets/sunboat-ii-4k.mp4.asset.json";
import cialVembanadFilm from "@/assets/cial-vembanad.mp4.asset.json";
import shikaraFilm from "@/assets/shikara.mp4.asset.json";
import ciftEnvironmentDay from "@/assets/cift-environment-day.mp4.asset.json";

import locKerala from "@/assets/ongoing-houseboat.jpg";
import locGuam from "@/assets/project-guam-2.jpg";
import locAbu from "@/assets/project-carport.jpg";
import locJharkhand from "@/assets/ongoing-patratu-dam.jpg";

const TONES = ["teal", "leaf", "violet", "blue"] as const;
const ICONS = [CircuitBoard, Sun, Workflow, Ship, Palmtree, Wrench] as const;

export const Route = createFileRoute("/solutions")({
  loader: async () => {
    try {
      const solutions = await fetchSolutions();
      return { solutions, error: null as string | null };
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Failed to load solutions";
      return { solutions: [] as Solution[], error: message };
    }
  },
  head: () => ({
    meta: [
      { title: "Solutions | YESEN Technologies Pvt Ltd — Sustainable Marine Solutions" },
      {
        name: "description",
        content:
          "Marine electrification, solar integration, retrofits, smart connected systems, new vessel engineering, tourism and shore infrastructure solutions for a cleaner tomorrow.",
      },
      {
        property: "og:title",
        content: "Solutions | YESEN Technologies Pvt Ltd — Sustainable Marine Solutions",
      },
      {
        property: "og:description",
        content:
          "Integrated engineering solutions combining innovation, technology and sustainability to transform the future of marine transportation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/solutions" }],
  }),
  component: SolutionsPage,
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
    from === "left" ? { x: -60, y: 0 } : from === "right" ? { x: 60, y: 0 } : { x: 0, y: 34 };
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

const LOCATIONS = [
  { place: "Kerala", country: "India", src: locKerala },
  { place: "Guam", country: "USA", src: locGuam },
  { place: "Abu Dhabi", country: "UAE", src: locAbu },
  { place: "Jharkhand", country: "India", src: locJharkhand },
];


/* -------------------------------------------------------------------------- */

function SolutionCard({
  title,
  sub,
  items,
  image,
  Icon,
  tone,
  index,
  solutionId,
}: {
  title: string;
  sub: string;
  items: string[];
  solutionId?: string;
  image: string;
  Icon: typeof Sun;
  tone: "teal" | "blue" | "violet" | "leaf";
  index?: number;
}) {
  return (
    <article className={`sol-big sol-${tone}`}>
      <div className="sol-big-copy">
        {index !== undefined && (
          <span className="sol-ghost" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        <div className="relative z-[2]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur">
              <Icon size={19} strokeWidth={1.7} />
            </span>
            {index !== undefined && (
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-white/45">
                {String(index + 1).padStart(2, "0")} / Solution
              </span>
            )}
          </div>

          <div className="sol-rule mt-8" />

          <h3 className="mt-8 font-display text-[clamp(1.9rem,3.6vw,3.5rem)] uppercase leading-[1.02] tracking-[-0.015em] text-white">
            {title}
          </h3>
          <p className="mt-5 max-w-md text-[0.95rem] leading-[1.9] text-white/65">{sub}</p>

          <ul className="mt-8 grid max-w-lg gap-2.5 sm:grid-cols-2">
            {items.map((it) => (
              <li key={it} className="flex items-center gap-2.5 text-sm text-white/75">
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-sky/25 text-brand-sky ring-1 ring-brand-sky/40">
                  <Check size={10} strokeWidth={3} />
                </span>
                {it}
              </li>
            ))}
          </ul>

          {solutionId ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/solutions/$solutionId"
                params={{ solutionId }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white transition-colors hover:border-brand-sky hover:bg-white/5"
              >
                Learn more <ArrowRight size={13} />
              </Link>

            </div>
          ) : null}
        </div>
      </div>

      <div className="sol-big-media">
        {image ? (
          <img decoding="async" src={image} alt={title} loading="lazy" />
        ) : null}
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */

/** Native sticky stack: each full-screen card slides up and covers the previous one. */
function StackCard({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div className="sol-slide" style={{ zIndex: index + 1 }}>
      {children}
    </div>
  );
}

const CTA_SLIDES = [goElectricAsset.url, benefitsAsset.url];

/** Auto-advancing slideshow: each frame slides in from the right. */
function CtaSlideshow() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % CTA_SLIDES.length), 4200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="sol-cta-shot relative overflow-hidden" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.img
          key={CTA_SLIDES[i]}
          src={CTA_SLIDES[i]}
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
          initial={{ x: "100%", opacity: 0.4 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-40%", opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
    </div>
  );
}



/* -------------------------------------------------------------------------- */

function SolutionsPage() {
  const { solutions, error } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const hydrated = useHydrated();



  return (
    <div className="relative min-h-screen bg-white font-sans text-brand-navy antialiased">
      <SiteHeader />

      <main className="relative z-10">
        {/* ------------------------------------------------------------ HERO */}
        <section
          ref={heroRef}
          className="hero-safe-top relative isolate flex min-h-[66vh] items-center justify-center overflow-hidden px-6 py-16 pt-24 sm:px-12 sm:pt-28"
        >
          <div className="about-ring about-ring-a" aria-hidden="true" />
          <div className="about-ring about-ring-b" aria-hidden="true" />

          <motion.div
            style={{ y: heroY, opacity: heroFade }}
            className="relative z-10 mx-auto w-full max-w-4xl text-center"
          >
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy/12 bg-white/70 px-2.5 py-1 font-mono !text-[0.5rem] uppercase tracking-[0.18em] text-brand-forest shadow-[0_10px_30px_-20px_rgb(12_46_92/0.6)] backdrop-blur-xl sm:px-3 sm:py-1.5 sm:!text-[0.55rem] sm:tracking-[0.22em] lg:gap-2 lg:px-4 lg:py-1.5 lg:!text-[0.62rem] lg:tracking-[0.3em]">
                <Waves size={10} className="about-float lg:h-[13px] lg:w-[13px]" /> Our Solutions
              </span>

              <h1 className="display-xl mx-auto mt-8 max-w-3xl text-[clamp(2.3rem,5vw,4.4rem)] leading-[1.06]">
                Sustainable Marine Solutions for a{" "}
                <span className="about-highlight">Cleaner Tomorrow</span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-[1.02rem] leading-[1.95] text-brand-navy/75">
                Integrated engineering solutions that combine innovation, technology, and
                sustainability to transform the future of marine transportation.
              </p>

              <div className="mt-8 h-1" />
            </Reveal>
          </motion.div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.35em] text-brand-navy/40"
          >
            Scroll
          </div>
        </section>

        {/* ------------------------------------------------- STACKED CARDS */}
        <section id="catalogue" className="sol-stack relative scroll-mt-0">
          {error ? (
            <div className="mx-auto max-w-[100rem] px-6 py-16 text-center text-sm text-brand-navy/70 sm:px-12">
              {error}
            </div>
          ) : solutions.length === 0 ? (
            <div className="mx-auto max-w-[100rem] px-6 py-16 text-center text-sm text-brand-navy/70 sm:px-12">
              Solutions will appear here once published in the CMS.
            </div>
          ) : (
            solutions.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              const tone = TONES[i % TONES.length];
              const image = solutionImageUrl(s) || "";
              const items =
                (s.features?.length ?? 0) > 0
                  ? s.features!.filter(Boolean)
                  : (s.benefits?.length ?? 0) > 0
                    ? s.benefits!.map((b) => b.point).filter(Boolean)
                    : s.stats?.map((st) => `${st.value} ${st.label}`).filter(Boolean) || [];

              return (
                <StackCard key={s._id} index={i}>
                  <SolutionCard
                    title={s.name}
                    sub={s.tagline || s.description || ""}
                    items={items}
                    image={image}
                    Icon={Icon}
                    tone={tone}
                    index={i}
                    solutionId={s._id}
                  />
                </StackCard>
              );
            })
          )}
        </section>


        {/* ------------------------------------------------ RETROFIT BAND */}
        <section className="relative px-6 py-10 sm:px-12 lg:py-12">
          <Reveal className="mx-auto w-full max-w-[100rem]">
            <div className="mx-auto max-w-6xl">
              <div className="mb-6 flex items-baseline justify-between">
                <div>
                  <h2 className="font-display text-[clamp(1.4rem,2.2vw,2rem)] text-brand-blue">
                    Retrofit Solutions
                  </h2>
                  <p className="mt-0.5 text-sm text-brand-navy/65">
                    Transforming existing vessels for a sustainable future
                  </p>
                </div>
              </div>

              <RetrofitShowcase />

            </div>
          </Reveal>
        </section>




        {/* --------------------------------------------------- IOT CAPABILITIES */}
        <section className="relative px-6 py-12 sm:px-12 lg:py-12">
          <div className="mx-auto grid w-full max-w-[100rem] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal className="sol-iot-left">
              <p className="text-[clamp(2.6rem,6vw,5.5rem)] font-bold leading-[1] tracking-tight text-brand-forest">
                IoT
              </p>
              <p className="mt-2 text-[0.9rem] font-medium tracking-wide text-brand-navy/70">
                Integration Capabilities
              </p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-navy">
                Smart Connected<br />Marine Systems
              </h2>
            </Reveal>

            <div className="space-y-5">
              {[
                {
                  num: "01",
                  title: "Real Time Monitoring & Control",
                  body: "Live vessel data, battery status, motor performance, and system health at your fingertips.",
                },
                {
                  num: "02",
                  title: "Know Operational Cost & Data Analytics",
                  body: "Track energy usage, predict maintenance needs, and optimize routes with actionable insights.",
                },
                {
                  num: "03",
                  title: "Access from Everywhere",
                  body: "Web & mobile apps with data mining and predictive insights for proactive fleet management.",
                },
              ].map((card, i) => (
                <Reveal key={card.num} delay={i * 0.1}>
                  <div className="sol-iot-card group">
                    <span className="sol-iot-num" aria-hidden="true">
                      {card.num}
                    </span>
                    <div className="relative z-10">
                      <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-[0.85rem] leading-[1.7] text-white/85">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------- SYSTEM IN MOTION */}
        <section className="relative px-6 py-8 sm:px-12 lg:py-10">
          <div className="mx-auto w-full max-w-[100rem]">
            <Reveal>
              <div className="grid items-center gap-8 py-6 sm:py-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
                <div className="overflow-hidden rounded-2xl bg-brand-navy/90">
                  <video
                    className="block h-full w-full object-cover"
                    src={ciftEnvironmentDay.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="CIFT environment story on green boating"
                  />
                </div>


                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand-blue">
                    Proven in the water
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.15] tracking-[-0.02em] text-brand-navy">
                    Our systems, running in real operating conditions
                  </h2>
                  <p className="mt-4 text-[0.95rem] leading-[1.9] text-brand-navy/70">
                    Every solution we deliver is validated on the water before it is delivered to an
                    operator. Propulsion, energy storage, thermal management and onboard telemetry
                    are commissioned as one integrated system — then tuned against real load
                    profiles, tides and duty cycles.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      "Silent, vibration-free electric propulsion with instant torque control",
                      "Marine-grade battery packs with active thermal and BMS protection",
                      "Live telemetry for range, state of charge and energy per nautical mile",
                      "Retrofit-ready architecture that fits existing hulls and drivelines",
                    ].map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-[0.88rem] leading-[1.7] text-brand-navy/75"
                      >
                        <span
                          className="mt-[0.55rem] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-blue"
                          aria-hidden="true"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>


        {/* -------------------------------------------------------- CTA */}
        <section className="relative px-6 pb-20 pt-4 sm:px-12">
          <Reveal className="mx-auto w-full max-w-[100rem]">
            <div className="about-card sol-cta">
              <div className="relative z-10 max-w-xl">
                <h2 className="display-xl text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.12]">
                  Let&apos;s Build a Sustainable{" "}
                  <span className="about-highlight">Marine Future</span> Together
                </h2>
                <p className="mt-5 text-[0.95rem] leading-[1.9] text-brand-navy/70">
                  Partner with YESEN Technologies Pvt Ltd for innovative, reliable and sustainable marine
                  solutions.
                </p>
                <div className="mt-8">
                  {hydrated ? <EMarineInquiryDrawer /> : <span className="about-btn about-btn-primary">Get in Touch</span>}
                </div>

              </div>
              <CtaSlideshow />
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Retrofit showcase — original card grid, with one shared player below that
 * switches its clip to whichever retrofit is selected.
 * ------------------------------------------------------------------------ */
const RETROFITS = [
  {
    title: "ICAR-CIFT Sun Boat II",
    body: "Sailing since 2019 at Narakkal Aquatic Farm, this solar-powered tourist vessel runs on E-MARINE Solar Electric Propulsion — an endless voyage powered solely by the sun.",
    image: sunBoatAsset.url,
    video: sunboatFilm.url,
  },
  {
    title: "CIAL Vembanad",
    body: "Electric boat powered by E-Marine for Cochin International Airport — proof that the tourism industry across the world can now lead the way to sustainable, solar-powered boating.",
    image: cialVembanadAsset.url,
    video: cialVembanadFilm.url,
  },
  {
    title: "The Shikara",
    body: "Powered by the revolutionary E-Marine system, the Shikara moves silently through the river near Le Méridien Kochi — electric boating that proves The Blue Revolution is already here.",
    image: shikaraAsset.url,
    video: shikaraFilm.url,
  },
  {
    title: "E-Marine Retrofit",
    body: "The revolutionary electric/hybrid power system can be retrofitted on new and existing boats of any size, anywhere in the world.",
    image: emarineRetrofitAsset.url,
    video: emarineRetrofitNoLogo.url,
  },
];

function RetrofitShowcase() {
  const [active, setActive] = useState(0);
  const current = RETROFITS[active]!;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RETROFITS.map((card, i) => (
          <button
            key={card.title}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`group overflow-hidden rounded-xl border bg-card text-left transition-all duration-300 hover:shadow-sm ${i === active
              ? "border-brand-blue shadow-sm ring-1 ring-brand-blue/40"
              : "border-border hover:border-brand-blue"
              }`}
          >
            <div className="aspect-[16/9] overflow-hidden bg-muted">
              <img
                decoding="async"
                loading="lazy"
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-card-foreground">{card.title}</h3>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-brand-navy">
        <div className="relative aspect-video w-full">
          <video
            key={current.video}
            className="absolute inset-0 h-full w-full object-cover"
            src={current.video}
            poster={current.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(4,20,38,0.85),transparent)] p-5">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/60">
              Now playing
            </span>
            <p className="mt-1 font-display text-[clamp(1.1rem,1.8vw,1.6rem)] font-light text-white">
              {current.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
