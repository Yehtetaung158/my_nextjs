import { title } from "process";
import * as z from "zod";

export const productSchema = z.object({
  id: z.number(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters long",
  }),
  price: z.coerce
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive({
      message: "Price must be a positive number",
    }),
});
