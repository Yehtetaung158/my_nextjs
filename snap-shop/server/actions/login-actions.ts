"use server";

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "./safe-action";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log("I a login",email,password)
    return {
      success: { email, password },
    };
  });
