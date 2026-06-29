/* Create (or ensure) the admin user and grant it role=admin.
   Run once after `npm run db:start` + `npm run db:reset`:  npm run seed:admin
   Reads NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL,
   ADMIN_PASSWORD from .env.local. Uses the service-role key (server-only). */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Minimal .env.local loader (avoids a dotenv dependency).
function loadEnv(url) {
  try {
    const text = readFileSync(fileURLToPath(url), "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* no .env.local — rely on the ambient environment */
  }
}
loadEnv(new URL("../.env.local", import.meta.url));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!url || !serviceKey || !email || !password) {
  console.error(
    "Missing env. Need NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, " +
      "ADMIN_EMAIL and ADMIN_PASSWORD in .env.local."
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Create the user (email pre-confirmed so it can sign in immediately).
let userId;
const { data: created, error: createErr } = await admin.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (createErr) {
  // Already exists? Find the existing user instead of failing.
  const { data: list, error: listErr } = await admin.auth.admin.listUsers();
  const existing = list?.users.find((u) => u.email === email);
  if (listErr || !existing) {
    console.error("Could not create or find the admin user:", createErr.message);
    process.exit(1);
  }
  userId = existing.id;
  console.log(`User ${email} already exists (${userId}).`);
} else {
  userId = created.user.id;
  console.log(`Created user ${email} (${userId}).`);
}

// The on-signup trigger created the profile with role=customer; promote it.
const { error: roleErr } = await admin
  .from("profiles")
  .update({ role: "admin" })
  .eq("id", userId);

if (roleErr) {
  console.error("Failed to set role=admin:", roleErr.message);
  process.exit(1);
}

console.log(`Granted role=admin to ${email}. You can now sign in at /admin/login.`);
