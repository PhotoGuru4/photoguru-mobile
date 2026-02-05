import { View, Text } from 'react-native';
import type { ToastConfig } from 'react-native-toast-message';

const toastConfig: ToastConfig = {
  success: ({ text1 }) => (
    <View className="mx-4 rounded-md bg-green-400 px-4 py-3 shadow-lg">
      <Text className="text-white text-sm font-semibold">
        {text1}
      </Text>
    </View>
  ),

  error: ({ text1 }) => (
    <View className="mx-4 rounded-md bg-red-400 px-4 py-3 shadow-lg">
      <Text className="text-white text-sm font-semibold">
        {text1}
      </Text>
    </View>
  ),
};

export default toastConfig;
