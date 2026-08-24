import { createClient } from "@supabase/supabase-js";

let serverClient: ReturnType<typeof createClient> | undefined;
let adminClient: ReturnType<typeof createClient> | undefined;

export function getSupabaseServerClient() {
  if (serverClient) {
    return serverClient;
  }

  const url = process.env.NEXT_SUPABASE_URL;
  const publishableKey = process.env.NEXT_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "NEXT_SUPABASE_URL and NEXT_SUPABASE_PUBLISHABLE_KEY must be configured.",
    );
  }

  serverClient = createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return serverClient;
}

export function getSupabaseAdminClient() {
  if (adminClient) {
    return adminClient;
  }

  const url = process.env.NEXT_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "NEXT_SUPABASE_URL and SUPABASE_SECRET_KEY must be configured.",
    );
  }

  adminClient = createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}
