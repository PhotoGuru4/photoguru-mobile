export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  INVALID_EMAIL: 'Invalid email format',
  PASSWORD_MIN: (min: number) =>
    `Password must be at least ${min} characters`,
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
} as const;
