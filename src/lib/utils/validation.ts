import { z } from 'zod';
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
