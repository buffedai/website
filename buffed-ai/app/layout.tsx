import '../styles/globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Buffed AI',
  description: 'AI agents & automation for the modern enterprise.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-indigo-50 to-white min-h-screen">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
            <Link href="/" className="font-bold text-2xl text-indigo-600">
              Buffed AI
            </Link>
            <nav>
              <Link href="/" className="mr-6 text-gray-700 hover:text-indigo-600">
                Home
              </Link>
              <Link href="/blog" className="mr-6 text-gray-700 hover:text-indigo-600">
                Blog
              </Link>
              <Link href="/podcast" className="text-gray-700 hover:text-indigo-600">
                Podcast
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 py-4 text-center text-gray-600">
          © {new Date().getFullYear()} Buffed AI. All Rights Reserved.
        </footer>
      </body>
    </html>
  );
}
