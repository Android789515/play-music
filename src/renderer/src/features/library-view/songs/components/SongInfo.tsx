import styles from './SongInfo.module.scss';

interface Props {
   songTitle: string;
   songArtists: string;
   songDuration: string;
}

export const SongInfo = ({ songTitle, songArtists, songDuration }: Props) => {
   return (
      <>
         <h4 className={styles.songTitle}>
            {songTitle}
         </h4>

         <h4 className={styles.songArtists}>
            {songArtists}
         </h4>

         <p className={styles.songDuration}>
            {songDuration}
         </p>
      </>
   );
};
