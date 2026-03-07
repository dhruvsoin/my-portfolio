import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 * Use in Server Components, Route Handlers, and server actions.
 * This is safe on the server — never exposed to the browser.
 */
export function createServerClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}
