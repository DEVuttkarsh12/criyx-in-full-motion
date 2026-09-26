'use client';

import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import PpHeader from '@/components/pp-header';
import { getProduct, neighbours, products } from '@/lib/products';

const discoveryCall = 'https://cal.com/criyx.ai/discovery-call';
const contactEmail = 'mailto:info@criyx.com?subject=Project%20enquiry%20for%20Criyx';

export default function ProductPage({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) {
    return (
      <main className="pp">
        <div className="pp-shell">
          <h1>Product not found</h1>
          <a href="/#products">Back to all products</a>
        </div>
      </main>
    );
  }
  const { prev, next } = neighbours(slug);
  const position = `${String(Math.max(0, products.findIndex(item => item.slug === slug)) + 1).padStart(2, '0')} / 09`;

  return (
    <>
      <PpHeader />

      <main className="pp">
        <section className="pp-hero">
          <div className="pp-shell">
            <p className="pp-crumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/#products">Products</a><span aria-hidden="true">/</span><span>{product.name}</span></p>
            <p className="pp-eyebrow">{product.category.toUpperCase()} / {position}</p>
            <h1>{product.name}</h1>
            <p className="pp-line">{product.line}</p>
            <p className="pp-desc">{product.description}</p>
            <div className="pp-actions">
              <a className="pp-primary" href={discoveryCall} target="_blank" rel="noreferrer">
                Book a discovery call <ArrowUpRight size={16} />
              </a>
              <a className="pp-mail" href={contactEmail}>info@criyx.com <ArrowRight size={15} /></a>
            </div>
          </div>
          <div className="pp-hero-media">
            <img src={product.image} alt={product.alt} width={1600} height={900} loading="eager" />
          </div>
        </section>

        <section className="pp-features">
          <div className="pp-shell">
            <p className="pp-eyebrow">WHAT&apos;S INSIDE</p>
            <ul>
              {product.features.map((feature, index) => (
                <li key={feature}><span className="pp-feat-num">{String(index + 1).padStart(2, '0')}</span><Check size={17} />{feature}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pp-outcome">
          <div className="pp-shell">
            <p className="pp-eyebrow">THE OUTCOME</p>
            <p className="pp-outcome-line">{product.outcome}</p>
          </div>
        </section>

        <section className="pp-ctaband">
          <div className="pp-shell">
            <h2>Want this working<br />for your business?</h2>
            <p>Bring us the workflow slowing you down — we will map the fastest route to value.</p>
            <div className="pp-actions">
              <a className="pp-primary" href={discoveryCall} target="_blank" rel="noreferrer">
                Book a discovery call <ArrowUpRight size={16} />
              </a>
              <a className="pp-mail" href={contactEmail}>info@criyx.com <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <nav className="pp-pager" aria-label="More products">
          <a className="pp-page" href={`/products/${prev.slug}`}>
            <span><ArrowLeft size={16} /> Previous</span>
            <strong>{prev.name}</strong>
          </a>
          <a className="pp-page pp-page--next" href={`/products/${next.slug}`}>
            <span>Next <ArrowRight size={16} /></span>
            <strong>{next.name}</strong>
          </a>
        </nav>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div><a className="brand-lockup" href="/" aria-label="Criyx home"><span className="brand-icon" aria-hidden="true" /><span>criyx</span></a><p>AI automation + custom software<br />for intelligent operations.</p></div>
          <nav aria-label="Footer navigation">
            <span>EXPLORE</span>
            <a href="/#products">Products</a>
            <a href="/#work">Solutions</a>
            <a href="/#approach">Approach</a>
            <a href="/#about">About</a>
          </nav>
          <div className="footer-contact"><span>START A CONVERSATION</span><a href={contactEmail}>info@criyx.com <ArrowUpRight /></a><a href={discoveryCall} target="_blank" rel="noreferrer">Book a call <ArrowUpRight /></a></div>
          <a className="back-to-top" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top <ArrowUpRight /></a>
        </div>
        <div className="footer-bottom"><span>© 2026 CRIYX PRIVATE LIMITED</span><span>PANCHKULA, HARYANA, INDIA</span><span>INTELLIGENCE, WITH INTENTION.</span></div>
      </footer>
    </>
  );
}
