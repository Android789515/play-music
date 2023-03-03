import { useRecoilState } from 'recoil';
import { useCallback } from 'react';

import type { Song } from '@api/types';
import { songQueueState } from '../stores';

export const useSongQueue = () => {
   const [ songQueue, updateSongQueue ] = useRecoilState(songQueueState);

   const getSongQueue = useCallback(() => songQueue, [ songQueue ]);

   const queueSong = useCallback((song: Song) => {
      updateSongQueue(prevQueue => [ ...prevQueue, song ]);
   }, [ updateSongQueue ]);

   const advanceSongQueue = useCallback(() => {
      updateSongQueue(prevQueue => {
         return prevQueue.filter((_, index) => index !== 0);
      });
   }, [ updateSongQueue ]);

   return {
      getSongQueue,
      queueSong,
      advanceSongQueue
   };
};