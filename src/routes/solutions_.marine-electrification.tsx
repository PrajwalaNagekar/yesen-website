import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Check,
  CircuitBoard,
  Gauge,
  Plus,
  Ship,
  Sailboat,
  Shield,
  Waves,
  Wrench,
} from "lucide-react";

import propulsionAsset from "@/assets/marine-propulsion.jpg.asset.json";
import { SiteFooter } from "@/components/SiteChrome";
import { MarineInquiryDrawer } from "@/components/MarineInquiryDrawer";

export const Route = createFileRoute("/solutions_/marine-electrification")({
  head: () => ({
    meta: [
      { title: "Marine Electrification | YESEN Technologies Pvt Ltd" },
      {
        name: "description",
        content:
          "Electric propulsion, marine battery systems and energy optimisation — Marine Electrification solutions engineered by YESEN Technologies Pvt Ltd for real duty cycles on the water.",
      },
      { property: "og:title", content: "Marine Electrification | YESEN Technologies Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Powering the future with clean innovation: electric propulsion, marine-certified batteries, retrofit and new-build electrification.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://yesen.website/solutions/marine-electrification" },
    ],
  }),
  component: MarineElectrificationPage,
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const FEATURES = [
  "Electric propulsion systems",
  "Advanced battery systems",
  "Energy optimization",
  "Zero emissions",
  "Lower operating costs",
  "Reduced noise & vibration",
];

const INCLUDED = [
  {
    Icon: CircuitBoard,
    title: "Electric propulsion",
    body: "Motor and drivetrain packages sized to your hull and duty cycle, from harbour craft to passenger ferries.",
  },
  {
    Icon: BatteryCharging,
    title: "Battery & energy systems",
    body: "Marine-certified battery packs with thermal and safety management engineered for continuous operation.",
  },
  {
    Icon: Wrench,
    title: "Retrofit & new-build",
    body: "Full retrofit of existing vessels or ground-up electrification for new-build projects.",
  },
];

const STATS = [
  { value: "40%", label: "lower running cost vs. diesel" },
  { value: "0", label: "tailpipe emissions" },
  { value: "70%", label: "less noise at cruise" },
];

const PROCESS = [
  {
    n: "01",
    title: "Assess",
    body: "We study your vessel, route and duty cycle to size the right propulsion and battery architecture.",
  },
  {
    n: "02",
    title: "Design",
    body: "Motor, drivetrain and battery systems engineered around your hull and how the vessel is actually used.",
  },
  {
    n: "03",
    title: "Install & integrate",
    body: "Systems installed and integrated with existing controls, wiring and safety systems.",
  },
  {
    n: "04",
    title: "Trial & commission",
    body: "Sea trials, performance validation and full handover to your crew.",
  },
];

const APPLICATIONS = [
  {
    Icon: Ship,
    title: "Harbour craft & tugs",
    body: "Frequent start-stop duty cycles where electric torque and low noise pay off fastest.",
  },
  {
    Icon: Waves,
    title: "Passenger ferries",
    body: "Predictable routes suited to battery range, with quieter cabins for passengers.",
  },
  {
    Icon: Shield,
    title: "Patrol & pilot boats",
    body: "Rapid response duty with lower running cost and reduced maintenance load.",
  },
  {
    Icon: Sailboat,
    title: "Leisure yachts",
    body: "Silent cruising and at-anchor power without running a generator.",
  },
];

const FAQS = [
  {
    q: "Can you retrofit my existing vessel?",
    a: "In most cases, yes. We assess the hull, existing systems and duty cycle first to confirm the right propulsion and battery configuration for a retrofit.",
  },
  {
    q: "How long does a battery pack last?",
    a: "Marine battery packs are specified around your duty cycle and thermal management needs, and are built for continuous operation across their rated cycle life.",
  },
  {
    q: "What's the typical payback period?",
    a: "It depends on route, fuel costs and duty cycle — we build a running-cost comparison against your current diesel setup as part of the assessment.",
  },
  {
    q: "Do you support hybrid diesel-electric setups?",
    a: "Yes. Where full electrification isn't the right fit yet, we design hybrid systems that blend diesel, battery and solar sources.",
  },
];

/* -------------------------------------------------------------------------- */

function MarineElectrificationPage() {
  return (
    <div className="me-page min-h-screen font-sans antialiased">
      <main className="relative z-10">
        {/* ------------------------------------------------------------ HERO */}
        <section className="me-hero relative isolate overflow-hidden">
          <div className="mx-auto w-full max-w-[80rem] px-6 pb-20 pt-24 sm:px-10">
            <div className="mb-8 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/45">
              <Link to="/solutions" className="me-back">
                <ArrowLeft size={15} strokeWidth={1.8} />
                <span>Solutions</span>
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/70">Marine Electrification</span>
            </div>

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
              <Reveal>
                <div className="flex items-center gap-3.5">
                  <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-white/14 bg-white/[0.03] text-white">
                    <CircuitBoard size={21} strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[0.78rem] uppercase tracking-[0.32em] text-white/60">
                    01 / Solution
                  </span>
                </div>

                <div className="my-8 h-px w-full bg-white/14" />

                <h1 className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold uppercase leading-[1.06] tracking-[-0.01em] text-white">
                  Marine
                  <br />
                  Electrification
                </h1>
                <p className="mt-6 max-w-[30rem] text-[1.05rem] leading-relaxed text-white/60">
                  Powering the future with clean innovation
                </p>

                <ul className="mt-9 grid gap-3.5 sm:grid-cols-2">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[0.95rem] text-white/85">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-sky/45 bg-brand-sky/15 text-brand-sky">
                        <Check size={12} strokeWidth={2.6} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

              </Reveal>

              <Reveal delay={0.12}>
                <div className="me-visual">
                  <img
                    src={propulsionAsset.url}
                    alt="Twin outboard marine propulsion units driving through white water"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="me-visual-index" aria-hidden="true">
                    01
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- WHAT'S INCLUDED */}
        <section className="me-band">
          <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
            <Reveal className="mx-auto max-w-[40rem] text-center">
              <p className="me-eyebrow">What&apos;s Included</p>
              <h2 className="me-h2 mt-4">How we deliver Marine Electrification</h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-white/60">
                Electrification is the fastest way to cut a vessel&apos;s operating cost and
                environmental footprint at once. We design, integrate and commission electric
                propulsion and battery systems built for real duty cycles on the water.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {INCLUDED.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <article className="me-card h-full">
                    <span className="me-card-icon">
                      <c.Icon size={18} strokeWidth={1.9} />
                    </span>
                    <h3 className="me-h3">{c.title}</h3>
                    <p className="mt-2.5 text-[0.9rem] leading-relaxed text-white/60">{c.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="me-stats">
                {STATS.map((s) => (
                  <div key={s.label} className="me-stat">
                    <p className="me-stat-value">{s.value}</p>
                    <p className="mt-2 text-[0.85rem] leading-snug text-white/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- PROCESS */}
        <section className="me-band me-band-alt">
          <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
            <Reveal className="mx-auto max-w-[40rem] text-center">
              <p className="me-eyebrow">Our Process</p>
              <h2 className="me-h2 mt-4">How it works</h2>
            </Reveal>

            <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
              {PROCESS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.07}>
                  <div className="me-step">
                    <span className="me-step-num">{p.n}</span>
                    <h3 className="me-h3 mt-4">{p.title}</h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-white/60">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- APPLICATIONS */}
        <section className="me-band">
          <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
            <Reveal className="mx-auto max-w-[40rem] text-center">
              <p className="me-eyebrow">Where It Fits</p>
              <h2 className="me-h2 mt-4">Built for these applications</h2>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {APPLICATIONS.map((a, i) => (
                <Reveal key={a.title} delay={(i % 4) * 0.06}>
                  <article className="me-app h-full">
                    <span className="me-app-icon">
                      <a.Icon size={17} strokeWidth={1.8} />
                    </span>
                    <h4 className="font-display text-[1.02rem] font-semibold text-white">
                      {a.title}
                    </h4>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-white/60">{a.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section className="me-band me-band-alt">
          <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
            <Reveal className="mx-auto max-w-[40rem] text-center">
              <p className="me-eyebrow">Questions</p>
              <h2 className="me-h2 mt-4">Frequently asked</h2>
            </Reveal>

            <div className="mx-auto mt-12 flex max-w-[48rem] flex-col gap-3">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <details className="me-faq">
                    <summary>
                      <span>{f.q}</span>
                      <span className="me-faq-toggle" aria-hidden="true">
                        <Plus size={14} strokeWidth={2.2} />
                      </span>
                    </summary>
                    <p>{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- INQUIRY */}
        <section className="me-band me-inquiry">
          <div className="mx-auto flex w-full max-w-[80rem] flex-wrap items-center justify-between gap-10 px-6 sm:px-10">
            <Reveal className="max-w-[34rem]">
              <p className="me-eyebrow">Get in Touch</p>
              <h2 className="me-h2 mt-4">
                Interested in <span className="me-grad">Marine Electrification</span>?
              </h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-white/60">
                Tell us a little about your vessel, route or project and our team will get back to
                you with next steps.
              </p>
              <div className="mt-7 space-y-2.5 text-[0.9rem] text-white/75">
                <p className="flex items-center gap-2.5">
                  <Gauge size={15} className="text-brand-sky" /> Assessment within 1–2 business days
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/enquire"
                  search={{ solution: "Marine Electrification", type: "solution" }}
                  className="me-btn me-btn-primary inline-flex items-center gap-2"
                >
                  Enquire now <ArrowRight size={15} />
                </Link>
                <MarineInquiryDrawer triggerClassName="me-btn me-btn-ghost" triggerLabel="Quick drawer" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
