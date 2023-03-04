import { HTMLAttributes, useRef, useEffect } from 'react';

import type { Song } from '@api/types';

import styles from './SongPlaying.module.scss';

import { SongInfo } from 'features/library-view/songs/components';

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

   return (
      <div
         className={styles.songPlaying}
      >
         <audio
            src={'file://' + songPlaying?.path}
            autoPlay
            muted={isMuted}
            ref={audioRef}
            {...rest}
         />

         <SongInfo
            songTitle={clipSongTitle()}
            songArtists={''}
            songDuration={''}
         />
      </div>
   );
};
