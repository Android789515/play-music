import type { Song } from '@api/types';
import { useMediaPlayer } from 'features/media-player';
import { useSongQueue } from 'features/song-queue';

import styles from './SongButton.module.scss';

import { ButtonWithContextMenu } from 'components/button-with-context-menu';
import { Song as SongComponent } from 'components/song';
import { SongDuration } from 'components/song-duration';

interface Props {
   song: Song;
}

export const SongButton = ({ song }: Props) => {
   const { playSong } = useMediaPlayer();
   const { queueSong } = useSongQueue();

   const songMenu = [
      {
         name: 'Play',
         isMainAction: true,
         action: () => playSong(song),
      },
      {
         name: 'Queue',
         action: () => queueSong(song),
      }
   ];

   return (
      <ButtonWithContextMenu
         menuStructure={songMenu}
         customStyles={styles.songButton}
      >
         <SongComponent
            song={song}
         />

         <SongDuration
            songDuration={song.duration}
         />
      </ButtonWithContextMenu>
   );
};
