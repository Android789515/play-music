import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import type { Song } from '@api/types';
import { songQueueState, songHistoryState } from '../stores';

export const useSongQueue = () => {
   const [ songQueue, updateSongQueue ] = useRecoilState(songQueueState);

   const getSongQueue = useCallback(() => songQueue, [ songQueue ]);

   const queueSong = useCallback((song: Song) => {
      updateSongQueue(prevQueue => [ ...prevQueue, song ]);
   }, [ updateSongQueue ]);

   const queueSongNext = useCallback((song: Song) => {
      updateSongQueue(prevQueue => [ song, ...prevQueue ]);
   }, [ updateSongQueue ]);

   const advanceSongQueue = useCallback(() => {
      const [ nextSong ] = songQueue;

      updateSongQueue(prevQueue => {
         return prevQueue.filter((_, index) => index !== 0);
      });

      return nextSong;
   }, [ songQueue, updateSongQueue ]);

   const [ songHistory, updateSongHistory ] = useRecoilState(songHistoryState);

   const getSongHistory = useCallback(() => songHistory, [ songHistory ]);
   const getPreviousSong = useCallback(() => {
      const [ previousSong ] = songHistory;

      updateSongHistory(prevHistory => {
         return prevHistory.filter((_, index) => index !== 0);
      });

      return previousSong;
   }, [ songHistory, updateSongHistory ]);

   const addSongToHistory = useCallback((song: Song) => {
      updateSongHistory(prevHistory => [ song, ...prevHistory ]);
   }, [ updateSongHistory ]);

   return {
      getSongQueue,
      queueSong,
      queueSongNext,
      advanceSongQueue,
      getSongHistory,
      getPreviousSong,
      addSongToHistory,
   };
};