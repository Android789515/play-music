import { ChangeEvent, useState } from 'react';
import { v4 as newUUID } from 'uuid';

import type { UUID } from '@globalTypes/stringTypes';
import { Tab, useTabs } from 'features/tabs';

import styles from './AddToCollection.module.scss';

import { CoverArt } from 'components/cover-art';
import { SongInfo } from 'components/song-info';

interface Props {
   currentTab: Tab;
   closeDialog: () => void;
}

export const AddToCollection = ({ currentTab: { id: tabID, collection }, closeDialog }: Props) => {
   const { getLibraryTab, updateTab } = useTabs();

   const library = getLibraryTab().collection;

   const SongOptions = library?.map((song, index) => {
      return (
         <option
            key={index}
            className={styles.collectionSong}
         >
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

   const getLastSelectedSongInfo = () => {
      const lastSelectedSong = selectedSongs[selectedSongs.length - 1];

      if (library) {
         const songInLibrary = library.find(song => song.title === lastSelectedSong);

         if (songInLibrary) {
            return songInLibrary;
         }
      }

      return null;
   };

   const confirmSelectedSongs = () => {
      if (library) {
         const songsFromLibrary = library.filter(song => selectedSongs.includes(song.title));

         updateTab(tabID, {
            key: 'collection',
            data: [...collection, ...songsFromLibrary]
         });
      }

      closeDialog();
   };

   return (
      <section className={styles.dialogContent}>
         <form
            id={tabID}
            className={styles.collection}
            // @ts-ignore onSubmit is
            // a valid HTML listener
            onSubmit={confirmSelectedSongs}
         >
            <select
               className={styles.collectionLayout}
               multiple
               value={selectedSongs}
               onChange={updateSelectedSongs}
            >
               {SongOptions}
            </select>
         </form>

         {getLastSelectedSongInfo() && <aside className={styles.selectedSongInfo}>
            <CoverArt
               coverArtLocation={getLastSelectedSongInfo()!.coverArt}
               additionalIconStyles={styles.selectedSongCoverArtIcon}
            />

            <SongInfo
               songTitle={getLastSelectedSongInfo()!.title}
               songArtists={getLastSelectedSongInfo()!.artists}
            />
         </aside>}
      </section>
   );
};
