import { useTabs } from 'features/tabs';

import { SongCollection } from './components/song-collection';

export const LibraryView = () => {
   const { getCurrentTab } = useTabs();

   return (
      <div>
         <SongCollection
            songs={getCurrentTab()?.collection || []}
         />
      </div>
   );
};
