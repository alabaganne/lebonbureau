/* Landing hero — headline, stat strip, and the floating best-seller card. */

import Button from "@/components/Button";
import { img } from "@/lib/data";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="hero-tag">
            <span className="pip" />
            Sélection ergonomique · Édition IKEA
          </span>
          <h1 className="display">
            Le bureau qui<br />
            tient la <em>distance</em>.
          </h1>
          <p className="lead">
            Des bureaux ergonomiques choisis pour celles et ceux qui codent, jouent et créent
            pendant des heures. Confort, posture et style — sans compromis.
          </p>
          <div className="hero-cta">
            <Button href="/#catalogue" variant="primary" size="lg">
              Voir le catalogue
            </Button>
            <Button href="/#ergonomie" variant="ghost" size="lg">
              Pourquoi l&apos;ergonomie ?
            </Button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="n">6</div>
              <div className="l">modèles sélectionnés</div>
            </div>
            <div className="hero-stat">
              <div className="n">10 ans</div>
              <div className="l">de garantie cadre</div>
            </div>
            <div className="hero-stat">
              <div className="n">Tunisie</div>
              <div className="l">livraison offerte</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(1957477, 760, 920)} alt="Bureau ergonomique en situation" />
          <div className="hero-float">
            <div>
              <div className="t">Atlas · Assis-debout</div>
              <div className="s">Le best-seller de la maison</div>
            </div>
            <Button
              href="/product/atlas"
              variant="dark"
              style={{ padding: "10px 18px", fontSize: 14 }}
            >
              Découvrir
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
