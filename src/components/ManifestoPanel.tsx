import { AnimatePresence, motion } from "framer-motion";
import { Leaf, X } from "lucide-react";
import { useEffect, useState } from "react";

const STANZAS: string[][] = [
  [
    "When wildfires are dancing across our forests",
    "And the waters depleting beyond human vision",
    "When the clouds are vanishing by the second",
    "And extinction is writ on the skyline",
  ],
  ["That's when we know that climate emergency is staring us at our face. Now. Now. Now."],
  [
    "We are challenging statequo",
    "And working to change the story",
    "We are decolorising our technicolor dreams",
    "And visualizing alternative futures.",
  ],
  [
    "We are calling futurists from across the world",
    "To connect our individual minds",
    "To engage in dialogue, in creativity, in inquisitiveness.",
  ],
  [
    "We are reminding people of their relationship with nature",
    "We are urging people to own up and take responsibility",
    "For our personal lives and everyone's future.",
  ],
  [
    "Our goal is to make sustainable adoptions",
    "Desirable, suitable and accessible.",
    "By introducing creative products and solutions",
    "that are brainstormed, explored and thought out.",
    "To ensure sustainable livelihoods and a happier rural landscape.",
  ],
  [
    "We look at life a little differently — at its culture, or behaviour — and offering thoughtful, provocative alternatives.",
    "We empower everyone, every one, to live a little more responsibly every day.",
  ],
];

export function ManifestoPanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3 }}
        className="manifesto-fab"
        aria-label="View our manifesto"
      >
        <span className="manifesto-fab-icon about-float">
          <Leaf size={15} />
        </span>
        View Our Manifesto
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="manifesto-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              key="panel"
              className="manifesto-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Our manifesto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="manifesto-glow" aria-hidden="true" />

              <header className="manifesto-head">
                <div>
                  <p className="about-eyebrow">Our Manifesto</p>
                  <h2 className="display-xl mt-3 text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15]">
                    A <span className="about-highlight">climate</span> promise
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="manifesto-close"
                  aria-label="Close manifesto"
                >
                  <X size={18} />
                </button>
              </header>

              <motion.div
                className="manifesto-body"
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.16, duration: 0.35 }}
              >
                {STANZAS.map((lines, si) => (
                  <p key={si} className={si === 1 ? "manifesto-lede" : "manifesto-stanza"}>
                    {lines.map((line, li) => (
                      <span key={li}>
                        {line}
                        {li < lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}


                <div className="manifesto-sign">— YESEN Technologies Pvt Ltd</div>
              </motion.div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
