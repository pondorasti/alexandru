import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""

const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
