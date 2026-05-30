/* LeBonBureau — composants réutilisables */
(function () {
  window.LBB = window.LBB || {};

  function icon(name, size) {
    size = size || 18;
    const common = 'width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
    const paths = {
      cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      check: '<path d="M5 12l5 5L20 7"/>',
      truck: '<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/>',
      shield: '<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
      clock: '<path d="M21 12a9 9 0 1 1-9-9"/><path d="M12 7v5l3 2"/>',
      trash: '<path d="M19 7l-.9 12.1A2 2 0 0 1 16.1 21H7.9a2 2 0 0 1-2-1.9L5 7"/><path d="M10 11v6M14 11v6M4 7h16M9 7V4h6v3"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      minus: '<path d="M5 12h14"/>'
    };
    return '<svg ' + common + '>' + (paths[name] || paths.check) + '</svg>';
  }

  function brand() {
    return '<a class="brand" href="index.html">Le<span class="dot">Bon</span>Bureau<span class="dot">.</span></a>';
  }

  function nav(active) {
    active = active || '';
    const link = function (href, label, key) {
      return '<a class="' + (active === key ? 'active' : '') + '" href="' + href + '">' + label + '</a>';
    };
    return (
      '<header class="nav"><div class="wrap nav-inner">' +
        brand() +
        '<nav class="nav-links">' +
          link('index.html#catalogue', 'Catalogue', 'catalogue') +
          link('index.html#ergonomie', 'Ergonomie', 'ergonomie') +
          link('index.html#engagements', 'Nos engagements', 'engagements') +
          link('index.html#newsletter', 'Contact', 'contact') +
        '</nav>' +
        '<div class="nav-actions"><a class="cart-btn" id="cartBtn" href="panier.html" aria-label="Panier">' + icon('cart', 17) + 'Panier <span class="cart-count" id="cartCount">0</span></a></div>' +
      '</div></header>'
    );
  }

  function footer() {
    return (
      '<footer class="footer">' +
        '<div class="wrap footer-top">' +
          '<div class="footer-col"><div class="brand">Le<span class="dot" style="color:var(--green);">Bon</span>Bureau<span style="color:var(--green);">.</span></div><p class="footer-blurb">La sélection tunisienne de bureaux ergonomiques pour gamers, développeurs et créatifs exigeants.</p></div>' +
          '<div class="footer-col"><h4>Catalogue</h4><ul><li><a href="index.html#catalogue">Gaming</a></li><li><a href="index.html#catalogue">Programmation</a></li><li><a href="index.html#catalogue">Assis-debout</a></li><li><a href="index.html#catalogue">Tous les bureaux</a></li></ul></div>' +
          '<div class="footer-col"><h4>Aide</h4><ul><li><a href="#">Livraison &amp; retours</a></li><li><a href="#">Guide des tailles</a></li><li><a href="#">Montage</a></li><li><a href="index.html#newsletter">Nous contacter</a></li></ul></div>' +
          '<div class="footer-col"><h4>Maison</h4><ul><li><a href="index.html#engagements">Nos engagements</a></li><li><a href="index.html#ergonomie">Ergonomie</a></li><li><a href="#">CGV</a></li><li><a href="#">Mentions légales</a></li></ul></div>' +
        '</div>' +
        '<div class="wrap footer-bottom"><span>© 2025 LeBonBureau — Tous droits réservés.</span><span>Paiement sécurisé · Visa · Mastercard · à la livraison</span></div>' +
      '</footer>'
    );
  }

  function productCard(p) {
    const badge = p.badge ? '<span class="badge' + (p.oldPrice ? ' promo' : '') + '">' + p.badge + '</span>' : '';
    const img = p.images && p.images.length ? p.images[0] : 'assets/desks/line-main.jpg';
    return (
      '<a class="card" href="produit.html?id=' + p.id + '">' +
        '<div class="card-media">' + badge + '<img src="' + img + '" alt="' + p.name + '" loading="lazy" /></div>' +
        '<div class="card-body"><span class="card-cat">' + p.categoryLabel + '</span><h3 class="card-name">' + p.name + '</h3><p class="card-blurb">' + p.blurb + '</p>' +
        '<div class="card-foot"><div class="price"><span class="now">' + LBB.euro(p.price) + '</span>' + (p.oldPrice ? '<span class="was">' + LBB.euro(p.oldPrice) + '</span>' : '') + '</div><span class="card-arrow" aria-hidden="true">' + icon('arrow', 17) + '</span></div></div>' +
      '</a>'
    );
  }

  function cartLine(item) {
    const product = LBB.byId(item.id) || item;
    const img = product.images && product.images.length ? product.images[0] : 'assets/desks/line-main.jpg';
    const title = product.name || item.name;
    const meta = [item.color, item.size].filter(Boolean).join(' · ');
    return (
      '<article class="cart-line" data-key="' + item.key + '">' +
        '<a class="cart-line-media" href="produit.html?id=' + item.id + '"><img src="' + img + '" alt="' + title + '" /></a>' +
        '<div class="cart-line-main"><a class="cart-line-name" href="produit.html?id=' + item.id + '">' + title + '</a><div class="cart-line-meta">' + meta + '</div><button class="link-btn" data-remove="' + item.key + '">' + icon('trash', 15) + ' Retirer</button></div>' +
        '<div class="cart-line-side"><div class="cart-qty"><button data-dec="' + item.key + '">' + icon('minus', 15) + '</button><span>' + item.qty + '</span><button data-inc="' + item.key + '">' + icon('plus', 15) + '</button></div><div class="cart-line-price">' + LBB.euro(item.price * item.qty) + '</div></div>' +
      '</article>'
    );
  }

  function emptyState(title, text, action) {
    return '<div class="empty-state"><h2>' + title + '</h2><p>' + text + '</p>' + (action || '') + '</div>';
  }

  function mountChrome(active) {
    document.querySelectorAll('[data-lbb-nav]').forEach(function (el) { el.innerHTML = nav(active || el.getAttribute('data-active') || ''); });
    document.querySelectorAll('[data-lbb-footer]').forEach(function (el) { el.innerHTML = footer(); });
    document.querySelectorAll('[data-lbb-toast]').forEach(function (el) { el.outerHTML = '<div class="toast" id="toast"></div>'; });
  }

  window.LBB.components = { icon: icon, brand: brand, nav: nav, footer: footer, productCard: productCard, cartLine: cartLine, emptyState: emptyState };
  window.LBB.mountChrome = mountChrome;
})();
