import { Dispatch, SetStateAction, useState, useEffect } from 'react';

import type { Song } from '@api/types';
import { useSongQueue } from 'features/song-queue';
import { useSongTime } from 'features/media-player';
import { useVolumeControls } from './useVolumeControls';
import { useIsMediaPlayerOpen } from 'features/media-player';

import styles from './MediaControls.module.scss';

import { MediaControlsLayout } from './components'
import { MediaControlButton } from './components/media-control-button';
import { VolumeButton } from './features/volume-button';

import { SongPlaying } from '../song-playing';

interface Props {
   songPlaying: Song | null;
   setSongPlaying: Dispatch<SetStateAction<Song | null>>;
   playNextSong: () => void;
   playPreviousSong: () => void;
}

export const MediaControls = ({ songPlaying, setSongPlaying, playNextSong, playPreviousSong }: Props) => {
   const [ isPaused, setIsPaused ] = useState(true);

   const pause = () => setIsPaused(true);

   const unPause = () => setIsPaused(false);

   useEffect(() => {
      if (songPlaying) {
         unPause();
      }
   }, [ songPlaying ]);

   const { closeMediaPlayer } = useIsMediaPlayerOpen();

   const { updateSongTime } = useSongTime();

   const stop = () => {
      pause();
      updateSongTime(0);

      setSongPlaying(null);
      closeMediaPlayer();
   };

   const { volumeState, isMuted, toggleMute } = useVolumeControls();
   const [ volume ] = volumeState;

   const { addSongToHistory } = useSongQueue();

   const handleSongEnd = () => {
      pause();

      if (songPlaying) {
         addSongToHistory(songPlaying);
      }

      playNextSong();
   };

   return (
      <div className={styles.mediaControls}>
         <MediaControlsLayout>
            <MediaControlButton
               name='Rewind'
               onClick={playPreviousSong}
            />

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
               onClick={handleSongEnd}
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
               onEnded={handleSongEnd}
            />

            <MediaControlButton name='Loop' />

            <MediaControlButton name='Shuffle' />
         </MediaControlsLayout>
      </div>
   );
};
