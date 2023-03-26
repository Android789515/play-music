import { useRecoilState } from 'recoil';

import type { Song } from '@api/types';
import { SongQueuePositions } from './songQueueTypes';
import { songQueueState } from './songQueue';

export const useSongQueue = () => {
   const [ songQueue, updateSongQueue ] = useRecoilState(songQueueState);

   const queueSong = (song: Song, position?: SongQueuePositions) => {
      updateSongQueue(prevQueue => {
         if (position === SongQueuePositions.next) {
            return [ song, ...prevQueue ];
         } else {
            return [ ...prevQueue, song ];
         }
      });
   };

   const unQueueSong = (songIndex: number) => {
      updateSongQueue(prevQueue => {
         return prevQueue.filter((_, index) => {
            return index !== songIndex;
         });
      });
   };

   const clearQueue = () => {
      updateSongQueue([]);
   };

   return {
      songQueue,
      queueSong,
      unQueueSong,
      clearQueue,
   };
};
