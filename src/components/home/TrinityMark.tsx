"use client";

import { useEffect, useRef } from "react";
import { Camera, Geometry, Mesh, Program, Renderer } from "ogl";
import { gsap, MOTION_OK } from "@/lib/motion";
import { scrollVelocity } from "@/lib/motion/velocity";
import { cn } from "@/lib/cn";

const VERTEX = /* glsl */ `
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;
uniform float uAlpha;
void main() {
  gl_FragColor = vec4(0.067, 0.067, 0.063, uAlpha); // ink #111110
}
`;

/**
 * The Trinity mark: a hairline wireframe tetrahedron — three visible faces,
 * one glyph — drawn like a technical illustration. Idles in a slow spin and
 * leans into the scroll velocity. Static under reduced motion.
 */
export default function TrinityMark({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const size = () => Math.max(host.offsetWidth, 1);
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      width: size(),
      height: size(),
    });
    const gl = renderer.gl;
    host.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const camera = new Camera(gl, { fov: 30, aspect: 1 });
    camera.position.z = 7;

    // Tetrahedron: 4 vertices, 6 edges, drawn as gl.LINES pairs.
    const s = 1.7;
    const v = [
      [s, s, s],
      [s, -s, -s],
      [-s, s, -s],
      [-s, -s, s],
    ];
    const edges = [0, 1, 0, 2, 0, 3, 1, 2, 1, 3, 2, 3];
    const position = new Float32Array(edges.flatMap((i) => v[i]));

    const geometry = new Geometry(gl, { position: { size: 3, data: position } });
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: { uAlpha: { value: 0.45 } },
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry, program, mode: gl.LINES });
    mesh.rotation.set(0.5, 0.6, 0.1);

    const render = () => renderer.render({ scene: mesh, camera });
    render();

    const onResize = () => {
      renderer.setSize(size(), size());
      render();
    };
    window.addEventListener("resize", onResize);

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tick = () => {
        const boost = gsap.utils.clamp(-30, 30, scrollVelocity.current) * 0.0006;
        mesh.rotation.y += 0.0035 + boost;
        mesh.rotation.x += 0.0012 + boost * 0.4;
        render();
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    });

    return () => {
      mm.revert();
      window.removeEventListener("resize", onResize);
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={cn("aspect-square", className)} />;
}
