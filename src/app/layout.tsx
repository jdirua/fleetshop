
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { UserProvider } from '@/context/UserContext';

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
  // The root layout is a client component and cannot fetch server-side data directly.
  // The UserProvider will be populated with the user data within a server component further down the tree (e.g., in the dashboard layout).
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <UserProvider user={null}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
