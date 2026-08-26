import { useEffect } from "react";

import { applyPerfClass } from "@/lib/perf";
import { onScrollFrame } from "@/lib/scroll-scrub";

/**
 * Site-wide motion layer. Scrolling deliberately stays native: a second
 * JavaScript-driven scroll clock competes with Framer Motion, sticky panels,
 * video and WebGL painting and causes uneven wheel/trackpad movement.
 */
export function useSiteMotion(key?: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    applyPerfClass();
    if (reduced) return;

    const cleanups: Array<() => void> = [];
    let onScroll: () => void = () => {};
    let disposed = false;

    let scrollIdleTimer = 0;
    const markScrolling = () => {
      document.documentElement.classList.add("is-scrolling");
      window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, 140);
    };
    window.addEventListener("scroll", markScrolling, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", markScrolling);
      window.clearTimeout(scrollIdleTimer);
      document.documentElement.classList.remove("is-scrolling");
    });

    // Deferred so DOM mutations happen after React hydration, never during it.
    const run = () => {
      if (disposed) return;

    /* ------------------------------------------- panel reveal on first enter */
    // Observed on a later frame: mutating classNames in the same tick as
    // hydration makes React report an attribute mismatch on lazy routes.
    let panelObserver: IntersectionObserver | null = null;
    const panelTimer = window.setTimeout(() => {
      panelObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.lit = "1";
            panelObserver?.unobserve(entry.target);
          }
        },
        { threshold: 0.18 },
      );
      document
        .querySelectorAll<HTMLElement>(".site-panels > section")
        .forEach((el) => panelObserver?.observe(el));
    }, 1000);
    cleanups.push(() => {
      window.clearTimeout(panelTimer);
      panelObserver?.disconnect();
    });



    /* ----------------------------------------------------- scroll progress */
    // Keep this layer compositor-only. Per-element parallax previously called
    // getBoundingClientRect() throughout scrolling, forcing repeated layouts.
    const bar = document.createElement("div");
    bar.className = "jm-progress";
    document.body.appendChild(bar);

    // scrollHeight is a layout read; cache it and refresh only on resize.
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const remeasure = () => {
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };
    let lastProgress = -1;

    onScroll = () => {
      const progress = maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 200) / 200 : 0;
      if (progress !== lastProgress) {
        lastProgress = progress;
        bar.style.transform = `scaleX(${progress})`;
      }

    };

    window.addEventListener("resize", remeasure);
    const unsubscribe = onScrollFrame(onScroll);
    cleanups.push(() => {
      window.removeEventListener("resize", remeasure);
      unsubscribe();
      bar.remove();
    });


    };

    const startId = window.setTimeout(run, 0);

    return () => {
      disposed = true;
      window.clearTimeout(startId);
      cleanups.forEach((fn) => fn());
    };
  }, [key]);
}

export default useSiteMotion;
