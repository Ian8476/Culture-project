'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, FormField, Input } from '@/shared/components';
import { ROUTES } from '@/shared/constants/routes.constants';
import { emailSchema, passwordSchema, firstError } from '@/lib/utils/validation';
import { useLogin } from '../../hooks/useLogin';
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
} from '../../constants/auth.constants';
import {
  AUTH_FORM_STYLES,
  AUTH_FORM_ERROR_STYLES,
  AUTH_FOOTER_LINK_STYLES,
} from '../authForm.constants';
import type { AuthFieldErrors } from '../../types/auth.types';

// Componente raíz de la pantalla de login.
export function LoginForm() {
  const { submit, isLoading, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});

  function validate(): boolean {
    const errors: AuthFieldErrors = {};
    const emailError = firstError(emailSchema, email);
    const passwordError = firstError(passwordSchema, password);
    if (emailError !== undefined) errors[AUTH_FIELDS.EMAIL] = emailError;
    if (passwordError !== undefined) errors[AUTH_FIELDS.PASSWORD] = passwordError;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!validate()) return;
    await submit({ email, password });
  }

  return (
    <AuthCard
      title={AUTH_TITLES.LOGIN}
      subtitle={AUTH_SUBTITLES.LOGIN}
      footer={
        <>
          {AUTH_LINKS.TO_REGISTER_PROMPT}{' '}
          <Link href={ROUTES.AUTH.REGISTER} className={AUTH_FOOTER_LINK_STYLES}>
            {AUTH_LINKS.TO_REGISTER_ACTION}
          </Link>
        </>
      }
    >
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

        <FormField
          label={AUTH_LABELS.PASSWORD}
          htmlFor={AUTH_FIELDS.PASSWORD}
          error={fieldErrors[AUTH_FIELDS.PASSWORD]}
          required
        >
          <Input
            id={AUTH_FIELDS.PASSWORD}
            name={AUTH_FIELDS.PASSWORD}
            type="password"
            value={password}
            onChange={setPassword}
            placeholder={AUTH_PLACEHOLDERS.PASSWORD}
            autoComplete={AUTH_AUTOCOMPLETE.CURRENT_PASSWORD}
            hasError={fieldErrors[AUTH_FIELDS.PASSWORD] !== undefined}
            disabled={isLoading}
          />
        </FormField>

        {error !== null && (
          <p role="alert" className={AUTH_FORM_ERROR_STYLES}>
            {error}
          </p>
        )}

        <Button label={AUTH_BUTTONS.LOGIN} type="submit" isLoading={isLoading} fullWidth />

        <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className={AUTH_FOOTER_LINK_STYLES}>
          {AUTH_LINKS.TO_FORGOT_ACTION}
        </Link>
      </form>
    </AuthCard>
  );
}
