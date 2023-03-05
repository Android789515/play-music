import type { ReactNode } from 'react';

import type { Song as SongType } from '@api/types';
import { useSongQueue } from 'features/song-queue/api';
import { useIsMediaPlayerOpen } from 'features/media-player';

import styles from './Song.module.scss';

import { Button } from 'components/button';

interface Props {
   song: SongType;
   children: ReactNode;
}

export const Song = ({ song, children }: Props) => {
   const { queueSong } = useSongQueue();

   const { isOpenMediaPlayerOpen, openMediaPlayer } = useIsMediaPlayerOpen();

   const hanndleSongClick = () => {
      queueSong(song);

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
