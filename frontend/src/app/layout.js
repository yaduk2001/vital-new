import './globals.css';
import BackToTop from '../components/BackToTop';
import { AuthProvider } from '../contexts/AuthContext';
import FuturisticBackground from '../components/FuturisticBackground';

export const metadata = {
  title: 'Supe AI - Intelligent AI Solutions',
  description: 'Empowering businesses with intelligent AI solutions that transform the way you work, communicate, and innovate in the digital age.',
  keywords: 'AI, artificial intelligence, automation, machine learning, business solutions',
  authors: [{ name: 'Supe AI Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Supe AI - Intelligent AI Solutions',
    description: 'Empowering businesses with intelligent AI solutions',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supe AI - Intelligent AI Solutions',
    description: 'Empowering businesses with intelligent AI solutions',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/images/logo2.svg" type="image/svg+xml" />
      </head>
      <body className="bg-gradient-primary font-sans antialiased relative overflow-x-hidden">
        <AuthProvider>
          <div className="min-h-screen relative">
            <FuturisticBackground className="z-0" />
            <div className="relative z-10">
              {children}
            </div>
          </div>
          <BackToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
