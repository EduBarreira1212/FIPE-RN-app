import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password: z.string(),
});

export type SignInInput = z.infer<typeof signInSchema>;