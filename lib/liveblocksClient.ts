import { createClient } from "@liveblocks/client"

const liveblocksKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_TOKEN ?? ""

const liveblocks = createClient({ publicApiKey: liveblocksKey })

export default liveblocks
