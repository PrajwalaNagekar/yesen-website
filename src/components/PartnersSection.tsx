import { useEffect, useRef } from "react";

import { onScrollFrame, quantize } from "@/lib/scroll-scrub";
import { attachMeshParallax, attachTilt } from "@/lib/pointer-tilt";


const OEMS = [
  { name: "Hypercraft" },
  { name: "EnArka", note: "by Ohmium" },
  { name: "Elco", note: "since 1893" },
  { name: "ECETL" },
  { name: "Polarium" },
  { name: "Marine & EV Technology Partners" },
];

const TITLE_WORDS = [
  "Backed",
  "by",
  "shipyards,",
  "researchers,",
  "and",
  "OEMs",
  "—",
  "not",
  "built",
  "alone",
];

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const meshRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cleanups: Array<() => void> = [];

    /* title blur-to-focus reveal */
    const title = titleRef.current;
    if (title) {
      const words = Array.from(
        title.querySelectorAll<HTMLElement>(".pt-word")
      );

      let delayTimeout: number | undefined;
      let animTimeout: number | undefined;
      let oemTimeout: number | undefined;

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            /*
             * STEP 1
             * Show everything normally.
             * OEMs is also completely normal here.
             */
            words.forEach((w) => {
              w.style.transition = "none";
              w.style.opacity = "1";
              w.style.transform = "translateY(0)";
              w.style.filter = "blur(0px)";
            });

            /*
             * STEP 2
             * After 3 seconds start the normal word animation.
             * BUT OEMs is excluded.
             */
            delayTimeout = window.setTimeout(() => {
              words.forEach((w, i) => {
                const isOEM = w.textContent?.trim() === "OEMs";

                if (isOEM) {
                  // Keep OEMs NORMAL
                  w.style.transition = "none";
                  w.style.opacity = "1";
                  w.style.transform = "translateY(0)";
                  w.style.filter = "blur(0px)";

                  return;
                }

                // Animate every other word
                w.style.transition = `
              opacity .8s cubic-bezier(.16,1,.3,1) ${i * 0.045}s,
              transform .8s cubic-bezier(.16,1,.3,1) ${i * 0.045}s,
              filter .8s cubic-bezier(.16,1,.3,1) ${i * 0.045}s
            `;

                w.style.opacity = "0";
                w.style.transform = "translateY(18px)";
                w.style.filter = "blur(8px)";
              });

              /*
               * STEP 3
               * Reveal the other words.
               */
              animTimeout = window.setTimeout(() => {
                words.forEach((w, i) => {
                  const isOEM = w.textContent?.trim() === "OEMs";

                  if (isOEM) return;

                  const delay = i * 0.045;

                  w.style.transition = `
                opacity .8s cubic-bezier(.16,1,.3,1) ${delay}s,
                transform .8s cubic-bezier(.16,1,.3,1) ${delay}s,
                filter .8s cubic-bezier(.16,1,.3,1) ${delay}s
              `;

                  w.style.opacity = "1";
                  w.style.transform = "translateY(0)";
                  w.style.filter = "blur(0px)";
                });

                /*
                 * STEP 4
                 * OEMs has remained completely normal.
                 *
                 * Wait another 3 seconds.
                 * THEN start the OEM animation.
                 */
                oemTimeout = window.setTimeout(() => {
                  const oem = words.find(
                    (w) => w.textContent?.trim() === "OEMs"
                  );

                  if (!oem) return;

                  // Start OEM animation
                  oem.style.transition = `
                opacity .8s cubic-bezier(.16,1,.3,1),
                transform .8s cubic-bezier(.16,1,.3,1),
                filter .8s cubic-bezier(.16,1,.3,1)
              `;

                  oem.style.opacity = "0";
                  oem.style.transform = "translateY(18px)";
                  oem.style.filter = "blur(8px)";

                  window.setTimeout(() => {
                    oem.style.opacity = "1";
                    oem.style.transform = "translateY(0)";
                    oem.style.filter = "blur(0px)";
                  }, 300);
                }, 3000);
              }, 300);
            }, 3000);

            io.disconnect();
          }
        },
        { threshold: 0.4 }
      );

      io.observe(title);

      cleanups.push(() => {
        io.disconnect();

        if (delayTimeout) {
          window.clearTimeout(delayTimeout);
        }

        if (animTimeout) {
          window.clearTimeout(animTimeout);
        }

        if (oemTimeout) {
          window.clearTimeout(oemTimeout);
        }
      });
    }

    /* scroll-scrubbed card reveal — batched reads, then writes */
    const cards = Array.from(section.querySelectorAll<HTMLElement>(".pt-reveal"));
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const update = () => {
      const vh = window.innerHeight;
      const measured = cards.map((card) => ({ card, top: card.getBoundingClientRect().top }));
      for (const { card, top } of measured) {
        if (top > vh + 120 || top < -vh) continue;
        const p = clamp((vh - top) / (vh * 0.65), 0, 1);
        const eased = quantize(1 - Math.pow(1 - p, 3));
        if (card.dataset.scrub === String(eased)) continue;
        card.dataset.scrub = String(eased);
        card.style.opacity = String(eased);
        card.style.transform = `translate3d(0, ${((1 - eased) * 36).toFixed(1)}px, 0)`;
        if (eased > 0.96 && !card.classList.contains("in-view")) {
          card.classList.add("in-view", "shine");
        }
      }
    };
    cleanups.push(onScrollFrame(update));


    /* mesh follows pointer */
    cleanups.push(attachMeshParallax(section, () => meshRef.current));

    /* spotlight + tilt on each glass card — rect cached, one write per frame */
    for (const card of Array.from(section.querySelectorAll<HTMLElement>(".pt-glass"))) {
      cleanups.push(attachTilt(card, { rx: 5, ry: 6 }));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const pills = [...OEMS, ...OEMS].map((o, i) => (
    <div key={`${o.name}-${i}`} className="pt-oem-pill">
      {o.name}
      {o.note ? <small>{o.note}</small> : null}
    </div>
  ));

  return (
    <section ref={sectionRef} id="partners" className="pt-section">
      <div ref={meshRef} className="pt-mesh" aria-hidden />
      <div className="pt-grain" aria-hidden />

      <div className="pt-head">
        <div className="pt-eyebrow">Who we build with</div>
        <h2 ref={titleRef} className="pt-title">
          {TITLE_WORDS.map((w, i) => (
            <span key={`${w}-${i}`} className="pt-word">
              {w === "OEMs" ? <em>OEMs</em> : w}{" "}
            </span>
          ))}
        </h2>
        <p ref={subRef} className="pt-sub">
          From fabrication to propulsion research, every claim we make is co-signed by a partner who specializes in it.
        </p>
      </div>

      <div className="pt-grid">
        <div className="pt-glass pt-reveal">
          <div className="pt-tag">
            <i />
            Shipyard Partners
          </div>
          <h3>Fabrication &amp; vessel construction</h3>
          <div className="pt-names">
            <span>Samudra</span>
            <span>Matha Marines</span>
          </div>
          <p>
            Providing fabrication, vessel construction, and retrofit expertise to deliver E-MARINE electrification
            solutions at scale.
          </p>
          <div className="pt-rule" />
        </div>

        <div className="pt-glass rd pt-reveal">
          <div className="pt-tag">
            <i />
            R&amp;D Partners
          </div>
          <h3>Research &amp; propulsion innovation</h3>
          <div className="pt-names">
            <span>CDAC</span>
            <span>CMLRE</span>
          </div>
          <p>
            Collaborating on advanced research, technology development, and innovation to accelerate marine
            decarbonization and sustainable propulsion systems.
          </p>
          <div className="pt-rule" />
        </div>

        <div className="pt-glass pt-oem-glass pt-reveal">
          <div className="pt-oem-head">
            <div className="pt-tag">
              <i />
              Leading OEM Partners
            </div>
            <h3>Propulsion, storage &amp; marine technology</h3>
            <p>
              E-MARINE collaborates with OEM partners across EV propulsion, energy storage, and marine
              technology — ensuring best-in-class performance, reliability, and innovation across every project.
            </p>
          </div>
          <div className="pt-marquee">
            <div className="pt-marquee-track">{pills}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
