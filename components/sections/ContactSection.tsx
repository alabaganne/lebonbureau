"use client";

/* Landing contact section (id="contact") — info cards + message form.
   The form is front-end only for now; wire it to an endpoint later. */

import { type FormEvent, useRef } from "react";
import { useToast } from "@/lib/toast";
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
    <section className="news" id="contact">
      <div className="wrap news-inner" style={{ alignItems: "start" }}>
        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="section-title" style={{ marginTop: 10 }}>
            On vous répond, vite et bien.
          </h2>
          <p style={{ marginBottom: 26 }}>
            Une question sur un bureau, votre commande ou la livraison&nbsp;? Écrivez-nous ou
            appelez-nous — un humain vous répond du lundi au samedi.
          </p>
          <div className="contact-info">
            <div className="contact-row">
              <div className="ic"><PhoneIcon size={20} /></div>
              <div>
                <div className="k">Téléphone</div>
                <div className="v"><a href="tel:+21671000000">+216 71 000 000</a></div>
                <div className="s">Lun–Sam · 9h00 – 18h00</div>
              </div>
            </div>
            <div className="contact-row">
              <div className="ic"><MailIcon size={20} /></div>
              <div>
                <div className="k">E-mail</div>
                <div className="v"><a href="mailto:bonjour@lebonbureau.tn">bonjour@lebonbureau.tn</a></div>
                <div className="s">Réponse sous 24h ouvrées</div>
              </div>
            </div>
          </div>
        </div>
        <form ref={formRef} className="form-card" onSubmit={onSubmit} noValidate style={{ margin: 0 }}>
          <div className="form-card-head" style={{ marginBottom: 18 }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 23 }}>Écrivez-nous</h2>
          </div>
          <div className="field-grid">
            <div className="field">
              <label htmlFor="cName">Nom complet <span className="req">*</span></label>
              <input id="cName" name="cName" type="text" placeholder="Votre nom" required />
            </div>
            <div className="field">
              <label htmlFor="cPhone">Téléphone <span className="req">*</span></label>
              <input id="cPhone" name="cPhone" type="tel" inputMode="numeric" placeholder="20 123 456" required />
            </div>
            <div className="field col-2">
              <label htmlFor="cEmail">E-mail <span className="opt">(optionnel)</span></label>
              <input id="cEmail" name="cEmail" type="email" placeholder="vous@exemple.tn" />
            </div>
            <div className="field col-2">
              <label htmlFor="cSubject">Sujet</label>
              <select id="cSubject" name="cSubject" defaultValue="Question sur un produit">
                <option>Question sur un produit</option>
                <option>Ma commande</option>
                <option>Livraison &amp; retours</option>
                <option>Montage &amp; garantie</option>
                <option>Autre</option>
              </select>
            </div>
            <div className="field col-2">
              <label htmlFor="cMsg">Message <span className="req">*</span></label>
              <textarea
                id="cMsg"
                name="cMsg"
                placeholder="Comment pouvons-nous vous aider&nbsp;?"
                required
                style={{ minHeight: 110 }}
              />
            </div>
          </div>
          <button className="btn btn-primary btn-lg btn-block" type="submit" style={{ marginTop: 18 }}>
            Envoyer le message
          </button>
          <p className="submit-note" style={{ marginTop: 14 }}>
            Nous ne partageons jamais vos coordonnées.
          </p>
        </form>
      </div>
    </section>
  );
}
