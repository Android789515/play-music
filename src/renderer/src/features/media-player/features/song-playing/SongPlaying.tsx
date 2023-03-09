import styles from './SongPlaying.module.scss';

export const SongPlaying = () => {

   const clipSongTitle = () => {
      // return songPlaying.title.slice(0, 34) || '';
   };

   return (
      <div
         className={styles.songPlaying}
      >
         <h4 className={styles.songPlayingTitle}>
            {'Rondo Alla Turca'}
         </h4>
      </div>
   );
};
