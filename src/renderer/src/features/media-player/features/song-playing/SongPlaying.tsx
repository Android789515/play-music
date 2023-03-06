import { HTMLAttributes, SyntheticEvent, useRef, useEffect } from 'react';

import type { Song } from '@api/types';
import { useSongTime } from 'features/media-player';

import styles from './SongPlaying.module.scss';

interface Props extends HTMLAttributes<HTMLAudioElement> {
   songPlaying: Song | null;
   volume: number;
   isPaused: boolean;
   isMuted: boolean;
}

export const SongPlaying = ({ songPlaying, volume, isPaused, isMuted, ...rest }: Props) => {
   const audioRef = useRef<HTMLAudioElement>(null);

   useEffect(() => {
      if (isPaused) {
         audioRef.current?.pause();
      } else {
         audioRef.current?.play();
      }
   }, [ isPaused ]);

   const changeVolume = () => {
      if (audioRef.current) {
         audioRef.current.volume = volume;
      }
   };

   useEffect(changeVolume, [ volume ]);

   const clipSongTitle = () => {
      return songPlaying?.title.slice(0, 34) || '';
   };

   const { songTime, updateSongTime } = useSongTime();

   useEffect(() => {
      const audioElement = audioRef.current;
      if (audioElement) {
         const rewind = () => audioElement.currentTime > songTime + 1;
         const fastForward = () => audioElement.currentTime < songTime - 1;

         if (fastForward() || rewind()) {
            audioElement.currentTime = songTime;
         }
      }
   }, [ songTime ]);

   const handleTimeUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
      const element = event.target as HTMLAudioElement;

      updateSongTime(element.currentTime);
   };

   console.log(songPlaying?.path);

   return (
      <div
         className={styles.songPlaying}
      >
            <audio
            src={'media://' + songPlaying?.path}
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
