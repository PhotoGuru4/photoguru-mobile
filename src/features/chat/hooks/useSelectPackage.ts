import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { usePackagesQuery } from '@features/chat/hooks/queries/usePackagesQuery';
import { ChatStackParamList } from '@navigation/ChatStackNavigator';
import { PackageItem, PackageLocation } from '@features/chat/types/booking';

type NavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'SelectPackage'
>;

interface Params {
  conceptId: number;
  photographerId: number;
  conceptName: string;
  conceptThumbnail: string | null;
  roomId: string;
}

export const useSelectPackage = (params: Params) => {
  const navigation = useNavigation<NavigationProp>();

  const {
    conceptId,
    photographerId,
    conceptName,
    conceptThumbnail,
    roomId,
  } = params;

  const { data: packages, isLoading } = usePackagesQuery(conceptId);

  const [selectedPackage, setSelectedPackage] =
    useState<PackageItem | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<string | null>(null);

  const formatLocation = (loc: PackageLocation) =>
    `${loc.addressDetail ? loc.addressDetail + ', ' : ''}${loc.ward}, ${
      loc.province
    }`;

  const selectPackage = (item: PackageItem) => {
    setSelectedPackage(item);

    if (item.locations.length === 1) {
      setSelectedLocation(formatLocation(item.locations[0]));
    } else {
      setSelectedLocation(null);
    }
  };

  const selectLocation = (item: PackageItem, loc: PackageLocation) => {
    setSelectedPackage(item);
    setSelectedLocation(formatLocation(loc));
  };

  const handleContinue = () => {
    if (!selectedPackage || !selectedLocation) return;

    navigation.navigate('SelectDateTime', {
      conceptId,
      photographerId,
      packageId: selectedPackage.id,
      packageTier: selectedPackage.tier,
      packagePrice: selectedPackage.price,
      packageBenefits: selectedPackage.benefit || [],
      estimatedDuration: selectedPackage.estimatedDuration,

      conceptName,
      conceptThumbnail,

      roomId,
      address: selectedLocation,
    });
  };

  return {
    packages,
    isLoading,
    selectedPackage,
    selectedLocation,
    selectPackage,
    selectLocation,
    handleContinue,
    formatLocation,
  };
};
