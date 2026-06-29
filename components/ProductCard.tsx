/* LeBonBureau — product card. Used by the landing listing and "Vous aimerez
   aussi" related grid. Links through to the product detail page. */

import Link from "next/link";
import { formatDT, productImg, type Product } from "@/lib/data";
import { ArrowRightIcon } from "./Icons";

interface ProductCardProps {
  product: Product;
  imgWidth?: number;
  imgHeight?: number;
  lazy?: boolean;
}

export default function ProductCard({
  product: p,
  imgWidth = 800,
  imgHeight = 600,
  lazy = true,
}: ProductCardProps) {
  return (
    <Link className="card" href={`/product/${p.id}`}>
      <div className="card-media">
        {p.badge && <span className={"badge" + (p.oldPrice ? " promo" : "")}>{p.badge}</span>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImg(p, imgWidth, imgHeight)}
          alt={p.name}
          loading={lazy ? "lazy" : undefined}
        />
      </div>
      <div className="card-body">
        <span className="card-cat">{p.categoryLabel}</span>
        <h3 className="card-name">{p.name}</h3>
        <p className="card-blurb">{p.blurb}</p>
        <div className="card-foot">
          <div className="price">
            <span className="now">{formatDT(p.price)}</span>
            {p.oldPrice && <span className="was">{formatDT(p.oldPrice)}</span>}
          </div>
          <span className="card-arrow" aria-hidden="true">
            <ArrowRightIcon size={17} />
          </span>
        </div>
      </div>
    </Link>
  );
}
