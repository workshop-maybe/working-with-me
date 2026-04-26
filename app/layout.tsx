import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Working with Me',
  description: 'A space to post Assignments, mark Commitments, and broadcast Connections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
