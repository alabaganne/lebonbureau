# LeBonBureau

UI-only static e-commerce prototype for ergonomic gaming/programming desks for the Tunisian market.

## Scope

- Landing page with hero, trust strip, product listing, filters, feature band, guide section, newsletter, and footer.
- Product detail page driven by `produit.html?id=<product-id>`.
- Client-side cart/count only via `localStorage`.
- No backend, payments, checkout, authentication, or inventory integration yet.

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Design notes

Implemented from the Claude Design handoff bundle `aKvJ4gZocwWrStxbgKZp7A`:

- Minimal white canvas with warm-sand neutral sections.
- Deep forest-green accent sections/buttons.
- French copy for Tunisia, Tunisian Dinar pricing (`DT`), and payment-on-delivery positioning.
- Fraunces headings + Inter Tight body typography.
- Product and lifestyle imagery stored locally under `assets/desks/`, sourced from IKEA product/lifestyle image URLs for the UI prototype.
