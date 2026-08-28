import { useEffect, useRef, useState } from "react";

/**
 * Site cursor: a single brand ring at a fixed size — it tracks the pointer and
 * never magnifies or lifts what it hovers. Coarse pointers and reduced-motion
 * users keep the OS cursor.
 *
 * Movement runs on one continuous rAF loop with a light easing term, so the
 * ring glides instead of stepping frame to frame with the raw pointer events.
 */
export function CursorDot() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-dot-active");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let vx = 0;
    let vy = 0;
    let raf = 0;
    let last = 0;
    let idle = 0;

    const write = () => {
      const el = ringRef.current;
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    // Critically damped spring, integrated with the real frame delta. This
    // tracks the pointer with no visible lag but removes the micro-stepping of
    // raw pointer events, so the ring reads as one continuous glide at 60Hz,
    // 120Hz or through a dropped frame.
    const OMEGA = 0.021; // rad/ms — natural frequency (~50ms time constant)
    const STIFFNESS = OMEGA * OMEGA;
    const DAMPING = 2 * OMEGA; // critically damped: fast, zero overshoot
    const loop = (now: number) => {
      const dtMs = last ? Math.min(now - last, 48) : 16.7;
      last = now;

      // Sub-step so a long frame can't overshoot the spring.
      let remaining = dtMs;
      while (remaining > 0) {
        const step = Math.min(remaining, 16.7);
        remaining -= step;
        const ax = (tx - x) * STIFFNESS - vx * DAMPING;
        const ay = (ty - y) * STIFFNESS - vy * DAMPING;
        vx += ax * step;
        vy += ay * step;
        x += vx * step;
        y += vy * step;
      }

      write();

      const settled =
        Math.abs(tx - x) < 0.08 && Math.abs(ty - y) < 0.08 && Math.abs(vx) + Math.abs(vy) < 0.01;
      if (settled) {
        x = tx;
        y = ty;
        vx = 0;
        vy = 0;
        write();
        // Keep the loop warm briefly so the next flick starts on the very next
        // frame instead of paying for a fresh rAF schedule.
        if (idle++ > 30) {
          raf = 0;
          last = 0;
          idle = 0;
          return;
        }
      } else {
        idle = 0;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      idle = 0;
      start();
    };

    write();
    const raw = "onpointerrawupdate" in window ? "pointerrawupdate" : "pointermove";
    window.addEventListener(raw, onMove as EventListener, { passive: true });
    window.addEventListener("pointermove", onMove as EventListener, { passive: true });
    window.addEventListener("mousemove", onMove as EventListener, { passive: true });
    window.addEventListener("pointerdown", onMove as EventListener, { passive: true });

    return () => {
      document.documentElement.classList.remove("cursor-dot-active");
      window.removeEventListener(raw, onMove as EventListener);
      window.removeEventListener("pointermove", onMove as EventListener);
      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("pointerdown", onMove as EventListener);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div ref={ringRef} className="cursor-ring absolute left-0 top-0 h-8 w-8 rounded-full pointer-events-none" />
    </div>
  );
}


export default CursorDot;
