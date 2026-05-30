# LeBonBureau Design System

LeBonBureau is a minimal premium ecommerce UI for ergonomic desks. The interface should feel warm, calm, editorial, and trustworthy — closer to a refined furniture catalog than a noisy dropshipping store.

## Principles

- **Minimal first:** generous whitespace, few borders, no unnecessary decoration.
- **Warm premium:** white canvas, sand neutrals, deep forest green accent.
- **Editorial product focus:** large product imagery, serif headings, concise copy.
- **Flat and practical:** subtle shadows only on cards/toasts; avoid heavy gradients.
- **Mobile-friendly:** every page must collapse into a clean single-column flow.
- **UI-only for now:** cart, checkout, and order flows should not process payments or submit real orders yet.

## Tokens

### Colors

- Ink: `#1b1b16`
- Ink soft: `#55534a`
- Ink faint: `#8c8a80`
- Paper: `#ffffff`
- Sand: `#f6f4ee`
- Sand deep: `#efece4`
- Line: `#e7e3d9`
- Green: `#1f5d4c`
- Green deep: `#163f34`
- Green soft: `#e7efe9`
- Clay promo: `#c9603f`

### Typography

- Display/headings: `Fraunces`
- Body/UI: `Inter Tight`
- Headings use tight line-height and slightly negative tracking.
- UI labels use uppercase letter spacing sparingly.

### Radius

- Standard: `14px`
- Large/cards: `22px`
- Pills/buttons: `999px`

### Shadows

Use only the two existing shadows:

- `--shadow-card` for small floating elements.
- `--shadow-lift` for hover states and overlays.

## Reusable Components

Implemented in `components.js` and global CSS:

- `LBB.components.icon(name, size)`
- `LBB.components.brand()`
- `LBB.components.nav(active)`
- `LBB.components.footer()`
- `LBB.components.productCard(product)`
- `LBB.components.cartLine(item)`
- `LBB.components.emptyState(title, text, action)`
- `LBB.mountChrome(active)` renders `[data-lbb-nav]`, `[data-lbb-footer]`, and `[data-lbb-toast]`.

## Page Layout Patterns

### Header

Use the shared sticky nav on every page. Cart always links to `panier.html` and shows current local cart quantity.

### Footer

Use the shared footer on every page. Keep catalog/help/brand links consistent.

### Product Grid

Use `.grid` and shared `productCard` output. Cards should remain image-first with category, serif title, short blurb, price, and arrow.

### Forms

Use `.form-grid`, `.field`, `.input`, `.select`, and `.textarea`.

- Required fields should be marked in the label text.
- Keep forms calm and spacious.
- Checkout is currently UI-only; submit should show a confirmation message/toast, not send data externally.

## Cart + Checkout

### Cart (`panier.html`)

- Shows line items from `localStorage` key `lbb_cart`.
- Lets user change quantities or remove products.
- Displays subtotal, shipping, and total.
- Primary action goes to `checkout.html`.

### Checkout (`checkout.html`)

Required fields:

- First name
- Last name
- Phone number
- Governorate
- City
- Address

Optional fields:

- Email
- Address notes / delivery instructions

The checkout summary should mirror the cart and preserve the warm minimal style.
