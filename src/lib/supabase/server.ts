import { createClient } from "@supabase/supabase-js";

let serverClient: ReturnType<typeof createClient> | undefined;

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

