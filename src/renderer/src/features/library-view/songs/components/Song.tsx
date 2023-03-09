import type { ReactNode } from 'react';

import type { Song as SongType } from '@api/types';
import { useIsMediaPlayerOpen } from 'features/media-player';

import styles from './Song.module.scss';

import { Button } from 'components/button';

interface Props {
   song: SongType;
   children: ReactNode;
}

export const Song = ({ song, children }: Props) => {
   const { isOpenMediaPlayerOpen, openMediaPlayer } = useIsMediaPlayerOpen();

   const hanndleSongClick = () => {
      if (!isOpenMediaPlayerOpen()) {
         openMediaPlayer();
      }
   };

   return (
      <li
         className={styles.songLayout}
      >
         <Button
            tabIndex={1}
            customStyles={styles.song}
            onClick={hanndleSongClick}
         >
            {children}
         </Button>
      </li>
   );
};
