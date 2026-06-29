/* Global 404. Lives at the app root so it catches unmatched routes; it wears
   the storefront chrome itself since it sits outside the (storefront) group. */

import Link from "next/link";
import Button from "@/components/Button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wrap text-center pt-[86px] px-5 pb-[104px]">
        <div className="font-serif text-[clamp(96px,20vw,200px)] leading-[.86] text-green tracking-[-.03em]">404</div>
        <h1 className="text-[clamp(26px,4vw,38px)] mt-[18px] mb-[12px]">Cette page a pris la poudre d&apos;escampette.</h1>
        <p className="text-ink-soft text-[18px] max-w-[44ch] mx-auto mb-[30px]">
          Le lien est peut-être cassé ou la page a été déplacée. Mais votre prochain bureau, lui,
          est bien là.
        </p>
        <div className="flex gap-[14px] justify-center flex-wrap">
          <Button href="/#catalogue" variant="primary" size="lg">Voir le catalogue</Button>
          <Button href="/" variant="ghost" size="lg">Retour à l&apos;accueil</Button>
        </div>
        <p className="text-ink-soft text-[18px] max-w-[44ch] mx-auto mb-[30px]" style={{ marginTop: 38, fontSize: 14.5, color: "var(--ink-faint)" }}>
          Besoin d&apos;aide&nbsp;?{" "}
          <Link href="/#contact" style={{ color: "var(--green)", textDecoration: "underline" }}>
            Contactez-nous
          </Link>{" "}
          ou consultez la{" "}
          <Link href="/faq" style={{ color: "var(--green)", textDecoration: "underline" }}>
            FAQ
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
