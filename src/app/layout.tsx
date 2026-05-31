import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VELOBIKE — Premium Cycling & Wellness",
  description: "Premium bikes, GPS devices, supplements, and recovery tools. HSA/FSA eligible with VeloMED.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
            <p>© 2026 VELOBIKE · Demo Store</p>
            <p className="mt-1">HSA/FSA qualification powered by <span className="font-semibold text-emerald-600">VeloMED</span></p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
