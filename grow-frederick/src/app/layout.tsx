import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import AuthProvider from '@/components/providers/AuthProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { AuthProviderWrapper } from '@/components/auth/AuthProviderWrapper';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GrowCommon - Smart Gardening Made Simple',
  description: 'The ultimate gardening companion with weather intelligence, plant care, and pest alerts. Optimized for Frederick County (Zone 6b–7a).',
  keywords: 'gardening, plants, weather, pest alerts, planting calendar, garden planning, Frederick County, Maryland, Zone 6b, Zone 7a',
  authors: [{ name: 'GrowCommon Team' }],
  openGraph: {
    title: 'GrowCommon - Smart Gardening Made Simple',
    description: 'The ultimate gardening companion with weather intelligence, plant care, and pest alerts. Optimized for Frederick County.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/GrowCommon.png" />
        <link rel="apple-touch-icon" href="/GrowCommon.png" />
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
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              enableColorScheme
            >
              <UserProvider>
                <AuthProviderWrapper>
                  <div className="min-h-screen bg-background flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                      {children}
                    </main>
                    <Footer />
                  </div>
                  <Toaster position="top-right" />
                </AuthProviderWrapper>
              </UserProvider>
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
