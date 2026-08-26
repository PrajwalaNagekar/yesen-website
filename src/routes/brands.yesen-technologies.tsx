import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, BatteryCharging, Building2, ShieldCheck, Sun, Zap } from "lucide-react";

import img1 from "@/assets/yesen-brand-1.png.asset.json";

import img3 from "@/assets/yesen-brand-3.png.asset.json";
import img4 from "@/assets/yesen-brand-4.png.asset.json";
import img5 from "@/assets/yesen-brand-5.png.asset.json";
import img6 from "@/assets/yesen-brand-6.png.asset.json";
import img7 from "@/assets/yesen-brand-7.png.asset.json";
import brandFilm from "@/assets/yesen-brand-film.mp4.asset.json";

export const Route = createFileRoute("/brands/yesen-technologies")({
  head: () => ({
    meta: [
      { title: "YESEN Technologies Pvt Ltd Brand Range | B-LIPH, H-SECURE, P-SECURE" },
      {
        name: "description",
        content:
          "The in-house YESEN Technologies Pvt Ltd range: B-LIPH lithium energy storage, H-SECURE home power walls and P-SECURE commercial backup systems, engineered for solar-first sites.",
      },
      { property: "og:title", content: "YESEN Technologies Pvt Ltd Brand Range" },
      {
        property: "og:description",
        content:
          "B-LIPH, H-SECURE and P-SECURE — indigenous energy storage and backup engineered by YESEN Technologies Pvt Ltd.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.yesen.website/brands/yesen-technologies" },
    ],
  }),
  component: YesenBrandPage,
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

const RANGE = [
  {
    code: "B-LIPH",
    Icon: BatteryCharging,
    title: "Lithium energy storage",
    body: "Modular LFP energy storage from compact residential cabinets to rack-mounted commercial banks, built around a smart BMS with cell-level protection and long cycle life.",
    image: img1,
  },
  {
    code: "H-SECURE",
    Icon: ShieldCheck,
    title: "Home power wall",
    body: "A plug-and-play wall-mounted power wall with ML safety topology, solar-ready inputs and silent switchover, so homes ride through outages without a generator.",
    image: img3,
  },
  {
    code: "P-SECURE",
    Icon: Building2,
    title: "Commercial power backup",
    body: "Complete backup packages for offices, clinics and retail — sized around the load profile, integrated with solar and monitored remotely.",
    image: img7,
  },
];

const GALLERY = [
  { src: img4.url, alt: "B-LIPH lithium battery installations in commercial and residential settings" },
  { src: img5.url, alt: "H-SECURE power wall with rooftop solar compatibility" },
  { src: img6.url, alt: "H-SECURE feature overview including plug and play safety topology" },
];

const PILLARS = [
  { Icon: Sun, label: "Solar-first", body: "Every unit is designed to pair with rooftop or ground-mount PV." },
  { Icon: Zap, label: "Silent switchover", body: "No fuel, no fumes, no noise — power holds through the outage." },
  { Icon: ShieldCheck, label: "Safety topology", body: "Multi-layer cell protection with monitoring down to the module." },
];

/* -------------------------------------------------------------------------- */

function YesenBrandPage() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />

      <main className="relative z-10">
        {/* ------------------------------------------------------------ HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            <img
              src={img1.url}
              alt=""
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/45" />
          </div>

          <div className="relative mx-auto w-full max-w-[100rem] px-6 pb-20 pt-10 sm:px-12 sm:pb-28 sm:pt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/30 bg-brand-ivory/10 px-5 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-brand-ivory backdrop-blur-md transition-colors hover:bg-brand-ivory/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
              Back
            </Link>

            <Reveal className="mt-24 sm:mt-32">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-leaf">
                In-house range
              </span>
              <h1 className="display-xl mt-5 max-w-4xl text-4xl text-brand-ivory sm:text-7xl">
                YESEN Technologies Pvt Ltd
              </h1>
              <p className="mt-7 max-w-2xl text-[0.98rem] leading-[1.9] text-brand-ivory/80">
                Our indigenous energy security range — B-LIPH lithium storage, H-SECURE home power
                walls and P-SECURE commercial backup — engineered, assembled and supported by our
                own team for solar-first sites anywhere on the map.
              </p>

              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {PILLARS.map(({ Icon, label, body }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-brand-ivory/18 bg-brand-ivory/[0.07] p-6 backdrop-blur-md"
                  >
                    <Icon className="h-5 w-5 text-brand-leaf" strokeWidth={1.4} />
                    <span className="mt-4 block font-display text-lg text-brand-ivory">{label}</span>
                    <span className="mt-2 block text-[0.85rem] leading-relaxed text-brand-ivory/70">
                      {body}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------------- RANGE */}
        <section className="mx-auto w-full max-w-[100rem] px-6 py-20 sm:px-12 sm:py-28">
          <Reveal>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-forest">
              The range
            </span>
            <h2 className="display-xl mt-5 max-w-3xl text-3xl text-brand-navy sm:text-5xl">
              Three product families, one <span className="accent-italic">energy platform</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {RANGE.map(({ code, Icon, title, body, image }, i) => (
              <Reveal key={code} delay={0.08 * i}>
                <article className="group h-full overflow-hidden rounded-3xl border border-brand-navy/12 bg-card">
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand-navy/5">
                    <img
                      src={image.url}
                      alt={`${code} — ${title}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-7">
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-brand-forest" strokeWidth={1.5} />
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-brand-forest">
                        {code}
                      </span>
                    </span>
                    <h3 className="mt-4 font-display text-2xl leading-tight text-brand-navy">
                      {title}
                    </h3>
                    <p className="mt-3 text-[0.9rem] leading-[1.85] text-brand-navy/70">{body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ FILM */}
        <section className="border-y border-brand-navy/10 bg-brand-navy/[0.03]">
          <div className="mx-auto grid w-full max-w-[100rem] items-center gap-12 px-6 py-20 sm:px-12 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-brand-navy/12 bg-brand-navy">
                <video
                  src={brandFilm.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-forest">
                In the field
              </span>
              <h2 className="display-xl mt-5 text-3xl text-brand-navy sm:text-[2.75rem]">
                Built, installed and <span className="accent-italic">supported by us</span>
              </h2>
              <p className="mt-6 max-w-lg text-[0.95rem] leading-[1.9] text-brand-navy/72">
                From cabinet assembly to on-site commissioning, the same engineering team follows the
                product through. That means predictable installs, one point of accountability and
                service that does not stop at handover.
              </p>
              <Link
                to="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-brand-ivory transition-opacity hover:opacity-90"
              >
                Get in touch
              </Link>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------------- GALLERY */}
        <section className="mx-auto w-full max-w-[100rem] px-6 py-20 sm:px-12 sm:py-28">
          <Reveal>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-forest">
              Product library
            </span>
            <h2 className="display-xl mt-5 max-w-3xl text-3xl text-brand-navy sm:text-5xl">
              Specifications and <span className="accent-italic">installations</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={0.06 * i}>
                <figure className="flex items-center justify-center overflow-hidden rounded-3xl border border-brand-navy/12 bg-card p-2">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full rounded-2xl object-contain"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
