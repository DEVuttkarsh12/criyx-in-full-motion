import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';

export const metadata: Metadata = {
  title: 'WhatsApp Agent — Criyx',
  description: 'A shared inbox for enquiries, thoughtful follow-ups and timely team handoffs on WhatsApp.',
};

export default function WhatsAppAgentPage() {
  return <ProductPage slug="whatsapp-agent" />;
}
