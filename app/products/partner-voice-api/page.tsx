import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';

export const metadata: Metadata = {
  title: 'Partner Voice API — Criyx',
  description: 'A partner layer for agencies and platforms creating their own voice experiences.',
};

export default function PartnerVoiceApiPage() {
  return <ProductPage slug="partner-voice-api" />;
}
