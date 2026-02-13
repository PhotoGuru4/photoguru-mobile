import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import { getApiErrorMessage } from '@shared/utils/error-handler';
import { showError, showSuccess } from '@shared/utils/toast';
import { useLoginMutation } from '@features/auth/hooks/mutations/useLoginMutation';
import { AUTH_MESSAGES } from '@shared/constants';
import { validateLoginForm } from '@shared/utils/validation/loginValidation';
import { useAuthStore } from '@store/authStore';

import type { LoginResponse } from '@features/auth/types/login';
import { ROLES } from '@shared/constants/role';

export const useLoginForm = () => {
  const { setAuth, logout } = useAuthStore();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLoginMutation();

  const handleChange =
    (field: 'email' | 'password') => (value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const handleSubmit = () => {
    const validationErrors = validateLoginForm(values);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      showError('Invalid form', 'Please check your input');
      return;
    }

    loginMutation.mutate(values, {
      onSuccess: async (res: LoginResponse) => {
        const { access_token, refresh_token, user } = res;

        if (user.role !== ROLES.CUSTOMER) {
          logout();
          showError(
            'Access denied',
            'Photographer please login using website',
          );
          return;
        }

        await SecureStore.setItemAsync('accessToken', access_token);

        if (refresh_token) {
          await SecureStore.setItemAsync(
            'refreshToken',
            refresh_token,
          );
        }

        setAuth(user, access_token);

        showSuccess(
          AUTH_MESSAGES.LOGIN_SUCCESS,
          AUTH_MESSAGES.WELCOME,
        );
      },

      onError: (error: unknown) => {
        const message = getApiErrorMessage(error);

        if (message.toLowerCase().includes('invalid')) {
          setErrors({
            email: 'Invalid email or password',
            password: 'Invalid email or password',
          });
        }

        showError(AUTH_MESSAGES.LOGIN_ERROR, message);
      },
    });
  };

  return {
    values,
    errors,
    showPassword,
    isLoading: loginMutation.isPending,

    setShowPassword,
    handleChange,
    handleSubmit,
  };
};
