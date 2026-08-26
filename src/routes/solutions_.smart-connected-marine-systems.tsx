import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Gauge,
  MonitorSmartphone,
  Palmtree,
  Radio,
  Ship,
  Shield,
  Workflow,
} from "lucide-react";

import shotSmart from "@/assets/sol-smart.jpg";
import { SolutionDetailPage, type SolutionDetail } from "@/components/SolutionDetailPage";

export const Route = createFileRoute("/solutions_/smart-connected-marine-systems")({
  head: () => ({
    meta: [
      { title: "Smart Connected Marine Systems | YESEN Technologies Pvt Ltd" },
      {
        name: "description",
        content:
          "Intelligence built into every voyage — vessel telemetry, predictive maintenance, remote diagnostics and fleet dashboards from YESEN Technologies Pvt Ltd.",
      },
      { property: "og:title", content: "Smart Connected Marine Systems | YESEN Technologies Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Live fleet telemetry, predictive maintenance alerts and remote diagnostics for connected marine operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://yesen.website/solutions/smart-connected-marine-systems",
      },
    ],
  }),
  component: () => <SolutionDetailPage data={DATA} />,
});

const DATA: SolutionDetail = {
  index: "03",
  title: "Smart Connected Marine Systems",
  titleLines: ["Smart Connected", "Marine Systems"],
  tagline: "Intelligence built into every voyage",
  Icon: Workflow,
  image: shotSmart,
  imageAlt: "Fleet monitoring dashboard showing live vessel telemetry",
  features: [
    "Vessel telemetry & monitoring",
    "Predictive maintenance",
    "Remote diagnostics",
    "Fleet management dashboards",
    "Real-time navigation data",
    "IoT integration",
  ],
  intro:
    "Connected systems turn a vessel into a live data source. We instrument propulsion, energy and navigation systems so operators can monitor, diagnose and plan maintenance from shore, in real time.",
  included: [
    {
      Icon: MonitorSmartphone,
      title: "Fleet-wide telemetry",
      body: "A single dashboard for every vessel's position, power state and system health.",
    },
    {
      Icon: Activity,
      title: "Predictive maintenance",
      body: "Early-warning alerts on drivetrain and battery health before a small issue becomes downtime.",
    },
    {
      Icon: Radio,
      title: "Remote diagnostics",
      body: "Engineers can investigate and often resolve issues without boarding the vessel.",
    },
  ],
  stats: [
    { value: "24/7", label: "live fleet visibility" },
    { value: "Minutes", label: "not days, for remote diagnostics" },
    { value: "Fewer", label: "unplanned dockings via predictive alerts" },
  ],
  process: [
    {
      n: "01",
      title: "Instrument",
      body: "Sensors and telemetry hardware fitted to propulsion, energy and navigation systems.",
    },
    {
      n: "02",
      title: "Connect",
      body: "Vessel data streamed securely to a shore-based fleet dashboard.",
    },
    {
      n: "03",
      title: "Configure alerts",
      body: "Thresholds and alert rules set for the systems that matter most to your operation.",
    },
    {
      n: "04",
      title: "Monitor & support",
      body: "Ongoing monitoring, with our team on hand for diagnostics and support.",
    },
  ],
  applications: [
    {
      Icon: Ship,
      title: "Multi-vessel ferry operators",
      body: "One dashboard across an entire fleet instead of per-vessel guesswork.",
    },
    {
      Icon: Palmtree,
      title: "Tourism fleets",
      body: "Visibility into vessel availability and condition across a booking-driven schedule.",
    },
    {
      Icon: Shield,
      title: "Government & patrol fleets",
      body: "Operational readiness and maintenance planning across dispersed assets.",
    },
    {
      Icon: Gauge,
      title: "Charter operators",
      body: "Real-time status so dispatch decisions don't rely on radio check-ins.",
    },
  ],
  faqs: [
    {
      q: "Does this work with our existing vessels?",
      a: "Yes — telemetry hardware can be retrofitted to most existing vessels alongside their current systems.",
    },
    {
      q: "What data does it collect?",
      a: "Position, power and battery state, drivetrain health and navigation data, configured to what's relevant for your fleet.",
    },
    {
      q: "Can multiple people access the dashboard?",
      a: "Yes, the dashboard supports multiple users with role-based access across your operations team.",
    },
    {
      q: "Is the connection secure?",
      a: "Vessel data is transmitted over a secured connection to the shore-based dashboard.",
    },
  ],
};
