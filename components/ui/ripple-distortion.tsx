'use client';

// Transparent adaptation of the supplied React Bits RippleDistortion.
// Its displacement field sits over the existing hero instead of replacing it.
import { useEffect, useRef, useState } from 'react';
import { Geometry, Mesh, Program, RenderTarget, Renderer, Triangle } from 'ogl';
import './ripple-distortion.css';

type RippleProps = {
  className?: string;
  brushSize?: number;
  strength?: number;
  rings?: number;
  spread?: number;
  fade?: number;
  spacing?: number;
};

const MAX_WAVES = 64;
const vertex = `precision highp float;
attribute vec2 position;
attribute vec2 uv;
attribute vec2 iOffset;
attribute vec2 iScale;
attribute float iOpacity;
varying vec2 vUv;
varying float vOpacity;
void main() {
  vUv = uv;
  vOpacity = iOpacity;
  gl_Position = vec4(iOffset + position * iScale, 0., 1.);
}`;

const waveFragment = `precision highp float;
varying vec2 vUv;
varying float vOpacity;
uniform float uRings;
const float PI = 3.141592653589793;
void main() {
  vec2 p = vUv * 2. - 1.;
  float r = dot(p,p);
  if (r > 1.) discard;
  float brush = (exp(-r * 5.) - 0.006737947) / 0.993262053;
  brush *= 0.55 + 0.45 * cos(sqrt(r) * PI * 2. * uRings);
  gl_FragColor = vec4(vec3(brush * vOpacity * vOpacity), 1.);
}`;

const screenVertex = `precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position,0.,1.); }`;

const compositeFragment = `precision highp float;
varying vec2 vUv;
uniform sampler2D uDisplacement;
uniform vec2 uTexel;
uniform float uStrength;
void main() {
  float d = texture2D(uDisplacement,vUv).r;
  float dx = texture2D(uDisplacement,vUv + vec2(uTexel.x,0.)).r
           - texture2D(uDisplacement,vUv - vec2(uTexel.x,0.)).r;
  float dy = texture2D(uDisplacement,vUv + vec2(0.,uTexel.y)).r
           - texture2D(uDisplacement,vUv - vec2(0.,uTexel.y)).r;
  float crest = clamp(length(vec2(dx,dy)) * 22.,0.,1.);
  float body = smoothstep(0.08,0.7,d);
  vec3 ice = mix(vec3(0.22,0.56,0.73),vec3(0.79,0.93,1.),crest);
  float alpha = clamp((crest * 0.32 + body * 0.075) * uStrength,0.,0.55);
  gl_FragColor = vec4(ice,alpha);
}`;

type Wave = { x: number; y: number; scale: number; target: number; size: number; opacity: number };

export default function RippleDistortion({ className = '', brushSize = 110, strength = 1, rings = 3.5, spread = 4.6, fade = 2.6, spacing = 30 }: RippleProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLCanvasElement>(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: false, antialias: false, depth: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) });
    } catch { return; }
    const gl = renderer.gl;
    if (!gl) return;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.className = 'ripple-webgl';
    mount.appendChild(canvas);
    setWebglReady(true);

    const offsets = new Float32Array(MAX_WAVES * 2);
    const scales = new Float32Array(MAX_WAVES * 2);
    const opacities = new Float32Array(MAX_WAVES);
    const waves: Wave[] = Array.from({ length: MAX_WAVES }, () => ({ x: 0, y: 0, scale: 1.5, target: 1.5, size: 1, opacity: 0 }));
    let current = 0;
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]) },
      uv: { size: 2, data: new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]) },
      iOffset: { instanced: 1, size: 2, data: offsets },
      iScale: { instanced: 1, size: 2, data: scales },
      iOpacity: { instanced: 1, size: 1, data: opacities },
    });
    const waveProgram = new Program(gl, { vertex, fragment: waveFragment, uniforms: { uRings: { value: rings } }, transparent: true, depthTest: false, depthWrite: false, cullFace: false });
    waveProgram.setBlendFunc(gl.ONE, gl.ONE);
    const waveMesh = new Mesh(gl, { geometry, program: waveProgram, frustumCulled: false });
    const target = new RenderTarget(gl, { width: 2, height: 2, depth: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    const compositeUniforms = { uDisplacement: { value: target.texture }, uTexel: { value: [1,1] }, uStrength: { value: strength } };
    const composite = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex: screenVertex, fragment: compositeFragment, uniforms: compositeUniforms, transparent: true, depthTest: false, depthWrite: false }) });

    let width = 1;
    let height = 1;
    let raf = 0;
    let previousTime = 0;
    let inView = true;
    let lastPoint: [number,number] | null = null;
    let disposed = false;
    const resize = () => {
      width = Math.max(1, mount.clientWidth);
      height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height);
      const fieldW = Math.max(2, Math.round(width * .4));
      const fieldH = Math.max(2, Math.round(height * .4));
      target.setSize(fieldW, fieldH);
      compositeUniforms.uTexel.value = [1 / fieldW, 1 / fieldH];
      requestDraw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      if (inView) requestDraw();
    });
    io.observe(mount);

    function requestDraw() { if (!disposed && inView && document.visibilityState === 'visible' && !raf) raf = requestAnimationFrame(draw); }
    function draw(now: number) {
      raf = 0;
      const dt = previousTime ? Math.min(.05, (now - previousTime) / 1000) : 0;
      previousTime = now;
      const growth = 1 - Math.exp(-dt * 1.09);
      const decay = Math.exp((-dt * Math.log(500)) / Math.max(.15, fade));
      let active = false;
      waves.forEach((wave, i) => {
        if (wave.opacity <= 0) { opacities[i] = 0; return; }
        wave.opacity *= decay;
        wave.scale += (wave.target - wave.scale) * growth;
        if (wave.opacity < .002) { wave.opacity = 0; opacities[i] = 0; return; }
        active = true;
        const half = wave.scale * wave.size / 2;
        offsets[i * 2] = wave.x / width * 2 - 1;
        offsets[i * 2 + 1] = wave.y / height * 2 - 1;
        scales[i * 2] = half / width * 2;
        scales[i * 2 + 1] = half / height * 2;
        opacities[i] = wave.opacity;
      });
      geometry.attributes.iOffset.needsUpdate = true;
      geometry.attributes.iScale.needsUpdate = true;
      geometry.attributes.iOpacity.needsUpdate = true;
      renderer.render({ scene: waveMesh, target, clear: true });
      renderer.render({ scene: composite, clear: true });
      if (active) requestDraw();
      else previousTime = 0;
    }
    const point = (x: number, y: number): [number,number] | null => {
      const rect = mount.getBoundingClientRect();
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null;
      return [x - rect.left, rect.height - (y - rect.top)];
    };
    const addWave = ([x,y]: [number,number], power = 1) => {
      const wave = waves[current];
      current = (current + 1) % MAX_WAVES;
      Object.assign(wave, { x, y, scale: 1.5 * power, target: 1.5 * spread * power, size: brushSize, opacity: 1 });
      requestDraw();
    };
    const onMove = (event: PointerEvent) => {
      const p = point(event.clientX, event.clientY);
      if (!p) return;
      if (!lastPoint || Math.hypot(p[0]-lastPoint[0],p[1]-lastPoint[1]) > spacing) { addWave(p); lastPoint = p; }
    };
    const onDown = (event: PointerEvent) => { const p = point(event.clientX,event.clientY); if (p) addWave(p,1.4); };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    const onVisibility = () => { if (document.visibilityState === 'visible') requestDraw(); };
    document.addEventListener('visibilitychange', onVisibility);
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', onVisibility);
      if (canvas.parentNode === mount) mount.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [brushSize, strength, rings, spread, fade, spacing]);

  useEffect(() => {
    if (webglReady || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = fallbackRef.current;
    const mount = mountRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !mount) return;
    type Ring = { x: number; y: number; birth: number };
    let waves: Ring[] = [];
    let frame = 0;
    let width = 1;
    let height = 1;
    let inView = true;
    let previous: [number,number] | null = null;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = mount.clientWidth; height = mount.clientHeight;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    const draw = (now: number) => {
      frame = 0;
      ctx.clearRect(0,0,width,height);
      waves = waves.filter(wave => now - wave.birth < fade * 1000);
      waves.forEach(wave => {
        const life = (now - wave.birth) / (fade * 1000);
        const radius = brushSize * (.35 + life * spread * .42);
        for (let i = 0; i < 3; i++) {
          ctx.beginPath(); ctx.arc(wave.x,wave.y,radius + i * 18,0,Math.PI * 2);
          const ringAlpha = Math.min(.5, (1-life)**2 * (.18-i*.038) * strength);
          ctx.strokeStyle = `rgba(169,222,242,${ringAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 14; ctx.shadowColor = 'rgba(112,195,230,.3)';
          ctx.stroke();
        }
      });
      if (waves.length && inView) frame = requestAnimationFrame(draw);
    };
    const add = (x: number, y: number) => { waves.push({x,y,birth:performance.now()}); if (!frame && inView) frame = requestAnimationFrame(draw); };
    const local = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return null;
      return [e.clientX-r.left,e.clientY-r.top] as [number,number];
    };
    const onMove = (e: PointerEvent) => { const p=local(e); if (p && (!previous || Math.hypot(p[0]-previous[0],p[1]-previous[1]) > spacing*1.6)) { add(...p); previous=p; } };
    const onDown = (e: PointerEvent) => { const p=local(e); if (p) add(...p); };
    const ro = new ResizeObserver(resize); ro.observe(mount); resize();
    const io = new IntersectionObserver(([entry]) => { inView = entry?.isIntersecting ?? false; if (inView && waves.length && !frame) frame = requestAnimationFrame(draw); }); io.observe(mount);
    window.addEventListener('pointermove',onMove,{passive:true});
    window.addEventListener('pointerdown',onDown,{passive:true});
    return () => { cancelAnimationFrame(frame); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove',onMove); window.removeEventListener('pointerdown',onDown); };
  }, [webglReady, brushSize, strength, spread, fade, spacing]);

  return <div ref={mountRef} className={`ripple-distortion ${className}`} aria-hidden="true"><canvas ref={fallbackRef} className="ripple-fallback" style={{ opacity: webglReady ? 0 : 1 }} /></div>;
}
