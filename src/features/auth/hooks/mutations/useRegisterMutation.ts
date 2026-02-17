import { useMutation } from '@tanstack/react-query';
import { registerRequest } from '@features/auth/services/registerService';
import { ROLES } from '@shared/constants/role';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: {
      username: string;
      email: string;
      password: string;
      province: string;
      ward: string;
    }) =>
      registerRequest({
        fullName: data.username,
        email: data.email,
        password: data.password,
        province: data.province,
        ward: data.ward,
        role: ROLES.CUSTOMER,
      }),
  });
};
