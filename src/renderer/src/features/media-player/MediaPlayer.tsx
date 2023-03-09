import styles from './MediaPlayer.module.scss';

import { MediaPlayerLayout } from './components';
import { MediaControls } from './features/media-controls';
import { SongDurationBar } from './features/media-controls/features/song-duration-bar';

export const MediaPlayer = () => {

   return (
      <div className={styles.mediaPlayer}>
         <MediaPlayerLayout>
            <MediaControls
            />

            <SongDurationBar
            />
         </MediaPlayerLayout>
      </div>
   );
};
