import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackParamList } from '@shared/types/authNavigator';
import LoginForm from '@features/auth/components/LoginForm';

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

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

          <LoginForm />

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
