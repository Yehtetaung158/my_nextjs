// auth.ts
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import {db} from "@/server/auth"; // မှန်ကန်သော path ကို ညွှန်ပါ
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { db } from "./index";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db), // `as any` ကို ဖယ်ရှားပါ
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
});