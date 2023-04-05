import { formatSongTime } from '@utils/number';

import styles from './SongInfo.module.scss';

interface Props {
   songTitle: string;
   songArtists: string;
   songDuration: number;
}

export const SongInfo = ({ songTitle, songArtists, songDuration }: Props) => {
   return (
      <>
         <div className={styles.mainSongInfo}>
            <h4 className={styles.songTitle}>
               {songTitle}
            </h4>

            <h4 className={styles.songArtists}>
               {songArtists}
            </h4>
         </div>

         <p className={styles.songDuration}>
            {formatSongTime(songDuration)}
         </p>
      </>
   );
};
