import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Testimonial Review | YESEN Technologies Pvt Ltd" },
      {
        name: "description",
        content: "Internal review console for approving client testimonials.",
      },
      { property: "og:title", content: "Testimonial Review | YESEN Technologies Pvt Ltd" },
      { property: "og:description", content: "Internal review console for client testimonials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Row = {
  id: string;
  name: string;
  designation: string | null;
  company: string | null;
  quote: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

const inputCls =
  "w-full rounded-[0.65rem] border-[1.5px] border-brand-navy/12 bg-white px-3.5 py-2.5 text-sm text-brand-navy outline-none focus:border-brand-sky";

function AdminPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setEmail(null);
      setIsAdmin(null);
      return;
    }
    setEmail(user.email ?? "");
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);
    const admin = (roles ?? []).some((r) => r.role === "admin");
    setIsAdmin(admin);
    if (!admin) return;
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data ?? []) as Row[]);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
    });
    if (error) {
      setMsg(error.message);
      return;
    }
    await load();
  }

  async function setStatus(id: string, status: "approved" | "rejected") {
    const { error } = await supabase.from("testimonials").update({ status }).eq("id", id);
    if (error) {
      setMsg(error.message);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  const pending = rows.filter((r) => r.status === "pending");
  const reviewed = rows.filter((r) => r.status !== "pending");

  return (
    <main className="min-h-screen bg-[color-mix(in_oklab,var(--brand-ivory,#eef3f0)_94%,white)] px-5 py-16 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-leaf">
          Admin console
        </p>
        <h1 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-tight text-brand-navy">
          Testimonial review
        </h1>

        {msg && <p className="mt-4 text-sm text-red-600">{msg}</p>}

        {!email && (
          <form onSubmit={signIn} className="mt-8 max-w-sm space-y-3">
            <input className={inputCls} name="email" type="email" placeholder="Admin email" required />
            <input
              className={inputCls}
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit" className="tw-submit-btn">
              Sign in
            </button>
          </form>
        )}

        {email && isAdmin === false && (
          <p className="mt-8 text-sm text-brand-navy/70">
            Signed in as {email}, but this account is not an admin.{" "}
            <button
              className="underline"
              onClick={async () => {
                await supabase.auth.signOut();
                setEmail(null);
                setIsAdmin(null);
              }}
            >
              Sign out
            </button>
          </p>
        )}

        {email && isAdmin && (
          <div className="mt-8 space-y-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-brand-navy/60">Signed in as {email}</p>
              <button
                className="text-sm underline text-brand-navy/60"
                onClick={async () => {
                  await supabase.auth.signOut();
                  setEmail(null);
                  setIsAdmin(null);
                  setRows([]);
                }}
              >
                Sign out
              </button>
            </div>

            <section>
              <h2 className="font-display text-xl text-brand-navy">
                Pending ({pending.length})
              </h2>
              <div className="mt-4 space-y-4">
                {pending.length === 0 && (
                  <p className="text-sm text-brand-navy/55">Nothing waiting for review.</p>
                )}
                {pending.map((r) => (
                  <article
                    key={r.id}
                    className="rounded-[1rem] border border-brand-navy/10 bg-white p-5"
                  >
                    <p className="text-[0.9rem] leading-relaxed text-brand-navy/80">{r.quote}</p>
                    <p className="mt-3 text-[0.8rem] text-brand-navy/60">
                      {r.name}
                      {[r.designation, r.company].filter(Boolean).length > 0 &&
                        ` — ${[r.designation, r.company].filter(Boolean).join(", ")}`}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button className="tw-submit-btn !w-auto" onClick={() => setStatus(r.id, "approved")}>
                        Approve
                      </button>
                      <button
                        className="rounded-full border border-brand-navy/15 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brand-navy/60"
                        onClick={() => setStatus(r.id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-brand-navy">Reviewed</h2>
              <div className="mt-4 space-y-3">
                {reviewed.length === 0 && (
                  <p className="text-sm text-brand-navy/55">No reviewed testimonials yet.</p>
                )}
                {reviewed.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-[0.8rem] border border-brand-navy/10 bg-white/70 px-4 py-3"
                  >
                    <span className="text-[0.85rem] text-brand-navy/75">
                      {r.name} · {r.status}
                    </span>
                    <button
                      className="text-[0.78rem] underline text-brand-navy/60"
                      onClick={() =>
                        setStatus(r.id, r.status === "approved" ? "rejected" : "approved")
                      }
                    >
                      {r.status === "approved" ? "Unpublish" : "Approve"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
