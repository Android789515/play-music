import { ReactNode, MouseEvent } from 'react';

import type { Song as SongType } from '@api/types';
import { useMediaPlayer } from 'features/media-player';
import { useSongQueue } from 'features/song-queue';
import { handleAuxClick } from 'utils/handleAuxClick';

import styles from './Song.module.scss';

import { Button } from 'components/button';
import { useControlContextMenu, ContextMenu } from 'components/context-menu';

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

   const {
      isContextMenuShown,
      openContextMenu,
      closeContextMenu,
      getContextMenuLocation,
      setContextMenuLocation,
   } = useControlContextMenu();

   const setupContextMenu = (event: MouseEvent) => {
      setContextMenuLocation({ x: event.clientX, y: event.clientY });

      openContextMenu();
   };

   const { queueSong } = useSongQueue();

   const songMenu = [
      {
         name: 'Play',
         action: handleSongClick,
      },
      {
         name: 'Queue',
         action: () => queueSong(song),
      },
   ];

   return (
      <li
         className={styles.songLayout}
      >
         <Button
            tabIndex={1}
            customStyles={styles.song}
            onMouseUp={handleAuxClick({
               onRightClick: setupContextMenu
            })}
            onDoubleClick={handleSongClick}
         >
            {children}
         </Button>

         <ContextMenu
            shown={isContextMenuShown()}
            location={getContextMenuLocation()}
            menuStructure={songMenu}
            closeContextMenu={closeContextMenu}
         />
      </li>
   );
};
