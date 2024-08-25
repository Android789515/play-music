import { useState, useEffect } from 'react';

import { useTabs } from 'features/tabs';

import styles from './LibraryView.module.scss';

import { LibraryContent } from './components/library-content';
import { LibraryLoading } from './components/library-loading';

export const LibraryView = () => {
   const { getCurrentTab, refreshLibrary } = useTabs();
   
   const [ loaded, setLoaded ] = useState(false);

   const loadLibrary = () => {
      refreshLibrary().then(() => setLoaded(true));
   };

   type TimeInMS = number;

   const minLoadingScreenTime: TimeInMS = 900;

   const [ hasMinTimeElapsed, setHasMinTimeElapsed ] = useState(false);

   const elapseMinLoadingTime = () => {
      setTimeout(() => {
         setHasMinTimeElapsed(true);
      }, minLoadingScreenTime);
   };

   useEffect(() => {
      elapseMinLoadingTime();

      loadLibrary();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const currentTab = getCurrentTab();

   return (
      <div
         className={styles.libraryView}
      >
         { (loaded && hasMinTimeElapsed) && currentTab
            ? <LibraryContent
               currentTab={currentTab}
            />
            : <LibraryLoading
               isSlowLoad={hasMinTimeElapsed}
            />
         }
      </div>
   );
};
