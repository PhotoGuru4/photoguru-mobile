export const AI_GUIDE_LABELS = {
  TAKE_AGAIN: 'Take again',
  SAVE: 'Save',
  ANALYZING: 'Analyzing...',
  ANALYZE: 'Analyze',
  PERMISSION_TITLE: 'Camera permission required',
  GRANT_PERMISSION: 'Grant Permission',
  CONTEXT_PORTRAIT: 'portrait',
};

export const AI_GUIDE_CONFIG = {
  CAMERA_QUALITY: 0.8,
  IMAGE_RESIZE_WIDTH: 512,
  IMAGE_COMPRESS: 0.7,

  SPEECH_LANGUAGE: 'en-US',
  SPEECH_PITCH: 1,
  SPEECH_RATE: 0.9,

  ALBUM_NAME: 'PhotoGuru',
  FILE_PREFIX_SAVE: 'photoguru_',
  FILE_PREFIX_EDIT: 'photoguru_edit_',

  FACING_FRONT: 'front' as const,
  FACING_BACK: 'back' as const,
  DEFAULT_CONTEXT: 'portrait',

};

export const AI_GUIDE_MODES = {
  CAMERA: 'camera',
  PREVIEW: 'preview',
} as const;
