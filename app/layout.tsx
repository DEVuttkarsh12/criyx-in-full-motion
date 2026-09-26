import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif, Manrope } from 'next/font/google';
import './globals.css';
import './refinements.css';
import './flow-convergence.css';
import './product-showcase.css';
import './product-page.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://criyx-in-full-flow.criyx-ai.chatgpt.site'),
  title: 'Criyx — AI Automation & Custom Software',
  description: 'Criyx turns manual business operations into intelligent systems through AI agents, connected automation and purpose-built software.',
  icons: { icon: '/favicon.svg' },
  openGraph: { title: 'Criyx — AI Automation & Custom Software', description: 'Turn manual business operations into intelligent systems.', type: 'website', siteName: 'Criyx', url: 'https://criyx-in-full-flow.criyx-ai.chatgpt.site', images: [{ url: 'https://criyx-in-full-flow.criyx-ai.chatgpt.site/og.png', alt: 'Criyx — Your business. In full flow.' }] },
  twitter: { card: 'summary_large_image', title: 'Criyx — AI Automation & Custom Software', description: 'Turn manual business operations into intelligent systems.', images: ['https://criyx-in-full-flow.criyx-ai.chatgpt.site/og.png'] },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${geistMono.variable} ${instrumentSerif.variable} ${geist.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
