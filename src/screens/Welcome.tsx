import { View, Text, Image, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@shared/types/authNavigator';
import { SCREENS } from '@shared/constants';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  typeof SCREENS.AUTH.WELCOME
>;

const Welcome = ({ navigation }: Props) => {
  return (
    <View className="flex-1 bg-pink-50">
      <View className="h-[58%] w-full overflow-hidden rounded-b-[160px]">
        <Image
          source={require('@assets/welcome.jpg')}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 px-8 items-center justify-center">
        <Text className="text-3xl font-bold text-pink-500 mb-10">
          Get Started
        </Text>

        <Pressable
          onPress={() => navigation.navigate(SCREENS.AUTH.LOGIN)}
          className="w-full bg-pink-500 py-4 rounded-full items-center mb-4 shadow"
        >
          <Text className="text-white text-base font-semibold">
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate(SCREENS.AUTH.REGISTER)}
          className="w-full bg-white border border-pink-400 py-4 rounded-full items-center"
        >
          <Text className="text-pink-500 text-base font-semibold">
            Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Welcome;
