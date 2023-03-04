import { VolumeStates } from './features/volume-button';
import { useMediaControls } from './useMediaControls';

import styles from './MediaControls.module.scss';

import { MediaControlsLayout } from './components'
import { MediaControlButton } from './components/media-control-button';
import { VolumeButton } from './features/volume-button';

import { SongPlaying } from '../song-playing';

export const MediaControls = () => {
   const { isPaused, pause, unPause } = useMediaControls();

   return (
      <div className={styles.mediaControls}>
         <MediaControlsLayout>
            <MediaControlButton name='Rewind' />

            <MediaControlButton
               name={isPaused ? 'Play' : 'Pause'}
               onClick={isPaused ? unPause : pause}
            />

            <MediaControlButton name='Stop' />

            <MediaControlButton name='Fast Forward' />

            <VolumeButton volumeState={VolumeStates.medium} />

            <SongPlaying
               songTitle='Rondo Alla Turca'
               songArtists='Mozart'
               songDuration='3:20'
            />

            <MediaControlButton name='Loop' />

            <MediaControlButton name='Shuffle' />
         </MediaControlsLayout>
      </div>
   );
};
