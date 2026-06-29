"use client";

/* LeBonBureau — sticky storefront navigation with a live cart counter. */

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { CartIcon } from "./Icons";

export default function SiteHeader() {
  const { qty, ready } = useCart();

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link className="brand" href="/">
          Le<span className="dot">Bon</span>Bureau<span className="dot">.</span>
        </Link>
        <nav className="nav-links">
          <Link href="/#catalogue">Catalogue</Link>
          <Link href="/#ergonomie">Ergonomie</Link>
          <Link href="/#engagements">Nos engagements</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="nav-actions">
          <Link className="cart-btn" href="/cart" aria-label="Panier">
            <CartIcon size={17} />
            Panier
            <span className="cart-count">{ready ? qty : 0}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
