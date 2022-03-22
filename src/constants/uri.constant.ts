const DOMAIN = process.env.NEXT_PUBLIC_API;

export const URI = {
  DOMAIN,
  LOGIN_BY_EMAIL: '/auth/login',
  REGISTER_BY_EMAIL: '/auth/register',
  REFRESH: '/auth/refresh',
};
