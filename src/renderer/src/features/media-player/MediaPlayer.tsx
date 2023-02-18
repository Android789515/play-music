import styles from './MediaPlayer.module.scss';

import { MediaPlayerLayout } from './components';
import { SongPlaying } from './features/song-playing';
import { MediaControls } from './features/media-controls';
import { SongDurationBar } from './features/media-controls/features/song-duration-bar';

export const MediaPlayer = () => {
   return (
      <footer className={styles.mediaPlayer}>
         <MediaPlayerLayout>
            <SongPlaying
               songTitle='Rondo Alla Turca'
               songArtist='Mozart'
               songDuration='3:20'
            />

            <MediaControls />

            <SongDurationBar />
         </MediaPlayerLayout>
      </footer>
   );
};
