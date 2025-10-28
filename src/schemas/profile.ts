import z from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome."),
  email: z.string().trim().email("Email inválido."),
});

export type ProfileForm = z.infer<typeof profileSchema>;