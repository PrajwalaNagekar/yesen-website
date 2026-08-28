import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitProductEnquiry, submitServiceEnquiry, submitContactEnquiry } from "../api";
import { fetchProducts, type Product } from "../api/products";
import { fetchSolutions, type Solution } from "../api/solutions";


export interface EnquireSearchParams {
  type?: string;
  interest?: string;
  product?: string;
  productId?: string;
  solution?: string;
  solutionId?: string;
  choice?: string;
}

export const Route = createFileRoute("/enquire")({
  validateSearch: (search: Record<string, unknown>): EnquireSearchParams => ({
    type: typeof search.type === "string" ? search.type : undefined,
    interest: typeof search.interest === "string" ? search.interest : undefined,
    product: typeof search.product === "string" ? search.product : undefined,
    productId: typeof search.productId === "string" ? search.productId : undefined,
    solution: typeof search.solution === "string" ? search.solution : undefined,
    solutionId: typeof search.solutionId === "string" ? search.solutionId : undefined,
    choice: typeof search.choice === "string" ? search.choice : undefined,
  }),
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
  const search = Route.useSearch();

  const [interest, setInterest] = useState<InterestKey>(() => {
    const rawInterest = (search.interest || search.type)?.toLowerCase();
    if (search.product || search.productId || rawInterest === "product") return "product";
    if (search.solution || search.solutionId || rawInterest === "solution" || rawInterest === "service") return "solution";
    if (rawInterest === "general" || rawInterest === "contact") return "general";
    return "product";
  });

  const [choice, setChoice] = useState(() => {
    return (
      search.product ||
      search.productId ||
      search.solution ||
      search.solutionId ||
      search.choice ||
      ""
    );
  });

  const [vessel, setVessel] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [solutionsList, setSolutionsList] = useState<Solution[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setProductsList(res);
        }
      })
      .catch(() => {});

    fetchSolutions()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setSolutionsList(res);
        }
      })
      .catch(() => {});
  }, []);

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

  const productOptions = useMemo(() => {
    if (productsList.length > 0) {
      return productsList.map((p) => ({
        id: p._id,
        name: p.name,
        display: p.label ? `${p.name} — ${p.label}` : p.name,
      }));
    }
    return PRODUCTS.map((p) => ({
      id: p.split(" — ")[0],
      name: p.split(" — ")[0],
      display: p,
    }));
  }, [productsList]);

  const solutionOptions = useMemo(() => {
    if (solutionsList.length > 0) {
      return solutionsList.map((s) => ({
        id: s._id,
        name: s.name,
        display: s.name,
      }));
    }
    return SOLUTIONS.map((s) => ({
      id: s,
      name: s,
      display: s,
    }));
  }, [solutionsList]);

  useEffect(() => {
    let targetProduct = search.product || search.productId;
    let targetSolution = search.solution || search.solutionId;
    let targetInterest = search.interest || search.type;
    let targetChoice = search.choice;

    if (!targetProduct && !targetSolution && !targetInterest && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      targetProduct = urlParams.get("product") || urlParams.get("productId") || undefined;
      targetSolution = urlParams.get("solution") || urlParams.get("solutionId") || undefined;
      targetInterest = urlParams.get("interest") || urlParams.get("type") || undefined;
      targetChoice = urlParams.get("choice") || undefined;
    }

    if (targetProduct) {
      setInterest("product");
      const matched = productOptions.find(
        (p) =>
          p.id.toLowerCase() === targetProduct.toLowerCase() ||
          p.name.toLowerCase() === targetProduct.toLowerCase() ||
          p.display.toLowerCase().includes(targetProduct.toLowerCase()) ||
          targetProduct.toLowerCase().includes(p.name.toLowerCase())
      );
      if (matched) {
        setChoice(matched.id);
      } else {
        setChoice(targetProduct);
      }
    } else if (targetSolution) {
      setInterest("solution");
      const matched = solutionOptions.find(
        (s) =>
          s.id.toLowerCase() === targetSolution.toLowerCase() ||
          s.name.toLowerCase() === targetSolution.toLowerCase() ||
          s.display.toLowerCase().includes(targetSolution.toLowerCase()) ||
          targetSolution.toLowerCase().includes(s.name.toLowerCase())
      );
      if (matched) {
        setChoice(matched.id);
      } else {
        setChoice(targetSolution);
      }
    } else if (targetInterest === "product") {
      setInterest("product");
      if (targetChoice) {
        const matched = productOptions.find(
          (p) =>
            p.id.toLowerCase() === targetChoice.toLowerCase() ||
            p.name.toLowerCase() === targetChoice.toLowerCase() ||
            p.display.toLowerCase().includes(targetChoice.toLowerCase())
        );
        setChoice(matched ? matched.id : targetChoice);
      }
    } else if (targetInterest === "solution" || targetInterest === "service") {
      setInterest("solution");
      if (targetChoice) {
        const matched = solutionOptions.find(
          (s) =>
            s.id.toLowerCase() === targetChoice.toLowerCase() ||
            s.name.toLowerCase() === targetChoice.toLowerCase() ||
            s.display.toLowerCase().includes(targetChoice.toLowerCase())
        );
        setChoice(matched ? matched.id : targetChoice);
      }
    } else if (targetInterest === "general" || targetInterest === "contact") {
      setInterest("general");
    }
  }, [
    search.product,
    search.productId,
    search.solution,
    search.solutionId,
    search.interest,
    search.type,
    search.choice,
    productOptions,
    solutionOptions,
  ]);

  const selectedOptionValue = useMemo(() => {
    const list = interest === "product" ? productOptions : solutionOptions;
    if (!choice) return "";
    const matched = list.find(
      (o) =>
        o.id === choice ||
        o.name.toLowerCase() === choice.toLowerCase() ||
        o.display.toLowerCase() === choice.toLowerCase() ||
        o.display.toLowerCase().includes(choice.toLowerCase())
    );
    return matched ? matched.id : choice;
  }, [interest, choice, productOptions, solutionOptions]);

  const selectedDisplay = useMemo(() => {
    if (interest === "product") {
      const found = productOptions.find(
        (p) => p.id === choice || p.name === choice || p.display === choice
      );
      return found ? found.name : choice;
    }
    if (interest === "solution") {
      const found = solutionOptions.find(
        (s) => s.id === choice || s.name === choice || s.display === choice
      );
      return found ? found.name : choice;
    }
    return "";
  }, [interest, choice, productOptions, solutionOptions]);


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
              {selectedDisplay ? ` about ${selectedDisplay}` : ""}.
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

                // Build message field with budget embedded
                let rawMessage = formData.get("message") as string || "";
                let finalMessage = rawMessage.trim();

                const budget = formData.get("budget");
                if (budget) {
                  finalMessage += `\n\n[Budget]\n${budget}`;
                }

                try {
                  if (interest === "general") {
                    // General contact enquiry
                    await submitContactEnquiry({
                      clientName,
                      name: clientName,
                      email: email || undefined,
                      phone: phone || undefined,
                      company: company || undefined,
                      location: countryLocation || undefined,
                      subject: "General enquiry",
                      message: finalMessage,
                      sourcePage: "/enquire",
                    });
                  } else {
                    // Normalize validated enums
                    const normalizedVesselType = mapVesselType(vessel);
                    const normalizedRetrofitStatus = mapRetrofitStatus(mode);

                    const basePayload = {
                      clientName,
                      name: clientName,
                      email: email || undefined,
                      phone: phone || undefined,
                      company: company || undefined,
                      location: countryLocation || undefined,
                      message: finalMessage,
                      sourcePage: "/enquire",
                      vesselType: normalizedVesselType,
                      retrofitStatus: normalizedRetrofitStatus,
                      vesselLength: (formData.get("vesselSize") as string) || undefined,
                      operatingArea: (formData.get("route") as string) || undefined,
                      dailyOperatingHours: (formData.get("hours") as string) || undefined,
                      timeLine: timeline || undefined,
                    };

                    if (interest === "product") {
                      const matched = productOptions.find(
                        (p) => p.id === choice || p.name === choice || p.display === choice
                      );
                      const productRef = matched?.id || (choice.includes(" — ") ? choice.split(" — ")[0] : choice);

                      await submitProductEnquiry({
                        ...basePayload,
                        product: productRef,
                        productName: matched?.name,
                        productOrServiceName: matched?.name || productRef,
                      });
                    } else {
                      const matched = solutionOptions.find(
                        (s) => s.id === choice || s.name === choice || s.display === choice
                      );
                      const solutionRef = matched?.id || choice;

                      await submitServiceEnquiry({
                        ...basePayload,
                        solution: solutionRef,
                        solutionName: matched?.name,
                        productOrServiceName: matched?.name || solutionRef,
                      });
                    }
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
                    value={selectedOptionValue}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setChoice(e.target.value);
                    }}
                    required
                  >
                    <option value="">
                      {interest === "product" ? "Choose a product…" : "Choose a solution…"}
                    </option>
                    {(interest === "product" ? productOptions : solutionOptions).map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.display}
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
