import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Gauge,
  Layers,
  MonitorSmartphone,
  Palmtree,
  Radio,
  Ship,
  Shield,
  Workflow,
  Wrench,
  Sun,
  CircuitBoard,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { fetchSolution, solutionImageUrl } from "@/api/solutions";
import { SiteFooter } from "@/components/SiteChrome";
import { MarineInquiryDrawer } from "@/components/MarineInquiryDrawer";

const ICONS: LucideIcon[] = [
  Workflow,
  CircuitBoard,
  Sun,
  Ship,
  Zap,
  Activity,
  Palmtree,
  Wrench,
  Shield,
];

const BENEFIT_ICONS: LucideIcon[] = [
  MonitorSmartphone,
  Activity,
  Radio,
  Layers,
  Shield,
  Gauge,
];

export const Route = createFileRoute("/solutions_/$solutionId")({
  loader: async ({ params }) => {
    try {
      const solution = await fetchSolution(params.solutionId);
      if (!solution?._id) throw notFound();
      return { solution };
    } catch (err) {
      if (err && typeof err === "object" && "status" in err) {
        const status = (err as { status?: number }).status;
        if (status === 404 || status === 400) throw notFound();
      }
      throw err;
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData?.solution) {
      return {
        meta: [
          { title: "Solution not found | YESEN Technologies Pvt Ltd" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { solution } = loaderData;
    const title = `${solution.name} | YESEN Technologies Pvt Ltd`;
    const description = solution.description || solution.tagline || solution.name;
    const image = solutionImageUrl(solution) ?? undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: SolutionDetailPage,
});

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

function SolutionDetailPage() {
  const { solution } = Route.useLoaderData();
  const imageUrl = solutionImageUrl(solution);
  const benefits = solution.benefits ?? [];
  const stats = solution.stats ?? [];
  const features =
    solution.features && solution.features.length > 0
      ? solution.features
      : benefits.map((b) => b.point).filter(Boolean);

  const serialFormatted = String(solution.serialNo ?? 1).padStart(2, "0");
  const iconIndex = typeof solution.serialNo === "number" ? Math.max(0, solution.serialNo - 1) : 0;
  const Icon = ICONS[iconIndex % ICONS.length];

  return (
    <div className="me-page min-h-screen font-sans antialiased">
      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="me-hero relative isolate overflow-hidden">
          <div className="mx-auto w-full max-w-[80rem] px-6 pb-20 pt-24 sm:px-10">
            {/* Breadcrumbs */}
            <div className="mb-8 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/45">
              <Link to="/solutions" className="me-back">
                <ArrowLeft size={15} strokeWidth={1.8} />
                <span>Solutions</span>
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/70">{solution.name}</span>
            </div>

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
              <Reveal>
                <div className="flex items-center gap-3.5">
                  <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-white/14 bg-white/[0.03] text-white">
                    <Icon size={21} strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[0.78rem] uppercase tracking-[0.32em] text-white/60">
                    {serialFormatted} / Solution
                  </span>
                </div>

                <div className="my-8 h-px w-full bg-white/14" />

                <h1 className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold uppercase leading-[1.06] tracking-[-0.01em] text-white">
                  {solution.name}
                </h1>

                {solution.tagline ? (
                  <p className="mt-6 max-w-[30rem] text-[1.05rem] leading-relaxed text-white/60">
                    {solution.tagline}
                  </p>
                ) : null}

                {features.length > 0 ? (
                  <ul className="mt-9 grid gap-3.5 sm:grid-cols-2">
                    {features.map((f, i) => (
                      <li key={`${f}-${i}`} className="flex items-center gap-3 text-[0.95rem] text-white/85">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-sky/45 bg-brand-sky/15 text-brand-sky">
                          <Check size={12} strokeWidth={2.6} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>

              <Reveal delay={0.12}>
                <div className="me-visual">
                  {imageUrl ? (
                    <img src={imageUrl} alt={solution.name} loading="lazy" decoding="async" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#0c2b4d] text-white/30">
                      <Icon size={64} strokeWidth={1.2} />
                    </div>
                  )}
                  <span className="me-visual-index" aria-hidden="true">
                    {serialFormatted}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* HOW WE DELIVER SECTION (What's Included) */}
        <section className="me-band">
          <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
            <Reveal className="mx-auto max-w-[40rem] text-center">
              <p className="me-eyebrow">What&apos;s Included</p>
              <h2 className="me-h2 mt-4">How we deliver {solution.name}</h2>
              {solution.description ? (
                <p className="mt-4 text-[1rem] leading-relaxed text-white/60">
                  {solution.description}
                </p>
              ) : null}
            </Reveal>

            {benefits.length > 0 ? (
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {benefits.map((b, i) => {
                  const BIcon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                  return (
                    <Reveal key={`${b.point}-${i}`} delay={i * 0.08}>
                      <article className="me-card h-full">
                        <span className="me-card-icon">
                          <BIcon size={18} strokeWidth={1.9} />
                        </span>
                        <h3 className="me-h3">{b.point}</h3>
                        <p className="mt-2.5 text-[0.9rem] leading-relaxed text-white/60">
                          {b.explanation}
                        </p>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            ) : null}

            {stats.length > 0 ? (
              <Reveal delay={0.1}>
                <div className="me-stats">
                  {stats.map((s, i) => (
                    <div key={`${s.label}-${i}`} className="me-stat">
                      <p className="me-stat-value">{s.value}</p>
                      <p className="mt-2 text-[0.85rem] leading-snug text-white/60">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>

        {/* GET IN TOUCH SECTION */}
        <section className="me-band me-inquiry">
          <div className="mx-auto flex w-full max-w-[80rem] flex-wrap items-center justify-between gap-10 px-6 sm:px-10">
            <Reveal className="max-w-[34rem]">
              <p className="me-eyebrow">Get in Touch</p>
              <h2 className="me-h2 mt-4">
                Interested in <span className="me-grad">{solution.name}</span>?
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
                  search={{ solution: solution._id, type: "solution" }}
                  className="me-btn me-btn-primary inline-flex items-center gap-2"
                >
                  Enquire now <ArrowRight size={15} />
                </Link>
                <MarineInquiryDrawer solution={solution.name} triggerClassName="me-btn me-btn-ghost" triggerLabel="Quick drawer" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

