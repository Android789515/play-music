import styles from './SongPlaying.module.scss';

import { SongInfo } from 'features/songs/components';

interface Props {
   songTitle: string;
   songArtist: string;
   songDuration: string;
}

export const SongPlaying = ({ songTitle, songArtist, songDuration }: Props) => {
   return (
      <div className={styles.songPlaying}>
         <SongInfo
            songTitle={songTitle}
            songArtist={songArtist}
            songDuration={songDuration}
         />
      </div>
   );
};
