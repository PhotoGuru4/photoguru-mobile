import React, { useState } from 'react';
import { View } from 'react-native';
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
import { AI_GUIDE_MESSAGES } from '@shared/constants/messages/aiGuide';
import { showError } from '@shared/utils/toast';
import { Button, Text } from '@shared/components/common';
import { AI_GUIDE_LABELS, AI_GUIDE_CONFIG, AI_GUIDE_MODES } from '@/shared/constants/aiGuide';

type ScreenMode = typeof AI_GUIDE_MODES.CAMERA | typeof AI_GUIDE_MODES.PREVIEW;

export default function AIGuide() {
  const [permission, requestPermission] = useCameraPermissions();
  const { token } = useAuthStore();

  const [mode, setMode] = useState<ScreenMode>(AI_GUIDE_MODES.CAMERA);
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
      showError('Error', AI_GUIDE_MESSAGES.AUTH_REQUIRED);
      return;
    }

    const photo = await capturePhoto();

    if (!photo) {
      showError('Error', AI_GUIDE_MESSAGES.CAPTURE_ERROR);
      return;
    }

    setCapturedImage(photo.uri);
    setCurrentBase64(photo.base64);
    setMode(AI_GUIDE_MODES.PREVIEW);

    await analyzeSingleImage(photo.base64, AI_GUIDE_CONFIG.DEFAULT_CONTEXT);
  };

  const handleReanalyze = async () => {
    if (!currentBase64) return;
    await analyzeSingleImage(currentBase64, AI_GUIDE_CONFIG.DEFAULT_CONTEXT);
  };

  const handleRetake = () => {
    stopSpeaking();
    setLastInstruction('');
    setMode(AI_GUIDE_MODES.CAMERA);
    setCapturedImage(null);
    setCurrentBase64(null);
  };

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text
          variant="subtitle"
          color="white"
          align="center"
          className="mb-5"
        >
          {AI_GUIDE_LABELS.PERMISSION_TITLE}
        </Text>

        <Button
          onPress={requestPermission}
          color="pink"
          size="lg"
        >
          {AI_GUIDE_LABELS.GRANT_PERMISSION}
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {mode === AI_GUIDE_MODES.CAMERA ? (
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
