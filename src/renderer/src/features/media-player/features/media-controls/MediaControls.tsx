import { Dispatch, SetStateAction, useState, useEffect } from 'react';

import type { Song } from '@api/types';
import { useVolumeControls } from './useVolumeControls';
import { useIsMediaPlayerOpen } from 'features/media-player/api';

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

   const { closeMediaPlayer } = useIsMediaPlayerOpen();

   const stop = () => {
      pause();
      setSongPlaying(null);
      
      closeMediaPlayer();
      // Also reset time
   };

   const { volumeState, isMuted, toggleMute } = useVolumeControls();
   const [ volume ] = volumeState;

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
               volumeState={volumeState}
               isMuted={isMuted}
               toggleMute={toggleMute}
            />

            <SongPlaying
               songPlaying={songPlaying}
               isPaused={isPaused}
               volume={volume}
               isMuted={isMuted}
               onEnded={playNextSong}
            />

            <MediaControlButton name='Loop' />

            <MediaControlButton name='Shuffle' />
         </MediaControlsLayout>
      </div>
   );
};
