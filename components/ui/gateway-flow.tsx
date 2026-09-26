'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

type Mode = 'light' | 'dark' | 'auto';

export type GatewayFlowProps = {
  mode?: Mode;
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

type FlowPath = {
  fromLeft: boolean;
  startY: number;
  phase: number;
  velocity: number;
};

type Ripple = { x: number; y: number; started: number };

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

export default function GatewayFlow({
  mode = 'dark',
  speed = 1,
  size = 1,
  gap = 2,
  length = 1,
  density = 1,
  strokeWidth = 1,
  opacity,
  hue = 0,
  saturation = 1,
  brightness = 1,
  className,
  style,
}: GatewayFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const host = canvas.parentElement;
    let width = 0;
    let height = 0;
    let paths: FlowPath[] = [];
    let ripples: Ripple[] = [];
    let frame = 0;
    let lastDraw = 0;
    let inView = false;

    const bezier = (t: number, a: number, b: number, c: number, d: number) => {
      const u = 1 - t;
      return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
    };

    const measure = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.round(clamp(density, .2, 1.5) * (width < 700 ? 36 : 72));
      paths = Array.from({ length: count }, (_, index) => ({
        fromLeft: index % 2 === 0,
        startY: ((index + .5) / count) * height * 1.52 - height * .26,
        phase: (index * .61803398875) % 1,
        velocity: .065 + (index % 7) * .011,
      }));
      draw(performance.now());
    };

    const draw = (now: number) => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const resolvedMode = mode === 'auto' ? (darkScheme.matches ? 'dark' : 'light') : mode;
      const color = resolvedMode === 'light' ? '44, 102, 137' : '222, 236, 245';
      const centerX = width * .5;
      const centerY = height * .53;
      const staticFrame = reducedMotion.matches;

      ripples = ripples.filter((ripple) => now - ripple.started < 1350);

      paths.forEach((path, index) => {
        const side = path.fromLeft ? 1 : -1;
        const startX = path.fromLeft ? -8 : width + 8;
        const bend = Math.sin(index * 1.83 + (staticFrame ? 0 : now * .00019)) * height * .023;
        const endY = centerY + (path.startY - centerY) * .085;
        const x1 = centerX - side * centerX * .58;
        const x2 = centerX - side * centerX * .20;
        const y1 = path.startY + bend;
        const y2 = centerY + (path.startY - centerY) * .29 * clamp(length, .5, 1.6);

        context.beginPath();
        context.moveTo(startX, path.startY);
        context.bezierCurveTo(x1, y1, x2, y2, centerX, endY);
        context.strokeStyle = `rgba(${color}, ${resolvedMode === 'light' ? .27 : .32})`;
        context.lineWidth = clamp(strokeWidth, .5, 2) * 1.05;
        context.setLineDash([1.8, 2.4 * clamp(gap, .7, 4)]);
        context.stroke();

        const t = staticFrame ? path.phase : (path.phase + now * .001 * path.velocity * clamp(speed, .1, 2.5)) % 1;
        let x = bezier(t, startX, x1, x2, centerX);
        let y = bezier(t, path.startY, y1, y2, endY);

        ripples.forEach((ripple) => {
          const elapsed = (now - ripple.started) / 1350;
          const radius = elapsed * Math.min(width, height) * .34;
          const dx = x - ripple.x;
          const dy = y - ripple.y;
          const distance = Math.hypot(dx, dy) || 1;
          const force = Math.max(0, 1 - Math.abs(distance - radius) / 75) * (1 - elapsed) * 22;
          x += (dx / distance) * force;
          y += (dy / distance) * force;
        });

        const dotSize = clamp(size, .6, 1.8) * (index % 9 === 0 ? 3 : 2);
        context.fillStyle = `rgba(${color}, ${resolvedMode === 'light' ? .66 : .75})`;
        context.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
      });
      context.setLineDash([]);
    };

    const animate = (now: number) => {
      frame = 0;
      if (!inView || document.hidden || reducedMotion.matches) return;
      if (now - lastDraw >= 30) {
        lastDraw = now;
        draw(now);
      }
      frame = requestAnimationFrame(animate);
    };

    const resume = () => {
      if (inView && !document.hidden && !reducedMotion.matches && !frame) frame = requestAnimationFrame(animate);
      else if (reducedMotion.matches) draw(0);
    };

    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || reducedMotion.matches || !inView) return;
      const bounds = canvas.getBoundingClientRect();
      ripples.push({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, started: performance.now() });
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView && frame) { cancelAnimationFrame(frame); frame = 0; }
      resume();
    });
    const resizeObserver = new ResizeObserver(measure);
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    host?.addEventListener('pointerdown', handlePointer);
    document.addEventListener('visibilitychange', resume);
    reducedMotion.addEventListener('change', resume);
    darkScheme.addEventListener('change', resume);
    measure();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      host?.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('visibilitychange', resume);
      reducedMotion.removeEventListener('change', resume);
      darkScheme.removeEventListener('change', resume);
      cancelAnimationFrame(frame);
    };
  }, [mode, speed, size, gap, length, density, strokeWidth]);

  return <canvas
    ref={canvasRef}
    className={className}
    aria-hidden="true"
    style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none', opacity: opacity === undefined ? undefined : clamp(opacity, 0, 1), filter: `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`, ...style }}
  />;
}
