"use client";

/* Landing catalogue — filterable product grid with category chips. */

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, type CategoryId, type Product } from "@/lib/data";

export default function Listing({ products }: { products: Product[] }) {
  const [activeFilter, setActiveFilter] = useState<CategoryId>("tous");

  const list = products.filter((p) => activeFilter === "tous" || p.category === activeFilter);

  const countNote =
    list.length +
    (list.length > 1 ? " bureaux affichés" : " bureau affiché") +
    (activeFilter === "tous"
      ? ""
      : " · catégorie " +
        (CATEGORIES.find((c) => c.id === activeFilter)?.label.toLowerCase() ?? ""));

  return (
    <section className="listing" id="catalogue">
      <div className="wrap">
        <div className="listing-head">
          <div>
            <span className="eyebrow">Le catalogue</span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              Bureaux pour gamers &amp; développeurs
            </h2>
            <p>
              Chaque modèle est sélectionné pour sa robustesse, sa surface de travail et sa
              posture. Cliquez pour tout savoir.
            </p>
          </div>
          <div className="chips">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={"chip" + (c.id === activeFilter ? " active" : "")}
                onClick={() => setActiveFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} imgWidth={800} imgHeight={600} />
          ))}
        </div>
        <p className="count-note">{countNote}</p>
      </div>
    </section>
  );
}
