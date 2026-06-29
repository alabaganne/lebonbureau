/* Landing green feature band — "Nos engagements". One of the few colored
   sections on the white canvas. */

import Link from "next/link";
import { CheckIcon } from "@/components/Icons";
import { img } from "@/lib/data";

const PROMISES = [
  "Hauteur adaptée à votre taille pour une posture neutre.",
  "Plateaux profonds : double écran et repose-poignets.",
  "Gestion des câbles intégrée, sans rallonge qui traîne.",
  "Matériaux durables, garantis plusieurs années.",
];

export default function GreenBand() {
  return (
    <div className="wrap">
      <section className="band" id="engagements">
        <div className="band-grid">
          <div className="band-copy">
            <span className="eyebrow on-green">Nos engagements</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Pensés pour les longues sessions.
            </h2>
            <p>
              On ne vend que des bureaux qu&apos;on utiliserait nous-mêmes, huit heures par jour.
              Voilà ce que chaque modèle vous garantit.
            </p>
            <ul className="band-list">
              {PROMISES.map((text) => (
                <li key={text}>
                  <CheckIcon size={20} strokeWidth={2} />
                  {text}
                </li>
              ))}
            </ul>
            <Link className="btn" href="/#catalogue" style={{ background: "#fff", color: "var(--green-deep)" }}>
              Choisir mon bureau
            </Link>
          </div>
          <div className="band-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(30469967, 760, 760)} alt="Espace de travail ergonomique" />
          </div>
        </div>
      </section>
    </div>
  );
}
