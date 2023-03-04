import { Dispatch, SetStateAction, useState, useEffect } from 'react';

import type { Song } from '@api/types';

import styles from './MediaControls.module.scss';

import { MediaControlsLayout } from './components'
import { MediaControlButton } from './components/media-control-button';
import { VolumeButton } from './features/volume-button';

import { SongPlaying } from '../song-playing';

interface Props {
   songPlaying: Song | null;
   setSongPlaying: Dispatch<SetStateAction<Song | null>>;
   playNextSong: () => void;
}

export const MediaControls = ({ songPlaying, setSongPlaying, playNextSong }: Props) => {
   const [ isPaused, setIsPaused ] = useState(true);

   const pause = () => setIsPaused(true);

   const unPause = () => setIsPaused(false);

   useEffect(() => {
      if (songPlaying) {
         unPause();
      }
   }, [ songPlaying ]);

   const stop = () => {
      pause();

      // Also reset time
   };

   const [ volume, setVolume ] = useState(.5);

   return (
      <div className={styles.mediaControls}>
         <MediaControlsLayout>
            <MediaControlButton name='Rewind' />

            <MediaControlButton
               name={isPaused ? 'Play' : 'Pause'}
               onClick={isPaused ? unPause : pause}
            />

            <MediaControlButton
               name='Stop'
               onClick={stop}
            />

            <MediaControlButton
               name='Fast Forward'
               onClick={playNextSong}
            />

            <VolumeButton
               volume={volume}
               setVolume={setVolume}
            />

            <SongPlaying
               songPlaying={songPlaying}
               isPaused={isPaused}
               volume={volume}
               isMuted={false}
               onEnded={playNextSong}
            />

            <MediaControlButton name='Loop' />

            <MediaControlButton name='Shuffle' />
         </MediaControlsLayout>
      </div>
   );
};
