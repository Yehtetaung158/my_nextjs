import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
// import { schema } from "./schema";
import * as schema from "@/server/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// if (!process.env.DATABASE_URL) {
//   throw new Error("❌ DATABASE_URL is missing in .env.local file!");
// }

const sql = neon("postgresql://snap-shop_owner:npg_ljZTM6hYRe7a@ep-sweet-flower-a8pmb61j-pooler.eastus2.azure.neon.tech/snap-shop?sslmode=require");
export const db = drizzle(sql, { schema});

// (async () => {
//   try {
//     const result = await db.execute('SELECT 1');
//     console.log("✅ Database connected successfully:", result);
//   } catch (error) {
//     console.error("❌ Database connection error:", error)
//   }
// })();
