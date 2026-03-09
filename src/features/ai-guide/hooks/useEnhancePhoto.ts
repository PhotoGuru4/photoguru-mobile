import * as FileSystem from 'expo-file-system/legacy';
import { AI_GUIDE_MESSAGES } from '@shared/constants/messages/aiGuide';
import { showError } from '@shared/utils/toast';
import { AI_GUIDE_CONFIG } from '@shared/constants/aiGuide';
interface UseEnhancePhotoProps {
  currentBase64: string | null;
  lastInstruction: string;
  enhanceWithAI: (base64: string, instruction: string) => Promise<string>;
  stopSpeaking: () => void;
  setLastInstruction: (instruction: string) => void;
  setCapturedImage: (uri: string) => void;
  setCurrentBase64: (base64: string) => void;
}

export const useEnhancePhoto = ({
  currentBase64,
  lastInstruction,
  enhanceWithAI,
  stopSpeaking,
  setLastInstruction,
  setCapturedImage,
  setCurrentBase64,
}: UseEnhancePhotoProps) => {
  const handleEnhanceWithAI = async () => {
    if (!currentBase64 || !lastInstruction) {
      showError('No instruction', AI_GUIDE_MESSAGES.NO_INSTRUCTION);
      return;
    }

    const currentInstruction = lastInstruction;

    stopSpeaking();
    setLastInstruction('');

    try {
      const editedBase64 = await enhanceWithAI(currentBase64, currentInstruction);

      console.log('Edited base64 from API:', editedBase64?.substring(0, 100));

      const filename = `${AI_GUIDE_CONFIG.FILE_PREFIX_EDIT}${Date.now()}.jpg`;
      const fileUri = FileSystem.documentDirectory + filename;

      const base64Data = editedBase64.includes('base64,')
        ? editedBase64.split(',')[1]
        : editedBase64;

      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setCapturedImage(fileUri);
      setCurrentBase64(base64Data);
    } catch (error) {
      console.error('Enhance error:', error);
      showError('Error', AI_GUIDE_MESSAGES.ENHANCE_ERROR);
    }
  };

  return { handleEnhanceWithAI };
};
