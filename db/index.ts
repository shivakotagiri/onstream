
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema"

const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_RfZchA23raHp@ep-tiny-math-ahgdv3ez-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
export const db = drizzle(sql, {
    schema
});
