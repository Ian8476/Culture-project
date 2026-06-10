import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Fraunces, Albert_Sans } from 'next/font/google';
import { AuthProvider } from '@/shared/context/AuthProvider';
import { APP_NAME, APP_DESCRIPTION } from '@/shared/constants/app.constants';
import '@/styles/globals.css';

// Serif editorial con carácter para titulares.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

// Sans humanista y legible para cuerpo de texto.
const albertSans = Albert_Sans({
  variable: '--font-albert',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${albertSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
