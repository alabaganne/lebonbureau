/* Product detail page. Fetched from Supabase per request; the interactive buy
   box is a client island, while crumbs/specs/related render on the server. */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/products";
import ProductBuyBox from "@/components/ProductBuyBox";
import ProductCard from "@/components/ProductCard";
import { CheckIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) return { title: "Produit introuvable" };
  return { title: p.name, description: p.blurb };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) notFound();

  const related = (await getProducts()).filter((x) => x.id !== p.id).slice(0, 3);

  return (
    <>
      <div className="wrap">
        <nav className="crumbs">
          <Link href="/">Accueil</Link>
          <span className="sep">/</span>
          <Link href="/#catalogue">Catalogue</Link>
          <span className="sep">/</span>
          <span>{p.name}</span>
        </nav>
      </div>

      <ProductBuyBox product={p} />

      {/* SPECS + FEATURES */}
      <section className="detail-sections">
        <div className="wrap ds-grid">
          <div>
            <h2 className="section-title">Caractéristiques</h2>
            <table className="spec-table">
              <tbody>
                {p.specs.map(([k, v]) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="section-title">Points forts</h2>
            <div className="feature-list">
              {p.features.map(([title, body]) => (
                <div className="feature" key={title}>
                  <div className="ic"><CheckIcon size={20} strokeWidth={1.9} /></div>
                  <div>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="related">
        <div className="wrap">
          <h2 className="section-title">Vous aimerez aussi</h2>
          <div className="rel-grid">
            {related.map((rp) => (
              <ProductCard key={rp.id} product={rp} imgWidth={600} imgHeight={450} lazy={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
