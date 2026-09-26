'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { products } from '@/lib/products';

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [previewOn, setPreviewOn] = useState(false);

  useEffect(() => {
    const nodes = [...(sectionRef.current?.querySelectorAll<HTMLElement>('.pl-reveal') ?? [])];
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

  useEffect(() => {
    const rows = [...(sectionRef.current?.querySelectorAll<HTMLElement>('.pl-row') ?? [])];
    if (!rows.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const spotter = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = rows.indexOf(entry.target as HTMLElement);
            if (index >= 0) setCurrent(index);
          }
        });
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0 },
    );
    rows.forEach(row => spotter.observe(row));
    return () => spotter.disconnect();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;
    const loop = () => {
      raf = 0;
      px += (tx - px) * 0.14;
      py += (ty - py) * 0.14;
      preview.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
      if (Math.abs(tx - px) > 0.4 || Math.abs(ty - py) > 0.4) raf = requestAnimationFrame(loop);
    };
    const onMove = (event: PointerEvent) => {
      const bounds = list.getBoundingClientRect();
      tx = event.clientX - bounds.left + 28;
      ty = event.clientY - bounds.top - 130;
      if (!placed) {
        px = tx;
        py = ty;
        placed = true;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      setPreviewOn(false);
    };
    list.addEventListener('pointermove', onMove, { passive: true });
    list.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      list.removeEventListener('pointermove', onMove);
      list.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section className="showcase" id="products" ref={sectionRef} aria-labelledby="showcase-heading">
      <div className="sc-shell">
        <div className="sc-head pl-reveal">
          <div>
            <p className="sc-eyebrow">02 / THE PRODUCT LINE</p>
            <h2 id="showcase-heading">Nine products.<br /><em>One flow.</em></h2>
          </div>
          <p className="sc-sub">The SaaS line we are building. Hover to preview — select any product for the full story.</p>
        </div>

        <span className="pl-giant" aria-hidden="true">FLOW</span>
        <div className="pl-layout">
        <aside className="pl-side pl-reveal" aria-live="polite">
          <span className="pl-bigno-view" aria-hidden="true">
            <span className="pl-bigno-strip" style={{ transform: `translateY(-${current}em)` }}>
              {products.map((product, index) => (
                <span key={product.slug}>{String(index + 1).padStart(2, '0')}</span>
              ))}
            </span>
          </span>
          <div key={current} className="pl-swap">
            <span className="pl-sidecat">{products[current].category}</span>
            <p className="pl-sideline">{products[current].line}</p>
          </div>
          <span className="pl-hint">OPEN THE FULL PAGE →</span>
        </aside>
        <div className="pl-wrap pl-reveal">
          <ol className="pl-list" ref={listRef}>
            {products.map((product, index) => (
              <li key={product.slug}>
                <a
                  className="pl-row"
                  href={`/products/${product.slug}`}
                  onMouseEnter={() => {
                    setCurrent(index);
                    setPreviewOn(true);
                  }}
                  onFocus={() => setCurrent(index)}
                >
                  <span className="pl-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="pl-name">{product.name}</span>
                  <span className="pl-cat">{product.category}</span>
                  <span className="pl-arrow" aria-hidden="true"><ArrowUpRight /></span>
                </a>
              </li>
            ))}
          </ol>
          <div
            className={`pl-preview ${previewOn ? 'is-on' : ''}`}
            ref={previewRef}
            aria-hidden="true"
          >
            {products.map((product, index) => (
              <img
                key={product.slug}
                src={product.image}
                alt=""
                width={640}
                height={480}
                loading="lazy"
                draggable={false}
                className={index === current ? 'is-on' : ''}
              />
            ))}
          </div>
        </div>
        </div>

        <p className="pl-end pl-reveal" aria-hidden="true"><span>CRIYX / 09</span><span>SELECT A PRODUCT FOR THE FULL STORY</span></p>
      </div>
    </section>
  );
}
