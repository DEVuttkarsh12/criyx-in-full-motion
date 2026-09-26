'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  CalendarDays,
  CircleHelp,
  FileText,
  ListOrdered,
  Mail,
  NotebookPen,
  Table2,
} from 'lucide-react';

const discoveryCall = 'https://cal.com/criyx.ai/discovery-call';

const pains = [
  'Manual spreadsheets',
  'Repetitive tasks',
  'Generic tools',
  'Repetitive data entry',
  'Drowning in emails',
  'Missed follow-ups',
];

const tiles = [
  { icon: CalendarDays, label: 'Calendar' },
  { icon: Table2, label: 'Spreadsheet' },
  { icon: ListOrdered, label: 'Task list' },
  { icon: CircleHelp, label: 'Unanswered question' },
  { icon: Mail, label: 'Email' },
  { icon: NotebookPen, label: 'Notes' },
  { icon: FileText, label: 'Document' },
];

const cards = [
  {
    title: 'Autonomous Operations',
    points: [
      'Multi-system AI orchestration',
      'Reporting & intelligence layer',
      'Continuous optimization loop',
      'Team training & AI culture',
    ],
  },
  {
    title: 'Predictive Analytics',
    points: [
      'Real-time data processing',
      'Pattern recognition engine',
      'Automated anomaly detection',
      'Custom dashboard insights',
    ],
  },
  {
    title: 'AI Infrastructure',
    points: [
      'Scalable model deployment',
      'Cloud-native architecture',
      'Security & compliance layer',
      'Performance monitoring tools',
    ],
  },
];

const FLOWS = [
  'M -20,60 C 200,95 340,160 516,252',
  'M -20,215 C 200,230 330,250 520,282',
  'M -20,320 C 200,312 330,308 524,306',
  'M -20,412 C 200,396 330,362 524,340',
  'M -20,502 C 220,466 340,388 520,362',
  'M -20,602 C 240,538 350,416 514,370',
];

// Faint background wires that fill the empty left space — no travelling dots.
const FAINTS = [
  'M -20,140 C 220,160 350,220 505,276',
  'M -20,265 C 220,275 350,300 510,316',
  'M -20,365 C 220,360 350,348 510,332',
  'M -20,462 C 220,450 350,400 505,352',
  'M -20,560 C 240,540 350,470 500,398',
];

const TRUNK = 'M 535,310 H 1220';

export default function FlowConvergence() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const nodes = [...(sectionRef.current?.querySelectorAll<HTMLElement>('.fc-reveal') ?? [])];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="flow-convergence" id="systems" ref={sectionRef} aria-labelledby="fc-heading">
      <div className="fc-shell">
        <div className="fc-top fc-reveal">
          <p className="fc-eyebrow">01 / FROM CHAOS TO FLOW</p>
          <h2 className="fc-lede" id="fc-heading">
            We help businesses design and deploy AI systems that cut manual work, improve how
            operations run, and scale across the organization — built around how your business
            actually works, not a template.
          </h2>
          <a className="fc-cta" href={discoveryCall} target="_blank" rel="noreferrer">
            Book a Discovery Call
          </a>
        </div>

        <div className="fc-stage fc-reveal">
          <svg className="fc-lines" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="fc-flow-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="545" y2="0">
                <stop offset="0" stopColor="#94b2ff" stopOpacity="0" />
                <stop offset="0.55" stopColor="#94b2ff" stopOpacity="0.16" />
                <stop offset="1" stopColor="#bcd4ff" stopOpacity="0.42" />
              </linearGradient>
              <linearGradient id="fc-trunk-fade" gradientUnits="userSpaceOnUse" x1="535" y1="0" x2="1220" y2="0">
                <stop offset="0" stopColor="#bcd4ff" stopOpacity="0.45" />
                <stop offset="1" stopColor="#94b2ff" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {FLOWS.map(flow => (
              <path key={flow} d={flow} pathLength={1} className="fc-flow" />
            ))}
            {FAINTS.map(faint => (
              <path key={faint} d={faint} pathLength={1} className="fc-faint" />
            ))}
            <path d={TRUNK} pathLength={1} className="fc-trunk" />
            {!reduced && (
              <g className="fc-dots">
                {FLOWS.map((flow, index) => {
                  const dur = `${4.4 + index * 0.4}s`;
                  const begin = `-${index * 0.85}s`;
                  return (
                    <g key={flow}>
                      <circle r="8" className="fc-dot-halo" />
                      <circle r="3.5" className="fc-dot" />
                      <animateMotion
                        dur={dur}
                        begin={begin}
                        repeatCount="indefinite"
                        path={flow}
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.12;0.8;1"
                        dur={dur}
                        begin={begin}
                        repeatCount="indefinite"
                      />
                    </g>
                  );
                })}
                <g>
                  <circle r="9" className="fc-dot-halo" />
                  <circle r="3.6" className="fc-dot" />
                  <animateMotion dur="2.6s" begin="0s" repeatCount="indefinite" path={TRUNK} />
                </g>
                <g>
                  <circle r="9" className="fc-dot-halo" />
                  <circle r="3.6" className="fc-dot" />
                  <animateMotion dur="3.4s" begin="-1.3s" repeatCount="indefinite" path={TRUNK} />
                </g>
              </g>
            )}
          </svg>

          <div className="fc-field" aria-label="Messy manual work flowing into Criyx">
            {pains.map((pain, index) => (
              <span className={`fc-pill fc-pill--${index + 1}`} key={pain}>
                {pain}
              </span>
            ))}
            {tiles.map((tile, index) => (
              <span className={`fc-tile fc-tile--${index + 1}`} key={tile.label} aria-hidden="true">
                <tile.icon strokeWidth={1.8} />
              </span>
            ))}
          </div>

          <div className="fc-core" role="img" aria-label="Criyx turns manual work into intelligent systems">
            <span className="fc-core-halo" aria-hidden="true" />
            {!reduced && (
              <>
                <span className="fc-core-pulse" aria-hidden="true" />
                <span className="fc-core-pulse fc-core-pulse--2" aria-hidden="true" />
                <span className="fc-core-orbit" aria-hidden="true" />
              </>
            )}
            <span className="brand-icon fc-core-logo" aria-hidden="true" />
          </div>

          <div className="fc-cards">
            {cards.map((card, index) => (
              <article className="fc-card" key={card.title}>
                <span className="fc-card-index" aria-hidden="true">0{index + 1}</span>
                <div className="fc-card-head">
                  <span aria-hidden="true">
                    <Bot strokeWidth={1.8} />
                  </span>
                  <h3>{card.title}</h3>
                </div>
                <ul>
                  {card.points.map(point => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="fc-glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
