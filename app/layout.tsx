import type { Metadata } from 'next';
import { Geist, Newsreader, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const newsreader = Newsreader({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

const plex = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Working with me',
  description: 'A space to post Assignments, mark Commitments, and broadcast Connections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${newsreader.variable} ${plex.variable}`}>
      <body className="bg-paper text-ink">{children}</body>
    </html>
  );
}
