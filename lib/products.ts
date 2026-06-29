/* Product catalogue access, backed by the Supabase `products` table.
   Reads are public (RLS allows anyone to select), so these run in Server
   Components. Rows map to the app's Product type defined in ./data. */

import { supabase } from "./supabase";
import type { Product } from "./data";

interface ProductRow {
  id: string;
  name: string;
  sub: string;
  photo: number | null;
  photos: number[];
  rating: number;
  reviews: number;
  stock: number;
  category: Product["category"];
  category_label: string;
  price: number;
  old_price: number | null;
  badge: string | null;
  blurb: string;
  description: string;
  colors: Product["colors"];
  sizes: string[];
  specs: [string, string][];
  features: [string, string][];
  tags: string[];
}

function rowToProduct(r: ProductRow): Product {
  return {
    id: r.id,
    name: r.name,
    sub: r.sub,
    photo: r.photo ?? 0,
    photos: r.photos ?? [],
    rating: r.rating,
    reviews: r.reviews,
    stock: r.stock,
    category: r.category,
    categoryLabel: r.category_label,
    price: r.price,
    oldPrice: r.old_price,
    badge: r.badge,
    blurb: r.blurb,
    desc: r.description,
    colors: r.colors ?? [],
    sizes: r.sizes ?? [],
    specs: r.specs ?? [],
    features: r.features ?? [],
    tags: r.tags ?? [],
  };
}

/** Full catalogue, in display order. */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("position", { ascending: true });
  if (error) throw error;
  return (data as ProductRow[] | null)?.map(rowToProduct) ?? [];
}

/** A single product by slug, or null if it doesn't exist. */
export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToProduct(data as ProductRow) : null;
}
