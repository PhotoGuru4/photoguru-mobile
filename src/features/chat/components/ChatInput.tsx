import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Send } from 'lucide-react-native';

type Props = {
  message: string;
  setMessage: (text: string) => void;
  handleSend: () => void;
  isDisabled: boolean;
};

const ChatInput = ({
  message,
  setMessage,
  handleSend,
  isDisabled,
}: Props) => {
  return (
    <View className="border-t border-gray-200 px-4 py-3 bg-white">
      <View className="flex-row items-center gap-2">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          returnKeyType="send"
          onSubmitEditing={handleSend}
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isDisabled}
          onPress={handleSend}
          style={{ opacity: isDisabled ? 0.5 : 1 }}
          className="w-11 h-11 rounded-full items-center justify-center bg-[#E06B80]"
        >
          <Send size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;
