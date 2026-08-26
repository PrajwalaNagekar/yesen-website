import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { CountryFlag } from "@/components/CountryFlag";
import { EarthGlobe, type GlobePoint } from "@/components/EarthGlobe";
import { useSiteMotion } from "@/hooks/use-site-motion";
import contactHeroVideo from "@/assets/contact-hero.mp4.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | YESEN Technologies Pvt Ltd — Marine Electrification" },
      {
        name: "description",
        content:
          "Talk to the YESEN Technologies Pvt Ltd team about solar electric vessels, retrofits and marine tourism infrastructure. Offices in Kerala, Delaware, Dubai and Western Australia.",
      },
      { property: "og:title", content: "Contact Us | YESEN Technologies Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Have a project in mind? Reach the YESEN Technologies Pvt Ltd team for solar electric marine solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.yesen.website/contact" }],
  }),
  component: ContactPage,
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const REGIONS = ["India", "USA", "Middle East", "Australia", "Pacific", "Other"];

const SUBJECTS = [
  "General Enquiry",
  "Vessel electrification",
  "Solar integration",
  "Retrofit enquiry",
  "Marine tourism infrastructure",
  "Partnership",
];

type Office = {
  code: "in" | "us" | "ae" | "au" | "gu";
  country: string;
  city: string;
  phone: string;
  email?: string;
  address: string[];
  query: string;
  lat: number;
  lon: number;
};

const OFFICES: Office[] = [
  {
    code: "in",
    country: "India",
    city: "Kerala",
    phone: "+91 95001 65477",
    email: "info@yesentechnologies.com",
    address: [
      "YESEN Technologies Pvt Ltd, 5th Floor",
      "YESEN Enclave, Vallamattam Estate",
      "Ravipuram, Kochi, Kerala 682015",
    ],
    query: "9.9707,76.2836(YESEN+Enclave+Ravipuram+Kochi)",
    lat: 9.9707,
    lon: 76.2836,
  },
  {
    code: "us",
    country: "USA",
    city: "Delaware",
    phone: "+91 95001 65477",
    email: "info@yesentechnologies.com",
    address: ["YESEN Technologies Inc.", "8 The Green, Ste A", "Dover, DE 19901, USA"],
    query: "39.1582,-75.5244(Yesen+Sustain+Inc+Dover+Delaware)",
    lat: 39.1582,
    lon: -75.5244,
  },
  {
    code: "ae",
    country: "UAE",
    city: "Dubai",
    phone: "+91 95001 65477",
    email: "info@yesentechnologies.com",
    address: ["YESEN Technologies — MENA", "206, Bin Sougat Building", "PO Box 6727, Dubai, UAE"],
    query: "25.2404,55.3703(Bin+Sougat+Building+Dubai)",
    lat: 25.2404,
    lon: 55.3703,
  },
  {
    code: "au",
    country: "Western Australia",
    city: "Western Australia",
    phone: "+91 95001 65477",
    email: "info@yesentechnologies.com",
    address: [
      "YESEN Technologies Pvt Ltd",
      "Unit 19, Level 2, 100 Railway Road",
      "Subiaco WA 6008, Australia",
    ],
    query: "-31.9469,115.8244(YESEN+Technologies+Subiaco+Perth)",
    lat: -31.9469,
    lon: 115.8244,
  },
];

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(1, "Please enter your phone number").max(30),
  location: z.string().trim().min(1, "Please select your location"),
  subject: z.string().trim().min(1, "Please select a subject"),
  message: z.string().trim().min(1, "Please write a short message").max(1000),
  consent: z.literal("on", { message: "Please accept the privacy policy" }),
});

/* -------------------------------------------------------------------------- */

const GLOBE_POINTS: GlobePoint[] = OFFICES.map((o) => ({
  id: o.city,
  lat: o.lat,
  lon: o.lon,
  label: o.city,
}));

function OfficeRow({
  office,
  active,
  onSelect,
}: {
  office: Office;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group w-full border-b border-brand-navy/12 px-1 py-5 text-left transition-colors duration-500 ${
        active ? "bg-brand-navy/[0.04]" : "hover:bg-brand-navy/[0.02]"
      }`}
    >
      <span className="flex items-start gap-4">
        <span
          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ${
            active ? "bg-brand-leaf" : "bg-brand-navy/25"
          }`}
        />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-3">
            <span className="ctx-flag">
              <CountryFlag code={office.code} title={office.country} />
            </span>
            <span className="font-display text-lg leading-tight text-brand-navy">
              {office.city}
            </span>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-brand-navy/40">
              {office.country}
            </span>
          </span>

          <motion.span
            initial={false}
            animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="block overflow-hidden"
          >
            <span className="mt-3 block space-y-1 text-[0.85rem] leading-relaxed text-brand-navy/70">
              {office.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block pt-2">
                <a
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                  className="underline decoration-brand-leaf underline-offset-4"
                >
                  {office.phone}
                </a>
              </span>
              {office.email ? (
                <span className="block">
                  <a
                    href={`mailto:${office.email}`}
                    className="underline decoration-brand-leaf underline-offset-4"
                  >
                    {office.email}
                  </a>
                </span>
              ) : null}
            </span>
          </motion.span>
        </span>
      </span>
    </button>
  );
}

function ContactPage() {
  const [sending, setSending] = useState(false);
  const [activeOffice, setActiveOffice] = useState<string | null>(OFFICES[0].city);
  useSiteMotion();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Thank you — your message is on its way to our team.");
    }, 700);
  };

  return (
    <div className="about-page relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10">
        {/* ------------------------------------------------------------ HERO */}
        <section className="ctx-hero hero-safe-top px-6 pt-24 sm:px-12 sm:pt-28">
          <div className="mx-auto w-full max-w-[100rem]">
            <div className="ctx-hero-grid">
              <Reveal>
                <h1 className="ctx-hero-title">
                  Contact
                  <br />
                  YESEN Technologies Pvt Ltd
                </h1>
              </Reveal>
              <Reveal delay={0.1} className="ctx-hero-copy-col">
                <p className="ctx-hero-copy ctx-hero-copy-right">
                  Whether you have a question, need expert advice, or want to discuss your next
                  project, our dedicated team is here to help - reach out and experience our
                  commitment to seamless service and support
                </p>
                <div className="ctx-hero-rule-right" aria-hidden="true" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- OFFICES */}
        <section id="offices" className="scroll-mt-16 px-6 pt-12 sm:px-12 sm:pt-16">
          <div className="mx-auto w-full max-w-[100rem]">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <Reveal>
                <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
                  <EarthGlobe
                    points={GLOBE_POINTS}
                    activeId={activeOffice}
                    className="h-full w-full"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-forest">
                  Where we operate
                </span>
                <h2 className="display-xl mt-5 text-3xl text-brand-navy sm:text-[2.75rem]">
                  Five offices, one <span className="accent-italic">shared coastline</span>
                </h2>
                <p className="mt-4 max-w-md text-[0.9rem] leading-relaxed text-brand-navy/65">
                  Select a location to bring it into view on the globe.
                </p>

                <div className="mt-8 border-t border-brand-navy/12">
                  {OFFICES.map((o) => (
                    <OfficeRow
                      key={o.city}
                      office={o}
                      active={activeOffice === o.city}
                      onSelect={() =>
                        setActiveOffice((cur) => (cur === o.city ? null : o.city))
                      }
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- ASSIST */}
        <section id="assist" className="ctx-assist mt-16 scroll-mt-16">
          <div className="ctx-assist-media" aria-hidden="true">
            <video src={contactHeroVideo.url} autoPlay muted loop playsInline preload="auto" />
          </div>

          <div className="mx-auto w-full max-w-[100rem] px-6 sm:px-12">
            <div className="ctx-assist-inner">
              <Reveal>
                <h2 className="ctx-assist-title">
                  Let us know
                  <br />
                  how we can
                  <br />
                  assist you
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="ctx-form-card">
                  <form onSubmit={onSubmit} noValidate>
                    <label className="ctx-field">
                      <span>
                        Full Name <i>*</i>
                      </span>
                      <input name="name" maxLength={100} placeholder="Enter your full name" />
                    </label>
                    <label className="ctx-field">
                      <span>
                        Email Address <i>*</i>
                      </span>
                      <input
                        name="email"
                        type="email"
                        maxLength={255}
                        placeholder="your@email.com"
                      />
                    </label>
                    <label className="ctx-field">
                      <span>
                        Phone Number <i>*</i>
                      </span>
                      <input name="phone" maxLength={30} placeholder="Your phone number" />
                    </label>
                    <label className="ctx-field">
                      <span>
                        Your Location <i>*</i>
                      </span>
                      <select name="location" defaultValue="">
                        <option value="" disabled>
                          Select your region
                        </option>
                        {REGIONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="ctx-field">
                      <span>
                        Subject <i>*</i>
                      </span>
                      <select name="subject" defaultValue="General Enquiry">
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="ctx-field">
                      <span>
                        Your Message <i>*</i>
                      </span>
                      <textarea
                        name="message"
                        rows={2}
                        maxLength={1000}
                        placeholder="Please provide details about your enquiry"
                      />
                    </label>

                    <label className="ctx-consent">
                      <input type="checkbox" name="consent" />
                      <span>
                        I agree to the Privacy Policy and consent to my data being used to respond
                        to my enquiry.
                      </span>
                    </label>

                    <button type="submit" className="ctx-submit" disabled={sending}>
                      {sending ? "Sending..." : "Submit"}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
