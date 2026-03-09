import { AnalyzeStatus } from '@shared/constants/aiGuide';

export interface AnalyzeImageResponse {
  instruction: string;
  status: AnalyzeStatus;
}
