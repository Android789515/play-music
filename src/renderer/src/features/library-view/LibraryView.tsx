import { useState, useEffect } from 'react';

import { useTabs } from 'features/tabs';

import styles from './LibraryView.module.scss';

import { LibraryContent } from './components/library-content';
import { LibraryLoading } from './components/library-loading';

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
            ? <LibraryContent
               currentTab={currentTab}
            />
            : <LibraryLoading />
         }
      </div>
   );
};
