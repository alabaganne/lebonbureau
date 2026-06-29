/* Landing "Bien choisir" — three-step guide to picking the right desk. */

const STEPS = [
  {
    n: "1",
    title: "Votre usage",
    body: "Gaming multi-écrans, développement concentré ou télétravail nomade — chaque profil a son format idéal.",
  },
  {
    n: "2",
    title: "Votre espace",
    body: "Mesurez la place disponible. Du compact 100 cm au plateau XXL 180 cm, il y a une taille pour chaque pièce.",
  },
  {
    n: "3",
    title: "Votre posture",
    body: "Hauteur fixe bien dimensionnée ou assis-debout réglable : on vous oriente vers la meilleure posture.",
  },
];

export default function ErgoSteps() {
  return (
    <section className="pt-[30px] pb-20" id="ergonomie">
      <div className="wrap">
        <div className="max-w-[56ch] mx-auto mb-12 text-center">
          <span className="eyebrow">Bien choisir</span>
          <h2 className="section-title" style={{ marginTop: 10 }}>
            Trouver le bon bureau en trois temps
          </h2>
          <p className="text-ink-soft mt-[14px]">Pas besoin d&apos;être ergonome. Trois questions suffisent pour viser juste.</p>
        </div>
        <div className="grid grid-cols-3 gap-6 max-[960px]:grid-cols-1">
          {STEPS.map((s) => (
            <div className="bg-sand border border-line rounded-card px-7 py-[30px]" key={s.n}>
              <div className="font-serif text-[15px] font-semibold text-green border border-green w-[38px] h-[38px] rounded-full grid place-items-center mb-[18px]">{s.n}</div>
              <h3 className="text-[21px] mb-[9px]">{s.title}</h3>
              <p className="text-ink-soft text-[14.5px]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
