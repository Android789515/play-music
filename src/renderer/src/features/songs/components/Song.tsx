import styles from './Song.module.scss';

interface Props {
   songTitle: string;
   songArtist: string;
   songDuration: string;
}

export const Song = ({ songTitle, songArtist, songDuration }: Props) => {
   return (
      <li
         tabIndex={1}
         className={styles.song}
      >
         <h4 className={styles.songTitle}>
            {songTitle}
         </h4>

         <h4 className={styles.songArtist}>
            {songArtist}
         </h4>

         <p className={styles.songDuration}>
            {songDuration}
         </p>
      </li>
   );
};
