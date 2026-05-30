/* LeBonBureau — interactivité partagée */
(function () {
  const CART_KEY = "lbb_cart";

  function itemKey(entry) {
    return entry.id + "|" + (entry.color || "") + "|" + (entry.size || "");
  }
  function normalizeCart(items) {
    return (items || []).map(function (item) {
      item.qty = Math.max(1, Number(item.qty || 1));
      item.price = Number(item.price || 0);
      item.key = item.key || itemKey(item);
      return item;
    });
  }
  function getCart() {
    try { return normalizeCart(JSON.parse(localStorage.getItem(CART_KEY)) || []); }
    catch (e) { return []; }
  }
  function setCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(normalizeCart(items)));
    renderCartCount();
  }
  function cartQty() {
    return getCart().reduce(function (n, i) { return n + i.qty; }, 0);
  }
  function cartSubtotal() {
    return getCart().reduce(function (n, i) { return n + (i.price * i.qty); }, 0);
  }
  function addToCart(entry) {
    const cart = getCart();
    entry.key = itemKey(entry);
    const found = cart.find(function (i) { return i.key === entry.key; });
    if (found) found.qty += Number(entry.qty || 1);
    else cart.push(entry);
    setCart(cart);
  }
  function updateQty(key, qty) {
    const next = getCart().map(function (item) {
      if (item.key === key) item.qty = Math.max(1, Math.min(9, qty));
      return item;
    });
    setCart(next);
  }
  function removeFromCart(key) {
    setCart(getCart().filter(function (item) { return item.key !== key; }));
  }
  function clearCart() { setCart([]); }
  function renderCartCount() {
    const el = document.getElementById("cartCount");
    if (el) el.textContent = cartQty();
  }

  let toastTimer = null;
  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  let activeFilter = "tous";
  function renderGrid() {
    const grid = document.getElementById("grid");
    if (!grid) return;
    const list = LBB.products.filter(function (p) {
      return activeFilter === "tous" || p.category === activeFilter;
    });
    grid.innerHTML = list.map(LBB.components.productCard).join("");
    const note = document.getElementById("countNote");
    if (note) {
      note.textContent =
        list.length + (list.length > 1 ? " bureaux affichés" : " bureau affiché") +
        (activeFilter === "tous" ? "" : " · catégorie " +
          LBB.categories.find(function (c) { return c.id === activeFilter; }).label.toLowerCase());
    }
  }

  function renderFilters() {
    const host = document.getElementById("filters");
    if (!host) return;
    host.innerHTML = LBB.categories.map(function (c) {
      return '<button class="chip' + (c.id === activeFilter ? " active" : "") +
        '" data-cat="' + c.id + '">' + c.label + "</button>";
    }).join("");
    host.querySelectorAll(".chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-cat");
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderListing() {
    renderFilters();
    renderGrid();
  }

  function init() {
    if (LBB.mountChrome) LBB.mountChrome(document.body.getAttribute("data-active") || "");
    renderCartCount();
    const news = document.getElementById("newsForm");
    if (news) {
      news.addEventListener("submit", function (e) {
        e.preventDefault();
        news.reset();
        toast("Merci ! Votre inscription est confirmée.");
      });
    }
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();

  window.LBB = window.LBB || {};
  window.LBB.cart = {
    get: getCart,
    set: setCart,
    qty: cartQty,
    subtotal: cartSubtotal,
    add: addToCart,
    updateQty: updateQty,
    remove: removeFromCart,
    clear: clearCart
  };
  window.LBB.renderCartCount = renderCartCount;
  window.LBB.renderListing = renderListing;
  window.LBB.addToCart = addToCart;
  window.LBB.toast = toast;
})();
