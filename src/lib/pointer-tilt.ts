/**
 * Shared pointer-tilt / spotlight helper.
 *
 * The old per-card `mousemove` handlers called getBoundingClientRect() on every
 * single event and wrote styles straight away. That forces a synchronous layout
 * dozens of times a second and is what made the homepage feel rough while the
 * cursor travelled over the glass cards. Here the rect is measured once on
 * enter, and all writes are coalesced into one animation frame.
 */

export type TiltOptions = {
  /** Max rotateX in degrees. */
  rx?: number;
  /** Max rotateY in degrees. */
  ry?: number;
  /** Lift in px. */
  lift?: number;
  /** Also expose --mx / --my for a spotlight gradient. */
  spotlight?: boolean;
};

const finePointer = () =>
  typeof window === "undefined" ? false : window.matchMedia("(pointer: fine)").matches;

export function attachTilt(card: HTMLElement, opts: TiltOptions = {}): () => void {
  const { rx = 4, ry = 5, lift = 6, spotlight = true } = opts;

  // Touch / coarse pointers never see the effect, so don't pay for the listeners.
  if (!finePointer()) return () => {};

  let rect: DOMRect | null = null;
  let px = 0.5;
  let py = 0.5;
  let raf = 0;

  const paint = () => {
    raf = 0;
    if (spotlight) {
      card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    }
    card.style.transform = `perspective(1100px) rotateX(${((0.5 - py) * rx).toFixed(2)}deg) rotateY(${((px - 0.5) * ry).toFixed(2)}deg) translate3d(0, -${lift}px, 0)`;
  };

  const onEnter = (e: MouseEvent) => {
    rect = card.getBoundingClientRect();
    card.style.willChange = "transform";
    onMove(e);
  };

  const onMove = (e: MouseEvent) => {
    if (!rect) rect = card.getBoundingClientRect();
    px = (e.clientX - rect.left) / rect.width;
    py = (e.clientY - rect.top) / rect.height;
    if (!raf) raf = requestAnimationFrame(paint);
  };

  const onLeave = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    rect = null;
    card.style.transform = "";
    card.style.willChange = "";
  };

  card.addEventListener("mouseenter", onEnter);
  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", onLeave);

  return () => {
    if (raf) cancelAnimationFrame(raf);
    card.removeEventListener("mouseenter", onEnter);
    card.removeEventListener("mousemove", onMove);
    card.removeEventListener("mouseleave", onLeave);
  };
}

/** Pointer-following parallax for a decorative mesh layer, one write per frame. */
export function attachMeshParallax(
  section: HTMLElement,
  getLayer: () => HTMLElement | null,
  amount = { x: 22, y: 18 },
): () => void {
  if (!finePointer()) return () => {};

  let rect: DOMRect | null = null;
  let x = 0;
  let y = 0;
  let raf = 0;

  const paint = () => {
    raf = 0;
    const layer = getLayer();
    if (layer) layer.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };

  const onEnter = () => {
    rect = section.getBoundingClientRect();
  };

  const onMove = (e: MouseEvent) => {
    if (!rect) rect = section.getBoundingClientRect();
    x = ((e.clientX - rect.left) / rect.width - 0.5) * amount.x;
    y = ((e.clientY - rect.top) / rect.height - 0.5) * amount.y;
    if (!raf) raf = requestAnimationFrame(paint);
  };

  const onLeave = () => {
    rect = null;
  };

  section.addEventListener("mouseenter", onEnter);
  section.addEventListener("mousemove", onMove);
  section.addEventListener("mouseleave", onLeave);

  return () => {
    if (raf) cancelAnimationFrame(raf);
    section.removeEventListener("mouseenter", onEnter);
    section.removeEventListener("mousemove", onMove);
    section.removeEventListener("mouseleave", onLeave);
  };
}
