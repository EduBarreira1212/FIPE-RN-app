import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Seu nome é muito curto"),
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(8, "Mínimo 8 caractéres"),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: "As senhas precisam ser iguais",
  path: ["confirm"],
});

export type SignUpInput = z.infer<typeof signUpSchema>;