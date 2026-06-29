/* Mentions légales & CGV — legal page with a sticky table-of-contents nav.
   The footer "CGV" link targets the #cgv section. */

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Mentions légales & CGV",
  description: "Les informations légales de LeBonBureau et nos conditions générales de vente.",
};

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title={<>Mentions légales &amp; CGV</>}
        updated="Dernière mise à jour : janvier 2026"
      >
        Les informations légales de LeBonBureau et nos conditions générales de vente.
      </PageHero>

      <main className="content">
        <div className="wrap doc-grid">
          <nav className="doc-nav">
            <span className="doc-nav-title">Sommaire</span>
            <a href="#editeur">Éditeur du site</a>
            <a href="#hebergement">Hébergement</a>
            <a href="#propriete">Propriété intellectuelle</a>
            <a href="#donnees">Données personnelles</a>
            <a href="#cgv">Conditions de vente</a>
            <a href="#prix">Prix &amp; paiement</a>
            <a href="#retractation">Droit de rétractation</a>
          </nav>

          <div className="prose">
            <section id="editeur">
              <h2>Éditeur du site</h2>
              <p>
                Le présent site <strong>lebonbureau.tn</strong> est édité par LeBonBureau, société
                de vente de mobilier de bureau ergonomique.
              </p>
              <ul>
                <li><strong>Raison sociale&nbsp;:</strong> LeBonBureau SARL</li>
                <li><strong>Téléphone&nbsp;:</strong> +216 71 000 000</li>
                <li><strong>E-mail&nbsp;:</strong> bonjour@lebonbureau.tn</li>
                <li><strong>Matricule fiscal&nbsp;:</strong> 0000000/A/M/000</li>
              </ul>
              <p>
                Ces informations sont fournies à titre indicatif dans le cadre de cette
                démonstration et sont à compléter avec les données officielles de l&apos;entreprise.
              </p>
            </section>

            <section id="hebergement">
              <h2>Hébergement</h2>
              <p>
                Le site est hébergé par un prestataire d&apos;hébergement web tiers. Les coordonnées
                complètes de l&apos;hébergeur sont disponibles sur simple demande via la page{" "}
                <Link href="/#contact">Contact</Link>.
              </p>
            </section>

            <section id="propriete">
              <h2>Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des éléments du site (textes, mise en page, logo, identité visuelle)
                est la propriété de LeBonBureau, sauf mention contraire. Toute reproduction sans
                autorisation est interdite.
              </p>
              <p>
                Les photographies de produits proviennent de banques d&apos;images libres de droits
                (Pexels) et restent la propriété de leurs auteurs respectifs.
              </p>
            </section>

            <section id="donnees">
              <h2>Données personnelles</h2>
              <p>
                Les informations recueillies lors d&apos;une commande (nom, téléphone, adresse,
                e-mail) servent uniquement au traitement et à la livraison de votre commande. Elles
                ne sont jamais revendues à des tiers.
              </p>
              <p>
                Conformément à la loi tunisienne relative à la protection des données personnelles,
                vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
                données. Pour l&apos;exercer, écrivez-nous via la page{" "}
                <Link href="/#contact">Contact</Link>.
              </p>
            </section>

            <section id="cgv">
              <h2>Conditions générales de vente</h2>
              <p>
                Les présentes conditions régissent les ventes conclues sur le site lebonbureau.tn.
                Toute commande implique l&apos;acceptation pleine et entière des présentes CGV.
              </p>
              <h3>Produits</h3>
              <p>
                Les bureaux sont présentés avec le plus grand soin. Les photographies et descriptifs
                sont les plus fidèles possibles mais ne sauraient engager LeBonBureau pour de
                légères différences (teinte du bois, rendu d&apos;écran).
              </p>
              <h3>Commande</h3>
              <p>
                La commande est validée une fois les informations de livraison renseignées et
                confirmées par le client. Un récapitulatif est affiché avant validation finale.
              </p>
            </section>

            <section id="prix">
              <h2>Prix &amp; paiement</h2>
              <p>
                Les prix sont indiqués en <strong>dinars tunisiens (DT)</strong>, toutes taxes
                comprises. LeBonBureau se réserve le droit de modifier ses prix à tout moment, le
                prix appliqué étant celui en vigueur au moment de la commande.
              </p>
              <p>
                Le règlement s&apos;effectue <strong>à la livraison</strong>, en espèces. Le paiement
                par carte bancaire en ligne sera proposé ultérieurement.
              </p>
            </section>

            <section id="retractation">
              <h2>Droit de rétractation</h2>
              <p>
                Le client dispose d&apos;un délai de <strong>30 jours</strong> à compter de la
                réception pour retourner un produit. Les modalités détaillées figurent sur la page{" "}
                <Link href="/livraison-retours">Livraison &amp; retours</Link>.
              </p>
              <p>
                La garantie commerciale (5 à 10 ans selon le modèle) s&apos;applique en complément
                des garanties légales en vigueur.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
