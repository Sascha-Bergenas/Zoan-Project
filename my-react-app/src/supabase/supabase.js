import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY = "sb_publishable_XykYo88zE2_FBlM-Gj-T2w_mPdGPu29";
const SUPABASE_URL = "https://bgdusrukauluqoikujqi.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
