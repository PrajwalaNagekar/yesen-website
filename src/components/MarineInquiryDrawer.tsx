import { useState } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const inputCls =
  "w-full rounded-[0.7rem] border border-white/15 bg-white/[0.05] px-3.5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-brand-sky focus:bg-white/[0.08]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

export function MarineInquiryDrawer({
  triggerClassName = "me-btn me-btn-primary",
  triggerLabel = "Open Enquiry Form",
  solution = "Marine Electrification",
}: {
  triggerClassName?: string;
  triggerLabel?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
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
        {triggerLabel} <ArrowRight size={15} />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-white/12 bg-[#081a2e] p-0 text-white sm:max-w-[34rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="px-7 pb-12 pt-14 sm:px-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-brand-sky">
            Get in touch
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.55rem,3.2vw,2rem)] leading-[1.15] text-white">
            Enquire about <span className="me-grad">{solution}</span>
          </h2>
          <p className="mt-3 max-w-[46ch] text-[0.86rem] leading-relaxed text-white/60">
            We typically respond within 1–2 business days.
          </p>

          {sent ? (
            <div className="mt-10 rounded-[1.1rem] border border-white/12 bg-white/[0.04] p-9 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(100deg,var(--brand-sky),var(--brand-leaf))] text-[#062038]">
                <Check size={24} strokeWidth={2.6} />
              </span>
              <p className="mt-5 font-display text-xl text-white">Enquiry sent</p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-white/60">
                Thanks — our team will be in touch about {solution} shortly.
              </p>
            </div>
          ) : (
            <form
              className="mt-9 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name">
                  <input className={inputCls} name="name" required maxLength={100} placeholder="Your name" />
                </Field>
                <Field label="Email">
                  <input
                    className={inputCls}
                    type="email"
                    name="email"
                    required
                    maxLength={255}
                    placeholder="you@company.com"
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone (optional)">
                  <input className={inputCls} type="tel" name="phone" maxLength={30} placeholder="+91 …" />
                </Field>
                <Field label="Vessel / project">
                  <input className={inputCls} name="vessel" maxLength={120} placeholder="Ferry, tug, yacht…" />
                </Field>
              </div>

              <Field label="Message">
                <textarea
                  className={`${inputCls} min-h-[7rem] resize-y`}
                  name="message"
                  required
                  maxLength={1000}
                  placeholder="Tell us about your vessel, route or project."
                />
              </Field>

              <button type="submit" className="me-btn me-btn-primary w-full justify-center">
                Send Enquiry <ArrowRight size={15} />
              </button>

              <div className="space-y-2.5 border-t border-white/10 pt-6 text-[0.82rem] text-white/70">
                <p className="flex items-center gap-2.5">
                  <Mail size={15} className="text-brand-sky" /> info@yesentechnologies.com
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone size={15} className="text-brand-sky" /> +91 77080 07554
                </p>
                <p className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-brand-sky" /> Kochi, Kerala, India
                </p>
              </div>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
