import styles from './SongInfo.module.scss';

interface Props {
   songTitle: string;
   songArtists: string;
}

export const SongInfo = ({ songTitle, songArtists }: Props) => {
   return (
      <div className={styles.songInfo}>
         <h4 className={styles.songTitle}>
            {songTitle}
         </h4>

         <h4 className={styles.songArtists}>
            {songArtists}
         </h4>
      </div>
   );
};
