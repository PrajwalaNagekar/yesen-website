import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cpu,
  Leaf,
  LineChart,
  Recycle,
  ShieldCheck,
  Sparkles,
  Timer,
  Volume2,
  Waves,
  Wrench,
} from "lucide-react";
import { useRef } from "react";

import { fetchProducts, resolveMediaUrl, type Product } from "@/api/products";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

import heroVideo from "@/assets/products-hero-v3.mp4.asset.json";

const ACCENTS = ["blue", "leaf", "indigo", "amber"] as const;

/** Display serial from list position (1-based), e.g. index 0 → "01". */
function getSerialNo(index: number) {
  return String(index + 1).padStart(2, "0");
}

export const Route = createFileRoute("/products/")({
  loader: async () => {
    try {
      const products = await fetchProducts();
      return { products, error: null as string | null };
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Failed to load products";
      return { products: [] as Product[], error: message };
    }
  },
  head: () => ({
    meta: [
      { title: "Products | YESEN Technologies Pvt Ltd — Marine Electrification Systems" },
      {
        name: "description",
        content:
          "E-MARINE, B-KOOL, M-CONTROL and B-GUARD — marine electrification, LFP battery systems, smart monitoring and onboard safety, engineered for cleaner waterways.",
      },
      {
        property: "og:title",
        content: "Products | YESEN Technologies Pvt Ltd — Marine Electrification Systems",
      },
      {
        property: "og:description",
        content:
          "Discover the next generation of marine electrification technologies — cleaner, quieter, smarter and more sustainable waterways.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/products" }],
  }),
  component: ProductsPage,
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
  const offset = from === "left" ? { x: -60, y: 0 } : from === "right" ? { x: 60, y: 0 } : { x: 0, y: 34 };
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

const CERTS = [
  {
    code: "IEC 62619",
    note: "Secondary cells and batteries containing alkaline or other non-acid electrolytes.",
  },
  {
    code: "IEC 62620",
    note: "Secondary lithium cells and batteries for industrial and marine applications.",
  },
];

const BENEFITS = [
  { label: "Zero Emissions", Icon: Leaf },
  { label: "Reduced Operating Costs", Icon: LineChart },
  { label: "Silent Operation", Icon: Volume2 },
  { label: "Reduced Maintenance", Icon: Wrench },
  { label: "Longer Service Life", Icon: Timer },
  { label: "Greater Reliability", Icon: ShieldCheck },
  { label: "Sustainable Transport", Icon: Recycle },
  { label: "Intelligent Monitoring", Icon: Cpu },
];

/* -------------------------------------------------------------------------- */

function ProductsPage() {
  const { products, error } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const countLabel = products.length
    ? `${String(products.length).padStart(2, "0")} Systems / IEC Certified`
    : "IEC Certified";

  return (
    <div className="about-page relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />
      <div className="about-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>

      <SiteHeader />

      <main className="relative z-10">
        {/* -------------------------------------------------- HERO */}
        <section ref={heroRef} className="relative isolate overflow-hidden">
          <div className="about-ring about-ring-a" aria-hidden="true" />
          <div className="about-ring about-ring-b" aria-hidden="true" />

          <div className="pd-hero-stage">
            <div className="pd-hero-media" aria-hidden="true">
              <motion.video
                className="pd-hero-video"
                style={{ y: heroY, scale: heroScale }}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src={heroVideo.url} type="video/mp4" />
              </motion.video>
              <div className="pd-hero-scrim" />
            </div>

            <div className="pd-hero-inner mx-auto w-full max-w-[100rem]">
              <Reveal className="relative z-10">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy/12 bg-white/70 px-2.5 py-1 font-mono !text-[0.5rem] uppercase tracking-[0.18em] text-brand-forest shadow-[0_10px_30px_-20px_rgb(12_46_92/0.6)] backdrop-blur-xl sm:px-3 sm:py-1.5 sm:!text-[0.55rem] sm:tracking-[0.22em] lg:gap-2 lg:px-4 lg:py-1.5 lg:!text-[0.62rem] lg:tracking-[0.3em]">
                    <Waves size={10} className="about-float lg:h-[13px] lg:w-[13px]" /> Our Products
                  </span>
                  <span className="pd-hero-meta text-brand-navy/45">{countLabel}</span>
                </div>

                <h1 className="pd-hero-title display-xl mt-8 max-w-4xl text-[clamp(2.3rem,5vw,4.4rem)] leading-[1.06]">
                  Powering the Future of{" "}
                  <span className="pd-hero-accent">Sustainable Marine</span> Transportation
                </h1>

                <div className="pd-hero-rule mt-9 max-w-3xl" />

                <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <p className="pd-hero-copy max-w-lg text-[0.95rem] leading-[1.85] text-brand-navy/80">
                    Discover the next generation of marine electrification technologies engineered to
                    create cleaner, quieter, smarter and more sustainable waterways.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                    <a href="#catalogue" className="about-btn about-btn-primary">
                      Explore Products <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------- PRODUCT CARDS */}
        <section id="catalogue" className="relative scroll-mt-16 px-6 py-10 sm:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-[100rem]">
            {error ? (
              <Reveal>
                <p className="rounded-2xl border border-brand-navy/10 bg-white/70 px-6 py-8 text-center text-sm text-brand-navy/70">
                  {error}
                </p>
              </Reveal>
            ) : products.length === 0 ? (
              <Reveal>
                <p className="rounded-2xl border border-brand-navy/10 bg-white/70 px-6 py-8 text-center text-sm text-brand-navy/70">
                  Products will appear here once published in the CMS.
                </p>
              </Reveal>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                {products.map((p, i) => {
                  const accent = ACCENTS[i % ACCENTS.length];
                  const imageUrl = resolveMediaUrl(p.image?.url);
                  const hasBenefits = (p.benefits?.length ?? 0) > 0;
                  const hasFeatures = (p.features?.length ?? 0) > 0;

                  return (
                    <Reveal key={p._id} delay={(i % 2) * 0.08} from={i % 2 ? "right" : "left"}>
                      <article className={`about-card product-card product-${accent}`}>
                        {imageUrl ? (
                          <div className="product-shot">
                            <img
                              decoding="async"
                              src={imageUrl}
                              alt={`${p.name} — ${p.label}`}
                              loading="lazy"
                            />
                          </div>
                        ) : null}

                        <span className="product-no">{getSerialNo(i)}</span>
                        <h2 className="product-name">{p.name}</h2>
                        <p className="mt-1 font-display text-lg text-brand-navy">{p.label}</p>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-navy/65">
                          {p.description1 || p.description2}
                        </p>

                        {hasBenefits && hasFeatures ? (
                          <div className="mt-6 grid gap-6 border-t border-brand-navy/8 pt-6 sm:grid-cols-2">
                            <div>
                              <p className="product-col-title">Key Features</p>
                              <ul className="mt-3 space-y-2.5">
                                {p.features.map((label) => (
                                  <li
                                    key={label}
                                    className="flex items-center gap-2.5 text-sm text-brand-navy/75"
                                  >
                                    <span className="product-bullet">
                                      <Sparkles size={13} strokeWidth={1.7} />
                                    </span>
                                    {label}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="product-col-title">Benefits</p>
                              <ul className="mt-3 space-y-2.5">
                                {p.benefits.map((b, bi) => {
                                  const label = b.title || b.heading || `Benefit ${bi + 1}`;
                                  return (
                                    <li
                                      key={`${label}-${bi}`}
                                      className="flex items-center gap-2.5 text-sm text-brand-navy/75"
                                    >
                                      <span className="product-bullet">
                                        <Check size={13} strokeWidth={1.7} />
                                      </span>
                                      {label}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        ) : hasFeatures ? (
                          <div className="mt-6 grid gap-3 border-t border-brand-navy/8 pt-6 sm:grid-cols-3">
                            {p.features.map((label) => (
                              <div key={label} className="product-chip">
                                <span className="product-chip-icon about-float">
                                  <Sparkles size={15} strokeWidth={1.6} />
                                </span>
                                {label}
                              </div>
                            ))}
                          </div>
                        ) : hasBenefits ? (
                          <div className="mt-6 grid gap-3 border-t border-brand-navy/8 pt-6 sm:grid-cols-3">
                            {p.benefits.map((b, bi) => {
                              const label = b.title || b.heading || `Benefit ${bi + 1}`;
                              return (
                                <div key={`${label}-${bi}`} className="product-chip">
                                  <span className="product-chip-icon about-float">
                                    <Check size={15} strokeWidth={1.6} />
                                  </span>
                                  {label}
                                </div>
                              );
                            })}
                          </div>
                        ) : null}

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                          <Link
                            to="/products/$productId"
                            params={{ productId: p._id }}
                            className="product-link"
                          >
                            Learn More <ArrowRight size={14} />
                          </Link>

                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* -------------------------------------------- CERTIFICATION */}
        <section className="relative px-6 py-8 sm:px-12 lg:py-12">
          <Reveal className="mx-auto w-full max-w-[100rem]">
            <div className="about-card grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="flex items-start gap-4">
                <span className="product-no shrink-0">
                  {products.length ? getSerialNo(products.length) : "05"}
                </span>
                <div>
                  <h2 className="font-display text-2xl">IEC Certified Technology</h2>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-brand-navy/65">
                    Our systems are designed, tested and certified to international marine safety
                    standards.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {CERTS.map((c) => (
                  <div key={c.code} className="product-cert">
                    <span className="product-cert-badge">IEC</span>
                    <div>
                      <p className="font-display text-base text-brand-navy">{c.code}</p>
                      <p className="mt-1 text-xs leading-relaxed text-brand-navy/60">{c.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* -------------------------------------------- BENEFITS */}
        <section className="relative px-6 py-10 sm:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-[100rem]">
            <Reveal className="text-center">
              <p className="about-eyebrow">Why It Matters</p>
              <h2 className="display-xl mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
                Built for a Cleaner Tomorrow
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
              {BENEFITS.map(({ label, Icon }, i) => (
                <Reveal key={label} delay={(i % 4) * 0.06}>
                  <div className="about-card flex h-full flex-col items-center gap-3 px-4 py-6 text-center">
                    <span className="about-icon about-float">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <p className="text-xs font-semibold leading-snug text-brand-navy/80">{label}</p>
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
