import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import { BackButton } from '@shared/components/common/BackButton';
import HomeStackNavigator from '@navigation/HomeStackNavigator';
import AIGuide from '@screens/AIGuide';
import ChatStackNavigator, { ChatStackParamList } from '@navigation/ChatStackNavigator';
import Profile from '@screens/Profile';

import { useAuthStore } from '@store/authStore';
import { SCREENS } from '@shared/constants';

import type { NavigatorScreenParams } from '@react-navigation/native';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';

import {
  Home as HomeIcon,
  Sparkles,
  MessageCircle,
  User,
  LogOut,
} from 'lucide-react-native';

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  'AI guide': undefined;
  MessagesTab: NavigatorScreenParams<ChatStackParamList>;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();

    navigation.reset({
      index: 0,
      routes: [{ name: SCREENS.AUTH.LOGIN }],
    });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: '600',
          color: '#E06B80',
        },
        headerTintColor: '#E06B80',
        headerRight: () => (
          <TouchableOpacity
            onPress={handleLogout}
            style={{ marginRight: 16 }}
          >
            <LogOut size={22} color="#E06B80" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: '#E06B80',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? 'Home';

          const isDetail = routeName === 'ConceptDetail';

          return {
            tabBarLabel: 'Home',
            headerTitle: isDetail ? 'Concept Detail' : 'Home',
            headerLeft: isDetail
              ? () => <BackButton size={30} fallback="HomeTab" />
              : undefined,
            tabBarIcon: ({ color, size }) => (
              <HomeIcon color={color} size={size} />
            ),
          };
        }}
      />

      <Tab.Screen
        name="AI guide"
        component={AIGuide}
        options={{
          title: 'AI Guide',
          headerLeft: () => <BackButton size={30} />,
          tabBarIcon: ({ color, size }) => (
            <Sparkles color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="MessagesTab"
        component={ChatStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerLeft: () => <BackButton size={30} />,
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
