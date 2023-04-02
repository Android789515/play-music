import type { Song as SongType } from '@api/types';

import { List } from 'components/list';
import { ButtonWithContextMenu } from 'components/button-with-context-menu';
import { Song } from '../../components/song';

interface Props {
   songs: SongType[];
}

export const SongList = ({ songs }: Props) => {
   const SongComponents = songs.map((song, index) => {
      return (
         <ButtonWithContextMenu key={index}>
            <Song song={song} />
         </ButtonWithContextMenu>
      );
   });

   return (
      <List>
         {SongComponents}
      </List>
   );
};
