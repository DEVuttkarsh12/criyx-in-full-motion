import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';

export const metadata: Metadata = {
  title: 'Card Collector — Criyx',
  description: 'Capture event contacts, preserve the conversation and assign a follow-up.',
};

export default function CardCollectorPage() {
  return <ProductPage slug="card-collector" />;
}
