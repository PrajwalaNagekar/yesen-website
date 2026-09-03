import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  BatteryCharging,
  Bluetooth,
  Cable,
  CircuitBoard,
  Nfc,
  Thermometer,
  Wifi,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteChrome";
import heroImage from "@/assets/product-bkool.jpg";

export const Route = createFileRoute("/products/b-kool")({
  head: () => ({
    meta: [
      { title: "B-KOOL | YESEN Technologies Pvt Ltd — Marine LFP Battery System" },
      {
        name: "description",
        content:
          "B-KOOL is an IRS-approved marine LFP battery system with integrated BMS, thermal management, hot-swap modules and CAN & Modbus connectivity for vessels.",
      },
      { property: "og:title", content: "B-KOOL | Marine LFP Battery System" },
      {
        property: "og:description",
        content:
          "IRS-approved LFP packs with integrated BMS, thermal management and smart monitoring — engineered for marine duty cycles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/products/b-kool" }],
  }),
  component: BKoolPage,
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
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const SHORT_ID = "xcnXQnBESMA";
const SHORT_SRC =
  `https://www.youtube-nocookie.com/embed/${SHORT_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${SHORT_ID}` +
  `&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0` +
  `&iv_load_policy=3&playsinline=1&cc_load_policy=0&vq=hd1080&hd=1`;

const CHIPS = [
  { label: "IRS Approved LFP", Icon: BadgeCheck },
  { label: "Integrated BMS", Icon: CircuitBoard },
  { label: "Wi-Fi Connectivity", Icon: Wifi },
  { label: "Bluetooth Monitoring", Icon: Bluetooth },
  { label: "CAN & Modbus", Icon: Cable },
  { label: "Hot Swap Ready", Icon: Nfc },
  { label: "Thermal Management", Icon: Thermometer },
];

const TECH_ROWS = [
  { title: "IRS Approved LFP Marine Battery", badge: "Certified Safe", tone: "solid" },
  {
    title: "Tier 1 LFP Cells with Integrated BMS & Safety Micro-Controller",
    badge: "High Reliability",
    tone: "deep",
  },
  {
    title: "Pre-Charge Circuit for Cell Balancing, WiFi & Bluetooth Monitoring",
    badge: "Smart Control",
    tone: "outline",
  },
];


/* -------------------------------------------------------------------------- */

function BKoolPage() {
  return (
    <div className="about-page relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />

      <main className="relative z-10">
        {/* ------------------------------------------------------------ HERO */}
        <section className="relative isolate overflow-hidden">
          <div className="relative min-h-[68vh] w-full lg:min-h-[84vh]">
            <img
              src={heroImage}
              alt="B-KOOL marine LFP battery system"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, color-mix(in oklab, var(--brand-navy) 78%, transparent) 0%, color-mix(in oklab, var(--brand-navy) 40%, transparent) 48%, transparent 78%)",
              }}
              aria-hidden="true"
            />
            {/* Mobile: the diagonal wash misses the lower copy block, so a
                bottom-up scrim keeps the headline and paragraph legible. */}
            <div className="bk-hero-scrim-mobile absolute inset-0" aria-hidden="true" />


            <div className="relative mx-auto flex min-h-[68vh] w-full max-w-[100rem] items-end px-6 pb-14 pt-32 sm:px-12 lg:min-h-[84vh] lg:pb-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/70">
                  Product 02 — Marine Battery System
                </p>
                <h1 className="display-xl mt-4 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] text-white">
                  B-KOOL
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  Advanced LFP battery systems engineered for marine applications — maximum safety,
                  reliability and performance across every duty cycle.
                </p>
              </motion.div>
            </div>
          </div>

          <Link to="/products" className="em-back" aria-label="Back to products">
            <ArrowLeft size={16} strokeWidth={1.8} />
            <span>Back</span>
          </Link>
        </section>

        {/* ------------------------------------------- TECH + FILM */}
        <section className="relative px-6 py-14 sm:px-12 lg:py-20">
          <div className="mx-auto grid w-full max-w-[100rem] items-center gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            {/* LEFT — technology */}
            <div>
              <Reveal>
                <p className="about-eyebrow">Inside the pack</p>
                <h2 className="display-xl mt-4 text-[clamp(1.9rem,3.2vw,3rem)]">
                  B-KOOL <span className="about-highlight">Battery Technology</span>
                </h2>
              </Reveal>

              <div className="mt-9 space-y-3">
                {TECH_ROWS.map((row, i) => (
                  <Reveal key={row.title} delay={0.08 + i * 0.08}>
                    <div className={`bk-row bk-row-${row.tone}`}>
                      <span className="bk-row-title">{row.title}</span>
                      <span className="bk-row-badge">{row.badge}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.34}>
                <div className="mt-10 grid items-center gap-8 border-t border-brand-navy/10 pt-8 sm:grid-cols-[auto_1fr]">
                  <div className="flex items-center gap-4">
                    <span className="bk-logo-mark about-float">
                      <BatteryCharging size={26} strokeWidth={1.7} />
                    </span>
                    <span className="display-xl text-[clamp(1.8rem,3vw,2.6rem)] leading-none">
                      B-KOOL
                    </span>
                  </div>
                  <p className="text-sm leading-[1.9] text-brand-navy/70">
                    The B-KOOL battery system supports CAN &amp; Modbus data collection protocols,
                    enabling seamless integration with vessel management systems. Real-time monitoring
                    via onboard WiFi and Bluetooth ensures operational visibility and safety at all
                    times.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — film */}
            <Reveal delay={0.14} className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[20rem] overflow-hidden rounded-[1.75rem] border border-brand-navy/10 bg-brand-navy shadow-[0_50px_110px_-50px_color-mix(in_oklab,var(--brand-navy)_75%,transparent)]">
                <div className="relative aspect-[9/16] w-full">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={SHORT_SRC}
                    title="B-KOOL marine battery system film"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    frameBorder={0}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>


        {/* ------------------------------------------------------ HIGHLIGHTS */}
        <section className="relative px-6 pb-20 sm:px-12">
          <div className="mx-auto w-full max-w-[100rem]">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CHIPS.map(({ label, Icon }, i) => (
                <Reveal key={label} delay={(i % 4) * 0.06}>
                  <div className="product-chip">
                    <span className="product-chip-icon about-float">
                      <Icon size={15} strokeWidth={1.6} />
                    </span>
                    {label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
