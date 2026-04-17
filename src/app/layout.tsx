
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { SessionProvider } from '@/lib/auth/session';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fleet Management AI',
  description: 'An AI-powered dashboard for fleet management.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "gravel")}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
