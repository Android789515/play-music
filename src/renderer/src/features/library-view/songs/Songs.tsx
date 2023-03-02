import type { Song as SongType } from '@api/types';

import { List } from 'components/list';
import { Song } from './components';
import { SongInfo } from './components';

interface Props {
   songs: SongType[];
}

export const Songs = ({ songs }: Props) => {
   const SongComponents = songs.map((song, index) => {
      const { title, artists, duration } = song;

      return (
         <Song key={index}>
            <SongInfo
               songTitle={title}
               songArtists={artists}
               songDuration={duration}
            />
         </Song>
      );
   });

   return (
      <List>
         {SongComponents}
      </List>
   );
};
