import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/schema.ts",
  out: "./server/db/migrations",
  dbCredentials: {
    url: "postgresql://snap-shop_owner:npg_ljZTM6hYRe7a@ep-sweet-flower-a8pmb61j-pooler.eastus2.azure.neon.tech/snap-shop?sslmode=require",
  },
});
