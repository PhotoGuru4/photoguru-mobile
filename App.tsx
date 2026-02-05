import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/queryClient';

import RootNavigator from '@navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import toastConfig from '@/shared/utils/toastConfig';

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <View className="flex-1 bg-white">
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <Toast
            config={toastConfig}
            position="top"
            visibilityTime={2500}
            topOffset={50}
          />
        </View>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
