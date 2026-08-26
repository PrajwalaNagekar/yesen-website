import { createFileRoute } from "@tanstack/react-router";
import { Anchor, Building2, PlugZap, Ship, Sun, Ticket, Warehouse, Waves } from "lucide-react";

import shotShore from "@/assets/sol-shore.jpg";
import { SolutionDetailPage, type SolutionDetail } from "@/components/SolutionDetailPage";

export const Route = createFileRoute("/solutions_/shore-infrastructure")({
  head: () => ({
    meta: [
      { title: "Shore Infrastructure Solutions | YESEN Technologies Pvt Ltd" },
      {
        name: "description",
        content:
          "Building smart and sustainable marine infrastructure — smart jetties, pontoons, terminal buildings and floating infrastructure by YESEN Technologies Pvt Ltd.",
      },
      { property: "og:title", content: "Shore Infrastructure Solutions | YESEN Technologies Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Jetties, terminals and floating infrastructure that make boarding, charging and marine operations simple.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/solutions/shore-infrastructure" }],
  }),
  component: () => <SolutionDetailPage data={DATA} />,
});

const DATA: SolutionDetail = {
  index: "06",
  title: "Shore Infrastructure Solutions",
  titleLines: ["Shore Infrastructure", "Solutions"],
  tagline: "Building smart and sustainable marine infrastructure",
  Icon: Warehouse,
  image: shotShore,
  imageAlt: "Modern floating jetty and passenger terminal on the waterfront",
  features: [
    "Smart jetties & pontoons",
    "Ticketing counters",
    "Waiting lounges",
    "Terminal buildings",
    "Floating infrastructure",
  ],
  intro:
    "A vessel is only as good as the shore it connects to. We design and build the jetties, terminals and floating infrastructure that make boarding, charging and operations simple.",
  included: [
    {
      Icon: Anchor,
      title: "Jetties & pontoons",
      body: "Floating and fixed structures engineered for tidal range and vessel traffic.",
    },
    {
      Icon: Building2,
      title: "Terminal buildings",
      body: "Waiting lounges and ticketing counters designed alongside the waterfront they serve.",
    },
    {
      Icon: Sun,
      title: "Solar-ready structures",
      body: "Shore infrastructure built to host charging and solar generation where it's needed most.",
    },
  ],
  stats: [
    { value: "Tidal-ready", label: "floating structures" },
    { value: "Solar-ready", label: "terminal roofs" },
    { value: "Built", label: "for continuous vessel traffic" },
  ],
  process: [
    {
      n: "01",
      title: "Site assessment",
      body: "Tidal range, seabed and vessel traffic surveyed for the site.",
    },
    {
      n: "02",
      title: "Design",
      body: "Jetty, pontoon or terminal design matched to the site and operational needs.",
    },
    {
      n: "03",
      title: "Fabrication & install",
      body: "Structures fabricated and installed on site.",
    },
    {
      n: "04",
      title: "Commissioning",
      body: "Handover with waiting areas, ticketing and infrastructure ready for operation.",
    },
  ],
  applications: [
    {
      Icon: Ship,
      title: "Ferry terminals",
      body: "Boarding infrastructure built for passenger volume and vessel traffic.",
    },
    {
      Icon: Waves,
      title: "Resort & marina jetties",
      body: "Waterfront access points designed alongside guest experience.",
    },
    {
      Icon: PlugZap,
      title: "Charging & bunkering points",
      body: "Shore infrastructure built to support electric or hybrid fleets.",
    },
    {
      Icon: Ticket,
      title: "Ticketing & waiting areas",
      body: "Terminal buildings designed alongside the jetty they serve.",
    },
  ],
  faqs: [
    {
      q: "Do you handle permitting?",
      a: "We support the permitting process alongside site design, working with the relevant authorities for the location.",
    },
    {
      q: "Can jetties handle tidal range?",
      a: "Yes — floating and fixed structures are engineered around the site's actual tidal range and seabed conditions.",
    },
    {
      q: "Can infrastructure include EV or e-marine charging?",
      a: "Yes, shore infrastructure can be built or fitted with charging points for electric and hybrid vessels.",
    },
    {
      q: "Do you maintain infrastructure after handover?",
      a: "Ongoing support is available after commissioning — we can scope this alongside the build.",
    },
  ],
};
