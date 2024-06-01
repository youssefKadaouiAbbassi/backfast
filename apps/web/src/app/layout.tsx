import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'BackFast - Studio',
  description: 'BackFast - Studio',
};

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
