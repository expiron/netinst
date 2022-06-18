
import { createClient } from "redis"

const db = createClient({ url: process.env.REDIS_URL })

db.on('error', err => console.log(`redis: ${err}`))

db.connect()

export default db
