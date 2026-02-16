import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Tag, X } from 'lucide-react-native';
import { Text, SelectModal } from '@shared/components/common';
import { useProvincesQuery } from '@shared/hooks/queries/useProvincesQuery';
import { useWardsQuery } from '@shared/hooks/queries/useWardsQuery';
import type { Province, Ward } from '@shared/types/location';
import { ConceptFilters } from '@features/concept/types/filter';
import { PRICE_SORT } from '@shared/constants';

interface Props {
  value: ConceptFilters;
  onChange: (filters: ConceptFilters) => void;
}

const FilterSection = ({ value, onChange }: Props) => {
  const [openProvince, setOpenProvince] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  const { data: provinces = [] } = useProvincesQuery();
  const { data: wards = [] } = useWardsQuery(
    value.provinceCode,
  );

  const togglePriceSort = () => {
    onChange({
      ...value,
      sortByPrice:
        value.sortByPrice === PRICE_SORT.ASC
          ? PRICE_SORT.DESC
          : value.sortByPrice === PRICE_SORT.DESC
            ? undefined
            : PRICE_SORT.ASC,
    });
  };

  const clearFilters = () => {
    onChange({});
  };

  const hasFilter =
    value.province || value.ward || value.sortByPrice;

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mb-4"
      >
        <TouchableOpacity
          onPress={() => setOpenProvince(true)}
          className="flex-row items-center gap-2 bg-pink-50 px-4 py-1.5 mr-3 rounded-full border border-pink-200"
        >
          <MapPin size={16} color="#E06B80" />
          <Text className="text-sm"
            lineClamp={1}
            style={{ maxWidth: 45 }}>
            {value.province ?? 'Province'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!value.province}
          onPress={() => setOpenWard(true)}
          className={`flex-row items-center gap-2 px-4 py-1.5 mr-3 rounded-full border
            ${
    value.province
      ? 'bg-pink-50 border-pink-200'
      : 'bg-gray-100 border-gray-200'
    }`}
        >
          <MapPin
            size={16}
            color={value.province ? '#E06B80' : '#9CA3AF'}
          />
          <Text className="text-sm"
            lineClamp={1}
            style={{ maxWidth: 45 }}>
            {value.ward ?? 'Ward'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={togglePriceSort}
          className={`flex-row items-center gap-2 px-4 py-1.5 mr-3 rounded-full border
            ${
    value.sortByPrice
      ? 'bg-pink-50 border-pink-200'
      : 'bg-gray-100 border-gray-200'
    }`}
        >
          <Tag
            size={16}
            color={value.sortByPrice ? '#E06B80' : '#9CA3AF'}
          />
          <Text className="text-sm">
            {value.sortByPrice === PRICE_SORT.ASC && 'Price ↑'}
            {value.sortByPrice === PRICE_SORT.DESC && 'Price ↓'}
            {!value.sortByPrice && 'Price'}
          </Text>
        </TouchableOpacity>

        {hasFilter && (
          <TouchableOpacity
            onPress={clearFilters}
            className="flex-row items-center gap-1 px-3 py-1.5 rounded-full bg-gray-200"
          >
            <X size={14} />
          </TouchableOpacity>
        )}
      </ScrollView>

      <SelectModal
        visible={openProvince}
        data={provinces}
        onClose={() => setOpenProvince(false)}
        onSelect={(p: Province) => {
          onChange({
            ...value,
            provinceCode: p.code,
            province: p.name,
            ward: undefined,
          });
        }}
        renderLabel={(p) => p.name}
      />

      <SelectModal
        visible={openWard}
        data={wards}
        onClose={() => setOpenWard(false)}
        onSelect={(w: Ward) => {
          onChange({
            ...value,
            ward: w.name,
          });
        }}
        renderLabel={(w) => w.name}
      />
    </>
  );
};

export default FilterSection;
