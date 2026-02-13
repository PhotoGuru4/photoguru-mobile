import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  validateRegisterForm,
  RegisterFormValues,
  RegisterFormErrors,
} from '@shared/utils/validation/registerValidation';
import { showError, showSuccess } from '@shared/utils/toast';
import { useRegisterMutation } from '@features/auth/hooks/mutations/useRegisterMutation';
import { AuthStackParamList } from '@shared/types/authNavigator';
import { AUTH_MESSAGES, SCREENS } from '@shared/constants';
import { getApiErrorMessage } from '@shared/utils/error-handler';

export const useRegisterForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [values, setValues] = useState<RegisterFormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const registerMutation = useRegisterMutation();

  const handleChange =
    (field: keyof RegisterFormValues) => (value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = () => {
    const validationErrors = validateRegisterForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError('Invalid form', 'Please check your input');
      return;
    }

    registerMutation.mutate(values, {
      onSuccess: () => {
        showSuccess('Register success', 'Welcome to PhotoGuru');

        navigation.reset({
          index: 0,
          routes: [{ name: SCREENS.AUTH.LOGIN }],
        });
      },
      onError: (error: unknown) => {
        const message = getApiErrorMessage(error);

        if (message.toLowerCase().includes('email')) {
          setErrors((prev) => ({
            ...prev,
            email: message,
          }));
        }

        showError(AUTH_MESSAGES.REGISTER_ERROR, message);
      },
    });
  };
  return {
    values,
    errors,
    showPassword,
    showConfirm,
    isLoading: registerMutation.isPending,

    setShowPassword,
    setShowConfirm,
    handleChange,
    handleSubmit,
  };
};
