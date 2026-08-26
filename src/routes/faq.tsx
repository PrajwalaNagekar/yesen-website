import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Mail, Plus } from "lucide-react";
import { useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | YESEN Technologies Pvt Ltd — Sustainable Energy & Clean Tech" },
      {
        name: "description",
        content:
          "Find answers to frequently asked questions about YESEN Technologies Pvt Ltd' solar, energy storage, e-marine and clean water solutions.",
      },
      {
        property: "og:title",
        content: "FAQ | YESEN Technologies Pvt Ltd — Sustainable Energy & Clean Tech",
      },
      {
        property: "og:description",
        content:
          "Common questions about our sustainable energy solutions, project delivery and global operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/faq" }],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "What does YESEN Technologies Pvt Ltd actually build?",
    a: "Solar farms, floating solar plants, hybrid microgrids, energy storage, electric marine propulsion, clean water and waste-management systems — designed, engineered and commissioned end to end.",
  },
  {
    q: "Do you work outside India?",
    a: "Yes. We operate from offices in India, USA, UAE and Australia, with delivered projects across Asia, Australia, the Middle East and the Pacific.",
  },
  {
    q: "Can you retrofit an existing system?",
    a: "Our solutions are modular and scalable. They can stand alone or integrate with generators, grid supply or an existing renewable installation.",
  },
  {
    q: "How long does a typical project take?",
    a: "Feasibility and design usually run four to eight weeks; delivery depends on scale, from a few weeks for rooftop systems to several months for utility-scale plants.",
  },
  {
    q: "Do you support the system after commissioning?",
    a: "Yes. Long-term operations, monitoring and maintenance support is part of how we work — most of our clients stay with us well beyond handover.",
  },
  {
    q: "Which industries do you serve?",
    a: "We work with marine tourism, hospitality, telecom, rural electrification, industrial campuses and government infrastructure — anywhere reliable clean energy matters.",
  },
  {
    q: "Are your products manufactured in-house?",
    a: "We design and build our own indigenous range — T-Secure, P-Secure and H-Secure — alongside strategic partnerships with global technology leaders like Phocos and V-Sun.",
  },
];

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-border">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start gap-5 py-6 text-left sm:gap-6 sm:py-7"
            >
              <span className="mt-1 font-mono text-[0.65rem] tracking-[0.28em] text-brand-leaf">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display-xl flex-1 text-base text-brand-navy transition-colors duration-300 group-hover:text-brand-forest sm:text-lg">
                {f.q}
              </span>
              <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full border border-brand-navy/20 text-brand-navy transition-all duration-500 group-hover:border-brand-leaf group-hover:text-brand-leaf sm:h-7 sm:w-7">
                <Plus
                  className={`h-3.5 w-3.5 transition-transform duration-500 sm:h-4 sm:w-4 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  strokeWidth={1.8}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="pb-6 pl-10 pr-10 text-[0.9rem] leading-[1.8] text-muted-foreground sm:pb-7 sm:pl-12">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function FaqPage() {
  return (
    <div className="relative min-h-screen bg-canvas font-sans text-foreground antialiased">
      <SiteHeader />

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,rgba(41,167,225,0.12),transparent_50%),linear-gradient(180deg,#f8fbfd_0%,#eef6fa_100%)] px-6 pt-40 pb-16 sm:px-10 sm:pt-48 sm:pb-20">
          <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, var(--brand-navy) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-[70rem]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-leaf/40 bg-brand-leaf/10 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-brand-forest">
                <HelpCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
                Support
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-xl mt-6 max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.05] text-brand-navy">
                Questions? We are{" "}
                <span className="accent-italic text-brand-forest">here to help</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-base leading-[1.85] text-muted-foreground sm:text-lg">
                Everything you need to know about our sustainable energy solutions, delivery process
                and global operations.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ content */}
        <section className="mx-auto w-full max-w-[70rem] px-6 py-16 sm:px-10 sm:py-24">
          <Reveal>
            <FaqAccordion />
          </Reveal>
        </section>

        {/* Contact CTA */}
        <section className="bg-brand-navy px-6 py-20 text-center text-brand-ivory sm:px-10 sm:py-28">
          <div className="mx-auto max-w-[60rem]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-leaf/50 bg-brand-leaf/15 px-4 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.3em] text-brand-leaf">
                <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
                Still curious?
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-xl mt-8 text-[clamp(1.8rem,4.5vw,3.5rem)] leading-tight">
                Let us talk about your{" "}
                <span className="accent-italic text-brand-leaf">next project</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.85] text-brand-ivory/75">
                Our engineers are ready to answer technical questions and shape an approach that
                fits your site, load profile and sustainability goals.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <Link to="/contact" className="mt-10 inline-flex items-center gap-3 rounded-full border border-brand-ivory/60 bg-brand-navy/25 px-8 py-4 font-mono text-[0.72rem] uppercase tracking-[0.32em] text-brand-ivory backdrop-blur-md transition-colors hover:border-brand-leaf hover:bg-brand-leaf hover:text-brand-navy">
                Contact us
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
