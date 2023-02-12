import styles from './SongInfo.module.scss';

interface Props {
   songTitle: string;
   songArtist: string;
   songDuration: string;
}

export const SongInfo = ({ songTitle, songArtist, songDuration }: Props) => {
   return (
      <>
         <h4 className={styles.songTitle}>
            {songTitle}
         </h4>

         <h4 className={styles.songArtist}>
            {songArtist}
         </h4>

         <p className={styles.songDuration}>
            {songDuration}
         </p>
      </>
   );
};
