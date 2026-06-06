// Barrel público de la feature auth. Las pages solo importan desde aquí.
export { RegisterForm } from './components/RegisterForm';
export { LoginForm } from './components/LoginForm';
export { ForgotPasswordForm } from './components/ForgotPasswordForm';

export { login, logout, register, requestPasswordReset } from './services/auth.service';

export type {
  RegisterPayload,
  LoginPayload,
  PasswordResetPayload,
  AuthFieldErrors,
} from './types/auth.types';
