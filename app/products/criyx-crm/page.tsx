import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';

export const metadata: Metadata = {
  title: 'Criyx CRM — Criyx',
  description: 'Contacts, conversations, opportunities and next actions in one place. Know the whole customer story.',
};

export default function CriyxCrmPage() {
  return <ProductPage slug="criyx-crm" />;
}
