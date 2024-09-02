import { useState } from 'react';

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
   const { mediaPlayer: { songPlaying, controls }, playSong } = useMediaPlayer();
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

   const [ isButtonFocused, setIsButtonFocused ] = useState(false);
   const focus = () => setIsButtonFocused(true);
   const blur = () => setIsButtonFocused(false);

   const isThisSongPlaying = songPlaying?.id === song.id;
   return (
      <ButtonWithContextMenu
         menuStructure={songMenu}
         customStyles={styles.songButton}
         onMouseEnter={focus}
         onFocus={focus}
         onMouseLeave={blur}
         onBlur={blur}
      >
         <SongComponent
            song={song}
            playing={isThisSongPlaying && !controls.isPaused}
            parentFocus={isButtonFocused}
         />

         <SongDuration
            songDuration={song.duration}
         />
      </ButtonWithContextMenu>
   );
};
