import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-stone-200 bg-stone-900 py-12 text-stone-400">
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                <div>
                  <span className="text-lg font-semibold tracking-tight text-white">
                    VELO<span className="text-emerald-400">BIKE</span>
                  </span>
                  <p className="mt-1 text-sm">Premium cycling & wellness gear</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  HSA/FSA reimbursement powered by VeloMED
                </div>
              </div>
              <div className="mt-8 border-t border-stone-800 pt-6 text-center text-xs text-stone-500">
                © 2026 VELOBIKE · Demo Store · All test-mode transactions
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
