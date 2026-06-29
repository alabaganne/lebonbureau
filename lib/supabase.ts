/* Single browser Supabase client. Reads the public env vars (URL + anon key);
   the client persists the auth session in localStorage automatically. All order
   reads/writes and admin auth funnel through this one instance. */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Copy .env.example to .env.local and fill in the values from `supabase status`."
  );
}

export const supabase = createClient(url, anonKey);
