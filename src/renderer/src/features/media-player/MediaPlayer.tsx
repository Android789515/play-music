import { useMediaPlayer } from './api';

import styles from './MediaPlayer.module.scss';

import { MediaPlayerLayout } from './components';
import { MediaControls } from './features/media-controls';
import { SongDurationBar } from './features/media-controls/features/song-duration-bar';
import { SongDurationBar } from './features/song-duration-bar';

export const MediaPlayer = () => {
   const {
      mediaPlayer: { songPlaying, controls },
      updateControls
   } = useMediaPlayer();

   return ( songPlaying &&
      <footer className={styles.mediaPlayer}>
         <MediaPlayerLayout>
            <MediaControls
            />

            <SongDurationBar
               songDuration={songPlaying.duration}
               currentTime={controls.time}
               setCurrentTime={newTime => updateControls('time', newTime)}
            />
         </MediaPlayerLayout>
      </footer>
   );
};
