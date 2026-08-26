import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  
  Check,
  Gauge,
  Play,
  Ship,
  Zap,
} from "lucide-react";

import emarineCtaFleet from "@/assets/e-marine-cta-fleet.jpg";
import { SiteFooter } from "@/components/SiteChrome";
import { EMarineInquiryDrawer } from "@/components/EMarineInquiryDrawer";



export const Route = createFileRoute("/products/e-marine")({
  head: () => ({
    meta: [
      { title: "E-MARINE | YESEN Technologies Pvt Ltd — Marine Electrification Platform" },
      {
        name: "description",
        content:
          "E-MARINE is a complete marine electrification platform: electric propulsion, solar integration, LFP energy storage and smart monitoring for zero-emission vessels.",
      },
      {
        property: "og:title",
        content: "E-MARINE | Marine Electrification Platform",
      },
      {
        property: "og:description",
        content:
          "Electric propulsion, solar integration, LFP storage and intelligent monitoring — engineered for cleaner, quieter, smarter waterways.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/products/e-marine" }],
  }),
  component: EMarinePage,
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

const YT_ID = "jlY_tHEr1AM";
const YT_SRC =
  `https://www.youtube-nocookie.com/embed/${YT_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${YT_ID}` +
  `&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0` +
  `&iv_load_policy=3&playsinline=1&cc_load_policy=0&vq=hd2160&hd=1`;

const HEADLINE_BENEFITS = [
  {
    title: "Exhaust Free — Protect Ecosystem Health",
    tag: "Zero Emissions",
    tone: "solid" as const,
  },
  {
    title: "Long Life — Decrease Downtime, Increase Efficiency",
    tag: "10x More Reliable",
    tone: "deep" as const,
  },
  {
    title: "Reduced Operation Costs — Low Maintenance & Savings",
    tag: "Fast ROI",
    tone: "outline" as const,
  },
];

const KEY_BENEFITS = [
  "Zero Vibration",
  "No Fuel",
  "No Harmful Fumes or CO",
  "Low Maintenance",
  "No Waterway Pollution",
  "No Noise",
  "Eco-friendly: Reduce GHG emissions",
  "Quick Installation: Fast retrofit kits for any vessel type",
];



const FILMS = [
  {
    id: "W5jndFIShlg",
    badge: "E-MARINE • Film 01",
    title: "Electric Propulsion, Explained on Deck",
    blurb:
      "A full walkthrough of the E-MARINE drivetrain — motor, controller and DC bus — recorded aboard a working vessel.",
    points: [
      "Motor and controller architecture",
      "DC bus layout and shore charging",
      "Throttle response on open water",
    ],
    chapter: "System Walkthrough",
    focus: "Propulsion",
  },
  {
    id: "kTGKu3pYJls",
    badge: "E-MARINE • Film 02",
    title: "LFP Energy Storage in Service",
    blurb:
      "How the lithium iron phosphate packs are mounted, balanced and monitored across a full duty cycle.",
    points: [
      "Hot-swap module handling",
      "Battery management and balancing",
      "Thermal behaviour under load",
    ],
    chapter: "Energy Storage",
    focus: "LFP Packs",
  },
  {
    id: "TPZykRoNAbI",
    badge: "E-MARINE • Film 03",
    title: "Solar Integration on the Hull",
    blurb:
      "Panel placement, MPPT wiring and the daily harvest that keeps range extended between charges.",
    points: ["Panel layout and shading", "MPPT and DC coupling", "Daily generation profile"],
    chapter: "Solar Input",
    focus: "Generation",
  },
  {
    id: "w5BlRazZ8y0",
    badge: "E-MARINE • Film 04",
    title: "Retrofit: From Diesel to Electric",
    blurb:
      "An existing vessel stripped of its combustion drivetrain and re-commissioned as a zero-emission craft.",
    points: ["Engine removal and structure", "Drivetrain fitment", "Commissioning and sea trial"],
    chapter: "Retrofit Programme",
    focus: "Conversion",
  },
  {
    id: "zK3rTN4QMcc",
    badge: "E-MARINE • Film 05",
    title: "Monitoring and Fleet Telemetry",
    blurb:
      "Live state-of-charge, route energy and diagnostics streamed from vessel to shore through M-CONTROL.",
    points: ["Live state-of-charge", "Route energy analytics", "Remote diagnostics"],
    chapter: "Operations",
    focus: "M-CONTROL",
  },
];




type Film = (typeof FILMS)[number];

function FilmCard({ film }: { film: Film }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="em-film">
      <div className="em-film-media">
        {playing ? (
          <iframe
            className="em-film-iframe"
            src={`https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080`}
            title={film.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder={0}
          />
        ) : (
          <>
            <img
              className="em-film-poster"
              src={`https://i.ytimg.com/vi/${film.id}/maxresdefault.jpg`}
              alt={film.title}
              loading="lazy"
              decoding="async"
            />
            <button
              type="button"
              className="em-film-play"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${film.title}`}
            >
              <span>
                <Play size={18} strokeWidth={2} fill="currentColor" />
              </span>
            </button>
          </>
        )}
      </div>

      <div className="em-film-body">
        <p className="em-film-badge">{film.badge}</p>
        <h3 className="mt-3 font-display text-lg leading-snug text-brand-navy">{film.title}</h3>
        <p className="mt-2 text-[0.82rem] leading-relaxed text-brand-navy/65">{film.blurb}</p>

        <ul className="mt-3 space-y-2">
          {film.points.map((p) => (
            <li key={p} className="em-film-point">
              <Check size={14} strokeWidth={2.4} />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="em-film-meta">
          <span>
            <Activity size={13} strokeWidth={1.8} /> {film.chapter}
          </span>
          <span>
            <Gauge size={13} strokeWidth={1.8} /> {film.focus}
          </span>
        </div>
      </div>
    </article>
  );
}


/* -------------------------------------------------------------------------- */

function EMarinePage() {
  return (
    <div className="about-page relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />

      <main className="relative z-10">
        {/* ------------------------------------------------------------ HERO */}
        <section className="relative isolate overflow-hidden">
          <h1 className="sr-only">E-MARINE — marine electrification platform by YESEN Technologies Pvt Ltd</h1>
          <div className="pd-hero-stage em-hero-clean">

            <div className="pd-hero-media em-yt-media" aria-hidden="true">
              <div className="em-yt-frame">
                <iframe
                  className="em-yt-iframe"
                  src={YT_SRC}
                  title="E-MARINE marine electrification platform"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  frameBorder={0}
                  tabIndex={-1}
                />
              </div>
              <div className="em-yt-guard" />
            </div>
          </div>

          <Link to="/products" className="em-back" aria-label="Back to products">
            <ArrowLeft size={16} strokeWidth={1.8} />
            <span>Back</span>
          </Link>
        </section>

        {/* -------------------------------------------------------- BENEFITS */}
        <section id="platform" className="relative scroll-mt-28 px-6 py-12 sm:px-12 lg:py-16">
          <div className="mx-auto w-full max-w-[100rem]">
            <Reveal className="text-center">
              <p className="about-eyebrow">Comprehensive Overview</p>
              <h2 className="display-xl mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
                E-MARINE <span className="about-highlight">Benefits</span>
              </h2>
            </Reveal>

            <div className="mt-10 space-y-4">
              {HEADLINE_BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08}>
                  <div className={`em-benefit-bar em-benefit-${b.tone}`}>
                    <p className="em-benefit-title">{b.title}</p>
                    <p className="em-benefit-tag">{b.tag}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.5fr_1.5fr] lg:items-center">
              <Reveal from="left">
                <div className="em-keycount">
                  <span className="em-keycount-mark" aria-hidden="true">
                    <Zap size={44} strokeWidth={1.4} />
                  </span>
                  <p className="em-keycount-text">
                    8 Key
                    <br />
                    Benefits
                  </p>
                </div>
              </Reveal>

              <Reveal from="right">
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {KEY_BENEFITS.map((k) => (
                    <li key={k} className="em-keyitem">
                      <span className="em-keydot" aria-hidden="true" />
                      {k}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ------------------------------------------------------ FILM LIBRARY */}
        <section id="films" className="relative scroll-mt-28 px-6 py-12 sm:px-12 lg:py-16">
          <div className="mx-auto w-full max-w-[100rem]">
            <Reveal className="text-center">
              <p className="about-eyebrow">Film Library</p>
              <h2 className="display-xl mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
                E-MARINE <span className="about-highlight">On the Water</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-brand-navy/65">
                Sea trials, installations and system walkthroughs — recorded on real vessels.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {FILMS.map((f, i) => (
                <Reveal key={f.id} delay={(i % 3) * 0.06}>
                  <FilmCard film={f} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        {/* ------------------------------------------------------------- CTA */}
        <section className="relative px-6 pb-20 pt-4 sm:px-12">
          <Reveal className="mx-auto w-full max-w-[100rem]">
            <div className="about-card about-cta relative isolate overflow-hidden">
              <img
                src={emarineCtaFleet}
                alt="Ferries, yachts, fishing trawlers, houseboats and workboats on calm water"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
                width={1920}
                height={1088}
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(100deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_38%,rgba(255,255,255,0.42)_62%,rgba(255,255,255,0.12)_100%)]"
                aria-hidden="true"
              />
              <div className="relative z-10 max-w-2xl px-8 py-16 text-center sm:px-12 sm:py-24 lg:text-left">
                <span className="about-icon about-float mx-auto lg:mx-0">
                  <Ship size={18} strokeWidth={1.6} />
                </span>
                <h2 className="display-xl mt-6 text-[clamp(2rem,3.6vw,3.4rem)]">
                  Electrify your <span className="about-highlight">next vessel</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-[1.95] text-brand-navy/70 lg:mx-0">
                  Ferries, tour boats, trawlers, houseboats, yachts or workboats — share your route
                  and duty cycle and we will size an E-MARINE configuration around them.
                </p>
                <div className="mt-10 flex justify-center lg:justify-start">
                  <EMarineInquiryDrawer />
                </div>

              </div>
            </div>
          </Reveal>
        </section>


      </main>

      <SiteFooter />
    </div>
  );
}
