import { z } from 'zod';
import { normalizeRaw, rxOldRaw, rxMerc, maskOldIfApplicable } from '../utils/plate';

export const plateSchema = z
  .string()
  .trim()
  .transform(normalizeRaw)
  .superRefine((raw, ctx) => {
    if (!(rxOldRaw.test(raw) || rxMerc.test(raw))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Placa inválida. Use "AAA-1234" (antiga) ou "AAA1A11" (Mercosul).',
      });
    }
  })
  .transform(maskOldIfApplicable);

export type PlateValue = z.infer<typeof plateSchema>;
