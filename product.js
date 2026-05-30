/* LeBonBureau — logique fiche produit */
(function () {
  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }

  const id = qs("id") || LBB.products[0].id;
  const p = LBB.byId(id) || LBB.products[0];

  // State
  let colorIdx = 0;
  let sizeIdx = 0;
  let qty = 1;

  function galleryImg(i) {
    const images = p.images && p.images.length ? p.images : ["assets/desks/line-main.jpg"];
    return images[i % images.length];
  }

  // ---- Head text ----
  document.title = "LeBonBureau — " + p.name;
  document.getElementById("crumbName").textContent = p.name;
  document.getElementById("pdCat").textContent = p.categoryLabel;
  document.getElementById("pdTitle").textContent = p.name;
  document.getElementById("pdSub").textContent = p.sub;
  document.getElementById("pdDesc").textContent = p.desc;

  // ---- Price ----
  const save = p.oldPrice ? p.oldPrice - p.price : 0;
  document.getElementById("priceline").innerHTML =
    '<span class="now">' + LBB.euro(p.price) + "</span>" +
    (p.oldPrice ? '<span class="was">' + LBB.euro(p.oldPrice) + "</span>" : "") +
    (save ? '<span class="save">− ' + LBB.euro(save) + "</span>" : "");

  // ---- Warranty line from specs ----
  const warranty = (p.specs.find(function (s) { return /garantie/i.test(s[0]); }) || [, "5 ans"])[1];
  document.getElementById("warrantyLine").textContent = "Garantie " + warranty.toLowerCase();

  // ---- Gallery ----
  const mainImg = document.getElementById("mainImg");
  const thumbs = document.getElementById("thumbs");
  mainImg.alt = p.name;
  function setMain(i) {
    mainImg.src = galleryImg(i);
    thumbs.querySelectorAll(".thumb").forEach(function (t, idx) {
      t.classList.toggle("active", idx === i);
    });
  }
  const galleryItems = (p.images && p.images.length ? p.images : ["assets/desks/line-main.jpg"]).map(function (_, i) { return i; });
  thumbs.innerHTML = galleryItems.map(function (i) {
    return '<button class="thumb" data-i="' + i + '"><img src="' + galleryImg(i) + '" alt="' + p.name + ' vue ' + (i + 1) + '" /></button>';
  }).join("");
  thumbs.querySelectorAll(".thumb").forEach(function (t) {
    t.addEventListener("click", function () { setMain(+t.getAttribute("data-i")); });
  });
  setMain(0);

  // ---- Colors ----
  const colorVal = document.getElementById("colorVal");
  const swHost = document.getElementById("swatches");
  function renderColors() {
    swHost.innerHTML = p.colors.map(function (c, i) {
      return '<button class="swatch' + (i === colorIdx ? " active" : "") +
        '" data-i="' + i + '" title="' + c.name + '" aria-label="' + c.name +
        '"><span style="background:' + c.hex + '"></span></button>';
    }).join("");
    colorVal.textContent = p.colors[colorIdx].name;
    swHost.querySelectorAll(".swatch").forEach(function (b) {
      b.addEventListener("click", function () {
        colorIdx = +b.getAttribute("data-i");
        renderColors();
      });
    });
  }
  renderColors();

  // ---- Sizes ----
  const sizeVal = document.getElementById("sizeVal");
  const sizeHost = document.getElementById("sizes");
  function renderSizes() {
    sizeHost.innerHTML = p.sizes.map(function (s, i) {
      return '<button class="size-btn' + (i === sizeIdx ? " active" : "") +
        '" data-i="' + i + '">' + s + "</button>";
    }).join("");
    sizeVal.textContent = p.sizes[sizeIdx];
    sizeHost.querySelectorAll(".size-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        sizeIdx = +b.getAttribute("data-i");
        renderSizes();
      });
    });
  }
  renderSizes();

  // ---- Quantity ----
  const qVal = document.getElementById("qVal");
  function renderQty() { qVal.textContent = qty; }
  document.getElementById("qMinus").addEventListener("click", function () {
    qty = Math.max(1, qty - 1); renderQty();
  });
  document.getElementById("qPlus").addEventListener("click", function () {
    qty = Math.min(9, qty + 1); renderQty();
  });

  // ---- Add to cart ----
  document.getElementById("addBtn").addEventListener("click", function () {
    LBB.addToCart({
      id: p.id,
      name: p.name,
      color: p.colors[colorIdx].name,
      size: p.sizes[sizeIdx],
      price: p.price,
      qty: qty
    });
    LBB.toast(qty + "× " + p.name + " (" + p.colors[colorIdx].name + ") ajouté au panier");
  });

  // ---- Specs ----
  document.getElementById("specBody").innerHTML = p.specs.map(function (s) {
    return "<tr><td>" + s[0] + "</td><td>" + s[1] + "</td></tr>";
  }).join("");

  // ---- Features ----
  const ic = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>';
  document.getElementById("featureList").innerHTML = p.features.map(function (f) {
    return '<div class="feature"><div class="ic">' + ic + "</div><div><h4>" +
      f[0] + "</h4><p>" + f[1] + "</p></div></div>";
  }).join("");

  // ---- Related (other products, up to 3) ----
  const related = LBB.products.filter(function (x) { return x.id !== p.id; }).slice(0, 3);
  document.getElementById("relGrid").innerHTML = related.map(LBB.components.productCard).join("");
})();
