import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system/legacy';
import { Alert } from 'react-native';

export const useSavePhoto = () => {
  const[mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  const handleSave = async (capturedImage: string | null) => {
    if (!capturedImage) return;

    if (!mediaPermission?.granted) {
      const { granted } = await requestMediaPermission();

      if (!granted) {
        Alert.alert(
          'Permission Required',
          'App needs library access to save photos',
        );
        return;
      }
    }

    try {
      let uriToSave = capturedImage;

      if (capturedImage.startsWith('data:image')) {
        const filename = `photoguru_${Date.now()}.jpg`;
        const fileUri = FileSystem.documentDirectory + filename;

        const base64Data = capturedImage.split(',')[1];

        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        uriToSave = fileUri;
      }

      const asset = await MediaLibrary.createAssetAsync(uriToSave);

      await MediaLibrary.createAlbumAsync('PhotoGuru', asset, false);

      Alert.alert('Success', 'Photo saved to library');
    } catch {
      Alert.alert('Error', 'Failed to save photo');
    }
  };

  return { handleSave };
};
