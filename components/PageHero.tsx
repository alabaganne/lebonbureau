/* Reusable hero band for content pages (FAQ, delivery, legal). */

import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  updated?: string;
}

export default function PageHero({ eyebrow, title, children, updated }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="wrap page-hero-inner">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
        {updated && <p className="updated">{updated}</p>}
      </div>
    </section>
  );
}
