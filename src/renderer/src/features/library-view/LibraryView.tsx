import { useTabs } from 'features/tabs';

import { LibraryViewHeader } from './components/library-view-header';
import { SongList } from './features/song-list';

export const LibraryView = () => {
   const { getTabs } = useTabs();

   const getCurrentTabCollection = () => {
      const [ currentTab ] = getTabs().filter(item => item.isCurrent);

      // May be undefined
      // Address by saving tab state
      return currentTab?.collection || [];
   };

   return (
      <div>
         <LibraryViewHeader />

         <SongList
            songs={getCurrentTabCollection()}
         />
      </div>
   );
};
