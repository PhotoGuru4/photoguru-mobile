import React from 'react';
import { CameraView } from 'expo-camera';
import { RotateCw } from 'lucide-react-native';
import { Button } from '@shared/components/common';
import { AI_GUIDE_CONFIG } from '@shared/constants/aiGuide';

type CameraFacing = typeof AI_GUIDE_CONFIG.FACING_FRONT | typeof AI_GUIDE_CONFIG.FACING_BACK;

interface CameraPreviewProps {
  cameraRef: React.RefObject<React.ElementRef<typeof CameraView> | null>;
  cameraFacing: CameraFacing;
  onToggleFacing: () => void;
}

export const CameraPreview = ({ cameraRef, cameraFacing, onToggleFacing }: CameraPreviewProps) => {
  return (
    <>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={cameraFacing} />

      <Button
        onPress={onToggleFacing}
        unstyled
        className="absolute top-10 right-5 w-11 h-11 rounded-full bg-black/50 items-center justify-center"
      >
        <RotateCw size={24} color="#fff" />
      </Button>
    </>
  );
};
