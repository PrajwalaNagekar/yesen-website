import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const PROJECT_TYPES = [
  "Vessel electrification",
  "Solar integration",
  "Shore infrastructure",
  "Smart connected marine systems",
  "Vessel engineering & construction",
  "Tourism & hospitality",
  "Other",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.78rem] text-brand-navy/55">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-[0.65rem] border-[1.5px] border-brand-navy/12 bg-white/70 px-3.5 py-2.5 text-sm text-brand-navy outline-none transition-colors placeholder:text-brand-navy/35 focus:border-brand-sky focus:bg-white";

const selectCls =
  `${inputCls} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230c2e5c%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat pr-10`;

export function ProjectInquiryDrawer({
  triggerClassName = "about-btn about-btn-primary",
  triggerLabel = "Get in Touch",
}: {
  triggerClassName?: string;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setSent(false);
      }}
    >
      <SheetTrigger className={triggerClassName}>
        {triggerLabel} <ArrowRight size={16} />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-brand-navy/10 bg-[color-mix(in_oklab,var(--brand-ivory,#eef3f0)_92%,white)] p-0 [scrollbar-width:none] sm:max-w-[34rem] [&::-webkit-scrollbar]:hidden"
      >
        <div className="px-7 pb-12 pt-14 sm:px-10">
          <SheetTitle className="sr-only">Project enquiry</SheetTitle>
          <SheetDescription className="sr-only">
            Tell us about your project and we will reply within 1–2 working days.
          </SheetDescription>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-forest">
            Projects · Enquiry
          </p>
          <h2 className="display-xl mt-3 text-[clamp(1.6rem,3.4vw,2.1rem)] leading-[1.2]">
            Tell us about your <span className="about-highlight">project</span>
          </h2>
          <p className="mt-3 max-w-[46ch] text-[0.86rem] leading-relaxed text-brand-navy/60">
            Share a few details about your site, fleet or city and our team will reply within 1–2
            working days.
          </p>

          {sent ? (
            <div className="mt-10 rounded-[1.1rem] border border-brand-leaf/25 bg-white/80 p-8 text-center">
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-brand-leaf/12 text-brand-leaf">
                <Check size={20} strokeWidth={2} />
              </span>
              <p className="mt-4 font-display text-lg text-brand-navy">Enquiry received</p>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-brand-navy/60">
                Thank you — our team will review your project and be in touch shortly.
              </p>
            </div>
          ) : (
            <form
              className="mt-9 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Full name">
                  <input className={inputCls} name="name" required maxLength={100} />
                </Field>
                <Field label="Email">
                  <input
                    className={inputCls}
                    type="email"
                    name="email"
                    required
                    maxLength={255}
                  />
                </Field>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Phone (optional)">
                  <input className={inputCls} type="tel" name="phone" maxLength={30} />
                </Field>
                <Field label="Company / organisation">
                  <input className={inputCls} name="company" maxLength={120} />
                </Field>
              </div>

              <Field label="Project type">
                <select
                  className={selectCls}
                  name="projectType"
                  value={type ?? ""}
                  onChange={(e) => setType(e.target.value || null)}
                >
                  <option value="">Select a project type</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Project location">
                <input
                  className={inputCls}
                  name="location"
                  maxLength={120}
                  placeholder="e.g. Kochi, Kerala"
                />
              </Field>

              <Field label="Project overview">
                <textarea
                  className={`${inputCls} min-h-[6rem] resize-y`}
                  name="overview"
                  required
                  maxLength={1000}
                  placeholder="Scope, scale, timeline — anything we should know."
                />
              </Field>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,var(--brand-navy),color-mix(in_oklab,var(--brand-navy)_75%,var(--brand-sky)))] px-5 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-brand-ivory transition-transform hover:-translate-y-px"
              >
                Submit project enquiry <ArrowRight size={14} />
              </button>
              <p className="text-center text-[0.72rem] text-brand-navy/50">
                We usually reply within 1–2 working days.
              </p>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
