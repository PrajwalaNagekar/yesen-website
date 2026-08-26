/**
 * Device capability probe used to scale motion / effects down on low-end
 * laptops so scrolling stays at 60fps instead of stuttering.
 */
export function isLowPerfDevice(): boolean {
  if (typeof window === "undefined") return false;

  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = window.devicePixelRatio || 1;
  const pixels = window.innerWidth * window.innerHeight * dpr * dpr;
  const isPhone = window.matchMedia("(max-width: 767px)").matches;

  if (reduced) return true;

  // Phones report 4 cores routinely yet paint a small surface — the desktop
  // thresholds muted their animations entirely. Only drop to the lite path on
  // genuinely weak handsets.
  if (isPhone) return cores <= 2 || memory <= 2;

  // Weak CPU, little RAM, or a very large surface to paint each frame.
  return cores <= 4 || memory <= 4 || pixels > 6_000_000;

}

/** Adds `perf-lite` to <html> when the device needs the cheaper render path. */
export function applyPerfClass(): boolean {
  if (typeof document === "undefined") return false;
  const lite = isLowPerfDevice();
  document.documentElement.classList.toggle("perf-lite", lite);
  return lite;
}
