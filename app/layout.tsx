import "./globals.css";

import type { Metadata } from "next";
import { CartProvider } from "@/lib/cart";
import { ToastProvider } from "@/lib/toast";

export const metadata: Metadata = {
  title: {
    default: "LeBonBureau — Bureaux ergonomiques pour le gaming et le code",
    template: "%s — LeBonBureau",
  },
  description:
    "La sélection tunisienne de bureaux ergonomiques pour gamers, développeurs et créatifs exigeants. Livraison offerte partout en Tunisie, paiement à la livraison.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
