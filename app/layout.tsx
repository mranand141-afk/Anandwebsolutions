import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Anand Web Studio | Modern Web Development',
  description: 'Professional web development services, SEO optimized, and highly responsive.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-[#050505] text-white antialiased selection:bg-blue-600/30 selection:text-blue-200`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
