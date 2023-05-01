import type { Song as SongType } from '@api/types';

import { useMediaPlayer } from 'features/media-player';
import { useSongQueue } from 'features/song-queue';

import styles from './Song.module.scss';

import { ButtonWithContextMenu } from 'components/button-with-context-menu';
import { CoverArt } from 'components/cover-art';
import { SongInfo } from 'components/song-info';
import { SongDuration } from 'components/song-duration';

interface Props {
   song: SongType;
}

export const Song = ({ song }: Props) => {

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

   const { coverArt, title, artists, duration } = song;
   return (
      <ButtonWithContextMenu
         menuStructure={songMenu}
         customStyles={`
            ${styles.songLayout}
            ${styles.song}
         `}
      >
         <CoverArt
            coverArtLocation={coverArt}
         />

         <SongInfo
            songTitle={title}
            songArtists={artists}
         />

         <SongDuration songDuration={duration} />
      </ButtonWithContextMenu>
   );
};
