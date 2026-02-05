import { VALIDATION_MESSAGES } from '@shared/constants/messages/validationMessage';

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormValues, string>
>;

export const validateRegisterForm = (
  values: RegisterFormValues,
): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};

  if (!values.username.trim()) {
    errors.username = VALIDATION_MESSAGES.REQUIRED('Username');
  }

  if (!values.email.trim()) {
    errors.email = VALIDATION_MESSAGES.REQUIRED('Email');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
  }

  if (!values.password) {
    errors.password = VALIDATION_MESSAGES.REQUIRED('Password');
  } else if (values.password.length < 8) {
    errors.password = VALIDATION_MESSAGES.PASSWORD_MIN(8);
  }

  if (!values.confirmPassword) {
    errors.confirmPassword =
      VALIDATION_MESSAGES.REQUIRED('Confirm password');
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword =
      VALIDATION_MESSAGES.PASSWORDS_NOT_MATCH;
  }

  return errors;
};
