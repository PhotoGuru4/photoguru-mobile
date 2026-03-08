import React, { useRef, useState } from 'react';
import { CameraView } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

type CameraFacing = 'front' | 'back';

export const useCameraCapture = () => {
  const cameraRef = useRef<React.ElementRef<typeof CameraView>>(null);
  const[cameraFacing, setCameraFacing] = useState<CameraFacing>('front');

  const capturePhoto = async (): Promise<{ uri: string; base64: string } | null> => {
    if (!cameraRef.current) return null;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });

      if (!photo?.base64) return null;

      const manipulations: ImageManipulator.Action[] =[{ resize: { width: 512 } }];

      if (cameraFacing === 'front') {
        manipulations.push({ flip: ImageManipulator.FlipType.Horizontal });
      }

      const manipulated = await ImageManipulator.manipulateAsync(
        photo.uri,
        manipulations,
        { base64: true, compress: 0.7 },
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
    setCameraFacing((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  return {
    cameraRef,
    cameraFacing,
    capturePhoto,
    handleToggleCameraFacing,
  };
};
