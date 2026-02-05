import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@features/auth/services/loginService';
import type { LoginResponse } from '@features/auth/types/login';

export const useLoginMutation = () => {
  return useMutation<
    LoginResponse,
    unknown,
    { email: string; password: string }
  >({
    mutationFn: (data) => loginRequest(data),
  });
};
