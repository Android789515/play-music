import { useTabs } from 'features/tabs';

import { SongCollection } from './components/song-collection';

export const LibraryView = () => {
   const { getTabs } = useTabs();

   const getCurrentTabCollection = () => {
      const [currentTab] = getTabs().filter(item => item.isCurrent);

      // May be undefined
      // Address by saving tab state
      return currentTab?.collection || [];
   };

   return (
      <div>
         <SongCollection
            songs={getCurrentTabCollection()}
         />
      </div>
   );
};
