import { useEffect, useMemo, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import land110m from "world-atlas/land-110m.json";
import countries110m from "world-atlas/countries-110m.json";

export type GlobePoint = {
  id: string;
  lat: number;
  lon: number;
  label: string;
};

const DEG = Math.PI / 180;

/**
 * Solid-landmass earth on canvas (orthographic projection). Spins slowly on its
 * own; when `active` changes it eases rotation so the location faces the viewer.
 */
export function EarthGlobe({
  points,
  activeId,
  className = "",
}: {
  points: GlobePoint[];
  activeId?: string | null;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const geo = useMemo(() => {
    const land = feature(land110m as never, (land110m as never as any).objects.land) as never as GeoJSON.Feature;
    const borders = feature(
      countries110m as never,
      (countries110m as never as any).objects.countries,
    ) as never as GeoJSON.FeatureCollection;
    return { land, borders, graticule: geoGraticule10() };
  }, []);

  const target = useRef({ lon: 0, lat: 12, zoom: 1 });
  const view = useRef({ lon: 0, lat: 12, zoom: 1 });
  const spin = useRef(true);
  const pointsRef = useRef(points);
  pointsRef.current = points;

  useEffect(() => {
    const p = points.find((x) => x.id === activeId);
    if (p) {
      spin.current = false;
      target.current = { lon: -p.lon, lat: p.lat * 0.75, zoom: 1.55 };
    } else {
      spin.current = true;
      target.current = { ...target.current, lat: 12, zoom: 1 };
    }
  }, [activeId, points]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(canvas);
    const navy = styles.getPropertyValue("--brand-navy").trim() || "#012154";
    const leaf = styles.getPropertyValue("--brand-leaf").trim() || "#9ae6a0";

    let raf = 0;
    let w = 0;
    let h = 0;

    const projection = geoOrthographic().clipAngle(90);
    const path = geoPath(projection, ctx);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      raf = requestAnimationFrame(draw);

      const v = view.current;
      const t = target.current;
      if (spin.current) t.lon -= 0.12;

      v.lon += (t.lon - v.lon) * 0.06;
      v.lat += (t.lat - v.lat) * 0.06;
      v.zoom += (t.zoom - v.zoom) * 0.06;

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) / 2 - 6;
      if (R <= 0) return;

      projection
        .translate([cx, cy])
        .scale(R * v.zoom)
        .rotate([v.lon, -v.lat]);

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // ocean disc
      const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      g.addColorStop(0, "rgba(1,33,84,0.14)");
      g.addColorStop(1, "rgba(1,33,84,0.05)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // graticule
      ctx.beginPath();
      path(geo.graticule as never);
      ctx.strokeStyle = navy;
      ctx.globalAlpha = 0.1;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // land fill
      ctx.beginPath();
      path(geo.land as never);
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = navy;
      ctx.fill();

      // country borders
      ctx.beginPath();
      path(geo.borders as never);
      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // location markers
      const project = (lat: number, lon: number) => {
        const xy = projection([lon, lat]);
        const lam = (lon + v.lon) * DEG;
        const phi = lat * DEG;
        const phi0 = v.lat * DEG;
        const z =
          Math.sin(phi0) * Math.sin(phi) +
          Math.cos(phi0) * Math.cos(phi) * Math.cos(lam);
        return xy ? { x: xy[0], y: xy[1], z } : null;
      };

      for (const pt of pointsRef.current) {
        const p = project(pt.lat, pt.lon);
        if (!p || p.z <= 0.02) continue;
        const isActive = pt.id === activeId;
        const rad = isActive ? 5.5 : 3.4;
        ctx.globalAlpha = 0.45 + p.z * 0.55;
        ctx.fillStyle = isActive ? leaf : "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isActive ? leaf : "#ffffff";
        ctx.globalAlpha = isActive ? 0.6 : 0.35;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad + (isActive ? 8 : 5), 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.restore();

      // rim
      ctx.strokeStyle = navy;
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [geo, activeId]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

export default EarthGlobe;
