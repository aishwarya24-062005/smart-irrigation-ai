import type { Metadata, Viewport } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  title: 'Smart Farm PWA',
  description: 'AI-powered smart farming and irrigation',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}