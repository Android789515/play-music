import { ChangeEvent, useState } from 'react';

import type { UUID } from '@globalTypes/stringTypes';
import { Tab, useTabs } from 'features/tabs';
import { DialogSubmitter } from 'components/dialog/components/dialog-submitter';

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
   };

   return (
      <section className={styles.dialogContent}>
         <DialogSubmitter
            formID={tabID}
            customStyles={styles.collection}
            onConfirm={confirmSelectedSongs}
            onCancel={() => {}}
         >
            <select
               className={styles.collectionLayout}
               multiple
               value={selectedSongs}
               onChange={updateSelectedSongs}
            >
               {SongOptions}
            </select>
         </DialogSubmitter>

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
