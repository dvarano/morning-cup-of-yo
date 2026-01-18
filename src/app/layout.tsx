import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Morning Cup of Yo',
  description: 'Your daily dose of meme wisdom. Start your day with a smile!',
  keywords: ['memes', 'daily meme', 'funny', 'humor', 'morning'],
  authors: [{ name: 'Morning Cup of Yo' }],
  openGraph: {
    title: 'Morning Cup of Yo',
    description: 'Your daily dose of meme wisdom',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
