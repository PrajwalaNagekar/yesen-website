import c1 from "@/assets/p001-cover.jpg.asset.json";
import c2 from "@/assets/p002-cover.jpg.asset.json";
import c3 from "@/assets/p003-cover.jpg.asset.json";
import c4 from "@/assets/p004-cover.jpg.asset.json";
import c5 from "@/assets/p005-cover.jpg.asset.json";
import c6 from "@/assets/p006-cover.jpg.asset.json";
import c7 from "@/assets/p007-cover.jpg.asset.json";
import c8 from "@/assets/p008-cover.jpg.asset.json";
import c9 from "@/assets/p009-cover.jpg.asset.json";
import g1b from "@/assets/p001-g2.jpg.asset.json";
import g2b from "@/assets/p002-g2.jpg.asset.json";
import g2c from "@/assets/p002-g3.jpg.asset.json";
import g2d from "@/assets/p002-g4.jpg.asset.json";
import g2e from "@/assets/p002-g5.jpg.asset.json";
import g2f from "@/assets/p002-g6.jpg.asset.json";
import g3b from "@/assets/p003-g2.jpg.asset.json";
import g3c from "@/assets/p003-g3.jpg.asset.json";
import g9b from "@/assets/p009-g2.jpg.asset.json";

export type ProjectStatus = "complete" | "progress" | "pilot";

export type ProjectRecord = {
  id: string;
  status: ProjectStatus;
  statusLabel: string;
  title: string;
  loc: string;
  country: string;
  timeline: string;
  technology: string;
  summary: string;
  body: string;
  specs: Array<[string, string]>;
  cover: string;
  gallery: string[];
};

export const PROJECT_LOG: ProjectRecord[] = [
  {
    id: "001",
    status: "pilot",
    statusLabel: "Pilot",
    title: "Solar-electric ferry",
    loc: "India",
    country: "India",
    timeline: "Deployed 2021",
    technology: "Solar-electric hybrid propulsion",
    summary: "Our industry leading solution on solar electric hybrid boats.",
    body: "A solar-electric passenger ferry operating in India — a landmark deployment showcasing E-MARINE's pre-engineered electrification capabilities in real-world conditions.",
    specs: [
      ["Type", "Solar-electric passenger ferry"],
      ["Deployed", "2021"],
      ["Location", "India"],
      ["Technology", "E-MARINE electrification kit"],
    ],
    cover: c1.url,
    gallery: [c1.url, g1b.url],
  },
  {
    id: "002",
    status: "progress",
    statusLabel: "In progress",
    title: "Solar houseboats — Tourism",
    loc: "India",
    country: "India",
    timeline: "Nov 2025 → Aug 2026",
    technology: "Solar-electric houseboats + shore infrastructure",
    summary:
      "Design, fabrication and supply of luxury solar houseboats with complete shore infrastructure.",
    body: "The project encompasses design, fabrication, and supply of 2 BHK and 4 BHK solar-electric houseboats, along with shore infrastructure including a ticketing counter, jetty, and waiting room facilities.",
    specs: [
      ["Awarded", "13 Nov 2025"],
      ["Target completion", "31 Aug 2026"],
      ["Unit types", "2 BHK, 4 BHK"],
      ["Location", "India"],
      ["Scope", "Houseboats + shore infrastructure"],
    ],
    cover: c2.url,
    gallery: [c2.url, g2b.url, g2c.url, g2d.url, g2e.url, g2f.url],
  },
  {
    id: "003",
    status: "complete",
    statusLabel: "Complete",
    title: "Commercial Centre solar",
    loc: "USA",
    country: "USA",
    timeline: "Completed",
    technology: "Rooftop solar PV — 114.48 kWp",
    summary: "Rooftop solar installation for a commercial centre.",
    body: "Full rooftop solar deployment for a commercial centre, including racking installation and anchoring with waterproofing completed.",
    specs: [
      ["Project value", "USD 188,471"],
      ["Solar modules installed", "212 nos."],
      ["Installed capacity", "114.48 kWp"],
      ["Location", "USA"],
    ],
    cover: c3.url,
    gallery: [c3.url, g3b.url, g3c.url],
  },
  {
    id: "004",
    status: "complete",
    statusLabel: "Complete",
    title: "House solar installations",
    loc: "USA",
    country: "USA",
    timeline: "Completed",
    technology: "Residential rooftop solar PV",
    summary: "Several residential rooftop solar installations.",
    body: "Multiple house solar installations completed as part of YESEN's residential clean-energy work.",
    specs: [
      ["Category", "Residential solar"],
      ["Location", "USA"],
      ["Status", "Complete"],
    ],
    cover: c4.url,
    gallery: [c4.url],
  },
  {
    id: "005",
    status: "complete",
    statusLabel: "Complete",
    title: "House solar installations",
    loc: "India",
    country: "India",
    timeline: "Completed",
    technology: "Residential rooftop solar PV",
    summary: "Several residential rooftop solar installations across India.",
    body: "Multiple house solar installations completed across India as part of YESEN's residential clean-energy work.",
    specs: [
      ["Category", "Residential solar"],
      ["Location", "India"],
      ["Status", "Complete"],
    ],
    cover: c5.url,
    gallery: [c5.url],
  },
  {
    id: "006",
    status: "complete",
    statusLabel: "Complete",
    title: "200+ MNRE solar installations",
    loc: "India",
    country: "India",
    timeline: "Completed",
    technology: "MNRE rooftop solar PV",
    summary: "Over 200 MNRE-registered solar installations delivered across India.",
    body: "YESEN has delivered more than 200 solar installations under MNRE (Ministry of New and Renewable Energy) schemes across India.",
    specs: [
      ["Installations", "200+"],
      ["Programme", "MNRE"],
      ["Location", "India"],
    ],
    cover: c6.url,
    gallery: [c6.url],
  },
  {
    id: "007",
    status: "complete",
    statusLabel: "Complete",
    title: "Marine project with CEDAC",
    loc: "India",
    country: "India",
    timeline: "Completed",
    technology: "Marine electrification",
    summary: "Marine electrification project delivered in partnership with CEDAC.",
    body: "A completed marine project developed in collaboration with CEDAC, applying YESEN's electrification and clean-propulsion expertise.",
    specs: [
      ["Partner", "CEDAC"],
      ["Sector", "Marine"],
      ["Location", "India"],
    ],
    cover: c7.url,
    gallery: [c7.url],
  },
  {
    id: "008",
    status: "complete",
    statusLabel: "Complete",
    title: "Solar-electric houseboat",
    loc: "India",
    country: "India",
    timeline: "Completed",
    technology: "Solar-electric houseboat",
    summary: "Solar-electric houseboat delivered for tourism operations.",
    body: "A completed houseboat project built with clean marine propulsion and solar integration.",
    specs: [
      ["Type", "Houseboat"],
      ["Location", "India"],
      ["Status", "Complete"],
    ],
    cover: c8.url,
    gallery: [c8.url],
  },
  {
    id: "009",
    status: "complete",
    statusLabel: "Complete",
    title: "Electric boat",
    loc: "India",
    country: "India",
    timeline: "Completed",
    technology: "E-MARINE electric propulsion",
    summary: "Electric boat delivered for airport operations.",
    body: "A completed electric boat project featuring E-MARINE's electrification systems and onboard control console.",
    specs: [
      ["Client", "CIAL"],
      ["Type", "Electric boat"],
      ["Location", "India"],
    ],
    cover: c9.url,
    gallery: [c9.url, g9b.url],
  },
];

export const STATUS_STYLES: Record<ProjectStatus, string> = {
  complete: "bg-brand-leaf/12 text-brand-forest",
  progress: "bg-brand-blue/12 text-brand-navy",
  pilot: "bg-amber-500/12 text-amber-700",
};

export const STATUS_DOT: Record<ProjectStatus, string> = {
  complete: "bg-brand-forest",
  progress: "bg-brand-blue",
  pilot: "bg-amber-600",
};

export function findProject(id: string) {
  return PROJECT_LOG.find((p) => p.id === id);
}

/** Previous / next records for cross-navigation between project files. */
export function projectNeighbours(id: string) {
  const i = PROJECT_LOG.findIndex((p) => p.id === id);
  if (i < 0) return { prev: undefined, next: undefined };
  const prev = PROJECT_LOG[(i - 1 + PROJECT_LOG.length) % PROJECT_LOG.length];
  const next = PROJECT_LOG[(i + 1) % PROJECT_LOG.length];
  return { prev, next };
}
