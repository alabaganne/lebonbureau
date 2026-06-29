/* FAQ — native <details> accordion grouped by topic. Server component. */

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ChevronDownIcon } from "@/components/Icons";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Tout ce qu'il faut savoir avant et après l'achat d'un bureau LeBonBureau : commande, livraison, dimensions, montage et garantie.",
};

function FaqItem({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <details className="group border-b border-line">
      <summary className="cursor-pointer list-none py-5 font-semibold text-[16.5px] flex justify-between gap-[18px] items-center [&::-webkit-details-marker]:hidden">
        {q}
        <ChevronDownIcon size={18} className="flex-none text-ink-faint transition-transform duration-[220ms] ease-[ease] group-open:rotate-180 group-open:text-green" />
      </summary>
      <div className="pb-6 text-ink-soft max-w-[64ch] text-[15px] leading-[1.6] [&_p]:mb-[12px] [&_a]:text-green [&_a]:underline">{children}</div>
    </details>
  );
}

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Aide" title="Questions fréquentes">
        Tout ce qu&apos;il faut savoir avant et après l&apos;achat. Vous ne trouvez pas votre
        réponse&nbsp;?{" "}
        <Link href="/#contact" style={{ color: "var(--green)", textDecoration: "underline" }}>
          Contactez-nous
        </Link>
        .
      </PageHero>

      <main className="pt-[52px] pb-[84px]">
        <div className="wrap max-w-[780px]">
          <h2 className="font-serif text-6 mb-[6px] scroll-mt-[90px]" id="commande">Commande &amp; paiement</h2>
          <FaqItem q="Comment passer commande&nbsp;?">
            <p>
              Ajoutez un bureau au panier, choisissez la finition et la taille, puis validez. Au
              paiement, indiquez votre nom, téléphone et adresse de livraison — aucun compte
              n&apos;est nécessaire.
            </p>
          </FaqItem>
          <FaqItem q="Quels moyens de paiement acceptez-vous&nbsp;?">
            <p>
              Le <strong>paiement à la livraison</strong> (espèces) est disponible partout en
              Tunisie. Le paiement par carte bancaire en ligne arrive prochainement.
            </p>
          </FaqItem>
          <FaqItem q="Puis-je modifier ou annuler ma commande&nbsp;?">
            <p>
              Oui, tant que la commande n&apos;a pas été expédiée. Appelez-nous avec votre numéro{" "}
              <strong>#LBB-…</strong> et nous ajustons tout avec vous.
            </p>
          </FaqItem>

          <h2 className="font-serif text-6 mt-10 mb-[6px] scroll-mt-[90px]" id="livraison">Livraison</h2>
          <FaqItem q="Quels sont les délais de livraison&nbsp;?">
            <p>
              Comptez 2 à 5 jours ouvrés selon le gouvernorat. Nous vous appelons pour convenir
              d&apos;un créneau avant chaque livraison à domicile.
            </p>
          </FaqItem>
          <FaqItem q="La livraison est-elle vraiment gratuite&nbsp;?">
            <p>
              Oui — la livraison est offerte sur tous les bureaux, dans les 24 gouvernorats. Aucun
              frais caché au moment de payer.
            </p>
          </FaqItem>
          <FaqItem q="Livrez-vous à l'étage&nbsp;?">
            <p>
              La livraison se fait jusqu&apos;à votre porte. Précisez l&apos;étage et la présence
              d&apos;un ascenseur dans les instructions de commande pour qu&apos;on s&apos;organise
              au mieux.
            </p>
          </FaqItem>

          <h2 className="font-serif text-6 mt-10 mb-[6px] scroll-mt-[90px]" id="dimensions">Dimensions &amp; choix</h2>
          <FaqItem q="Comment choisir la bonne taille&nbsp;?">
            <p>
              Mesurez l&apos;espace disponible avant de commander. Pour un seul écran,
              100–120&nbsp;cm suffisent&nbsp;; pour deux écrans ou un setup gaming, visez
              140&nbsp;cm et plus. Chaque fiche produit indique les dimensions exactes.
            </p>
          </FaqItem>
          <FaqItem q="Quelle hauteur de bureau pour une bonne posture&nbsp;?">
            <p>
              À hauteur assise, vos avant-bras doivent reposer à l&apos;horizontale, coudes à
              ~90°. Nos modèles fixes sont à 74–75&nbsp;cm. Pour alterner debout, choisissez un
              modèle assis-debout (Atlas ou Pulse).
            </p>
          </FaqItem>
          <FaqItem q="Quel bureau pour un petit espace&nbsp;?">
            <p>
              Le Nova (100&nbsp;cm) et le Liné sont pensés pour les studios et petits coins bureau,
              sans sacrifier la place pour deux écrans.
            </p>
          </FaqItem>

          <h2 className="font-serif text-6 mt-10 mb-[6px] scroll-mt-[90px]" id="montage">Montage</h2>
          <FaqItem q="Le montage est-il compliqué&nbsp;?">
            <p>
              Non. Chaque bureau est livré avec une notice illustrée et la visserie nécessaire.
              Comptez 15 à 30 minutes selon le modèle&nbsp;; une seule personne suffit pour la
              plupart.
            </p>
          </FaqItem>
          <FaqItem q="Faut-il des outils particuliers&nbsp;?">
            <p>
              La clé de montage est fournie. Un tournevis cruciforme peut accélérer
              l&apos;assemblage, sans être indispensable.
            </p>
          </FaqItem>

          <h2 className="font-serif text-6 mt-10 mb-[6px] scroll-mt-[90px]" id="garantie">Garantie &amp; retours</h2>
          <FaqItem q="Quelle est la durée de garantie&nbsp;?">
            <p>
              De 5 ans à 10 ans selon le modèle (et à vie sur le mécanisme du Pulse). La durée
              exacte est indiquée sur chaque fiche produit.
            </p>
          </FaqItem>
          <FaqItem q="Comment retourner un bureau&nbsp;?">
            <p>
              Vous avez 30 jours pour changer d&apos;avis. Le produit doit être en bon état et si
              possible dans son emballage. Voir la page{" "}
              <Link href="/livraison-retours">Livraison &amp; retours</Link> pour la marche à
              suivre.
            </p>
          </FaqItem>
        </div>
      </main>
    </>
  );
}
