'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, FormField, Input } from '@/shared/components';
import { ROUTES } from '@/shared/constants/routes.constants';
import { emailSchema, firstError } from '@/lib/utils/validation';
import { usePasswordReset } from '../../hooks/usePasswordReset';
import { AuthCard } from '../AuthCard';
import {
  AUTH_FIELDS,
  AUTH_AUTOCOMPLETE,
  AUTH_LABELS,
  AUTH_PLACEHOLDERS,
  AUTH_BUTTONS,
  AUTH_TITLES,
  AUTH_SUBTITLES,
  AUTH_LINKS,
  AUTH_RESET_SENT_MESSAGE,
} from '../../constants/auth.constants';
import {
  AUTH_FORM_STYLES,
  AUTH_FORM_ERROR_STYLES,
  AUTH_FORM_SUCCESS_STYLES,
  AUTH_FOOTER_LINK_STYLES,
} from '../authForm.constants';
import type { AuthFieldErrors } from '../../types/auth.types';

// Componente raíz de la pantalla de recuperación de contraseña.
export function ForgotPasswordForm() {
  const { submit, isLoading, error, isSent } = usePasswordReset();
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});

  function validate(): boolean {
    const errors: AuthFieldErrors = {};
    const emailError = firstError(emailSchema, email);
    if (emailError !== undefined) errors[AUTH_FIELDS.EMAIL] = emailError;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!validate()) return;
    await submit({ email });
  }

  return (
    <AuthCard
      title={AUTH_TITLES.FORGOT_PASSWORD}
      subtitle={AUTH_SUBTITLES.FORGOT_PASSWORD}
      footer={
        <Link href={ROUTES.AUTH.LOGIN} className={AUTH_FOOTER_LINK_STYLES}>
          {AUTH_LINKS.TO_LOGIN_ACTION}
        </Link>
      }
    >
      {isSent ? (
        <p role="status" className={AUTH_FORM_SUCCESS_STYLES}>
          {AUTH_RESET_SENT_MESSAGE}
        </p>
      ) : (
        <form className={AUTH_FORM_STYLES} onSubmit={handleSubmit} noValidate>
          <FormField
            label={AUTH_LABELS.EMAIL}
            htmlFor={AUTH_FIELDS.EMAIL}
            error={fieldErrors[AUTH_FIELDS.EMAIL]}
            required
          >
            <Input
              id={AUTH_FIELDS.EMAIL}
              name={AUTH_FIELDS.EMAIL}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder={AUTH_PLACEHOLDERS.EMAIL}
              autoComplete={AUTH_AUTOCOMPLETE.EMAIL}
              hasError={fieldErrors[AUTH_FIELDS.EMAIL] !== undefined}
              disabled={isLoading}
            />
          </FormField>

          {error !== null && (
            <p role="alert" className={AUTH_FORM_ERROR_STYLES}>
              {error}
            </p>
          )}

          <Button label={AUTH_BUTTONS.SEND_RESET} type="submit" isLoading={isLoading} fullWidth />
        </form>
      )}
    </AuthCard>
  );
}
