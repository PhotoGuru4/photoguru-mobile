import React, { useState } from 'react';
import { View, Pressable, Modal, FlatList } from 'react-native';
import clsx from 'clsx';
import { Text } from '@shared/components/common/Text';
import { ChevronDown } from 'lucide-react-native';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const FilterSelect = ({
  value,
  options,
  onChange,
  className,
}: FilterSelectProps) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className={clsx(
          'flex-row items-center justify-between',
          'rounded-lg border border-gray-200 bg-white',
          'px-4 py-3',
          className,
        )}
      >
        <Text className="text-gray-700">
          {selected?.label ?? 'Select'}
        </Text>

        <ChevronDown size={18} color="#9CA3AF" />
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/40"
          onPress={() => setOpen(false)}
        />

        <View className="absolute bottom-0 w-full rounded-t-2xl bg-white p-4">
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              const active = item.value === value;

              return (
                <Pressable
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={clsx(
                    'rounded-xl px-4 py-3',
                    active && 'bg-pink-50',
                  )}
                >
                  <Text
                    className={clsx(
                      active ? 'text-pink-500 font-semibold' : 'text-gray-700',
                    )}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default FilterSelect;
