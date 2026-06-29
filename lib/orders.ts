/* LeBonBureau — orders, backed by Supabase (orders + order_items tables).
   Every order read/write funnels through these helpers. Storefront writes go
   through the create_order() RPC (transactional, anon-callable); admin reads and
   status changes go directly under RLS gated on is_admin(). */

import { supabase } from "./supabase";
import type { CartItem } from "./cart";

export type OrderStatus = "nouvelle" | "vue" | "appelee" | "livree" | "annulee";

export interface Order {
  num: string;
  createdAt: string;
  status: OrderStatus;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  gov: string;
  zip: string;
  landmark: string;
  notes: string;
  payment: "cod" | "card";
  items: CartItem[];
  total: number;
}

export interface StatusMeta {
  label: string;
  color: string;
  soft: string;
  idx: number;
}

export const STATUS: Record<OrderStatus, StatusMeta> = {
  nouvelle: { label: "Nouvelle", color: "#c9603f", soft: "#f8ece7", idx: 0 },
  vue: { label: "Vue", color: "#2a6f9e", soft: "#e8f1f8", idx: 1 },
  appelee: { label: "Appelée", color: "#b07d16", soft: "#f8f1df", idx: 2 },
  livree: { label: "Livrée", color: "#1f5d4c", soft: "#e7efe9", idx: 3 },
  annulee: { label: "Annulée", color: "#8c8a80", soft: "#eeece6", idx: -1 },
};

/** Forward progress buttons shown on each order card. */
export const PROGRESS: OrderStatus[] = ["vue", "appelee", "livree"];

/** Active pipeline vs. archive (delivered / cancelled). */
export const SEGMENTS: Record<"actives" | "archive", { label: string; statuses: OrderStatus[] }> = {
  actives: { label: "Actives", statuses: ["nouvelle", "vue", "appelee"] },
  archive: { label: "Archive", statuses: ["livree", "annulee"] },
};

/* ---- Row <-> Order mapping (snake_case DB columns <-> camelCase app type) ---- */

interface OrderItemRow {
  product_id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  qty: number;
}

interface OrderRow {
  num: string;
  created_at: string;
  status: OrderStatus;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  gov: string;
  zip: string;
  landmark: string;
  notes: string;
  payment: "cod" | "card";
  total: number;
  order_items: OrderItemRow[];
}

function rowToOrder(r: OrderRow): Order {
  return {
    num: r.num,
    createdAt: r.created_at,
    status: r.status,
    firstName: r.first_name,
    lastName: r.last_name,
    phone: r.phone,
    email: r.email,
    address: r.address,
    address2: r.address2,
    city: r.city,
    gov: r.gov,
    zip: r.zip,
    landmark: r.landmark,
    notes: r.notes,
    payment: r.payment,
    total: r.total,
    items: (r.order_items || []).map((it) => ({
      id: it.product_id,
      name: it.name,
      color: it.color,
      size: it.size,
      price: it.price,
      qty: it.qty,
    })),
  };
}

/** All orders, newest first (admin only — RLS blocks anonymous reads). */
export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as OrderRow[] | null)?.map(rowToOrder) ?? [];
}

/** Persist a new order + its items in one transactional RPC call. */
export async function saveOrder(order: Order): Promise<Order> {
  const { error } = await supabase.rpc("create_order", {
    p_num: order.num,
    p_status: order.status,
    p_payment: order.payment,
    p_first_name: order.firstName,
    p_last_name: order.lastName,
    p_phone: order.phone,
    p_email: order.email,
    p_address: order.address,
    p_address2: order.address2,
    p_city: order.city,
    p_gov: order.gov,
    p_zip: order.zip,
    p_landmark: order.landmark,
    p_notes: order.notes,
    p_total: order.total,
    p_items: order.items,
    p_created_at: order.createdAt,
  });
  if (error) throw error;
  return order;
}

/** Update an order's status (admin only). */
export async function setOrderStatus(num: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase.from("orders").update({ status }).eq("num", num);
  if (error) throw error;
}

/** Generate an order reference like "#LBB-48217". */
export function makeOrderNum(): string {
  return "#LBB-" + String(Math.floor(10000 + Math.random() * 89999));
}

/** Count of non-cancelled orders that include a given product (social proof). */
export async function ordersForProduct(pid: string): Promise<number> {
  const { data, error } = await supabase.rpc("orders_for_product", { p_pid: pid });
  if (error) return 0;
  return (data as number) ?? 0;
}
