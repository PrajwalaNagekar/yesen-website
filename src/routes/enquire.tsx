import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";


export const Route = createFileRoute("/enquire")({
  head: () => ({
    meta: [
      { title: "Enquire | YESEN Technologies Pvt Ltd — Products & Marine Solutions" },
      {
        name: "description",
        content:
          "Send one enquiry for any YESEN Technologies Pvt Ltd product or marine solution. Select a product or solution and share your vessel, route and timeline in a single form.",
      },
      { property: "og:title", content: "Enquire | YESEN Technologies Pvt Ltd" },
      {
        property: "og:description",
        content:
          "One form for every product and solution — select what you need and our marine engineering team responds within 1–2 working days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/enquire" }],
  }),
  component: EnquirePage,
});

/* ---------------- data ---------------- */

const INTERESTS = [
  { key: "product", label: "A product", hint: "E-MARINE, B-KOOL, M-CONTROL, B-GUARD" },
  { key: "solution", label: "A solution", hint: "Electrification, solar, new builds, shore" },
  { key: "general", label: "General enquiry", hint: "Partnerships, press, careers, other" },
] as const;

type InterestKey = (typeof INTERESTS)[number]["key"];

const PRODUCTS = [
  "E-MARINE — Electric marine propulsion",
  "B-KOOL — Marine battery cooling",
  "M-CONTROL — Vessel control & telemetry",
  "B-GUARD — Battery safety & protection",
];

const SOLUTIONS = [
  "Marine Electrification",
  "Solar Integration",
  "Smart Connected Marine Systems",
  "New Vessel Engineering & Construction",
  "Tourism & Hospitality Solutions",
  "Shore Infrastructure Solutions",
];

const VESSEL_TYPES = [
  "Ferry",
  "Tour boat",
  "Houseboat",
  "Trawler",
  "Yacht",
  "Workboat",
  "Patrol craft",
  "Other",
];

const BUILD_MODES = ["Retrofit existing vessel", "New build", "Not decided yet"];
const TIMELINES = ["Immediate", "1–3 months", "3–6 months", "6–12 months", "Exploring"];
const BUDGETS = ["Not defined yet", "Under ₹25 L", "₹25 L – ₹1 Cr", "₹1 Cr – ₹5 Cr", "₹5 Cr +"];

/* ---- selection-specific field sets (form grows with the dropdown) ---- */

type SpecField =
  | { kind: "text"; name: string; label: string; placeholder?: string }
  | { kind: "select"; name: string; label: string; options: string[] }
  | { kind: "chips"; name: string; label: string; options: string[] };

const SPECS: Record<string, { title: string; fields: SpecField[] }> = {
  "E-MARINE": {
    title: "E-MARINE — propulsion requirements",
    fields: [
      { kind: "chips", name: "propulsionLayout", label: "Propulsion layout", options: ["Single motor", "Twin motor", "Pod drive", "Outboard", "Not sure"] },
      { kind: "select", name: "powerRating", label: "Target motor power", options: ["Under 20 kW", "20–50 kW", "50–150 kW", "150–400 kW", "400 kW +", "Advise us"] },
      { kind: "select", name: "batteryCapacity", label: "Battery capacity needed", options: ["Under 50 kWh", "50–150 kWh", "150–400 kWh", "400 kWh +", "Advise us"] },
      { kind: "chips", name: "charging", label: "Charging access at berth", options: ["Single-phase", "Three-phase", "DC fast charge", "None yet"] },
      { kind: "text", name: "cruiseSpeed", label: "Required cruise speed", placeholder: "e.g. 8 knots" },
      { kind: "text", name: "rangePerCharge", label: "Range per charge", placeholder: "e.g. 60 km" },
      { kind: "chips", name: "existingEngine", label: "Existing propulsion", options: ["Diesel inboard", "Diesel outboard", "Petrol", "Hybrid", "None / new build"] },
      { kind: "select", name: "classSociety", label: "Certification / class", options: ["IRS", "Inland waterways authority", "DNV / Lloyd's", "Not applicable", "Not sure"] },
    ],
  },
  "B-KOOL": {
    title: "B-KOOL — cooling requirements",
    fields: [
      { kind: "chips", name: "packChemistry", label: "Battery chemistry", options: ["LFP", "NMC", "LTO", "Other / not sure"] },
      { kind: "select", name: "packSize", label: "Pack size to cool", options: ["Under 50 kWh", "50–150 kWh", "150–400 kWh", "400 kWh +"] },
      { kind: "chips", name: "coolingType", label: "Preferred cooling", options: ["Liquid cooled", "Air cooled", "Immersion", "Advise us"] },
      { kind: "text", name: "ambientTemp", label: "Ambient temperature range", placeholder: "e.g. 28–38 °C" },
      { kind: "text", name: "cRate", label: "Typical charge / discharge rate", placeholder: "e.g. 1C discharge, 0.5C charge" },
      { kind: "chips", name: "installStage", label: "Installation stage", options: ["Design stage", "Pack already built", "Live vessel issue"] },
    ],
  },
  "M-CONTROL": {
    title: "M-CONTROL — control & telemetry requirements",
    fields: [
      { kind: "chips", name: "monitorScope", label: "What should be monitored", options: ["Battery / BMS", "Motor & drive", "Navigation", "Energy use", "Passenger systems"] },
      { kind: "chips", name: "connectivity", label: "Connectivity available", options: ["4G / LTE", "Wi-Fi at berth", "Satellite", "Offline logging"] },
      { kind: "select", name: "fleetSize", label: "Fleet size", options: ["1 vessel", "2–5 vessels", "6–20 vessels", "20 +"] },
      { kind: "chips", name: "dashboards", label: "Dashboards needed", options: ["Onboard HMI", "Shore dashboard", "Mobile app", "API / data export"] },
      { kind: "text", name: "integrations", label: "Existing systems to integrate", placeholder: "e.g. Victron, CANbus BMS" },
    ],
  },
  "B-GUARD": {
    title: "B-GUARD — safety & protection requirements",
    fields: [
      { kind: "chips", name: "protectionScope", label: "Protection scope", options: ["Thermal runaway", "Gas / smoke detection", "Fire suppression", "Isolation & shutdown"] },
      { kind: "select", name: "guardPackSize", label: "Pack size to protect", options: ["Under 50 kWh", "50–150 kWh", "150–400 kWh", "400 kWh +"] },
      { kind: "chips", name: "enclosure", label: "Battery enclosure", options: ["Below deck", "On deck", "Dedicated battery room", "Not decided"] },
      { kind: "text", name: "complianceNeeds", label: "Compliance / survey requirement", placeholder: "e.g. IRS inland survey" },
    ],
  },
  "Marine Electrification": {
    title: "Marine Electrification — project scope",
    fields: [
      { kind: "chips", name: "fleetScope", label: "Scope", options: ["Single vessel", "Fleet pilot", "Full fleet transition", "Feasibility study"] },
      { kind: "select", name: "elecPower", label: "Power requirement per vessel", options: ["Under 50 kW", "50–150 kW", "150–400 kW", "400 kW +", "Advise us"] },
      { kind: "chips", name: "chargingPlan", label: "Charging plan", options: ["Shore charger at jetty", "Opportunity charging", "Battery swap", "To be designed"] },
      { kind: "text", name: "dailyRange", label: "Daily distance covered", placeholder: "e.g. 90 km across 12 trips" },
      { kind: "text", name: "fuelSpend", label: "Current monthly fuel spend", placeholder: "Optional" },
    ],
  },
  "Solar Integration": {
    title: "Solar Integration — site & array details",
    fields: [
      { kind: "chips", name: "solarSite", label: "Installation site", options: ["Vessel roof", "Canopy / awning", "Jetty / shore", "Floating array"] },
      { kind: "text", name: "solarArea", label: "Available area", placeholder: "e.g. 40 m² roof" },
      { kind: "select", name: "solarTarget", label: "Target array size", options: ["Under 5 kWp", "5–20 kWp", "20–100 kWp", "100 kWp +", "Advise us"] },
      { kind: "chips", name: "storage", label: "Storage", options: ["With battery storage", "Grid-tied only", "Hybrid with genset", "Not sure"] },
      { kind: "chips", name: "solarGoal", label: "Primary goal", options: ["Fuel savings", "Silent hotel load", "Off-grid operation", "Sustainability reporting"] },
    ],
  },
  "Smart Connected Marine Systems": {
    title: "Smart Connected Marine Systems — requirements",
    fields: [
      { kind: "chips", name: "smartScope", label: "Systems to connect", options: ["Propulsion & energy", "Navigation", "Passenger counting", "Ticketing", "CCTV / safety"] },
      { kind: "select", name: "smartFleet", label: "Number of vessels", options: ["1", "2–5", "6–20", "20 +"] },
      { kind: "chips", name: "smartOutputs", label: "Required outputs", options: ["Live dashboard", "Alerts & alarms", "Predictive maintenance", "Regulatory reports"] },
      { kind: "text", name: "smartExisting", label: "Existing hardware / vendors", placeholder: "Optional" },
    ],
  },
  "New Vessel Engineering & Construction": {
    title: "New Vessel Engineering & Construction — brief",
    fields: [
      { kind: "chips", name: "buildStage", label: "Current stage", options: ["Concept only", "Concept design ready", "Detailed design ready", "Tender in progress"] },
      { kind: "text", name: "paxCapacity", label: "Passenger / cargo capacity", placeholder: "e.g. 100 pax" },
      { kind: "text", name: "hullLength", label: "Target length & beam", placeholder: "e.g. 18 m × 5 m" },
      { kind: "chips", name: "hullMaterial", label: "Hull material", options: ["Aluminium", "Steel", "FRP / composite", "Advise us"] },
      { kind: "chips", name: "buildScope", label: "Scope needed", options: ["Design only", "Design + build", "Build to our design", "Refit"] },
      { kind: "select", name: "buildClass", label: "Class / registration", options: ["IRS", "State inland authority", "International class", "Not sure"] },
    ],
  },
  "Tourism & Hospitality Solutions": {
    title: "Tourism & Hospitality Solutions — experience brief",
    fields: [
      { kind: "chips", name: "propertyType", label: "Property / asset type", options: ["Houseboat", "Floating stay", "Day-cruise boat", "Resort jetty", "Other"] },
      { kind: "text", name: "guestCount", label: "Guests per day / keys", placeholder: "e.g. 24 guests, 6 rooms" },
      { kind: "chips", name: "hospitalityScope", label: "Scope", options: ["Silent electric cruising", "Solar + storage", "Interior & fit-out", "Guest tech & Wi-Fi"] },
      { kind: "text", name: "location", label: "Destination / waterbody", placeholder: "e.g. Alappuzha backwaters" },
      { kind: "chips", name: "season", label: "Operating pattern", options: ["Year round", "Seasonal peaks", "Charter only"] },
    ],
  },
  "Shore Infrastructure Solutions": {
    title: "Shore Infrastructure Solutions — site details",
    fields: [
      { kind: "chips", name: "shoreAsset", label: "Asset", options: ["Jetty / pontoon", "Charging station", "Terminal building", "Substation upgrade"] },
      { kind: "select", name: "gridAvailable", label: "Grid capacity at site", options: ["Under 50 kVA", "50–150 kVA", "150–500 kVA", "500 kVA +", "Unknown"] },
      { kind: "text", name: "vesselsServed", label: "Vessels to be served", placeholder: "e.g. 4 ferries per hour" },
      { kind: "chips", name: "sitePermits", label: "Permits status", options: ["Approved", "In process", "Not started", "Not sure"] },
      { kind: "text", name: "siteLocation", label: "Site location", placeholder: "e.g. Fort Kochi jetty" },
    ],
  },
};

/* ---------------- primitives ---------------- */

const inputCls =
  "w-full rounded-[0.7rem] border-[1.5px] border-brand-navy/12 bg-white/75 px-3.5 py-3 text-[0.9rem] text-brand-navy outline-none transition-colors placeholder:text-brand-navy/35 focus:border-brand-sky focus:bg-white";

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-navy/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function Chips({
  options,
  value,
  onChange,
  disabled = false,
}: {
  options: readonly string[];
  value: string | null;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          disabled={disabled}
          onClick={() => onChange(o)}
          className={`rounded-full border-[1.5px] px-3.5 py-2 text-[0.8rem] transition-colors ${value === o
            ? "border-brand-navy bg-brand-navy text-brand-ivory"
            : "border-brand-navy/12 bg-white/70 text-brand-navy hover:border-brand-sky"
            } disabled:opacity-50 disabled:pointer-events-none`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}


function StepLabel({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-brand-navy/10" />

      <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-navy/55">
        {title}
      </span>
    </div>
  );
}

/* ---------------- page ---------------- */

function EnquirePage() {
  const [interest, setInterest] = useState<InterestKey>("product");
  const [choice, setChoice] = useState("");
  const [vessel, setVessel] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [specValues, setSpecValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const mapVesselType = (v: string | null): string | undefined => {
    if (!v) return undefined;
    const lower = v.toLowerCase();
    if (lower === "houseboat") return "House boat";
    if (lower === "yacht") return "Yatch";
    if (lower === "patrol craft") return "Patrol boat";
    if (lower === "other") return "other";

    const validTypes = ["Ferry", "Tour boat", "House boat", "Trawler", "Yatch", "Workboat", "Patrol boat", "other"];
    const found = validTypes.find((t) => t.toLowerCase() === lower);
    return found || "other";
  };

  const mapRetrofitStatus = (m: string | null): string | undefined => {
    if (!m) return undefined;
    const lower = m.toLowerCase();
    if (lower.includes("retrofit")) return "retrofit existing";
    if (lower.includes("new build")) return "new build";
    if (lower.includes("decided")) return "not decided yet";
    return undefined;
  };


  const options = useMemo(
    () => (interest === "product" ? PRODUCTS : interest === "solution" ? SOLUTIONS : []),
    [interest],
  );

  const spec = useMemo(() => {
    if (!choice) return null;
    return SPECS[choice.split(" — ")[0]] ?? null;
  }, [choice]);


  return (
    <main className="relative min-h-screen bg-shell pb-16 pt-24">
      {/* ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(70%_60%_at_50%_0%,color-mix(in_oklab,var(--brand-sky)_18%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[76rem] px-6 sm:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-brand-navy/60 transition-colors hover:text-brand-forest"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>

        <header className="mt-6 grid items-end gap-x-12 gap-y-5 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-brand-leaf">
              Get a quote
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-light leading-[1.06] tracking-[-0.03em] text-brand-navy">
              One form for{" "}
              <span className="bg-[linear-gradient(100deg,var(--brand-sky),var(--brand-leaf))] bg-clip-text text-transparent">
                everything
              </span>{" "}
              we build.
            </h1>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-[46ch] text-[0.92rem] leading-relaxed text-brand-navy/65">
              Choose a product or a solution and the form adapts to it — vessel type, route, duty
              cycle and timeline included. No need to go back to individual pages.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-navy/45">
              <span>1–2 day reply</span>
              <span>Engineer reviewed</span>
              <span>No obligation</span>
            </div>
          </div>
        </header>


        {sent ? (
          <section className="mt-14 rounded-[1.4rem] border border-brand-leaf/25 bg-white/80 p-12 text-center shadow-[0_40px_90px_-60px_color-mix(in_oklab,var(--brand-navy)_60%,transparent)]">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(100deg,var(--brand-sky),var(--brand-leaf))] text-white">
              <Check size={24} strokeWidth={2.6} />
            </span>
            <h2 className="mt-6 font-display text-2xl text-brand-navy">Quote request received</h2>
            <p className="mx-auto mt-3 max-w-[46ch] text-[0.9rem] leading-relaxed text-brand-navy/60">
              Thank you — our team will reply within 1–2 working days
              {choice ? ` about ${choice.split(" — ")[0]}` : ""}.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex h-11 items-center rounded-full border border-brand-navy/15 bg-white/70 px-6 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-brand-navy transition-colors hover:border-brand-leaf hover:text-brand-forest"
              >
                Back to home
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setInterest("product");
                  setChoice("");
                  setVessel(null);
                  setMode(null);
                  setTimeline(null);
                  setSpecValues({});
                  setSubmitError(null);
                  setEmailValue("");
                  setPhoneValue("");
                }}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-navy px-6 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-brand-ivory transition-opacity hover:opacity-90"
              >
                Send another <ArrowRight size={14} />
              </button>
            </div>
          </section>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:items-start">
            {/* form */}
            <form
              className="rounded-[1.4rem] border border-brand-navy/10 bg-white/70 p-6 shadow-[0_40px_90px_-60px_color-mix(in_oklab,var(--brand-navy)_55%,transparent)] backdrop-blur-xl sm:p-8"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitError(null);

                const formData = new FormData(e.currentTarget);
                const clientName = formData.get("name") as string;
                const email = formData.get("email") as string;
                const phone = formData.get("phone") as string;
                const company = formData.get("company") as string;
                const countryLocation = formData.get("location") as string;

                // Build message field with budget and specifications embedded
                let rawMessage = formData.get("message") as string || "";
                let finalMessage = rawMessage.trim();

                const budget = formData.get("budget");
                if (budget) {
                  finalMessage += `\n\n[Budget]\n${budget}`;
                }

                if (countryLocation) {
                  finalMessage += `\n\n[Location]\n${countryLocation}`;
                }

                if (spec && Object.keys(specValues).length > 0) {
                  finalMessage += `\n\n[Specifications for ${spec.title}]\n`;
                  spec.fields.forEach((field) => {
                    const val = specValues[field.name];
                    if (val) {
                      finalMessage += `- ${field.label}: ${val}\n`;
                    }
                  });
                }

                // Extract productOrServiceName
                const productOrServiceName = choice ? (choice.includes(" — ") ? choice.split(" — ")[0] : choice) : undefined;

                // Normalize validated enums
                const normalizedVesselType = mapVesselType(vessel);
                const normalizedRetrofitStatus = mapRetrofitStatus(mode);

                const payload: Record<string, any> = {
                  clientName,
                  name: clientName,
                  email: email || undefined,
                  phone: phone || undefined,
                  company: company || undefined,
                  message: finalMessage,
                  sourcePage: "/enquire",
                };

                if (interest !== "general") {
                  payload.productOrServiceName = productOrServiceName;
                  payload.vesselType = normalizedVesselType;
                  payload.retrofitStatus = normalizedRetrofitStatus;
                  payload.vesselLength = formData.get("vesselSize") as string || undefined;
                  payload.operatingArea = formData.get("route") as string || undefined;
                  payload.dailyOperatingHours = formData.get("hours") as string || undefined;
                  payload.timeLine = timeline || undefined;
                }

                let endpoint = "/contact";
                if (interest === "product") {
                  endpoint = "/product";
                } else if (interest === "solution") {
                  endpoint = "/service";
                }

                const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1";
                const formsKey = import.meta.env.VITE_FORMS_API_KEY || "change_this_forms_key_min_8_chars";

                try {
                  const response = await fetch(`${apiUrl}/forms${endpoint}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-forms-key": formsKey,
                    },
                    body: JSON.stringify(payload),
                  });

                  if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.message || `Server responded with ${response.status}`);
                  }

                  setSent(true);
                  toast.success("Quote request submitted successfully!");
                } catch (err: any) {
                  console.error("Submission error:", err);
                  const errMsg = err.message || "Failed to submit enquiry. Please check your network and try again.";
                  setSubmitError(errMsg);
                  toast.error(errMsg);
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >

              {/* step 1 */}
              <StepLabel title="What are you enquiring about?" />
              <div className="grid gap-3 sm:grid-cols-3">
                {INTERESTS.map((i) => {
                  const active = interest === i.key;
                  return (
                    <button
                      key={i.key}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        setInterest(i.key);
                        setChoice("");
                      }}
                      className={`rounded-[1rem] border-[1.5px] p-4 text-left transition-all duration-300 ${active
                        ? "border-brand-navy bg-brand-navy text-brand-ivory shadow-[0_20px_45px_-30px_color-mix(in_oklab,var(--brand-navy)_80%,transparent)]"
                        : "border-brand-navy/12 bg-white/70 text-brand-navy hover:border-brand-sky"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >

                      <span className="block text-[0.92rem] font-medium">{i.label}</span>
                      <span
                        className={`mt-1.5 block text-[0.72rem] leading-snug ${active ? "text-brand-ivory/70" : "text-brand-navy/50"
                          }`}
                      >
                        {i.hint}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* selection dropdown */}
              {interest !== "general" && (
                <div className="mt-8">
                  <StepLabel
                    title={interest === "product" ? "Select a product" : "Select a solution"}
                  />
                  <select
                    className={inputCls}
                    value={choice}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setChoice(e.target.value);
                      setSpecValues({});
                    }}
                    required
                  >
                    <option value="">
                      {interest === "product" ? "Choose a product…" : "Choose a solution…"}
                    </option>
                    {options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>

                </div>
              )}

              {/* full detail block — always visible */}
              <div className="mt-8">
                <StepLabel
                  title={interest === "general" ? "Your enquiry" : "Project details"}
                />


                {interest !== "general" && (
                  <div className="space-y-6">
                    <fieldset className="border-0 p-0">
                      <legend className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-navy/50">
                        Vessel type
                      </legend>
                      <Chips options={VESSEL_TYPES} value={vessel} onChange={setVessel} disabled={isSubmitting} />
                    </fieldset>

                    <fieldset className="border-0 p-0">
                      <legend className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-navy/50">
                        Retrofit or new build
                      </legend>
                      <Chips options={BUILD_MODES} value={mode} onChange={setMode} disabled={isSubmitting} />
                    </fieldset>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Vessel length / capacity">
                        <input
                          className={inputCls}
                          name="vesselSize"
                          maxLength={80}
                          disabled={isSubmitting}
                          placeholder="e.g. 18 m · 100 pax"
                        />
                      </Field>
                      <Field label="Route or operating area">
                        <input
                          className={inputCls}
                          name="route"
                          maxLength={120}
                          disabled={isSubmitting}
                          placeholder="e.g. Kochi backwaters"
                        />
                      </Field>
                      <Field label="Daily operating hours">
                        <input
                          className={inputCls}
                          name="hours"
                          maxLength={40}
                          disabled={isSubmitting}
                          placeholder="e.g. 8 hrs / day"
                        />
                      </Field>
                      <Field label="Indicative budget">
                        <select className={inputCls} name="budget" defaultValue="" disabled={isSubmitting}>
                          <option value="">Select…</option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <fieldset className="border-0 p-0">
                      <legend className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-navy/50">
                        Timeline
                      </legend>
                      <Chips options={TIMELINES} value={timeline} onChange={setTimeline} disabled={isSubmitting} />
                    </fieldset>


                    {spec && (
                      <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 rounded-[1.1rem] border border-brand-sky/25 bg-[color-mix(in_oklab,var(--brand-sky)_7%,white)] p-6 duration-500 sm:p-7">
                        <div className="flex items-center gap-3">
                          <span className="h-px flex-1 bg-brand-navy/10" />
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-navy/55">
                            {spec.title}
                          </span>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {spec.fields.map((f) =>
                            f.kind === "chips" ? (
                              <fieldset
                                key={f.name}
                                className="border-0 p-0 sm:col-span-2"
                              >
                                <legend className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-navy/50">
                                  {f.label}
                                </legend>
                                <Chips
                                  options={f.options}
                                  value={specValues[f.name] ?? null}
                                  disabled={isSubmitting}
                                  onChange={(v) =>
                                    setSpecValues((s) => ({ ...s, [f.name]: v }))
                                  }
                                />
                              </fieldset>
                            ) : f.kind === "select" ? (
                              <Field key={f.name} label={f.label}>
                                <select
                                  className={inputCls}
                                  name={f.name}
                                  disabled={isSubmitting}
                                  value={specValues[f.name] ?? ""}
                                  onChange={(e) =>
                                    setSpecValues((s) => ({ ...s, [f.name]: e.target.value }))
                                  }
                                >
                                  <option value="">Select…</option>
                                  {f.options.map((o) => (
                                    <option key={o} value={o}>
                                      {o}
                                    </option>
                                  ))}
                                </select>
                              </Field>
                            ) : (
                              <Field key={f.name} label={f.label}>
                                <input
                                  className={inputCls}
                                  name={f.name}
                                  maxLength={120}
                                  disabled={isSubmitting}
                                  placeholder={f.placeholder}
                                  value={specValues[f.name] ?? ""}
                                  onChange={(e) =>
                                    setSpecValues((s) => ({ ...s, [f.name]: e.target.value }))
                                  }
                                />
                              </Field>
                            ),
                          )}

                        </div>
                      </div>
                    )}
                  </div>
                )}


                <div className="mt-6">
                  <Field label={interest === "general" ? "How can we help?" : "Anything else?"}>
                    <textarea
                      className={`${inputCls} min-h-[5.5rem] resize-y`}
                      name="message"
                      disabled={isSubmitting}
                      required={interest === "general"}
                      maxLength={1000}
                      placeholder={
                        interest === "general"
                          ? "Tell us a little about your enquiry."
                          : "Duty cycle, charging access, certification needs…"
                      }
                    />

                  </Field>
                </div>

                {/* step 4 — contact */}
                <div className="mt-8">
                  <StepLabel title="Your contact details" />
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Full name">
                      <input
                        className={inputCls}
                        name="name"
                        required
                        disabled={isSubmitting}
                        maxLength={100}
                        placeholder="Your name"
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        className={inputCls}
                        type="email"
                        name="email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        required={!phoneValue} // at least one of email or phone is required by validator
                        disabled={isSubmitting}
                        maxLength={255}
                        placeholder="you@company.com"
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        className={inputCls}
                        type="tel"
                        name="phone"
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        required={!emailValue} // at least one of email or phone is required by validator
                        disabled={isSubmitting}
                        maxLength={30}
                        placeholder="+91 …"
                      />
                    </Field>
                    <Field label="Company / organisation">
                      <input
                        className={inputCls}
                        name="company"
                        disabled={isSubmitting}
                        maxLength={120}
                        placeholder="Optional"
                      />
                    </Field>
                    <Field label="Country / location">
                      <input
                        className={inputCls}
                        name="location"
                        disabled={isSubmitting}
                        maxLength={120}
                        placeholder="e.g. Kerala, India"
                      />
                    </Field>
                  </div>

                  {submitError && (
                    <div className="mt-6 rounded-[0.7rem] border border-red-500/20 bg-red-50 p-4 text-sm text-red-600">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-8 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-brand-ivory transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        Submitting... <Loader2 className="animate-spin" size={15} />
                      </>
                    ) : (
                      <>
                        Request quote <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                </div>
              </div>
            </form>


            {/* aside */}
            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[1.4rem] border border-brand-navy/10 bg-white/60 p-7 backdrop-blur-xl">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-leaf">
                  Your selection
                </p>
                <p className="mt-4 font-display text-[1.35rem] leading-snug text-brand-navy">
                  {interest === "general"
                    ? "General enquiry"
                    : choice
                      ? choice.split(" — ")[0]
                      : interest
                        ? interest === "product"
                          ? "Choose a product"
                          : "Choose a solution"
                        : "Nothing selected yet"}
                </p>
                <ul className="mt-5 space-y-2.5 text-[0.84rem] text-brand-navy/60">
                  {[
                    vessel && `Vessel: ${vessel}`,
                    mode && `Scope: ${mode}`,
                    timeline && `Timeline: ${timeline}`,
                  ]
                    .filter(Boolean)
                    .map((line) => (
                      <li key={line as string} className="flex items-start gap-2.5">
                        <Check size={14} className="mt-0.5 shrink-0 text-brand-leaf" />
                        {line}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="rounded-[1.4rem] border border-brand-navy/10 bg-brand-navy p-7 text-brand-ivory">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-ivory/60">
                  Talk to us directly
                </p>
                <div className="mt-5 space-y-3 text-[0.86rem] text-brand-ivory/85">
                  <p className="flex items-center gap-2.5">
                    <Mail size={15} className="text-brand-sky" /> info@yesentechnologies.com
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone size={15} className="text-brand-sky" /> +91 00000 00000
                  </p>
                  <p className="flex items-center gap-2.5">
                    <MapPin size={15} className="text-brand-sky" /> Kochi, Kerala, India
                  </p>
                </div>
                <p className="mt-6 text-[0.8rem] leading-relaxed text-brand-ivory/55">
                  Every enquiry is reviewed by our marine engineering team — typical response within
                  1–2 working days.
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-brand-navy/10 bg-white/60 p-7 backdrop-blur-xl">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-leaf">
                  What happens next
                </p>
                <ol className="mt-5 space-y-4">
                  {[
                    ["01", "We review", "An engineer reads your brief and checks feasibility for your route and duty cycle."],
                    ["02", "We reply", "You get a written response with indicative scope, options and next steps."],
                    ["03", "We scope", "A short call or site visit turns the brief into a costed proposal."],
                  ].map(([n, t, b]) => (
                    <li key={n} className="flex gap-3.5">
                      <span className="font-mono text-[0.66rem] leading-5 text-brand-sky">{n}</span>
                      <span>
                        <span className="block text-[0.9rem] text-brand-navy">{t}</span>
                        <span className="mt-1 block text-[0.8rem] leading-relaxed text-brand-navy/55">
                          {b}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

          </div>
        )}
      </div>
    </main>
  );
}
