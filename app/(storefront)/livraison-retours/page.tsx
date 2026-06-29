/* Livraison & retours — policy page with a sticky in-page side nav. */

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { TruckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Livraison & retours",
  description:
    "Livraison offerte partout en Tunisie, paiement à la réception et 30 jours pour changer d'avis. Zones, délais, retours et SAV.",
};

export default function DeliveryPage() {
  return (
    <>
      <PageHero eyebrow="Aide" title={<>Livraison &amp; retours</>}>
        Livraison offerte partout en Tunisie, paiement à la réception, et 30 jours pour changer
        d&apos;avis. Voici comment ça marche.
      </PageHero>

      <main className="content">
        <div className="wrap doc-grid">
          <nav className="doc-nav">
            <span className="doc-nav-title">Sur cette page</span>
            <a href="#zones">Zones &amp; délais</a>
            <a href="#frais">Frais de livraison</a>
            <a href="#reception">À la réception</a>
            <a href="#retours">Retours &amp; remboursement</a>
            <a href="#sav">Garantie &amp; SAV</a>
          </nav>

          <div className="prose">
            <div className="callout">
              <TruckIcon size={20} strokeWidth={1.9} />
              <p>
                <strong>Livraison gratuite</strong> sur tous les bureaux, dans les 24
                gouvernorats. Vous payez à la réception, en espèces.
              </p>
            </div>

            <section id="zones">
              <h2>Zones &amp; délais</h2>
              <p>Nous livrons dans toute la Tunisie. Le délai dépend de votre gouvernorat&nbsp;:</p>
              <ul>
                <li><strong>Grand Tunis</strong> (Tunis, Ariana, Ben Arous, La Manouba)&nbsp;: 2 à 3 jours ouvrés.</li>
                <li><strong>Sahel &amp; Nord-Est</strong> (Sousse, Monastir, Mahdia, Nabeul, Bizerte)&nbsp;: 3 à 4 jours ouvrés.</li>
                <li><strong>Autres gouvernorats</strong>&nbsp;: 4 à 5 jours ouvrés.</li>
              </ul>
              <p>
                Avant chaque livraison, nous vous appelons au numéro indiqué pour convenir d&apos;un
                créneau qui vous arrange.
              </p>
            </section>

            <section id="frais">
              <h2>Frais de livraison</h2>
              <p>
                La livraison à domicile est <strong>offerte</strong> sur l&apos;intégralité du
                catalogue, quel que soit le nombre de bureaux commandés. Aucun frais n&apos;est
                ajouté au moment de payer&nbsp;: le total affiché dans votre panier est le total
                final.
              </p>
            </section>

            <section id="reception">
              <h2>À la réception</h2>
              <p>
                Le règlement se fait <strong>à la livraison</strong>, en espèces, directement au
                livreur. Pensez à préparer l&apos;appoint si possible.
              </p>
              <p>
                Nous vous conseillons de vérifier l&apos;état du carton en présence du livreur. En
                cas de dommage visible lié au transport, signalez-le immédiatement et contactez-nous
                dans les 48&nbsp;heures avec une photo.
              </p>
            </section>

            <section id="retours">
              <h2>Retours &amp; remboursement</h2>
              <p>
                Vous disposez de <strong>30 jours</strong> après réception pour retourner un bureau
                qui ne vous convient pas.
              </p>
              <h3>Conditions</h3>
              <ul>
                <li>Le produit doit être en bon état, sans dommage d&apos;usage.</li>
                <li>Idéalement remballé dans son emballage d&apos;origine avec la visserie.</li>
                <li>Une preuve d&apos;achat (numéro de commande #LBB-…) est nécessaire.</li>
              </ul>
              <h3>Marche à suivre</h3>
              <ul>
                <li>Contactez-nous par <Link href="/#contact">téléphone ou e-mail</Link> en indiquant votre numéro de commande.</li>
                <li>Nous organisons l&apos;enlèvement à votre domicile.</li>
                <li>Après vérification, le remboursement est effectué sous 7 à 14 jours.</li>
              </ul>
            </section>

            <section id="sav">
              <h2>Garantie &amp; SAV</h2>
              <p>
                Tous nos bureaux sont garantis de <strong>5 à 10 ans</strong> selon le modèle (et à
                vie sur le mécanisme du Pulse). La garantie couvre les défauts de fabrication et la
                structure.
              </p>
              <p>
                Un souci après l&apos;achat&nbsp;? Écrivez-nous via la page{" "}
                <Link href="/#contact">Contact</Link> — nous trouvons une solution rapidement (pièce
                de rechange, réparation ou remplacement).
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
