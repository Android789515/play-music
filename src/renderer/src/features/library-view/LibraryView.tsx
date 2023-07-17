import { useTabs } from 'features/tabs';

import styles from './LibraryView.module.scss';

import { SongCollection } from './components/song-collection';
import { AddStuffButton } from './components/add-stuff-button';

export const LibraryView = () => {
   const { getCurrentTab } = useTabs();
   

   return (
      <div
         className={styles.libraryView}
      >
         <AddStuffButton />

         <SongCollection
            songs={getCurrentTab()?.collection || []}
         />
      </div>
   );
};
