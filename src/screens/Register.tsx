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

const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

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
          <Text className="text-white text-3xl font-bold">
              PhotoGuru
          </Text>
        </View>
      </View>

      <View className="px-6 -mt-28">
        <View className="bg-white rounded-3xl px-6 py-8 shadow-lg">
          <Text className="text-xl font-bold text-center text-gray-800">
              Create Your Account
          </Text>
          <Text className="text-center text-gray-400 mb-6">
              Join thousands of photography enthusiasts
          </Text>

          <Text className="text-sm text-gray-600 mb-1">
              User Name <Text className="text-pink-500">*</Text>
          </Text>
          <TextInput
            placeholder="What should we call you?"
            className="border border-gray-200 rounded-xl px-4 py-3 mb-4"
          />

          <Text className="text-sm text-gray-600 mb-1">
              Email <Text className="text-pink-500">*</Text>
          </Text>
          <TextInput
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-200 rounded-xl px-4 py-3 mb-4"
          />

          <Text className="text-sm text-gray-600 mb-1">
              Password <Text className="text-pink-500">*</Text>
          </Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <TextInput
              placeholder="Min. 8 characters"
              secureTextEntry
              className="flex-1"
            />
            <Ionicons name="eye-outline" size={18} color="#9ca3af" />
          </View>

          <Text className="text-sm text-gray-600 mb-1">
              Confirm Password <Text className="text-pink-500">*</Text>
          </Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-6">
            <TextInput
              placeholder="Re-enter password"
              secureTextEntry
              className="flex-1"
            />
            <Ionicons name="eye-outline" size={18} color="#9ca3af" />
          </View>

          <Pressable>
            <View className="py-4 rounded-xl items-center bg-pink-500">
              <Text className="text-white font-semibold">
                  Register
              </Text>
            </View>
          </Pressable>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-400">
                Already a member?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text className="text-pink-500 font-semibold">
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
