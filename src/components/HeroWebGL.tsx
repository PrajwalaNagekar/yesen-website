import { useEffect, useRef } from "react";
import { isLowPerfDevice } from "@/lib/perf";

/**
 * Hand-written WebGL1 fragment shader used as an ambient water surface behind
 * the About hero. No three.js — one full-screen triangle pair, ~30 lines of GLSL,
 * so it costs a fraction of a frame and degrades to nothing on weak hardware.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2  uRes;
uniform float uTime;

// cheap value-noise ridges — reads as light moving over water
float wave(vec2 p, float t) {
  return sin(p.x * 3.1 + t) * 0.5
       + sin(p.y * 2.3 - t * 0.8) * 0.3
       + sin((p.x + p.y) * 1.7 + t * 1.3) * 0.2;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.22;

  float w = wave(p * 1.6, t);
  w += wave(p * 3.4 + vec2(1.7, 0.4), t * 1.4) * 0.45;

  // brand palette: pale sky -> navy, forest glints
  vec3 pale   = vec3(0.925, 0.960, 0.988);
  vec3 sky    = vec3(0.161, 0.655, 0.882);
  vec3 navy   = vec3(0.063, 0.169, 0.404);
  vec3 forest = vec3(0.243, 0.557, 0.243);

  float depth = smoothstep(0.0, 1.0, uv.y * 0.85 + w * 0.06);
  vec3 col = mix(navy, sky, depth);
  col = mix(col, pale, smoothstep(0.35, 1.0, uv.y + w * 0.05));

  // specular ridge highlights
  float glint = pow(max(w, 0.0), 6.0) * 0.35;
  col += glint * mix(forest, vec3(1.0), 0.7);

  // vignette so the canvas melts into the page background
  float fade = smoothstep(1.05, 0.25, length(uv - vec2(0.5, 0.62)) * 1.6);
  gl_FragColor = vec4(col, fade * 0.55);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function HeroWebGL({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isLowPerfDevice()) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Cap the backing store: full DPR on a hero-sized canvas is wasted fill rate.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only animate while the hero is actually on screen.
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
