// app/layout.tsx
import type { Metadata } from 'next';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SavedNames from './components/SavedNames/SavedNames';
import { NameProvider } from './contexts/NameContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fantasy Name Generator',
  description: 'Discover thousands of fantasy names for characters, creatures, and worlds.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-15X783ZGB3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-15X783ZGB3');
            `
          }}
        />
        
        {/* AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9301068184242972"
        />
      </head>
      <body>
        <NameProvider>
          <Header />
          <main>{children}</main>
          <SavedNames />
          <Footer />
        </NameProvider>
      </body>
    </html>
  );
}