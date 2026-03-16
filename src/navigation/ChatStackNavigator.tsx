import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import Messages from '@screens/Messages';
import ChatDetail from '@screens/ChatDetail';
import SelectPackageScreen from '@screens/SelectPackageScreen';
import SelectDateTimeScreen from '@screens/SelectDateTimeScreen';
import ConfirmBookingScreen from '@screens/ConfirmBookingScreen';

import { BackButton } from '@shared/components/common/BackButton';
import { useAuthStore } from '@store/authStore';
import { SCREENS } from '@shared/constants';

import { LogOut } from 'lucide-react-native';

export type ChatStackParamList = {
  Messages: undefined;

  ChatDetail: {
    conversationId: string;
  };

  SelectPackage: {
    conceptId: number;
    photographerId: number;
    conceptName: string;
    conceptThumbnail: string | null;
    roomId: string;
  };

  SelectDateTime: {
    conceptId: number;
    photographerId: number;
    packageId: number;
    packageTier: string;
    packagePrice: number;
    packageBenefits: string[];
    estimatedDuration: number | null;

    conceptName: string;
    conceptThumbnail: string | null;

    roomId: string;
    address: string;
  };

  ConfirmBooking: {
    conceptId: number;
    photographerId: number;
    packageId: number;

    packageTier: string;
    packagePrice: number;
    packageBenefits: string[];
    estimatedDuration: number | null;

    conceptName: string;
    conceptThumbnail: string | null;

    roomId: string;
    address: string;

    bookingDate: string;
    bookingStart: string;
    bookingEnd: string;
  };
};

const Stack = createNativeStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {
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
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: true,
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: '600',
          color: '#E06B80',
        },
        headerTintColor: '#E06B80',
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
            <LogOut size={22} color="#E06B80" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          title: 'Messages',
          headerLeft: () => <BackButton size={30} fallback="HomeTab" />,
        }}
      />

      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{
          title: 'Chat Detail',
          headerLeft: () => <BackButton size={30} />,
        }}
      />

      <Stack.Screen
        name="SelectPackage"
        component={SelectPackageScreen}
        options={{ title: 'Select Package' }}
      />

      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTimeScreen}
        options={{ title: 'Select Date & Time' }}
      />

      <Stack.Screen
        name="ConfirmBooking"
        component={ConfirmBookingScreen}
        options={{ title: 'Confirm Booking' }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
