import { useMutation } from '@tanstack/react-query';
import { registerRequest } from '@features/auth/services/registerService';
import { ROLES } from '@shared/constants/role';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: {
      username: string;
      email: string;
      password: string;
    }) =>
      registerRequest({
        fullName: data.username,
        email: data.email,
        password: data.password,
        role: ROLES.CUSTOMER,
      }),
  });
};
