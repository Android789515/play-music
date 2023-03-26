import type { ReactNode } from 'react';

import type { Song as SongType } from '@api/types';
import { useMediaPlayer } from 'features/media-player';

import styles from './Song.module.scss';

import { Button } from 'components/button';

interface Props {
   song: SongType;
   children: ReactNode;
}

export const Song = ({ song, children }: Props) => {
   const { mediaPlayer, playSong, openMediaPlayer } = useMediaPlayer();

   const handleSongClick = () => {
      if (!mediaPlayer.isOpen) {
         openMediaPlayer();
      }

      playSong(song);
   };

   return (
      <li
         className={styles.songLayout}
      >
         <Button
            tabIndex={1}
            customStyles={styles.song}
            onDoubleClick={handleSongClick}
         >
            {children}
         </Button>
      </li>
   );
};
