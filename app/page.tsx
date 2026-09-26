'use client';

import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  Factory,
  Gem,
  Globe2,
  HeartPulse,
  Layers3,
  Menu,
  X,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShaderBackground } from '@/components/ui/waves-background';
import OrbitingCirclesGlobe from '@/components/ui/orbiting-circles-02';
import RippleDistortion from '@/components/ui/ripple-distortion';
import FlowConvergence from '@/components/flow-convergence';
import ProductShowcase from '@/components/product-showcase';

const discoveryCall = 'https://cal.com/criyx.ai/discovery-call';
const contactEmail = 'mailto:info@criyx.com?subject=Project%20enquiry%20for%20Criyx';

const operatingPatterns = [
  {
    number: '01',
    type: 'Real estate',
    title: 'Every enquiry. One clear next step.',
    description: 'Capture every lead, qualify intent, coordinate tours and keep the pipeline visible without stitching updates together by hand.',
    icon: Building2,
    flow: ['Ads & web', 'WhatsApp', 'Voice', 'CRM'],
    outcome: 'A connected journey from first enquiry to property tour.',
  },
  {
    number: '02',
    type: 'Jewellery',
    title: 'Keep the conversation going.',
    description: 'Structure contact data, segment communication and give priority prospects a clear route from first interaction to sales follow-up.',
    icon: Gem,
    flow: ['Capture', 'Segment', 'Campaign', 'Follow-up'],
    outcome: 'Timely follow-up after every exhibition and campaign.',
  },
  {
    number: '03',
    type: 'Healthcare & services',
    title: 'More care. Less coordination.',
    description: 'Connect calls, messages, appointments and customer records while keeping permissions, review and escalation visible.',
    icon: HeartPulse,
    flow: ['Respond', 'Verify', 'Schedule', 'Handoff'],
    outcome: 'Fewer manual handoffs between enquiries and appointments.',
  },
] as const;

const processSteps = [
  ['01', 'Map', 'Understand the work.', 'We study the people, tools and handoffs behind the problem.', 'Workflow map'],
  ['02', 'Model', 'Choose the right move.', 'We weigh impact, effort and readiness before deciding what to build.', 'Prioritised roadmap'],
  ['03', 'Build', 'Make it work.', 'Design, engineering, integrations and testing move together.', 'Connected system'],
  ['04', 'Improve', 'Make it work better.', 'We measure real use, resolve friction and refine the next iteration.', 'Improvement plan'],
] as const;

const faqs = [
  ['What should we automate first?', 'Usually the workflow where volume, delay and business value overlap. We map the operation first, then rank opportunities by return, effort and readiness.'],
  ['Can Criyx work with our current CRM and tools?', 'Yes, when those tools provide suitable access. Discovery covers APIs, permissions, data quality and the safest integration path before scope is agreed.'],
  ['Do you build the system or only advise?', 'Criyx is implementation-led. Strategy, product design, automation, engineering, testing and launch can sit with one accountable team.'],
  ['Can we begin with one small workflow?', 'Absolutely. A focused pilot is often the best way to prove value, learn from real usage and expand with less risk.'],
  ['How long does a typical project take?', 'It depends on integrations and scope. A focused automation can move quickly; a custom product takes longer. You receive a clear roadmap, milestones and responsibilities before build work begins.'],
] as const;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

function LaunchSequence({ reduced, onComplete }: { reduced: boolean; onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('criyx-intro-v2') === 'seen'; } catch { /* Storage is optional. */ }
    const finish = () => {
      setVisible(false);
      document.body.classList.remove('intro-lock');
      try { sessionStorage.setItem('criyx-intro-v2', 'seen'); } catch { /* Storage is optional. */ }
      onComplete();
    };
    if (reduced || seen) {
      const frame = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(frame);
    }
    document.body.classList.add('intro-lock');
    const timer = window.setTimeout(finish, 1650);
    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove('intro-lock');
    };
  }, [reduced, onComplete]);

  if (!visible) return null;

  return (
    <div className="brand-intro" aria-hidden="true">
      <div className="intro-shutters">
        {Array.from({ length: 6 }, (_, index) => <span key={index} style={{ '--shutter': index } as CSSProperties} />)}
      </div>
      <div className="intro-identity">
        <div className="intro-logo"><span className="brand-icon" /><span>criyx</span></div>
        <p>Intelligence, put to work.</p>
        <div className="intro-rule"><span /></div>
      </div>
    </div>
  );
}

export default function Home() {
  const reduced = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);
  const finishIntro = useCallback(() => setIntroComplete(true), []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const firstSection = document.getElementById('systems')?.getBoundingClientRect();
      setScrolled(Boolean(firstSection && firstSection.top <= 72));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (reduced) {
      elements.forEach(element => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.classList.add('menu-lock');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('menu-lock');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const trackPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  const closeAndFollow = () => setMenuOpen(false);

  return (
    <>
      <LaunchSequence reduced={reduced} onComplete={finishIntro} />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-shell">
          <a className="brand-lockup" href="#top" aria-label="Criyx home">
            <span className="brand-icon" aria-hidden="true" />
            <span>criyx</span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#products">Products</a>
            <a href="#work">Solutions</a>
            <a href="#approach">Approach</a>
            <a href="#about">About</a>
          </nav>
          <div className="nav-actions">
            <a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav-top">
          <a className="brand-lockup" href="#top" onClick={closeAndFollow} aria-label="Criyx home">
            <span className="brand-icon" aria-hidden="true" />
            <span>criyx</span>
          </a>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {[
            ['Products', '#products'],
            ['Solutions', '#work'],
            ['Approach', '#approach'],
            ['About', '#about'],
            ['Contact', '#contact'],
          ].map(([label, href], index) => (
            <a key={label} href={href} onClick={closeAndFollow}><span>0{index + 1}</span>{label}<ArrowUpRight /></a>
          ))}
        </nav>
        <p>AI automation + custom software<br />Panchkula, India → Worldwide</p>
      </div>

      <main id="main" className={introComplete ? 'intro-complete' : ''}>
        <section className="hero hero--editorial" id="top" aria-labelledby="hero-heading">
          <div className="hero-wave-field" aria-hidden="true">
            <ShaderBackground className="hero-wave-canvas" />
          </div>
          <div className="hero-orbit-stage" aria-hidden="true"><OrbitingCirclesGlobe /></div>
          <RippleDistortion className="hero-ripple-layer" brushSize={112} strength={1.35} rings={3.5} spread={4.5} fade={2.45} spacing={34} />
          <div className="hero-shell">
            <div className="hero-copy">
              <h1 id="hero-heading" className="hero-enter hero-enter-2">Intelligence, put to work.</h1>
              <p className="hero-lede hero-enter hero-enter-3">AI agents, connected automation and custom software—thoughtfully built around your business.</p>
              <div className="hero-actions hero-enter hero-enter-4">
                <a className="hero-primary" href="#contact">Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a className="hero-secondary" href="#products">Explore the products <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
            </div>

            <div className="hero-bottom hero-enter hero-enter-5">
              <span aria-hidden="true" />
              <a href="#products" aria-label="Scroll to Criyx products"><ArrowDown size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <FlowConvergence />

        <ProductShowcase />

        <section className="work section-shell" id="work">
          <div className="section-index" data-reveal><span>03</span><p>BUILT AROUND YOUR BUSINESS</p></div>
          <div className="work-heading" data-reveal>
            <h2>Real work.<br /><em>Thoughtfully connected.</em></h2>
            <p>Every industry has its own rhythm. Here’s how connected systems can support yours.</p>
          </div>
          <div className="pattern-list">
            {operatingPatterns.map(pattern => (
              <article className={`pattern-card pattern-card--${pattern.number}`} data-reveal key={pattern.type}>
                <div className="pattern-card-top"><div className="pattern-type"><pattern.icon /><span>{pattern.type}</span></div><span className="pattern-number">{pattern.number}</span></div>
                <div className="pattern-copy"><h3>{pattern.title}</h3><p>{pattern.description}</p></div>
                <div className="pattern-route"><span className="pattern-label">EXAMPLE WORKFLOW</span><ol className="pattern-flow">{pattern.flow.map((item, index) => <li key={item}><span className="pattern-flow-step">0{index + 1}</span><span>{item}</span></li>)}</ol></div>
                <div className="pattern-result"><span>THE GOAL</span><p>{pattern.outcome}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <div className="about-visual" data-reveal>
            <img src="/criyx-flow.png" alt="A sculptural blue loop representing connected business systems" width="2400" height="1350" loading="lazy" />
            <div className="about-stamp"><Globe2 /><div><span>BUILT IN INDIA</span><strong>Connected to the world.</strong></div></div>
          </div>
          <div className="about-copy" data-reveal>
            <div className="section-index"><span>04</span><p>ABOUT CRIYX</p></div>
            <h2>One team.<br /><em>From idea to everyday.</em></h2>
            <p>Criyx is an AI automation and software company for growing businesses that need more than disconnected experiments.</p>
            <p>We bring strategy, product design, engineering, AI and implementation into one delivery team, so the idea survives the journey into day-to-day operations.</p>
            <div className="about-signals">
              <span><Bot />AI-native thinking</span>
              <span><Layers3 />Full-stack delivery</span>
              <span><Factory />Built around operations</span>
            </div>
          </div>
        </section>

        <section className="approach section-shell" id="approach">
          <div className="section-index" data-reveal><span>05</span><p>THE CRIYX METHOD</p></div>
          <div className="approach-layout">
            <div className="approach-heading" data-reveal>
              <h2>Clarity first.<br /><em>Then velocity.</em></h2>
              <p>A practical route from a messy operational problem to a system your team can actually use.</p>
            </div>
            <div className="process-line">
              {processSteps.map(([number, label, title, description, output], index) => (
                <article data-reveal key={label}>
                  <div className="process-top"><span>{number}</span><i />{index < processSteps.length - 1 && <ArrowRight size={14} />}</div>
                  <small>{label}</small>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="process-output"><span>YOU LEAVE WITH</span><strong>{output}</strong></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq section-shell" id="questions">
          <div className="faq-intro" data-reveal>
            <div className="section-index"><span>06</span><p>STRAIGHT ANSWERS</p></div>
            <h2>Before we<br /><em>begin.</em></h2>
            <p>Have a different question? Bring us the business problem, not a perfectly written brief.</p>
            <a href={contactEmail}>Ask Criyx <ArrowUpRight size={15} /></a>
          </div>
          <Accordion className="faq-list" data-reveal>
            {faqs.map(([question, answer], index) => (
              <AccordionItem value={`item-${index}`} key={question}>
                <AccordionTrigger><span>0{index + 1}</span>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="contact" id="contact" onPointerMove={trackPointer}>
          <div className="contact-grid" aria-hidden="true" />
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-shell">
            <div className="contact-kicker" data-reveal>YOUR NEXT CHAPTER</div>
            <h2 data-reveal>Let’s make<br /><em>better work happen.</em></h2>
            <div className="contact-bottom" data-reveal>
              <p>Bring us the workflow slowing you down, the customer journey you want to improve or the product you are ready to build.</p>
              <div className="contact-actions">
                <a className="button button-light" href={discoveryCall} target="_blank" rel="noreferrer">Book a discovery call <ArrowUpRight /></a>
                <a className="button button-ghost" href={contactEmail}>info@criyx.com <ArrowRight /></a>
              </div>
            </div>
            <div className="contact-wordmark" aria-hidden="true">criyx<span>.</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div><a className="brand-lockup" href="#top" aria-label="Criyx home"><span className="brand-icon" aria-hidden="true" /><span>criyx</span></a><p>AI automation + custom software<br />for intelligent operations.</p></div>
          <nav aria-label="Footer navigation">
            <span>EXPLORE</span>
            <a href="#products">Products</a>
            <a href="#work">Solutions</a>
            <a href="#approach">Approach</a>
            <a href="#about">About</a>
          </nav>
          <div className="footer-contact"><span>START A CONVERSATION</span><a href={contactEmail}>info@criyx.com <ArrowUpRight /></a><a href={discoveryCall} target="_blank" rel="noreferrer">Book a call <ArrowUpRight /></a></div>
          <a className="back-to-top" href="#top">Back to top <ArrowUpRight /></a>
        </div>
        <div className="footer-bottom"><span>© 2026 CRIYX PRIVATE LIMITED</span><span>PANCHKULA, HARYANA, INDIA</span><span>INTELLIGENCE, WITH INTENTION.</span></div>
      </footer>
    </>
  );
}
