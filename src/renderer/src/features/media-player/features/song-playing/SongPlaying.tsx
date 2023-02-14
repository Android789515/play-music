import styles from './SongPlaying.module.scss';

import { SongInfo } from 'features/songs/components';

interface Props {
   songTitle: string;
   songArtist: string;
   songDuration: string;
   inline?: boolean;
}

export const SongPlaying = ({ songTitle, songArtist, songDuration, inline }: Props) => {
   return (
      <div
         className={`
            ${styles.songPlaying}
            ${inline ? styles.songPlayingInline : ''}
         `}
      >
         <SongInfo
            songTitle={songTitle}
            songArtist={songArtist}
            songDuration={songDuration}
         />
      </div>
   );
};
