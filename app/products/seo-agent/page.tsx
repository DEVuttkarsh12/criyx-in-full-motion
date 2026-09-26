import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';

export const metadata: Metadata = {
  title: 'SEO Agent — Criyx',
  description: 'Turn site checks and research into a prioritised plan for better visibility.',
};

export default function SeoAgentPage() {
  return <ProductPage slug="seo-agent" />;
}
