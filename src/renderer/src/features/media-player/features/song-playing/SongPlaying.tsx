import styles from './SongPlaying.module.scss';

import { SongInfo } from 'features/library-view/songs/components';

interface Props {
   songTitle: string;
   songArtists: string;
   songDuration: string;
}

export const SongPlaying = ({ songTitle, songArtists, songDuration }: Props) => {
   return (
      <div
         className={styles.songPlaying}
      >
         <SongInfo
            songTitle={songTitle}
            songArtists={songArtists}
            songDuration={songDuration}
         />
      </div>
   );
};
