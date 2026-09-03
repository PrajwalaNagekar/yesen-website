import { useEffect, useRef, useState } from "react";

import { fetchTestimonials } from "@/api/testimonials";
import { AddTestimonialDialog } from "@/components/AddTestimonialDialog";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  designation: string | null;
  company: string | null;
};

const ACCENTS = ["#16A6C9", "#5EBF3E", "#D4B95E"];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function TestimonialWall() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let active = true;
    fetchTestimonials({ limit: 50 })
      .then(({ testimonials }) => {
        if (!active) return;
        if (testimonials && testimonials.length > 0) {
          const mapped: Testimonial[] = testimonials
            .filter((t) => t.showOnWebsite !== false)
            .map((t) => ({
              id: t._id || t.id || "",
              quote: t.quote || t.testimonial || "",
              name: t.name || "",
              designation: t.designation || null,
              company: t.company || t.location || null,
            }));
          setItems(mapped);
        }
      })
      .catch(() => {
        // Fallback or empty
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (paused || items.length < 2) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, items.length]);

  useEffect(() => {
    if (index >= items.length) setIndex(0);
  }, [items.length, index]);

  return (
    <section className="tw-section">
      <div className="tw-glow-a" aria-hidden />
      <div className="tw-glow-b" aria-hidden />

      <div className="tw-head tw-head-row">
        <div className="tw-head-content">
          <div className="tw-eyebrow">CLIENT VOICES</div>

          <div className="tw-title">
            Trusted by teams building <span>by nature</span>
          </div>

          <div className="tw-sub">
            What our partners say after working with YESEN Technologies Pvt Ltd
          </div>
        </div>

        <div className="tw-add-slot">
          <AddTestimonialDialog />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="tw-empty">
          <p>No testimonials published yet.</p>
          <p>Share your experience — approved stories appear here.</p>
        </div>
      ) : (
        <>
          <div
            className="tw-wall tw-wall-single"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="tw-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {items.map((t, i) => (
                <div className="tw-slide" key={t.id}>
                  <div
                    className="tw-card"
                    style={{ ["--accent" as string]: ACCENTS[i % ACCENTS.length] }}
                  >
                    <div className="tw-quote-mark">&ldquo;</div>
                    <div className="tw-quote">{t.quote}</div>
                    <div className="tw-person">
                      <div className="tw-avatar">{initialsOf(t.name)}</div>
                      <div>
                        <div className="tw-name">{t.name}</div>
                        <div className="tw-role">
                          {[t.designation, t.company].filter(Boolean).join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {items.length > 1 && (
            <div className="tw-dots">
              {items.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Show testimonial from ${t.name}`}
                  className={`tw-dot${i === index ? " is-active" : ""}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
