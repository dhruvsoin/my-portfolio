import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 * Use in Server Components, Route Handlers, and server actions.
 * This is safe on the server — never exposed to the browser.
 */
export function createServerClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.error(
            "[Supabase] ❌ Missing env vars: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY\n" +
            "Add them to Vercel → Project Settings → Environment Variables, then redeploy."
        );
        // Return a dummy client that will fail gracefully — queries already have try/catch
    }

    return createClient(url ?? "", key ?? "");
}

