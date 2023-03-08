import { HTMLAttributes, SyntheticEvent, useRef, useEffect } from 'react';

import type { Song } from '@api/types';
import { useSongTime } from 'features/media-player';
import { useSongPlaying } from './hooks';

import styles from './SongPlaying.module.scss';

interface Props extends HTMLAttributes<HTMLAudioElement> {
   songPlaying: Song;
   volume: number;
   isPaused: boolean;
   isMuted: boolean;
}

export const SongPlaying = ({
   songPlaying,
   volume,
   isPaused,
   isMuted,
   ...rest
}: Props) => {
   
   const audioRef = useRef<HTMLAudioElement>(null);

   const {
      handlePauseUpdate,
      changeVolume,
      syncSongTime,
   } = useSongPlaying(audioRef.current);

   useEffect(() => {
      handlePauseUpdate(isPaused);
   }, [ isPaused, handlePauseUpdate ]);

   useEffect(() => {
      changeVolume(volume);
   }, [ volume, changeVolume ]);

   const { songTime, updateSongTime } = useSongTime();

   useEffect(() => {
      syncSongTime(songTime);
   }, [ songTime, syncSongTime ]);

   const handleTimeUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
      const element = event.target as HTMLAudioElement;

      updateSongTime(element.currentTime);
   };

   const clipSongTitle = () => {
      return songPlaying.title.slice(0, 34) || '';
   };

   return (
      <div
         className={styles.songPlaying}
      >
         <audio
            src={'media://' + songPlaying.path}
            autoPlay
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            ref={audioRef}
            {...rest}
         />

         <h4 className={styles.songPlayingTitle}>
            {clipSongTitle()}
         </h4>
      </div>
   );
};
