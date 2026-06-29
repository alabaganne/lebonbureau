"use client";

/* LeBonBureau — sticky storefront navigation with a live cart counter. */

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { CartIcon } from "./Icons";

export default function SiteHeader() {
  const { qty, ready } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[rgba(255,255,255,.82)] backdrop-blur-[14px] backdrop-saturate-[1.4] border-b border-line">
      <div className="wrap flex items-center justify-between h-[70px]">
        <Link
          className="inline-flex items-baseline gap-0.5 font-serif text-[23px] font-semibold tracking-[-.02em]"
          href="/"
        >
          Le<span className="text-green">Bon</span>Bureau<span className="text-green">.</span>
        </Link>
        <nav className="flex gap-[34px] items-center max-[860px]:hidden">
          <Link
            className="text-[15px] font-medium text-ink-soft transition-colors duration-150 ease-[ease] hover:text-ink"
            href="/#catalogue"
          >
            Catalogue
          </Link>
          <Link
            className="text-[15px] font-medium text-ink-soft transition-colors duration-150 ease-[ease] hover:text-ink"
            href="/#ergonomie"
          >
            Ergonomie
          </Link>
          <Link
            className="text-[15px] font-medium text-ink-soft transition-colors duration-150 ease-[ease] hover:text-ink"
            href="/#engagements"
          >
            Nos engagements
          </Link>
          <Link
            className="text-[15px] font-medium text-ink-soft transition-colors duration-150 ease-[ease] hover:text-ink"
            href="/#contact"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-[14px]">
          <Link
            className="relative inline-flex items-center gap-[9px] border border-line bg-white rounded-full py-[9px] pr-4 pl-[14px] font-semibold text-[14px] transition-colors duration-150 ease-[ease] hover:border-ink"
            href="/cart"
            aria-label="Panier"
          >
            <CartIcon size={17} />
            Panier
            <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-green text-white text-[12px] font-bold inline-flex items-center justify-center">
              {ready ? qty : 0}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
