import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text } from '@shared/components/common/Text';

type Props<T> = {
  visible: boolean;
  data: T[];
  onClose: () => void;
  onSelect: (item: T) => void;
  renderLabel: (item: T) => string;
};

export function SelectModal<T>({
  visible,
  data,
  onClose,
  onSelect,
  renderLabel,
}: Props<T>) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 bg-black/30 justify-center px-6"
      >
        <View className="bg-white rounded-xl max-h-[70%]">
          <ScrollView>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="px-4 py-3 border-b border-gray-100"
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text>{renderLabel(item)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
