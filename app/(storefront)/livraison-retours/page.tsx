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

      <main className="pt-[52px] pb-[84px]">
        <div className="wrap grid grid-cols-[230px_1fr] gap-[52px] items-start max-[860px]:grid-cols-1 max-[860px]:gap-[28px]">
          <nav className="sticky top-[92px] flex flex-col gap-[2px] max-[860px]:static max-[860px]:flex-row max-[860px]:flex-wrap max-[860px]:gap-[8px]">
            <span className="text-xs tracking-[.12em] uppercase font-semibold text-ink-faint mb-[10px] max-[860px]:w-full max-[860px]:mb-[4px]">Sur cette page</span>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#zones">Zones &amp; délais</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#frais">Frais de livraison</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#reception">À la réception</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#retours">Retours &amp; remboursement</a>
            <a className="text-[14px] text-ink-soft px-[14px] py-[9px] border-l-2 border-l-line no-underline hover:text-ink hover:bg-sand hover:border-l-green max-[860px]:border max-[860px]:border-l-[1px] max-[860px]:border-line max-[860px]:rounded-none" href="#sav">Garantie &amp; SAV</a>
          </nav>

          <div className="max-w-[70ch]">
            <div className="bg-green-soft border border-[#d4e4da] rounded-card px-[22px] py-5 mb-[22px] flex gap-[14px] items-start">
              <TruckIcon size={20} strokeWidth={1.9} className="flex-none text-green mt-[2px]" />
              <p className="text-green-deep text-[14.5px]">
                <strong className="text-green-deep font-semibold">Livraison gratuite</strong> sur tous les bureaux, dans les 24
                gouvernorats. Vous payez à la réception, en espèces.
              </p>
            </div>

            <section id="zones" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px]">Zones &amp; délais</h2>
              <p className="text-ink-soft mb-[15px]">Nous livrons dans toute la Tunisie. Le délai dépend de votre gouvernorat&nbsp;:</p>
              <ul className="text-ink-soft mb-[16px] pl-5 list-disc">
                <li className="mb-[7px] marker:text-green"><strong className="text-ink font-semibold">Grand Tunis</strong> (Tunis, Ariana, Ben Arous, La Manouba)&nbsp;: 2 à 3 jours ouvrés.</li>
                <li className="mb-[7px] marker:text-green"><strong className="text-ink font-semibold">Sahel &amp; Nord-Est</strong> (Sousse, Monastir, Mahdia, Nabeul, Bizerte)&nbsp;: 3 à 4 jours ouvrés.</li>
                <li className="mb-[7px] marker:text-green"><strong className="text-ink font-semibold">Autres gouvernorats</strong>&nbsp;: 4 à 5 jours ouvrés.</li>
              </ul>
              <p className="text-ink-soft mb-[15px]">
                Avant chaque livraison, nous vous appelons au numéro indiqué pour convenir d&apos;un
                créneau qui vous arrange.
              </p>
            </section>

            <section id="frais" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">Frais de livraison</h2>
              <p className="text-ink-soft mb-[15px]">
                La livraison à domicile est <strong className="text-ink font-semibold">offerte</strong> sur l&apos;intégralité du
                catalogue, quel que soit le nombre de bureaux commandés. Aucun frais n&apos;est
                ajouté au moment de payer&nbsp;: le total affiché dans votre panier est le total
                final.
              </p>
            </section>

            <section id="reception" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">À la réception</h2>
              <p className="text-ink-soft mb-[15px]">
                Le règlement se fait <strong className="text-ink font-semibold">à la livraison</strong>, en espèces, directement au
                livreur. Pensez à préparer l&apos;appoint si possible.
              </p>
              <p className="text-ink-soft mb-[15px]">
                Nous vous conseillons de vérifier l&apos;état du carton en présence du livreur. En
                cas de dommage visible lié au transport, signalez-le immédiatement et contactez-nous
                dans les 48&nbsp;heures avec une photo.
              </p>
            </section>

            <section id="retours" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">Retours &amp; remboursement</h2>
              <p className="text-ink-soft mb-[15px]">
                Vous disposez de <strong className="text-ink font-semibold">30 jours</strong> après réception pour retourner un bureau
                qui ne vous convient pas.
              </p>
              <h3 className="text-[17px] font-bold mt-[22px] mb-[8px]">Conditions</h3>
              <ul className="text-ink-soft mb-[16px] pl-5 list-disc">
                <li className="mb-[7px] marker:text-green">Le produit doit être en bon état, sans dommage d&apos;usage.</li>
                <li className="mb-[7px] marker:text-green">Idéalement remballé dans son emballage d&apos;origine avec la visserie.</li>
                <li className="mb-[7px] marker:text-green">Une preuve d&apos;achat (numéro de commande #LBB-…) est nécessaire.</li>
              </ul>
              <h3 className="text-[17px] font-bold mt-[22px] mb-[8px]">Marche à suivre</h3>
              <ul className="text-ink-soft mb-[16px] pl-5 list-disc">
                <li className="mb-[7px] marker:text-green">Contactez-nous par <Link className="text-green underline underline-offset-2" href="/#contact">téléphone ou e-mail</Link> en indiquant votre numéro de commande.</li>
                <li className="mb-[7px] marker:text-green">Nous organisons l&apos;enlèvement à votre domicile.</li>
                <li className="mb-[7px] marker:text-green">Après vérification, le remboursement est effectué sous 7 à 14 jours.</li>
              </ul>
            </section>

            <section id="sav" className="scroll-mt-[90px]">
              <h2 className="font-serif text-[27px] mb-[14px] mt-11">Garantie &amp; SAV</h2>
              <p className="text-ink-soft mb-[15px]">
                Tous nos bureaux sont garantis de <strong className="text-ink font-semibold">5 à 10 ans</strong> selon le modèle (et à
                vie sur le mécanisme du Pulse). La garantie couvre les défauts de fabrication et la
                structure.
              </p>
              <p className="text-ink-soft mb-[15px]">
                Un souci après l&apos;achat&nbsp;? Écrivez-nous via la page{" "}
                <Link className="text-green underline underline-offset-2" href="/#contact">Contact</Link> — nous trouvons une solution rapidement (pièce
                de rechange, réparation ou remplacement).
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
