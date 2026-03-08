import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { RotateCw } from 'lucide-react-native';

interface CameraPreviewProps {
  cameraRef: React.RefObject<React.ElementRef<typeof CameraView> | null>;
  cameraFacing: 'front' | 'back';
  onToggleFacing: () => void;
}

export const CameraPreview = ({ cameraRef, cameraFacing, onToggleFacing }: CameraPreviewProps) => {
  return (
    <>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={cameraFacing} />

      <TouchableOpacity
        onPress={onToggleFacing}
        className="absolute top-10 right-5 w-11 h-11 rounded-full bg-black/50 items-center justify-center"
      >
        <RotateCw size={24} color="#fff" />
      </TouchableOpacity>
    </>
  );
};
