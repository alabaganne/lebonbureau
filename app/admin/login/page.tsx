"use client";

/* Admin login — gated entry to the orders dashboard (client-side demo auth). */

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAdmin, signIn } from "@/lib/auth";
import Button from "@/components/Button";
import { ArrowLeftIcon, AlertIcon } from "@/components/Icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    isAdmin().then((ok) => {
      if (ok) router.replace("/admin");
    });
  }, [router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const pass = (form.elements.namedItem("pass") as HTMLInputElement).value;

    setBusy(true);
    setError(null);
    const res = await signIn(email, pass);
    setBusy(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      setError(res.error || "Connexion impossible.");
      const passField = form.elements.namedItem("pass") as HTMLInputElement;
      passField.value = "";
      passField.focus();
    }
  }

  return (
    <div className="bg-sand min-h-screen flex flex-col">
      <div className="flex-1 grid place-items-center pt-10 px-5 pb-[70px]">
        <div>
          <form className="w-full max-w-[420px] bg-white border border-line rounded-card-lg pt-[38px] px-9 pb-[34px] shadow-card" onSubmit={onSubmit} noValidate>
            <span className="inline-flex items-baseline gap-0.5 font-serif text-[26px] font-semibold tracking-[-.02em] mb-1">
              Le<span className="text-green">Bon</span>Bureau
              <span className="text-green">.</span>
            </span>
            <div className="text-[12px] tracking-[.16em] uppercase font-semibold text-green mb-[22px]">Espace administrateur</div>
            <h1 className="font-serif text-[27px] mb-1.5">Connexion</h1>
            <p className="text-ink-soft text-[14.5px] mb-6">Accédez au tableau de bord pour suivre et traiter les commandes.</p>

            <div className={(error ? "flex" : "hidden") + " items-center gap-[9px] bg-[#f9e9e3] border border-[#eccabc] text-[#a23c1f] rounded-[11px] py-[11px] px-[14px] text-[13.5px] font-medium mb-[18px]"}>
              <AlertIcon size={16} />
              <span>{error || "E-mail ou mot de passe incorrect."}</span>
            </div>

            <div className="flex flex-col gap-[7px] mb-4">
              <label htmlFor="email" className="text-[13.5px] font-semibold text-ink">E-mail</label>
              <input id="email" name="email" type="email" autoComplete="username" placeholder="admin@lebonbureau.tn" required className="font-[inherit] text-[15px] text-ink bg-white border border-line rounded-[11px] py-3 px-[14px] transition-[border-color,box-shadow] duration-150 ease-[ease] focus:outline-none focus:border-green focus:shadow-[0_0_0_3px_var(--color-green-soft)] [&:invalid:not(:placeholder-shown)]:border-clay" />
            </div>
            <div className="flex flex-col gap-[7px] mb-4">
              <label htmlFor="pass" className="text-[13.5px] font-semibold text-ink">Mot de passe</label>
              <input id="pass" name="pass" type="password" autoComplete="current-password" placeholder="••••••••" required className="font-[inherit] text-[15px] text-ink bg-white border border-line rounded-[11px] py-3 px-[14px] transition-[border-color,box-shadow] duration-150 ease-[ease] focus:outline-none focus:border-green focus:shadow-[0_0_0_3px_var(--color-green-soft)] [&:invalid:not(:placeholder-shown)]:border-clay" />
            </div>

            <Button variant="primary" size="lg" block type="submit" style={{ marginTop: 6 }} disabled={busy}>
              {busy ? "Connexion…" : "Se connecter"}
            </Button>

            <div className="mt-5 pt-[18px] border-t border-line text-[12.5px] text-ink-faint leading-[1.6]">
              <strong className="text-ink-soft">Démo</strong> — e-mail{" "}
              <code className="bg-sand border border-line rounded-md py-px px-[7px] text-[12px] text-ink">admin@lebonbureau.tn</code> · mot de passe <code className="bg-sand border border-line rounded-md py-px px-[7px] text-[12px] text-ink">lebonbureau</code>
            </div>
          </form>
          <Link className="inline-flex items-center gap-[7px] mt-[22px] text-[13.5px] text-ink-soft hover:text-ink" href="/">
            <ArrowLeftIcon size={15} />
            Retour à la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
