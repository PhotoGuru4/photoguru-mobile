import React from 'react';
import {
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackParamList } from '@shared/types/authNavigator';
import Heading from '@shared/components/common/Heading';
import Text from '@shared/components/common/Text';

import RegisterForm from '@features/auth/components/RegisterForm';

const Register = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className="h-[250px] overflow-hidden rounded-b-[160px]">
        <Image
          source={require('@assets/banner.jpg')}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 items-center justify-center bg-pink-500/90">
          <Heading level={2} className="text-white">
            PhotoGuru
          </Heading>
        </View>
      </View>

      <View className="px-6 -mt-28">
        <View className="bg-white rounded-3xl px-6 py-8 shadow-lg">
          <Heading level={3} align="center">
            Create Your Account
          </Heading>

          <Text align="center" color="gray" className="mb-6">
            Join thousands of photography enthusiasts
          </Text>

          <RegisterForm />

          <View className="mt-6 flex-row justify-center">
            <Text color="gray">
              Already a member?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text color="pink" className="font-semibold">
                Log In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
