import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import RootNavigator from '@navigation/RootNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
