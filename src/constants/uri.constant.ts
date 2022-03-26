const DOMAIN = process.env.NEXT_PUBLIC_API;

export const URI = {
  // auth
  DOMAIN,
  LOGIN_BY_EMAIL: '/auth/login',
  REGISTER_BY_EMAIL: '/auth/register',
  REFRESH: '/auth/refresh',
  VERIFY: '/auth/verify',
  RESEND_VERIFY: '/auth/resendVerify',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // profile
  GET_USER_PROFILE: '/users/profile',
  UPDATE_USER_PROFILE: '/users/profile/update',
  FOLLOW_USER: '/users/follow',
  UNFOLLOW_USER: '/users/unfollow',
  GET_USER_FOLLOWERS: '/users/followers',
  GET_USER_FOLLOWING: '/users/following',

  // image
  IMAGE_UPLOAD: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
};
