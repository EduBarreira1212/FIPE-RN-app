import z from "zod";

export const passwordSchema = z
  .object({
    currentPwd: z.string().min(1, "Informe a senha atual."),
    newPwd: z.string().min(8, "A nova senha deve ter ao menos 8 caracteres."),
    confirmPwd: z.string().min(1, "Confirme a nova senha."),
  })
  .refine((data) => data.newPwd === data.confirmPwd, {
    message: "As senhas não coincidem.",
    path: ["confirmPwd"],
  });

export type PasswordForm = z.infer<typeof passwordSchema>;