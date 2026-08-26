/**
 * One scroll listener + one requestAnimationFrame for the whole page.
 *
 * Each section used to register its own `scroll` handler that read layout and
 * wrote styles immediately. With half a dozen of those on the homepage the
 * browser had to recalculate layout several times per scroll event, which is
 * what produced the visible stutter between "Why YESEN" and the featured
 * solutions. Subscribers now run batched inside a single frame, at most once
 * per frame, so scrolling stays at one style/layout pass.
 */
type Subscriber = () => void;

const subscribers = new Set<Subscriber>();
let frame = 0;
let bound = false;

function flush() {
  frame = 0;
  for (const fn of subscribers) {
    try {
      fn();
    } catch {
      /* one bad section must not stop the rest of the page */
    }
  }
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(flush);
}

/** Subscribe to scroll/resize, throttled to one call per animation frame. */
export function onScrollFrame(fn: Subscriber): () => void {
  subscribers.add(fn);

  if (!bound && typeof window !== "undefined") {
    bound = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  // Run once so the element starts from a correct state.
  fn();

  return () => {
    subscribers.delete(fn);
    if (frame && subscribers.size === 0) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/** Ask for a batched update from outside a scroll event (e.g. after a filter change). */
export function requestScrollFrame() {
  schedule();
}

/** Round a scrubbed value so we only touch the DOM when it visibly changed. */
export function quantize(value: number, step = 0.02) {
  return Math.round(value / step) * step;
}
