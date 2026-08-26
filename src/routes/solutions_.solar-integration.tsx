import { createFileRoute } from "@tanstack/react-router";
import { BatteryCharging, Gauge, Ship, Sun, Sailboat, Waves, Anchor, Shield } from "lucide-react";

import shotSolar from "@/assets/sol-solar.jpg";
import { SolutionDetailPage, type SolutionDetail } from "@/components/SolutionDetailPage";

export const Route = createFileRoute("/solutions_/solar-integration")({
  head: () => ({
    meta: [
      { title: "Solar Integration | YESEN Technologies Pvt Ltd" },
      {
        name: "description",
        content:
          "Harnessing the power of the sun — marine-grade solar PV, hybrid energy systems and smart energy management engineered by YESEN Technologies Pvt Ltd.",
      },
      { property: "og:title", content: "Solar Integration | YESEN Technologies Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Marine-grade solar PV arrays and hybrid power management that extend range and cut cost per nautical mile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/solutions/solar-integration" }],
  }),
  component: () => <SolutionDetailPage data={DATA} />,
});

const DATA: SolutionDetail = {
  index: "02",
  title: "Solar Integration",
  titleLines: ["Solar", "Integration"],
  tagline: "Harnessing the power of the sun",
  Icon: Sun,
  image: shotSolar,
  imageAlt: "Marine-grade solar panels installed on a vessel roof",
  features: [
    "Solar PV integration",
    "Hybrid energy solutions",
    "Smart energy management",
    "Maximum efficiency",
    "Sustainable operations",
  ],
  intro:
    "Solar isn't a novelty on the water anymore — it's a serious source of range and cost savings. We fit marine-grade PV arrays and hybrid energy systems that keep vessels running longer between charges.",
  included: [
    {
      Icon: Sun,
      title: "Marine-grade solar PV",
      body: "Low-profile panel arrays engineered for deck loads, salt exposure and constant vibration.",
    },
    {
      Icon: BatteryCharging,
      title: "Hybrid power management",
      body: "Solar, battery and generator sources balanced automatically for the lowest cost per nautical mile.",
    },
    {
      Icon: Gauge,
      title: "Performance monitoring",
      body: "Live generation and consumption data so operators know exactly what the sun is saving them.",
    },
  ],
  stats: [
    { value: "25%+", label: "range extension from solar top-up" },
    { value: "IP68", label: "marine-grade sealed panels" },
    { value: "10yr+", label: "panel design life" },
  ],
  process: [
    {
      n: "01",
      title: "Assess",
      body: "Solar potential is mapped against your route, deck space and existing power draw.",
    },
    {
      n: "02",
      title: "Design",
      body: "Array layout and hybrid system architecture designed around your vessel's roofline and loads.",
    },
    {
      n: "03",
      title: "Install",
      body: "Marine-grade panels and hybrid controllers fitted and sealed for continuous exposure.",
    },
    {
      n: "04",
      title: "Monitor & handover",
      body: "Live monitoring configured, crew trained, and system handed over.",
    },
  ],
  applications: [
    {
      Icon: Ship,
      title: "Solar-electric ferries",
      body: "Daytime routes where solar meaningfully extends range between charges.",
    },
    {
      Icon: Sailboat,
      title: "Houseboats & floating stays",
      body: "Continuous hotel-load power for lighting, AC and appliances without running a generator.",
    },
    {
      Icon: Anchor,
      title: "Off-grid jetties",
      body: "Shore points where grid power isn't practical or reliable.",
    },
    {
      Icon: Shield,
      title: "Patrol & survey vessels",
      body: "Extended time on station without extra fuel load.",
    },
  ],
  faqs: [
    {
      q: "Does solar fully power the vessel?",
      a: "On most routes solar works as a meaningful top-up alongside battery or hybrid power rather than a sole source — we size the system to your actual route and loads.",
    },
    {
      q: "How much deck space do panels need?",
      a: "It depends on the vessel and target output; we lay out the array during design to fit your roofline without compromising deck use.",
    },
    {
      q: "What happens on cloudy days?",
      a: "The hybrid system automatically draws from battery or generator sources, so operation isn't dependent on sunlight.",
    },
    {
      q: "Can this pair with an existing diesel engine?",
      a: "Yes, solar and battery systems can be integrated alongside an existing diesel engine as a hybrid setup.",
    },
  ],
};
