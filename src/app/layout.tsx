import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto(
  {  weight: '400',
    subsets: ['latin'],
    display: 'swap'
  }
);

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Generate short URLs for your long URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
