import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';

export const metadata: Metadata = {
  title: 'Voice Agents — Criyx',
  description: 'AI voice agents that answer, qualify and route every call. Every call, a clearer next step.',
};

export default function VoiceAgentsPage() {
  return <ProductPage slug="voice-agents" />;
}
