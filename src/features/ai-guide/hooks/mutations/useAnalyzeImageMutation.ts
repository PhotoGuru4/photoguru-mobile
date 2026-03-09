import { useMutation } from '@tanstack/react-query';
import { analyzeImage } from '@features/ai-guide/services/aiGuideService';
import { AnalyzeImageResponse } from '@features/ai-guide/types/analyzeImage';

interface AnalyzeImagePayload {
  imageBase64: string;
  context?: string;
}

export const useAnalyzeImageMutation = () => {
  return useMutation<AnalyzeImageResponse, Error, AnalyzeImagePayload>({
    mutationFn: ({ imageBase64, context }) =>
      analyzeImage(imageBase64, context),
  });
};
