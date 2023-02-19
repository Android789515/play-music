import type { Song as SongType } from './types';

import { List } from 'components/list';
import { Song } from './components';
import { SongInfo } from './components';

interface Props {
   songs: SongType[]
}

export const Songs = ({ songs }: Props) => {
   const SongComponents = songs.map((song, index) => {
      const { title, artist, duration } = song;

      return (
         <Song key={index}>
            <SongInfo
               songTitle={title}
               songArtist={artist}
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
