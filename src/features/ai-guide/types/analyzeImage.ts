export interface AnalyzeImageResponse {
  instruction: string;
  status: 'needs_adjustment' | 'good';
}
