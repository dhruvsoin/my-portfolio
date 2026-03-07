const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
    const tables = ['projects', 'achievements', 'experience', 'experiments'];
    for (const t of tables) {
        const { count } = await sb.from(t).select('*', { count: 'exact', head: true });
        const icon = count > 0 ? 'OK' : '--';
        console.log(`[${icon}] ${t}: ${count} rows`);
    }
}
check().catch(console.error);
