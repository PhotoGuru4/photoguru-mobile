import React, { useState } from 'react';
import {
  View,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Input, Button, Text } from '@shared/components/common';
import { useRegisterForm } from '@features/auth/hooks/useRegister';
import { useProvincesQuery } from '@shared/hooks/queries/useProvincesQuery';
import { useWardsQuery } from '@shared/hooks/queries/useWardsQuery';

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

  const { data: provinces } = useProvincesQuery();

  const selectedProvince = provinces?.find(
    (p) => p.name === values.province,
  );

  const { data: wards } = useWardsQuery(selectedProvince?.code);

  const [openProvince, setOpenProvince] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  return (
    <View className="flex-col gap-4">
      <Input
        required
        label="User Name"
        inputSize='sm'
        placeholder="Enter your username"
        value={values.username}
        error={errors.username}
        onChangeText={handleChange('username')}
      />

      <Input
        required
        label="Email"
        placeholder="you@example.com"
        inputSize='sm'
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        error={errors.email}
        onChangeText={handleChange('email')}
      />

      <View className="flex-row gap-3">
        <View className="flex-1">
          <Text color='default' variant='caption' className="mb-2">
            Province <Text className="text-pink-500">*</Text>
          </Text>

          <Pressable
            onPress={() => setOpenProvince(true)}
            className="border border-gray-300 rounded-lg px-3 h-12 justify-center bg-white"
          >
            <Text color='default' variant='caption'
              lineClamp={1}
              style={{ maxWidth: 145 }}>
              {values.province || 'Select province'}
            </Text>
          </Pressable>

          {errors.province && (
            <Text variant='small' className="text-red-500 mt-1">
              {errors.province}
            </Text>
          )}
        </View>

        <View className="flex-1">
          <Text color='default' variant='caption' className="mb-2">
            Ward <Text className="text-pink-500">*</Text>
          </Text>

          <Pressable
            disabled={!values.province}
            onPress={() => setOpenWard(true)}
            className={`border rounded-lg px-3 h-12 justify-center ${
              values.province
                ? 'border-gray-300 bg-white'
                : 'border-gray-200 bg-gray-100'
            }`}
          >
            <Text color='default' variant='caption'
              lineClamp={1}
              style={{ maxWidth: 145 }}>
              {values.ward || 'Select ward'}
            </Text>
          </Pressable>

          {errors.ward && (
            <Text variant='small' className="text-red-500 mt-1">
              {errors.ward}
            </Text>
          )}
        </View>
      </View>

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

      <Input
        required
        label="Confirm Password"
        placeholder="Confirm your password"
        inputSize='sm'
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

      <Modal visible={openProvince} transparent animationType="slide">
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setOpenProvince(false)}
        >
          <View className="bg-white rounded-t-2xl max-h-[60%] p-4">
            <FlatList
              data={provinces}
              keyExtractor={(item) => item.code.toString()}
              renderItem={({ item }) => (
                <Pressable
                  className="py-3"
                  onPress={() => {
                    handleChange('province')(item.name);
                    setOpenProvince(false);
                  }}
                >
                  <Text className="text-sm text-gray-900">
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      <Modal visible={openWard} transparent animationType="slide">
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setOpenWard(false)}
        >
          <View className="bg-white rounded-t-2xl max-h-[60%] p-4">
            <FlatList
              data={wards}
              keyExtractor={(item) => item.code.toString()}
              renderItem={({ item }) => (
                <Pressable
                  className="py-3"
                  onPress={() => {
                    handleChange('ward')(item.name);
                    setOpenWard(false);
                  }}
                >
                  <Text className="text-sm text-gray-900">
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default RegisterForm;
