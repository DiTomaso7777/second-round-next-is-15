import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
import { ShoppingCartProvider } from './context/ShoppingCartContext';

export const metadata: Metadata = {
  title: "Second Round",
  description: "Refurbished and reimagined",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ShoppingCartProvider>
        <html lang="en">
          <body>
            <Header />
            {children}
          </body>
        </html>
      </ShoppingCartProvider>
    </ClerkProvider>
  );
}