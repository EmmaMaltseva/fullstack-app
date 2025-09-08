import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PShop",
  description: "Интернет магазин аксессуаров для PlayStation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} h-full bg-white`} lang="en">
      <body className={`h-full font-sans antialiased`}>{children}</body>
    </html>
  );
}
