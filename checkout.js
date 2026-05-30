/* LeBonBureau — page checkout UI-only */
(function () {
  const summaryLines = document.getElementById('summaryLines');
  const summaryEmpty = document.getElementById('summaryEmpty');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const orderForm = document.getElementById('orderForm');

  function render() {
    const cart = LBB.cart.get();
    const subtotal = LBB.cart.subtotal();
    subtotalEl.textContent = LBB.euro(subtotal);
    totalEl.textContent = LBB.euro(subtotal);

    if (!cart.length) {
      summaryLines.innerHTML = '';
      summaryEmpty.style.display = 'block';
      return;
    }

    summaryEmpty.style.display = 'none';
    summaryLines.innerHTML = cart.map(function (item) {
      const product = LBB.byId(item.id) || item;
      const img = product.images && product.images.length ? product.images[0] : 'assets/desks/line-main.jpg';
      return '<div class="checkout-mini-line"><img src="' + img + '" alt="' + (product.name || item.name) + '" /><div><strong>' + (product.name || item.name) + '</strong><span>' + item.qty + ' × ' + [item.color, item.size].filter(Boolean).join(' · ') + '</span></div><b>' + LBB.euro(item.price * item.qty) + '</b></div>';
    }).join('');
  }

  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!LBB.cart.get().length) {
      LBB.toast('Votre panier est vide.');
      return;
    }
    LBB.toast('Commande prête à être envoyée — UI seulement pour le moment.');
    document.getElementById('orderPreview').style.display = 'block';
  });

  render();
})();
