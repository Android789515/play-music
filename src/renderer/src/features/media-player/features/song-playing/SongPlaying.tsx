import styles from './SongPlaying.module.scss';

import { SongInfo } from 'features/library-view/songs/components';

interface Props {
   songTitle: string;
   songArtists: string;
   songDuration: string;
   inline?: boolean;
}

export const SongPlaying = ({
   songTitle,
   songArtists,
   songDuration,
   inline,
}: Props) => {
   return (
      <div
         className={`
            ${styles.songPlaying}
            ${inline ? styles.songPlayingInline : ''}
         `}
      >
         <SongInfo
            songTitle={songTitle}
            songArtists={songArtists}
            songDuration={songDuration}
         />
      </div>
   );
};
