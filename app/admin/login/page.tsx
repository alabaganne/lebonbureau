"use client";

/* Admin login — gated entry to the orders dashboard (client-side demo auth). */

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAdmin, signIn } from "@/lib/auth";
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
    <div className="admin-body">
      <div className="login-wrap">
        <div>
          <form className="login-card" onSubmit={onSubmit} noValidate>
            <span className="brand">
              Le<span className="dot" style={{ color: "var(--green)" }}>Bon</span>Bureau
              <span style={{ color: "var(--green)" }}>.</span>
            </span>
            <div className="login-eyebrow">Espace administrateur</div>
            <h1>Connexion</h1>
            <p className="sub">Accédez au tableau de bord pour suivre et traiter les commandes.</p>

            <div className={"login-error" + (error ? " show" : "")}>
              <AlertIcon size={16} />
              <span>{error || "E-mail ou mot de passe incorrect."}</span>
            </div>

            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" autoComplete="username" placeholder="admin@lebonbureau.tn" required />
            </div>
            <div className="field">
              <label htmlFor="pass">Mot de passe</label>
              <input id="pass" name="pass" type="password" autoComplete="current-password" placeholder="••••••••" required />
            </div>

            <button className="btn btn-primary btn-lg btn-block" type="submit" style={{ marginTop: 6 }} disabled={busy}>
              {busy ? "Connexion…" : "Se connecter"}
            </button>

            <div className="login-hint">
              <strong style={{ color: "var(--ink-soft)" }}>Démo</strong> — e-mail{" "}
              <code>admin@lebonbureau.tn</code> · mot de passe <code>lebonbureau</code>
            </div>
          </form>
          <Link className="login-back" href="/">
            <ArrowLeftIcon size={15} />
            Retour à la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
