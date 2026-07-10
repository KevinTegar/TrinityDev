"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";
import { gsap } from "@/lib/motion";

type Props = {
  /** Cover URL of the hovered project, or null when nothing is hovered. */
  src: string | null;
  /** All cover URLs — preloaded once so transitions are instant. */
  sources: string[];
  /** Mutable pointer-velocity ref written by the parent's pointermove handler. */
  veloRef: React.MutableRefObject<number>;
};

const VERTEX = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;
uniform sampler2D tA;
uniform sampler2D tB;
uniform vec2 uScaleA;
uniform vec2 uOffA;
uniform vec2 uScaleB;
uniform vec2 uOffB;
uniform float uProgress;
uniform float uVelo;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  // liquid bulge driven by cursor speed
  uv.x += sin(uv.y * 6.2831) * uVelo * 0.0009;
  uv.y += sin(uv.x * 6.2831) * uVelo * 0.0004;

  float w = sin(uv.y * 3.1416);
  vec2 uvA = (uv + vec2(uProgress * 0.22 * w, 0.0)) * uScaleA + uOffA;
  vec2 uvB = (uv - vec2((1.0 - uProgress) * 0.22 * w, 0.0)) * uScaleB + uOffB;

  vec4 a = texture2D(tA, uvA);
  vec4 b = texture2D(tB, uvB);
  gl_FragColor = mix(a, b, smoothstep(0.05, 0.95, uProgress));
}
`;

/** cover-fit scale/offset for an image inside the plane */
function coverFit(imgAspect: number, planeAspect: number): [number, number, number, number] {
  if (imgAspect > planeAspect) {
    const s = planeAspect / imgAspect;
    return [s, 1, (1 - s) / 2, 0];
  }
  const s = imgAspect / planeAspect;
  return [1, s, 0, (1 - s) / 2];
}

export default function DistortedPreview({ src, sources, veloRef }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    program: Program | null;
    textures: Map<string, { texture: Texture; aspect: number }>;
    current: string | null;
    planeAspect: number;
  }>({ program: null, textures: new Map(), current: null, planeAspect: 4 / 3 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = host.offsetWidth || 288;
    const height = host.offsetHeight || 216;
    const state = stateRef.current;
    state.planeAspect = width / height;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      width,
      height,
    });
    const gl = renderer.gl;
    host.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        tA: { value: new Texture(gl) },
        tB: { value: new Texture(gl) },
        uScaleA: { value: [1, 1] },
        uOffA: { value: [0, 0] },
        uScaleB: { value: [1, 1] },
        uOffB: { value: [0, 0] },
        uProgress: { value: 0 },
        uVelo: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    state.program = program;

    // Preload every cover once.
    sources.forEach((url) => {
      if (state.textures.has(url)) return;
      const texture = new Texture(gl);
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        texture.image = img;
        state.textures.set(url, { texture, aspect: img.naturalWidth / img.naturalHeight });
      };
      img.src = url;
      state.textures.set(url, { texture, aspect: state.planeAspect });
    });

    let velo = 0;
    const tick = () => {
      velo += (gsap.utils.clamp(-60, 60, veloRef.current) - velo) * 0.08;
      veloRef.current *= 0.9;
      program.uniforms.uVelo.value = velo;
      renderer.render({ scene: mesh });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      state.program = null;
      state.current = null;
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ripple to the newly hovered cover.
  useEffect(() => {
    const state = stateRef.current;
    const program = state.program;
    if (!src || !program) return;
    const entry = state.textures.get(src);
    if (!entry) return;

    const fit = coverFit(entry.aspect, state.planeAspect);
    if (!state.current) {
      program.uniforms.tA.value = entry.texture;
      program.uniforms.uScaleA.value = [fit[0], fit[1]];
      program.uniforms.uOffA.value = [fit[2], fit[3]];
      state.current = src;
      return;
    }
    if (state.current === src) return;

    program.uniforms.tB.value = entry.texture;
    program.uniforms.uScaleB.value = [fit[0], fit[1]];
    program.uniforms.uOffB.value = [fit[2], fit[3]];
    state.current = src;
    gsap.killTweensOf(program.uniforms.uProgress);
    gsap.fromTo(
      program.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: 0.65,
        ease: "power2.out",
        onComplete: () => {
          program.uniforms.tA.value = entry.texture;
          program.uniforms.uScaleA.value = [fit[0], fit[1]];
          program.uniforms.uOffA.value = [fit[2], fit[3]];
          program.uniforms.uProgress.value = 0;
        },
      }
    );
  }, [src]);

  return <div ref={hostRef} className="h-full w-full" />;
}
