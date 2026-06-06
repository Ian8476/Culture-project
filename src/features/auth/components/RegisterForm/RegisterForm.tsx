'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, FormField, Input } from '@/shared/components';
import { ROUTES } from '@/shared/constants/routes.constants';
import { emailSchema, passwordSchema, displayNameSchema, firstError } from '@/lib/utils/validation';
import { useRegister } from '../../hooks/useRegister';
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

// Componente raíz de la pantalla de registro: orquesta validación + hook + UI.
export function RegisterForm() {
  const { submit, isLoading, error } = useRegister();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});

  function validate(): boolean {
    const errors: AuthFieldErrors = {};
    const nameError = firstError(displayNameSchema, displayName);
    const emailError = firstError(emailSchema, email);
    const passwordError = firstError(passwordSchema, password);
    if (nameError !== undefined) errors[AUTH_FIELDS.DISPLAY_NAME] = nameError;
    if (emailError !== undefined) errors[AUTH_FIELDS.EMAIL] = emailError;
    if (passwordError !== undefined) errors[AUTH_FIELDS.PASSWORD] = passwordError;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!validate()) return;
    await submit({ email, password, displayName: displayName.trim() });
  }

  return (
    <AuthCard
      title={AUTH_TITLES.REGISTER}
      subtitle={AUTH_SUBTITLES.REGISTER}
      footer={
        <>
          {AUTH_LINKS.TO_LOGIN_PROMPT}{' '}
          <Link href={ROUTES.AUTH.LOGIN} className={AUTH_FOOTER_LINK_STYLES}>
            {AUTH_LINKS.TO_LOGIN_ACTION}
          </Link>
        </>
      }
    >
      <form className={AUTH_FORM_STYLES} onSubmit={handleSubmit} noValidate>
        <FormField
          label={AUTH_LABELS.DISPLAY_NAME}
          htmlFor={AUTH_FIELDS.DISPLAY_NAME}
          error={fieldErrors[AUTH_FIELDS.DISPLAY_NAME]}
          required
        >
          <Input
            id={AUTH_FIELDS.DISPLAY_NAME}
            name={AUTH_FIELDS.DISPLAY_NAME}
            value={displayName}
            onChange={setDisplayName}
            placeholder={AUTH_PLACEHOLDERS.DISPLAY_NAME}
            autoComplete={AUTH_AUTOCOMPLETE.NAME}
            hasError={fieldErrors[AUTH_FIELDS.DISPLAY_NAME] !== undefined}
            disabled={isLoading}
          />
        </FormField>

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
            autoComplete={AUTH_AUTOCOMPLETE.NEW_PASSWORD}
            hasError={fieldErrors[AUTH_FIELDS.PASSWORD] !== undefined}
            disabled={isLoading}
          />
        </FormField>

        {error !== null && (
          <p role="alert" className={AUTH_FORM_ERROR_STYLES}>
            {error}
          </p>
        )}

        <Button label={AUTH_BUTTONS.REGISTER} type="submit" isLoading={isLoading} fullWidth />
      </form>
    </AuthCard>
  );
}
