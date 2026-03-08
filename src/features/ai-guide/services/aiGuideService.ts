import { POST } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';
import { AnalyzeImageResponse } from '../types/analyzeImage';
import { EditImageResponse } from '../types/editImage';

export const analyzeImage = async (
  imageBase64: string,
  context?: string,
): Promise<AnalyzeImageResponse> => {
  return POST(API_ENDPOINTS.AI_GUIDE.ANALYZE, {
    image: imageBase64,
    context,
  });
};

export const editImage = async (
  imageBase64: string,
  instruction: string,
): Promise<EditImageResponse> => {
  return POST(API_ENDPOINTS.AI_GUIDE.EDIT, {
    image: imageBase64,
    instruction,
  });
};
