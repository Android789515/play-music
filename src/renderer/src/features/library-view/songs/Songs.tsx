import type { Song as SongType } from '@api/types';

import { List } from 'components/list';
import { Song } from 'components/song';
import { SongInfo } from 'components/song-info';

interface Props {
   songs: SongType[];
}

export const Songs = ({ songs }: Props) => {
   const SongComponents = songs.map((song, index) => {
      const { title, artists, duration } = song;

      return (
         <Song key={index} song={song}>
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
