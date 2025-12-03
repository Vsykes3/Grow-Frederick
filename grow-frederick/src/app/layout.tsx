import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '/src/components/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GrowCommon - Smart Gardening Made Simple',
  description: 'The ultimate gardening companion with weather intelligence, plant care, and pest alerts. Grow smarter with GrowCommon.',
  keywords: 'gardening, plants, weather, pest alerts, planting calendar, garden planning',
  authors: [{ name: 'GrowCommon Team' }],
  openGraph: {
    title: 'GrowCommon - Smart Gardening Made Simple',
    description: 'The ultimate gardening companion with weather intelligence, plant care, and pest alerts.',
    type: 'website',
    locale: 'en_US',
    siteName: 'GrowCommon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowCommon - Smart Gardening Made Simple',
    description: 'The ultimate gardening companion with weather intelligence, plant care, and pest alerts.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-35035ZREXH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-35035ZREXH');
          `}
        </Script>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

