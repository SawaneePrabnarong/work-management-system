export const ErrorCode = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
} as const;

export type ErrorCodeKey = keyof typeof ErrorCode;
