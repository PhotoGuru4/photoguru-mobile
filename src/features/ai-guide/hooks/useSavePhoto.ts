import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system/legacy';
import { showError, showSuccess, showInfo } from '@shared/utils/toast';
import { AI_GUIDE_MESSAGES } from '@shared/constants/messages/aiGuide';
import { AI_GUIDE_CONFIG } from '@/shared/constants/aiGuide';

export const useSavePhoto = () => {
  const[mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  const handleSave = async (capturedImage: string | null) => {
    if (!capturedImage) return;

    if (!mediaPermission?.granted) {
      const { granted } = await requestMediaPermission();

      if (!granted) {
        showInfo('Permission Required', AI_GUIDE_MESSAGES.PERMISSION_REQUIRED);
        return;
      }
    }

    try {
      let uriToSave = capturedImage;

      if (capturedImage.startsWith('data:image')) {
        const filename = `${AI_GUIDE_CONFIG.FILE_PREFIX_SAVE}${Date.now()}.jpg`;
        const fileUri = FileSystem.documentDirectory + filename;

        const base64Data = capturedImage.split(',')[1];

        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        uriToSave = fileUri;
      }

      const asset = await MediaLibrary.createAssetAsync(uriToSave);

      await MediaLibrary.createAlbumAsync(AI_GUIDE_CONFIG.ALBUM_NAME, asset, false);

      showSuccess('Success', AI_GUIDE_MESSAGES.SAVE_SUCCESS);
    } catch {
      showError('Error', AI_GUIDE_MESSAGES.SAVE_ERROR);
    }
  };

  return { handleSave };
};
