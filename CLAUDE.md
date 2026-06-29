# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

LeBonBureau — a French-language e-commerce storefront for ergonomic desks aimed at the
Tunisian market (prices in **DT**, cash-on-delivery, French copy throughout). Next.js 15
(App Router) + React 19 + TypeScript, with a local **Supabase** (Postgres + Auth) backend.

## Commands

```bash
npm run dev          # dev server → http://localhost:3000
npm run build        # production build (also the fastest full typecheck — there is no separate test suite)
npm run lint         # next lint

# Local Supabase (Docker must be running)
npm run db:start     # boot local stack; then read values from `supabase status` into .env.local
npm run db:reset     # apply migrations + seed.sql (resets DB)
npm run db:seed      # seed:products (6 desks) then seed:admin (ADMIN_EMAIL/ADMIN_PASSWORD)
npm run db:stop
```

There are **no automated tests**. Verify changes with `npm run build` (typecheck) and by
running the app. Supabase Studio: `http://127.0.0.1:54323`.

`.env.local` must define `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
(both sent to the browser, RLS-protected) and `SUPABASE_SERVICE_ROLE_KEY` (server-only,
used by `scripts/seed-admin.mjs` — never prefix with `NEXT_PUBLIC_`).

## Architecture

**Two route worlds, one root.** `app/layout.tsx` wraps everything in `CartProvider` +
`ToastProvider`. `app/(storefront)/` is a route group sharing `SiteHeader`/`SiteFooter`
chrome; `app/admin/` has its own dark-topbar chrome and an auth gate.

**Single shared Supabase client.** `lib/supabase.ts` exports one browser `createClient`
instance (anon key, session persisted in localStorage). **All** DB reads/writes and admin
auth go through it. There is no server-side service-role client in the app — server
components call the same anon client and rely on RLS (catalogue reads are public). The
only service-role usage is the seed script.

**Data access is funnelled through `lib/` helpers — never call `supabase.from()` from a
component.**
- `lib/products.ts` — `getProducts` / `getProduct`, backed by the `products` table. Listing
  and product pages fetch server-side (these pages are `force-dynamic`).
- `lib/orders.ts` — `getOrders` / `saveOrder` / `setOrderStatus` / `ordersForProduct`,
  backed by `orders` + `order_items`. **Writes go through the `create_order()` RPC**
  (transactional, anon-callable); admin reads/status changes go direct under RLS.
- `lib/auth.ts` — `signIn` / `signOut` / `isAdmin` on Supabase Auth. Admin access requires
  a `profiles.role = 'admin'` row; non-admins are signed back out on login.
- `lib/cart.tsx` — `CartProvider` + `useCart`, client-side only (localStorage key `lbb_cart`).
- `lib/data.ts` — the `Product` **type** plus price/image format helpers (governorates,
  etc.). The catalogue data itself lives in the DB, not here.

**snake_case ↔ camelCase boundary.** DB columns are snake_case; the app's TS types are
camelCase. `lib/orders.ts` and `lib/products.ts` each own a `ProductRow`/`OrderRow`
interface and a `rowToProduct`/`rowToOrder` mapper. When you add a column, update the Row
interface, the mapper, and (for orders) the `create_order` RPC params together.

**Schema** lives in `supabase/migrations/`: `profiles` (1:1 with `auth.users`, carries
`role`), `orders`, `order_items`, `products`. RLS: orders are admin-only read/update,
inserted via the RPC; products are public-read / admin-write. Sample data: `supabase/seed.sql`
(one reset-safe order) and `lib/demo.ts` (the dashboard's "Données démo" button inserts 8 more).

## Design system — the one hard rule

Read `DESIGN.md` before touching UI. **Never hardcode a colour, radius, shadow, spacing, or
button style** — reference a CSS variable (token) from `app/globals.css` `:root`, and reach
for an existing component before writing new markup. Every CTA is `<Button variant size block
href>`. Landing blocks are individual components in `components/sections/`. CSS is split:
`app/globals.css` (tokens + primitives), `styles/storefront.css` (page sections),
`styles/admin.css` (dashboard). Product photos come from the Pexels CDN (allowlisted in
`next.config.mjs`).

## Conventions

- Comments and UI copy are in **French**; keep that voice. Money is DT, payment is COD.
- Path alias `@/*` maps to the repo root.
- Order status flow: `nouvelle → vue → appelee → livree` (+ `annulee`); see `STATUS`,
  `PROGRESS`, and `SEGMENTS` in `lib/orders.ts`.
