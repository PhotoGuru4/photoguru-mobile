import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Input, Button } from '@shared/components/common';
import { useLoginForm } from '@features/auth/hooks/useLogin';

const LoginForm = () => {
  const {
    values,
    errors,
    showPassword,
    isLoading,
    handleChange,
    handleSubmit,
    setShowPassword,
  } = useLoginForm();

  return (
    <View className="flex-col gap-4">
      <Input
        required
        label="Email Address"
        placeholder="you@example.com"
        inputSize='sm'
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        error={errors.email}
        onChangeText={handleChange('email')}
        icon={
          <Ionicons
            name="mail-outline"
            size={18}
            color="#9CA3AF"
          />
        }
      />

      <Input
        required
        label="Password"
        placeholder="Enter your password"
        inputSize='sm'
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

      <Button
        shadow
        className="mt-2 bg-pink-500"
        disabled={isLoading}
        onPress={handleSubmit}
      >
        Log In
      </Button>
    </View>
  );
};

export default LoginForm;
