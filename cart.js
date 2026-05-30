/* LeBonBureau — page panier */
(function () {
  const lines = document.getElementById('cartLines');
  const empty = document.getElementById('cartEmpty');
  const filled = document.getElementById('cartFilled');
  const itemCount = document.getElementById('itemCount');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function shipping(subtotal) { return subtotal > 0 ? 0 : 0; }

  function renderSummary() {
    const cart = LBB.cart.get();
    const subtotal = LBB.cart.subtotal();
    const total = subtotal + shipping(subtotal);
    itemCount.textContent = LBB.cart.qty() + ' article' + (LBB.cart.qty() > 1 ? 's' : '');
    subtotalEl.textContent = LBB.euro(subtotal);
    totalEl.textContent = LBB.euro(total);
    checkoutBtn.classList.toggle('disabled', cart.length === 0);
  }

  function render() {
    const cart = LBB.cart.get();
    if (!cart.length) {
      filled.style.display = 'none';
      empty.style.display = 'block';
      renderSummary();
      return;
    }
    filled.style.display = '';
    empty.style.display = 'none';
    lines.innerHTML = cart.map(LBB.components.cartLine).join('');
    renderSummary();
  }

  lines.addEventListener('click', function (e) {
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    const rem = e.target.closest('[data-remove]');
    if (inc) {
      const key = inc.getAttribute('data-inc');
      const item = LBB.cart.get().find(function (i) { return i.key === key; });
      if (item) LBB.cart.updateQty(key, item.qty + 1);
      render();
    }
    if (dec) {
      const key = dec.getAttribute('data-dec');
      const item = LBB.cart.get().find(function (i) { return i.key === key; });
      if (item) LBB.cart.updateQty(key, item.qty - 1);
      render();
    }
    if (rem) {
      LBB.cart.remove(rem.getAttribute('data-remove'));
      LBB.toast('Article retiré du panier');
      render();
    }
  });

  render();
})();
