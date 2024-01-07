import { useEffect, lazy, Suspense } from 'react';

import { useTabs } from 'features/tabs';
import { getPreviousTabData, libraryTrackMark } from 'features/tabs/stores';

import styles from './LibraryView.module.scss';

import { AddStuffButton } from './components/add-stuff-button';
import { AsyncSpinner } from 'components/async-spinner';

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

   const SongCollection = lazy(async () => {
      const { SongCollection } = await import('./components/song-collection');

      return ({ default: SongCollection });
   });
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

         <Suspense fallback={(
            <AsyncSpinner
               customStyles={{
                  layout: styles.loadingSpinnerLayout,
                  spinner: styles.loadingSpinner,
               }}
            />
         )}>
            <SongCollection
               songs={getCurrentTab()?.collection || []}
            />
         </Suspense>
      </div>
   );
};
