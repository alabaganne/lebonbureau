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
    <section className="bg-sand border-b border-line">
      <div className="wrap pt-[52px] pb-[46px]">
        <span className="eyebrow block mb-[14px]">{eyebrow}</span>
        <h1 className="text-[clamp(34px,5vw,54px)] leading-[1.04] max-w-[20ch]">{title}</h1>
        {children && <p className="text-ink-soft text-[18px] mt-4 max-w-[56ch]">{children}</p>}
        {updated && <p className="text-[13.5px] text-ink-faint mt-[18px] max-w-[56ch]">{updated}</p>}
      </div>
    </section>
  );
}
