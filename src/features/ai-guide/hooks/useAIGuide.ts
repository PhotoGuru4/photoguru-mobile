import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';

import { useAnalyzeImageMutation } from '@features/ai-guide/hooks/mutations/useAnalyzeImageMutation';
import { useEditImageMutation } from '@features/ai-guide/hooks/mutations/useEditImageMutation';

import { AnalyzeImageResponse } from '@features/ai-guide/types/analyzeImage';
import { AI_GUIDE_CONFIG } from '@/shared/constants/aiGuide';

export const useAIGuide = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lastInstruction, setLastInstruction] = useState('');
  const [lastStatus, setLastStatus] = useState<'needs_adjustment' | 'good'>('needs_adjustment');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const analyzeMutation = useAnalyzeImageMutation();
  const editMutation = useEditImageMutation();

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const speakInstruction = (text: string) => {
    Speech.stop();
    setIsSpeaking(true);
    Speech.speak(text, {
      language: AI_GUIDE_CONFIG.SPEECH_LANGUAGE,
      pitch: AI_GUIDE_CONFIG.SPEECH_PITCH,
      rate: AI_GUIDE_CONFIG.SPEECH_RATE,
      onDone: () => {
        setIsSpeaking(false);
      },

      onError: () => {
        setIsSpeaking(false);
      },
    });
  };

  const analyzeSingleImage = async (
    base64: string,
    context?: string,
  ): Promise<AnalyzeImageResponse> => {
    setIsAnalyzing(true);
    try {
      const response = await analyzeMutation.mutateAsync({
        imageBase64: base64,
        context,
      });

      setLastInstruction(response.instruction);
      setLastStatus(response.status);
      speakInstruction(response.instruction);
      return response;
    } catch (error) {
      console.error('Analysis error:', error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enhanceWithAI = async (
    base64: string,
    instruction: string,
  ): Promise<string> => {
    setIsEditing(true);
    try {
      const response = await editMutation.mutateAsync({
        imageBase64: base64,
        instruction,
      });

      return response.editedImage;
    } catch (error) {
      console.error('Edit error:', error);
      throw error;
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return {
    isAnalyzing,
    isEditing,
    lastInstruction,
    setLastInstruction,
    lastStatus,
    isSpeaking,
    analyzeSingleImage,
    enhanceWithAI,
    speakInstruction,
    stopSpeaking,
  };
};
