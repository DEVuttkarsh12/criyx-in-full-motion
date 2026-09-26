"use client";

import { useEffect, useRef } from "react";

const pointCount = 1750;
const goldenAngle = Math.PI * (3 - Math.sqrt(5));
const points = Array.from({ length: pointCount }, (_, index) => {
  const y = 1 - (index + 0.5) * 2 / pointCount;
  const radius = Math.sqrt(1 - y * y);
  const theta = index * goldenAngle;
  return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
});

export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    let frame = 0;
    let visible = true;
    let size = 0;
    let pixelRatio = 1;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      size = canvas.getBoundingClientRect().width;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * pixelRatio);
      canvas.height = Math.round(size * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time: number) => {
      if (!size) return;
      context.clearRect(0, 0, size, size);
      const angle = reduceMotion.matches ? 0.35 : time * 0.00015 + 0.35;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const center = size / 2;
      const radius = size * 0.455;

      for (const point of points) {
        const x = point.x * cosine + point.z * sine;
        const z = point.z * cosine - point.x * sine;
        const perspective = 1 + z * 0.09;
        const depth = (z + 1) / 2;
        const dot = 0.48 + depth * 0.92;
        context.beginPath();
        context.arc(center + x * radius * perspective, center + point.y * radius * perspective, dot, 0, Math.PI * 2);
        context.fillStyle = depth > 0.53
          ? `rgba(196, 235, 255, ${0.29 + depth * 0.64})`
          : `rgba(112, 182, 223, ${0.08 + depth * 0.24})`;
        context.fill();
      }

      if (!reduceMotion.matches && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    const resizer = new ResizeObserver(() => { resize(); start(); });
    resizer.observe(canvas);
    observer.observe(canvas);
    reduceMotion.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    resize();
    start();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizer.disconnect();
      reduceMotion.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="orbit-particle-canvas" aria-hidden="true" />;
}
