import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '@shared/components/common';
import { usePackagesQuery } from '@features/chat/hooks/queries/usePackagesQuery';
import { formatPrice } from '@shared/utils/formatPrice';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChatStackParamList } from '@navigation/ChatStackNavigator';
import { PackageItem, PackageLocation } from '@features/chat/types/booking';

type SelectPackageNavigationProp = NativeStackNavigationProp<ChatStackParamList, 'SelectPackage'>;
type SelectPackageRouteProp = RouteProp<ChatStackParamList, 'SelectPackage'>;

const SelectPackageScreen = () => {
  const navigation = useNavigation<SelectPackageNavigationProp>();
  const route = useRoute<SelectPackageRouteProp>();
  const { conceptId, photographerId, conceptName, roomId } = route.params;

  const { data: packages, isLoading } = usePackagesQuery(conceptId);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const formatLocation = (loc: PackageLocation) =>
    `${loc.addressDetail ? loc.addressDetail + ', ' : ''}${loc.ward}, ${loc.province}`;

  const handleContinue = () => {
    if (!selectedPackage || !selectedLocation) return;

    // Chuyển sang màn hình chọn ngày giờ, kèm thông tin package đã chọn
    navigation.navigate('SelectDateTime', {
      conceptId,
      photographerId,
      packageId: selectedPackage.id,
      packageTier: selectedPackage.tier,
      packagePrice: selectedPackage.price,
      packageDescription: selectedPackage.description || '',
      estimatedDuration: selectedPackage.estimatedDuration,
      conceptName,
      roomId,
      address: selectedLocation,
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Loading packages...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <View className="p-4 border-b border-gray-100">
        <Text variant="subtitle" align="center">Choose Your Package</Text>
        <Text variant="caption" color="muted" align="center">
          Select the package and location for your session
        </Text>
      </View>

      <FlatList
        data={packages}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const isSelected = selectedPackage?.id === item.id;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setSelectedPackage(item);
                // Nếu package chỉ có 1 location, tự động chọn luôn
                if (item.locations.length === 1) {
                  setSelectedLocation(formatLocation(item.locations[0]));
                } else {
                  setSelectedLocation(null);
                }
              }}
              className={`border rounded-xl p-4 mb-4 ${
                isSelected ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
              }`}
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-lg capitalize">
                  {item.tier.toLowerCase()}
                </Text>
                <Text className="font-bold text-pink-500">{formatPrice(item.price)}</Text>
              </View>

              <Text variant="small" color="muted" className="mb-3">
                {item.description}
              </Text>

              {/* Location selection area */}
              <View className="border-t border-gray-100 pt-3">
                <Text variant="small" className="font-bold mb-2">
                  📍 Select Location:
                </Text>
                {item.locations.map((loc) => {
                  const locString = formatLocation(loc);
                  const isLocSelected = selectedLocation === locString && isSelected;
                  return (
                    <TouchableOpacity
                      key={loc.id}
                      onPress={() => {
                        setSelectedPackage(item);
                        setSelectedLocation(locString);
                      }}
                      className={`flex-row items-center p-2 mb-1 rounded-lg ${
                        isLocSelected ? 'bg-pink-100' : 'bg-gray-50'
                      }`}
                    >
                      <View className="w-4 h-4 rounded-full border border-pink-500 mr-2 items-center justify-center">
                        {isLocSelected && (
                          <View className="w-2 h-2 rounded-full bg-pink-500" />
                        )}
                      </View>
                      <Text
                        className={`text-xs flex-1 ${
                          isLocSelected ? 'font-bold text-pink-700' : 'text-gray-600'
                        }`}
                      >
                        {locString}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View className="p-4 border-t border-gray-100">
        <Button
          onPress={handleContinue}
          disabled={!selectedPackage || !selectedLocation}
          fullWidth
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SelectPackageScreen;
