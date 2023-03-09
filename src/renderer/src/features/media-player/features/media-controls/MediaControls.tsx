import styles from './MediaControls.module.scss';

import { MediaControlsLayout } from './components'
import { MediaControlButton } from './components/media-control-button';
import { VolumeButton } from './features/volume-button';

import { SongPlaying } from '../song-playing';

export const MediaControls = () => {

   return (
      <div className={styles.mediaControls}>
         <MediaControlsLayout>
            <MediaControlButton
               name='Rewind'
               onClick={() => {}}
            />

            <MediaControlButton
               name={'Pause'}
               onClick={() => {}}
            />

            <MediaControlButton
               name='Stop'
               onClick={stop}
            />

            <MediaControlButton
               name='Fast Forward'
               onClick={() => {}}
            />

            <VolumeButton
            />

            <SongPlaying
            />

            <MediaControlButton name='Loop' />

            <MediaControlButton name='Shuffle' />
         </MediaControlsLayout>
      </div>
   );
};
