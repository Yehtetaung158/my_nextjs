import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import * as schema from "@/server/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// const sql = neon("postgresql://snap-shop_owner:npg_ljZTM6hYRe7a@ep-sweet-flower-a8pmb61j-pooler.eastus2.azure.neon.tech/snap-shop?sslmode=require");
const sql = neon(
  "postgresql://neondb_owner:npg_g6LBim2ATPvE@ep-steep-silence-a11xvhqr-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
);
export const db = drizzle(sql, { schema });
