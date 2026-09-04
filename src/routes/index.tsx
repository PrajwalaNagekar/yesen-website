import { createFileRoute, Link } from "@tanstack/react-router";
import ProjectsPhotos from "@/components/ProjectsPhotos";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Facebook,
  Instagram,
  LineChart,
  Linkedin,
  Mail,
  MapPin,
  Ship,
  Smartphone,
  Sun,
  Youtube,
  Zap,
} from "lucide-react";



import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";

import { SplashScreen } from "@/components/SplashScreen";
import TestimonialWall from "@/components/TestimonialWall";


import WhyYesen from "@/components/WhyYesen";
import { onScrollFrame } from "@/lib/scroll-scrub";

import PartnersSection from "@/components/PartnersSection";
import TechDeepDive from "@/components/TechDeepDive";



import projectGuamMain from "@/assets/project-guam-main.jpg";
import projectGuam2 from "@/assets/project-guam-2.jpg";
import projectGuam3 from "@/assets/project-guam-3.jpg";
import projectHouseSolar from "@/assets/project-house-solar.jpg";
import projectKeralaHouse from "@/assets/project-kerala-house.jpg";
import projectCialBoat from "@/assets/project-cial-boat.jpg";
import projectCarport from "@/assets/project-carport.jpg";
import ongoingDam from "@/assets/ongoing-patratu-dam.jpg";
import ongoingHouseboat from "@/assets/ongoing-houseboat.jpg";
import ongoingInt1 from "@/assets/ongoing-int-1.jpg";
import ongoingInt2 from "@/assets/ongoing-int-2.jpg";
import ongoingInt3 from "@/assets/ongoing-int-3.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import capabilitySolutions from "@/assets/capability-solutions.jpg";
import capabilityProducts from "@/assets/capability-products.jpg";
import capabilityProjects from "@/assets/capability-projects.jpg";

import emarineDecarbonize from "@/assets/emarine-decarbonize.jpg";
import vesselHouseboat from "@/assets/vessel-houseboat.jpg";
import vesselShikara from "@/assets/vessel-shikara.jpg";
import vesselFerry from "@/assets/vessel-ferry.jpg";
import vesselRoro from "@/assets/vessel-roro.jpg";
import vesselPartyBoat from "@/assets/vessel-party-boat.jpg";
import vesselBarge from "@/assets/vessel-barge.jpg";
import vesselJankarFerry from "@/assets/vessel-jankar-ferry.jpg";
import vesselSailboat from "@/assets/vessel-sailboat.jpg";
import vesselShip from "@/assets/vessel-ship.jpg";
import vesselEcoReserve from "@/assets/vessel-eco-reserve.jpg";
import heroVideo from "@/assets/yesen-hero-1080p_v6.mp4.asset.json";
import heroVideoMobile from "@/assets/yesen-hero-mobile-1080_v2_2.mp4.asset.json";
import { useIsMobile } from "@/hooks/use-mobile";
import keralaSolarBoat from "@/assets/Kerala_Solar_Boat_trimmed.mp4.asset.json";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YESEN Technologies Pvt Ltd | Sustainable Energy & Clean Tech" },
      {
        name: "description",
        content:
          "YESEN Technologies Pvt Ltd designs solar, energy storage, e-marine and clean water solutions that transform lives across Asia, Australia and the Middle East.",
      },
      { property: "og:title", content: "YESEN Technologies Pvt Ltd | Sustainable Energy & Clean Tech" },
      {
        property: "og:description",
        content:
          "Solar farms, hybrid microgrids, electric marine propulsion and rural electrification — engineered for a sustainable world.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yesen.website/" },
      {
        property: "og:image",
        content: "https://yesen.website/assets/emarine-decarbonize-PE95gLeC.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://yesen.website/assets/emarine-decarbonize-PE95gLeC.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/" }],
  }),
  component: Home,
});

const NAV = ["About", "Products", "Solutions", "Projects", "Contact"];



const FEATURES = [
  {
    id: "01",
    title: "Real-Time Monitoring & Control",
    body: "Live vessel data, battery status, motor performance, and system health, at your fingertips.",
    Icon: LineChart,
  },
  {
    id: "02",
    title: "Operational Cost & Data Analytics",
    body: "Track energy usage, predict maintenance needs, and optimize routes with actionable insights.",
    Icon: BarChart3,
  },
  {
    id: "03",
    title: "Access From Everywhere",
    body: "Web & mobile apps with data mining and predictive insights for proactive fleet management.",
    Icon: Smartphone,
  },
];

const CAPABILITIES = [
  {
    title: "Products",
    Icon: Sun,
    body: "In our fight against climate change we work with established energy technology manufacturers such as Phocos and V-Sun, trusted for high performance and reliable trouble-free operation. Alongside them we build our own indigenous range — T-Secure, P-Secure and H-Secure — for energy security, health security and waste management.",
    cta: "Read more",
    to: "/products",
    bg: capabilityProducts,
  },
  {
    title: "Solutions",
    Icon: Zap,
    body: "The earth is warming at an alarming rate, with serious health and ecological consequences. The challenges posed by climate change often demand unusual answers. With unlimited flexibility and scalable implementation, our solutions can stand alone or integrate with existing systems.",
    cta: "Read more",
    to: "/solutions",
    bg: capabilitySolutions,
  },
  {
    title: "Projects",
    Icon: Ship,
    body: "From solar ferries in Kerala to island microgrids in Guam, our projects are delivered end to end — naval architecture, electrical engineering, installation and commissioning — and handed over to crews who can run and maintain them locally.",
    cta: "Read more",
    to: "/projects",
    bg: capabilityProjects,
  },
];





const VALUES = [
  {
    label: "Mission",
    body: "To develop green technologies that make economic sense, so they can be used by people anywhere — from smart cities to the remotest parts of the earth.",
    image: capabilitySolutions,
    points: [
      "Green tech that pays for itself",
      "Deployable in the remotest terrain",
      "Built for smart cities and villages alike",
    ],
  },
  {
    label: "Vision",
    body: "To design, develop and patent greener products, intelligently adapting global technologies into solutions communities can maintain with local resources and local talent.",
    image: projectHouseSolar,
    points: [
      "Patented, in-house engineering",
      "Global technology, local adaptation",
      "Serviceable with local talent",
    ],
  },
  {
    label: "Values",
    body: "A more equal world where everyone has access to affordable, reliable and sustainable energy — reducing economic disparity while tackling climate change.",
    image: projectGuamMain,
    points: [
      "Affordable, reliable, sustainable",
      "Energy access as an equaliser",
      "Climate action with real economics",
    ],
  },
];


const TESTIMONIALS = [
  {
    quote:
      "Yesen has provided us with an innovative energy storage hybrid solution so we could avoid DC gensets on our houseboats. It cuts fuel costs and removes noise and vibration for our guests.",
    name: "Max Molteni",
    role: "Maldives Dhoni Cruise",
    avatar: testimonial1,
  },
  {
    quote:
      "One of the world's first fully solar powered luxury tented resorts. Designed and executed to the highest standard four years ago — and still performing flawlessly.",
    name: "Deepak Mawandia",
    role: "Managing Director, Topan Yala, Sri Lanka",
    avatar: testimonial2,
  },
  {
    quote:
      "We consider this team one of the top five speciality design and engineering teams in the world. Their experience in renewable energy is unparalleled.",
    name: "Mathew Segal",
    role: "Sr. Vice President, Trojan Battery Co., USA",
    avatar: testimonial3,
  },
  {
    quote:
      "With the aim of building an eco resort, we partnered Yesen to design and implement technologies that would make us carbon neutral. Their attitude to take on challenges and find innovative solutions impressed us greatly.",
    name: "Z Ibraham",
    role: "Malaysia",
  },
  {
    quote:
      "Quanta Power Solutions entered into an engineering and technical partnership with Yesen for design, engineering, installation and commissioning services across South Asian countries — projects worth more than US$ 15 million. All the projects are working to our complete satisfaction and we consider the capability of its team among the best in the world.",
    name: "Vineet Poddar",
    role: "Quanta Power Solutions",
    avatar: testimonial5,
  },
  {
    quote:
      "Yesen brought clarity, engineering depth and genuine commitment to our project. They delivered a reliable renewable energy system on time and continue to support us well beyond commissioning.",
    name: "Bhavesh Patel",
    role: "Director, Sustainable Infrastructure",
  },
];




import brandYesenSustain from "@/assets/brand-yesen-sustain.jpg";
import brandVsun from "@/assets/brand-vsun.jpg";
import brandPhocos from "@/assets/brand-phocos.jpg";
import brandElco from "@/assets/brand-elco.jpg";

const BRANDS = [
  {
    name: "YESEN Technologies Pvt Ltd",
    kind: "In-house",
    image: brandYesenSustain,
    details: ["P-SECURE", "T-SECURE", "H-SECURE", "B-LIPH"],
  },
  {
    name: "V-Sun",
    kind: "Solar modules",
    image: brandVsun,
    details: ["SOLAR MODULES"],
  },
  {
    name: "Phocos",
    kind: "Off-grid power",
    image: brandPhocos,
    details: [
      "SOLAR CHARGE CONTROLLERS",
      "INVERTERS",
      "DC REFRIGERATORS",
      "FREEZERS",
    ],
  },
  {
    name: "Elco",
    kind: "E-Marine",
    image: brandElco,
    details: ["ELECTRIC MARINE PROPULSION MOTORS"],
  },
];



const CLIMATE_STATS = [
  {
    value: 80,
    suffix: "+",
    label: "Vessels electrified through marine solutions",
    source: "",
  },
  {
    value: 15,
    suffix: " MW",
    label: "Land-based solar & renewable energy deployed",
    source: "",
  },
  {
    value: 4,
    suffix: "",
    label: "Product families powering clean energy systems",
    source: "",
  },
  {
    value: 12,
    suffix: "+",
    label: "Countries served across marine & land projects",
    source: "",
  },
];

/** Counts up from 0 to the target once it scrolls into view. */
function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const run = () => {
      if (done.current) return;
      done.current = true;
      if (reduce) {
        setValue(to);
        return;
      }
      const start = performance.now();
      const duration = 1600;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(to * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}




function CapabilitiesSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = Array.from(
      slider.querySelectorAll<HTMLElement>("[data-capability-slide]")
    );

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const update = () => {
      // Desktop stays exactly as normal.
      if (window.innerWidth >= 1024) {
        slides.forEach((slide, index) => {
          slide.style.transform = "";
          slide.style.opacity = "";
          slide.style.zIndex = String(index + 1);
        });
        return;
      }

      const viewportHeight = window.innerHeight;

      slides.forEach((slide, index) => {
        const nextSlide = slides[index + 1];

        // Last slide stays fully visible.
        if (!nextSlide) {
          slide.style.transform =
            "translate3d(0, 0, 0) scale(1)";
          slide.style.opacity = "1";
          slide.style.zIndex = String(index + 1);
          return;
        }

        const nextTop = nextSlide.getBoundingClientRect().top;

        /*
         * nextTop:
         *
         * viewportHeight -> next slide has just entered
         * 0              -> next slide has reached the top
         *
         * Therefore:
         * 0 -> 1 progress while the next card covers this one.
         */
        const progress = clamp(
          (viewportHeight - nextTop) / viewportHeight,
          0,
          1
        );

        // Stronger smooth easing so the effect is clearly visible on mobile.
        const eased = 1 - Math.pow(1 - progress, 3);

        /*
         * Previous card:
         * - moves upward
         * - scales down
         * - fades slightly
         *
         * This creates the same "stacked cards" feeling.
         */
        const translateY = -(eased * 70);
        const scale = 1 - eased * 0.08;
        const opacity = 1 - eased * 0.22;

        slide.style.transform = `
          translate3d(
            0,
            ${translateY.toFixed(2)}px,
            0
          )
          scale(${scale.toFixed(4)})
        `;

        slide.style.opacity = opacity.toFixed(3);

        // Newer slide must always sit above the previous one.
        slide.style.zIndex = String(index + 1);
      });
    };

    const cleanup = onScrollFrame(update);

    // Initial state.
    update();

    const handleResize = () => update();
    window.addEventListener("resize", handleResize);

    return () => {
      cleanup();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="relative mt-6"
    >
      {CAPABILITIES.map(
        ({ title, body, Icon, cta, to, bg }, i) => (
          <section
            key={title}
            data-capability-slide={i}
            className="
              sticky top-0
              flex h-[100svh]
              items-center
              overflow-hidden
              bg-background
              will-change-transform
              lg:will-change-auto
            "
            style={{
              zIndex: i + 1,
            }}
            aria-label={title}
          >
            {/* MOBILE + TABLET */}
            <div
              className="
                flex
                w-full
                flex-col
                px-6
                sm:px-10
                lg:hidden
              "
            >
              {/* TITLE */}
              <div>
                <span className="flex items-center gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-leaf bg-brand-leaf text-brand-navy sm:h-12 sm:w-12">
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.4}
                    />
                  </span>

                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brand-navy/45 sm:tracking-[0.34em]">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(CAPABILITIES.length).padStart(2, "0")}
                  </span>
                </span>

                <h3 className="display-xl mt-5 text-4xl leading-[1.05] text-brand-navy sm:mt-6 sm:text-5xl">
                  {title}
                </h3>
              </div>

              {/* IMAGE */}
              <div className="mt-7 flex w-full justify-center sm:mt-9">
                <div className="relative aspect-[4/3] w-full max-w-[30rem] overflow-hidden rounded-[1.5rem] border border-brand-navy/12 shadow-[0_50px_120px_-70px_rgb(1_33_84/0.8)] sm:aspect-square">
                  <img
                    src={bg}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center"
                    style={{
                      filter:
                        "saturate(1.06) contrast(1.02)",
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_35%,transparent_60%,rgb(1_33_84/0.28)_100%)]" />
                </div>
              </div>

              {/* BODY */}
              <div className="mt-7 sm:mt-9">
                <p className="max-w-xl text-[0.92rem] leading-[1.75] text-brand-navy/80 sm:text-[0.98rem] sm:leading-[1.9]">
                  {body}
                </p>

                <Link
                  to={to}
                  className="mt-5 inline-flex items-center gap-2 font-display text-base italic text-brand-navy underline decoration-brand-leaf underline-offset-8 transition-opacity hover:opacity-70 sm:mt-7"
                >
                  {cta}

                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={1.4}
                  />
                </Link>
              </div>
            </div>

            {/* DESKTOP — unchanged */}
            <div className="mx-auto hidden w-full max-w-[92rem] items-center gap-10 px-1 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div className="order-2 lg:order-1">
                <span className="flex items-center gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand-leaf bg-brand-leaf text-brand-navy">
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.4}
                    />
                  </span>

                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.34em] text-brand-navy/45">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(CAPABILITIES.length).padStart(2, "0")}
                  </span>
                </span>

                <h3 className="display-xl mt-6 text-4xl text-brand-navy sm:text-[3.4rem]">
                  {title}
                </h3>

                <p className="mt-5 max-w-xl text-[0.98rem] leading-[1.9] text-brand-navy/80">
                  {body}
                </p>

                <Link
                  to={to}
                  className="mt-7 inline-flex items-center gap-2 font-display text-base italic text-brand-navy underline decoration-brand-leaf underline-offset-8 transition-opacity duration-300 hover:opacity-70"
                >
                  {cta}

                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={1.4}
                  />
                </Link>
              </div>

              <div className="order-1 flex w-full justify-center lg:order-2 lg:justify-end">
                <div className="relative aspect-square w-full max-w-[22rem] overflow-hidden rounded-[1.75rem] border border-brand-navy/12 shadow-[0_50px_120px_-70px_rgb(1_33_84/0.8)] sm:max-w-[28rem]">
                  <img
                    src={bg}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center"
                    style={{
                      filter:
                        "saturate(1.06) contrast(1.02)",
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_35%,transparent_60%,rgb(1_33_84/0.28)_100%)]" />
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </div>
  );
}


function FeatureCards() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map(({ id, title, body, Icon }, i) => (
        <article
          key={id}
          data-card-slide
          data-slide-delay={i * 100}
          className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-[0_20px_50px_-30px_color-mix(in_oklab,var(--brand-navy)_25%,transparent)] sm:p-9"
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-brand-blue" strokeWidth={1.6} />
            <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg bg-[#eef5fb] px-2 font-mono text-[0.75rem] font-medium tracking-[0.04em] text-brand-navy">
              {id}
            </span>
          </div>
          <h3 className="mt-6 text-lg font-semibold leading-snug text-brand-navy sm:text-xl">
            {title}
          </h3>
          <p className="mt-3 text-[0.9rem] leading-[1.75] text-muted-foreground">
            {body}
          </p>
        </article>
      ))}
    </div>
  );
}









const MARINE_VIDEO_ID = "RPlyTItE_AA";

const embedSrc = (id: string, vq = "hd1080") =>
  `https://www.youtube-nocookie.com/embed/${id}` +
  `?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0` +
  `&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&vq=${vq}&hd=1&enablejsapi=1`;


const MARINE_VIDEO_SRC = embedSrc(MARINE_VIDEO_ID);



/** Reveals every [data-reveal] element as it scrolls into view, with stagger. */
function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          window.setTimeout(() => el.classList.add("is-revealed"), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}

/**
 * Cards slide horizontally in the direction of scrolling: entering from the right
 * while scrolling down, from the left while scrolling up. Repeats on re-entry.
 */
function useDirectionalCardSlide() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-card-slide]"));
    const timers = new Map<HTMLElement, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          window.clearTimeout(timers.get(el));
          const delay = Number(el.dataset.slideDelay ?? 0);
          timers.set(el, window.setTimeout(() => el.classList.add("is-slid"), delay));
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      observer.disconnect();
    };
  }, []);
}

/**
 * Sticky homepage header. Keeping its scroll state here means a hide/show
 * toggle re-renders ~30 nodes instead of the entire homepage.
 */
const HomeHeader = React.memo(function HomeHeader() {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    return onScrollFrame(() => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current + 4;
      const goingUp = y < lastScrollY.current - 4;
      if (goingDown || goingUp) {
        setHeaderHidden(goingDown && y > 120);
        lastScrollY.current = y;
      }
      setAtTop(y < 40);
    });
  }, []);

  return (
    <header
      /* Transform-only transition: fading opacity at the same time left a ghost
         trail as the compositor re-rasterised the blurred bar mid-slide. */
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 will-change-transform ${headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      <div
        className={`transition-[background-color,border-color] duration-700 ${atTop ? "bg-transparent" : "border-b border-border/60 bg-shell/80 backdrop-blur-xl"
          }`}
      >
        <div
          className={`relative mx-auto grid w-full max-w-[100rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-[padding] duration-700 sm:flex sm:justify-between sm:gap-6 sm:px-12 ${atTop ? "py-4 sm:py-7" : "py-3 sm:py-4"
            }`}
        >
          <Link
            to="/"
            aria-label="YESEN Technologies Pvt Ltd home"
            className="min-w-0 shrink-0 bg-transparent"
          >
            <Logo
              className={`w-auto max-w-[58vw] bg-transparent transition-all duration-700 ${atTop ? "h-9 sm:h-12" : "h-8 sm:h-10"
                }`}
              variant={atTop ? "light" : "dark"}
            />
          </Link>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex"
            aria-label="Main"
          >
            {NAV.map((item) => {
              const cls = `relative py-1 font-mono text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-brand-leaf after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100 ${atTop
                ? "text-brand-ivory hover:text-brand-leaf"
                : "text-brand-navy hover:text-brand-forest"
                }`;
              return item === "About" ? (
                <Link key={item} to="/about" className={cls}>
                  {item}
                </Link>
              ) : item === "Products" ? (
                <Link key={item} to="/products" className={cls}>
                  {item}
                </Link>
              ) : item === "Solutions" ? (
                <Link key={item} to="/solutions" className={cls}>
                  {item}
                </Link>
              ) : item === "Projects" ? (
                <Link key={item} to="/projects" className={cls}>
                  {item}
                </Link>
              ) : item === "Contact" ? (
                <Link key={item} to="/contact" className={cls}>
                  {item}
                </Link>
              ) : (
                <span key={item} className={cls}>
                  {item}
                </span>
              );
            })}
          </nav>

          <div className="hidden shrink-0 md:block">
            <Link
              to="/enquire"
              className={`inline-flex h-11 items-center rounded-full border px-6 font-mono text-[0.68rem] uppercase tracking-[0.22em] backdrop-blur-md transition-colors duration-500 ${atTop
                ? "border-brand-ivory/35 bg-white/10 text-brand-ivory hover:border-brand-leaf"
                : "border-brand-navy/15 bg-white/70 text-brand-navy hover:border-brand-leaf"
                }`}
            >
              Get a quote
            </Link>
          </div>

          <MobileNav tone={atTop ? "light" : "dark"} />

        </div>
      </div>
    </header>
  );
});


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

const OFFICES = [
  {
    country: "India",
    lines: ["YESEN Technologies Pvt Ltd", "5th floor, YESEN Enclave, Vallamattam Estate", "Ravipuram, Kochi, Kerala 682015"],
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



/**
 * Card with a cursor-tracked iridescent titanium sheen and refracting abstract
 * shapes; hovering distorts the front copy away and refracts the detail in.
 */
function IridescentCard({
  className = "",
  slideDelay,
  autoSweep = false,
  children,
}: {
  className?: string;
  slideDelay?: number;
  /** Sweep the sheen on its own timing instead of following the cursor. */
  autoSweep?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Rect + shape list are measured once per hover instead of per mousemove, and
  // all style writes are coalesced into a single animation frame.
  const rect = useRef<DOMRect | null>(null);
  const shapes = useRef<HTMLElement[]>([]);
  const point = useRef({ x: 50, y: 50 });
  const raf = useRef(0);

  const paint = () => {
    raf.current = 0;
    const el = ref.current;
    if (!el) return;
    const { x, y } = point.current;
    el.style.setProperty("--mx", `${x.toFixed(1)}%`);
    el.style.setProperty("--my", `${y.toFixed(1)}%`);
    el.style.setProperty("--irid", "1");
    shapes.current.forEach((s, i) => {
      const pull = 0.16 + i * 0.1;
      s.style.transform = `translate3d(${((x - 50) * pull).toFixed(1)}px, ${((y - 50) * pull).toFixed(1)}px, 0) scale(${1 + i * 0.08})`;
    });
  };

  const onEnter = () => {
    if (autoSweep) return;
    const el = ref.current;
    if (!el) return;
    rect.current = el.getBoundingClientRect();
    shapes.current = Array.from(el.querySelectorAll<HTMLElement>(".irid-shape"));
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (autoSweep) return;
    const el = ref.current;
    if (!el) return;
    if (!rect.current) onEnter();
    const r = rect.current;
    if (!r) return;
    point.current = {
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    };
    if (!raf.current) raf.current = requestAnimationFrame(paint);
  };

  const onLeave = () => {
    if (autoSweep) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = 0;
    rect.current = null;
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--irid", "0");
    shapes.current.forEach((s) => {
      s.style.transform = "translate3d(0,0,0)";
    });
  };

  return (
    <div
      ref={ref}
      data-card-slide
      data-slide-delay={slideDelay}
      tabIndex={0}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`irid-card ${autoSweep ? "irid-auto" : ""} ${className}`}
    >


      <span
        className="irid-shape left-[8%] top-[10%] h-32 w-32"
        style={{ background: "oklch(0.82 0.16 200 / 0.9)" }}
        aria-hidden
      />
      <span
        className="irid-shape right-[6%] top-[35%] h-40 w-40"
        style={{ background: "oklch(0.8 0.17 305 / 0.8)" }}
        aria-hidden
      />
      <span
        className="irid-shape bottom-[6%] left-[38%] h-28 w-28"
        style={{ background: "oklch(0.86 0.16 120 / 0.85)" }}
        aria-hidden
      />
      {children}
    </div>
  );
}


function Home() {
  const heroRef = useRef<HTMLVideoElement>(null);
  const isMobileHero = useIsMobile();
  const featuredVideoRef = useRef<HTMLVideoElement>(null);

  useScrollReveal();
  useDirectionalCardSlide();



  // Make sure the hero video always starts by itself, even if the browser
  // stalls autoplay on first paint.
  useEffect(() => {
    const v = heroRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => void v.play().catch(() => { });
    tryPlay();
    const onFirstInteract = () => tryPlay();
    window.addEventListener("pointerdown", onFirstInteract, { once: true });
    return () => window.removeEventListener("pointerdown", onFirstInteract);
  }, []);

  // Ensure the featured-solution video autoplays when it enters the viewport.
  useEffect(() => {
    const v = featuredVideoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => void v.play().catch(() => { });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && tryPlay()),
      { threshold: 0.25 }
    );
    observer.observe(v);
    tryPlay();
    const onFirstInteract = () => tryPlay();
    window.addEventListener("pointerdown", onFirstInteract, { once: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", onFirstInteract);
    };
  }, []);


  return (
    <div className="relative min-h-screen bg-canvas font-sans text-foreground antialiased">
      {/* Detached parallax backdrop — sits behind every floating panel */}
      <div className="site-backdrop" aria-hidden="true">
        <div className="site-backdrop-grid" />
      </div>

      <SplashScreen />



      {/* Minimal wide-tracked header — isolated so its scroll state never
          re-renders the rest of the homepage. */}
      <HomeHeader />


      <div className="relative z-10">

        <main id="top" className="site-panels">

          {/* Hero — full-bleed HD video, sized to cover with minimal overscan
              so the source stays sharp and no letterboxing shows. */}
          <section className="relative isolate w-full overflow-hidden bg-brand-navy">
            <h1 className="sr-only">YESEN Technologies Pvt Ltd — sustainable marine electrification, solar and clean energy engineering</h1>
            <div className="group relative h-[86svh] min-h-[28rem] w-full overflow-hidden sm:h-[92vh] sm:min-h-[36rem]">

              <video
                ref={heroRef}
                key={isMobileHero ? "m" : "d"}
                className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full origin-center object-cover [backface-visibility:hidden]"
                style={{
                  transform: "translate3d(-50%, -50%, 0)",
                  filter: "contrast(1.05) saturate(1.07)",
                }}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                tabIndex={-1}
                aria-hidden="true"
              >
                <source src={(isMobileHero ? heroVideoMobile : heroVideo).url} type="video/mp4" />
              </video>



              {/* Soft scrims keep the wide-tracked overlays legible */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-brand-navy/55 to-transparent sm:h-40 sm:from-brand-navy/45" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-brand-navy/65 to-transparent sm:h-48 sm:from-brand-navy/55" />




              {/* Explore CTA — revealed on hover, anchored toward the lower area */}
              <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center px-6 sm:bottom-36">
                <Link
                  to="/solutions"
                  className="pointer-events-auto flex min-h-[3rem] max-w-full items-center justify-center whitespace-nowrap rounded-full border border-brand-ivory/60 bg-brand-navy/25 px-7 py-3 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-brand-ivory backdrop-blur-md transition-all duration-500 ease-out hover:border-brand-leaf hover:bg-brand-leaf hover:text-brand-navy sm:translate-y-3 sm:scale-95 sm:px-8 sm:py-3.5 sm:text-[0.7rem] sm:tracking-[0.32em] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:scale-100 sm:group-hover:opacity-100"
                >
                  Explore
                </Link>

              </div>


              {/* Scroll cue */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 hidden h-24 w-px -translate-x-1/2 overflow-hidden bg-brand-ivory/25 sm:block">
                <span className="absolute inset-x-0 top-0 h-8 animate-[fade-in_1s_ease-out_both] bg-brand-leaf" />
              </div>

            </div>
          </section>



          {/* Global Warming Impact Stats Bar */}
          <section className="relative border-b border-border bg-surface-tint/60">
            <div className="mx-auto w-full max-w-[100rem] px-4 py-8 sm:px-10 sm:py-12 lg:py-[4.5rem]">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-y-0">
                {CLIMATE_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    data-card-slide
                    data-slide-delay={i * 90}
                    className="
      group relative min-w-0
      rounded-lg border border-brand-navy/8
      bg-brand-leaf/[0.06]
      px-3 py-3
      shadow-[0_4px_18px_-14px_rgb(12_46_92/0.2)]
      transition-all duration-300
      hover:-translate-y-0.5 hover:bg-brand-leaf/[0.08]

      sm:rounded-lg
      sm:px-4 sm:py-4

      lg:rounded-none
      lg:border-0
      lg:bg-transparent
      lg:px-10 lg:py-0
      lg:first:pl-0
      lg:shadow-none
      lg:hover:translate-y-0
      lg:hover:bg-transparent
    "
                    style={{
                      animation: `climateStatIn 0.45s ease-out ${i * 90}ms both`,
                    }}
                  >
                    {/* Vertical divider — desktop only */}
                    <span
                      className="pointer-events-none absolute left-0 top-1/2 hidden h-3/4 w-px -translate-y-1/2 bg-border lg:block lg:first:hidden"
                      aria-hidden="true"
                    />

                    {/* Number */}
                    <p className="display-xl whitespace-nowrap text-[1.3rem] leading-none text-brand-navy transition-colors duration-300 group-hover:text-brand-forest sm:text-[1.5rem] lg:text-[clamp(2.4rem,2.8vw,3.6rem)] lg:leading-[1.1]">
                      <CountUp
                        to={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.value % 1 !== 0 ? 2 : 0}
                      />
                    </p>

                    {/* Accent line */}
                    <span className="mt-2 block h-px w-5 origin-left bg-brand-leaf/70 transition-transform duration-500 ease-out group-hover:w-8 sm:w-6 lg:mt-2 lg:w-10" />

                    {/* Label */}
                    <p className="climate-stat-label mt-2 max-w-[15rem] font-mono uppercase leading-[1.4] tracking-[0.1em] text-muted-foreground sm:mt-3 sm:leading-[1.5] sm:tracking-[0.13em] lg:mt-5 lg:text-[0.62rem] lg:leading-[1.8] lg:tracking-[0.26em]">
                      {stat.label}
                    </p>

                    <span className="sr-only">Source: {stat.source}</span>
                  </div>
                ))}
              </div>

              {/* Sourcing footnote */}
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border/60 pt-4 sm:mt-10 lg:mt-16 lg:pt-5">
                <span className="climate-source-title font-mono uppercase tracking-[0.14em] text-muted-foreground/80 sm:tracking-[0.18em] lg:text-[0.58rem] lg:tracking-[0.2em]">
                  Sources
                </span>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="climate-source-pill inline-flex items-center rounded-full border border-border/80 bg-shell/80 px-2 py-0.5 font-mono uppercase tracking-[0.08em] text-brand-navy/70 sm:px-2.5 sm:py-1 sm:tracking-[0.12em] lg:text-[0.6rem] lg:tracking-[0.14em]">
                    IEA Global Energy Review 2026
                  </span>

                  <span className="climate-source-pill inline-flex items-center rounded-full border border-border/80 bg-shell/80 px-2 py-0.5 font-mono uppercase tracking-[0.08em] text-brand-navy/70 sm:px-2.5 sm:py-1 sm:tracking-[0.12em] lg:text-[0.6rem] lg:tracking-[0.14em]">
                    NOAA Climate.gov
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* Intro — Who we are */}
          <section
            id="about"
            className="relative overflow-hidden bg-white px-6 py-12 text-brand-navy sm:px-10 sm:py-12"
          >


            <div className="relative mx-auto w-full max-w-[92rem]">
              <div className="flex items-center gap-5">
                <span className="h-px w-16 bg-brand-leaf" />
                <span
                  data-reveal
                  className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-brand-forest"
                >
                  Who we are
                </span>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-12">
                {/* Headline card */}
                <article
                  className="window-square border border-brand-navy/40 bg-brand-navy p-10 text-brand-ivory shadow-[0_24px_60px_-40px_color-mix(in_oklab,var(--brand-navy)_45%,transparent)] transition-shadow duration-500 hover:shadow-[0_32px_80px_-40px_color-mix(in_oklab,var(--brand-navy)_55%,transparent)] sm:p-14 lg:col-span-7">
                  <h2
                    className="display-xl text-4xl text-brand-ivory sm:text-6xl lg:text-[4rem]"
                  >
                    Engineering a{" "}
                    <span className="accent-italic text-brand-leaf">sustainable</span> tomorrow
                  </h2>
                  <p className="mt-10 max-w-2xl text-lg leading-[1.85] text-brand-ivory/80 sm:text-xl">
                    YESEN Technologies Pvt Ltd, formed in 2019, is an engineering and
                    technology company focused on developing, integrating and delivering
                    sustainable products.
                  </p>
                </article>


                {/* Belief + Focus cards */}
                <div className="grid gap-8 lg:col-span-5">
                  {[
                    {
                      no: "01 — Belief",
                      body: "We support green technology initiatives and believe that innovation becomes meaningful only when it solves real human problems.",
                      image: capabilitySolutions,
                      points: [
                        "Innovation measured by human impact",
                        "Technology that communities can own",
                        "Long-term partnerships, not one-off installs",
                      ],
                    },
                    {
                      no: "02 — Focus",
                      body: "Our focus is on practical engineering solutions, especially in the marine sector, where cleaner alternatives are urgently needed.",
                      image: projectHouseSolar,
                      points: [
                        "Electric and hybrid marine propulsion",
                        "Design, fabrication and commissioning",
                        "Field-proven across South Asia",
                      ],
                    },
                  ].map((c) => (
                    <article
                      key={c.no}
                      className="window-square relative h-56 overflow-hidden border border-brand-blue/40 bg-brand-blue text-brand-ivory sm:h-60"
                    >
                      <div className="absolute inset-0 flex flex-col justify-center p-10 sm:p-12">
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brand-ivory/70">
                          {c.no}
                        </span>
                        <p className="mt-5 text-base leading-[1.9] text-brand-ivory/90">
                          {c.body}
                        </p>
                      </div>
                    </article>
                  ))}

                </div>
              </div>

              {/* Founding milestone card */}
              <article
                className="window-square mt-8 grid gap-10 border border-brand-navy/40 bg-brand-navy p-10 text-brand-ivory sm:p-14 lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-4">
                  <p className="display-xl text-6xl leading-none text-brand-leaf sm:text-8xl">
                    2019
                  </p>
                  <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-ivory/70">
                    Year founded
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-base leading-[1.95] text-brand-ivory/85 sm:text-lg">
                    YESEN Technologies Pvt Ltd was founded to develop, integrate, and deliver sustainable
                    marine products. We support green technology initiatives with practical
                    engineering solutions — from vessel design and fabrication to testing,
                    launching, and commissioning.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 sm:gap-2.5">
                    {["Vessel design", "Fabrication", "Testing", "Launching", "Commissioning"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-brand-ivory/30 px-2.5 py-1 font-mono text-[0.44rem] tracking-[0.1em] text-brand-ivory/80 transition-colors duration-300 hover:border-brand-leaf hover:text-brand-leaf sm:px-3 sm:py-1 sm:text-[0.5rem] sm:tracking-[0.14em] lg:px-4 lg:py-2 lg:text-[0.6rem] lg:tracking-[0.22em]"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </article>

            </div>
          </section>

          {/* Capabilities — editorial service rows */}
          <section
            id="products"
            className="mx-auto w-full max-w-[100rem] !overflow-visible px-6 pt-10 sm:px-10 sm:pt-14"
          >
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <span data-reveal className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
                  What we do
                </span>
                <h2
                  data-reveal
                  data-reveal-delay={80}
                  className="display-xl mt-5 max-w-3xl text-4xl text-brand-navy sm:text-6xl"
                >
                  Solutions and products built for a{" "}
                  <span className="accent-italic">warming world</span>
                </h2>
              </div>
            </div>

            <CapabilitiesSlider />

          </section>


          {/* Mission / Vision / Values */}
          <section className="mx-auto w-full max-w-[100rem] px-6 pb-12 sm:px-10 sm:pb-16">
            <div className="grid gap-6 border-t border-border pt-10 lg:grid-cols-3">
              {VALUES.map((v, i) => (
                <article
                  key={v.label}
                  data-card-slide
                  data-slide-delay={i * 110}
                  className="group window-square relative overflow-hidden border border-border bg-card transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-brand-leaf/60 hover:shadow-[0_36px_70px_-40px_rgb(1_33_84_/_0.5)]"
                >

                  {/* Ambient image wash, revealed softly on hover */}
                  <img decoding="async"
                    src={v.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-15"
                  />
                  {/* Leaf accent bar wipes in from the left */}
                  <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-leaf transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

                  <div className="relative flex h-full flex-col justify-between gap-6 p-8">
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.28em] text-brand-leaf">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="display-xl text-3xl text-brand-navy transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 sm:text-4xl">
                        {v.label}
                      </h3>
                      <p className="mt-4 text-[0.95rem] leading-[1.8] text-muted-foreground">
                        {v.body}
                      </p>
                    </div>

                    {/* Points slide up + fade in on hover */}
                    <ul className="space-y-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-navy">
                      {v.points.map((p, pi) => (
                        <li
                          key={p}
                          className="flex translate-y-3 items-start gap-2.5 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
                          style={{ transitionDelay: `${120 + pi * 90}ms` }}
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-leaf" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}

            </div>
          </section>

          {/* Why YESEN */}
          <WhyYesen />

          {/* Partners */}
          <PartnersSection />

          {/* Technology deep dive */}
          <TechDeepDive />







          {/* Brands */}
          <section id="brands" className="mx-auto w-full max-w-[100rem] px-6 pb-16 pt-14 sm:px-10 sm:pb-20">
            <span data-reveal className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
              Our brands
            </span>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="display-xl mt-6 max-w-3xl text-4xl text-brand-navy sm:text-6xl"
            >
              Indigenous ranges and world-leading{" "}
              <span className="accent-italic">technology partners</span>
            </h2>



            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {BRANDS.map((b, i) => (
                <div
                  key={b.name}
                  aria-label={b.name}
                  data-card-slide
                  data-slide-delay={i * 90}
                  className="flip-scene group aspect-square block"
                >
                  <div className="flip-inner relative h-full w-full">

                    <article className="flip-face window-square flex flex-col border border-border bg-card">
                      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#0b1f1a]">
                        <img decoding="async"
                          src={b.image}
                          alt={b.name}
                          loading="lazy"
                          className="absolute inset-0 m-auto max-h-full max-w-full object-contain object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 border-t border-border bg-card px-6 py-5">
                        <span className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-brand-leaf">
                          {b.kind}
                        </span>
                        <span className="font-display text-lg leading-tight text-brand-navy">
                          {b.name}
                        </span>
                      </div>


                    </article>
                    <article className="flip-face flip-face-back window-square overflow-hidden border border-brand-forest bg-brand-navy text-brand-ivory">
                      <img decoding="async"
                        src={b.image}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-25"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/85 to-brand-navy/40" />
                      <div className="relative flex h-full flex-col justify-center gap-3 px-8 py-10">
                        <span className="display-xl text-2xl text-brand-ivory">{b.name}</span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-brand-leaf">
                          {b.kind}
                        </span>
                        <ul className="mt-3 space-y-2 font-mono text-[0.66rem] uppercase tracking-[0.16em]">
                          {b.details.map((d) => (
                            <li key={d} className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-leaf" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured solution → Decarbonizing → Retrofit (horizontal scroll swipe) */}
          <SolutionsSwipe>
            {/* Slide 1 — Featured solution */}
            <section id="solutions" className="bg-secondary px-6 py-12 sm:px-10 sm:py-16">
              <div className="mx-auto grid w-full max-w-[100rem] items-center gap-16 lg:grid-cols-2">
                <div data-reveal="left">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-brand-forest">
                    Featured solution
                  </span>
                  <h2 className="display-xl mt-6 text-4xl text-brand-navy sm:text-6xl">
                    E-Marine: clean propulsion for a{" "}
                    <span className="accent-italic">sustainable world</span>
                  </h2>
                  <p className="mt-8 max-w-xl text-[0.95rem] leading-[1.9] text-muted-foreground">
                    Our E-Marine systems remove boating emissions and support sustainable
                    boating to a new level — no sound, no vibration, no fumes, no breakdowns. We have
                    delivered comprehensive e-boating systems in the Maldives, Australia, Sri Lanka
                    and India.
                  </p>
                  <span
                    className="link-quiet mt-10 inline-block font-display text-lg"
                  >
                    Discuss an e-marine project
                  </span>
                </div>
                <div
                  data-reveal="right"
                  data-media-reveal
                  data-reveal-delay={120}
                  className="window-square relative isolate aspect-video w-full bg-brand-navy"
                >
                  <video
                    ref={featuredVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <source src={keralaSolarBoat.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent" />
                </div>
              </div>
            </section>

            {/* Slide 2 — Decarbonizing the marine sector (slide 7) */}
            <section className="bg-secondary px-6 py-10 sm:px-10 sm:py-14">
              <div className="mx-auto grid w-full max-w-[100rem] items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                <div data-reveal="left">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-brand-forest">
                    E-Marine
                  </span>
                  <h2 className="display-xl mt-5 text-4xl text-brand-navy sm:text-6xl">
                    Decarbonizing the{" "}
                    <span className="accent-italic text-brand-forest">marine sector</span>
                  </h2>
                  <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.9] text-muted-foreground">
                    Marine systems built for daily service — certified battery packs,
                    intelligent controls and safety layers engineered for life on the water.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                    {EMARINE_TAGS.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-brand-black px-2.5 py-1 font-mono !text-[0.45rem] tracking-[0.1em] text-brand-navy/70 transition-colors duration-300 hover:border-brand-leaf hover:text-brand-leaf sm:px-3 sm:py-1 sm:!text-[0.45rem] sm:tracking-[0.14em] lg:px-4 lg:py-2 lg:!text-[0.6rem] lg:tracking-[0.22em]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <figure
                  data-reveal="right"
                  data-media-reveal
                  data-reveal-delay={120}
                  className="window-square relative isolate aspect-[4/3] w-full overflow-hidden bg-brand-navy lg:aspect-square"
                >
                  <img decoding="async"
                    src={emarineDecarbonize}
                    alt="E-Marine electric propulsion vessel at sea"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 z-10 p-6 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-brand-ivory/90 sm:p-8">
                    Zero emission propulsion · Maldives · Australia · Sri Lanka · India
                  </figcaption>
                </figure>
              </div>
            </section>


            {/* Slide 3 — What can we retrofit (slide 9) */}
            <RetrofitShowcase />
          </SolutionsSwipe>






          {/* Completed / Ongoing projects — scroll-driven flip */}
          <ProjectsPhotos />






          {/* Testimonials */}
          <TestimonialWall />





          {/* Contact CTA */}
          <section id="contact" data-panel-bg="navy" className="bg-brand-navy px-6 py-14 text-center text-brand-ivory sm:px-10 sm:py-16">
            <span
              data-reveal
              className="inline-block rounded-full border border-brand-leaf/50 bg-brand-leaf/15 px-4 py-1.5 font-mono text-[0.85rem] font-semibold uppercase tracking-[0.3em] text-brand-leaf"
            >
              Idea → Reality
            </span>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="display-xl mx-auto mt-8 max-w-5xl text-4xl sm:text-7xl"
            >
              Let's build something <span className="accent-italic text-brand-leaf">sustainable</span>{" "}
              together
            </h2>
            <p
              data-reveal
              data-reveal-delay={140}
              className="mx-auto mt-8 max-w-2xl text-base leading-[1.9] text-brand-ivory/80"
            >
              Tell us about your site, your load profile or your sustainability target — our
              engineers will come back with an approach.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
              <Link
                to="/contact"
                className="rounded-full border border-brand-ivory/60 bg-brand-navy/25 px-8 py-4 font-mono text-[0.72rem] uppercase tracking-[0.32em] text-brand-ivory backdrop-blur-md transition-all duration-300 hover:border-brand-leaf hover:bg-brand-leaf hover:text-brand-navy"
              >
                Contact us
              </Link>
            </div>
          </section>

        </main>

        <footer className="relative z-10 mx-auto mb-[clamp(0.5rem,2vw,2rem)] w-[calc(100%-2*clamp(0.5rem,2vw,2rem))] max-w-[108rem] overflow-hidden rounded-[clamp(1rem,2vw,2rem)] border border-border bg-shell shadow-[0_40px_90px_-45px_color-mix(in_oklab,var(--brand-navy)_60%,transparent)]">
          <div className="mx-auto grid w-full max-w-[100rem] grid-cols-3 gap-x-8 gap-y-10 px-6 py-16 sm:gap-x-12 sm:px-12 md:grid-cols-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div className="col-span-3 md:col-span-1" data-reveal="left">
              <Logo className="h-14 w-auto" />
              <p className="mt-4 text-[0.78rem] font-medium tracking-[0.02em] text-brand-forest">
                Erstwhile YESEN Technologies Pvt Ltd
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
                      target="_blank"
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

            {FOOTER_LINKS.map((col, i) => (
              <div key={col.heading} data-reveal data-reveal-delay={100 + i * 90}>
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
                {OFFICES.map((office, i) => (
                  <li key={office.country} data-reveal data-reveal-delay={80 + i * 70}>
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


          {/* <div className="border-t border-border">
            <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between gap-3 px-6 py-6 sm:px-12">
              <p className="font-mono !text-[0.5rem] tracking-[0.1em] text-muted-foreground sm:!text-[0.55rem] sm:tracking-[0.12em] lg:!text-[0.7rem] lg:tracking-[0.14em]">
                © {new Date().getFullYear()} YESEN Technologies Pvt Ltd
              </p>

              <p className="font-mono !text-[0.45rem] tracking-[0.08em] text-muted-foreground sm:!text-[0.5rem] sm:tracking-[0.1em] lg:!text-[0.6rem] lg:tracking-[0.16em]">
                Technology by Nature
              </p>
            </div>
          </div> */}


          <div className="border-t border-border">
            <div className="mx-auto flex w-full max-w-[100rem] items-center justify-center px-6 py-6 sm:px-12">
              <p className="font-mono !text-[0.5rem] tracking-[0.1em] text-muted-foreground sm:!text-[0.55rem] sm:tracking-[0.12em] lg:!text-[0.7rem] lg:tracking-[0.14em]">
                © {new Date().getFullYear()} YESEN Technologies Pvt Ltd
              </p>
            </div>
          </div>

        </footer>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* E-Marine — slide 7 tags + slide 9 retrofit showcase                        */
/* -------------------------------------------------------------------------- */

const EMARINE_TAGS = [
  "B-Guard",
  "B-Kool",
  "M-Control",
  "IEC 62619",
  "IEC 62620",
  "TRS",
  "YESEN Technologies Pvt Ltd",
];

const RETROFIT_VESSELS = [
  {
    name: "House Boat",
    image: vesselHouseboat,
    note: "Silent overnight cruising with zero fumes for backwater stays.",
  },
  {
    name: "Shikara",
    image: vesselShikara,
    note: "Compact drive kits that keep the traditional hull untouched.",
  },
  {
    name: "Ferry",
    image: vesselFerry,
    note: "High-cycle commuter duty with fast opportunity charging.",
  },
  { name: "RORO", image: vesselRoro, note: "Heavy-deck loads moved on clean electric torque." },
  {
    name: "Party Boat",
    image: vesselPartyBoat,
    note: "No engine noise, no vibration — only the water and the music.",
  },
  { name: "Barge", image: vesselBarge, note: "Low-speed, high-load haulage with predictable range." },
  {
    name: "Jankar Ferry",
    image: vesselJankarFerry,
    note: "Short river crossings retrofitted without dry-dock downtime.",
  },
  { name: "Sailboat", image: vesselSailboat, note: "Auxiliary electric drive with regeneration underway." },
  { name: "Ship", image: vesselShip, note: "Modular battery banks scaled to the vessel's duty cycle." },
  {
    name: "Eco-Reserve Boat",
    image: vesselEcoReserve,
    note: "Wildlife-safe propulsion for protected waters.",
  },
];

function RetrofitShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-secondary px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto w-full max-w-[100rem]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <span
              data-reveal
              className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-brand-forest"
            >
              What can we retrofit
            </span>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="display-xl mt-5 text-4xl text-brand-navy sm:text-5xl"
            >
              Electrification kits for{" "}
              <span className="accent-italic">every vessel</span>
            </h2>
          </div>
          <p
            data-reveal
            data-reveal-delay={140}
            className="max-w-xl text-[0.9rem] leading-[1.85] text-muted-foreground"
          >
            Pre-engineered retrofit kits designed for broad applicability across vessel types —
            quiet, low-maintenance, and built around far fewer moving parts than a conventional IC drivetrain.
          </p>
        </div>

        {/* Cinematic expanding rail */}
        <div
          className="mt-10 hidden gap-3 lg:flex lg:h-[min(26rem,46vh)]"
          onMouseLeave={() => setActive(0)}
        >
          {RETROFIT_VESSELS.map((v, i) => {
            const open = active === i;
            return (
              <button
                key={v.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={v.name}
                className="cine-panel cine-grain window-square group relative h-full overflow-hidden bg-brand-ink text-left transition-[flex-grow] duration-[1100ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-[flex-grow]"
                style={
                  {
                    flexGrow: open ? 7.5 : 1,
                    flexBasis: 0,
                    "--cine": open ? 1 : 0,
                  } as React.CSSProperties
                }
              >
                <img decoding="async"
                  src={v.image}
                  alt={v.name}
                  loading="lazy"
                  className="cine-img absolute inset-0 h-full w-full object-cover"
                  style={{ transform: open ? "scale(1.02)" : "scale(1.16)" }}
                />
                <div className="cine-grade" />
                <div className="cine-vignette" />
                <div className="cine-bar cine-bar-top" />
                <div className="cine-bar cine-bar-bottom" />

                {/* Collapsed spine: index + vertical name */}
                <div
                  className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-5 p-5 transition-opacity duration-500"
                  style={{ opacity: open ? 0 : 1 }}
                >
                  <span
                    className="font-display text-base leading-tight whitespace-nowrap text-brand-ivory"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {v.name}
                  </span>
                  <span className="font-mono text-[0.58rem] tracking-[0.24em] text-brand-leaf">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Expanded frame copy */}
                <div className="cine-copy absolute inset-x-0 bottom-0 z-10 p-7">
                  <span
                    className="block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brand-leaf"
                    style={{ "--cine-delay": "80ms" } as React.CSSProperties}
                  >
                    {String(i + 1).padStart(2, "0")} — Retrofit ready
                  </span>
                  <span
                    className="mt-2.5 block font-display text-2xl leading-tight text-brand-ivory sm:text-3xl"
                    style={{ "--cine-delay": "160ms" } as React.CSSProperties}
                  >
                    {v.name}
                  </span>
                  <span
                    className="mt-2.5 block max-w-md text-[0.88rem] leading-[1.75] text-brand-ivory/75"
                    style={{ "--cine-delay": "240ms" } as React.CSSProperties}
                  >
                    {v.note}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile / tablet — snap rail, no visible scrollbar */}
        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:hidden">
          {RETROFIT_VESSELS.map((v) => (
            <figure
              key={v.name}
              className="cine-panel cine-grain window-square relative aspect-[3/4] w-[62%] shrink-0 snap-start overflow-hidden bg-brand-ink sm:w-[38%]"
              style={{ "--cine": 1 } as React.CSSProperties}
            >
              <img decoding="async"
                src={v.image}
                alt={v.name}
                loading="lazy"
                className="cine-img absolute inset-0 h-full w-full object-cover"
              />
              <div className="cine-grade" />
              <div className="cine-vignette" />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 p-4 font-display text-base text-brand-ivory">
                {v.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}




/* -------------------------------------------------------------------------- */
/* Stacked panels: each slide scrolls in over the previous one                  */
/* -------------------------------------------------------------------------- */
function SolutionsSwipe({ children, bare = false }: { children: React.ReactNode; bare?: boolean }) {
  const slides = React.Children.toArray(children);

  return (
    <div data-solutions-swipe className="relative">
      {slides.map((child, i) => (
        <div
          key={i}
          data-solution-slide={i}
          className={`sticky top-0 flex h-[100svh] min-h-0 flex-col justify-center overflow-hidden ${bare ? "bg-background" : "bg-secondary"
            }`}
          style={{
            zIndex: i + 1,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}


