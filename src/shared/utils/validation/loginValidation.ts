import { VALIDATION_MESSAGES } from '@shared/constants/messages/validationMessage';

export interface LoginFormValues {
  email: string;
  password: string;
}

export type LoginFormErrors = Partial<
  Record<keyof LoginFormValues, string>
>;

export const validateLoginForm = (
  values: LoginFormValues,
): LoginFormErrors => {
  const errors: LoginFormErrors = {};

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

  return errors;
};
