import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const VESSEL_TYPES = [
  "Ferry",
  "Tour boat",
  "Trawler",
  "Houseboat",
  "Yacht",
  "Workboat",
  "Other",
];

const BUILD_MODES = ["Retrofit existing vessel", "New build"];

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

export function EMarineInquiryDrawer({
  triggerClassName = "about-btn about-btn-primary",
  triggerLabel = "Get in Touch",
}: {
  triggerClassName?: string;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [vessel, setVessel] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
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
        className="w-full overflow-y-auto border-l border-brand-navy/10 bg-[color-mix(in_oklab,var(--brand-ivory,#eef3f0)_92%,white)] p-0 sm:max-w-[34rem]"
      >
        <div className="px-7 pb-12 pt-14 sm:px-10">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-leaf">
            E-Marine · Get in touch
          </p>
          <h2 className="display-xl mt-3 text-[clamp(1.6rem,3.4vw,2.1rem)] leading-[1.2]">
            Tell us about your <span className="about-highlight">vessel</span>
          </h2>
          <p className="mt-3 max-w-[46ch] text-[0.86rem] leading-relaxed text-brand-navy/60">
            Ferries, tour boats, trawlers, houseboats, yachts or workboats — share your route and
            duty cycle and we&apos;ll size an E-MARINE configuration around them.
          </p>

          {sent ? (
            <div className="mt-10 rounded-[1.1rem] border border-brand-leaf/25 bg-white/80 p-8 text-center">
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-brand-leaf/12 text-brand-leaf">
                <Check size={20} strokeWidth={2} />
              </span>
              <p className="mt-4 font-display text-lg text-brand-navy">Request received</p>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-brand-navy/60">
                Thank you — our marine engineering team will reply within 1–2 working days.
              </p>
            </div>
          ) : (
            <form
              className="mt-9 space-y-7"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <fieldset className="border-0 p-0">
                <legend className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-brand-leaf">
                  Vessel type
                </legend>
                <div className="flex flex-wrap gap-2">
                  {VESSEL_TYPES.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVessel(v)}
                      className={`rounded-full border-[1.5px] px-3.5 py-2 text-[0.82rem] transition-colors ${
                        vessel === v
                          ? "border-brand-navy bg-brand-navy text-brand-ivory"
                          : "border-brand-navy/12 bg-white/70 text-brand-navy hover:border-brand-sky"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="border-0 p-0">
                <legend className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-brand-leaf">
                  Retrofit or new build
                </legend>
                <div className="flex gap-2">
                  {BUILD_MODES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`flex-1 rounded-[0.65rem] border-[1.5px] px-3 py-2.5 text-[0.82rem] transition-colors ${
                        mode === m
                          ? "border-brand-leaf bg-brand-leaf/10 font-semibold text-brand-leaf"
                          : "border-brand-navy/12 text-brand-navy/60 hover:border-brand-sky"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3.5 border-0 p-0">
                <legend className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-brand-leaf">
                  Route &amp; duty cycle
                </legend>
                <Field label="Operating route or area">
                  <input
                    className={inputCls}
                    name="route"
                    maxLength={200}
                    placeholder="e.g. Kochi backwaters"
                  />
                </Field>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <Field label="Hours on water / day">
                    <input className={inputCls} name="hours" maxLength={40} placeholder="8" />
                  </Field>
                  <Field label="Distance / trip">
                    <input className={inputCls} name="distance" maxLength={40} placeholder="12 km" />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-3.5 border-0 p-0">
                <legend className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-brand-leaf">
                  Contact details
                </legend>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <Field label="Full name">
                    <input className={inputCls} name="name" required maxLength={100} />
                  </Field>
                  <Field label="Company / organisation">
                    <input className={inputCls} name="company" maxLength={120} />
                  </Field>
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <Field label="Email">
                    <input className={inputCls} type="email" name="email" required maxLength={255} />
                  </Field>
                  <Field label="Phone">
                    <input className={inputCls} type="tel" name="phone" maxLength={30} />
                  </Field>
                </div>
                <Field label="Anything else we should know?">
                  <textarea className={`${inputCls} min-h-[5rem] resize-y`} name="notes" maxLength={1000} />
                </Field>
              </fieldset>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,var(--brand-navy),color-mix(in_oklab,var(--brand-navy)_75%,var(--brand-sky)))] px-5 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-brand-ivory transition-transform hover:-translate-y-px"
              >
                Get my E-Marine configuration <ArrowRight size={14} />
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
