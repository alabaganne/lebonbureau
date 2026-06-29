"use client";

/* Checkout — three-step delivery form (coordinates, address, payment) with a
   live order summary, validation, and an inline confirmation screen. */

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDT, GOVERNORATES, photoImg } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { makeOrderNum, saveOrder, type Order } from "@/lib/orders";
import Button from "@/components/Button";
import { ArrowLeftIcon, LockIcon, CheckBigIcon } from "@/components/Icons";

interface Confirmation {
  firstName: string;
  num: string;
  addr: string;
  phone: string;
  pay: string;
  itemsCount: number;
  total: number;
}

const REQUIRED = ["firstName", "lastName", "phone", "address", "city", "gov", "zip"] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, ready, qty, total, clearCart } = useCart();
  const { toast } = useToast();

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  // Empty cart → back to cart (unless we just confirmed an order).
  useEffect(() => {
    if (ready && items.length === 0 && !confirmation) router.replace("/cart");
  }, [ready, items.length, confirmation, router]);

  const err = (id: string): CSSProperties | undefined =>
    errors[id] ? { borderColor: "var(--clay)" } : undefined;
  const clearError = (id: string) => setErrors((e) => (e[id] ? { ...e, [id]: false } : e));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (id: string) =>
      (form.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
        .value;

    const next: Record<string, boolean> = {};
    let firstBad: string | null = null;
    REQUIRED.forEach((id) => {
      const bad = !get(id).trim();
      next[id] = bad;
      if (bad && !firstBad) firstBad = id;
    });

    const phoneDigits = get("phone").replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      next.phone = true;
      if (!firstBad) firstBad = "phone";
    }
    if (!/^\d{4}$/.test(get("zip").trim())) {
      next.zip = true;
      if (!firstBad) firstBad = "zip";
    }
    const email = get("email").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = true;
      if (!firstBad) firstBad = "email";
    }

    setErrors(next);
    if (firstBad) {
      const el = form.elements.namedItem(firstBad) as HTMLElement;
      el.focus({ preventScroll: true });
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
      toast("Merci de compléter les champs obligatoires");
      return;
    }

    const data = {
      firstName: get("firstName").trim(),
      lastName: get("lastName").trim(),
      phone: get("phone").trim(),
      email,
      address: get("address").trim(),
      address2: get("address2").trim(),
      city: get("city").trim(),
      gov: get("gov"),
      zip: get("zip").trim(),
      landmark: get("landmark").trim(),
      notes: get("notes").trim(),
      payment: ((form.querySelector('input[name="payment"]:checked') as HTMLInputElement)?.value ||
        "cod") as "cod" | "card",
    };

    const order: Order = {
      num: makeOrderNum(),
      createdAt: new Date().toISOString(),
      status: "nouvelle",
      ...data,
      items,
      total,
    };

    try {
      await saveOrder(order);
    } catch {
      toast("Une erreur est survenue lors de l'envoi. Merci de réessayer.");
      return;
    }

    setConfirmation({
      firstName: data.firstName,
      num: order.num,
      addr:
        data.address +
        (data.address2 ? ", " + data.address2 : "") +
        " — " +
        data.city +
        ", " +
        data.gov +
        " " +
        data.zip,
      phone: "+216 " + data.phone,
      pay: data.payment === "card" ? "Carte bancaire" : "À la livraison (espèces)",
      itemsCount: qty,
      total,
    });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (confirmation) {
    return (
      <div className="wrap confirm">
        <div className="check">
          <CheckBigIcon size={36} />
        </div>
        <h1>Merci, {confirmation.firstName} commande est confirmée&nbsp;!</h1>
        <p className="lead">
          Nous vous appelons très vite au numéro indiqué pour convenir d&apos;un créneau de
          livraison à domicile.
        </p>
        <div className="order-box">
          <div className="ob-row"><span className="k">Numéro de commande</span><span className="order-num">{confirmation.num}</span></div>
          <hr className="ob-rule" />
          <div className="ob-row"><span className="k">Livraison à</span><span className="v">{confirmation.addr}</span></div>
          <div className="ob-row"><span className="k">Téléphone</span><span className="v">{confirmation.phone}</span></div>
          <div className="ob-row"><span className="k">Paiement</span><span className="v">{confirmation.pay}</span></div>
          <div className="ob-row"><span className="k">Articles</span><span className="v">{confirmation.itemsCount} article{confirmation.itemsCount > 1 ? "s" : ""}</span></div>
          <hr className="ob-rule" />
          <div className="ob-row"><span className="k">Total</span><span className="v">{formatDT(confirmation.total)}</span></div>
        </div>
        <Button href="/" variant="primary" size="lg">Retour à l&apos;accueil</Button>
      </div>
    );
  }

  if (!ready || items.length === 0) {
    return <div className="wrap" style={{ minHeight: 320 }} />;
  }

  return (
    <>
      <div className="wrap page-head">
        <Link className="back-link" href="/cart">
          <ArrowLeftIcon size={16} />
          Retour au panier
        </Link>
        <span className="eyebrow">Finaliser ma commande</span>
        <h1>Livraison &amp; paiement</h1>
      </div>

      <form className="wrap checkout-grid" onSubmit={onSubmit} noValidate>
        <div>
          <div className="secure-row">
            <LockIcon size={15} strokeWidth={1.9} />
            Vos informations sont chiffrées et confidentielles
          </div>

          {/* 1. Coordonnées */}
          <section className="form-card">
            <div className="form-card-head">
              <span className="step-no">1</span>
              <h2>Vos coordonnées</h2>
            </div>
            <div className="field-grid">
              <div className="field">
                <label htmlFor="firstName">Prénom <span className="req">*</span></label>
                <input id="firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Mohamed" style={err("firstName")} onChange={() => clearError("firstName")} />
              </div>
              <div className="field">
                <label htmlFor="lastName">Nom <span className="req">*</span></label>
                <input id="lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Ben Ali" style={err("lastName")} onChange={() => clearError("lastName")} />
              </div>
              <div className="field col-2">
                <label htmlFor="phone">Téléphone <span className="req">*</span></label>
                <div className="field-prefix">
                  <span className="pfx">🇹🇳 +216</span>
                  <input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="20 123 456" style={err("phone")} onChange={() => clearError("phone")} />
                </div>
                <span className="help">Nous vous appelons pour confirmer le créneau de livraison.</span>
              </div>
              <div className="field col-2">
                <label htmlFor="email">E-mail <span className="opt">(optionnel)</span></label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.tn" style={err("email")} onChange={() => clearError("email")} />
                <span className="help">Pour recevoir la confirmation et le suivi de commande.</span>
              </div>
            </div>
          </section>

          {/* 2. Adresse de livraison */}
          <section className="form-card">
            <div className="form-card-head">
              <span className="step-no">2</span>
              <h2>Adresse de livraison</h2>
            </div>
            <div className="field-grid">
              <div className="field col-2">
                <label htmlFor="address">Adresse <span className="req">*</span></label>
                <input id="address" name="address" type="text" autoComplete="address-line1" placeholder="N° et rue — ex. 12 Avenue Habib Bourguiba" style={err("address")} onChange={() => clearError("address")} />
              </div>
              <div className="field col-2">
                <label htmlFor="address2">Complément d&apos;adresse <span className="opt">(optionnel)</span></label>
                <input id="address2" name="address2" type="text" autoComplete="address-line2" placeholder="Appartement, étage, résidence, bloc…" />
              </div>
              <div className="field">
                <label htmlFor="city">Ville / Localité <span className="req">*</span></label>
                <input id="city" name="city" type="text" autoComplete="address-level2" placeholder="Ex. La Marsa" style={err("city")} onChange={() => clearError("city")} />
              </div>
              <div className="field">
                <label htmlFor="gov">Gouvernorat <span className="req">*</span></label>
                <select id="gov" name="gov" defaultValue="" style={err("gov")} onChange={() => clearError("gov")}>
                  <option value="" disabled>Choisir…</option>
                  {GOVERNORATES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="zip">Code postal <span className="req">*</span></label>
                <input id="zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" placeholder="2078" maxLength={4} style={err("zip")} onChange={() => clearError("zip")} />
              </div>
              <div className="field">
                <label htmlFor="landmark">Point de repère <span className="opt">(optionnel)</span></label>
                <input id="landmark" name="landmark" type="text" placeholder="Près de…" />
              </div>
              <div className="field col-2">
                <label htmlFor="notes">Instructions de livraison <span className="opt">(optionnel)</span></label>
                <textarea id="notes" name="notes" placeholder="Horaires de présence, accès, étage sans ascenseur, etc." />
              </div>
            </div>
          </section>

          {/* 3. Paiement */}
          <section className="form-card">
            <div className="form-card-head">
              <span className="step-no">3</span>
              <h2>Mode de paiement</h2>
            </div>
            <div className="radio-cards">
              <label className="radio-card sel">
                <input type="radio" name="payment" value="cod" defaultChecked />
                <div>
                  <div className="rc-title">Paiement à la livraison</div>
                  <div className="rc-sub">Réglez en espèces au livreur, à réception de votre bureau.</div>
                </div>
              </label>
              <label className="radio-card disabled">
                <input type="radio" name="payment" value="card" disabled />
                <div>
                  <div className="rc-title">Carte bancaire <span className="soon-badge">Bientôt disponible</span></div>
                  <div className="rc-sub">Visa, Mastercard, e-Dinar. Paiement sécurisé en ligne.</div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="summary">
          <h3>Votre commande</h3>
          <ul className="summary-mini">
            {items.map((it) => (
              <li key={it.id + it.color + it.size}>
                <div className="mini-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoImg(it.photo, it.name, 160, 160)} alt={it.name} />
                </div>
                <div className="mini-meta">
                  <div className="nm">
                    {it.name} <span style={{ color: "var(--ink-faint)", fontWeight: 500 }}>×{it.qty}</span>
                  </div>
                  <div className="sub">{it.color} · {it.size}</div>
                </div>
                <div className="mini-price">{formatDT(it.price * it.qty)}</div>
              </li>
            ))}
          </ul>
          <hr className="summary-rule" />
          <div className="summary-line"><span>Sous-total</span><span className="v">{formatDT(total)}</span></div>
          <div className="summary-line">
            <span>Livraison <span style={{ color: "var(--ink-faint)" }}>· Tunisie</span></span>
            <span className="free">Gratuite</span>
          </div>
          <hr className="summary-rule" />
          <div className="summary-total"><span className="l">Total à payer</span><span className="t">{formatDT(total)}</span></div>
          <div className="submit-block">
            <Button variant="primary" size="lg" block type="submit">Confirmer la commande</Button>
            <p className="submit-note">En confirmant, vous acceptez nos conditions générales de vente.</p>
          </div>
        </aside>
      </form>
    </>
  );
}
