// auth.ts
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { db } from "./index";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { loginSchema } from "@/types/login-schema";
import { eq } from "drizzle-orm";
import { users } from "./schema";
import bcrypt from "bcrypt";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
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
    Credentials({
      authorize: async (credentials) => {
        const validatedData = loginSchema.safeParse(credentials);

        if (validatedData.success) {
          const { email, password } = validatedData.data;
          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          if (!user || !password) {
            return null;
          }
          const isMatch = await bcrypt.compare(password, user.password!);
          // console.log("isMatch======>", isMatch, password, user.password);
          // const isMatch = await bcrypt.compare(password, user.password!);
          if (isMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
});
