'use client';

import { useEffect, useRef } from 'react';
import {
  AudioLines, Clapperboard, Code2, Headphones, MessageCircle,
  PanelTop, ScanLine, Search, Star, Video,
} from 'lucide-react';

const products = [
  { name: 'Voice Agents', icon: Headphones },
  { name: 'WhatsApp Agent', icon: MessageCircle },
  { name: 'Criyx CRM', icon: PanelTop },
  { name: 'Review Automation', icon: Star },
  { name: 'SEO Agent', icon: Search },
  { name: 'Card Collector', icon: ScanLine },
  { name: 'Avatar Cloning', icon: Video },
  { name: 'Video Workflow', icon: Clapperboard },
  { name: 'Partner Voice API', icon: Code2 },
] as const;

export default function ProductIndex() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const rows = [...(listRef.current?.querySelectorAll<HTMLElement>('.pi-row') ?? [])];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rows.forEach(row => row.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    rows.forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="product-index" id="systems" aria-labelledby="product-index-heading">
      <div className="pi-shell">
        <h2 className="pi-heading" id="product-index-heading">
          <span>01 / THE CRIYX PRODUCT LINE</span>
          <AudioLines size={19} strokeWidth={1.2} aria-hidden="true" />
        </h2>
        <ol className="pi-list" ref={listRef}>
          {products.map((product, index) => (
            <li className="pi-row" key={product.name}>
              <span className="pi-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="pi-name">{product.name}</span>
              <span className="pi-icon" aria-hidden="true"><product.icon strokeWidth={1.15} /></span>
            </li>
          ))}
        </ol>
        <div className="pi-end" aria-hidden="true"><span>CRIYX / 09</span><span>↓</span></div>
      </div>
    </section>
  );
}
