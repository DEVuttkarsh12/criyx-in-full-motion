'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links: Array<[string, string]> = [
  ['Products', '/#products'],
  ['Solutions', '/#work'],
  ['Approach', '/#approach'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
];

export default function PpHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-shell">
          <a className="brand-lockup" href="/" aria-label="Criyx home">
            <span className="brand-icon" aria-hidden="true" />
            <span>criyx</span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.slice(0, 4).map(([label, href]) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="nav-cta" href="/#contact">Start a project <ArrowUpRight size={15} /></a>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav-top">
          <a className="brand-lockup" href="/" onClick={() => setMenuOpen(false)} aria-label="Criyx home">
            <span className="brand-icon" aria-hidden="true" />
            <span>criyx</span>
          </a>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href], index) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}<ArrowUpRight /></a>
          ))}
        </nav>
        <p>AI automation + custom software<br />Panchkula, India → Worldwide</p>
      </div>
    </>
  );
}
