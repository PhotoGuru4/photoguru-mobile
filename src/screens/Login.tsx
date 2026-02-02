import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@shared/types/authNavigator';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className="h-[320px] overflow-hidden rounded-b-[160px]">
        <Image
          source={require('@assets/banner.jpg')}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 items-center justify-center bg-pink-500/90">
          <Text className="text-white text-3xl font-bold">
              PhotoGuru
          </Text>
        </View>
      </View>

      <View className="px-6 -mt-24">
        <View className="bg-white rounded-3xl px-6 py-8 shadow-lg">
          <Text className="text-xl font-bold text-center text-gray-800">
              Welcome Back
          </Text>
          <Text className="text-center text-gray-400 mb-6">
              Sign in to continue your journey
          </Text>

          <Text className="text-sm text-gray-600 mb-1">
              Email Address <Text className="text-pink-500">*</Text>
          </Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-3 mb-4">
            <Ionicons name="mail-outline" size={18} color="#9ca3af" />
            <TextInput
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 px-3 py-3 text-gray-700"
            />
          </View>

          <Text className="text-sm text-gray-600 mb-1">
              Password <Text className="text-pink-500">*</Text>
          </Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-3 mb-6">
            <Ionicons name="lock-closed-outline" size={18} color="#9ca3af" />
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              className="flex-1 px-3 py-3 text-gray-700"
            />
            <Ionicons name="eye-outline" size={18} color="#9ca3af" />
          </View>

          <Pressable>
            <View className="py-4 rounded-xl items-center bg-pink-500">
              <Text className="text-white font-semibold">
                  Log In
              </Text>
            </View>
          </Pressable>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-400">
                Create an account?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text className="text-pink-500 font-semibold">
                  Register
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
