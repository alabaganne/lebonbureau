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
    <section className="ergo" id="ergonomie">
      <div className="wrap">
        <div className="ergo-head">
          <span className="eyebrow">Bien choisir</span>
          <h2 className="section-title" style={{ marginTop: 10 }}>
            Trouver le bon bureau en trois temps
          </h2>
          <p>Pas besoin d&apos;être ergonome. Trois questions suffisent pour viser juste.</p>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
