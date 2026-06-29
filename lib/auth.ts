/* LeBonBureau — admin auth via Supabase Auth (email + password).
   Authorization is role-based: a signed-in user may reach the dashboard only if
   their public.profiles row has role = 'admin'. Roles let other user types be
   added later without touching the gate. */

import { supabase } from "./supabase";

/** True when there is a signed-in user whose profile role is 'admin'. */
export async function isAdmin(): Promise<boolean> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (error || !data) return false;
  return data.role === "admin";
}

/** Sign in, then require an admin role. Non-admins are signed back out. */
export async function signIn(
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: "E-mail ou mot de passe incorrect." };
  if (!(await isAdmin())) {
    await supabase.auth.signOut();
    return { ok: false, error: "Ce compte n'a pas accès à l'administration." };
  }
  return { ok: true };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}
