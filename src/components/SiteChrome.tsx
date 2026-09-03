import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";

import { onScrollFrame } from "@/lib/scroll-scrub";


const NAV: { label: string; to?: string }[] = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Solutions", to: "/solutions" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];


const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/yesen-technologies/",
    Icon: Linkedin,
    brand: "#0A66C2",
  },
  { label: "Facebook", href: "https://www.facebook.com/yesensustain", Icon: Facebook, brand: "#1877F2" },
  { label: "Instagram", href: "https://www.instagram.com/yesensustain/", Icon: Instagram, brand: "#E1306C" },
  { label: "YouTube", href: "https://www.youtube.com/@yesentechnologies", Icon: Youtube, brand: "#FF0000" },
  { label: "Email", href: "mailto:info@yesentechnologies.com", Icon: Mail, brand: "#EA4335" },
];

const FOOTER_LINKS: {
  heading: string;
  items: { label: string; to?: string; href?: string; hash?: string }[];
}[] = [
    {
      heading: "Quick links",
      items: [
        { label: "FAQ", to: "/faq" },
        { label: "Disclaimer", to: "/legal", hash: "disclaimer" },
        { label: "Terms and Conditions", to: "/legal", hash: "terms" },
        { label: "Policies", to: "/legal", hash: "policies" },
      ],
    },
    {
      heading: "Company",
      items: [
        { label: "About us", to: "/about" },
        { label: "Products", to: "/products" },
        { label: "Solutions", to: "/solutions" },
        { label: "Projects", to: "/projects" },
      ],
    },
    {
      heading: "Connect",
      items: [
        { label: "Contact", to: "/contact" },
        { label: "Get a quote", to: "/enquire" },
        { label: "Global offices", to: "/contact", hash: "offices" },
        { label: "Email us", href: "mailto:info@yesentechnologies.com" },
      ],
    },
  ];


const OFFICES = [
  {
    country: "India",
    lines: [
      "YESEN Technologies Pvt Ltd",
      "5th floor, YESEN Enclave, Vallamattam Estate",
      "Ravipuram, Kochi, Kerala 682015",
    ],
    tel: "+91 77080 07554",
  },
  {
    country: "USA",
    lines: ["YESEN Technologies Inc.", "8 The Green, Ste A", "Dover, DE 19901"],
    tel: "+1 917 609 8082",
  },
  {
    country: "UAE",
    lines: ["YESEN Technologies — MENA", "206, Bin Sougat Building", "PO Box 6727, Dubai"],
    tel: "+971 58 670 6900",
  },
  {
    country: "Australia",
    lines: ["YESEN Technologies Pvt Ltd", "Unit 19, Level 2, 100 Railway Road", "Subiaco WA 6008"],
    tel: "+61 490 928 496",
  },
];

/** Header used on light-background inner pages. Same layout language as home. */
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    // Batched into the shared scroll frame, with a small dead zone so inertial
    // scrolling can't flip the header open/closed on sub-pixel deltas.
    return onScrollFrame(() => {
      const y = window.scrollY;
      const down = y > lastY.current + 4;
      const up = y < lastY.current - 4;
      if (down || up) {
        setHidden(down && y > 120);
        lastY.current = y;
      }
      setAtTop(y < 40);
    });
  }, []);


  return (
    <header
      style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      className={`fixed inset-x-0 top-0 z-50 transform-gpu transition-transform duration-300 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      <div
        className={`transition-colors duration-300 ${atTop ? "bg-transparent" : "border-b border-brand-navy/10 bg-white/70 backdrop-blur-xl"
          }`}
      >
        <div
          className={`relative mx-auto flex w-full max-w-[100rem] items-center justify-between gap-6 px-6 transition-[padding] duration-300 sm:px-12 ${atTop ? "py-7" : "py-4"
            }`}
        >
          <Link to="/" aria-label="YESEN Technologies Pvt Ltd home" className="shrink-0">
            <Logo className={`w-auto transition-[height] duration-300 ${atTop ? "h-12" : "h-10"}`} />
          </Link>


          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex" aria-label="Main">
            {NAV.map((item) => {
              const cls =
                "relative py-1 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-brand-navy transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-brand-leaf after:transition-transform after:duration-500 hover:text-brand-forest hover:after:origin-left hover:after:scale-x-100";
              return item.to ? (
                <Link key={item.label} to={item.to} className={cls}>
                  {item.label}
                </Link>
              ) : (
                <span key={item.label} className={cls}>
                  {item.label}
                </span>
              );
            })}
          </nav>

          <div className="hidden shrink-0 md:block">
            <Link to="/enquire" className="inline-flex h-11 items-center rounded-full border border-brand-navy/15 bg-white/70 px-6 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-brand-navy shadow-[0_10px_30px_-18px_color-mix(in_oklab,var(--brand-navy)_70%,transparent)] backdrop-blur-md transition-colors hover:border-brand-leaf hover:text-brand-forest">
              Get a quote
            </Link>
          </div>

          <MobileNav tone="dark" />

        </div>

      </div>
    </header>
  );
}


export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto mb-[clamp(0.5rem,2vw,2rem)] w-[calc(100%-2*clamp(0.5rem,2vw,2rem))] max-w-[108rem] overflow-hidden rounded-[clamp(1rem,2vw,2rem)] border border-border bg-shell shadow-[0_40px_90px_-45px_color-mix(in_oklab,var(--brand-navy)_60%,transparent)]">
      <div className="mx-auto grid w-full max-w-[100rem] grid-cols-3 gap-x-8 gap-y-10 px-6 py-16 sm:gap-x-12 sm:px-12 md:grid-cols-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="col-span-3 md:col-span-1">
          <Logo className="h-14 w-auto" />
          <p className="mt-4 text-[0.78rem] font-medium tracking-[0.02em] text-brand-forest">
            Erstwhile YESEN SUSTAIN Pvt Ltd
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Green technologies that make economic sense — engineered for smart cities and the
            remotest parts of the earth.
          </p>


          <h3 className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-brand-forest">
            Our networks
          </h3>
          <ul className="mt-4 flex flex-wrap items-center gap-3">
            {SOCIALS.map(({ label, href, Icon, brand }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  aria-label={label}
                  title={label}
                  style={{ ["--social-brand" as string]: brand }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-[var(--social-brand)] hover:bg-[var(--social-brand)] hover:text-white"
                >
                  <Icon size={17} />
                </a>
              </li>
            ))}

          </ul>
        </div>

        {FOOTER_LINKS.map((col) => (
          <div key={col.heading}>
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-brand-forest">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {col.items.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      hash={item.hash}
                      className="story-link transition-colors hover:text-brand-navy"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="story-link transition-colors hover:text-brand-navy"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}

            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-[100rem] px-6 py-12 sm:px-12">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-brand-forest">
            Our global offices
          </h3>
          <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {OFFICES.map((office) => (
              <li key={office.country}>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="shrink-0 text-brand-leaf" />
                  <span className="text-sm font-semibold text-brand-navy">{office.country}</span>
                </div>
                <address className="mt-2 space-y-0.5 text-sm not-italic leading-relaxed text-muted-foreground">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a
                    href={`tel:${office.tel.replace(/\s/g, "")}`}
                    className="mt-1 inline-block transition-colors hover:text-brand-navy"
                  >
                    {office.tel}
                  </a>

                </address>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[100rem] items-center justify-center px-6 py-6 sm:px-12">
          <p className="font-mono !text-[0.5rem] tracking-[0.1em] text-muted-foreground sm:!text-[0.55rem] sm:tracking-[0.12em] lg:!text-[0.7rem] lg:tracking-[0.14em]">
            © {new Date().getFullYear()} YESEN Technologies Pvt Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}
