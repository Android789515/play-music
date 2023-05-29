import type { Song as SongType } from '@api/types';

import { List } from 'components/list';
import { Song } from '../../components/song';

import styles from './SongList.module.scss';

interface Props {
   songs: SongType[];
}

export const SongList = ({ songs }: Props) => {
   const SongComponents = songs.map((song, index) => {      
      return (
         <li key={index} className={styles.song}>
            <Song song={song} />
         </li>
      );
   });

   return (
      <List>
         {SongComponents}
      </List>
   );
};
