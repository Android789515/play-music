import { useEffect } from 'react';

import { useTabs } from 'features/tabs';
import { getPreviousTabData, libraryTrackMark } from 'features/tabs/stores';

import styles from './LibraryView.module.scss';

import { AddStuffButton } from './components/add-stuff-button';
import { SongCollection } from './components/song-collection';

export const LibraryView = () => {
   const { setTabs, getCurrentTab } = useTabs();

   const loadTabData = () => {
      const previousTabs = getPreviousTabData();

      window.api.getSongs().then(songs => {
         setTabs(previousTabs.map(tab => {
            const isLibraryTab = tab.id.includes(libraryTrackMark);

            if (isLibraryTab) {
               return {
                  ...tab,
                  collection: songs,
               };
            } else {
               return tab;
            }
         }));
      });
   };

   useEffect(loadTabData, [ setTabs ]);

   return (
      <div
         className={styles.libraryView}
      >
         { getCurrentTab() !== undefined &&
            <AddStuffButton
               // Fix tab possibly being undefinded.
               tab={getCurrentTab()!}
            />
         }

         <SongCollection
            songs={getCurrentTab()?.collection || []}
         />
      </div>
   );
};
