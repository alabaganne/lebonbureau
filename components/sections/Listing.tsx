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
    <section className="pt-[76px] pb-10" id="catalogue">
      <div className="wrap">
        <div className="flex items-end justify-between gap-[30px] mb-7 flex-wrap">
          <div>
            <span className="eyebrow">Le catalogue</span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              Bureaux pour gamers &amp; développeurs
            </h2>
            <p className="text-ink-soft max-w-[42ch] mt-3">
              Chaque modèle est sélectionné pour sa robustesse, sa surface de travail et sa
              posture. Cliquez pour tout savoir.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={
                  "border rounded-full px-[18px] py-[9px] text-[14.5px] font-medium transition-all duration-150 ease-[ease] " +
                  (c.id === activeFilter
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink-soft border-line hover:border-ink hover:text-ink")
                }
                onClick={() => setActiveFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[26px] max-[960px]:grid-cols-2 max-[560px]:grid-cols-1">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} imgWidth={800} imgHeight={600} />
          ))}
        </div>
        <p className="text-sm text-ink-faint mt-[22px]">{countNote}</p>
      </div>
    </section>
  );
}
