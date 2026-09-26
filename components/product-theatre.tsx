'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ShaderBackground as MeshDrift } from '@/components/ui/mesh-drift';
import {
  ArrowRight, ArrowUpRight, AudioLines,
  Check, CircleCheck, Clapperboard, Code2, Headphones, MessageCircle,
  Mic2, PanelTop, Play, ScanLine, Search, Star, UserRound, Video,
} from 'lucide-react';

const products = [
  { id: 'voice', title: 'Voice Agents', category: 'Conversations', line: 'Every call, a clearer next step.', description: 'AI voice agents that answer, qualify and route inbound or outbound conversations.', icon: Headphones },
  { id: 'whatsapp', title: 'WhatsApp Agent', category: 'Conversations', line: 'Stay in the conversation.', description: 'A shared inbox for enquiries, thoughtful follow-ups and timely team handoffs.', icon: MessageCircle },
  { id: 'crm', title: 'Criyx CRM', category: 'Conversations', line: 'Know the whole customer story.', description: 'Keep contacts, conversations, opportunities and next actions in one place.', icon: PanelTop },
  { id: 'reviews', title: 'Review Automation', category: 'Growth', line: 'Make feedback easy to give.', description: 'Invite genuine reviews through a link or QR code, with a considerate follow-up.', icon: Star },
  { id: 'seo', title: 'SEO Agent', category: 'Growth', line: 'Find the work that matters.', description: 'Turn site checks and research into a prioritized plan for better visibility.', icon: Search },
  { id: 'event-leads', title: 'Card Collector', category: 'Growth', line: 'Keep the connection going.', description: 'Capture event contacts, preserve the conversation and assign a follow-up.', icon: ScanLine },
  { id: 'avatar', title: 'Avatar Cloning', category: 'Creation', line: 'Create with consistency.', description: 'Bring an avatar, voice and script together in a reviewable video workspace.', icon: Video },
  { id: 'video', title: 'Video Workflow', category: 'Creation', line: 'From brief to final cut.', description: 'Guide ideas through script, scenes, creation, approval and delivery.', icon: Clapperboard },
  { id: 'voice-api', title: 'Partner Voice API', category: 'Platform', line: 'Voice, built into your product.', description: 'A partner layer for agencies and platforms creating their own voice experiences.', icon: Code2 },
] as const;

function ProductVisual({ id }: { id: typeof products[number]['id'] }) {
  switch (id) {
    case 'voice': return <div className="pr-art pr-art-voice">
      <div className="pr-art-label"><span className="pr-status-dot"/> CALL CONNECTED</div>
      <div className="pr-voice-pulse"><AudioLines size={32} strokeWidth={1.4}/></div>
      <div className="pr-wave">{[17,33,49,26,67,44,78,38,57,84,53,29,63,39,72,46,24,58,34,18].map((height,index)=><i key={index} style={{'--height':`${height}%`,'--delay':`${index*-.065}s`} as CSSProperties}/>)}</div>
      <div className="pr-voice-transcript"><span>LIVE TRANSCRIPT</span><p>“I’d like to book a visit.”</p><div><Check size={13}/> Booking intent recognised</div></div>
      <div className="pr-art-result"><CircleCheck size={15}/> Intent captured <ArrowRight size={14}/> Next step</div>
    </div>;
    case 'whatsapp': return <div className="pr-art pr-art-chat">
      <div className="pr-chat-top"><span className="pr-chat-avatar">C</span><span>New enquiry<small>Conversation open</small></span><MessageCircle size={19}/></div>
      <div className="pr-chat-line pr-chat-in">Can I book a visit?</div>
      <div className="pr-chat-line pr-chat-out">Of course. What day works for you?</div>
      <div className="pr-chat-line pr-chat-in pr-chat-third">Thursday afternoon works.</div>
      <div className="pr-chat-foot"><CircleCheck size={14}/> Ready for team handoff <ArrowRight size={14}/></div>
    </div>;
    case 'crm': return <div className="pr-art pr-art-crm">
      <div className="pr-crm-top">Customer journey <span>ALL IN ONE PLACE</span></div>
      <div className="pr-crm-columns">{[['New','Enquiry'],['In progress','Qualified'],['Next','Visit booked']].map(([label,item],index)=><div className="pr-crm-column" key={label}><span>{label}</span><div><b>{item}</b><small>{index===0?'Captured':index===1?'In conversation':'Assigned'}</small></div></div>)}</div>
      <div className="pr-crm-path"><i/><i/><i/></div>
    </div>;
    case 'reviews': return <div className="pr-art pr-art-reviews">
      <div className="pr-review-sheet"><span>YOUR EXPERIENCE</span><strong>How did we do?</strong><p>We’d love to hear from you.</p><div className="pr-stars">{Array.from({length:5},(_,index)=><Star key={index} size={24} fill="currentColor" strokeWidth={1}/>)}</div><div className="pr-review-action">Leave a review <ArrowUpRight size={15}/></div></div>
      <div className="pr-review-link"><Check size={14}/> Link or QR</div>
    </div>;
    case 'seo': return <div className="pr-art pr-art-seo">
      <div className="pr-seo-top"><Search size={18}/> Site audit <span>PRIORITIES</span></div>
      <div className="pr-seo-item"><b>01</b><span>Page titles</span><i style={{width:'78%'}}/></div>
      <div className="pr-seo-item"><b>02</b><span>Content depth</span><i style={{width:'58%'}}/></div>
      <div className="pr-seo-item"><b>03</b><span>Internal links</span><i style={{width:'42%'}}/></div>
      <div className="pr-seo-foot">AUDIT <ArrowRight size={14}/> ACTION PLAN</div>
    </div>;
    case 'event-leads': return <div className="pr-art pr-art-cards">
      <div className="pr-business-card"><span>NEW CONNECTION</span><strong>Let’s keep talking.</strong><small>Contact · Company · Notes</small><div className="pr-scan-line"/></div>
      <div className="pr-card-arrow"><ArrowRight size={20}/></div>
      <div className="pr-capture"><CircleCheck size={17}/><span>Captured<small>Follow-up assigned</small></span></div>
    </div>;
    case 'avatar': return <div className="pr-art pr-art-avatar">
      <div className="pr-avatar-player"><div className="pr-avatar-circle"><UserRound size={45} strokeWidth={.85}/></div><span className="pr-avatar-play"><Play size={17} fill="currentColor"/></span></div>
      <div className="pr-avatar-side"><span>PROJECT ELEMENTS</span><div><UserRound size={15}/> Avatar <Check size={13}/></div><div><Mic2 size={15}/> Voice <Check size={13}/></div><div><span>Aa</span> Script <Check size={13}/></div></div>
    </div>;
    case 'video': return <div className="pr-art pr-art-video">
      <div className="pr-video-preview"><Play size={20} fill="currentColor"/></div>
      <div className="pr-timeline"><span>PRODUCTION TIMELINE</span><div className="pr-scene-blocks"><i>Brief</i><i>Script</i><i>Scenes</i><i>Review</i></div><div className="pr-audio-line">{Array.from({length:24},(_,index)=><b key={index} style={{height:`${24+(index*19%55)}%`}}/>)}</div></div>
    </div>;
    case 'voice-api': return <div className="pr-art pr-art-api">
      <div className="pr-api-top"><Code2 size={18}/> Partner Voice API <span>CONNECTED</span></div>
      <div className="pr-api-code"><div><em>POST</em> /v1/voice/agents</div><div>{'{'}</div><div>&nbsp;&nbsp;<span>&quot;voice&quot;</span>: &quot;configured&quot;,</div><div>&nbsp;&nbsp;<span>&quot;handoff&quot;</span>: true</div><div>{'}'}</div></div>
      <div className="pr-api-foot">CONFIGURE <ArrowRight size={14}/> CONNECT <ArrowRight size={14}/> SCALE</div>
    </div>;
  }
}

export default function ProductTheatre() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [currentProduct, setCurrentProduct] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const indicator = progressRef.current;
    if (!section || !viewport || !track || !indicator) return;

    let travel = 0;
    let pinDistance = 1;
    let frame = 0;
    let previousIndex = -1;
    let narrow = false;

    const render = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / pinDistance));
      // Brief rests let one product remain readable between movements on narrow screens.
      const steps = products.length - 1;
      const stepPosition = progress * steps;
      const whole = Math.floor(stepPosition);
      const transition = Math.min(1, Math.max(0, ((stepPosition - whole) - .18) / .64));
      const eased = transition * transition * (3 - 2 * transition);
      const visualProgress = narrow ? Math.min(1, (whole + eased) / steps) : progress;
      const offset = visualProgress * travel;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      indicator.style.transform = `scaleX(${visualProgress})`;

      const index = Math.min(products.length - 1, Math.max(0, Math.round(visualProgress * steps)));
      if (index !== previousIndex) {
        previousIndex = index;
        setCurrentProduct(index + 1);
        track.querySelectorAll<HTMLElement>('.pr-card').forEach((item, i) => {
          item.classList.toggle('is-current', i === index);
        });
      }
    };

    const requestRender = () => { if (!frame) frame = requestAnimationFrame(render); };
    const measure = () => {
      narrow = window.innerWidth <= 680;
      travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      // Cover the product line in a few viewports even with the larger cards.
      pinDistance = Math.max(1, travel / 1.8);
      section.style.height = `${window.innerHeight + pinDistance}px`;
      requestRender();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', requestRender, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', requestRender);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <section className="product-theatre" id="systems" ref={sectionRef} aria-labelledby="products-heading">
    <div className="pr-sticky">
    <div className="pr-atmosphere" aria-hidden="true"><MeshDrift className="pr-mesh" /></div>
    <div className="pr-shell">
      <div className="pr-section-label"><span>01</span><span>THE CRIYX PRODUCT LINE</span></div>
      <div className="pr-heading"><h2 id="products-heading">Built to work.<br/><em>Better together.</em></h2><p>From the first conversation to the final deliverable, Criyx products give the work a clearer path forward.</p></div>
      <div className="pr-rail-heading"><span>EXPLORE THE PRODUCTS <span className="pr-rail-count">/ 09</span></span><span className="pr-scroll-cue">SCROLL TO EXPLORE <ArrowRight size={16}/></span></div>
      <div className="pr-viewport" ref={viewportRef} aria-label="Criyx product line">
      <div className="pr-track" ref={trackRef}>
        {products.map((product,index)=><article className="pr-card" key={product.id}>
          <div className="pr-card-meta"><span className="pr-icon"><product.icon size={17} strokeWidth={1.65}/></span><span>{product.category}</span><span className="pr-card-number">{String(index+1).padStart(2,'0')}</span></div>
          <ProductVisual id={product.id}/>
          <div className="pr-card-copy"><h3>{product.title}</h3><p className="pr-card-line">{product.line}</p><p className="pr-card-description">{product.description}</p></div>
        </article>)}
      </div>
      </div>
      <div className="pr-after-rail"><div className="pr-progress-track" aria-hidden="true"><span ref={progressRef}/></div><span className="pr-progress-count"><b>{String(currentProduct).padStart(2,'0')}</b> / 09</span></div>
    </div>
    </div>
  </section>;
}
