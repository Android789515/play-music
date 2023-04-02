import type { Song as SongType } from '@api/types';

import { List } from 'components/list';
import { ButtonWithContextMenu } from 'components/button-with-context-menu';
import { SongInfo } from 'components/song-info';

interface Props {
   songs: SongType[];
}

export const SongList = ({ songs }: Props) => {
   const SongComponents = songs.map((song, index) => {
      const { title, artists, duration } = song;

      return (
         <ButtonWithContextMenu
            key={index}
         >
            <SongInfo
               songTitle={title}
               songArtists={artists}
               songDuration={duration}
            />
         </ButtonWithContextMenu>
      );
   });

   return (
      <List>
         {SongComponents}
      </List>
   );
};
