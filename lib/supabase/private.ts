import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://iizvuvcmdpzmhahftcic.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpenZ1dmNtZHB6bWhhaGZ0Y2ljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5Nzk4MTI5NCwiZXhwIjoyMDEzNTU3Mjk0fQ.Z1NYqnLSVYjrDO_EsquQCggC_UOI2qdflFHSKQGx1Hs'


if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing env vars SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
}

const privateClient = createClient(supabaseUrl, supabaseKey)

export default privateClient
