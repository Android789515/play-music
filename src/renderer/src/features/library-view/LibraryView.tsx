import { useEffect, lazy, Suspense } from 'react';


import { useTabs } from 'features/tabs';
import { getPreviousTabData, libraryTrackMark } from 'features/tabs/stores';

import styles from './LibraryView.module.scss';

import { AddStuffButton } from './components/add-stuff-button';
import { AsyncSpinner } from 'components/async-spinner';
const SearchProvider = lazy(async () => {
   const { SearchProvider } = await import('components/search-bar');

   return ({ default: SearchProvider });
});
const SongCollection = lazy(async () => {
   const { SongCollection } = await import('./components/song-collection');

   return ({ default: SongCollection });
});

export const LibraryView = () => {
   const { setTabs, getCurrentTab } = useTabs();

   const loadTabData = (whenLoaded?: () => void) => {
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

         whenLoaded && whenLoaded();
      });
   };

   useEffect(loadTabData, [ setTabs ]);

   return (
      <div
         className={styles.libraryView}
      >
         { getCurrentTab() !== undefined &&
            <AddStuffButton
               // Fix tab possibly being undefined.
               tab={getCurrentTab()!}
               loadTabData={loadTabData}
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
            <SearchProvider
               collection={getCurrentTab()?.collection}
               Consumer={SongCollection}
            />
         </Suspense>
      </div>
   );
};
