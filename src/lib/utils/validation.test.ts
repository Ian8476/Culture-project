import { describe, it, expect } from 'vitest';
import {
  emailSchema,
  passwordSchema,
  displayNameSchema,
  bioSchema,
  firstError,
} from './validation';
import { VALIDATION_MESSAGES } from '@/shared/constants/validation.constants';

describe('firstError', () => {
  it('devuelve undefined cuando el valor es válido', () => {
    expect(firstError(emailSchema, 'user@example.com')).toBeUndefined();
  });

  it('devuelve el mensaje del esquema cuando es inválido', () => {
    expect(firstError(emailSchema, 'no-es-email')).toBe(VALIDATION_MESSAGES.EMAIL_INVALID);
  });
});

describe('passwordSchema', () => {
  it('rechaza contraseñas cortas', () => {
    expect(firstError(passwordSchema, '123')).toBe(VALIDATION_MESSAGES.PASSWORD_TOO_SHORT);
  });

  it('acepta contraseñas válidas', () => {
    expect(firstError(passwordSchema, 'segura123')).toBeUndefined();
  });
});

describe('displayNameSchema', () => {
  it('rechaza nombres demasiado cortos', () => {
    expect(firstError(displayNameSchema, 'ab')).toBe(VALIDATION_MESSAGES.DISPLAY_NAME_TOO_SHORT);
  });

  it('acepta nombres válidos', () => {
    expect(firstError(displayNameSchema, 'Ana López')).toBeUndefined();
  });
});

describe('bioSchema', () => {
  it('acepta bio vacía', () => {
    expect(firstError(bioSchema, '')).toBeUndefined();
  });
});
