import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';

export const metadata: Metadata = {
  title: 'Avatar Cloning — Criyx',
  description: 'Bring an avatar, voice and script together in a reviewable video workspace.',
};

export default function AvatarCloningPage() {
  return <ProductPage slug="avatar-cloning" />;
}
