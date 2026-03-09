import { useMutation } from '@tanstack/react-query';
import { editImage } from '@features/ai-guide/services/aiGuideService';
import { EditImageResponse } from '@features/ai-guide/types/editImage';

interface EditImagePayload {
  imageBase64: string;
  instruction: string;
}

export const useEditImageMutation = () => {
  return useMutation<EditImageResponse, Error, EditImagePayload>({
    mutationFn: ({ imageBase64, instruction }) =>
      editImage(imageBase64, instruction),
  });
};
