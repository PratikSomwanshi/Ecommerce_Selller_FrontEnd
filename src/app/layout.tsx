import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/leftNavigation/Navigartion";
import NextUI from "@/components/NextUI/NextUI";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PratikMark | Seller Portal",
  description: "add product, manage orders, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUI>
          <Navigation />
          {children}
        </NextUI>
      </body>
    </html>
  );
}
