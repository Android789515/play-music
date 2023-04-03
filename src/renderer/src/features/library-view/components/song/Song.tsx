import type { Song as SongType } from '@api/types';

import styles from './Song.module.scss';

import { ButtonWithContextMenu } from 'components/button-with-context-menu';
import { CoverArt } from 'components/cover-art';
import { SongInfo } from 'components/song-info';

interface Props {
   song: SongType;
}

export const Song = ({ song: {
   coverArt,
   title,
   artists,
   duration,
}
}: Props) => {

   return (
      <ButtonWithContextMenu
         customStyles={styles.song}
      >
         <CoverArt
            coverArtLocation={coverArt}
         />

         <SongInfo
            songTitle={title}
            songArtists={artists}
            songDuration={duration}
         />
      </ButtonWithContextMenu>
   );
};
