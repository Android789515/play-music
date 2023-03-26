import { useMediaPlayer } from './api';
import { useSongQueue } from 'features/song-queue';

import styles from './MediaPlayer.module.scss';

import { MediaPlayerLayout } from './components';
import { MediaControls } from './features/media-controls';
import { Speaker } from './features/speaker';
import { SongDurationBar } from './features/song-duration-bar';

export const MediaPlayer = () => {
   const {
      mediaPlayer: { songPlaying, controls },
      updateControls,
      playSong,
   } = useMediaPlayer();

   const { getNextSong } = useSongQueue();

   const handleSongEnd = () => {
      updateControls('isPaused', true);

      const nextSong = getNextSong();

      if (nextSong) {
         playSong(nextSong);
      }
   };

   return ( songPlaying &&
      <footer className={styles.mediaPlayer}>
         <MediaPlayerLayout>
            <MediaControls />

            <Speaker
               songPath={songPlaying.path}
               controls={controls}
               updateAudioTime={currentTime => updateControls('time', currentTime)}
               onSongEnd={handleSongEnd}
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
