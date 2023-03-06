import { useState, useEffect } from 'react';

import { isEmpty } from '@utils/array';
import type { Song } from '@api/types';
import { useSongTime } from './api';
import { useSongQueue } from 'features/song-queue/api';

import styles from './MediaPlayer.module.scss';

import { MediaPlayerLayout } from './components';
import { MediaControls } from './features/media-controls';
import { SongDurationBar } from './features/media-controls/features/song-duration-bar';

export const MediaPlayer = () => {
   const { getSongQueue, advanceSongQueue, queueSongNext, getPreviousSong } = useSongQueue();

   const [ songPlaying, setSongPlaying ] = useState<Song | null>(null);

   const { updateSongTime } = useSongTime();

   // Fixes bug where the song
   // bar doesn't complete.
   const setMaxSongTime = () => {
      if (songPlaying) {
         updateSongTime(songPlaying.duration);
      }
   };

   const playNextSong = () => {
      setMaxSongTime();

      const nextSong = advanceSongQueue();

      if (nextSong) {
         updateSongTime(0);
         setSongPlaying(nextSong);
      }
   };

   const playPreviousSong = () => {
      if (songPlaying) {
         // Allow user to use next to
         // go to the song that was playing
         // before going backwards.
         queueSongNext(songPlaying);
      }

      setSongPlaying(getPreviousSong());
   };

   const hasNextSong = !isEmpty(getSongQueue());

   // Immediately play the song that was queued
   // which opened the music player.
   useEffect(() => {
      if (hasNextSong) {
         playNextSong();
      }
      
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className={styles.mediaPlayer}>
         <MediaPlayerLayout>
            <MediaControls
               songPlaying={songPlaying}
               setSongPlaying={setSongPlaying}
               playNextSong={playNextSong}
               playPreviousSong={playPreviousSong}
            />

            <SongDurationBar />
         </MediaPlayerLayout>
      </div>
   );
};
