import { useCallback } from 'react';

import type { AudioNode } from '../types';

export const useSongPlaying = (audioNode: AudioNode) => {
   const handlePauseUpdate = useCallback((isPaused: boolean) => {
      if (isPaused) {
         audioNode?.pause();
      } else {
         audioNode?.play();
      }
   }, [ audioNode ]);

   const changeVolume = useCallback((volume: number) => {
      if (audioNode) {
         audioNode.volume = volume;
      }
   }, [ audioNode ]);

   const syncSongTime = useCallback((songTime: number) => {
      if (audioNode) {
         const shouldRewind = () => audioNode.currentTime > songTime + 1;
         const shouldFastForward = () => audioNode.currentTime < songTime - 1;

         if (shouldFastForward() || shouldRewind()) {
            audioNode.currentTime = songTime;
         }
      }
   }, [ audioNode ]);

   return {
      handlePauseUpdate,
      changeVolume,
      syncSongTime,
   };
};