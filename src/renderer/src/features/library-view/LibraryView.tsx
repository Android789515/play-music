import { useEffect, lazy, Suspense } from 'react';

import { useTabs } from 'features/tabs';

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
   const { getCurrentTab, refreshLibrary } = useTabs();

   useEffect(() => {
      refreshLibrary();
   }, []);

   const isValidTab = getCurrentTab() !== undefined;
   return (
      <div
         className={styles.libraryView}
      >
         { isValidTab &&
            <AddStuffButton
               // Fix tab possibly being undefined.
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
            <SearchProvider
               collection={getCurrentTab()?.collection}
               Consumer={SongCollection}
            />
         </Suspense>
      </div>
   );
};
