import { createFileRoute } from "@tanstack/react-router";
import { Anchor, Palmtree, Ship, Sparkles, UtensilsCrossed, Waves, Leaf, Sofa } from "lucide-react";

import shotTourism from "@/assets/sol-tourism.jpg";
import { SolutionDetailPage, type SolutionDetail } from "@/components/SolutionDetailPage";

export const Route = createFileRoute("/solutions_/tourism-hospitality")({
  head: () => ({
    meta: [
      { title: "Tourism & Hospitality Solutions | YESEN Technologies Pvt Ltd" },
      {
        name: "description",
        content:
          "Elevating experiences on water — luxury houseboats, passenger ferries, floating restaurants and eco-tourism vessels built by YESEN Technologies Pvt Ltd.",
      },
      { property: "og:title", content: "Tourism & Hospitality Solutions | YESEN Technologies Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Houseboats, ferries and floating hospitality venues engineered for guests first, with quiet, clean operation as standard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/solutions/tourism-hospitality" }],
  }),
  component: () => <SolutionDetailPage data={DATA} />,
});

const DATA: SolutionDetail = {
  index: "05",
  title: "Tourism & Hospitality Solutions",
  titleLines: ["Tourism & Hospitality", "Solutions"],
  tagline: "Elevating experiences on water",
  Icon: Palmtree,
  image: shotTourism,
  imageAlt: "Luxury houseboat cruising calm backwaters at sunset",
  features: [
    "Luxury houseboats",
    "Passenger ferries",
    "Floating restaurants",
    "Eco-tourism solutions",
  ],
  intro:
    "Waterborne tourism lives or dies on comfort, reliability and atmosphere. We build houseboats, ferries and floating hospitality venues engineered for guests first, with quiet, clean operation as standard.",
  included: [
    {
      Icon: Sofa,
      title: "Houseboats & floating venues",
      body: "Custom interiors and systems for stays and dining experiences on the water.",
    },
    {
      Icon: Ship,
      title: "Passenger ferries",
      body: "Comfortable, efficient people-moving vessels for tourism and transit routes.",
    },
    {
      Icon: Leaf,
      title: "Eco-tourism ready",
      body: "Low-emission, low-noise operation that fits sensitive natural environments.",
    },
  ],
  stats: [
    { value: "Quiet", label: "electric-first cruising" },
    { value: "Custom", label: "interiors per project" },
    { value: "Eco-tourism", label: "ready operations" },
  ],
  process: [
    {
      n: "01",
      title: "Concept & design",
      body: "Guest experience, capacity and route worked into a concept for the vessel or venue.",
    },
    {
      n: "02",
      title: "Build or refit",
      body: "New build or refit of the hull and structure to match the concept.",
    },
    {
      n: "03",
      title: "Interiors & systems",
      body: "Interiors, comfort systems and power fitted out for guests.",
    },
    {
      n: "04",
      title: "Launch & support",
      body: "Operational handover with ongoing support.",
    },
  ],
  applications: [
    {
      Icon: Sparkles,
      title: "Luxury houseboats",
      body: "Multi-room stays with hotel-grade comfort on the water.",
    },
    {
      Icon: UtensilsCrossed,
      title: "Floating restaurants",
      body: "Dining venues built for a fixed or cruising waterfront location.",
    },
    {
      Icon: Anchor,
      title: "Sightseeing & sunset cruises",
      body: "Passenger vessels built around a guest experience, not just transit.",
    },
    {
      Icon: Waves,
      title: "Backwater & lake tourism",
      body: "Vessels suited to sheltered-water tourism routes.",
    },
  ],
  faqs: [
    {
      q: "Can existing houseboats be refitted?",
      a: "Yes — we refit existing houseboats for improved comfort, systems or electrification alongside new-build projects.",
    },
    {
      q: "Do you handle interiors and furnishings?",
      a: "Yes, interior fit-out is scoped as part of the build alongside the vessel's systems.",
    },
    {
      q: "What's the typical guest capacity range?",
      a: "Capacity varies by vessel type and project — we size it around your intended route and guest experience during concept design.",
    },
    {
      q: "Can vessels run fully electric for tours?",
      a: "Yes, tourism vessels can be built or fitted with electric propulsion for quieter, lower-emission cruising.",
    },
  ],
};
