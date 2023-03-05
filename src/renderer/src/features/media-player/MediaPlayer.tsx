import { useState, useCallback, useEffect } from 'react';

import { isEmpty } from '@utils/array';
import type { Song } from '@api/types';
import { useSongQueue } from 'features/song-queue/api';

import styles from './MediaPlayer.module.scss';

import { MediaPlayerLayout } from './components';
import { MediaControls } from './features/media-controls';
import { SongDurationBar } from './features/media-controls/features/song-duration-bar';

export const MediaPlayer = () => {
   const { getSongQueue, advanceSongQueue } = useSongQueue();

   const [ songPlaying, setSongPlaying ] = useState<Song | null>(null);

   const playNextSong = useCallback(() => {
      setSongPlaying(advanceSongQueue());
   }, [ advanceSongQueue ]);

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
            />

            <SongDurationBar />
         </MediaPlayerLayout>
      </div>
   );
};
