import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import * as schema from "@/server/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon("postgresql://snap-shop_owner:npg_ljZTM6hYRe7a@ep-sweet-flower-a8pmb61j-pooler.eastus2.azure.neon.tech/snap-shop?sslmode=require");
export const db = drizzle(sql, { schema});
