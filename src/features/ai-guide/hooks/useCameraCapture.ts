import React, { useRef, useState } from 'react';
import { CameraView } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { AI_GUIDE_CONFIG } from '@shared/constants/aiGuide';

type CameraFacing = typeof AI_GUIDE_CONFIG.FACING_FRONT | typeof AI_GUIDE_CONFIG.FACING_BACK;

export const useCameraCapture = () => {
  const cameraRef = useRef<React.ElementRef<typeof CameraView>>(null);
  const[cameraFacing, setCameraFacing] = useState<CameraFacing>(AI_GUIDE_CONFIG.FACING_FRONT);

  const capturePhoto = async (): Promise<{ uri: string; base64: string } | null> => {
    if (!cameraRef.current) return null;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: AI_GUIDE_CONFIG.CAMERA_QUALITY,
        base64: true,
      });

      if (!photo?.base64) return null;

      const manipulations: ImageManipulator.Action[] =[{ resize: { width: AI_GUIDE_CONFIG.IMAGE_RESIZE_WIDTH } }];

      if (cameraFacing === AI_GUIDE_CONFIG.FACING_FRONT) {
        manipulations.push({ flip: ImageManipulator.FlipType.Horizontal });
      }

      const manipulated = await ImageManipulator.manipulateAsync(
        photo.uri,
        manipulations,
        { base64: true, compress: AI_GUIDE_CONFIG.IMAGE_COMPRESS },
      );

      return {
        uri: manipulated.uri,
        base64: manipulated.base64!,
      };
    } catch (error) {
      console.error('Capture error:', error);
      return null;
    }
  };

  const handleToggleCameraFacing = () => {
    setCameraFacing((prev) => (prev === AI_GUIDE_CONFIG.FACING_FRONT ? AI_GUIDE_CONFIG.FACING_BACK : AI_GUIDE_CONFIG.FACING_FRONT));
  };

  return {
    cameraRef,
    cameraFacing,
    capturePhoto,
    handleToggleCameraFacing,
  };
};
