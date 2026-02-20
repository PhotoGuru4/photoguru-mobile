import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '@screens/Welcome';
import Login from '@screens/Login';
import Register from '@screens/Register';
import TabNavigator from '@navigation/TabNavigator';
import { SCREENS } from '@shared/constants';

import { useAuthStore } from '@store/authStore';
import {
  AuthStackParamList,
  AppStackParamList,
} from '@shared/types/authNavigator';

const AuthStack =
  createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={SCREENS.AUTH.WELCOME} component={Welcome} />
      <AuthStack.Screen name={SCREENS.AUTH.LOGIN} component={Login} />
      <AuthStack.Screen name={SCREENS.AUTH.REGISTER} component={Register} />
    </AuthStack.Navigator>
  );
};

const AppStack =
  createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen
        name={SCREENS.APP.MAIN}
        component={TabNavigator} />
    </AppStack.Navigator>
  );
};

const RootNavigator = () => {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
