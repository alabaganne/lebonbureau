/* Landing hero — headline, stat strip, and the floating best-seller card. */

import Button from "@/components/Button";
import { img } from "@/lib/data";

export default function Hero() {
  return (
    <section className="pt-16 pb-10">
      <div className="wrap grid grid-cols-[1.05fr_.95fr] gap-14 items-center max-[960px]:grid-cols-1 max-[960px]:gap-9">
        <div>
          <span className="inline-flex items-center gap-[9px] bg-green-soft text-green-deep text-[13px] font-semibold px-[14px] py-[7px] rounded-full mb-[22px]">
            <span className="w-[7px] h-[7px] rounded-full bg-green" />
            Sélection ergonomique · Édition IKEA
          </span>
          <h1 className="display mb-[22px]">
            Le bureau qui<br />
            tient la <em className="italic text-green">distance</em>.
          </h1>
          <p className="text-[19px] text-ink-soft max-w-[46ch] mb-[30px]">
            Des bureaux ergonomiques choisis pour celles et ceux qui codent, jouent et créent
            pendant des heures. Confort, posture et style — sans compromis.
          </p>
          <div className="flex gap-[14px] flex-wrap items-center">
            <Button href="/#catalogue" variant="primary" size="lg">
              Voir le catalogue
            </Button>
            <Button href="/#ergonomie" variant="ghost" size="lg">
              Pourquoi l&apos;ergonomie ?
            </Button>
          </div>
          <div className="flex gap-[34px] mt-10 max-[560px]:gap-6">
            <div>
              <div className="font-serif text-[30px] font-semibold leading-none">6</div>
              <div className="text-[13.5px] text-ink-faint mt-[6px]">modèles sélectionnés</div>
            </div>
            <div>
              <div className="font-serif text-[30px] font-semibold leading-none">10 ans</div>
              <div className="text-[13.5px] text-ink-faint mt-[6px]">de garantie cadre</div>
            </div>
            <div>
              <div className="font-serif text-[30px] font-semibold leading-none">Tunisie</div>
              <div className="text-[13.5px] text-ink-faint mt-[6px]">livraison offerte</div>
            </div>
          </div>
        </div>
        <div className="relative rounded-card-lg overflow-hidden aspect-[5/6] bg-sand-deep shadow-card max-[960px]:aspect-[5/4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full h-full object-cover" src={img(1957477, 760, 920)} alt="Bureau ergonomique en situation" />
          <div className="absolute left-[18px] bottom-[18px] right-[18px] bg-white/92 backdrop-blur-[8px] rounded-[14px] px-[18px] py-[14px] flex items-center justify-between shadow-card">
            <div>
              <div className="font-semibold text-[15px]">Atlas · Assis-debout</div>
              <div className="text-[13px] text-ink-faint">Le best-seller de la maison</div>
            </div>
            <Button
              href="/product/atlas"
              variant="dark"
              style={{ padding: "10px 18px", fontSize: 14 }}
            >
              Découvrir
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
