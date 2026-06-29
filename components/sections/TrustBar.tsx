/* Landing trust strip — four reassurance items under the hero. */

import { CheckIcon, TruckIcon, ShieldIcon, ClockIcon } from "@/components/Icons";

export default function TrustBar() {
  return (
    <div className="trust">
      <div className="wrap trust-inner">
        <div className="trust-item">
          <CheckIcon size={20} />
          Montage simple, notice illustrée
        </div>
        <div className="trust-item">
          <TruckIcon size={20} />
          Livraison offerte en Tunisie
        </div>
        <div className="trust-item">
          <ShieldIcon size={20} />
          Garantie jusqu&apos;à 10 ans
        </div>
        <div className="trust-item">
          <ClockIcon size={20} />
          30 jours pour changer d&apos;avis
        </div>
      </div>
    </div>
  );
}
