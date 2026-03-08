import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import { analyzeImage, editImage } from '@features/ai-guide/services/aiGuideService';
import { AnalyzeImageResponse } from '../types/analyzeImage';

export const useAIGuide = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lastInstruction, setLastInstruction] = useState('');
  const [lastStatus, setLastStatus] = useState<'needs_adjustment' | 'good'>('needs_adjustment');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const speakInstruction = (text: string) => {
    Speech.stop();
    setIsSpeaking(true);
    Speech.speak(text, {
      language: 'en-US',
      pitch: 1,
      rate: 0.9,

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
      const response = await analyzeImage(base64, context);
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
      const response = await editImage(base64, instruction);
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
