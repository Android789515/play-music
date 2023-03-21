import { atom } from 'recoil';

import type { MediaPlayerState } from '../types';

export const mediaPlayerState = atom<MediaPlayerState>({
   key: 'mediaPlayerState',
   default: {
      songPlaying: null,
      isOpen: false,
      controls: {
         isPaused: false,
         loop: false,
         shuffle: false,
         volume: .5,
         isMuted: false,
         time: 0,
      },
   }
});
