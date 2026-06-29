/* Seed (upsert) the product catalogue into Supabase. Idempotent — keyed on id.
   Run after `npm run db:reset`:  npm run seed:products
   This file is the source of truth for the sample catalogue. */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function loadEnv(url) {
  try {
    const text = readFileSync(fileURLToPath(url), "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* rely on ambient env */
  }
}
loadEnv(new URL("../.env.local", import.meta.url));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local.");
  process.exit(1);
}

// Rows match the products table columns (snake_case). Three sample desks — one
// per category (assis-debout / programmation / gaming).
const PRODUCTS = [
  {
    id: "atlas", position: 1, name: "Atlas", sub: "Bureau assis-debout électrique",
    photo: 1957477, photos: [1957477, 12786598, 8490189], rating: 4.8, reviews: 214, stock: 7,
    category: "assis-debout", category_label: "Assis-debout", price: 1529, old_price: 1799, badge: "Best-seller",
    blurb: "Plateau motorisé de 65 à 132 cm. La référence pour alterner posture assise et debout sans quitter son flow.",
    description: "Atlas est notre bureau assis-debout le plus polyvalent. Son moteur double colonne soulève jusqu'à 70 kg en silence, avec mémoire de quatre hauteurs. Idéal pour les longues sessions de code comme pour les marathons de jeu.",
    colors: [{ name: "Chêne clair", hex: "#d8c4a0" }, { name: "Noir mat", hex: "#26261f" }, { name: "Blanc", hex: "#f3f1ea" }],
    sizes: ["120 × 80 cm", "140 × 80 cm", "160 × 80 cm"],
    specs: [["Réglage en hauteur", "65 – 132 cm"], ["Charge maximale", "70 kg"], ["Vitesse moteur", "38 mm/s"], ["Mémoire de positions", "4 hauteurs"], ["Niveau sonore", "< 45 dB"], ["Garantie", "10 ans cadre"]],
    features: [["Double moteur", "Montée fluide et stable, même à pleine charge."], ["Mémoire 4 positions", "Retrouvez votre hauteur d'un seul geste."], ["Passe-câbles intégré", "Goulotte aimantée sous le plateau."]],
    tags: ["Programmation", "Gaming", "Télétravail"],
  },
  {
    id: "nova", position: 2, name: "Nova", sub: "Bureau compact pour petits espaces",
    photo: 5546811, photos: [5546811, 8490189, 12786598], rating: 4.6, reviews: 89, stock: 12,
    category: "programmation", category_label: "Programmation", price: 539, old_price: null, badge: null,
    blurb: "100 × 56 cm. Pensé pour un setup deux écrans dans un studio ou un coin de chambre.",
    description: "Nova fait beaucoup avec peu de place. Son plateau profond accueille deux écrans 27\" et son piètement en acier ne bouge pas d'un millimètre quand vous tapez vite. Le compagnon idéal des développeurs en appartement.",
    colors: [{ name: "Frêne", hex: "#e0d3b6" }, { name: "Anthracite", hex: "#33332b" }],
    sizes: ["100 × 56 cm", "120 × 60 cm"],
    specs: [["Dimensions plateau", "100 × 56 cm"], ["Hauteur fixe", "74 cm"], ["Charge maximale", "50 kg"], ["Épaisseur plateau", "22 mm"], ["Piètement", "Acier thermolaqué"], ["Garantie", "5 ans"]],
    features: [["Empreinte minimale", "S'installe dans moins d'un mètre carré."], ["Plateau anti-traces", "Stratifié mat qui ne marque pas."], ["Vérins réglables", "Stable même sur parquet ancien."]],
    tags: ["Programmation", "Studio"],
  },
  {
    id: "vector", position: 3, name: "Vector", sub: "Bureau d'angle gaming en L",
    photo: 6125337, photos: [6125337, 30469973, 30469967], rating: 4.7, reviews: 56, stock: 5,
    category: "gaming", category_label: "Gaming", price: 1119, old_price: 1319, badge: "Nouveau",
    blurb: "Format L de 160 × 140 cm. De la place pour trois écrans, le combo clavier-souris et le casque.",
    description: "Vector épouse l'angle de votre pièce pour libérer un maximum de surface. Le plateau enveloppant garde tout à portée de main et le revêtement texturé glisse parfaitement pour la souris. Conçu pour la compétition.",
    colors: [{ name: "Noir carbone", hex: "#222019" }, { name: "Gris béton", hex: "#9a978c" }],
    sizes: ["160 × 140 cm", "180 × 160 cm"],
    specs: [["Dimensions", "160 × 140 cm"], ["Hauteur fixe", "75 cm"], ["Charge maximale", "60 kg"], ["Surface", "Texturée anti-reflets"], ["Gestion câbles", "Tunnel arrière + crochets"], ["Garantie", "5 ans"]],
    features: [["Format en L", "Trois écrans alignés sans compromis."], ["Surface micro-texturée", "Glisse précise sans tapis."], ["Crochet casque", "Rangement intégré côté plateau."]],
    tags: ["Gaming", "Multi-écrans"],
  },
];

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { error } = await admin.from("products").upsert(PRODUCTS, { onConflict: "id" });
if (error) {
  console.error("Failed to seed products:", error.message);
  process.exit(1);
}
console.log(`Upserted ${PRODUCTS.length} products.`);
