/* Landing trust strip — four reassurance items under the hero. */

import { CheckIcon, TruckIcon, ShieldIcon, ClockIcon } from "@/components/Icons";

export default function TrustBar() {
  return (
    <div className="border-t border-b border-line">
      <div className="wrap flex items-center justify-between gap-6 py-[22px] flex-wrap">
        <div className="flex items-center gap-[11px] text-ink-soft text-[14.5px] font-medium [&_svg]:text-green [&_svg]:flex-none">
          <CheckIcon size={20} />
          Montage simple, notice illustrée
        </div>
        <div className="flex items-center gap-[11px] text-ink-soft text-[14.5px] font-medium [&_svg]:text-green [&_svg]:flex-none">
          <TruckIcon size={20} />
          Livraison offerte en Tunisie
        </div>
        <div className="flex items-center gap-[11px] text-ink-soft text-[14.5px] font-medium [&_svg]:text-green [&_svg]:flex-none">
          <ShieldIcon size={20} />
          Garantie jusqu&apos;à 10 ans
        </div>
        <div className="flex items-center gap-[11px] text-ink-soft text-[14.5px] font-medium [&_svg]:text-green [&_svg]:flex-none">
          <ClockIcon size={20} />
          30 jours pour changer d&apos;avis
        </div>
      </div>
    </div>
  );
}
