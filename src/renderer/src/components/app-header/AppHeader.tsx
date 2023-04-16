import { Widget } from 'components/widget/Widget';
import { AppHeaderLayout } from './components';

import { Tabs } from 'features/tabs';
import { NewTabButton } from 'features/new-tab-button';

import { SearchBar } from 'components/search-bar';

import { SettingsButton } from 'features/settings-button';

export const AppHeader = () => {
   return (
      <header>
         <Widget borderSide='bottom'>
            <AppHeaderLayout>
               <Tabs />

               <NewTabButton />

               <SearchBar />

               <SettingsButton />
            </AppHeaderLayout>
         </Widget>
      </header>
   );
};
