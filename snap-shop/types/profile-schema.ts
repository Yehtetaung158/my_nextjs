import * as z from "zod";

export const profileSchema = z.object({
  name: z.string().min(4, {
    message: "Please enter at least 4 characters of your name",
  }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});
