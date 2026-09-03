import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { z } from "zod";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createTestimonial } from "@/api/testimonials";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  designation: z.string().trim().max(120).optional(),
  company: z.string().trim().max(160).optional(),
  quote: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters")
    .max(1000, "Please keep it under 1000 characters"),
});

const inputCls =
  "w-full rounded-[0.65rem] border-[1.5px] border-brand-navy/12 bg-white/80 px-3.5 py-2.5 text-sm text-brand-navy outline-none transition-colors placeholder:text-brand-navy/35 focus:border-brand-sky focus:bg-white";

export function AddTestimonialDialog() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: String(fd.get("name") ?? ""),
      designation: String(fd.get("designation") ?? ""),
      company: String(fd.get("company") ?? ""),
      quote: String(fd.get("quote") ?? ""),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setBusy(true);
    try {
      await createTestimonial({
        name: parsed.data.name,
        designation: parsed.data.designation || undefined,
        company: parsed.data.company || undefined,
        quote: parsed.data.quote,
        testimonial: parsed.data.quote,
      });
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Could not submit right now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setSent(false);
          setError(null);
        }
      }}
    >
      <DialogTrigger className="tw-add-btn">
        <Plus size={15} /> Add testimonial
      </DialogTrigger>

      <DialogContent className="max-h-[88vh] overflow-y-auto border-brand-navy/10 bg-[color-mix(in_oklab,var(--brand-ivory,#eef3f0)_92%,white)] sm:max-w-[32rem]">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-leaf">
          Client voices
        </p>
        <DialogTitle className="mt-1 font-display text-[1.5rem] leading-tight text-brand-navy">
          Share your testimonial
        </DialogTitle>

        {sent ? (
          <div className="mt-6 rounded-[1rem] border border-brand-leaf/25 bg-white/80 p-7 text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-brand-leaf/12 text-brand-leaf">
              <Check size={20} strokeWidth={2} />
            </span>
            <p className="mt-4 font-display text-lg text-brand-navy">Submitted for review</p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-brand-navy/60">
              Thank you — your testimonial has been sent to our team. It will appear on the website
              once our team approves it and enables it for publication.
            </p>
          </div>
        ) : (
          <form className="mt-5 space-y-3.5" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-[0.78rem] text-brand-navy/55">Full name</span>
              <input className={inputCls} name="name" required maxLength={100} />
            </label>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[0.78rem] text-brand-navy/55">Designation</span>
                <input className={inputCls} name="designation" maxLength={120} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.78rem] text-brand-navy/55">Company name</span>
                <input className={inputCls} name="company" maxLength={160} />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-[0.78rem] text-brand-navy/55">
                Your testimonial
              </span>
              <textarea
                className={`${inputCls} min-h-[7rem] resize-y`}
                name="quote"
                required
                maxLength={1000}
                placeholder="Tell us about working with YESEN Technologies Pvt Ltd."
              />
            </label>

            {error && <p className="text-[0.78rem] text-red-600">{error}</p>}

            <button type="submit" disabled={busy} className="tw-submit-btn">
              {busy ? "Submitting…" : "Submit for approval"}
            </button>
            <p className="text-center text-[0.72rem] text-brand-navy/50">
              Submissions are reviewed by our team before they are published on the website.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
