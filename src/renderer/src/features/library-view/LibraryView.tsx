import { useTabs } from 'features/tabs';

import styles from './LibraryView.module.scss';

import { AddStuffButton } from './components/add-stuff-button';
import { SongCollection } from './components/song-collection';

export const LibraryView = () => {
   const { getCurrentTab } = useTabs();
   
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
