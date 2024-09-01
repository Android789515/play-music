import { type ReactNode, useState, useEffect } from 'react';

import type { Song as SongType } from '@api/types';

import { List } from 'components/list';
import { SongButton } from '../song-button';

import styles from './SongCollection.module.scss';

interface Props {
   songs: SongType[];
}

export const SongCollection = ({ songs }: Props) => {
   const [ SongComponents, setSongComponents ] = useState<ReactNode>([]);

   const createSongComponents = async () => {
      const RefreshedSongs = songs.map(async (song, index) => {
         const doesSongStillExist = await window.api.stillExists(song.path);

         if (doesSongStillExist) {
            return (
               <li key={index} className={styles.song}>
                  <SongButton song={song} />
               </li>
            );
         } else {
            return null;
         }
      });

      setSongComponents(await Promise.all(RefreshedSongs));
   };

   const onCleanup = () => {
      setSongComponents([]);
   };

   useEffect(() => {
      createSongComponents();

      return onCleanup;
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [ songs ]);

   return (
      <List>
         {SongComponents}
      </List>
   );
};
