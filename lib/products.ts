import {
  Clapperboard,
  Code2,
  Headphones,
  MessageCircle,
  PanelTop,
  ScanLine,
  Search,
  Star,
  Video,
  type LucideIcon,
} from 'lucide-react';

export type Product = {
  slug: string;
  name: string;
  category: string;
  line: string;
  description: string;
  image: string;
  alt: string;
  icon: LucideIcon;
  features: [string, string, string, string];
  outcome: string;
};

export const products: Product[] = [
  {
    slug: 'voice-agents',
    name: 'Voice Agents',
    category: 'Conversations',
    line: 'Every call, a clearer next step.',
    description: 'AI voice agents that answer, qualify and route inbound or outbound conversations — so no enquiry waits on hold.',
    image: '/products/voice.jpg',
    alt: 'Studio microphone',
    icon: Headphones,
    features: [
      'Answers every inbound call instantly',
      'Qualifies intent and routes to the right next step',
      'Live transcripts with booking intent recognised',
      'Hands off to your team with full context',
    ],
    outcome: 'Every call ends with a clear next step.',
  },
  {
    slug: 'whatsapp-agent',
    name: 'WhatsApp Agent',
    category: 'Conversations',
    line: 'Stay in the conversation.',
    description: 'A shared inbox for enquiries, thoughtful follow-ups and timely team handoffs, right where your customers already are.',
    image: '/products/whatsapp.jpg',
    alt: 'Phone with messaging apps',
    icon: MessageCircle,
    features: [
      'A shared inbox the whole team can work',
      'Thoughtful automatic follow-ups',
      'Conversation summaries for clean handoffs',
      'Plays well with Voice Agents and the CRM',
    ],
    outcome: 'No enquiry goes quiet.',
  },
  {
    slug: 'criyx-crm',
    name: 'Criyx CRM',
    category: 'Conversations',
    line: 'Know the whole customer story.',
    description: 'Contacts, conversations, opportunities and next actions in one place — the memory behind every Criyx product.',
    image: '/products/crm.jpg',
    alt: 'Customer analytics dashboard',
    icon: PanelTop,
    features: [
      'Contacts, conversations and pipeline in one place',
      'Every interaction remembered automatically',
      'Next actions surfaced before things slip',
      'The memory behind every Criyx product',
    ],
    outcome: 'Know the whole customer story.',
  },
  {
    slug: 'review-automation',
    name: 'Review Automation',
    category: 'Growth',
    line: 'Make feedback easy to give.',
    description: 'Invite genuine reviews through a link or QR code, with a considerate follow-up that never feels pushy.',
    image: '/products/reviews.jpg',
    alt: 'Happy customer sharing feedback',
    icon: Star,
    features: [
      'Review invites by link or QR code',
      'Considerate follow-ups that never pressure',
      'Genuine reviews from real customers',
      'A reputation that compounds',
    ],
    outcome: 'Make feedback easy to give.',
  },
  {
    slug: 'seo-agent',
    name: 'SEO Agent',
    category: 'Growth',
    line: 'Find the work that matters.',
    description: 'Turn site checks and research into a prioritised plan for better visibility — then keep it improving.',
    image: '/products/seo.jpg',
    alt: 'Marketing analytics at work',
    icon: Search,
    features: [
      'Full site audits without the busywork',
      'Research distilled into clear priorities',
      'A roadmap ordered by impact',
      'Visibility that keeps compounding',
    ],
    outcome: 'Find the work that matters.',
  },
  {
    slug: 'card-collector',
    name: 'Card Collector',
    category: 'Growth',
    line: 'Keep the connection going.',
    description: 'Capture event contacts, preserve the conversation and assign a follow-up before the moment goes cold.',
    image: '/products/event.jpg',
    alt: 'Event audience',
    icon: ScanLine,
    features: [
      'One-tap capture at events and exhibitions',
      'Conversation context preserved',
      'Follow-ups assigned on the spot',
      'From handshake to pipeline in days',
    ],
    outcome: 'Keep the connection going.',
  },
  {
    slug: 'avatar-cloning',
    name: 'Avatar Cloning',
    category: 'Creation',
    line: 'Create with consistency.',
    description: 'Bring an avatar, voice and script together in a reviewable video workspace — on-brand, every time.',
    image: '/products/avatar.jpg',
    alt: 'Avatar portrait',
    icon: Video,
    features: [
      'A consistent avatar, voice and script',
      'A reviewable workspace before anything ships',
      'On-brand in every render',
      'Video output without shoot days',
    ],
    outcome: 'Create with consistency.',
  },
  {
    slug: 'video-workflow',
    name: 'Video Workflow',
    category: 'Creation',
    line: 'From brief to final cut.',
    description: 'Guide ideas through script, scenes, creation, approval and delivery without the usual chaos.',
    image: '/products/video.jpg',
    alt: 'Video production',
    icon: Clapperboard,
    features: [
      'Brief-to-delivery in one pipeline',
      'Script, scenes, creation and approvals',
      'Review loops without the chaos',
      'Final cut, delivered',
    ],
    outcome: 'From brief to final cut.',
  },
  {
    slug: 'partner-voice-api',
    name: 'Partner Voice API',
    category: 'Platform',
    line: 'Voice, built into your product.',
    description: 'A partner layer for agencies and platforms creating their own voice experiences on Criyx infrastructure.',
    image: '/products/api.jpg',
    alt: 'Code on a screen',
    icon: Code2,
    features: [
      'Voice infrastructure for your own product',
      'Configure once, scale everywhere',
      'Built for agencies and platforms',
      'Runs on the proven Criyx stack',
    ],
    outcome: 'Voice, built into your product.',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function neighbours(slug: string): { prev: Product; next: Product } {
  const index = products.findIndex(product => product.slug === slug);
  const safe = index < 0 ? 0 : index;
  return {
    prev: products[(safe + products.length - 1) % products.length],
    next: products[(safe + 1) % products.length],
  };
}
