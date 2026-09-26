import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';

export const metadata: Metadata = {
  title: 'Review Automation — Criyx',
  description: 'Invite genuine reviews through a link or QR code, with a considerate follow-up.',
};

export default function ReviewAutomationPage() {
  return <ProductPage slug="review-automation" />;
}
