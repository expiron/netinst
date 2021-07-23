
import { createClient } from "redis";

const db = createClient(<string>process.env.REDIS_URL);

export default db;
