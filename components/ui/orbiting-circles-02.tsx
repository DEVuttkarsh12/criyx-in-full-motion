"use client";

import type { CSSProperties } from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

const orbits = [
  {
    duration: 33,
    icons: [
      { src: "/orbit-icons/supabase.svg", alt: "Supabase", angle: -62 },
      { src: "/orbit-icons/gemini.svg", alt: "Gemini", angle: 55 },
      { src: "/orbit-icons/make.svg", alt: "Make", angle: 170 },
    ],
  },
  {
    duration: 44,
    icons: [
      { src: "/orbit-icons/figma.svg", alt: "Figma", angle: -47 },
      { src: "/orbit-icons/slack.svg", alt: "Slack", angle: 48 },
    ],
  },
  {
    duration: 57,
    icons: [
      { src: "/orbit-icons/claude.svg", alt: "Claude", angle: -55 },
      { src: "/orbit-icons/react.svg", alt: "React", angle: 50 },
      { src: "/orbit-icons/python.svg", alt: "Python", angle: 165 },
    ],
  },
];

/** Transparent orbital system for the hero's existing wave background. */
export default function OrbitingCirclesGlobe() {
  return (
    <div className="orbit-system" aria-hidden="true">
      <div className="orbit-sphere"><ParticleSphereAnimation /></div>
      {orbits.map((orbit, index) => (
        <div className={`orbit-ring orbit-ring--${index + 1}`} key={orbit.duration}>
          {orbit.icons.map((icon) => {
            const clockwise = index !== 1;
            const style = {
              "--start-angle": `${icon.angle}deg`,
              "--orbit-duration": `${orbit.duration}s`,
            } as CSSProperties;
            return (
              <div className={`orbit-arm ${clockwise ? "orbit-arm--cw" : "orbit-arm--ccw"}`} key={icon.alt} style={style}>
                <div className={`orbit-badge ${clockwise ? "orbit-badge--cw" : "orbit-badge--ccw"}`}>
                  <img src={icon.src} alt="" width={26} height={26} loading="eager" draggable={false} />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
