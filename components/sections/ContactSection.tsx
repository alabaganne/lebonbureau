"use client";

/* Landing contact section (id="contact") — info cards + message form.
   The form is front-end only for now; wire it to an endpoint later. */

import { type FormEvent, useRef } from "react";
import { useToast } from "@/lib/toast";
import Button from "@/components/Button";
import { PhoneIcon, MailIcon } from "@/components/Icons";

export default function ContactSection() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("cName") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("cPhone") as HTMLInputElement).value.trim();
    const msg = (form.elements.namedItem("cMsg") as HTMLTextAreaElement).value.trim();
    if (!name || !phone || !msg) {
      toast("Merci de remplir les champs obligatoires");
      return;
    }
    form.reset();
    toast("Message envoyé ! Nous vous répondons très vite.");
  }

  return (
    <section className="bg-sand border-t border-line" id="contact">
      <div className="wrap py-[72px] grid grid-cols-2 gap-10 items-center max-[960px]:grid-cols-1" style={{ alignItems: "start" }}>
        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="section-title mb-3" style={{ marginTop: 10 }}>
            On vous répond, vite et bien.
          </h2>
          <p className="text-ink-soft m-0 max-w-[40ch]" style={{ marginBottom: 26 }}>
            Une question sur un bureau, votre commande ou la livraison&nbsp;? Écrivez-nous ou
            appelez-nous — un humain vous répond du lundi au samedi.
          </p>
          <div className="flex flex-col gap-[14px]">
            <div className="flex gap-4 items-start bg-white border border-line rounded-card px-6 py-5">
              <div className="flex-none w-11 h-11 rounded-xl bg-green-soft text-green grid place-items-center"><PhoneIcon size={20} /></div>
              <div>
                <div className="text-xs tracking-[.1em] uppercase font-semibold text-ink-faint mb-1">Téléphone</div>
                <div className="text-base font-semibold [&_a]:text-ink [&_a:hover]:text-green"><a href="tel:+21671000000">+216 71 000 000</a></div>
                <div className="text-[13.5px] text-ink-soft mt-0.5">Lun–Sam · 9h00 – 18h00</div>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-white border border-line rounded-card px-6 py-5">
              <div className="flex-none w-11 h-11 rounded-xl bg-green-soft text-green grid place-items-center"><MailIcon size={20} /></div>
              <div>
                <div className="text-xs tracking-[.1em] uppercase font-semibold text-ink-faint mb-1">E-mail</div>
                <div className="text-base font-semibold [&_a]:text-ink [&_a:hover]:text-green"><a href="mailto:bonjour@lebonbureau.tn">bonjour@lebonbureau.tn</a></div>
                <div className="text-[13.5px] text-ink-soft mt-0.5">Réponse sous 24h ouvrées</div>
              </div>
            </div>
          </div>
        </div>
        <form ref={formRef} className="bg-white border border-line rounded-card-lg px-8 py-[30px] mb-6" onSubmit={onSubmit} noValidate style={{ margin: 0 }}>
          <div className="flex items-center gap-[14px] mb-6" style={{ marginBottom: 18 }}>
            <h2 className="mb-3" style={{ fontFamily: "var(--serif)", fontSize: 23 }}>Écrivez-nous</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-[18px] gap-y-4 max-[560px]:grid-cols-1">
            <div className="flex flex-col gap-[7px]">
              <label className="text-[13.5px] font-semibold text-ink" htmlFor="cName">Nom complet <span className="text-clay">*</span></label>
              <input className="text-[15px] text-ink bg-white border border-line rounded-[11px] px-[14px] py-3 transition-[border-color,box-shadow] duration-150 ease-[ease] focus:outline-none focus:border-green focus:shadow-[0_0_0_3px_#e7efe9] [&:invalid:not(:placeholder-shown)]:border-clay" id="cName" name="cName" type="text" placeholder="Votre nom" required />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-[13.5px] font-semibold text-ink" htmlFor="cPhone">Téléphone <span className="text-clay">*</span></label>
              <input className="text-[15px] text-ink bg-white border border-line rounded-[11px] px-[14px] py-3 transition-[border-color,box-shadow] duration-150 ease-[ease] focus:outline-none focus:border-green focus:shadow-[0_0_0_3px_#e7efe9] [&:invalid:not(:placeholder-shown)]:border-clay" id="cPhone" name="cPhone" type="tel" inputMode="numeric" placeholder="20 123 456" required />
            </div>
            <div className="flex flex-col gap-[7px] col-[1/-1]">
              <label className="text-[13.5px] font-semibold text-ink" htmlFor="cEmail">E-mail <span className="text-ink-faint font-medium">(optionnel)</span></label>
              <input className="text-[15px] text-ink bg-white border border-line rounded-[11px] px-[14px] py-3 transition-[border-color,box-shadow] duration-150 ease-[ease] focus:outline-none focus:border-green focus:shadow-[0_0_0_3px_#e7efe9] [&:invalid:not(:placeholder-shown)]:border-clay" id="cEmail" name="cEmail" type="email" placeholder="vous@exemple.tn" />
            </div>
            <div className="flex flex-col gap-[7px] col-[1/-1]">
              <label className="text-[13.5px] font-semibold text-ink" htmlFor="cSubject">Sujet</label>
              <select className="text-[15px] text-ink bg-white border border-line rounded-[11px] px-[14px] py-3 transition-[border-color,box-shadow] duration-150 ease-[ease] focus:outline-none focus:border-green focus:shadow-[0_0_0_3px_#e7efe9] [&:invalid:not(:placeholder-shown)]:border-clay" id="cSubject" name="cSubject" defaultValue="Question sur un produit">
                <option>Question sur un produit</option>
                <option>Ma commande</option>
                <option>Livraison &amp; retours</option>
                <option>Montage &amp; garantie</option>
                <option>Autre</option>
              </select>
            </div>
            <div className="flex flex-col gap-[7px] col-[1/-1]">
              <label className="text-[13.5px] font-semibold text-ink" htmlFor="cMsg">Message <span className="text-clay">*</span></label>
              <textarea
                className="text-[15px] text-ink bg-white border border-line rounded-[11px] px-[14px] py-3 transition-[border-color,box-shadow] duration-150 ease-[ease] resize-y min-h-[80px] focus:outline-none focus:border-green focus:shadow-[0_0_0_3px_#e7efe9] [&:invalid:not(:placeholder-shown)]:border-clay"
                id="cMsg"
                name="cMsg"
                placeholder="Comment pouvons-nous vous aider&nbsp;?"
                required
                style={{ minHeight: 110 }}
              />
            </div>
          </div>
          <Button variant="primary" size="lg" block type="submit" style={{ marginTop: 18 }}>
            Envoyer le message
          </Button>
          <p className="text-[12.5px] text-ink-soft text-center max-w-[40ch]" style={{ marginTop: 14 }}>
            Nous ne partageons jamais vos coordonnées.
          </p>
        </form>
      </div>
    </section>
  );
}
