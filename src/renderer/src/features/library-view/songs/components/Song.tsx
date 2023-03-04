import type { ReactNode } from 'react';

import type { Song as SongType } from '@api/types';
import { useSongQueue } from 'features/song-queue/api';

import styles from './Song.module.scss';

import { Button } from 'components/button';

interface Props {
   song: SongType;
   children: ReactNode;
}

export const Song = ({ song, children }: Props) => {
   const { queueSong } = useSongQueue();

   return (
      <li
         className={styles.songLayout}
      >
         <Button
            tabIndex={1}
            customStyles={styles.song}
            onClick={() => queueSong(song)}
         >
            {children}
         </Button>
      </li>
   );
};
