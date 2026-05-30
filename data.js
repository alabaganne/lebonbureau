/* LeBonBureau — catalogue partagé (landing + fiche produit) */
(function () {
  const PRODUCTS = [
    {
      id: "atlas",
      name: "Atlas",
      sub: "Bureau assis-debout électrique",
      category: "assis-debout",
      categoryLabel: "Assis-debout",
      price: 1529,
      oldPrice: 1799,
      badge: "Best-seller",
      blurb:
        "Plateau motorisé de 65 à 132 cm. La référence pour alterner posture assise et debout sans quitter son flow.",
      desc:
        "Atlas est notre bureau assis-debout le plus polyvalent. Son moteur double colonne soulève jusqu'à 70 kg en silence, avec mémoire de quatre hauteurs. Idéal pour les longues sessions de code comme pour les marathons de jeu.",
      colors: [
        { name: "Chêne clair", hex: "#d8c4a0" },
        { name: "Noir mat", hex: "#26261f" },
        { name: "Blanc", hex: "#f3f1ea" }
      ],
      sizes: ["120 × 80 cm", "140 × 80 cm", "160 × 80 cm"],
      specs: [
        ["Réglage en hauteur", "65 – 132 cm"],
        ["Charge maximale", "70 kg"],
        ["Vitesse moteur", "38 mm/s"],
        ["Mémoire de positions", "4 hauteurs"],
        ["Niveau sonore", "< 45 dB"],
        ["Garantie", "10 ans cadre"]
      ],
      features: [
        ["Double moteur", "Montée fluide et stable, même à pleine charge."],
        ["Mémoire 4 positions", "Retrouvez votre hauteur d'un seul geste."],
        ["Passe-câbles intégré", "Goulotte aimantée sous le plateau."]
      ],
      tags: ["Programmation", "Gaming", "Télétravail"]
    },
    {
      id: "nova",
      name: "Nova",
      sub: "Bureau compact pour petits espaces",
      category: "programmation",
      categoryLabel: "Programmation",
      price: 539,
      oldPrice: null,
      badge: null,
      blurb:
        "100 × 56 cm. Pensé pour un setup deux écrans dans un studio ou un coin de chambre.",
      desc:
        "Nova fait beaucoup avec peu de place. Son plateau profond accueille deux écrans 27\" et son piètement en acier ne bouge pas d'un millimètre quand vous tapez vite. Le compagnon idéal des développeurs en appartement.",
      colors: [
        { name: "Frêne", hex: "#e0d3b6" },
        { name: "Anthracite", hex: "#33332b" }
      ],
      sizes: ["100 × 56 cm", "120 × 60 cm"],
      specs: [
        ["Dimensions plateau", "100 × 56 cm"],
        ["Hauteur fixe", "74 cm"],
        ["Charge maximale", "50 kg"],
        ["Épaisseur plateau", "22 mm"],
        ["Piètement", "Acier thermolaqué"],
        ["Garantie", "5 ans"]
      ],
      features: [
        ["Empreinte minimale", "S'installe dans moins d'un mètre carré."],
        ["Plateau anti-traces", "Stratifié mat qui ne marque pas."],
        ["Vérins réglables", "Stable même sur parquet ancien."]
      ],
      tags: ["Programmation", "Studio"]
    },
    {
      id: "vector",
      name: "Vector",
      sub: "Bureau d'angle gaming en L",
      category: "gaming",
      categoryLabel: "Gaming",
      price: 1119,
      oldPrice: 1319,
      badge: "Nouveau",
      blurb:
        "Format L de 160 × 140 cm. De la place pour trois écrans, le combo clavier-souris et le casque.",
      desc:
        "Vector épouse l'angle de votre pièce pour libérer un maximum de surface. Le plateau enveloppant garde tout à portée de main et le revêtement texturé glisse parfaitement pour la souris. Conçu pour la compétition.",
      colors: [
        { name: "Noir carbone", hex: "#222019" },
        { name: "Gris béton", hex: "#9a978c" }
      ],
      sizes: ["160 × 140 cm", "180 × 160 cm"],
      specs: [
        ["Dimensions", "160 × 140 cm"],
        ["Hauteur fixe", "75 cm"],
        ["Charge maximale", "60 kg"],
        ["Surface", "Texturée anti-reflets"],
        ["Gestion câbles", "Tunnel arrière + crochets"],
        ["Garantie", "5 ans"]
      ],
      features: [
        ["Format en L", "Trois écrans alignés sans compromis."],
        ["Surface micro-texturée", "Glisse précise sans tapis."],
        ["Crochet casque", "Rangement intégré côté plateau."]
      ],
      tags: ["Gaming", "Multi-écrans"]
    },
    {
      id: "pulse",
      name: "Pulse",
      sub: "Bureau assis-debout à manivelle",
      category: "assis-debout",
      categoryLabel: "Assis-debout",
      price: 819,
      oldPrice: null,
      badge: null,
      blurb:
        "L'assis-debout sans électronique. Manivelle douce, mécanisme garanti à vie.",
      desc:
        "Pulse prouve qu'on peut passer debout sans moteur. Sa manivelle repliable ajuste la hauteur en quelques tours et son mécanisme mécanique ne tombe jamais en panne. Le choix sobre et durable.",
      colors: [
        { name: "Bouleau", hex: "#e6dcc2" },
        { name: "Noir mat", hex: "#26261f" },
        { name: "Blanc", hex: "#f3f1ea" }
      ],
      sizes: ["120 × 70 cm", "140 × 70 cm"],
      specs: [
        ["Réglage en hauteur", "72 – 118 cm"],
        ["Mécanisme", "Manivelle repliable"],
        ["Charge maximale", "55 kg"],
        ["Tours / cycle complet", "~ 30"],
        ["Entretien", "Aucun"],
        ["Garantie", "À vie (mécanisme)"]
      ],
      features: [
        ["Zéro électronique", "Rien à brancher, rien à réparer."],
        ["Manivelle escamotable", "Disparaît sous le plateau."],
        ["Fabrication durable", "Conçu pour traverser les années."]
      ],
      tags: ["Assis-debout", "Durable"]
    },
    {
      id: "quartz",
      name: "Quartz",
      sub: "Grand bureau gaming pro",
      category: "gaming",
      categoryLabel: "Gaming",
      price: 1289,
      oldPrice: null,
      badge: null,
      blurb:
        "180 × 80 cm d'un seul tenant. Le plateau XXL pour les setups les plus ambitieux.",
      desc:
        "Quartz mise sur la surface. Son plateau d'un seul bloc de 180 cm encaisse une station complète : écran ultra-large, second moniteur, deck de streaming et plus encore. Le piètement en H assure une stabilité totale.",
      colors: [
        { name: "Noir mat", hex: "#222019" },
        { name: "Chêne foncé", hex: "#7d6647" }
      ],
      sizes: ["160 × 80 cm", "180 × 80 cm"],
      specs: [
        ["Dimensions", "180 × 80 cm"],
        ["Hauteur fixe", "75 cm"],
        ["Charge maximale", "80 kg"],
        ["Piètement", "Acier en H"],
        ["Épaisseur plateau", "25 mm"],
        ["Garantie", "5 ans"]
      ],
      features: [
        ["Plateau XXL", "Toute la station sur une seule surface."],
        ["Piètement en H", "Aucune flexion, aucun balancement."],
        ["Bords adoucis", "Confort des avant-bras sur la durée."]
      ],
      tags: ["Gaming", "Streaming"]
    },
    {
      id: "line",
      name: "Liné",
      sub: "Bureau minimaliste essentiel",
      category: "programmation",
      categoryLabel: "Programmation",
      price: 439,
      oldPrice: null,
      badge: "Petit prix",
      blurb:
        "Quatre pieds, un plateau franc. L'essentiel, bien fait, pour démarrer un setup propre.",
      desc:
        "Liné va droit au but : un plateau net, des pieds fins en acier, rien de superflu. C'est le premier bureau idéal pour un poste de travail soigné sans exploser le budget.",
      colors: [
        { name: "Frêne", hex: "#e0d3b6" },
        { name: "Blanc", hex: "#f3f1ea" },
        { name: "Noir mat", hex: "#26261f" }
      ],
      sizes: ["110 × 60 cm", "130 × 65 cm"],
      specs: [
        ["Dimensions", "110 × 60 cm"],
        ["Hauteur fixe", "74 cm"],
        ["Charge maximale", "45 kg"],
        ["Pieds", "Acier Ø 40 mm"],
        ["Montage", "< 15 minutes"],
        ["Garantie", "5 ans"]
      ],
      features: [
        ["Lignes épurées", "Se fond dans tous les intérieurs."],
        ["Montage express", "Assemblé en moins d'un quart d'heure."],
        ["Vérins de niveau", "Stable sur sol irrégulier."]
      ],
      tags: ["Programmation", "Essentiel"]
    }
  ];

  const CATEGORIES = [
    { id: "tous", label: "Tous les bureaux" },
    { id: "gaming", label: "Gaming" },
    { id: "programmation", label: "Programmation" },
    { id: "assis-debout", label: "Assis-debout" }
  ];

  // Striped SVG placeholder — drop real product shots here later.
  function placeholder(label, opts) {
    opts = opts || {};
    const w = opts.w || 800;
    const h = opts.h || 600;
    const bg = opts.bg || "#efece4";
    const stripe = opts.stripe || "#e3dfd4";
    const ink = opts.ink || "#9a978c";
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">` +
      `<defs><pattern id="p" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">` +
      `<rect width="16" height="16" fill="${bg}"/>` +
      `<rect width="8" height="16" fill="${stripe}"/></pattern></defs>` +
      `<rect width="${w}" height="${h}" fill="url(#p)"/>` +
      `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ` +
      `font-family="ui-monospace, Menlo, monospace" font-size="${opts.fs || 22}" letter-spacing="1" fill="${ink}">${label}</text>` +
      `</svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  window.LBB = {
    products: PRODUCTS,
    categories: CATEGORIES,
    byId: function (id) {
      return PRODUCTS.find(function (p) { return p.id === id; });
    },
    placeholder: placeholder,
    euro: function (n) {
      return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " DT";
    }
  };
})();
