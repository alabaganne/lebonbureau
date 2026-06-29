"use client";

/* Product detail — gallery + buy box with conversion levers:
   social proof (gated on real orders), stock urgency, add-to-cart, and the
   inline cash-on-delivery express order. Plus a sticky mobile order bar. */

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { formatDT, img, GOVERNORATES, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import {
  makeOrderNum,
  ordersForProduct,
  saveOrder,
  type Order,
} from "@/lib/orders";
import {
  StarIcon,
  CheckTinyIcon,
  CheckBigIcon,
  BoltIcon,
  CartIcon,
  TruckIcon,
  ClockIcon,
  ShieldIcon,
} from "@/components/Icons";
import Button from "@/components/Button";

type ExpressField = "exName" | "exPhone" | "exGov" | "exCity" | "exAddr";

export default function ProductBuyBox({ product: p }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const galleryIds = useMemo(
    () => (p.photos && p.photos.length ? p.photos : p.photo ? [p.photo] : []),
    [p]
  );
  const galleryImg = (i: number) =>
    galleryIds.length ? img(galleryIds[i % galleryIds.length], 900, 675) : "";
  const thumbCount = galleryIds.length || 3;

  const [mainIdx, setMainIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [showExpress, setShowExpress] = useState(false);
  const [done, setDone] = useState<Order | null>(null);
  const [ordersPassed, setOrdersPassed] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<ExpressField, boolean>>>({});

  const expressRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Social proof reads the order count for this product from Supabase.
  useEffect(() => {
    ordersForProduct(p.id).then(setOrdersPassed);
  }, [p.id]);

  // Reveal + focus the express form once it opens.
  useEffect(() => {
    if (showExpress) {
      expressRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      const t = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 350);
      return () => clearTimeout(t);
    }
  }, [showExpress]);

  useEffect(() => {
    if (done) doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [done]);

  const save = p.oldPrice ? p.oldPrice - p.price : 0;
  const warranty = (p.specs.find((s) => /garantie/i.test(s[0])) || ["", "5 ans"])[1];

  function onAddToCart() {
    addToCart({
      id: p.id,
      name: p.name,
      color: p.colors[colorIdx].name,
      size: p.sizes[sizeIdx],
      price: p.price,
      qty,
      photo: p.photo,
      categoryLabel: p.categoryLabel,
    });
    toast(`${qty}× ${p.name} (${p.colors[colorIdx].name}) ajouté au panier`);
  }

  function openExpress() {
    setDone(null);
    setShowExpress(true);
  }

  function clearError(field: ExpressField) {
    setErrors((e) => ({ ...e, [field]: false }));
  }
  const errStyle = (field: ExpressField) =>
    errors[field] ? { borderColor: "var(--clay)" } : undefined;

  async function onSubmitExpress(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const val = (id: ExpressField) =>
      (form.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement).value.trim();

    const name = val("exName");
    const phone = val("exPhone");
    const gov = val("exGov");
    const city = val("exCity");
    const addr = val("exAddr");
    const digits = phone.replace(/\D/g, "");

    const nextErrors: Partial<Record<ExpressField, boolean>> = {
      exName: !name,
      exPhone: digits.length < 8,
      exGov: !gov,
      exCity: !city,
      exAddr: !addr,
    };
    setErrors(nextErrors);
    const firstBad = (Object.keys(nextErrors) as ExpressField[]).find((k) => nextErrors[k]);
    if (firstBad) {
      (form.elements.namedItem(firstBad) as HTMLElement).focus();
      toast("Merci de compléter les champs obligatoires");
      return;
    }

    const parts = name.split(/\s+/);
    const first = parts.shift() || name;
    const last = parts.join(" ");
    const order: Order = {
      num: makeOrderNum(),
      createdAt: new Date().toISOString(),
      status: "nouvelle",
      firstName: first,
      lastName: last,
      phone,
      email: "",
      address: addr,
      address2: "",
      city,
      gov,
      zip: "",
      landmark: "",
      notes: "Commande express (fiche produit)",
      payment: "cod",
      items: [
        {
          id: p.id,
          name: p.name,
          color: p.colors[colorIdx].name,
          size: p.sizes[sizeIdx],
          price: p.price,
          qty,
          photo: p.photo,
          categoryLabel: p.categoryLabel,
        },
      ],
      total: p.price * qty,
    };

    try {
      await saveOrder(order);
    } catch {
      toast("Une erreur est survenue. Merci de réessayer.");
      return;
    }
    setShowExpress(false);
    setDone(order);
    toast(`Commande ${order.num} enregistrée`);
  }

  const showRating = p.rating && ordersPassed > 9;
  const stockLow = p.stock <= 5;

  return (
    <>
      <main className="pd">
        <div className="wrap pd-grid">
          {/* Gallery */}
          <div className="gallery">
            <div className="gallery-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={galleryImg(mainIdx)} alt={p.name} />
            </div>
            <div className="thumbs">
              {Array.from({ length: thumbCount }, (_, i) => (
                <button
                  key={i}
                  className={"thumb" + (i === mainIdx ? " active" : "")}
                  onClick={() => setMainIdx(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={galleryImg(i)} alt={`${p.name} vue ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="pd-info">
            <span className="pd-cat">{p.categoryLabel}</span>
            <h1 className="pd-title">{p.name}</h1>

            {showRating && (
              <div className="pd-rating">
                <span className="stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} filled={i <= Math.round(p.rating)} />
                  ))}
                </span>
                <span className="rt-score">{p.rating.toFixed(1)}</span>
                <span className="rt-count">
                  {p.reviews} avis · {ordersPassed} commandés
                </span>
              </div>
            )}

            <p className="pd-sub">{p.sub}</p>

            <div className="pd-priceline">
              <span className="now">{formatDT(p.price)}</span>
              {p.oldPrice && <span className="was">{formatDT(p.oldPrice)}</span>}
              {save > 0 && <span className="save">− {formatDT(save)}</span>}
            </div>
            <p className="pd-vat">TVA comprise · Livraison offerte partout en Tunisie</p>

            <div className={"pd-stock " + (stockLow ? "low" : "ok")}>
              <span className="st-dot" />
              {stockLow
                ? `Plus que ${p.stock} en stock — expédié sous 48 h`
                : "En stock · expédié sous 48 h"}
            </div>

            <p className="pd-desc">{p.desc}</p>

            <div className="opt">
              <div className="opt-label">
                Finition <span className="val">{p.colors[colorIdx].name}</span>
              </div>
              <div className="swatches">
                {p.colors.map((c, i) => (
                  <button
                    key={c.name}
                    className={"swatch" + (i === colorIdx ? " active" : "")}
                    title={c.name}
                    aria-label={c.name}
                    onClick={() => setColorIdx(i)}
                  >
                    <span style={{ background: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="opt">
              <div className="opt-label">
                Dimensions <span className="val">{p.sizes[sizeIdx]}</span>
              </div>
              <div className="sizes">
                {p.sizes.map((s, i) => (
                  <button
                    key={s}
                    className={"size-btn" + (i === sizeIdx ? " active" : "")}
                    onClick={() => setSizeIdx(i)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="buy-row">
              <div className="qty">
                <button type="button" aria-label="Moins" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  –
                </button>
                <span>{qty}</span>
                <button type="button" aria-label="Plus" onClick={() => setQty((q) => Math.min(9, q + 1))}>
                  +
                </button>
              </div>
              <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={openExpress}>
                Commander maintenant
              </button>
            </div>
            <button className="btn btn-ghost btn-lg btn-block" style={{ marginBottom: 6 }} onClick={onAddToCart}>
              <CartIcon size={18} strokeWidth={1.9} />
              Ajouter au panier
            </button>
            <p className="pd-cod-note">
              <CheckTinyIcon size={15} />
              Paiement <strong>à la livraison</strong> — aucune avance, vous payez à réception.
            </p>

            {/* Inline express order (COD) */}
            {showExpress && (
              <div className="express" ref={expressRef}>
                <div className="express-head">
                  <div className="express-title">
                    <BoltIcon size={18} />
                    Commande express
                  </div>
                  <span className="express-sub">Sans compte · 2 minutes · payez à la livraison</span>
                </div>
                <div className="express-recap">
                  <div className="er-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={galleryImg(0)} alt={p.name} />
                  </div>
                  <div className="er-meta">
                    <div className="er-name">{p.name}</div>
                    <div className="er-sub">
                      {p.colors[colorIdx].name} · {p.sizes[sizeIdx]} · Qté {qty}
                    </div>
                  </div>
                  <div className="er-price">{formatDT(p.price * qty)}</div>
                </div>
                <form onSubmit={onSubmitExpress} noValidate>
                  <div className="express-grid">
                    <div className="field col-2">
                      <label htmlFor="exName">Nom complet <span className="req">*</span></label>
                      <input
                        id="exName" name="exName" ref={nameRef} type="text" autoComplete="name"
                        placeholder="Mohamed Ben Ali" style={errStyle("exName")}
                        onChange={() => clearError("exName")}
                      />
                    </div>
                    <div className="field col-2">
                      <label htmlFor="exPhone">Téléphone <span className="req">*</span></label>
                      <div className="field-prefix">
                        <span className="pfx">🇹🇳 +216</span>
                        <input
                          id="exPhone" name="exPhone" type="tel" inputMode="numeric"
                          autoComplete="tel-national" placeholder="20 123 456"
                          style={errStyle("exPhone")} onChange={() => clearError("exPhone")}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="exGov">Gouvernorat <span className="req">*</span></label>
                      <select
                        id="exGov" name="exGov" defaultValue="" style={errStyle("exGov")}
                        onChange={() => clearError("exGov")}
                      >
                        <option value="" disabled>Choisir…</option>
                        {GOVERNORATES.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="exCity">Ville <span className="req">*</span></label>
                      <input
                        id="exCity" name="exCity" type="text" autoComplete="address-level2"
                        placeholder="La Marsa" style={errStyle("exCity")}
                        onChange={() => clearError("exCity")}
                      />
                    </div>
                    <div className="field col-2">
                      <label htmlFor="exAddr">Adresse de livraison <span className="req">*</span></label>
                      <input
                        id="exAddr" name="exAddr" type="text" autoComplete="street-address"
                        placeholder="N° et rue, résidence, étage…" style={errStyle("exAddr")}
                        onChange={() => clearError("exAddr")}
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg btn-block" type="submit" style={{ marginTop: 4 }}>
                    Valider ma commande
                  </button>
                  <p className="submit-note" style={{ marginTop: 12 }}>
                    En validant, vous acceptez nos{" "}
                    <a href="/mentions-legales#cgv" style={{ color: "var(--green)", textDecoration: "underline" }}>
                      conditions de vente
                    </a>.
                  </p>
                </form>
              </div>
            )}

            {/* Inline confirmation */}
            {done && (
              <div className="express-done" ref={doneRef}>
                <div className="ed-check"><CheckBigIcon size={30} /></div>
                <h3>Merci {done.firstName}, commande confirmée !</h3>
                <p>Merci, nous vous appelons très vite pour convenir d&apos;un créneau de livraison.</p>
                <div className="ed-num">{done.num}</div>
                <div className="ed-links">
                  <Button href="/#catalogue" variant="dark">Continuer mes achats</Button>
                </div>
              </div>
            )}

            <div className="reassure">
              <div><TruckIcon size={19} />Livraison offerte partout en Tunisie, suivi en temps réel</div>
              <div><ClockIcon size={19} />30 jours pour changer d&apos;avis, retour gratuit</div>
              <div><ShieldIcon size={19} /><span>Garantie {warranty.toLowerCase()}</span></div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky mobile order bar */}
      <div className="mobile-buybar">
        <div className="mb-price">
          <span className="now">{formatDT(p.price)}</span>
          <span className="lbl">Payez à la livraison</span>
        </div>
        <button className="btn btn-primary btn-lg" onClick={openExpress}>
          Commander
        </button>
      </div>
    </>
  );
}
