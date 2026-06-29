/* LeBonBureau — shared storefront footer. Static; safe as a server component. */

import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "./Icons";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div className="footer-col">
          <div className="brand">
            Le<span className="dot" style={{ color: "var(--green)" }}>Bon</span>Bureau
            <span style={{ color: "var(--green)" }}>.</span>
          </div>
          <p className="footer-blurb">
            La sélection tunisienne de bureaux ergonomiques pour gamers, développeurs et créatifs
            exigeants.
          </p>
          <div className="footer-social">
            <a
              href="https://facebook.com/lebonbureau"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://instagram.com/lebonbureau"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Catalogue</h4>
          <ul>
            <li><Link href="/#catalogue">Gaming</Link></li>
            <li><Link href="/#catalogue">Programmation</Link></li>
            <li><Link href="/#catalogue">Assis-debout</Link></li>
            <li><Link href="/#catalogue">Tous les bureaux</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Aide</h4>
          <ul>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/livraison-retours">Livraison &amp; retours</Link></li>
            <li><Link href="/faq#dimensions">Guide des tailles</Link></li>
            <li><Link href="/faq#montage">Montage</Link></li>
            <li><Link href="/#contact">Nous contacter</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Maison</h4>
          <ul>
            <li><Link href="/#engagements">Nos engagements</Link></li>
            <li><Link href="/#ergonomie">Ergonomie</Link></li>
            <li><Link href="/mentions-legales#cgv">CGV</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 LeBonBureau — Tous droits réservés.</span>
        <span>
          Paiement sécurisé · Visa · Mastercard · à la livraison ·{" "}
          <Link href="/admin/login" style={{ textDecoration: "underline" }}>
            Espace pro
          </Link>
        </span>
      </div>
    </footer>
  );
}
