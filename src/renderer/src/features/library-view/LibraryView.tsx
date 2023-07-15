import { useTabs } from 'features/tabs';

import { SongList } from './components/song-list';

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
         <SongList
            songs={getCurrentTabCollection()}
         />
      </div>
   );
};
