/* LeBonBureau — demo order seeding for the admin dashboard, so it's populated
   out of the box. Inserts demo orders into Supabase via saveOrder. Remove once
   real orders are flowing. */

import { getProducts } from "./products";
import { saveOrder, type Order } from "./orders";
import type { Product } from "./data";
import type { CartItem } from "./cart";

function daysAgo(d: number, h?: number): string {
  const t = new Date();
  t.setDate(t.getDate() - d);
  t.setHours(h || 10, (d * 7) % 60, 0, 0);
  return t.toISOString();
}

function sum(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.price * i.qty, 0);
}

export function buildDemoOrders(products: Product[]): Order[] {
  const byId = (id: string) => products.find((p) => p.id === id);
  const it = (id: string, color: string, size: string, qty: number): CartItem => {
    const p = byId(id)!;
    return { id, name: p.name, color, size, price: p.price, qty, photo: p.photo, categoryLabel: p.categoryLabel };
  };
  const demo: Omit<Order, "total">[] = [
    {
      num: "#LBB-48217", createdAt: daysAgo(0, 9), status: "nouvelle",
      firstName: "Yassine", lastName: "Trabelsi", phone: "22145980", email: "yassine.t@exemple.tn",
      address: "14 Rue de l'Indépendance", address2: "", city: "Monastir", gov: "Monastir", zip: "5000",
      landmark: "Face à la pharmacie centrale", notes: "Appeler après 17h.", payment: "cod",
      items: [it("atlas", "Noir mat", "140 × 80 cm", 1)],
    },
    {
      num: "#LBB-48205", createdAt: daysAgo(0, 11), status: "nouvelle",
      firstName: "Emna", lastName: "Bouazizi", phone: "98342176", email: "",
      address: "3 Avenue Léopold Sédar Senghor", address2: "Apt 4, 2e étage", city: "Sousse", gov: "Sousse", zip: "4000",
      landmark: "", notes: "", payment: "card",
      items: [it("vector", "Noir carbone", "160 × 140 cm", 1), it("line", "Blanc", "110 × 60 cm", 1)],
    },
    {
      num: "#LBB-48189", createdAt: daysAgo(1, 14), status: "vue",
      firstName: "Khalil", lastName: "Gharbi", phone: "55012487", email: "k.gharbi@exemple.tn",
      address: "27 Rue Ibn Khaldoun", address2: "", city: "Ariana", gov: "Ariana", zip: "2080",
      landmark: "Résidence Les Jasmins", notes: "Interphone en panne, appeler à l'arrivée.", payment: "cod",
      items: [it("quartz", "Noir mat", "180 × 80 cm", 1)],
    },
    {
      num: "#LBB-48160", createdAt: daysAgo(2, 16), status: "appelee",
      firstName: "Sarra", lastName: "Mejri", phone: "21678034", email: "sarra.mejri@exemple.tn",
      address: "9 Rue Tahar Haddad", address2: "", city: "La Marsa", gov: "Tunis", zip: "2078",
      landmark: "", notes: "Livraison souhaitée le samedi matin.", payment: "card",
      items: [it("nova", "Frêne", "120 × 60 cm", 2)],
    },
    {
      num: "#LBB-48142", createdAt: daysAgo(3, 10), status: "appelee",
      firstName: "Aymen", lastName: "Saidi", phone: "94720155", email: "",
      address: "52 Avenue Farhat Hached", address2: "Bloc C", city: "Sfax", gov: "Sfax", zip: "3000",
      landmark: "Près du marché central", notes: "", payment: "cod",
      items: [it("pulse", "Bouleau", "140 × 70 cm", 1)],
    },
    {
      num: "#LBB-48097", createdAt: daysAgo(5, 13), status: "livree",
      firstName: "Nour", lastName: "Hamdi", phone: "23509861", email: "nour.hamdi@exemple.tn",
      address: "6 Rue du Lac Turkana", address2: "", city: "Les Berges du Lac", gov: "Tunis", zip: "1053",
      landmark: "", notes: "", payment: "card",
      items: [it("atlas", "Chêne clair", "160 × 80 cm", 1), it("line", "Noir mat", "130 × 65 cm", 1)],
    },
    {
      num: "#LBB-48051", createdAt: daysAgo(6, 15), status: "livree",
      firstName: "Mariem", lastName: "Chedly", phone: "50118293", email: "",
      address: "18 Rue Hédi Chaker", address2: "", city: "Hammamet", gov: "Nabeul", zip: "8050",
      landmark: "", notes: "", payment: "cod",
      items: [it("vector", "Gris béton", "160 × 140 cm", 1)],
    },
    {
      num: "#LBB-48003", createdAt: daysAgo(8, 12), status: "annulee",
      firstName: "Bilel", lastName: "Khelifi", phone: "29644017", email: "",
      address: "41 Rue de Carthage", address2: "", city: "Bizerte", gov: "Bizerte", zip: "7000",
      landmark: "", notes: "Client a reporté son achat.", payment: "cod",
      items: [it("nova", "Anthracite", "100 × 56 cm", 1)],
    },
  ];
  return demo.map((o) => ({ ...o, total: sum(o.items) }));
}

/** Insert the demo orders into Supabase. Idempotent: order numbers are unique,
    so re-seeding skips ones that already exist instead of duplicating. */
export async function seedDemo(): Promise<void> {
  const products = await getProducts();
  if (!products.length) return; // nothing to reference yet
  for (const o of buildDemoOrders(products)) {
    try {
      await saveOrder(o);
    } catch {
      // Most likely a duplicate order number from a prior seed — skip it.
    }
  }
}
