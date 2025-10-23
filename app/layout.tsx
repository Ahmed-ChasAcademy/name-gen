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