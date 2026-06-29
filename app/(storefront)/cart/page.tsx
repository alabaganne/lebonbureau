"use client";

/* Cart page — line items with live quantity/remove, sticky order summary,
   and an empty state. */

import Link from "next/link";
import { formatDT, photoImg } from "@/lib/data";
import { itemKey, useCart, type CartItem } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import Button from "@/components/Button";
import { ArrowLeftIcon, PlusIcon, TrashIcon, CartIcon, LockIcon } from "@/components/Icons";

export default function CartPage() {
  const { items, ready, qty, total, setItemQty, removeItem, clearCart } = useCart();
  const { toast } = useToast();

  const heading = qty > 0 ? `Mon panier · ${qty} article${qty > 1 ? "s" : ""}` : "Mon panier";

  function CartRow({ it }: { it: CartItem }) {
    const key = itemKey(it);
    const cat = it.categoryLabel || "Bureau";
    return (
      <div className="cart-row">
        <div className="cart-thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoImg(it.photo, it.name, 320, 240)} alt={it.name} />
        </div>
        <div className="cart-info">
          <div className="ci-cat">{cat}</div>
          <div className="ci-name">{it.name}</div>
          <div className="ci-meta">
            <span>Finition&nbsp;: <b>{it.color}</b></span>
            <span>Dimensions&nbsp;: <b>{it.size}</b></span>
          </div>
          <div className="ci-unit">{formatDT(it.price)} / l&apos;unité</div>
        </div>
        <div className="cart-right">
          <div className="cart-line-total">{formatDT(it.price * it.qty)}</div>
          <div className="cart-controls">
            <div className="qty sm">
              <button type="button" aria-label="Diminuer" onClick={() => setItemQty(key, it.qty - 1)}>–</button>
              <span>{it.qty}</span>
              <button type="button" aria-label="Augmenter" onClick={() => setItemQty(key, it.qty + 1)}>+</button>
            </div>
            <button
              className="remove-btn"
              onClick={() => {
                removeItem(key);
                toast(`${it.name} retiré du panier`);
              }}
            >
              <TrashIcon size={15} />
              Retirer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="wrap page-head">
        <Link className="back-link" href="/#catalogue">
          <ArrowLeftIcon size={16} />
          Continuer mes achats
        </Link>
        <span className="eyebrow">Votre panier</span>
        <h1>{heading}</h1>
      </div>

      {!ready ? (
        <main className="wrap" style={{ minHeight: 240 }} />
      ) : items.length === 0 ? (
        <main className="wrap" style={{ paddingBottom: 80 }}>
          <div className="empty">
            <div className="ic"><CartIcon size={28} strokeWidth={1.6} /></div>
            <h2>Votre panier est vide</h2>
            <p>
              Parcourez notre sélection de bureaux ergonomiques et trouvez celui qui tiendra la
              distance.
            </p>
            <Button href="/#catalogue" variant="primary" size="lg">Voir le catalogue</Button>
          </div>
        </main>
      ) : (
        <main className="wrap shop-grid">
          <div>
            <div className="cart-items">
              {items.map((it) => (
                <CartRow key={itemKey(it)} it={it} />
              ))}
            </div>
            <div className="cart-foot-actions">
              <Link className="back-link" href="/#catalogue" style={{ margin: 0 }}>
                <PlusIcon size={16} />
                Ajouter un autre bureau
              </Link>
              <button
                className="remove-btn"
                style={{ fontSize: 13.5 }}
                onClick={() => {
                  clearCart();
                  toast("Panier vidé");
                }}
              >
                Vider le panier
              </button>
            </div>
          </div>

          <aside className="summary">
            <h3>Récapitulatif</h3>
            <div className="summary-line">
              <span>Sous-total</span>
              <span className="v">{formatDT(total)}</span>
            </div>
            <div className="summary-line">
              <span>Livraison <span style={{ color: "var(--ink-faint)" }}>· Tunisie</span></span>
              <span className="free">Gratuite</span>
            </div>
            <hr className="summary-rule" />
            <div className="summary-total">
              <span className="l">Total</span>
              <span className="t">{formatDT(total)}</span>
            </div>
            <Button href="/checkout" variant="primary" size="lg" block>Passer la commande</Button>
            <p className="summary-note">
              <LockIcon size={15} />
              Paiement à la livraison ou par carte. Vos données restent confidentielles.
            </p>
          </aside>
        </main>
      )}
    </>
  );
}
