import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';

import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AlterAges — Quand la jeunesse prend soin de la sagesse',
    template: '%s · AlterAges',
  },
  description:
    "AlterAges met en relation des étudiants du médico-social formés avec des personnes âgées, pour un accompagnement à domicile humain, transparent et de confiance. Lyon, lancement septembre 2026.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans font-light leading-relaxed text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
