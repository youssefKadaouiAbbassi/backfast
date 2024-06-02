import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

export const metadata = {
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
