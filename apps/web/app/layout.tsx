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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: 'AlterAges — Quand la jeunesse prend soin de la sagesse',
    template: '%s · AlterAges',
  },
  description:
    'AlterAges met en relation des étudiants du médico-social formés avec des personnes âgées, pour un accompagnement à domicile humain, transparent et de confiance. Lyon, lancement septembre 2026.',
  metadataBase: new URL(SITE_URL),
  applicationName: 'AlterAges',
  keywords: [
    'AlterAges',
    'alter ages',
    'aide à domicile',
    'aide à domicile Lyon',
    'auxiliaire de vie',
    'accompagnement personnes âgées',
    'étudiants médico-social',
    'maintien à domicile',
    'service à la personne Lyon',
    'SAP Lyon',
  ],
  authors: [{ name: 'Faustine Sornay' }],
  creator: 'AlterAges',
  publisher: 'AlterAges',
  category: 'health',
  alternates: {
    canonical: '/',
  },
  /* Déclaration explicite des icônes pour les crawlers (Google,
   * Bing) et les contextes spécifiques (Safari iOS, écran d'accueil).
   * `app/icon.png` et `app/apple-icon.png` sont auto-servis par
   * Next.js — la déclaration ici garantit les <link rel> dans le HTML. */
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '512x512' }],
    apple: [{ url: '/apple-icon.png', sizes: '512x512' }],
    shortcut: '/icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'AlterAges',
    title: 'AlterAges — Quand la jeunesse prend soin de la sagesse',
    description:
      'Aide à domicile à Lyon assurée par des étudiants du médico-social, formés et engagés. Lancement septembre 2026.',
    images: [
      {
        url: '/images/image-principale.png',
        width: 1200,
        height: 630,
        alt: 'AlterAges — accompagnement à domicile par des étudiants formés',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlterAges — Quand la jeunesse prend soin de la sagesse',
    description:
      'Aide à domicile à Lyon assurée par des étudiants du médico-social, formés et engagés.',
    images: ['/images/image-principale.png'],
  },
  verification: {
    // À remplir après création du compte Google Search Console
    // google: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen font-sans font-light leading-relaxed antialiased">
        {children}
      </body>
    </html>
  );
}
