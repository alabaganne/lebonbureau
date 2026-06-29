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

      <main className="pt-[52px] pb-[84px]">
        <div className="wrap grid grid-cols-[230px_1fr] gap-[52px] items-start max-[860px]:grid-cols-1 max-[860px]:gap-[28px]">
          <nav className="sticky top-[92px] flex flex-col gap-[2px] max-[860px]:static max-[860px]:flex-row max-[860px]:flex-wrap max-[860px]:gap-[8px]">
            <span className="text-xs tracking-[.12em] uppercase font-semibold text-ink-faint mb-[10px] max-[860px]:w-full max-[860px]:mb-[4px]">Sommaire</span>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#editeur">Éditeur du site</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#hebergement">Hébergement</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#propriete">Propriété intellectuelle</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#donnees">Données personnelles</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#cgv">Conditions de vente</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#prix">Prix &amp; paiement</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#retractation">Droit de rétractation</a>
          </nav>

          <div className="max-w-[70ch]">
            <section id="editeur" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px]">Éditeur du site</h2>
              <p className="text-ink-soft mb-[15px]">
                Le présent site <strong className="text-ink font-semibold">lebonbureau.tn</strong> est édité par LeBonBureau, société
                de vente de mobilier de bureau ergonomique.
              </p>
              <ul className="text-ink-soft mb-[16px] pl-5 list-disc">
                <li className="mb-[7px] marker:text-green"><strong className="text-ink font-semibold">Raison sociale&nbsp;:</strong> LeBonBureau SARL</li>
                <li className="mb-[7px] marker:text-green"><strong className="text-ink font-semibold">Téléphone&nbsp;:</strong> +216 71 000 000</li>
                <li className="mb-[7px] marker:text-green"><strong className="text-ink font-semibold">E-mail&nbsp;:</strong> bonjour@lebonbureau.tn</li>
                <li className="mb-[7px] marker:text-green"><strong className="text-ink font-semibold">Matricule fiscal&nbsp;:</strong> 0000000/A/M/000</li>
              </ul>
              <p className="text-ink-soft mb-[15px]">
                Ces informations sont fournies à titre indicatif dans le cadre de cette
                démonstration et sont à compléter avec les données officielles de l&apos;entreprise.
              </p>
            </section>

            <section id="hebergement" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">Hébergement</h2>
              <p className="text-ink-soft mb-[15px]">
                Le site est hébergé par un prestataire d&apos;hébergement web tiers. Les coordonnées
                complètes de l&apos;hébergeur sont disponibles sur simple demande via la page{" "}
                <Link className="text-green underline underline-offset-2" href="/#contact">Contact</Link>.
              </p>
            </section>

            <section id="propriete" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">Propriété intellectuelle</h2>
              <p className="text-ink-soft mb-[15px]">
                L&apos;ensemble des éléments du site (textes, mise en page, logo, identité visuelle)
                est la propriété de LeBonBureau, sauf mention contraire. Toute reproduction sans
                autorisation est interdite.
              </p>
              <p className="text-ink-soft mb-[15px]">
                Les photographies de produits proviennent de banques d&apos;images libres de droits
                (Pexels) et restent la propriété de leurs auteurs respectifs.
              </p>
            </section>

            <section id="donnees" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">Données personnelles</h2>
              <p className="text-ink-soft mb-[15px]">
                Les informations recueillies lors d&apos;une commande (nom, téléphone, adresse,
                e-mail) servent uniquement au traitement et à la livraison de votre commande. Elles
                ne sont jamais revendues à des tiers.
              </p>
              <p className="text-ink-soft mb-[15px]">
                Conformément à la loi tunisienne relative à la protection des données personnelles,
                vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
                données. Pour l&apos;exercer, écrivez-nous via la page{" "}
                <Link className="text-green underline underline-offset-2" href="/#contact">Contact</Link>.
              </p>
            </section>

            <section id="cgv" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">Conditions générales de vente</h2>
              <p className="text-ink-soft mb-[15px]">
                Les présentes conditions régissent les ventes conclues sur le site lebonbureau.tn.
                Toute commande implique l&apos;acceptation pleine et entière des présentes CGV.
              </p>
              <h3 className="text-[17px] font-bold mt-[22px] mb-[8px]">Produits</h3>
              <p className="text-ink-soft mb-[15px]">
                Les bureaux sont présentés avec le plus grand soin. Les photographies et descriptifs
                sont les plus fidèles possibles mais ne sauraient engager LeBonBureau pour de
                légères différences (teinte du bois, rendu d&apos;écran).
              </p>
              <h3 className="text-[17px] font-bold mt-[22px] mb-[8px]">Commande</h3>
              <p className="text-ink-soft mb-[15px]">
                La commande est validée une fois les informations de livraison renseignées et
                confirmées par le client. Un récapitulatif est affiché avant validation finale.
              </p>
            </section>

            <section id="prix" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">Prix &amp; paiement</h2>
              <p className="text-ink-soft mb-[15px]">
                Les prix sont indiqués en <strong className="text-ink font-semibold">dinars tunisiens (DT)</strong>, toutes taxes
                comprises. LeBonBureau se réserve le droit de modifier ses prix à tout moment, le
                prix appliqué étant celui en vigueur au moment de la commande.
              </p>
              <p className="text-ink-soft mb-[15px]">
                Le règlement s&apos;effectue <strong className="text-ink font-semibold">à la livraison</strong>, en espèces. Le paiement
                par carte bancaire en ligne sera proposé ultérieurement.
              </p>
            </section>

            <section id="retractation" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">Droit de rétractation</h2>
              <p className="text-ink-soft mb-[15px]">
                Le client dispose d&apos;un délai de <strong className="text-ink font-semibold">30 jours</strong> à compter de la
                réception pour retourner un produit. Les modalités détaillées figurent sur la page{" "}
                <Link className="text-green underline underline-offset-2" href="/livraison-retours">Livraison &amp; retours</Link>.
              </p>
              <p className="text-ink-soft mb-[15px]">
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
