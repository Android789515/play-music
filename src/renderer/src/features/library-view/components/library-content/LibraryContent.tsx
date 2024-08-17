import type { Tab } from 'features/tabs';

import { AddStuffButton } from '../add-stuff-button';
import { SearchProvider } from 'components/search-bar';
import { SongCollection } from '../song-collection';

interface Props {
   currentTab: Tab;
}

export const LibraryContent = ({ currentTab }: Props) => {
   return (
      <>
         <AddStuffButton
            tab={currentTab}
         />

         <SearchProvider
            collection={currentTab.collection}
            Consumer={SongCollection}
         />
      </>
   );
};
