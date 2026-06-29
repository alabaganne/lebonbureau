# LeBonBureau

French e-commerce storefront for ergonomic gaming / programming desks, built for
the Tunisian market (prices in **DT**, payment on delivery, French copy). Built
with **Next.js (App Router) + TypeScript**, recreating the Claude Design
prototype pixel-for-pixel as real components.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing — hero, catalogue listing (filterable), green band, "bien choisir", contact |
| `/product/[id]` | Product detail — gallery, options, add-to-cart, **express COD order**, specs, related |
| `/cart` | Cart with live quantity / remove + order summary |
| `/checkout` | 3-step delivery form → inline confirmation |
| `/faq` · `/livraison-retours` · `/mentions-legales` | Content / legal pages |
| `/admin/login` | Admin sign-in (demo: `admin` / `lebonbureau`) |
| `/admin` | Orders dashboard — stats, active/archive segments, status workflow, search, pagination |
| any other | 404 |

## Structure

```
app/
  layout.tsx              Root: fonts/CSS, CartProvider + ToastProvider
  (storefront)/           Route group sharing the nav + footer chrome
    layout.tsx            SiteHeader + children + SiteFooter
    page.tsx              Landing
    product/[id]/         SSG per product (generateStaticParams)
    cart/ checkout/ faq/ livraison-retours/ mentions-legales/
  admin/                  Own chrome (dark topbar) — login + dashboard
  not-found.tsx           Global 404
components/
  Button.tsx              Design-system pill button (renders <button> or <Link>)
  SiteHeader / SiteFooter Shared chrome
  ProductCard.tsx         Listing + related card
  PageHero.tsx            Content-page hero band
  Icons.tsx               Shared SVG icon set
  ProductBuyBox.tsx       Interactive product buy box (client island)
  sections/               Landing sections: Hero, TrustBar, Listing, GreenBand, ErgoSteps, ContactSection
lib/
  data.ts                 Product catalogue, governorates, price/image helpers
  cart.tsx                CartProvider + useCart  (localStorage)
  orders.ts               Order types, status system, storage helpers
  toast.tsx               ToastProvider + useToast
  auth.ts                 Admin session (demo)
  demo.ts                 Seed demo orders for the dashboard
styles/                   storefront.css (page sections) + admin.css
app/globals.css           Design system (tokens, buttons, nav, cards, forms…)
```

## Reusable building blocks

- **`<Button variant size block href>`** — every CTA on the site.
- **Section components** under `components/sections/` — each landing block is its
  own component so pages compose cleanly.
- **`SiteHeader` / `SiteFooter` / `PageHero` / `ProductCard`** — shared chrome and cards.

## Database — local Supabase

Orders and admin auth run on **Supabase** (Postgres + Auth), running locally via
Docker. The product catalogue stays static in `lib/data.ts`, and the cart stays
client-side (`localStorage` key `lbb_cart`).

### First-time setup

```bash
npm install
npm run db:start            # boots local Supabase (Docker must be running)
# copy values from `supabase status` into .env.local (see .env.example):
#   NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
npm run db:reset            # applies migrations + seed.sql (one sample order)
npm run db:seed             # seeds the product catalogue + the admin user
npm run dev                 # http://localhost:3000
```

`db:seed` runs `seed:products` (the 6 desks) then `seed:admin`
(`ADMIN_EMAIL`/`ADMIN_PASSWORD`). Re-run `seed:products` any time you change
`scripts/seed-products.mjs`.

Studio (DB browser): `http://127.0.0.1:54323`. Stop the stack with `npm run db:stop`.

### How it's wired

- **Schema** → `supabase/migrations/`: `profiles` (1:1 with `auth.users`, carries
  `role` = `admin` | `customer`), `orders`, `order_items`, and `products`.
  RLS lets only admins read/update orders; the storefront inserts through the
  `create_order()` RPC. Products are public-read, admin-write.
- **Catalogue** → `lib/products.ts` (`getProducts` / `getProduct`), backed by the
  `products` table. The landing listing and product pages fetch it server-side
  (`force-dynamic`). Types + image/format helpers stay in `lib/data.ts`.
- **Orders** → `lib/orders.ts` (`getOrders` / `saveOrder` / `setOrderStatus` /
  `ordersForProduct`) — all async, backed by Supabase. Checkout and the express
  order call `saveOrder`; the admin dashboard reads/updates here.
- **Admin auth** → `lib/auth.ts` (`signIn` / `signOut` / `isAdmin`) on Supabase
  Auth. Only a `profiles.role = 'admin'` user can reach `/admin`.
- **Sample data** → `supabase/seed.sql` (one order, reset-safe) and `lib/demo.ts`
  (the dashboard's "Données démo" button inserts 8 more).
- **Admin user** → `scripts/seed-admin.mjs` (run via `npm run seed:admin`).

Product photography is served from the Pexels CDN (allowed in `next.config.mjs`).
