import { useState, useEffect } from 'react';

import { useTabs } from 'features/tabs';

import styles from './LibraryView.module.scss';

import { AddStuffButton } from './components/add-stuff-button';
import { AsyncSpinner } from 'components/async-spinner';
import { SearchProvider } from 'components/search-bar';
import { SongCollection } from './components/song-collection';

export const LibraryView = () => {
   const { getCurrentTab, refreshLibrary } = useTabs();
   
   const [ loaded, setLoaded ] = useState(false);

   useEffect(() => {
      refreshLibrary().then(() => setLoaded(true));
   }, []);

   const currentTab = getCurrentTab();

   return (
      <div
         className={styles.libraryView}
      >
         { loaded && currentTab
            ? (
               <>
                  <AddStuffButton
                     tab={currentTab}
                  />

                  <SearchProvider
                     collection={currentTab.collection}
                     Consumer={SongCollection}
                  />
               </>
            )
            : <AsyncSpinner
               customStyles={{
                  layout: styles.loadingSpinnerLayout,
                  spinner: styles.loadingSpinner,
               }}
            />
         }
      </div>
   );
};
