import { FormEvent, ChangeEvent, useState } from 'react';
import { v4 as newUUID } from 'uuid';

import type { UUID } from '@globalTypes/stringTypes';
import { useTabs } from 'features/tabs';
import { libraryTab } from 'features/tabs/stores';

import styles from './AddToCollection.module.scss';

export const addToCollectionID = newUUID();

export const AddToCollection = () => {
   const { getTab, updateTab, getCurrentTab } = useTabs();

   const library = getTab(libraryTab.id)?.collection

   const SongOptions = library?.map((song, index) => {
      return (
         <option key={index}>
            {song.title}
         </option>
      );
   }) || [];

   const [ selectedSongs, setSelectedSongs ] = useState<UUID[]>([]);

   const updateSelectedSongs = ({ target }: ChangeEvent) => {
      const songOptions = target as HTMLSelectElement;
      const selectedSongs = [...songOptions.selectedOptions].map(option => option.value);

      setSelectedSongs(selectedSongs);
   };
   
   const confirmSelectedSongs = (event: FormEvent) => {
      event.preventDefault();

      const currentTab = getCurrentTab();
      if (currentTab && library) {
         const currentCollection = currentTab.collection;
         const songsFromLibrary = library.filter(song => selectedSongs.includes(song.title));

         updateTab(currentTab.id, {
            tabKey: 'collection',
            data: [ ...currentCollection, ...songsFromLibrary ]
         });
      }
   };

   return (
      <section className={styles.collectionLayout}>
         <form
            id={addToCollectionID}
            // @ts-ignore onSubmit is
            // a valid HTML listener
            onSubmit={confirmSelectedSongs}
         >
            <select
               multiple
               value={selectedSongs}
               onChange={updateSelectedSongs}
            >
               {SongOptions}
            </select>
         </form>
      </section>
   );
};
