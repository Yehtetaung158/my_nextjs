"use server";

import { profileSchema } from "@/types/profile-schema";
import { actionClient } from "./safe-action";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const settingAction = actionClient
  .schema(profileSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    try {
      const isExistingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (!isExistingUser) {
        return { error: "User not found" };
      }

      await db.update(users).set({ name }).where(eq(users.email, email));
      revalidatePath("/dashboard/settings");
      return { success: "Profile updated successfully" };
    } catch (error) {
      return { error: "Error updating profile" };
    }
  });
