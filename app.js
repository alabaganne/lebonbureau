/* LeBonBureau — interactivité partagée */
(function () {
  const CART_KEY = "lbb_cart";

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function setCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    renderCartCount();
  }
  function cartQty() {
    return getCart().reduce(function (n, i) { return n + i.qty; }, 0);
  }
  function addToCart(entry) {
    const cart = getCart();
    const key = entry.id + "|" + entry.color + "|" + entry.size;
    const found = cart.find(function (i) { return (i.id + "|" + i.color + "|" + i.size) === key; });
    if (found) found.qty += entry.qty;
    else cart.push(entry);
    setCart(cart);
  }
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

  // ---- Card markup ----
  function cardHTML(p) {
    const badge = p.badge
      ? '<span class="badge' + (p.oldPrice ? " promo" : "") + '">' + p.badge + "</span>"
      : "";
    const price =
      '<div class="price"><span class="now">' + LBB.euro(p.price) + "</span>" +
      (p.oldPrice ? '<span class="was">' + LBB.euro(p.oldPrice) + "</span>" : "") +
      "</div>";
    const img = p.images && p.images.length ? p.images[0] : "assets/desks/line-main.jpg";
    return (
      '<a class="card" href="produit.html?id=' + p.id + '">' +
        '<div class="card-media">' + badge +
          '<img src="' + img + '" alt="' + p.name + '" loading="lazy" />' +
        "</div>" +
        '<div class="card-body">' +
          '<span class="card-cat">' + p.categoryLabel + "</span>" +
          '<h3 class="card-name">' + p.name + "</h3>" +
          '<p class="card-blurb">' + p.blurb + "</p>" +
          '<div class="card-foot">' + price +
            '<span class="card-arrow" aria-hidden="true">' +
              '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
            "</span>" +
          "</div>" +
        "</div>" +
      "</a>"
    );
  }

  let activeFilter = "tous";
  function renderGrid() {
    const grid = document.getElementById("grid");
    if (!grid) return;
    const list = LBB.products.filter(function (p) {
      return activeFilter === "tous" || p.category === activeFilter;
    });
    grid.innerHTML = list.map(cardHTML).join("");
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

  // ---- Wire global chrome on every page ----
  function init() {
    renderCartCount();
    const cartBtn = document.getElementById("cartBtn");
    if (cartBtn) {
      cartBtn.addEventListener("click", function () {
        const q = cartQty();
        toast(q ? "Votre panier contient " + q + " article" + (q > 1 ? "s" : "") + " · paiement bientôt disponible" : "Votre panier est vide");
      });
    }
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

  // expose
  window.LBB = window.LBB || {};
  window.LBB.renderListing = renderListing;
  window.LBB.addToCart = addToCart;
  window.LBB.toast = toast;
})();
