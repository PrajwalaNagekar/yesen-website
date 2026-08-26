import { Link, createFileRoute } from "@tanstack/react-router";
import { FileText, ScrollText, ShieldCheck } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal — Disclaimer, Terms & Policies | YESEN Technologies Pvt Ltd" },
      {
        name: "description",
        content:
          "Disclaimer, terms and conditions and operating policies for YESEN Technologies Pvt Ltd (erstwhile YESEN SUSTAIN Pvt Ltd) — engineering, supply and commissioning of clean energy systems.",
      },
      { property: "og:title", content: "Legal — Disclaimer, Terms & Policies | YESEN Technologies Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Disclaimer, terms and conditions and operating policies for YESEN Technologies Pvt Ltd (erstwhile YESEN SUSTAIN Pvt Ltd)."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/legal" }],
  }),
  component: LegalPage,
});

const SECTIONS = [
  {
    id: "disclaimer",
    Icon: FileText,
    kicker: "01 / Disclaimer",
    title: "Disclaimer",
    body: [
      "The information published on this website is provided for general information about YESEN Technologies Pvt Ltd (erstwhile YESEN SUSTAIN Pvt Ltd) and its products, solutions and projects. While we take care to keep it accurate and current, it is not offered as engineering advice, a performance guarantee or a commercial offer.",
      "Technical figures — capacities, ranges, efficiencies, savings and timelines — are indicative and depend on site conditions, load profiles, vessel design, regulation and the final scope agreed in writing. Any figure that matters commercially must be confirmed in a signed proposal.",
      "Product images, renders and project photography are illustrative. Specifications evolve as our engineering improves, and we may change them without notice. External links are provided for convenience; we are not responsible for third-party content.",
    ],
  },
  {
    id: "terms",
    Icon: ScrollText,
    kicker: "02 / Terms and Conditions",
    title: "Terms and conditions",
    body: [
      "By using this website you agree to use it lawfully and not to attempt to disrupt, reverse engineer, scrape at scale or gain unauthorised access to it or to any system connected with it.",
      "All content — text, drawings, photography, logos, product names and marks including YESEN, YESEN SUSTAIN, E-MARINE, B-KOOL and V-SUN — remains the property of YESEN Technologies Pvt Ltd or its licensors. You may share and quote content with clear attribution, but not reproduce it commercially without written permission.",
      "Enquiries submitted through this website do not create a contract. A project begins only when scope, price, delivery schedule and warranty terms are confirmed in a signed agreement, which governs the engagement in full.",
      "To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this website. These terms are governed by the laws of India, with jurisdiction in Kochi, Kerala, unless a signed agreement states otherwise.",
    ],
  },
  {
    id: "policies",
    Icon: ShieldCheck,
    kicker: "03 / Policies",
    title: "Policies",
    body: [
      "Privacy: we collect only what you send us — name, organisation, contact details and project context — and use it solely to respond to your enquiry and maintain the relationship. We do not sell personal data. Write to info@yesentechnologies.com to access, correct or delete your details.",
      "Cookies and analytics: this site uses only what is needed to serve pages reliably and understand aggregate traffic. No advertising profiles are built from your visit.",
      "Quality and safety: every system is designed, built and commissioned against the applicable marine, electrical and structural standards for its jurisdiction, with documented testing before handover.",
      "Sustainability: we design for long service life, repairability and end-of-life recovery — batteries, panels and drives are specified so components can be reused or recycled rather than discarded.",
      "Support: commissioned systems are covered by the warranty and service terms in their project agreement, with remote monitoring and scheduled maintenance available across all regions we operate in.",
    ],
  },
];

function LegalPage() {
  return (
    <div className="relative min-h-screen bg-canvas font-sans text-foreground antialiased">
      <SiteHeader />

      <main className="relative z-10">
        <section className="relative overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,rgba(41,167,225,0.12),transparent_50%),linear-gradient(180deg,#f8fbfd_0%,#eef6fa_100%)] px-6 pb-16 pt-40 sm:px-10 sm:pb-20 sm:pt-48">
          <div className="relative mx-auto w-full max-w-[70rem]">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-leaf/40 bg-brand-leaf/10 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-brand-forest">
              Legal
            </span>
            <h1 className="display-xl mt-6 max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.05] text-brand-navy">
              Disclaimer, terms and{" "}
              <span className="accent-italic text-brand-forest">policies</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[1.85] text-muted-foreground sm:text-lg">
              How this website may be used, what our published figures mean, and how we handle your
              information across every region we operate in.
            </p>
            <nav className="mt-10 flex flex-wrap gap-3" aria-label="Legal sections">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-brand-navy/15 bg-white/70 px-5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-brand-navy transition-colors hover:border-brand-leaf hover:text-brand-forest"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[70rem] space-y-16 px-6 py-16 sm:space-y-20 sm:px-10 sm:py-24">
          {SECTIONS.map(({ id, Icon, kicker, title, body }) => (
            <article key={id} id={id} className="scroll-mt-28 border-t border-brand-navy/10 pt-10">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-brand-leaf/40 bg-brand-leaf/10 text-brand-forest">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brand-forest">
                  {kicker}
                </span>
              </div>
              <h2 className="display-xl mt-6 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight text-brand-navy">
                {title}
              </h2>
              <div className="mt-6 space-y-5 text-[0.95rem] leading-[1.9] text-muted-foreground">
                {body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </article>
          ))}

          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
            Last updated {new Date().getFullYear()} · Questions?{" "}
            <Link to="/contact" className="text-brand-forest underline-offset-4 hover:underline">
              Contact us
            </Link>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
