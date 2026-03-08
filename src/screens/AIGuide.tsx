import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { useAuthStore } from '@store/authStore';
import { useAIGuide } from '@features/ai-guide/hooks/useAIGuide';
import { useCameraCapture } from '@features/ai-guide/hooks/useCameraCapture';
import { useSavePhoto } from '@features/ai-guide/hooks/useSavePhoto';
import { useEnhancePhoto } from '@features/ai-guide/hooks/useEnhancePhoto';

import { CameraPreview } from '@features/ai-guide/components/CameraPreview';
import { CaptureButton } from '@features/ai-guide/components/CaptureButton';
import { ImagePreview } from '@features/ai-guide/components/ImagePreview';
import { InstructionBanner } from '@features/ai-guide/components/InstructionBanner';
import { EnhanceButton } from '@features/ai-guide/components/EnhanceButton';
import { ActionButtons } from '@features/ai-guide/components/ActionButtons';

type ScreenMode = 'camera' | 'preview';

export default function AIGuide() {
  const [permission, requestPermission] = useCameraPermissions();
  const { token } = useAuthStore();

  const [mode, setMode] = useState<ScreenMode>('camera');
  const[capturedImage, setCapturedImage] = useState<string | null>(null);
  const[currentBase64, setCurrentBase64] = useState<string | null>(null);

  const {
    isAnalyzing,
    isEditing,
    lastInstruction,
    setLastInstruction,
    analyzeSingleImage,
    enhanceWithAI,
    stopSpeaking,
  } = useAIGuide();

  const { cameraRef, cameraFacing, capturePhoto, handleToggleCameraFacing } = useCameraCapture();
  const { handleSave } = useSavePhoto();
  const { handleEnhanceWithAI } = useEnhancePhoto({
    currentBase64,
    lastInstruction,
    enhanceWithAI,
    stopSpeaking,
    setLastInstruction,
    setCapturedImage,
    setCurrentBase64,
  });

  const handleCaptureAndAnalyze = async () => {
    if (!token) {
      Alert.alert('Error', 'Please sign in first');
      return;
    }

    const photo = await capturePhoto();

    if (!photo) {
      Alert.alert('Error', 'Failed to capture photo');
      return;
    }

    setCapturedImage(photo.uri);
    setCurrentBase64(photo.base64);
    setMode('preview');

    await analyzeSingleImage(photo.base64, 'portrait');
  };

  const handleReanalyze = async () => {
    if (!currentBase64) return;
    await analyzeSingleImage(currentBase64, 'portrait');
  };

  const handleRetake = () => {
    stopSpeaking();
    setLastInstruction('');
    setMode('camera');
    setCapturedImage(null);
    setCurrentBase64(null);
  };

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white text-lg mb-5 text-center">
          Camera permission required
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-[#E06B80] px-8 py-4 rounded-full"
        >
          <Text className="text-white font-semibold text-base">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {mode === 'camera' ? (
        <>
          <CameraPreview
            cameraRef={cameraRef}
            cameraFacing={cameraFacing}
            onToggleFacing={handleToggleCameraFacing}
          />
          <CaptureButton
            onCapture={handleCaptureAndAnalyze}
            isAnalyzing={isAnalyzing}
          />
        </>
      ) : (
        <View className="flex-1 bg-black">
          <ImagePreview imageUri={capturedImage} />
          <InstructionBanner instruction={lastInstruction} />

          <EnhanceButton
            onEnhance={handleEnhanceWithAI}
            disabled={isEditing || !lastInstruction}
            isEditing={isEditing}
          />

          <ActionButtons
            onRetake={handleRetake}
            onSave={() => handleSave(capturedImage)}
            onReanalyze={handleReanalyze}
            isAnalyzing={isAnalyzing}
          />
        </View>
      )}
    </View>
  );
}
