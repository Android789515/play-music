import { useRecoilState } from 'recoil';

import type { Song } from '@api/types';
import { SongQueuePositions } from '../types/songQueueTypes';
import { songQueueState } from '../stores/songQueue';

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

   const getNextSong = () => {
      const [ nextSong ] = songQueue;

      unQueueSong(songQueue.indexOf(nextSong));

      return nextSong;
   };

   const clearQueue = () => {
      updateSongQueue([]);
   };

   return {
      songQueue,
      queueSong,
      unQueueSong,
      getNextSong,
      clearQueue,
   };
};
