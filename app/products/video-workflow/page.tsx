import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';

export const metadata: Metadata = {
  title: 'Video Workflow — Criyx',
  description: 'Guide ideas through script, scenes, creation, approval and delivery.',
};

export default function VideoWorkflowPage() {
  return <ProductPage slug="video-workflow" />;
}
