import React from 'react';
import { View } from 'react-native';
import { Text } from '@shared/components/common';
import type { ConceptDetail } from '@features/concept/types/concept';
import { RowItem } from '@shared/components/common';

interface Props {
  concept: ConceptDetail;
}

const ConceptInfoCard = ({ concept }: Props) => {
  return (
    <View className="bg-gray-100 p-4 rounded-xl">
      <Text className="font-semibold mb-3 text-base">
        Important package information:
      </Text>

      <RowItem label="Name" value={concept.name || 'No name available'} />

      <RowItem
        label="Description"
        value={concept.description || 'No description available'}
      />

      <RowItem
        label="Duration"
        value={`${concept.estimatedDuration || 0} minutes`}
      />

      {concept.locations?.[0] && (
        <RowItem
          label="Address"
          value={concept.locations[0].province || 'No address available'}
        />
      )}
    </View>
  );
};

export default ConceptInfoCard;
