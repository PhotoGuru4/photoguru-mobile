import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Input, Button } from '@shared/components/common';
import { useRegisterForm } from '@features/auth/hooks/useRegister';

const RegisterForm = () => {
  const {
    values,
    errors,
    showPassword,
    showConfirm,
    isLoading,
    handleChange,
    handleSubmit,
    setShowPassword,
    setShowConfirm,
  } = useRegisterForm();

  return (
    <View className="flex-col gap-4">
      <Input
        required
        label="User Name"
        placeholder="Enter your username"
        value={values.username}
        error={errors.username}
        onChangeText={handleChange('username')}
      />

      <Input
        required
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        error={errors.email}
        onChangeText={handleChange('email')}
      />

      <Input
        required
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        value={values.password}
        error={errors.password}
        onChangeText={handleChange('password')}
        icon={
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={18}
            color="#9CA3AF"
          />
        }
        onIconClick={() => setShowPassword((prev) => !prev)}
      />

      <Input
        required
        label="Confirm Password"
        placeholder="Confirm your password"
        secureTextEntry={!showConfirm}
        value={values.confirmPassword}
        error={errors.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        icon={
          <Ionicons
            name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
            size={18}
            color="#9CA3AF"
          />
        }
        onIconClick={() => setShowConfirm((prev) => !prev)}
      />

      <Button
        shadow
        className="mt-2"
        disabled={isLoading}
        onPress={handleSubmit}
      >
        Register
      </Button>
    </View>
  );
};

export default RegisterForm;
