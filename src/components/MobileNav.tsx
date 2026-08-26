import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


import { Logo } from "@/components/Logo";

// FAQ intentionally lives in the footer quick links on phones, not here.
const ITEMS: { label: string; to: string }[] = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Solutions", to: "/solutions" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];


/**
 * Hamburger + full-screen sheet navigation for phones and small tablets.
 * Hidden from `md` up, where the inline header nav takes over.
 */
export function MobileNav({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  // The header uses backdrop-filter, which would trap a `fixed` overlay inside
  // it — so the sheet is portalled to <body> once we're on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border backdrop-blur-md transition-colors ${
          tone === "light"
            ? "border-brand-ivory/40 bg-white/10 text-brand-ivory"
            : "border-brand-navy/15 bg-white/70 text-brand-navy"
        }`}
      >
        <Menu size={19} strokeWidth={1.6} />
      </button>

      {mounted
        ? createPortal(
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-shell shadow-[0_0_80px_-20px_rgb(1_33_84/0.6)] transition-transform duration-400 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Link to="/" onClick={() => setOpen(false)} aria-label="YESEN Technologies Pvt Ltd home">
              <Logo className="h-9 w-auto" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-brand-navy"
            >
              <X size={18} strokeWidth={1.6} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile">
            <ul className="divide-y divide-border">
              {ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[3.25rem] items-center font-mono text-[0.78rem] uppercase tracking-[0.22em] text-brand-navy"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/enquire"
              onClick={() => setOpen(false)}
              className="mt-6 flex min-h-[3rem] items-center justify-center rounded-full bg-brand-navy px-6 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-brand-ivory"
            >
              Get a quote
            </Link>

            <a
              href="mailto:info@yesentechnologies.com"
              className="mt-5 block text-center text-sm text-muted-foreground"
            >
              info@yesentechnologies.com
            </a>
          </nav>
        </div>
      </div>,
            document.body,
          )
        : null}
    </div>
  );
}
