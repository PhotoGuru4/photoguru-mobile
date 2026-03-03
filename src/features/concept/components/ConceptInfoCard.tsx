import React from 'react';
import { View } from 'react-native';
import { Text, RowItem } from '@shared/components/common';
import type { ConceptDetail } from '@features/concept/types/concept';
import { formatDurationRange } from '@shared/utils/formatDurationRange';

interface Props {
  concept: ConceptDetail;
}

const ConceptInfoCard = ({ concept }: Props) => {

  return (
    <View className="bg-gray-100 p-4 rounded-xl">
      <Text variant='subtitle' className="mb-3">
        Important package information:
      </Text>

      <RowItem label="Name" value={concept.name || 'No name available'} />

      <RowItem
        label="Description"
        value={concept.description || 'No description available'}
      />

      <RowItem
        label="Duration"
        value={formatDurationRange(concept.packages)}
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
