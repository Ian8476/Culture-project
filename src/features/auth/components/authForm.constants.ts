// Estilos compartidos por los formularios de auth (Register/Login/ForgotPassword).
export const AUTH_FORM_STYLES = 'flex flex-col gap-5' as const;
export const AUTH_FORM_ERROR_STYLES =
  'rounded-sm border border-alert/30 bg-alert-soft px-3 py-2 text-sm text-alert' as const;
export const AUTH_FORM_SUCCESS_STYLES =
  'rounded-sm border border-okay/30 bg-okay-soft px-3 py-2 text-sm text-okay' as const;
export const AUTH_FOOTER_LINK_STYLES =
  'font-medium text-accent underline-offset-4 transition-colors hover:text-accent-deep hover:underline' as const;
