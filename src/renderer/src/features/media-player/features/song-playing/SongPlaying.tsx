import { useMediaPlayer } from 'features/media-player/api';

import styles from './SongPlaying.module.scss';

export const SongPlaying = () => {

   const { mediaPlayer: { songPlaying } } = useMediaPlayer();

   const clipSongTitle = () => {
      return songPlaying?.title.slice(0, 34) || '';
   };

   return (
      <div
         className={styles.songPlaying}
      >
         <h4 className={styles.songPlayingTitle}>
            {clipSongTitle()}
         </h4>
      </div>
   );
};
