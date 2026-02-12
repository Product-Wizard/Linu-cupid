export interface FloatingHeart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

export interface CardState {
  recipientName: string;
  message: string;
  videoUrl: string | null;
  isPlaying: boolean;
}

export enum AppStage {
  SETUP = 'SETUP',
  PREVIEW = 'PREVIEW',
}