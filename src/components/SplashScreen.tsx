import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo";

/** Client-session flag: the entry sequence plays once, never again on re-mounts. */
let hasPlayed = false;

/**
 * Entry sequence: the logo loads in colour left-to-right over a ghosted copy,
 * then the whole stage fades away to reveal the site.
 */
export function SplashScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (hasPlayed) {
      setDone(true);
      return;
    }
    hasPlayed = true;

    // `ys-lock` freezes scrolling without collapsing the scrollbar, so the
    // page never shifts sideways when the stage releases.
    document.documentElement.classList.add("ys-lock");
    const release = window.setTimeout(() => {
      document.documentElement.classList.remove("ys-lock");
    }, 2200);
    const end = window.setTimeout(() => setDone(true), 2900);
    return () => {
      window.clearTimeout(release);
      window.clearTimeout(end);
      document.documentElement.classList.remove("ys-lock");
    };
  }, []);

  if (done) return null;

  return (
    <div className="ys-stage" aria-hidden="true">
      <div className="ys-splash">
        <div className="ys-logo-wrap">
          <Logo className="ys-logo-ghost" />
          <Logo className="ys-logo-color" />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
