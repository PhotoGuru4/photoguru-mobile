import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Loading } from '@shared/components/common';
import { formatPrice } from '@shared/utils/formatPrice';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MapPin, Check } from 'lucide-react-native';

import { ChatStackParamList } from '@navigation/ChatStackNavigator';
import { useSelectPackage } from '@features/chat/hooks/useSelectPackage';

type SelectPackageRouteProp = RouteProp<ChatStackParamList, 'SelectPackage'>;

const SelectPackageScreen = () => {
  const route = useRoute<SelectPackageRouteProp>();

  const {
    conceptId,
    photographerId,
    conceptName,
    conceptThumbnail,
    roomId,
  } = route.params;

  const {
    packages,
    isLoading,
    selectedPackage,
    selectedLocation,
    selectPackage,
    selectLocation,
    handleContinue,
    formatLocation,
  } = useSelectPackage({
    conceptId,
    photographerId,
    conceptName,
    conceptThumbnail,
    roomId,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <View className="p-4 border-b border-gray-100">
        <Text variant="subtitle" align="center">
          Choose Your Package
        </Text>
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
              onPress={() => selectPackage(item)}
              className={`border rounded-xl p-4 mb-4 ${
                isSelected ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
              }`}
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-lg capitalize">
                  {item.tier.toLowerCase()}
                </Text>

                <Text className="font-bold text-pink-500">
                  {formatPrice(item.price)}
                </Text>
              </View>

              <View className="mb-3">
                {item.benefit?.map((b, index) => (
                  <Text lineClamp={1} key={index} variant="small" color="muted">
                    <Check size={14} color="#E06B80" /> {b}
                  </Text>
                ))}
                {item.estimatedDuration && (
                  <View className="flex-row items-center gap-1">
                    <Check size={14} color="#E06B80" />
                    <Text lineClamp={1} variant="small" color="muted">
                      {item.estimatedDuration} minutes photo session
                    </Text>
                  </View>
                )}
              </View>

              <View className="border-t border-gray-100 pt-3">
                <View className="flex-row items-center mb-2">
                  <MapPin size={14} color="#E06B80" />
                  <Text variant="small" className="font-bold ml-1">
                    Select location:
                  </Text>
                </View>

                {item.locations.map((loc) => {
                  const locString = formatLocation(loc);
                  const isLocSelected =
                    selectedLocation === locString && isSelected;

                  return (
                    <TouchableOpacity
                      key={loc.id}
                      onPress={() => selectLocation(item, loc)}
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
                          isLocSelected
                            ? 'font-bold text-pink-700'
                            : 'text-gray-600'
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
