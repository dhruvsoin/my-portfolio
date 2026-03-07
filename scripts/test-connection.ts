/**
 * Quick connection test — run with:
 * npx ts-node --project tsconfig.scripts.json scripts/test-connection.ts
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function test() {
    console.log("\n🔌 Testing Supabase connection...");
    console.log(`   URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);

    const tables = ["projects", "achievements", "experience", "experiments"];

    for (const table of tables) {
        const { error, count } = await supabase
            .from(table)
            .select("*", { count: "exact", head: true });

        if (error) {
            console.log(`   ❌ ${table}: ${error.message}`);
        } else {
            console.log(`   ✅ ${table}: connected (${count ?? 0} rows)`);
        }
    }

    console.log("\n✅ Connection test complete!\n");
}

test().catch(console.error);
