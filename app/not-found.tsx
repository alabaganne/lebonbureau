/* Global 404. Lives at the app root so it catches unmatched routes; it wears
   the storefront chrome itself since it sits outside the (storefront) group. */

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wrap notfound">
        <div className="code">404</div>
        <h1>Cette page a pris la poudre d&apos;escampette.</h1>
        <p>
          Le lien est peut-être cassé ou la page a été déplacée. Mais votre prochain bureau, lui,
          est bien là.
        </p>
        <div className="nf-links">
          <Link className="btn btn-primary btn-lg" href="/#catalogue">Voir le catalogue</Link>
          <Link className="btn btn-ghost btn-lg" href="/">Retour à l&apos;accueil</Link>
        </div>
        <p style={{ marginTop: 38, fontSize: 14.5, color: "var(--ink-faint)" }}>
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
