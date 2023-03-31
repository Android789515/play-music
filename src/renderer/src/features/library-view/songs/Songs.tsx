import type { Song as SongType } from '@api/types';

import { List } from 'components/list';
import { SongButton } from 'components/song-button';
import { SongInfo } from 'components/song-info';

interface Props {
   songs: SongType[];
}

export const Songs = ({ songs }: Props) => {
   const SongComponents = songs.map((song, index) => {
      const { title, artists, duration } = song;

      return (
         <SongButton
            key={index}
         >
            <SongInfo
               songTitle={title}
               songArtists={artists}
               songDuration={duration}
            />
         </SongButton>
      );
   });

   return (
      <List>
         {SongComponents}
      </List>
   );
};
