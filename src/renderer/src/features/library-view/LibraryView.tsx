import { useTabs } from 'features/tabs';

import { LibraryViewTopBar } from './components/library-view-top-bar';
import { Songs } from './songs';

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
         <LibraryViewTopBar />

         <Songs
            songs={getCurrentTabCollection()}
         />
      </div>
   );
};
