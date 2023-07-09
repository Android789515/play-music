import type { Song } from '@api/types';

import styles from './QueuedSongs.module.scss';

import { List } from 'components/list';
import { SongInfo } from 'components/song-info';

interface Props {
   songQueue: Song[];
}

export const QueuedSongs = ({ songQueue }: Props) => {
   return (
      <List
         customStyles={styles.queuedSongs}
      >
         {renderSongs(songQueue)}
      </List>
   );
};

const renderSongs = (songQueue: Song[]) => {
   return songQueue.map((song, index) => {
      return (
         <SongInfo
            key={song.id + index}
            songTitle={song.title}
            songArtists={song.artists}
         />
      );
   });
};
