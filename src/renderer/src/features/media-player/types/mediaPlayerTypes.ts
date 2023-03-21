import type { Song } from '@api/types';

export interface MediaControls {
   isPaused: boolean;
   loop: boolean;
   shuffle: boolean;
   volume: number;
   isMuted: boolean;
   time: number;
}

export type MediaControlsValue = boolean | number;
export type MediaControlsUpdater = (controls: MediaControls) => void;

export interface MediaPlayerState {
   songPlaying: Song | null;
   isOpen: boolean;
   controls: MediaControls;
}
