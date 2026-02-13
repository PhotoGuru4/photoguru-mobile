import React, { useMemo } from 'react';
import { View } from 'react-native';
import ConceptCard from '@features/concept/components/ConceptCard';
import type { Concept } from '@features/concept/types/concept';

interface Props {
  data: Concept[];
}

const ConceptMasonry = ({ data }: Props) => {
  const { left, right } = useMemo(() => {
    const leftCol: Concept[] = [];
    const rightCol: Concept[] = [];

    data.forEach((item, index) => {
      (index % 2 === 0 ? leftCol : rightCol).push(
        item,
      );
    });

    return { left: leftCol, right: rightCol };
  }, [data]);

  return (
    <View className="px-4 flex-row justify-between">
      <View className="w-[48%]">
        {left.map((item) => (
          <ConceptCard key={item.id} item={item} />
        ))}
      </View>

      <View className="w-[48%]">
        {right.map((item) => (
          <ConceptCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default ConceptMasonry;
