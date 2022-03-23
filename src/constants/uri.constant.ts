const DOMAIN = process.env.NEXT_PUBLIC_API;

export const URI = {
  DOMAIN,
  LOGIN_BY_EMAIL: '/auth/login',
  REGISTER_BY_EMAIL: '/auth/register',
  REFRESH: '/auth/refresh',
  VERIFY: '/auth/verify',
  RESEND_VERIFY: '/auth/resendVerify',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
};
