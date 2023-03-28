import { useMediaPlayer } from 'features/media-player';
import { useSongQueue } from 'features/song-queue';

import styles from './MediaControls.module.scss';

import { MediaControlsLayout } from './components'
import { MediaControlButton } from './components/media-control-button';
import { VolumeButton } from './features/volume-button';

import { SongPlaying } from '../song-playing';

export const MediaControls = () => {

   const {
      mediaPlayer: { controls: { isPaused } },
      playSong,
      updateControls,
      closeMediaPlayer
   } = useMediaPlayer();

   const pause = () => {
      updateControls('isPaused', true);
   };

   const play = () => {
      updateControls('isPaused', false);
   };

   const { getNextSong } = useSongQueue();

   const playNext = () => {
      const nextSong = getNextSong();

      if (nextSong) {
         playSong(nextSong);
      }
   };

   const stop = () => {
      pause();
      updateControls('time', 0);
      closeMediaPlayer();
   };

   return (
      <div className={styles.mediaControls}>
         <MediaControlsLayout>
            <MediaControlButton
               name='Previous'
               onClick={() => {}}
            />

            <MediaControlButton
               name={isPaused ? 'Play' : 'Pause'}
               onClick={isPaused ? play : pause}
            />

            <MediaControlButton
               name='Stop'
               onClick={stop}
            />

            <MediaControlButton
               name='Next'
               onClick={playNext}
            />

            <VolumeButton />

            <SongPlaying />

            <MediaControlButton name='Loop' />

            <MediaControlButton name='Shuffle' />
         </MediaControlsLayout>
      </div>
   );
};
