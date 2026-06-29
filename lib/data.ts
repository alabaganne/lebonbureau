/* LeBonBureau — catalogue types, category config, and image/format helpers.
   The product data itself lives in Supabase (see lib/products.ts); this module
   holds the shared types and pure helpers used across the storefront. */

export type CategoryId = "tous" | "gaming" | "programmation" | "assis-debout";

export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  sub: string;
  photo: number;
  photos: number[];
  rating: number;
  reviews: number;
  stock: number;
  category: Exclude<CategoryId, "tous">;
  categoryLabel: string;
  price: number;
  oldPrice: number | null;
  badge: string | null;
  blurb: string;
  desc: string;
  colors: Color[];
  sizes: string[];
  specs: [string, string][];
  features: [string, string][];
  tags: string[];
}

export interface Category {
  id: CategoryId;
  label: string;
}


export const CATEGORIES: Category[] = [
  { id: "tous", label: "Tous les bureaux" },
  { id: "gaming", label: "Gaming" },
  { id: "programmation", label: "Programmation" },
  { id: "assis-debout", label: "Assis-debout" },
];

/** The 24 Tunisian governorates, used in delivery address selects. */
export const GOVERNORATES = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba",
  "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana",
  "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan",
];

/** Image URL for a cart line item from its stored photo id (placeholder fallback). */
export function photoImg(
  photo: number | null | undefined,
  name: string,
  w?: number,
  h?: number
): string {
  if (photo) return img(photo, w, h);
  return placeholder((name || "BUREAU").toUpperCase(), { w, h });
}

/** Pexels CDN URL builder for product photography. */
export function img(id: number, w?: number, h?: number): string {
  let u =
    "https://images.pexels.com/photos/" +
    id +
    "/pexels-photo-" +
    id +
    ".jpeg?auto=compress&cs=tinysrgb&fit=crop&w=" +
    (w || 800);
  if (h) u += "&h=" + h;
  return u;
}

interface PlaceholderOpts {
  w?: number;
  h?: number;
  bg?: string;
  stripe?: string;
  ink?: string;
  fs?: number;
}

/** Striped SVG placeholder — fallback for products without a photo. */
export function placeholder(label: string, opts: PlaceholderOpts = {}): string {
  const w = opts.w || 800;
  const h = opts.h || 600;
  const bg = opts.bg || "#efece4";
  const stripe = opts.stripe || "#e3dfd4";
  const ink = opts.ink || "#9a978c";
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">` +
    `<defs><pattern id="p" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">` +
    `<rect width="16" height="16" fill="${bg}"/>` +
    `<rect width="8" height="16" fill="${stripe}"/></pattern></defs>` +
    `<rect width="${w}" height="${h}" fill="url(#p)"/>` +
    `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ` +
    `font-family="ui-monospace, Menlo, monospace" font-size="${opts.fs || 22}" letter-spacing="1" fill="${ink}">${label}</text>` +
    `</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export function productImg(p: Product | undefined, w?: number, h?: number): string {
  if (p && p.photo) return img(p.photo, w, h);
  return placeholder(p && p.name ? p.name.toUpperCase() : "BUREAU", { w, h });
}

/** Tunisian Dinar price formatting — e.g. 1529 → "1 529 DT". */
export function formatDT(n: number): string {
  return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " DT";
}
