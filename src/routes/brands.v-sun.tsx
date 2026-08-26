import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Gauge, ShieldCheck, Sun, Waves } from "lucide-react";

import heroVideo from "@/assets/solutions-showcase.mp4.asset.json";
import sunBoat from "@/assets/vsun-sunboat.jpg.asset.json";
import brandVsun from "@/assets/brand-vsun.jpg";

export const Route = createFileRoute("/brands/v-sun")({
  head: () => ({
    meta: [
      { title: "V-Sun Solar Modules | YESEN Technologies Pvt Ltd Partner Brand" },
      {
        name: "description",
        content:
          "V-Sun high-performance solar modules, deployed by YESEN Technologies Pvt Ltd across marine propulsion, off-grid microgrids and rooftop installations.",
      },
      { property: "og:title", content: "V-Sun Solar Modules — YESEN Technologies Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Tier-one V-Sun photovoltaic modules engineered for marine, off-grid and rooftop energy systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.yesen.website/brands/v-sun" }],
  }),
  component: VSunPage,
});

/* -------------------------------------------------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const PILLARS = [
  {
    Icon: Sun,
    label: "High-yield cells",
    body: "Monocrystalline PERC and half-cut cell architectures that hold output through heat, haze and partial shade.",
  },
  {
    Icon: Waves,
    label: "Marine grade",
    body: "Corrosion-resistant frames and sealed junction boxes specified for salt spray, humidity and constant vibration.",
  },
  {
    Icon: Gauge,
    label: "Low degradation",
    body: "Linear performance warranties with first-year degradation held tight for predictable long-term generation.",
  },
  {
    Icon: ShieldCheck,
    label: "Certified build",
    body: "IEC-tested modules with full traceability, so every array we commission is documented end to end.",
  },
];

const SPECS = [
  { k: "Cell technology", v: "Mono PERC / half-cut" },
  { k: "Module range", v: "144 – 550 Wp" },
  { k: "Frame", v: "Anodised marine-grade aluminium" },
  { k: "Performance warranty", v: "25 years linear" },
  { k: "Applications", v: "Marine · Off-grid · Rooftop" },
];

/* -------------------------------------------------------------------------- */

function VSunPage() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-brand-navy antialiased">
      <main className="relative z-10">
        {/* ------------------------------------------------- FULLSCREEN HERO */}
        <section className="relative h-[100svh] w-full overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={heroVideo.url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/55 to-brand-navy/25" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-[100rem] flex-col px-6 pb-16 pt-10 sm:px-12 sm:pb-20 sm:pt-12">
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-ivory/30 bg-brand-ivory/10 px-5 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-brand-ivory backdrop-blur-md transition-colors hover:bg-brand-ivory/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
              Back
            </Link>

            <div className="mt-auto">
              <Reveal>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-leaf">
                  Partner brand · Solar modules
                </span>
                <h1 className="display-xl mt-5 max-w-4xl text-4xl font-light leading-[1.02] text-brand-ivory sm:text-7xl">
                  V-Sun
                </h1>
                <p className="mt-6 max-w-2xl text-[0.98rem] leading-[1.9] text-brand-ivory/80">
                  Tier-one photovoltaic modules we specify wherever generation has to be dependable —
                  on the water, off the grid and on the roof. V-Sun supplies the cells; we engineer
                  the system around them.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- WHY V-SUN */}
        <section className="relative px-6 py-16 sm:px-12 sm:py-24">
          <div className="mx-auto max-w-[80rem]">
            <Reveal>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brand-forest">
                Why we specify it
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,3.2vw,2.9rem)] font-light leading-[1.08]">
                Modules chosen for <span className="italic text-brand-forest">the hardest sites</span>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((p, i) => (
                <Reveal key={p.label} delay={0.06 * i}>
                  <div className="h-full rounded-2xl border border-brand-navy/12 bg-card p-6">
                    <p.Icon className="h-5 w-5 text-brand-forest" strokeWidth={1.5} />
                    <h3 className="mt-4 font-display text-lg text-card-foreground">{p.label}</h3>
                    <p className="mt-2 text-[0.85rem] leading-[1.8] text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- IN OPERATION */}
        <section className="relative px-6 pb-16 sm:px-12 sm:pb-24">
          <div className="mx-auto grid max-w-[80rem] overflow-hidden rounded-2xl border border-border lg:grid-cols-[1fr_0.9fr]">
            <div className="flex flex-col justify-center bg-brand-navy p-8 sm:p-12">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/60">
                In operation
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.4rem,2.4vw,2.1rem)] font-light leading-[1.12] text-white">
                Solar propulsion, running every day
              </h2>
              <p className="mt-4 max-w-prose text-[0.9rem] leading-[1.85] text-white/70">
                V-Sun arrays sit on top of our E-MARINE solar electric propulsion vessels — a
                sun-fed powertrain that runs silent, needs no fuel and keeps tourist and research
                boats sailing on generation alone.
              </p>
              <Link
                to="/enquire"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-brand-navy transition-colors hover:bg-white/90"
              >
                Get a quote for V-Sun
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
              </Link>
            </div>

            <div className="relative min-h-[20rem] bg-white">
              <img
                src={sunBoat.url}
                alt="Solar-powered vessel with V-Sun modules moored at Narakkal Aquatic Farm"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- SPECS */}
        <section className="relative px-6 pb-20 sm:px-12 sm:pb-28">
          <div className="mx-auto grid max-w-[80rem] items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <figure className="overflow-hidden rounded-2xl border border-brand-navy/12 bg-card">
                <img
                  src={brandVsun}
                  alt="V-Sun solar module product photography"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.08}>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brand-forest">
                At a glance
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.3rem)] font-light leading-[1.1]">
                Specification summary
              </h2>
              <dl className="mt-7 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
                {SPECS.map((s) => (
                  <div key={s.k} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-navy/55">
                      {s.k}
                    </dt>
                    <dd className="text-right text-[0.9rem] text-brand-navy">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
