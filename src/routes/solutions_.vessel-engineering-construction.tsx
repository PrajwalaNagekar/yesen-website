import { createFileRoute } from "@tanstack/react-router";
import {
  Compass,
  Factory,
  Palmtree,
  Ship,
  Shield,
  Wrench,
  Settings,
} from "lucide-react";

import shotVessel from "@/assets/sol-vessel-build.jpg";
import { SolutionDetailPage, type SolutionDetail } from "@/components/SolutionDetailPage";

export const Route = createFileRoute("/solutions_/vessel-engineering-construction")({
  head: () => ({
    meta: [
      { title: "New Vessel Engineering & Construction | YESEN Technologies Pvt Ltd" },
      {
        name: "description",
        content:
          "End-to-end solutions for new age vessels — naval architecture, fabrication, systems integration, testing, launching and commissioning by YESEN Technologies Pvt Ltd.",
      },
      {
        property: "og:title",
        content: "New Vessel Engineering & Construction | YESEN Technologies Pvt Ltd",
      },
      {
        property: "og:description",
        content:
          "One accountable partner from design through to sea trials and commissioning of new-build vessels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://yesen.website/solutions/vessel-engineering-construction",
      },
    ],
  }),
  component: () => <SolutionDetailPage data={DATA} />,
});

const DATA: SolutionDetail = {
  index: "04",
  title: "New Vessel Engineering & Construction",
  titleLines: ["New Vessel Engineering", "& Construction"],
  tagline: "End-to-end solutions for new age vessels",
  Icon: Ship,
  image: shotVessel,
  imageAlt: "New vessel under construction in a shipyard",
  features: [
    "Design",
    "Fabrication",
    "Integration",
    "Testing",
    "Launching",
    "Commissioning",
  ],
  intro:
    "From naval architecture through to sea trials, we manage new-build vessel projects as a single accountable partner — so design intent survives all the way to commissioning.",
  included: [
    {
      Icon: Compass,
      title: "Design & naval architecture",
      body: "Hull, systems and layout engineered around the vessel's real operating profile.",
    },
    {
      Icon: Factory,
      title: "Fabrication & integration",
      body: "Build and system integration managed with our shipyard and OEM partner network.",
    },
    {
      Icon: Settings,
      title: "Testing & commissioning",
      body: "Sea trials, certification and handover managed end to end before launch.",
    },
  ],
  stats: [
    { value: "1", label: "accountable partner, design to handover" },
    { value: "Custom", label: "hulls engineered to your route" },
    { value: "Full", label: "certification & sea trial support" },
  ],
  process: [
    {
      n: "01",
      title: "Design",
      body: "Naval architecture and systems layout engineered around the vessel's real operating profile.",
    },
    {
      n: "02",
      title: "Fabrication",
      body: "Hull build managed with our shipyard partner network.",
    },
    {
      n: "03",
      title: "Integration",
      body: "Propulsion, energy and navigation systems integrated into the build.",
    },
    {
      n: "04",
      title: "Testing",
      body: "Sea trials and performance validation before handover.",
    },
    {
      n: "05",
      title: "Launching",
      body: "Vessel launch managed end to end.",
    },
    {
      n: "06",
      title: "Commissioning",
      body: "Certification, crew handover and support after delivery.",
    },
  ],
  applications: [
    {
      Icon: Ship,
      title: "Passenger ferries",
      body: "New-build ferries engineered around your route and passenger capacity.",
    },
    {
      Icon: Palmtree,
      title: "Tourism vessels",
      body: "Purpose-built vessels for sightseeing, charters and hospitality operations.",
    },
    {
      Icon: Shield,
      title: "Patrol craft",
      body: "Vessels built for operational readiness and duty-specific requirements.",
    },
    {
      Icon: Wrench,
      title: "Special-purpose vessels",
      body: "Custom builds for requirements outside a standard hull and layout.",
    },
  ],
  faqs: [
    {
      q: "Do you work with our shipyard or yours?",
      a: "Both are possible — we manage builds through our own shipyard and R&D partner network, or work alongside a shipyard you've already chosen.",
    },
    {
      q: "How long does a new build take?",
      a: "Timelines depend on vessel size and complexity; we scope a schedule as part of the design phase.",
    },
    {
      q: "Can you electrify the new vessel from day one?",
      a: "Yes — electrification, solar and smart systems can all be designed in from the start rather than retrofitted later.",
    },
    {
      q: "What certifications do you support?",
      a: "We manage certification and sea trials as part of testing and commissioning, scoped to your vessel's class and route requirements.",
    },
  ],
};
