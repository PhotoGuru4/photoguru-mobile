import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import ConceptDetail from '@screens/ConceptDetail';

export type HomeStackParamList = {
  Home: undefined;
  ConceptDetail: { conceptId: number };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={Home}
      />

      <Stack.Screen
        name="ConceptDetail"
        component={ConceptDetail}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
