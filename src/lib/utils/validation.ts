import { z, type ZodType } from 'zod';
import {
  MIN_DISPLAY_NAME_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_BIO_LENGTH,
  VALIDATION_MESSAGES,
} from '@/shared/constants/validation.constants';

// Esquemas Zod reutilizables. Las features los componen para sus formularios.

export const emailSchema = z.string().email(VALIDATION_MESSAGES.EMAIL_INVALID);

export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, VALIDATION_MESSAGES.PASSWORD_TOO_SHORT)
  .max(MAX_PASSWORD_LENGTH, VALIDATION_MESSAGES.PASSWORD_TOO_LONG);

export const displayNameSchema = z
  .string()
  .trim()
  .min(MIN_DISPLAY_NAME_LENGTH, VALIDATION_MESSAGES.DISPLAY_NAME_TOO_SHORT)
  .max(MAX_DISPLAY_NAME_LENGTH, VALIDATION_MESSAGES.DISPLAY_NAME_TOO_LONG);

export const bioSchema = z.string().trim().max(MAX_BIO_LENGTH, VALIDATION_MESSAGES.BIO_TOO_LONG);

// Valida un único valor contra un esquema y devuelve el primer mensaje de error,
// o `undefined` si es válido. Las features lo usan para validación por campo.
export function firstError(schema: ZodType, value: unknown): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}
